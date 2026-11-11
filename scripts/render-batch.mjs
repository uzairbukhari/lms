// Renders the next N narrated clips, one at a time, in course order, and stops cleanly when the daily voice budget runs out.
//   node scripts/render-batch.mjs               the next 20 clips that have no video yet
//   node scripts/render-batch.mjs --count 5     the next 5
//   node scripts/render-batch.mjs --dry-run     only list which clips it would render
//   node scripts/render-batch.mjs --silent      no narration (no token needed; for looking at pictures and timing)
// Narrated mode needs the service token in the environment (docs/SERVICE_TOKEN.md):
//   LMS_URL, CF_ACCESS_CLIENT_ID, CF_ACCESS_CLIENT_SECRET
// It is safe to run again and again: a clip whose video already exists is skipped, and sentences already voiced are free.
// A log of every run is kept in tools/clips/out/batch-log.txt.
import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { CLIPS_DIR, OUT_DIR, ROOT, checkClip } from "./clip-kit.mjs";

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const countAt = args.indexOf("--count");
const COUNT = countAt >= 0 ? Math.max(1, Number(args[countAt + 1]) || 20) : 20;
const SILENT = flag("silent");
const DRY = flag("dry-run");
const EXIT_BUDGET = 3;
const STOP_AFTER_FAILURES = 3; // this many failures in a row (a wrong token, a network problem) and it stops instead of trying all the rest

const COURSE_ORDER = ["maths-7-8", "maths-9-10", "science-7-8", "science-9-10", "english-7-8", "english-9-10", "general-knowledge-7-8", "general-knowledge-9-10", "data-ai-7-8", "data-ai-9-10"];
const read = (p) => JSON.parse(readFileSync(p, "utf8").replace(/^﻿/, ""));

if (!SILENT && !DRY) {
  const missing = ["LMS_URL", "CF_ACCESS_CLIENT_ID", "CF_ACCESS_CLIENT_SECRET"].filter((v) => !process.env[v]);
  if (missing.length) {
    console.error(`Set ${missing.join(", ")} first (see docs/SERVICE_TOKEN.md). In PowerShell:\n  $env:LMS_URL = "https://lms.sipwise.trade"\n  $env:CF_ACCESS_CLIENT_ID = "..."\n  $env:CF_ACCESS_CLIENT_SECRET = "..."`);
    process.exit(2);
  }
}

// Every clip spec in course order (course, then topic number). Specs named sample-* are examples and are left out.
function ordered() {
  const items = readdirSync(CLIPS_DIR).filter((f) => f.endsWith(".json") && !f.startsWith("sample-")).map((f) => f.replace(/\.json$/, ""));
  const info = items.map((slug) => {
    const lessonPath = join(ROOT, "content", "topics", `${slug}.json`);
    let course = "zz", topic = 999;
    if (existsSync(lessonPath)) { const l = read(lessonPath).lesson; course = `${l.subject}-${l.age_band}`; topic = l.curriculum?.topic ?? 999; }
    const ci = COURSE_ORDER.indexOf(course);
    return { slug, ci: ci < 0 ? 99 : ci, topic };
  });
  return info.sort((a, b) => a.ci - b.ci || a.topic - b.topic || a.slug.localeCompare(b.slug)).map((x) => x.slug);
}

async function isDone(slug) {
  const raw = read(join(CLIPS_DIR, `${slug}.json`));
  const { names } = await checkClip(slug, raw);
  return existsSync(join(OUT_DIR, names.asset)) && existsSync(join(OUT_DIR, names.poster));
}

mkdirSync(OUT_DIR, { recursive: true });
const LOG = join(OUT_DIR, "batch-log.txt");
const log = (line) => { console.log(line); appendFileSync(LOG, `${new Date().toISOString()} ${line}\n`); };

const all = ordered();
const todo = [];
for (const slug of all) { if (!(await isDone(slug))) todo.push(slug); }
const batch = todo.slice(0, COUNT);
log(`${all.length} clips in all, ${all.length - todo.length} already rendered, ${todo.length} to go. This run: ${batch.length}${SILENT ? " (silent)" : ""}.`);
if (DRY || !batch.length) { for (const s of batch) console.log("  would render", s); process.exit(0); }

const done = [], failed = [];
let inARow = 0, stoppedForBudget = false;
const t0 = Date.now();
for (const [i, slug] of batch.entries()) {
  const start = Date.now();
  log(`[${i + 1}/${batch.length}] ${slug}`);
  const r = spawnSync(process.execPath, [join(ROOT, "scripts", "render-clip.mjs"), slug, ...(SILENT ? ["--silent"] : [])], { cwd: ROOT, stdio: "inherit", env: process.env });
  const secs = Math.round((Date.now() - start) / 1000);
  if (r.status === 0) {
    done.push(slug); inARow = 0;
    log(`  ok in ${secs}s`);
  } else if (r.status === EXIT_BUDGET) {
    stoppedForBudget = true;
    log(`  the daily voice budget is used up. Stopping. Run this command again after 00:00 UTC to carry on (sentences already voiced are kept).`);
    break;
  } else {
    failed.push(slug); inARow++;
    log(`  FAILED (exit ${r.status}) after ${secs}s`);
    if (inARow >= STOP_AFTER_FAILURES) { log(`  ${STOP_AFTER_FAILURES} failures in a row. Stopping, because something is wrong (the token, the network?). Fix it and run again.`); break; }
  }
}

const mins = ((Date.now() - t0) / 60000).toFixed(1);
let mb = 0;
for (const s of done) { try { const { names } = await checkClip(s, read(join(CLIPS_DIR, `${s}.json`))); mb += statSync(join(OUT_DIR, names.asset)).size / 1e6; } catch { /* ignore */ } }
log(`Finished in ${mins} min: ${done.length} rendered (${mb.toFixed(1)} MB), ${failed.length} failed${stoppedForBudget ? ", stopped at the voice budget" : ""}, ${todo.length - done.length} still to do.`);
if (failed.length) log(`Failed: ${failed.join(", ")}`);
log(`Videos are in tools/clips/out/. Each is marked "reviewed: false" in its lesson's media manifest: watch it, then set it to true.`);
process.exit(failed.length || stoppedForBudget ? 1 : 0);
