// Uploads lesson media (photos, diagrams, clips, posters) to the live app, using the same Cloudflare Access service token as the lesson importer.
//   LMS_URL=https://lms.sipwise.trade CF_ACCESS_CLIENT_ID=... CF_ACCESS_CLIENT_SECRET=... node scripts/upload-media.mjs path/to/file.jpg ...
// Every file must already have an entry in content/media/manifest.json (see content/media/README.md); the sha256 there must match the file.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { basename, extname } from "node:path";

const TYPES = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml", ".mp3": "audio/mpeg", ".mp4": "video/mp4" };
const { LMS_URL, CF_ACCESS_CLIENT_ID: id, CF_ACCESS_CLIENT_SECRET: secret } = process.env;
if (!LMS_URL || !id || !secret) { console.error("Set LMS_URL, CF_ACCESS_CLIENT_ID and CF_ACCESS_CLIENT_SECRET."); process.exit(2); }
const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (files.length === 0) { console.error("Give at least one media file."); process.exit(2); }

import { loadManifest } from "./media-manifest.mjs";
const entries = new Map(loadManifest().map((f) => [f.file, f]));

let failed = 0;
for (const path of files) {
  const name = basename(path).toLowerCase();
  const type = TYPES[extname(name)];
  const bytes = readFileSync(path);
  const entry = entries.get(name);
  const sha = createHash("sha256").update(bytes).digest("hex");
  if (!type) { failed++; console.error(`${path}: unsupported file type`); continue; }
  if (!entry) { failed++; console.error(`${path}: not in content/media/manifest.json. Add its record first.`); continue; }
  if (entry.sha256 !== sha) { failed++; console.error(`${path}: sha256 differs from the manifest (file ${sha.slice(0, 12)}, manifest ${String(entry.sha256).slice(0, 12)})`); continue; }
  const form = new FormData();
  form.set("file", new File([bytes], name, { type }));
  if (entry.alt) form.set("alt", entry.alt);
  const res = await fetch(`${LMS_URL}/api/admin/assets`, { method: "POST", headers: { "CF-Access-Client-Id": id, "CF-Access-Client-Secret": secret }, body: form });
  const body = await res.json().catch(() => ({}));
  if (res.ok) console.log(`${name}: uploaded (${(bytes.length / 1024).toFixed(0)} KB)`);
  else { failed++; console.error(`${name}: ${res.status} ${JSON.stringify(body).slice(0, 300)}`); }
}
process.exit(failed ? 1 : 0);
