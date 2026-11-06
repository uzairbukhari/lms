import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../env";
import { examBlueprint, examsForCourses } from "../lib/exams";
import { GRAND_MIN_TOPICS, GRAND_PASS_PERCENT, IS_GRAND, grandScopeKey, pickTopicMains, publishedTopicIds, type SourceQuestion } from "../lib/grand";
import { fail, parseBody } from "../lib/http";

/** Semester-end exams: a frozen snapshot of questions drawn from the semester's lesson quizzes. Mounted under /api/admin. */
export const adminExamRoutes = new Hono<AppEnv>();

adminExamRoutes.get("/exams", async (c) => {
  const { results } = await c.env.DB.prepare("SELECT id FROM courses").all<{ id: string }>();
  return c.json({ exams: await examsForCourses(c.env.DB, results.map((r) => r.id)) });
});

const buildSchema = z.object({
  courseId: z.string(),
  semester: z.number().int().min(1).max(4),
  questionCount: z.number().int().min(1).max(60).default(20),
  /** Share of questions drawn from earlier semesters (semester 4 always covers the whole year). */
  revisionPercent: z.number().int().min(0).max(60).default(20),
  maxAttempts: z.number().int().min(1).max(20).nullable().default(2),
  passPercent: z.number().int().min(1).max(100).default(70),
});

function pick<T>(items: T[], n: number): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j] as T, a[i] as T];
  }
  return a.slice(0, n);
}

type Source = { id: string; lessonId: string; semester: number; type: string; prompt: string; media_json: string | null; options_json: string | null; answer_json: string; hint: string | null; explanation: string | null; points: number; skill_tag: string | null };

/**
 * Build (or rebuild) the exam for a course and semester. Questions are copied, not linked, so editing a lesson later
 * never changes an exam children have already sat. Each rebuild is a new version; the old one stays for its attempts.
 */
