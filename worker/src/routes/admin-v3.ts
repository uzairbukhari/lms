import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../env";
import { fail, parseBody } from "../lib/http";
import { can } from "../lib/permissions";
import { classExamScopeKey, classExamsFor, lessonsForExam, mainQuestions, proposeQuestions } from "../lib/classExams";
import type { SourceQuestion } from "../lib/grand";

/** Tags, courses in a class (with unlock rules) and teachers. Mounted under /api/admin, behind requireAdmin. */
export const adminV3Routes = new Hono<AppEnv>();

const audit = (c: { env: { DB: D1Database }; get: (k: "admin") => { userId: string } }, action: string, target: string, detail?: unknown) =>
  c.env.DB.prepare("INSERT INTO audit_log (id, actor_id, action, target, detail_json) VALUES (?, ?, ?, ?, ?)")
    .bind(crypto.randomUUID(), c.get("admin").userId, action, target, detail === undefined ? null : JSON.stringify(detail))
    .run();

// ---- Tags ----
adminV3Routes.get("/tags", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT t.id, t.kind, t.label, t.code, (SELECT COUNT(*) FROM lesson_tags lt WHERE lt.tag_id = t.id) AS lessons FROM tags t ORDER BY t.kind, t.label COLLATE NOCASE",
  ).all();
  return c.json({ tags: results });
});

adminV3Routes.post("/tags", async (c) => {
  if (!can(c.get("admin").actor, "settings.manage")) return fail(c, 403, "forbidden");
  const b = await parseBody(c, z.object({ kind: z.enum(["topic", "skill", "standard", "custom"]), label: z.string().trim().min(1).max(60), code: z.string().trim().max(30).nullable().optional() }));
  const dup = await c.env.DB.prepare("SELECT id FROM tags WHERE kind = ? AND label = ? COLLATE NOCASE").bind(b.kind, b.label).first<{ id: string }>();
  if (dup) return c.json({ id: dup.id }, 200);
  const id = crypto.randomUUID();
  await c.env.DB.prepare("INSERT INTO tags (id, kind, label, code) VALUES (?, ?, ?, ?)").bind(id, b.kind, b.label, b.code ?? null).run();
  await audit(c, "tag.create", id, b);
  return c.json({ id }, 201);
});

adminV3Routes.delete("/tags/:id", async (c) => {
  if (!can(c.get("admin").actor, "delete")) return fail(c, 403, "forbidden");
  const id = c.req.param("id");
  await c.env.DB.batch([c.env.DB.prepare("DELETE FROM lesson_tags WHERE tag_id = ?").bind(id), c.env.DB.prepare("DELETE FROM tags WHERE id = ?").bind(id)]);
  await audit(c, "tag.delete", id);
  return c.json({ ok: true });
});

adminV3Routes.put("/lessons/:id/tags", async (c) => {
  const id = c.req.param("id");
  const lesson = await c.env.DB.prepare("SELECT owner_id AS ownerId FROM lessons WHERE id = ?").bind(id).first<{ ownerId: string | null }>();
  if (!lesson) return fail(c, 404, "not_found");
  const used = await c.env.DB.prepare(
    "SELECT DISTINCT cc.class_id AS classId FROM course_lessons cl JOIN class_courses cc ON cc.course_id = cl.course_id WHERE cl.lesson_id = ?",
  ).bind(id).all<{ classId: string }>();
  if (!can(c.get("admin").actor, "lesson.edit", { ownerId: lesson.ownerId, usedInClasses: used.results.map((r) => r.classId) })) return fail(c, 403, "forbidden");
  const { tagIds } = await parseBody(c, z.object({ tagIds: z.array(z.string()).max(40) }));
  await c.env.DB.batch([
    c.env.DB.prepare("DELETE FROM lesson_tags WHERE lesson_id = ?").bind(id),
    ...tagIds.map((t) => c.env.DB.prepare("INSERT OR IGNORE INTO lesson_tags (lesson_id, tag_id) SELECT ?, id FROM tags WHERE id = ?").bind(id, t)),
  ]);
  await audit(c, "lesson.tags", id, { tagIds });
  return c.json({ ok: true });
});

