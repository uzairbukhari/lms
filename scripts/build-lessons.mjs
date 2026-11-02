// Builds content/lessons/*.json from the authoring files in scripts/lessons/. Each file exports an array of lessons made
// with scripts/lesson-kit.mjs (which also checks the guidelines while building).
//   node scripts/build-lessons.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "content/lessons");
mkdirSync(out, { recursive: true });

const modules = ["maths", "science", "data-ai", "general-knowledge", "english"];
let count = 0;
for (const m of modules) {
  const { lessons } = await import(`./lessons/${m}.mjs`).catch((e) => {
    if (e.code === "ERR_MODULE_NOT_FOUND" && process.env.ALLOW_MISSING) return { lessons: [] };
    throw e;
  });
  for (const file of lessons) {
    writeFileSync(join(out, `${file.lesson.slug}.json`), JSON.stringify(file, null, 1) + "\n");
    count++;
  }
}
console.log(`wrote ${count} lessons to content/lessons`);
