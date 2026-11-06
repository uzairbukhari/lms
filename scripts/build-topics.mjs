// Builds content/topics/*.json (lesson format 3.0) from the authoring files in scripts/topics/.
//   node scripts/build-topics.mjs
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CLIP_SPECS } from "./topic-kit.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "content/topics");
mkdirSync(out, { recursive: true });
let count = 0;
// Every file in scripts/topics/ (except helper files starting with _) exports `topics`; new topic files are picked up without editing this list.
for (const m of readdirSync(join(root, "scripts/topics")).filter((f) => f.endsWith(".mjs") && !f.startsWith("_")).sort()) {
  const { topics } = await import(`./topics/${m}`);
  for (const file of topics) { writeFileSync(join(out, `${file.lesson.slug}.json`), JSON.stringify(file, null, 1) + "\n"); count++; }
}
console.log(`wrote ${count} topic lessons to content/topics`);
// A lesson authored with a `clip` spec also gets its spec written to content/clips/<slug>.json (render it with scripts/render-clip.mjs).
if (CLIP_SPECS.size) {
  const clips = join(root, "content/clips");
  mkdirSync(clips, { recursive: true });
  for (const [slug, spec] of CLIP_SPECS) writeFileSync(join(clips, `${slug}.json`), JSON.stringify(spec, null, 1) + "\n");
  console.log(`wrote ${CLIP_SPECS.size} clip specs to content/clips`);
}
