// Fetches the narration for a clip: asks the live app to voice every sentence (prewarm), downloads each sentence's mp3 into
// tools/clips/.audio/, measures it, and writes tools/clips/.audio/<spec-hash>.json for the renderer.
//   LMS_URL=https://... CF_ACCESS_CLIENT_ID=... CF_ACCESS_CLIENT_SECRET=... node scripts/clip-audio.mjs <slug|path-to-spec> [--silent]
// --silent: no narration at all (offline test path); nothing is fetched and the clip is rendered with reading-time pauses.
// Stops with exit code 3 when the daily AI voice budget runs out part way: run it again after 00:00 UTC (docs/CLIPS.md).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { AUDIO_DIR, audioRecordPath, loadSchema, mp3Seconds, readClip, sentenceFile } from "./clip-kit.mjs";

/** Exit code when the daily voice budget ended before every sentence was voiced. */
export const EXIT_BUDGET = 3;

export class BudgetError extends Error {
  constructor(remaining) {
    super(`The daily voice budget ran out: ${remaining} sentence${remaining === 1 ? "" : "s"} still need voicing. Run this again after 00:00 UTC (the budget resets then), or raise the daily AI limit in the app's admin Settings.`);
    this.remaining = remaining;
  }
}

function connection() {
  const { LMS_URL, CF_ACCESS_CLIENT_ID: id, CF_ACCESS_CLIENT_SECRET: secret } = process.env;
  if (!LMS_URL || !id || !secret) throw new Error("Set LMS_URL, CF_ACCESS_CLIENT_ID and CF_ACCESS_CLIENT_SECRET (or use --silent to skip narration).");
  return { base: LMS_URL.replace(/\/$/, ""), headers: { "CF-Access-Client-Id": id, "CF-Access-Client-Secret": secret } };
}

/**
 * Make sure every sentence of the clip has an mp3 in tools/clips/.audio, then write and return the per-scene record:
 * { specHash, scenes: [ [{ text, file, seconds }, ...] | null ] }. Throws BudgetError when sentences are still missing.
 */
export async function ensureAudio(clip, { fetchImpl = fetch, log = console.log } = {}) {
  const { clipSentences, sceneSentences } = await loadSchema();
  mkdirSync(AUDIO_DIR, { recursive: true });
  const all = clipSentences(clip.spec);
  const missing = all.filter((s) => !existsSync(join(AUDIO_DIR, sentenceFile(s))));
  if (missing.length) {
    const { base, headers } = connection();
    log(`${all.length} sentences, ${missing.length} to fetch.`);
    let deferred = 0;
    let failed = 0;
    for (let i = 0; i < missing.length; i += 100) {
      const batch = missing.slice(i, i + 100);
      const res = await fetchImpl(`${base}/api/admin/voice/prewarm`, { method: "POST", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify({ texts: batch }) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(`prewarm failed: ${res.status} ${JSON.stringify(body).slice(0, 300)}`);
      deferred += body.deferred ?? 0;
      failed += body.failed ?? 0;
      log(`  voiced ${body.generated} new, ${body.skipped} already stored, ${body.deferred} deferred, ${body.failed} failed`);
    }
    let absent = 0;
    for (const s of missing) {
      const res = await fetchImpl(`${base}/api/admin/voice/audio?text=${encodeURIComponent(s)}`, { headers });
      if (res.status === 404) { absent++; continue; }
      if (!res.ok) throw new Error(`download failed for "${s.slice(0, 40)}": ${res.status}`);
      writeFileSync(join(AUDIO_DIR, sentenceFile(s)), Buffer.from(await res.arrayBuffer()));
    }
    if (deferred > 0 || absent > 0) throw new BudgetError(Math.max(deferred, absent));
    if (failed > 0) throw new Error(`${failed} sentence${failed === 1 ? "" : "s"} failed to voice. Try again.`);
  }
  const scenes = clip.spec.scenes.map((scene) => {
    const parts = sceneSentences(scene);
    if (!parts.length) return null;
    return parts.map((text) => {
      const file = sentenceFile(text);
      return { text, file, seconds: Math.round(mp3Seconds(readFileSync(join(AUDIO_DIR, file))) * 1000) / 1000 };
    });
  });
  const record = { specHash: clip.hash, scenes };
  writeFileSync(audioRecordPath(clip.hash), JSON.stringify(record, null, 1) + "\n");
  return record;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  const target = args.find((a) => !a.startsWith("--"));
  if (!target) { console.error("Give a clip slug or the path to a spec file."); process.exit(2); }
  try {
    const clip = await readClip(target);
    if (args.includes("--silent")) { console.log(`${clip.slug}: silent mode, no narration needed.`); process.exit(0); }
    const record = await ensureAudio(clip);
    const total = record.scenes.flat().filter(Boolean).reduce((n, s) => n + s.seconds, 0);
    console.log(`${clip.slug}: narration ready (${record.scenes.flat().filter(Boolean).length} sentences, ${total.toFixed(1)} s). Record: ${audioRecordPath(clip.hash)}`);
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    process.exit(err instanceof BudgetError ? EXIT_BUDGET : 1);
  }
}