// ---- Courses in a class ----
const courseRule = z.object({
  courseId: z.string(),
  unlockRule: z.enum(["mastery", "open", "drip"]).default("mastery"),
  passPercent: z.number().int().min(50).max(100).default(70),
  dripStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
  dripEveryDays: z.number().int().min(1).max(60).nullable().optional(),
}).refine((r) => r.unlockRule !== "drip" || (!!r.dripStart && !!r.dripEveryDays), "Drip needs a start date and a number of days");

adminV3Routes.get("/classes/:id/courses", async (c) => {
  const classId = c.req.param("id");
  if (!can(c.get("admin").actor, "class.read", { classId })) return fail(c, 403, "forbidden");
  const { results } = await c.env.DB.prepare(
    `SELECT cc.course_id AS courseId, co.title, cc.position, cc.unlock_rule AS unlockRule, cc.pass_percent AS passPercent, cc.drip_start AS dripStart, cc.drip_every_days AS dripEveryDays,
            (SELECT COUNT(*) FROM course_lessons cl WHERE cl.course_id = cc.course_id) AS lessons
     FROM class_courses cc JOIN courses co ON co.id = cc.course_id WHERE cc.class_id = ? ORDER BY cc.position`,
  ).bind(classId).all();
  return c.json({ courses: results });
});

/** Replaces the class's course list (order = position). */
adminV3Routes.put("/classes/:id/courses", async (c) => {
  const classId = c.req.param("id");
  if (!can(c.get("admin").actor, "class.courses", { classId })) return fail(c, 403, "forbidden");
  if (!(await c.env.DB.prepare("SELECT 1 FROM classes WHERE id = ?").bind(classId).first())) return fail(c, 404, "not_found");
  const { courses } = await parseBody(c, z.object({ courses: z.array(courseRule).max(40) }));
  if (new Set(courses.map((x) => x.courseId)).size !== courses.length) return fail(c, 400, "duplicate_course");
  await c.env.DB.batch([
    c.env.DB.prepare("DELETE FROM class_courses WHERE class_id = ?").bind(classId),
    ...courses.map((x, i) =>
      c.env.DB.prepare("INSERT INTO class_courses (class_id, course_id, position, unlock_rule, pass_percent, drip_start, drip_every_days) SELECT ?, id, ?, ?, ?, ?, ? FROM courses WHERE id = ?")
        .bind(classId, i, x.unlockRule, x.passPercent, x.unlockRule === "drip" ? x.dripStart ?? null : null, x.unlockRule === "drip" ? x.dripEveryDays ?? null : null, x.courseId),
    ),
  ]);
  // Bridge while the student app still reads course_assignments: keep the class-level assignments in step.
  await c.env.DB.batch([
    c.env.DB.prepare("DELETE FROM course_assignments WHERE class_id = ? AND course_id NOT IN (SELECT course_id FROM class_courses WHERE class_id = ?)").bind(classId, classId),
    c.env.DB.prepare("INSERT INTO course_assignments (id, course_id, class_id) SELECT lower(hex(randomblob(16))), cc.course_id, cc.class_id FROM class_courses cc WHERE cc.class_id = ? AND NOT EXISTS (SELECT 1 FROM course_assignments a WHERE a.class_id = cc.class_id AND a.course_id = cc.course_id)").bind(classId),
  ]);
  await audit(c, "class.courses", classId, { courses });
  return c.json({ ok: true });
});

