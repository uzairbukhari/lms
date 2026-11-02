import { Hono } from "hono";
import { z } from "zod";
import { parseLessonFile, SUBJECTS } from "@lms/schema";
import type { AppEnv } from "../env";
import { fail, parseBody } from "../lib/http";
import { importLesson, missingAssets } from "../lib/lessons";

/** Lessons, courses (the curriculum planner) and uploaded files. Mounted under /api/admin, behind requireAdmin. */
export const adminContentRoutes = new Hono<AppEnv>();

// --- Lessons ---------------------------------------------------------------------------------------

const importSchema = z.object({ file: z.unknown(), publish: z.boolean().optional() });

/** Check a lesson file without saving it. Returns readable problems you can paste back to Claude. */
adminContentRoutes.post("/lessons/validate", async (c) => {
  const { file } = await parseBody(c, importSchema);
  const parsed = parseLessonFile(file);
  if (!parsed.ok) return c.json({ ok: false, issues: parsed.issues }, 200);
  const l = parsed.lesson;
  return c.json({
    ok: true,
    summary: {
      slug: l.lesson.slug,
      title: l.lesson.title,
      subject: l.lesson.subject,
      blocks: l.blocks.length,
      questions: l.quiz.questions.length,
      curriculum: l.lesson.curriculum ?? null,
    },
    missingAssets: await missingAssets(c.env.DB, l),
  });
});

adminContentRoutes.post("/lessons/import", async (c) => {
  const { file, publish } = await parseBody(c, importSchema);
  const parsed = parseLessonFile(file);
  if (!parsed.ok) return c.json({ error: "invalid_lesson", issues: parsed.issues }, 400);
  const result = await importLesson(c.env.DB, parsed.lesson, { publish });
  return c.json({ lesson: result, missingAssets: await missingAssets(c.env.DB, parsed.lesson) }, result.created ? 201 : 200);
});

adminContentRoutes.get("/lessons", async (c) => {
  const subject = c.req.query("subject");
  const status = c.req.query("status");
  const where: string[] = [];
  const binds: string[] = [];
  if (subject && (SUBJECTS as readonly string[]).includes(subject)) {
    where.push("l.subject_id = ?");
    binds.push(subject);
  }
  if (status && ["draft", "published", "archived"].includes(status)) {
    where.push("l.status = ?");
    binds.push(status);
  }
  const sql = `SELECT l.id, l.slug, l.title, l.subject_id AS subject, l.status, l.current_version AS version, l.unit,
                      l.age_band AS ageBand, l.difficulty, l.estimated_minutes AS minutes, l.updated_at AS updatedAt,
                      (SELECT COUNT(*) FROM questions q JOIN quizzes z ON z.id = q.quiz_id WHERE z.lesson_id = l.id AND z.is_current = 1) AS questionCount
                 FROM lessons l ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY l.subject_id, l.sort_order, l.title`;
  const { results } = await c.env.DB.prepare(sql).bind(...binds).all<{ id: string }>();
  const slots = await c.env.DB
    .prepare(
      `SELECT cl.lesson_id AS lessonId, cl.course_id AS courseId, co.title AS courseTitle, cl.semester, cl.week
         FROM course_lessons cl JOIN courses co ON co.id = cl.course_id`,
    )
    .all<{ lessonId: string; courseId: string }>();
  // Which classes each course is assigned to, so the admin can filter lessons by class.
  const assigned = await c.env.DB
    .prepare("SELECT course_id AS courseId, class_id AS classId FROM course_assignments WHERE class_id IS NOT NULL")
    .all<{ courseId: string; classId: string }>();
  const classes = await c.env.DB.prepare("SELECT id, name FROM classes ORDER BY name").all<{ id: string; name: string }>();
  return c.json({
    classes: classes.results,
    lessons: results.map((l) => ({
      ...l,
      slots: slots.results
        .filter((s) => s.lessonId === l.id)
        .map((s) => ({ ...s, classIds: assigned.results.filter((a) => a.courseId === s.courseId).map((a) => a.classId) })),
    })),
  });
});

