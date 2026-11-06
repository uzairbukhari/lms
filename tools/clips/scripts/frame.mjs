// Renders single frames of a clip spec as png files, for looking at them and for the determinism check.
//   node tools/clips/scripts/frame.mjs <slug|path> <frame> [<frame> ...]
// Silent timing. Writes tools/clips/out/frames/<slug>-<frame>.png and prints the sha256 of each file, in the order given
// (so `... 400 900 400` renders frame 400 twice with another frame in between: the two hashes must match).
import { createRequire } from "node:module";
import { mkdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createHash } from "node:crypto";

const here = dirname(fileURLToPath(import.meta.url));
const tool = join(here, "..");
const { readClip, AUDIO_DIR } = await import(pathToFileURL(join(tool, "..", "..", "scripts", "clip-kit.mjs")).href);
const { clipWebpackOverride } = await import(pathToFileURL(join(tool, "webpack-override.mjs")).href);
const req = createRequire(join(tool, "package.json"));
const { bundle } = req("@remotion/bundler");
const { selectComposition, renderStill } = req("@remotion/renderer");
const [target, ...frames] = process.argv.slice(2);
const clip = await readClip(target);
mkdirSync(AUDIO_DIR, { recursive: true });
const serveUrl = await bundle({ entryPoint: join(tool, "src", "index.ts"), webpackOverride: clipWebpackOverride, publicDir: AUDIO_DIR });
const inputProps = { spec: clip.spec };
const composition = await selectComposition({ serveUrl, id: "ClipFromScenes", inputProps });
console.log(`${composition.durationInFrames} frames`);
mkdirSync(join(tool, "out", "frames"), { recursive: true });
let n = 0;
for (const f of frames) {
  const output = join(tool, "out", "frames", `${clip.slug}-${f}${frames.filter((x) => x === f).length > 1 ? `-${++n}` : ""}.png`);
  await renderStill({ composition, serveUrl, inputProps, frame: Number(f), imageFormat: "png", output, overwrite: true });
  console.log(`frame ${f}: ${createHash("sha256").update(readFileSync(output)).digest("hex")}`);
}