// ---- Teachers ----
adminV3Routes.get("/staff", async (c) => {
  if (!can(c.get("admin").actor, "teachers.manage")) return fail(c, 403, "forbidden");
  const teachers = await c.env.DB.prepare("SELECT id, display_name AS displayName, admin_email AS email, is_active AS isActive FROM users WHERE role = 'admin' AND admin_level = 'teacher' ORDER BY display_name COLLATE NOCASE").all();
  const access = await c.env.DB.prepare("SELECT user_id AS userId, class_id AS classId, access FROM class_staff").all<{ userId: string; classId: string; access: string }>();
  return c.json({ teachers: teachers.results.map((t) => ({ ...t, classes: access.results.filter((a) => a.userId === (t as { id: string }).id).map((a) => ({ classId: a.classId, access: a.access })) })) });
});

const classAccess = z.array(z.object({ classId: z.string(), access: z.enum(["view", "edit"]) })).max(50);

adminV3Routes.post("/staff", async (c) => {
  if (!can(c.get("admin").actor, "teachers.manage")) return fail(c, 403, "forbidden");
  const b = await parseBody(c, z.object({ displayName: z.string().trim().min(1).max(60), email: z.string().trim().toLowerCase().email(), classes: classAccess.default([]) }));
  if (await c.env.DB.prepare("SELECT 1 FROM users WHERE lower(admin_email) = ?").bind(b.email).first()) return fail(c, 409, "email_in_use");
  const id = crypto.randomUUID();
  await c.env.DB.batch([
    c.env.DB.prepare("INSERT INTO users (id, role, username, display_name, admin_email, admin_level) VALUES (?, 'admin', ?, ?, ?, 'teacher')").bind(id, `@teacher-${id.slice(0, 8)}`, b.displayName, b.email),
    ...b.classes.map((x) => c.env.DB.prepare("INSERT OR REPLACE INTO class_staff (class_id, user_id, access) SELECT id, ?, ? FROM classes WHERE id = ?").bind(id, x.access, x.classId)),
  ]);
  await audit(c, "staff.create", id, { email: b.email, classes: b.classes });
  return c.json({ id }, 201);
});

adminV3Routes.patch("/staff/:id", async (c) => {
  if (!can(c.get("admin").actor, "teachers.manage")) return fail(c, 403, "forbidden");
  const id = c.req.param("id");
  if (!(await c.env.DB.prepare("SELECT 1 FROM users WHERE id = ? AND admin_level = 'teacher'").bind(id).first())) return fail(c, 404, "not_found");
  const b = await parseBody(c, z.object({ displayName: z.string().trim().min(1).max(60).optional(), isActive: z.boolean().optional(), classes: classAccess.optional() }));
  const stmts = [];
  if (b.displayName !== undefined) stmts.push(c.env.DB.prepare("UPDATE users SET display_name = ? WHERE id = ?").bind(b.displayName, id));
  if (b.isActive !== undefined) stmts.push(c.env.DB.prepare("UPDATE users SET is_active = ? WHERE id = ?").bind(b.isActive ? 1 : 0, id));
  if (b.classes) {
    stmts.push(c.env.DB.prepare("DELETE FROM class_staff WHERE user_id = ?").bind(id));
    for (const x of b.classes) stmts.push(c.env.DB.prepare("INSERT INTO class_staff (class_id, user_id, access) SELECT id, ?, ? FROM classes WHERE id = ?").bind(id, x.access, x.classId));
  }
  if (stmts.length) await c.env.DB.batch(stmts);
  await audit(c, "staff.update", id, b);
  return c.json({ ok: true });
});

adminV3Routes.get("/activity", async (c) => {
  if (!can(c.get("admin").actor, "settings.manage")) return fail(c, 403, "forbidden");
  const { results } = await c.env.DB.prepare(
    "SELECT a.id, a.action, a.target, a.detail_json AS detail, a.at, u.display_name AS actor FROM audit_log a LEFT JOIN users u ON u.id = a.actor_id ORDER BY a.at DESC, a.rowid DESC LIMIT 100",
  ).all();
  return c.json({ activity: results });
});

