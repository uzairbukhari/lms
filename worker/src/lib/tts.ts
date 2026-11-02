import type { Context } from "hono";
import { z } from "zod";
import type { AppEnv } from "../env";
import { parseBody } from "./http";
import { sha, takeDailyAllowance } from "./ai";
import { todayIn } from "./visibility";

// Lesson narration in a natural voice (Deepgram Aura-2 on Workers AI). Each sentence is generated once and kept in R2,
// so a lesson costs nothing after the first child has heard it. The app falls back to the device's own voice whenever
// this answers anything other than audio.

export const TTS_MODEL = "@cf/deepgram/aura-2-en";
/** A warm, friendly voice for young children. Other good ones: "thalia", "aurora", "iris", "helena". */
export const TTS_VOICE = "luna";
/** New sentences a child can have voiced per day. Cached sentences are free and do not count. */
const DAILY_CAP = 300;

const bodySchema = z.object({ text: z.string().trim().min(1).max(600) });

/** POST { text } and get back MP3 audio, or 503 when the voice is not available (the app then uses the device voice). */
export async function narrate(c: Context<AppEnv>): Promise<Response> {
  const { text } = await parseBody(c, bodySchema);
  const key = `tts/v1/${TTS_VOICE}/${await sha(text)}.mp3`;
  const headers = { "Content-Type": "audio/mpeg", "Cache-Control": "private, max-age=604800" };

  const cached = await c.env.ASSETS_BUCKET.get(key);
  if (cached) return new Response(cached.body, { headers });

  if (!c.env.AI) return c.json({ error: "voice_unavailable" }, 503);
  const user = c.var.user as AppEnv["Variables"]["user"] | undefined;
  if (user && !(await takeDailyAllowance(c.env.SESSIONS, `tts:${user.id}`, todayIn(c.env.TIMEZONE), DAILY_CAP))) {
    return c.json({ error: "voice_unavailable" }, 503);
  }

  try {
    const res = (await c.env.AI.run(TTS_MODEL, { text, speaker: TTS_VOICE, encoding: "mp3" }, { returnRawResponse: true })) as unknown as Response;
    const audio = await res.arrayBuffer();
    if (!res.ok || audio.byteLength < 100) throw new Error(`tts failed: ${res.status}`);
    await c.env.ASSETS_BUCKET.put(key, audio, { httpMetadata: { contentType: "audio/mpeg" } });
    return new Response(audio, { headers });
  } catch (err) {
    console.error(err);
    return c.json({ error: "voice_unavailable" }, 503);
  }
}