adminExamRoutes.post("/exams", async (c) => {
  const body = await parseBody(c, buildSchema);
  const db = c.env.DB;
  const course = await db.prepare("SELECT id, subject_id FROM courses WHERE id = ?").bind(body.courseId).first<{ id: string; subject_id: string | null }>();
  if (!course) return fail(c, 404, "course_not_found");

  const { results: sources } = await db
    .prepare(
      `SELECT q.id, cl.lesson_id AS lessonId, cl.semester, q.type, q.prompt, q.media_json, q.options_json, q.answer_json, q.hint, q.explanation, q.points, q.skill_tag
         FROM course_lessons cl
         JOIN lessons l ON l.id = cl.lesson_id AND l.status = 'published'
         JOIN quizzes z ON z.lesson_id = l.id AND z.is_current = 1
         JOIN questions q ON q.quiz_id = z.id
        WHERE cl.course_id = ? AND cl.semester IS NOT NULL AND cl.semester <= ? AND q.variant_of IS NULL
        ORDER BY cl.semester, cl.week, q.position`,
    )
    .bind(body.courseId, body.semester)
    .all<Source>();

  if (!sources.some((s) => s.semester === body.semester)) {
    return fail(c, 400, "no_questions", `There are no published lessons with quizzes in semester ${body.semester} yet.`);
  }
  const plan = examBlueprint(body.semester, body.questionCount, body.revisionPercent);
  const chosen: Source[] = [];
  const blueprint: Record<string, { wanted: number; got: number }> = {};
  for (const [semester, wanted] of plan) {
    const pool = sources.filter((s) => s.semester === semester);
    // Spread across lessons: take one question per lesson in turn, so no single lesson dominates.
    const byLesson = new Map<string, Source[]>();
    for (const s of pool) byLesson.set(s.lessonId, [...(byLesson.get(s.lessonId) ?? []), s]);
    const queues = [...byLesson.values()].map((q) => pick(q, q.length));
    const got: Source[] = [];
    while (got.length < wanted && queues.some((q) => q.length)) {
      for (const q of pick(queues, queues.length)) {
        const next = q.shift();
        if (next && got.length < wanted) got.push(next);
      }
    }
    chosen.push(...got);
    blueprint[`semester_${semester}`] = { wanted, got: got.length };
  }
  const prev = await db
    .prepare("SELECT COALESCE(MAX(version), 0) AS v FROM quizzes WHERE kind = 'exam' AND course_id = ? AND semester = ?")
    .bind(body.courseId, body.semester)
    .first<{ v: number }>();
  const quizId = crypto.randomUUID();
  const order = pick(chosen, chosen.length);
  await db.batch([
    db.prepare("UPDATE quizzes SET is_current = 0 WHERE kind = 'exam' AND course_id = ? AND semester = ?").bind(body.courseId, body.semester),
    db
      .prepare(
        `INSERT INTO quizzes (id, kind, lesson_id, course_id, subject_id, semester, blueprint_json, version, is_current, pass_percent, shuffle_questions, shuffle_options, max_attempts)
         VALUES (?, 'exam', NULL, ?, ?, ?, ?, ?, 1, ?, 1, 1, ?)`,
      )
      .bind(quizId, body.courseId, course.subject_id, body.semester, JSON.stringify({ ...body, blueprint }), (prev?.v ?? 0) + 1, body.passPercent, body.maxAttempts),
    ...order.map((s, i) =>
      db
        .prepare(
          `INSERT INTO questions (id, quiz_id, ref, position, type, prompt, media_json, options_json, answer_json, hint, explanation, points, skill_tag, source_question_id)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(crypto.randomUUID(), quizId, `e${i + 1}`, i + 1, s.type, s.prompt, s.media_json, s.options_json, s.answer_json, s.hint, s.explanation, s.points, s.skill_tag, s.id),
    ),
  ]);
  return c.json({ exam: { id: quizId, questionCount: order.length, blueprint } }, 201);
});

adminExamRoutes.patch("/exams/:id", async (c) => {
  const body = await parseBody(c, z.object({ maxAttempts: z.number().int().min(1).max(20).nullable().optional(), passPercent: z.number().int().min(1).max(100).optional() }));
  const row = await c.env.DB.prepare("SELECT max_attempts, pass_percent FROM quizzes WHERE id = ? AND kind = 'exam'").bind(c.req.param("id")).first<{ max_attempts: number | null; pass_percent: number }>();
  if (!row) return fail(c, 404, "not_found");
  await c.env.DB
    .prepare("UPDATE quizzes SET max_attempts = ?, pass_percent = ? WHERE id = ?")
    .bind(body.maxAttempts === undefined ? row.max_attempts : body.maxAttempts, body.passPercent ?? row.pass_percent, c.req.param("id"))
    .run();
  return c.json({ ok: true });
});

/**
 * Delete an exam. One nobody has sat is removed outright; one with attempts is retired (hidden from children, rebuildable)
 * so the scores already recorded keep their questions.
 */
adminExamRoutes.delete("/exams/:id", async (c) => {
  const id = c.req.param("id");
  const db = c.env.DB;
  const exam = await db.prepare("SELECT id FROM quizzes WHERE id = ? AND kind = 'exam'").bind(id).first();
  if (!exam) return fail(c, 404, "not_found");
  const used = await db.prepare("SELECT COUNT(*) AS n FROM quiz_attempts WHERE quiz_id = ?").bind(id).first<{ n: number }>();
  if ((used?.n ?? 0) > 0) {
    await db.prepare("UPDATE quizzes SET is_current = 0 WHERE id = ?").bind(id).run();
    return c.json({ ok: true, retired: true });
  }
  await db.batch([
    db.prepare("DELETE FROM questions WHERE quiz_id = ?").bind(id),
    db.prepare("DELETE FROM quizzes WHERE id = ?").bind(id),
  ]);
  return c.json({ ok: true, retired: false });
});

// --- Grand quiz (one per course) ---------------------------------------------------------------------------

/** The current grand quiz of each course, if any. */
adminExamRoutes.get("/exams/grand", async (c) => {
  const { results } = await c.env.DB
    .prepare(
      `SELECT z.id, z.course_id AS courseId, z.version, co.title AS courseTitle, (SELECT COUNT(*) FROM questions q WHERE q.quiz_id = z.id) AS questionCount
         FROM quizzes z JOIN courses co ON co.id = z.course_id WHERE ${IS_GRAND} AND z.is_current = 1 ORDER BY co.title`,
    )
    .all();
  return c.json({ exams: results });
});

const grandSchema = z.object({ courseId: z.string(), perTopic: z.number().int().min(1).max(6).default(3) });

/**
 * Build (or rebuild) the grand quiz of a course from its published topic lessons: a few main questions from each topic's
 * current quiz (recall, apply and reason where available), each with its retake variant. Questions are copied, so later
 * edits to a lesson never change a quiz children have already sat. Each rebuild is a new version.
 */
adminExamRoutes.post("/exams/grand", async (c) => {
  const body = await parseBody(c, grandSchema);
  const db = c.env.DB;
  const course = await db.prepare("SELECT id, subject_id FROM courses WHERE id = ?").bind(body.courseId).first<{ id: string; subject_id: string | null }>();
  if (!course) return fail(c, 404, "course_not_found");
  const topics = await publishedTopicIds(db, body.courseId);
  if (topics.length < GRAND_MIN_TOPICS) {
    return fail(c, 400, "not_enough_topics", `A grand quiz needs at least ${GRAND_MIN_TOPICS} published topic lessons; this course has ${topics.length}.`);
  }

  type Copy = { main: SourceQuestion; variant: SourceQuestion | null };
  const copies: Copy[] = [];
  const perTopic: { lessonId: string; got: number }[] = [];
  for (const lessonId of topics) {
    const { results } = await db
      .prepare(
        `SELECT q.id, q.ref, q.position, q.type, q.prompt, q.media_json, q.options_json, q.answer_json, q.hint, q.explanation, q.points, q.skill_tag, q.sub_lesson, q.depth, q.variant_of
           FROM questions q JOIN quizzes z ON z.id = q.quiz_id AND z.is_current = 1 AND z.lesson_id = ? ORDER BY q.position`,
      )
      .bind(lessonId)
      .all<SourceQuestion>();
    const picked = pickTopicMains(results.filter((q) => !q.variant_of), body.perTopic);
    for (const main of picked) copies.push({ main, variant: results.find((q) => q.variant_of === main.ref) ?? null });
    perTopic.push({ lessonId, got: picked.length });
  }
  if (copies.length === 0) return fail(c, 400, "no_questions", "The topic lessons have no quiz questions yet.");

  const prev = await db
    .prepare("SELECT COALESCE(MAX(version), 0) AS v FROM quizzes z WHERE course_id = ? AND " + IS_GRAND)
    .bind(body.courseId)
    .first<{ v: number }>();
  const quizId = crypto.randomUUID();
  const insert = `INSERT INTO questions (id, quiz_id, ref, position, type, prompt, media_json, options_json, answer_json, hint, explanation, points, skill_tag, sub_lesson, depth, variant_of, source_question_id)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  let position = 0;
  const rows: D1PreparedStatement[] = [];
  copies.forEach(({ main, variant }, i) => {
    const ref = `g${i + 1}`;
    const add = (s: SourceQuestion, r: string, variantOf: string | null) =>
      rows.push(
        db.prepare(insert).bind(crypto.randomUUID(), quizId, r, ++position, s.type, s.prompt, s.media_json, s.options_json, s.answer_json, s.hint, s.explanation, s.points, s.skill_tag, s.sub_lesson, s.depth, variantOf, s.id),
      );
    add(main, ref, null);
    if (variant) add(variant, `${ref}v`, ref);
  });
  await db.batch([
    db.prepare("UPDATE quizzes SET is_current = 0 WHERE kind = 'exam' AND semester IS NULL AND course_id = ?").bind(body.courseId),
    db
      .prepare(
        `INSERT INTO quizzes (id, kind, lesson_id, course_id, subject_id, semester, blueprint_json, version, is_current, pass_percent, shuffle_questions, shuffle_options, max_attempts)
         VALUES (?, 'exam', NULL, ?, ?, NULL, ?, ?, 1, ?, 1, 1, NULL)`,
      )
      .bind(quizId, body.courseId, course.subject_id, JSON.stringify({ scope: "course", key: grandScopeKey(body.courseId), perTopic: body.perTopic, topics: perTopic }), (prev?.v ?? 0) + 1, GRAND_PASS_PERCENT),
    ...rows,
  ]);
  return c.json({ exam: { id: quizId, courseId: body.courseId, version: (prev?.v ?? 0) + 1, topics: topics.length, questionCount: copies.length, variantCount: copies.filter((x) => x.variant).length } }, 201);
});