// ---- Course builder: ordered lessons with optional section headings ----
adminV3Routes.get("/courses/:id/builder", async (c) => {
  const id = c.req.param("id");
  const course = await c.env.DB.prepare("SELECT id, title, subject_id AS subject, age_min AS ageMin, age_max AS ageMax, status, owner_id AS ownerId FROM courses WHERE id = ?").bind(id).first();
  if (!course) return fail(c, 404, "not_found");
  const { results } = await c.env.DB.prepare(
    `SELECT cl.lesson_id AS lessonId, cl.section, l.title, l.subject_id AS subject, l.status, l.age_min AS ageMin, l.age_max AS ageMax, l.estimated_minutes AS minutes
       FROM course_lessons cl JOIN lessons l ON l.id = cl.lesson_id WHERE cl.course_id = ? ORDER BY cl.position, l.title`,
  ).bind(id).all();
  const used = await c.env.DB.prepare("SELECT cc.class_id AS classId, k.name FROM class_courses cc JOIN classes k ON k.id = cc.class_id WHERE cc.course_id = ?").bind(id).all();
  return c.json({ course, items: results, classes: used.results });
});

/** Saves the order and sections. A lesson's old semester and week are kept, so classes still on weekly unlocking carry on working. */
adminV3Routes.put("/courses/:id/builder", async (c) => {
  const id = c.req.param("id");
  const course = await c.env.DB.prepare("SELECT owner_id AS ownerId FROM courses WHERE id = ?").bind(id).first<{ ownerId: string | null }>();
  if (!course) return fail(c, 404, "not_found");
  const used = await c.env.DB.prepare("SELECT class_id AS classId FROM class_courses WHERE course_id = ?").bind(id).all<{ classId: string }>();
  if (!can(c.get("admin").actor, "course.edit", { ownerId: course.ownerId, usedInClasses: used.results.map((r) => r.classId) })) return fail(c, 403, "forbidden");
  const b = await parseBody(c, z.object({
    title: z.string().trim().min(1).max(80).optional(),
    ageMin: z.number().int().min(3).max(18).nullable().optional(),
    ageMax: z.number().int().min(3).max(18).nullable().optional(),
    items: z.array(z.object({ lessonId: z.string(), section: z.string().trim().max(60).nullable().optional() })).max(500),
  }));
  if (new Set(b.items.map((i) => i.lessonId)).size !== b.items.length) return fail(c, 400, "duplicate_lesson");
  const old = await c.env.DB.prepare("SELECT lesson_id AS lessonId, semester, week FROM course_lessons WHERE course_id = ?").bind(id).all<{ lessonId: string; semester: number | null; week: number | null }>();
  const keep = new Map(old.results.map((o) => [o.lessonId, o]));
  const db = c.env.DB;
  await db.batch([
    db.prepare("DELETE FROM course_lessons WHERE course_id = ?").bind(id),
    ...b.items.map((it, i) =>
      db.prepare("INSERT INTO course_lessons (course_id, lesson_id, position, semester, week, section) SELECT ?, id, ?, ?, ?, ? FROM lessons WHERE id = ?")
        .bind(id, i, keep.get(it.lessonId)?.semester ?? null, keep.get(it.lessonId)?.week ?? null, it.section ?? null, it.lessonId),
    ),
    db.prepare("UPDATE courses SET title = COALESCE(?, title), age_min = COALESCE(?, age_min), age_max = COALESCE(?, age_max) WHERE id = ?").bind(b.title ?? null, b.ageMin ?? null, b.ageMax ?? null, id),
  ]);
  await audit(c, "course.edit", id, { count: b.items.length });
  return c.json({ ok: true });
});

// ---- Class exams: cover -> blueprint -> generate (lock / swap) -> publish ----

async function classCourseIds(db: D1Database, classId: string, only?: string[]): Promise<string[]> {
  const { results } = await db.prepare("SELECT course_id AS id FROM class_courses WHERE class_id = ?").bind(classId).all<{ id: string }>();
  const ids = results.map((r) => r.id);
  return only?.length ? ids.filter((i) => only.includes(i)) : ids;
}

