// Builds content/topics/*.json (lesson format 3.0) from the authoring files in scripts/topics/.
//   node scripts/build-topics.mjs
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "content/topics");
mkdirSync(out, { recursive: true });
let count = 0;
for (const f of readdirSync(join(root, "scripts/topics")).filter((n) => n.endsWith(".mjs")).sort()) {
  const { topics } = await import(`./topics/${f}`);
  for (const file of topics) { writeFileSync(join(out, `${file.lesson.slug}.json`), JSON.stringify(file, null, 1) + "\n"); count++; }
}
console.log(`wrote ${count} topic lessons to content/topics`);
