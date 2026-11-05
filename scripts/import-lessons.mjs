// Imports lesson files into the live app using a Cloudflare Access service token (so Claude can do it for you).
//   LMS_URL=https://lms.sipwise.trade CF_ACCESS_CLIENT_ID=... CF_ACCESS_CLIENT_SECRET=... node scripts/import-lessons.mjs [--publish] content/topics/x.json ...
// The token can only check, import and read lessons and courses, and upload images. See docs/SERVICE_TOKEN.md.
import { readFileSync } from "node:fs";

const { LMS_URL, CF_ACCESS_CLIENT_ID: id, CF_ACCESS_CLIENT_SECRET: secret } = process.env;
if (!LMS_URL || !id || !secret) { console.error("Set LMS_URL, CF_ACCESS_CLIENT_ID and CF_ACCESS_CLIENT_SECRET."); process.exit(2); }
const args = process.argv.slice(2);
const publish = args.includes("--publish");
const files = args.filter((a) => !a.startsWith("--"));
if (files.length === 0) { console.error("Give at least one lesson file."); process.exit(2); }

let failed = 0;
for (const f of files) {
  const res = await fetch(`${LMS_URL}/api/admin/lessons/import`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "CF-Access-Client-Id": id, "CF-Access-Client-Secret": secret },
    body: JSON.stringify({ publish, file: JSON.parse(readFileSync(f, "utf8")) }),
  });
  const body = await res.json().catch(() => ({}));
  if (res.ok) console.log(`${f}: ${body.lesson?.created ? "created" : "updated"} (version ${body.lesson?.version}, ${body.lesson?.status})`);
  else { failed++; console.error(`${f}: ${res.status} ${JSON.stringify(body).slice(0, 600)}`); }
}
process.exit(failed ? 1 : 0);