adminV3Routes.get("/classes/:id/exams", async (c) => {
  const classId = c.req.param("id");
  if (!can(c.get("admin").actor, "class.read", { classId })) return fail(c, 403, "forbidden");
  return c.json({ exams: await classExamsFor(c.env.DB, [classId]) });
});

/** Proposes a question list from the chosen lessons. Nothing is saved. `avoid` lists question ids already used, so a swap gives a different one. */
adminV3Routes.post("/classes/:id/exams/generate", async (c) => {
  const classId = c.req.param("id");
  if (!can(c.get("admin").actor, "class.exam", { classId })) return fail(c, 403, "forbidden");
  const b = await parseBody(c, z.object({ courseIds: z.array(z.string()).default([]), lessonIds: z.array(z.string()).default([]), perLesson: z.number().int().min(1).max(6).default(2), avoid: z.array(z.string()).default([]) }));
  const lessons = await lessonsForExam(c.env.DB, await classCourseIds(c.env.DB, classId, b.courseIds), b.lessonIds);
  if (!lessons.length) return fail(c, 400, "no_lessons", "This class has no published lessons to examine.");
  const questions = await proposeQuestions(c.env.DB, lessons, b.perLesson, new Set(b.avoid));
  if (!questions.length) return fail(c, 400, "no_questions", "These lessons have no quiz questions yet.");
  return c.json({ lessons: lessons.length, questions });
});

/** One replacement question from the same lesson, different from everything in `avoid`. */
adminV3Routes.post("/classes/:id/exams/swap", async (c) => {
  const classId = c.req.param("id");
  if (!can(c.get("admin").actor, "class.exam", { classId })) return fail(c, 403, "forbidden");
  const b = await parseBody(c, z.object({ lessonId: z.string(), avoid: z.array(z.string()) }));
  const lessons = (await lessonsForExam(c.env.DB, await classCourseIds(c.env.DB, classId), [b.lessonId]));
  if (!lessons.length) return fail(c, 404, "not_found");
  const [q] = await proposeQuestions(c.env.DB, lessons, 1, new Set(b.avoid));
  if (!q) return fail(c, 409, "nothing_else", "That lesson has no other question to swap in.");
  return c.json({ question: q });
});