adminContentRoutes.get("/lessons/:id", async (c) => {
  const row = await c.env.DB
    .prepare("SELECT id, slug, status, current_version AS version, source_json FROM lessons WHERE id = ?")
    .bind(c.req.param("id"))
    .first<{ id: string; slug: string; status: string; version: number; source_json: string }>();
  if (!row) return fail(c, 404, "not_found");
  // The admin sees the whole file, answers included, so previews and re-editing with Claude work.
  return c.json({ lesson: { id: row.id, slug: row.slug, status: row.status, version: row.version, file: JSON.parse(row.source_json) } });
});

/** The lesson exactly as a child's player receives it, so the parent can preview any lesson, published or not. */
adminContentRoutes.get("/lessons/:id/preview", async (c) => {
  const row = await c.env.DB
    .prepare("SELECT id, slug, title, subject_id AS subject, summary, estimated_minutes AS minutes, unit, content_json, source_json FROM lessons WHERE id = ?")
    .bind(c.req.param("id"))
    .first<{ id: string; slug: string; title: string; subject: string; summary: string; minutes: number; unit: string | null; content_json: string; source_json: string }>();
  if (!row) return fail(c, 404, "not_found");
  const file = JSON.parse(row.source_json) as { lesson: { learning_objectives: string[] }; quiz: { questions: unknown[]; pass_percent?: number } };
  return c.json({
    lesson: { id: row.id, slug: row.slug, title: row.title, subject: row.subject, summary: row.summary, minutes: row.minutes, unit: row.unit, objectives: file.lesson.learning_objectives, semester: null, week: null, phase: "current" },
    blocks: JSON.parse(row.content_json),
    quiz: { questionCount: file.quiz.questions.length, passPercent: file.quiz.pass_percent ?? 70 },
    progress: null,
    readOnly: true, // previews never record progress
    preview: true,
  });
});

adminContentRoutes.patch("/lessons/:id", async (c) => {
  const { status } = await parseBody(c, z.object({ status: z.enum(["draft", "published", "archived"]) }));
  const res = await c.env.DB
    .prepare("UPDATE lessons SET status = ?, updated_at = datetime('now') WHERE id = ?")
    .bind(status, c.req.param("id"))
    .run();
  if (!res.meta.changes) return fail(c, 404, "not_found");
  return c.json({ ok: true, status });
});

// --- Courses and the curriculum planner ------------------------------------------------------------

adminContentRoutes.get("/courses", async (c) => {
  const { results } = await c.env.DB
    .prepare(
      `SELECT co.id, co.slug, co.title, co.subject_id AS subject, co.age_band AS ageBand, co.status,
              (SELECT COUNT(*) FROM course_lessons cl WHERE cl.course_id = co.id) AS lessonCount
         FROM courses co ORDER BY co.title`,
    )
    .all();
  return c.json({ courses: results });
});

const slugSchema = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lower case words joined with -").max(80);

adminContentRoutes.post("/courses", async (c) => {
  const body = await parseBody(
    c,
    z.object({
      title: z.string().trim().min(1).max(80),
      slug: slugSchema.optional(),
      subject: z.enum(SUBJECTS).optional(),
      ageBand: z.enum(["7-8", "9-10", "7-10"]).optional(),
    }),
  );
  const slug = body.slug ?? body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (await c.env.DB.prepare("SELECT 1 FROM courses WHERE slug = ?").bind(slug).first()) {
    return fail(c, 409, "slug_taken", "A course with that name already exists.");
  }
  const id = crypto.randomUUID();
  await c.env.DB
    .prepare("INSERT INTO courses (id, slug, title, subject_id, age_band, status) VALUES (?, ?, ?, ?, ?, 'published')")
    .bind(id, slug, body.title, body.subject ?? null, body.ageBand ?? null)
    .run();
  return c.json({ course: { id, slug, title: body.title } }, 201);
});

adminContentRoutes.patch("/courses/:id", async (c) => {
  const body = await parseBody(c, z.object({ title: z.string().trim().min(1).max(80).optional(), status: z.enum(["draft", "published", "archived"]).optional() }));
  const row = await c.env.DB.prepare("SELECT title, status FROM courses WHERE id = ?").bind(c.req.param("id")).first<{ title: string; status: string }>();
  if (!row) return fail(c, 404, "not_found");
  await c.env.DB
    .prepare("UPDATE courses SET title = ?, status = ? WHERE id = ?")
    .bind(body.title ?? row.title, body.status ?? row.status, c.req.param("id"))
    .run();
  return c.json({ ok: true });
});

