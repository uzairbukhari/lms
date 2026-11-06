import type { Context } from "hono";
import { z } from "zod";
import type { AppEnv } from "../env";
import { parseBody } from "./http";
import { sha, takeDailyAllowance } from "./ai";
import { canSpend } from "./budget";
import { neuronsFor, recordUsage } from "./usage";
import { todayIn } from "./visibility";

// Lesson narration in a natural voice (Deepgram Aura-1 on Workers AI, half the price of Aura-2; to go back, set TTS_MODEL to "@cf/deepgram/aura-2-en"). Each sentence is generated once and kept in R2,
// so a lesson costs nothing after the first child has heard it. The app falls back to the device's own voice whenever
// this answers anything other than audio.

export const TTS_MODEL = "@cf/deepgram/aura-1";
/** Stored audio is kept per model, so changing the model never mixes voices: audio made with another model stays in R2 untouched. */
export const MODEL_DIR =TTS_MODEL.split("/").pop();
/** A warm, friendly voice for young children. Other good ones: "thalia", "aurora", "iris", "helena". */
export const TTS_VOICE = "luna";
/** New sentences a child can have voiced per day. Cached sentences are free and do not count. */
const DAILY_CAP = 300;

const bodySchema = z.object({ text: z.string().trim().min(1).max(600) });

/** How narration splits text into sentences (one voice clip each). Must stay identical to sentences() in apps/web/src/lib/sound.ts. */
export function sentences(text: string): string[] {
  return text.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()).filter(Boolean) ?? [];
}

/** Where the audio for one sentence lives in R2. Children and the prewarm route share this key, so prewarmed audio is a cache hit. */
export async function ttsKey(text: string): Promise<string> {
  return `tts/v1/${MODEL_DIR}/${TTS_VOICE}/${await sha(text)}.mp3`;
}

/** Generate the audio for one sentence and keep it in R2. Records the usage. Throws when the model fails. The caller checks the budget first. */
async function generateAndStore(c: Context<AppEnv>, key: string, text: string, userId: string | null): Promise<ArrayBuffer> {
  const res = (await c.env.AI!.run(TTS_MODEL, { text, speaker: TTS_VOICE, encoding: "mp3" }, { returnRawResponse: true })) as unknown as Response;
  const audio = await res.arrayBuffer();
  if (!res.ok || audio.byteLength < 100) throw new Error(`tts failed: ${res.status}`);
  await recordUsage(c.env.DB, { kind: "narration", model: TTS_MODEL, userId: userId ?? undefined, characters: text.length });
  await c.env.ASSETS_BUCKET.put(key, audio, { httpMetadata: { contentType: "audio/mpeg" } });
  return audio;
}

const prewarmSchema = z.object({ texts: z.array(z.string().trim().min(1).max(600)).min(1).max(100) });

/**
 * POST { texts } (admin / automation): make sure every sentence of every text has stored audio. Sentences already in R2 are
 * skipped, new ones are generated until the day's AI ceiling is reached, and the rest are reported as deferred (run again
 * after the budget resets). The per-child daily cap does not apply.
 */
export async function prewarm(c: Context<AppEnv>): Promise<Response> {
  const { texts } = await parseBody(c, prewarmSchema);
  const unique = [...new Set(texts.flatMap(sentences))];
  let generated = 0;
  let skipped = 0;
  let deferred = 0;
  let failed = 0;
  let stopped = !c.env.AI;
  for (const text of unique) {
    const key = await ttsKey(text);
    if (await c.env.ASSETS_BUCKET.head(key)) {
      skipped++;
      continue;
    }
    if (!stopped && !(await canSpend(c.env.DB, neuronsFor(TTS_MODEL, { characters: text.length })))) stopped = true;
    if (stopped) {
      deferred++;
      continue;
    }
    try {
      await generateAndStore(c, key, text, null);
      generated++;
    } catch (err) {
      console.error(err);
      failed++;
    }
  }
  return c.json({ generated, skipped, deferred, failed, total: unique.length });
}

/** POST { text } and get back MP3 audio, or 503 when the voice is not available (the app then uses the device voice). */
export async function narrate(c: Context<AppEnv>): Promise<Response> {
  // The parent's test student never uses the voice service, not even stored audio (the app stays silent for it).
  if ((c.var.user as AppEnv["Variables"]["user"] | undefined)?.isTest) return c.json({ error: "voice_unavailable" }, 503);
  const { text } = await parseBody(c, bodySchema);
  const key = await ttsKey(text);
  const headers = { "Content-Type": "audio/mpeg", "Cache-Control": "private, max-age=604800" };

  const cached = await c.env.ASSETS_BUCKET.get(key);
  if (cached) return new Response(cached.body, { headers });

  if (!c.env.AI) return c.json({ error: "voice_unavailable" }, 503);
  const user = c.var.user as AppEnv["Variables"]["user"] | undefined;
  // The day's AI ceiling: no new audio is generated once it is reached (stored audio above is still served).
  if (!(await canSpend(c.env.DB, neuronsFor(TTS_MODEL, { characters: text.length })))) return c.json({ error: "voice_unavailable", reason: "daily_limit" }, 503);
  if (user && !(await takeDailyAllowance(c.env.SESSIONS, `tts:${user.id}`, todayIn(c.env.TIMEZONE), DAILY_CAP))) {
    return c.json({ error: "voice_unavailable" }, 503);
  }

  try {
    return new Response(await generateAndStore(c, key, text, user?.id ?? null), { headers });
  } catch (err) {
    console.error(err);
    return c.json({ error: "voice_unavailable" }, 503);
  }
}