/** Saves the exam as frozen copies. `opensOn` null = draft (children cannot see it); a date publishes it from that day. */
adminV3Routes.post("/classes/:id/exams", async (c) => {
  const classId = c.req.param("id");
  if (!can(c.get("admin").actor, "class.exam", { classId })) return fail(c, 403, "forbidden");
  if (!(await c.env.DB.prepare("SELECT 1 FROM classes WHERE id = ?").bind(classId).first())) return fail(c, 404, "not_found");
  const b = await parseBody(c, z.object({
    title: z.string().trim().min(1).max(80),
    questionIds: z.array(z.string()).min(1).max(100),
    passPercent: z.number().int().min(1).max(100).default(70),
    maxAttempts: z.number().int().min(1).max(20).nullable().default(2),
    opensOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().default(null),
  }));
  const db = c.env.DB;
  const copies: { main: SourceQuestion; variant: SourceQuestion | null }[] = [];
  for (const qid of b.questionIds) {
    const row = await db.prepare("SELECT z.lesson_id AS lessonId FROM questions q JOIN quizzes z ON z.id = q.quiz_id WHERE q.id = ?").bind(qid).first<{ lessonId: string | null }>();
    if (!row?.lessonId) return fail(c, 400, "bad_question", "One of the questions was not found.");
    const all = await mainQuestions(db, row.lessonId);
    const main = all.find((q) => q.id === qid);
    if (!main) return fail(c, 400, "bad_question", "One of the questions is not in its lesson's current quiz.");
    copies.push({ main, variant: all.find((q) => q.variant_of === main.ref) ?? null });
  }
  const quizId = crypto.randomUUID();
  const insert = `INSERT INTO questions (id, quiz_id, ref, position, type, prompt, media_json, options_json, answer_json, hint, explanation, points, skill_tag, sub_lesson, depth, variant_of, source_question_id)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  let position = 0;
  const rows: D1PreparedStatement[] = [];
  copies.forEach(({ main, variant }, i) => {
    const ref = `e${i + 1}`;
    const add = (s: SourceQuestion, r: string, variantOf: string | null) => rows.push(db.prepare(insert).bind(crypto.randomUUID(), quizId, r, ++position, s.type, s.prompt, s.media_json, s.options_json, s.answer_json, s.hint, s.explanation, s.points, s.skill_tag, s.sub_lesson, s.depth, variantOf, s.id));
    add(main, ref, null);
    if (variant) add(variant, `${ref}v`, ref);
  });
  await db.batch([
    db.prepare("INSERT INTO quizzes (id, kind, lesson_id, course_id, subject_id, semester, blueprint_json, version, is_current, pass_percent, shuffle_questions, shuffle_options, max_attempts, class_id) VALUES (?, 'exam', NULL, NULL, NULL, NULL, ?, 1, 1, ?, 1, 1, ?, ?)")
      .bind(quizId, JSON.stringify({ scope: "class", title: b.title, opensOn: b.opensOn, key: classExamScopeKey(quizId) }), b.passPercent, b.maxAttempts, classId),
    ...rows,
  ]);
  await audit(c, "exam.create", quizId, { classId, title: b.title, opensOn: b.opensOn, questions: copies.length });
  return c.json({ id: quizId, questionCount: copies.length }, 201);
});

/** Publish (give a date) or pull back to draft (null). */
adminV3Routes.patch("/classes/:id/exams/:examId", async (c) => {
  const classId = c.req.param("id");
  if (!can(c.get("admin").actor, "class.exam", { classId })) return fail(c, 403, "forbidden");
  const b = await parseBody(c, z.object({ opensOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable() }));
  const res = await c.env.DB.prepare("UPDATE quizzes SET blueprint_json = json_set(blueprint_json, '$.opensOn', ?) WHERE id = ? AND class_id = ? AND json_extract(blueprint_json, '$.scope') = 'class'").bind(b.opensOn, c.req.param("examId"), classId).run();
  if (!res.meta.changes) return fail(c, 404, "not_found");
  await audit(c, "exam.publish", c.req.param("examId"), b);
  return c.json({ ok: true });
});

// ---- Lesson details that do not need a new version: age range ----
adminV3Routes.put("/lessons/:id/meta", async (c) => {
  const id = c.req.param("id");
  const lesson = await c.env.DB.prepare("SELECT owner_id AS ownerId FROM lessons WHERE id = ?").bind(id).first<{ ownerId: string | null }>();
  if (!lesson) return fail(c, 404, "not_found");
  const used = await c.env.DB.prepare("SELECT DISTINCT cc.class_id AS classId FROM course_lessons cl JOIN class_courses cc ON cc.course_id = cl.course_id WHERE cl.lesson_id = ?").bind(id).all<{ classId: string }>();
  if (!can(c.get("admin").actor, "lesson.edit", { ownerId: lesson.ownerId, usedInClasses: used.results.map((r) => r.classId) })) return fail(c, 403, "forbidden");
  const b = await parseBody(c, z.object({ ageMin: z.number().int().min(3).max(18), ageMax: z.number().int().min(3).max(18) }));
  if (b.ageMin > b.ageMax) return fail(c, 400, "invalid_input", "The youngest age cannot be above the oldest.");
  await c.env.DB.prepare("UPDATE lessons SET age_min = ?, age_max = ?, updated_at = datetime('now') WHERE id = ?").bind(b.ageMin, b.ageMax, id).run();
  await audit(c, "lesson.meta", id, b);
  return c.json({ ok: true });
});
