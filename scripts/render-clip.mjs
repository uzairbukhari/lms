// Renders a lesson's clip spec to an mp4 and a poster, named from the spec so the same spec always gives the same files.
//   node scripts/render-clip.mjs <slug|path-to-spec> [--silent] [--force]
//   node scripts/render-clip.mjs --all [--silent]        every spec in content/clips/ whose output is missing
// Narration needs LMS_URL, CF_ACCESS_CLIENT_ID and CF_ACCESS_CLIENT_SECRET (see scripts/clip-audio.mjs); --silent needs nothing.
// Output goes to tools/clips/out/ (silent test renders go to tools/clips/out/silent/ and never touch the media manifest).
// Run `npm install` in tools/clips once. Steps and caveats: docs/CLIPS.md.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { AUDIO_DIR, CLIPS_DIR, OUT_DIR, ROOT, TOOL_DIR, readClip, sha256 } from "./clip-kit.mjs";
import { BudgetError, EXIT_BUDGET, ensureAudio } from "./clip-audio.mjs";

/** The largest file we upload. The renderer retries at stronger compression until the video fits. */
export const MAX_BYTES = 8_000_000;
/** H.264 quality steps to try, best first (higher number = smaller file). */
export const CRF_LADDER = [24, 28, 32, 36, 40, 45, 51];
const POSTER_AT = 0.35;
const MANIFEST_DIR = join(ROOT, "content", "media", "manifest.d"); // one manifest file per lesson, so parallel work never conflicts

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const targets = args.filter((a) => !a.startsWith("--"));

/** Insert or replace the manifest records for a rendered clip. Only for clips that belong to a real lesson. */
export function upsertManifest(slug, title, files, manifestPath = join(MANIFEST_DIR, `${slug}.json`)) {
  const m = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : { files: [] };
  for (const f of files) {
    const entry = { file: f.file, lessons: [slug], source: "generated", sha256: f.sha256, alt: f.alt, reviewed: false };
    const at = m.files.findIndex((x) => x.file === f.file);
    if (at >= 0) m.files[at] = { ...m.files[at], ...entry, lessons: [...new Set([...(m.files[at].lessons ?? []), slug])] }; else m.files.push(entry);
  }
  writeFileSync(manifestPath, JSON.stringify(m, null, 2) + "\n");
}

const remotion = createRequire(join(TOOL_DIR, "package.json"));
let bundled; // one bundle serves every clip in a batch
async function bundleOnce() {
  if (bundled) return bundled;
  const { bundle } = remotion("@remotion/bundler");
  const { clipWebpackOverride } = await import(pathToFileURL(join(TOOL_DIR, "webpack-override.mjs")).href);
  mkdirSync(AUDIO_DIR, { recursive: true });
  const css = spawnSync(process.execPath, [join(TOOL_DIR, "scripts", "build-css.mjs")], { stdio: "inherit" });
  if (css.status !== 0) throw new Error("Could not build the CSS for the clip.");
  console.log("Bundling the clip composition...");
  bundled = await bundle({ entryPoint: join(TOOL_DIR, "src", "index.ts"), webpackOverride: clipWebpackOverride, publicDir: AUDIO_DIR });
  return bundled;
}

async function renderOne(target) {
  const clip = await readClip(target);
  const silent = flag("silent");
  const outDir = silent ? join(OUT_DIR, "silent") : OUT_DIR;
  mkdirSync(outDir, { recursive: true });
  const mp4 = join(outDir, clip.names.asset);
  const poster = join(outDir, clip.names.poster);
  if (!flag("force") && existsSync(mp4) && existsSync(poster)) {
    console.log(`${clip.slug}: up to date (${clip.names.asset}), skipped.`);
    return { clip, mp4, poster, skipped: true };
  }

  const audio = silent ? undefined : (await ensureAudio(clip)).scenes;
  const { selectComposition, renderMedia, renderStill } = remotion("@remotion/renderer");
  const serveUrl = await bundleOnce();
  const inputProps = { spec: clip.spec, ...(audio ? { audio } : {}) };
  const composition = await selectComposition({ serveUrl, id: "ClipFromScenes", inputProps });
  console.log(`${clip.slug}: ${composition.durationInFrames} frames (${(composition.durationInFrames / composition.fps).toFixed(1)} s)${silent ? ", silent" : ""}`);

  const t0 = Date.now();
  let size = 0;
  let usedCrf = 0;
  for (const crf of CRF_LADDER) {
    let shown = -1;
    await renderMedia({
      composition, serveUrl, inputProps, codec: "h264", crf, audioCodec: "aac", pixelFormat: "yuv420p",
      outputLocation: mp4, overwrite: true, muted: !audio,
      onProgress: ({ progress }) => { const p = Math.floor(progress * 10) * 10; if (p > shown) { shown = p; process.stdout.write(`  crf ${crf}: ${p}%\n`); } },
    });
    size = statSync(mp4).size;
    usedCrf = crf;
    if (size <= MAX_BYTES) break;
    console.log(`  ${(size / 1e6).toFixed(1)} MB is over the ${MAX_BYTES / 1e6} MB limit, trying stronger compression.`);
  }
  if (size > MAX_BYTES) {
    rmSync(mp4, { force: true });
    throw new Error(`${clip.slug}: even at crf ${usedCrf} the video is ${(size / 1e6).toFixed(1)} MB (limit ${MAX_BYTES / 1e6} MB). Shorten the clip.`);
  }
  const still = Math.round(composition.durationInFrames * POSTER_AT);
  await renderStill({ composition, serveUrl, inputProps, frame: still, imageFormat: "webp", output: poster, overwrite: true });
  const secs = (Date.now() - t0) / 1000;

  const files = [
    { file: clip.names.asset, sha256: sha256(readFileSync(mp4)), alt: `Narrated clip: ${clip.spec.title}` },
    { file: clip.names.poster, sha256: sha256(readFileSync(poster)), alt: `Poster for the clip "${clip.spec.title}"` },
  ];
  console.log(`${clip.slug}: ${clip.names.asset} ${(size / 1e6).toFixed(2)} MB (crf ${usedCrf}) + poster ${(statSync(poster).size / 1024).toFixed(0)} KB in ${secs.toFixed(1)} s`);
  if (!silent) {
    if (existsSync(join(ROOT, "content", "topics", `${clip.slug}.json`))) {
      upsertManifest(clip.slug, clip.spec.title, files);
      console.log(`Recorded both files in content/media/manifest.d/${clip.slug}.json (reviewed: false: watch the clip, then set it to true).`);
    } else console.log(`No lesson "${clip.slug}" in content/topics, so the media manifest was left alone.`);
    console.log(`Upload:\n  node scripts/upload-media.mjs "${mp4}" "${poster}"`);
  }
  return { clip, mp4, poster, files, size, seconds: secs };
}

async function main() {
  let names = targets;
  if (flag("all")) {
    // Specs named sample-* are examples for tests and demos; render them by name when wanted.
    names = readdirSync(CLIPS_DIR).filter((f) => f.endsWith(".json") && !f.startsWith("sample-")).map((f) => f.replace(/\.json$/, ""));
  } else if (!names.length) {
    console.error("Give a clip slug or the path to a spec file, or --all.");
    process.exit(2);
  }
  let failed = 0;
  for (const n of names) {
    try { await renderOne(n); } catch (err) {
      if (err instanceof BudgetError) { console.error(err.message); process.exit(EXIT_BUDGET); }
      failed++;
      console.error(`${n}: ${err instanceof Error ? err.message : err}`);
    }
  }
  process.exit(failed ? 1 : 0);
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) await main();
