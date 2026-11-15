import { Hono } from "hono";
import type { AppEnv } from "../env";
import { fail } from "../lib/http";
import { TEMPLATE_VERSION, worksheetHtml } from "../lib/worksheet";

/**
 * Printable worksheets (docs/WORKSHEETS_PLAN.md). Mounted under /api/admin, behind requireAdmin.
 *  - GET  /lessons/:id/worksheet       the self-laying-out A4 page (also what scripts/render-worksheets.mjs turns into a PDF)
 *  - GET  /lessons/:id/worksheet.pdf   download the stored worksheet PDF
 *  - GET  /lessons/:id/answers.pdf     download the stored one-page answer key
 *  - PUT  /lessons/:id/worksheet       store the PDFs (open to the automation service token)
 */
export const adminWorksheetRoutes = new Hono<AppEnv>();

const MAX_PDF = 6 * 1024 * 1024;

type LessonRow = { id: string; slug: string; title: string; version: number; source_json: string };
const lessonRow = (db: D1Database, id: string) =>
  db.prepare("SELECT id, slug, title, current_version AS version, source_json FROM lessons WHERE id = ?").bind(id).first<LessonRow>();

adminWorksheetRoutes.get("/lessons/:id/worksheet", async (c) => {
  const row = await lessonRow(c.env.DB, c.req.param("id"));
  if (!row) return fail(c, 404, "not_found");
  const mode = c.req.query("mode");
  return c.html(worksheetHtml(JSON.parse(row.source_json), { hint: mode !== "sheet" && mode !== "answers" }), 200, {
    "Cache-Control": "no-store",
    "X-Worksheet-Lesson-Version": String(row.version),
    "X-Worksheet-Template-Version": String(TEMPLATE_VERSION),
  });
});

async function sendPdf(c: import("hono").Context<AppEnv>, which: "pdf_key" | "answers_key", suffix: string) {
  const id = c.req.param("id") ?? "";
  const row = await c.env.DB
    .prepare(`SELECT w.${which} AS key, l.title FROM worksheets w JOIN lessons l ON l.id = w.lesson_id WHERE w.lesson_id = ?`)
    .bind(id)
    .first<{ key: string; title: string }>();
  if (!row) return fail(c, 404, "not_made", "There is no worksheet for this lesson yet.");
  const obj = await c.env.ASSETS_BUCKET.get(row.key);
  if (!obj) return fail(c, 404, "not_made", "The worksheet file is missing. Ask Claude to render it again.");
  const name = `${row.title} - ${suffix}.pdf`;
  const ascii = name.replace(/[^\x20-\x7e]+/g, "").replace(/["\\]/g, "") || `${suffix}.pdf`;
  return new Response(obj.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(name)}`,
      "Cache-Control": "private, no-cache",
    },
  });
}
adminWorksheetRoutes.get("/lessons/:id/worksheet.pdf", (c) => sendPdf(c, "pdf_key", "worksheet"));
adminWorksheetRoutes.get("/lessons/:id/answers.pdf", (c) => sendPdf(c, "answers_key", "answer key"));

/** Store a rendered worksheet and its answer key. Replaces the lesson's current one. */
adminWorksheetRoutes.put("/lessons/:id/worksheet", async (c) => {
  const row = await lessonRow(c.env.DB, c.req.param("id"));
  if (!row) return fail(c, 404, "not_found");
  const form = await c.req.formData().catch(() => null);
  const sheet = form?.get("sheet");
  const answers = form?.get("answers");
  const pages = Number(form?.get("pages"));
  const questions = Number(form?.get("questions"));
  const forVersion = form?.get("lessonVersion");
  if (!(sheet instanceof File) || !(answers instanceof File)) return fail(c, 400, "invalid_input", "Send the worksheet as 'sheet' and the answer key as 'answers'.");
  if (!Number.isInteger(pages) || pages < 1 || pages > 2) return fail(c, 400, "too_long", "A worksheet must be 1 or 2 pages.");
  if (!Number.isInteger(questions) || questions < 0) return fail(c, 400, "invalid_input", "Send how many questions are on the sheet.");
  if (sheet.size > MAX_PDF || answers.size > MAX_PDF) return fail(c, 400, "too_big", "A PDF is too big (6 MB at most).");
  if (typeof forVersion === "string" && forVersion !== "" && Number(forVersion) !== row.version) {
    return fail(c, 409, "lesson_changed", "The lesson changed while the worksheet was being made. Render it again.");
  }
  const [sheetBytes, answerBytes] = [await sheet.arrayBuffer(), await answers.arrayBuffer()];
  const isPdf = (b: ArrayBuffer) => new TextDecoder("latin1").decode(new Uint8Array(b, 0, Math.min(5, b.byteLength))) === "%PDF-";
  if (!isPdf(sheetBytes) || !isPdf(answerBytes)) return fail(c, 400, "bad_type", "Both files must be PDFs.");

  const base = `worksheets/${row.slug}/v${row.version}-t${TEMPLATE_VERSION}`;
  const pdfKey = `${base}-sheet.pdf`;
  const answersKey = `${base}-answers.pdf`;
  const previous = await c.env.DB.prepare("SELECT pdf_key, answers_key FROM worksheets WHERE lesson_id = ?").bind(row.id).first<{ pdf_key: string; answers_key: string }>();
  await c.env.ASSETS_BUCKET.put(pdfKey, sheetBytes, { httpMetadata: { contentType: "application/pdf" } });
  await c.env.ASSETS_BUCKET.put(answersKey, answerBytes, { httpMetadata: { contentType: "application/pdf" } });
  await c.env.DB
    .prepare(
      `INSERT INTO worksheets (lesson_id, lesson_version, template_version, pdf_key, answers_key, pages, questions, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
       ON CONFLICT(lesson_id) DO UPDATE SET lesson_version = excluded.lesson_version, template_version = excluded.template_version,
         pdf_key = excluded.pdf_key, answers_key = excluded.answers_key, pages = excluded.pages, questions = excluded.questions, updated_at = excluded.updated_at`,
    )
    .bind(row.id, row.version, TEMPLATE_VERSION, pdfKey, answersKey, pages, questions)
    .run();
  // An older version's files are no longer reachable: tidy them away.
  const stale = [previous?.pdf_key, previous?.answers_key].filter((k): k is string => !!k && k !== pdfKey && k !== answersKey);
  if (stale.length) await c.env.ASSETS_BUCKET.delete(stale);
  return c.json({ worksheet: { lessonId: row.id, lessonVersion: row.version, templateVersion: TEMPLATE_VERSION, pages, questions } });
});
