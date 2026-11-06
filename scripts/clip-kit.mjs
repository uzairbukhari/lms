// Shared helpers for narrated clips (docs/CLIPS.md): loading and validating a clip spec, the deterministic file names,
// and a dependency-free mp3 length reader. Node only. The schema package stays validation-only; hashing lives here.
import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const CLIPS_DIR = join(ROOT, "content", "clips");
export const TOOL_DIR = join(ROOT, "tools", "clips");
export const AUDIO_DIR = join(TOOL_DIR, ".audio");
export const OUT_DIR = join(TOOL_DIR, "out");

let schemaPromise;
/**
 * @lms/schema is TypeScript, and these scripts run on plain node, so bundle it once with esbuild (a dependency of wrangler,
 * already in the repo's node_modules) and import the result. Used for validation only.
 */
export function loadSchema() {
  schemaPromise ??= (async () => {
    const { build } = await import("esbuild");
    const out = await build({
      entryPoints: [join(ROOT, "packages", "schema", "src", "index.ts")],
      bundle: true, write: false, format: "esm", platform: "node", logLevel: "silent",
      absWorkingDir: ROOT, nodePaths: [join(ROOT, "node_modules")],
    });
    const file = join(mkdtempSync(join(tmpdir(), "lms-schema-")), "schema.mjs");
    writeFileSync(file, out.outputFiles[0].text);
    return import(pathToFileURL(file).href);
  })();
  return schemaPromise;
}

/** JSON with object keys sorted at every level and no spaces: the same spec always gives the same text. */
export function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).filter((k) => value[k] !== undefined).sort().map((k) => `${JSON.stringify(k)}:${canonicalJson(value[k])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export const sha256 = (bytesOrText) => createHash("sha256").update(bytesOrText).digest("hex");

/** sha256 (hex) of the canonical JSON of a validated spec (parse it with parseClipSpec first, so defaults are filled in). */
export const clipSpecHash = (spec) => sha256(canonicalJson(spec));

/** Validate a spec object with an already loaded schema. Returns { spec, hash, names } or throws with every problem listed. */
export function checkClipWith(schema, slug, raw) {
  const r = schema.parseClipSpec(raw);
  if (!r.ok) throw new Error(`Clip "${slug}" is not valid:\n - ${r.issues.join("\n - ")}`);
  const hash = clipSpecHash(r.spec);
  return { slug, spec: r.spec, hash, names: schema.clipAssetNames(slug, hash) };
}

export async function checkClip(slug, raw) {
  return checkClipWith(await loadSchema(), slug, raw);
}

/** Find a clip by lesson slug (content/clips/<slug>.json) or by path to a spec file, and validate it. */
export async function readClip(slugOrPath) {
  const path = existsSync(slugOrPath) ? resolve(slugOrPath) : join(CLIPS_DIR, `${slugOrPath}.json`);
  if (!existsSync(path)) throw new Error(`No clip spec found for "${slugOrPath}" (looked for ${path}).`);
  const slug = basename(path, ".json");
  return { path, ...(await checkClip(slug, JSON.parse(readFileSync(path, "utf8")))) };
}

/** The lesson's clip block for a spec: file names from the spec hash, seconds and transcript worked out from the scenes. */
export function clipBlockWith(schema, slug, raw, caption) {
  const c = checkClipWith(schema, slug, raw);
  return {
    c,
    block: { type: "clip", title: c.spec.title, asset: c.names.asset, poster: c.names.poster, seconds: schema.clipBlockSeconds(c.spec), transcript: schema.clipTranscript(c.spec), ...(caption ? { caption } : {}) },
  };
}

/**
 * Length in seconds of an mp3, by walking its MPEG audio frames (no dependencies, works offline).
 * Skips an ID3v2 tag and a Xing/Info header frame. Throws when no frame is found.
 */
export function mp3Seconds(buf) {
  const BITRATES = {
    "1-3": [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
    "2-3": [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
    "1-2": [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384],
    "1-1": [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448],
  };
  const RATES = { 3: [44100, 48000, 32000], 2: [22050, 24000, 16000], 0: [11025, 12000, 8000] };
  let pos = 0;
  if (buf.length > 10 && buf.toString("latin1", 0, 3) === "ID3") pos = 10 + ((buf[6] & 0x7f) << 21 | (buf[7] & 0x7f) << 14 | (buf[8] & 0x7f) << 7 | (buf[9] & 0x7f));
  let seconds = 0;
  let frames = 0;
  while (pos + 4 <= buf.length) {
    if (buf[pos] !== 0xff || (buf[pos + 1] & 0xe0) !== 0xe0) { pos++; continue; }
    const versionBits = (buf[pos + 1] >> 3) & 3; // 3 = MPEG1, 2 = MPEG2, 0 = MPEG2.5
    const layerBits = (buf[pos + 1] >> 1) & 3; // 1 = layer III, 2 = layer II, 3 = layer I
    const brIdx = buf[pos + 2] >> 4;
    const srIdx = (buf[pos + 2] >> 2) & 3;
    const pad = (buf[pos + 2] >> 1) & 1;
    if (versionBits === 1 || layerBits === 0 || brIdx === 0 || brIdx === 15 || srIdx === 3) { pos++; continue; }
    const layer = 4 - layerBits;
    const mpeg1 = versionBits === 3;
    const kbps = (BITRATES[`${mpeg1 ? 1 : 2}-${layer}`] ?? BITRATES["1-3"])[brIdx];
    const rate = RATES[versionBits][srIdx];
    const samples = layer === 1 ? 384 : layer === 3 && !mpeg1 ? 576 : 1152;
    const len = layer === 1 ? (Math.floor((12 * kbps * 1000) / rate) + pad) * 4 : Math.floor(((samples / 8) * kbps * 1000) / rate) + pad;
    if (len < 4) { pos++; continue; }
    const body = buf.toString("latin1", pos + 4, pos + 44);
    if (!(frames === 0 && (body.includes("Xing") || body.includes("Info")))) { seconds += samples / rate; }
    frames++;
    pos += len;
  }
  if (frames === 0) throw new Error("not an mp3 (no audio frames found)");
  return seconds;
}

/** The measured-audio record for a clip (written by scripts/clip-audio.mjs, read by scripts/render-clip.mjs). */
export const audioRecordPath = (specHash) => join(AUDIO_DIR, `${specHash}.json`);
export const sentenceFile = (text) => `${sha256(text)}.mp3`;
