// Renders printable worksheets (docs/WORKSHEETS_PLAN.md) to PDF and stores them in the live app, using the Cloudflare Access service token.
//   LMS_URL=https://lms.sipwise.trade CF_ACCESS_CLIENT_ID=... CF_ACCESS_CLIENT_SECRET=... node scripts/render-worksheets.mjs [--all] [--only slug,slug] [--dry-run]
// By default it makes a worksheet for every lesson in a published course that has none, and re-makes the ones marked "out of date".
//   --all       re-make every lesson in a published course, even if its worksheet is up to date
//   --only      only these lesson slugs (comma separated)
//   --dry-run   say what would be made and stop
// The app lays each sheet out itself (as many of the lesson's quiz questions as fit on two A4 pages); this script just prints that page
// to a worksheet PDF and a one-page answer key, checks the page counts, and uploads both. It needs Playwright (preinstalled in Claude's cloud
// environment). The token may only read lessons and store worksheets (see docs/SERVICE_TOKEN.md).
import { execSync } from "node:child_process";
import { createRequire } from "node:module";

const { LMS_URL, CF_ACCESS_CLIENT_ID: id, CF_ACCESS_CLIENT_SECRET: secret } = process.env;
if (!LMS_URL || !id || !secret) { console.error("Set LMS_URL, CF_ACCESS_CLIENT_ID and CF_ACCESS_CLIENT_SECRET."); process.exit(2); }
const args = process.argv.slice(2);
const all = args.includes("--all");
const dryRun = args.includes("--dry-run");
const onlyArg = args.find((a) => a.startsWith("--only"));
const only = onlyArg ? (onlyArg.includes("=") ? onlyArg.split("=")[1] : args[args.indexOf(onlyArg) + 1] ?? "").split(",").filter(Boolean) : null;

const headers = { "CF-Access-Client-Id": id, "CF-Access-Client-Secret": secret };
const get = async (path) => {
  const res = await fetch(`${LMS_URL}${path}`, { headers });
  if (!res.ok) throw new Error(`${path}: ${res.status} ${(await res.text()).slice(0, 300)}`);
  return res;
};

const { lessons } = await (await get("/api/admin/lessons")).json();
const todo = lessons.filter((l) =>
  (only ? only.includes(l.slug) : true) &&
  (all ? l.worksheet.state !== "ineligible" || (only && only.includes(l.slug)) : l.worksheet.state === "none" || l.worksheet.state === "stale"));
console.log(`${todo.length} worksheet${todo.length === 1 ? "" : "s"} to make.`);
if (dryRun || todo.length === 0) { for (const l of todo) console.log(`  ${l.slug} (${l.worksheet.state})`); process.exit(0); }

const root = execSync("npm root -g").toString().trim();
const { chromium } = createRequire(`${root}/`)("playwright");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
let failed = 0;
for (const l of todo) {
  try {
    const html = await (await get(`/api/admin/lessons/${l.id}/worksheet?mode=sheet`)).text();
    await page.setContent(html, { waitUntil: "load" });
    await page.waitForSelector("body[data-ready]", { state: "attached", timeout: 30000 });
    const info = await page.evaluate(() => window.__worksheet);
    if (!info || info.error) throw new Error(`layout failed: ${info?.error ?? "no result"}`);
    if (info.overflow) throw new Error("content overflows the page");
    if (!info.keyFits) throw new Error("the answer key does not fit on one page");
    await page.evaluate(() => document.body.setAttribute("data-mode", "sheet"));
    const sheet = await page.pdf({ printBackground: true, preferCSSPageSize: true });
    await page.evaluate(() => document.body.setAttribute("data-mode", "answers"));
    const answers = await page.pdf({ printBackground: true, preferCSSPageSize: true });
    const pagesIn = (buf) => (buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
    if (pagesIn(sheet) > 2) throw new Error(`worksheet came out at ${pagesIn(sheet)} pages`);
    if (pagesIn(answers) !== 1) throw new Error(`answer key came out at ${pagesIn(answers)} pages`);
    const form = new FormData();
    form.set("sheet", new Blob([sheet], { type: "application/pdf" }), `${l.slug}.pdf`);
    form.set("answers", new Blob([answers], { type: "application/pdf" }), `${l.slug}-answers.pdf`);
    form.set("pages", String(Math.min(2, pagesIn(sheet))));
    form.set("questions", String(info.questions));
    form.set("lessonVersion", String(l.version));
    const res = await fetch(`${LMS_URL}/api/admin/lessons/${l.id}/worksheet`, { method: "PUT", headers, body: form });
    if (!res.ok) throw new Error(`upload: ${res.status} ${(await res.text()).slice(0, 300)}`);
    console.log(`${l.slug}: ${info.questions} questions, ${pagesIn(sheet)} page${pagesIn(sheet) === 1 ? "" : "s"}`);
  } catch (e) {
    failed++;
    console.error(`${l.slug}: ${e instanceof Error ? e.message : e}`);
  }
}
await browser.close();
process.exit(failed ? 1 : 0);
