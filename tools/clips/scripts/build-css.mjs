// Builds the web app's Tailwind + theme + animation CSS for the clip bundle: tools/clips/src/generated/app.css.
// (The app compiles it with the Vite plugin; Remotion's bundler has no Tailwind, so we compile it once with the Tailwind CLI.)
//   node scripts/build-css.mjs [--force]
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = join(dirname(fileURLToPath(import.meta.url)), "..");
const web = join(here, "..", "..", "apps", "web");
const out = join(here, "src", "generated", "app.css");

const newest = (dir) => readdirSync(dir, { withFileTypes: true }).reduce((n, e) => Math.max(n, e.isDirectory() ? newest(join(dir, e.name)) : statSync(join(dir, e.name)).mtimeMs), 0);
if (!process.argv.includes("--force") && existsSync(out) && statSync(out).mtimeMs > newest(join(web, "src"))) process.exit(0);

mkdirSync(dirname(out), { recursive: true });
const cli = join(here, "node_modules", "@tailwindcss", "cli", "dist", "index.mjs");
// Run from apps/web so Tailwind scans the web app's source for the classes it uses.
const r = spawnSync(process.execPath, [cli, "-i", join(web, "src", "index.css"), "-o", out], { cwd: web, stdio: "inherit" });
if (r.status !== 0) { console.error("Tailwind CSS build failed."); process.exit(1); }
console.log(`built ${out}`);