adminContentRoutes.get("/courses/:id", async (c) => {
  const course = await c.env.DB
    .prepare("SELECT id, slug, title, subject_id AS subject, age_band AS ageBand, status FROM courses WHERE id = ?")
    .bind(c.req.param("id"))
    .first();
  if (!course) return fail(c, 404, "not_found");
  const { results } = await c.env.DB
    .prepare(
      `SELECT cl.lesson_id AS lessonId, l.title, l.subject_id AS subject, l.status, cl.semester, cl.week
         FROM course_lessons cl JOIN lessons l ON l.id = cl.lesson_id
        WHERE cl.course_id = ? ORDER BY cl.semester, cl.week, l.title`,
    )
    .bind(c.req.param("id"))
    .all();
  return c.json({ course, slots: results });
});

/** Replace the course's lesson list. Each lesson has an optional semester and week; unscheduled lessons stay in the course but are never shown to children. */
adminContentRoutes.put("/courses/:id/lessons", async (c) => {
  const id = c.req.param("id");
  if (!(await c.env.DB.prepare("SELECT 1 FROM courses WHERE id = ?").bind(id).first())) return fail(c, 404, "not_found");
  const { slots } = await parseBody(
    c,
    z.object({
      slots: z
        .array(
          z.object({
            lessonId: z.string(),
            semester: z.number().int().min(1).max(4).nullable(),
            week: z.number().int().min(1).max(13).nullable(),
          }),
        )
        .max(500),
    }),
  );
  if (slots.some((s) => (s.semester === null) !== (s.week === null))) {
    return fail(c, 400, "invalid_input", "Give both a semester and a week, or neither.");
  }
  const db = c.env.DB;
  await db.batch([
    db.prepare("DELETE FROM course_lessons WHERE course_id = ?").bind(id),
    ...slots.map((s, i) =>
      db
        .prepare("INSERT INTO course_lessons (course_id, lesson_id, position, semester, week) VALUES (?, ?, ?, ?, ?)")
        .bind(id, s.lessonId, s.semester !== null && s.week !== null ? s.semester * 100 + s.week : 9000 + i, s.semester, s.week),
    ),
  ]);
  return c.json({ ok: true });
});

// --- Uploaded files (images and audio used by lessons) ---------------------------------------------

const ALLOWED_TYPES: Record<string, string[]> = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/webp": [".webp"],
  "image/gif": [".gif"],
  "image/svg+xml": [".svg"],
  "audio/mpeg": [".mp3"],
};
const MAX_BYTES = 8 * 1024 * 1024;

adminContentRoutes.get("/assets", async (c) => {
  const { results } = await c.env.DB
    .prepare("SELECT id, filename, mime_type AS mimeType, size_bytes AS sizeBytes, alt_text AS altText, created_at AS createdAt FROM assets ORDER BY filename")
    .all();
  return c.json({ assets: results });
});

/** Upload (or replace) a file. The filename you upload is the name lessons use in their "asset" field. */
adminContentRoutes.post("/assets", async (c) => {
  const form = await c.req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return fail(c, 400, "invalid_input", "Choose a file to upload.");
  const filename = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+/, "");
  const ext = filename.slice(filename.lastIndexOf("."));
  if (!ALLOWED_TYPES[file.type]?.includes(ext)) return fail(c, 400, "bad_type", "Use a png, jpg, webp, gif, svg or mp3 file.");
  if (file.size > MAX_BYTES) return fail(c, 400, "too_big", "That file is too big (8 MB at most).");
  const alt = form?.get("alt");

  const key = `lessons/${filename}`;
  await c.env.ASSETS_BUCKET.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
  const existing = await c.env.DB.prepare("SELECT id FROM assets WHERE filename = ?").bind(filename).first<{ id: string }>();
  if (existing) {
    await c.env.DB
      .prepare("UPDATE assets SET mime_type = ?, size_bytes = ?, alt_text = COALESCE(?, alt_text) WHERE id = ?")
      .bind(file.type, file.size, typeof alt === "string" ? alt : null, existing.id)
      .run();
  } else {
    await c.env.DB
      .prepare("INSERT INTO assets (id, r2_key, filename, mime_type, size_bytes, alt_text) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(crypto.randomUUID(), key, filename, file.type, file.size, typeof alt === "string" ? alt : null)
      .run();
  }
  return c.json({ asset: { filename, mimeType: file.type, sizeBytes: file.size } }, existing ? 200 : 201);
});
