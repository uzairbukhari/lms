// Imports lesson files into the live app using a Cloudflare Access service token (so Claude can do it for you).
//   LMS_URL=https://lms.sipwise.trade CF_ACCESS_CLIENT_ID=... CF_ACCESS_CLIENT_SECRET=... node scripts/import-lessons.mjs [--publish] content/topics/x.json ...
// The token can only check, import and read lessons and courses, and upload images. See docs/SERVICE_TOKEN.md.
import { readFileSync } from "node:fs";

const { LMS_URL, CF_ACCESS_CLIENT_ID: id, CF_ACCESS_CLIENT_SECRET: secret } = process.env;
if (!LMS_URL || !id || !secret) { console.error("Set LMS_URL, CF_ACCESS_CLIENT_ID and CF_ACCESS_CLIENT_SECRET."); process.exit(2); }
const args = process.argv.slice(2);
const publish = args.includes("--publish");
const allowMissingMedia = args.includes("--allow-missing-media");
// A lesson whose clip is not rendered yet can go in without its "Movie time" stop (so it can be published now and re-imported with the clip later).
const skipUnrenderedClips = args.includes("--skip-unrendered-clips");
const files = args.filter((a) => !a.startsWith("--"));
if (files.length === 0) { console.error("Give at least one lesson file."); process.exit(2); }

import { loadManifest } from "./media-manifest.mjs";
const known = new Set(loadManifest().map((f) => f.file));
const assetsIn = (file) => [...(file.blocks ?? []), ...(file.sub_lessons ?? []).flatMap((s) => s.blocks)].flatMap((b) => (b.type === "image" && b.asset ? [b.asset] : b.type === "clip" ? [b.asset, b.poster] : []));

// Takes out every clip block whose video or poster is not in the media manifest, and the "Movie time" heading just before it.
function withoutUnrenderedClips(lesson) {
  let removed = 0;
  const clean = (blocks) => (blocks ?? []).filter((b, i, all) => {
    if (b.type === "clip" && !(known.has(b.asset) && known.has(b.poster))) { removed++; return false; }
    const next = all[i + 1];
    if (b.type === "heading" && b.text === "Movie time" && next?.type === "clip" && !(known.has(next.asset) && known.has(next.poster))) return false;
    return true;
  });
  lesson.blocks = clean(lesson.blocks);
  if (lesson.sub_lessons) lesson.sub_lessons = lesson.sub_lessons.map((s) => ({ ...s, blocks: clean(s.blocks) }));
  return removed;
}

let failed = 0;
for (const f of files) {
  const lessonFile = JSON.parse(readFileSync(f, "utf8").replace(/^\uFEFF/, ""));
  if (skipUnrenderedClips) { const n = withoutUnrenderedClips(lessonFile); if (n) console.log(`${f}: clip not rendered yet, importing without its Movie time stop`); }
  const unknown = assetsIn(lessonFile).filter((a) => !known.has(a));
  if (unknown.length && !allowMissingMedia) { failed++; console.error(`${f}: not imported. These pictures or clips are not in the media manifest yet (render the clip, or add the record, then upload them): ${unknown.join(", ")}. Use --allow-missing-media to import a draft anyway.`); continue; }
  const res = await fetch(`${LMS_URL}/api/admin/lessons/import`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "CF-Access-Client-Id": id, "CF-Access-Client-Secret": secret },
    body: JSON.stringify({ publish, file: lessonFile }),
  });
  const body = await res.json().catch(() => ({}));
  if (res.ok) console.log(`${f}: ${body.lesson?.created ? "created" : "updated"} (version ${body.lesson?.version}, ${body.lesson?.status})`);
  else { failed++; console.error(`${f}: ${res.status} ${JSON.stringify(body).slice(0, 600)}`); }
}
process.exit(failed ? 1 : 0);
