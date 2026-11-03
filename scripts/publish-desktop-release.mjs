// Publishes a built Windows shell release to R2 and keeps only the newest KEEP versions (docs/DESKTOP_APP.md).
// Run from CI after `tauri build`:  node scripts/publish-desktop-release.mjs <version> <installer.exe> <installer.exe.sig> [notes]
// Needs CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID in the environment. wrangler comes from the worker workspace.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { createRequire } from "node:module";
import { basename, dirname, join, resolve } from "node:path";

const BUCKET = process.env.R2_BUCKET ?? "lms-assets";
const SITE = process.env.LMS_SITE ?? "https://lms.sipwise.trade";
const KEEP = 3;
const TARGET = "windows-x86_64";

const [version, installer, sigFile, notes = ""] = process.argv.slice(2);
if (!version || !installer || !sigFile) throw new Error("usage: publish-desktop-release.mjs <version> <installer> <sig> [notes]");

// Run wrangler through node itself: spawning "npx" fails on Windows runners (npx is a .cmd file).
const wranglerPkg = createRequire(resolve("worker/package.json")).resolve("wrangler/package.json");
const wranglerBin = join(dirname(wranglerPkg), "bin", "wrangler.js");
const wrangler = (...args) => execFileSync(process.execPath, [wranglerBin, ...args], { cwd: "worker", stdio: ["ignore", "pipe", "inherit"], encoding: "utf8" });
const put = (key, file, type) => wrangler("r2", "object", "put", `${BUCKET}/${key}`, "--file", resolve(file), "--content-type", type, "--remote");
const dir = mkdtempSync(join(tmpdir(), "desktop-"));

const cmp = (a, b) => { const x = a.split(".").map(Number), y = b.split(".").map(Number); for (let i = 0; i < 4; i++) { const d = (x[i] ?? 0) - (y[i] ?? 0); if (d) return d; } return 0; };

// 1. Upload the installer and its updater signature.
const file = basename(installer);
const prefix = `desktop/releases/${version}`;
put(`${prefix}/${file}`, installer, "application/octet-stream");

// 2. Point latest.json at it. Keep min_version if one was already set.
let previous = {};
try { wrangler("r2", "object", "get", `${BUCKET}/desktop/latest.json`, "--file", join(dir, "latest.json"), "--remote"); previous = JSON.parse(readFileSync(join(dir, "latest.json"), "utf8")); } catch {}
const latest = {
  version,
  notes,
  pub_date: new Date().toISOString(),
  ...(previous.min_version ? { min_version: previous.min_version } : {}),
  platforms: { [TARGET]: { url: `${SITE}/api/${prefix}/${encodeURIComponent(file)}`, signature: readFileSync(sigFile, "utf8").trim() } },
};
writeFileSync(join(dir, "latest.out.json"), JSON.stringify(latest, null, 2));
put("desktop/latest.json", join(dir, "latest.out.json"), "application/json");

// 3. Keep an index of released versions and delete everything but the newest KEEP.
let index = { versions: {} };
try { wrangler("r2", "object", "get", `${BUCKET}/desktop/releases.json`, "--file", join(dir, "releases.json"), "--remote"); index = JSON.parse(readFileSync(join(dir, "releases.json"), "utf8")); } catch {}
index.versions[version] = [`${prefix}/${file}`];
const ordered = Object.keys(index.versions).sort(cmp).reverse();
for (const old of ordered.slice(KEEP)) {
  for (const key of index.versions[old]) wrangler("r2", "object", "delete", `${BUCKET}/${key}`, "--remote");
  delete index.versions[old];
  console.log(`Deleted old release ${old}`);
}
writeFileSync(join(dir, "releases.out.json"), JSON.stringify(index, null, 2));
put("desktop/releases.json", join(dir, "releases.out.json"), "application/json");
rmSync(dir, { recursive: true, force: true });
console.log(`Published desktop ${version}; keeping ${Object.keys(index.versions).join(", ")}`);
