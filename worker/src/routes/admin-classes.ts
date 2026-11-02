import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../env";
import { fail, parseBody } from "../lib/http";
import { addDays, generateTerms, isMonday, parseDate } from "../lib/terms";

/** Class detail, calendar and course assignments. Mounted under /api/admin, behind requireAdmin. */
export const adminClassRoutes = new Hono<AppEnv>();

const dateSchema = z.string().refine((d) => parseDate(d) !== null, "Use a date like 2026-09-07");

adminClassRoutes.get("/classes/:id", async (c) => {
  const id = c.req.param("id");
  const db = c.env.DB;
  const cls = await db
    .prepare("SELECT id, name, description, is_active AS isActive, visibility_mode AS visibilityMode FROM classes WHERE id = ?")
    .bind(id)
    .first();
  if (!cls) return fail(c, 404, "not_found");
  const [members, terms, assignments] = await Promise.all([
    db.prepare("SELECT u.id, u.display_name AS displayName, u.username FROM class_members m JOIN users u ON u.id = m.user_id WHERE m.class_id = ? ORDER BY u.display_name COLLATE NOCASE").bind(id).all(),
    db.prepare("SELECT number, name, start_date AS startDate, end_date AS endDate, teaching_weeks AS teachingWeeks, exam_week AS examWeek FROM terms WHERE class_id = ? ORDER BY number").bind(id).all(),
    db.prepare("SELECT a.id, a.course_id AS courseId, co.title AS courseTitle, a.due_date AS dueDate FROM course_assignments a JOIN courses co ON co.id = a.course_id WHERE a.class_id = ? ORDER BY co.title").bind(id).all(),
  ]);
  return c.json({ class: cls, members: members.results, terms: terms.results, assignments: assignments.results });
});

adminClassRoutes.patch("/classes/:id", async (c) => {
  const id = c.req.param("id");
  const row = await c.env.DB.prepare("SELECT name, description, is_active, visibility_mode FROM classes WHERE id = ?").bind(id).first<{ name: string; description: string | null; is_active: number; visibility_mode: string }>();
  if (!row) return fail(c, 404, "not_found");
  const body = await parseBody(
    c,
    z.object({
      name: z.string().trim().min(1).max(60).optional(),
      description: z.string().trim().max(200).nullable().optional(),
      isActive: z.boolean().optional(),
      visibilityMode: z.enum(["released", "all_published"]).optional(),
    }),
  );
  await c.env.DB
    .prepare("UPDATE classes SET name = ?, description = ?, is_active = ?, visibility_mode = ? WHERE id = ?")
    .bind(
      body.name ?? row.name,
      body.description === undefined ? row.description : body.description,
      body.isActive === undefined ? row.is_active : body.isActive ? 1 : 0,
      body.visibilityMode ?? row.visibility_mode,
      id,
    )
    .run();
  return c.json({ ok: true });
});

adminClassRoutes.put("/classes/:id/members", async (c) => {
  const id = c.req.param("id");
  if (!(await c.env.DB.prepare("SELECT 1 FROM classes WHERE id = ?").bind(id).first())) return fail(c, 404, "not_found");
  const { userIds } = await parseBody(c, z.object({ userIds: z.array(z.string()).max(200) }));
  const db = c.env.DB;
  const valid = userIds.length
    ? (await db.prepare(`SELECT id FROM users WHERE role = 'student' AND id IN (${userIds.map(() => "?").join(",")})`).bind(...userIds).all<{ id: string }>()).results.map((r) => r.id)
    : [];
  await db.batch([
    db.prepare("DELETE FROM class_members WHERE class_id = ?").bind(id),
    ...valid.map((uid) => db.prepare("INSERT INTO class_members (class_id, user_id) VALUES (?, ?)").bind(id, uid)),
  ]);
  return c.json({ ok: true, count: valid.length });
});

// --- The class calendar (4 semesters) ----------------------------------------------------------------

const termInput = z.object({
  number: z.number().int().min(1).max(4),
  startDate: dateSchema,
  endDate: dateSchema.optional(),
  teachingWeeks: z.number().int().min(1).max(12).optional(),
});

async function saveTerms(db: D1Database, classId: string, terms: ReturnType<typeof generateTerms>) {
  await db.batch([
    db.prepare("DELETE FROM terms WHERE class_id = ?").bind(classId),
    ...terms.map((t) =>
      db
        .prepare("INSERT INTO terms (id, class_id, number, name, start_date, end_date, teaching_weeks, exam_week) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(crypto.randomUUID(), classId, t.number, t.name, t.start_date, t.end_date, t.teaching_weeks, t.exam_week),
    ),
  ]);
}

/** Four back-to-back semesters from one start date (a Monday), with optional holiday gaps between them. */
adminClassRoutes.post("/classes/:id/terms/generate", async (c) => {
  const id = c.req.param("id");
  if (!(await c.env.DB.prepare("SELECT 1 FROM classes WHERE id = ?").bind(id).first())) return fail(c, 404, "not_found");
  const { startDate, gapWeeks } = await parseBody(c, z.object({ startDate: dateSchema, gapWeeks: z.number().int().min(0).max(12).optional() }));
  if (!isMonday(startDate)) return fail(c, 400, "not_monday", "Semesters start on a Monday. Pick a Monday.");
  const terms = generateTerms(startDate, { gapWeeks });
  await saveTerms(c.env.DB, id, terms);
  return c.json({ terms });
});

/** Set the dates by hand (for example to shift one semester after a holiday). */
adminClassRoutes.put("/classes/:id/terms", async (c) => {
  const id = c.req.param("id");
  if (!(await c.env.DB.prepare("SELECT 1 FROM classes WHERE id = ?").bind(id).first())) return fail(c, 404, "not_found");
  const { terms } = await parseBody(c, z.object({ terms: z.array(termInput).min(1).max(4) }));
  if (new Set(terms.map((t) => t.number)).size !== terms.length) return fail(c, 400, "invalid_input", "Each semester number can appear once.");
  const rows = terms.map((t) => {
    const weeks = (t.teachingWeeks ?? 12) + 1;
    return {
      number: t.number,
      name: `Semester ${t.number}`,
      start_date: t.startDate,
      end_date: t.endDate ?? addDays(t.startDate, weeks * 7 - 1),
      teaching_weeks: weeks - 1,
      exam_week: weeks,
    };
  });
  const bad = rows.find((r) => !isMonday(r.start_date));
  if (bad) return fail(c, 400, "not_monday", `Semester ${bad.number} must start on a Monday.`);
  await saveTerms(c.env.DB, id, rows);
  return c.json({ terms: rows });
});

// --- Giving courses to classes or to single students --------------------------------------------------

adminClassRoutes.get("/assignments", async (c) => {
  const { results } = await c.env.DB
    .prepare(
      `SELECT a.id, a.course_id AS courseId, co.title AS courseTitle, a.class_id AS classId, cl.name AS className,
              a.user_id AS userId, u.display_name AS studentName, a.due_date AS dueDate
         FROM course_assignments a
         JOIN courses co ON co.id = a.course_id
         LEFT JOIN classes cl ON cl.id = a.class_id
         LEFT JOIN users u ON u.id = a.user_id
        ORDER BY co.title`,
    )
    .all();
  return c.json({ assignments: results });
});

adminClassRoutes.post("/assignments", async (c) => {
  const body = await parseBody(
    c,
    z.object({ courseId: z.string(), classId: z.string().optional(), userId: z.string().optional(), dueDate: dateSchema.optional() }),
  );
  if ((body.classId === undefined) === (body.userId === undefined)) {
    return fail(c, 400, "invalid_input", "Choose either a class or one student.");
  }
  const db = c.env.DB;
  if (!(await db.prepare("SELECT 1 FROM courses WHERE id = ?").bind(body.courseId).first())) return fail(c, 404, "course_not_found");
  const target = body.classId ? ["class_id", body.classId] : ["user_id", body.userId as string];
  const dup = await db.prepare(`SELECT id FROM course_assignments WHERE course_id = ? AND ${target[0]} = ?`).bind(body.courseId, target[1]).first();
  if (dup) return fail(c, 409, "already_assigned", "That course is already assigned there.");
  const id = crypto.randomUUID();
  await db
    .prepare(`INSERT INTO course_assignments (id, course_id, ${target[0]}, due_date) VALUES (?, ?, ?, ?)`)
    .bind(id, body.courseId, target[1], body.dueDate ?? null)
    .run();
  return c.json({ id }, 201);
});

adminClassRoutes.delete("/assignments/:id", async (c) => {
  await c.env.DB.prepare("DELETE FROM course_assignments WHERE id = ?").bind(c.req.param("id")).run();
  return c.json({ ok: true });
});

// --- Opening a week early -------------------------------------------------------------------------------

adminClassRoutes.get("/unlocks", async (c) => {
  const { results } = await c.env.DB
    .prepare(
      `SELECT k.id, k.course_id AS courseId, co.title AS courseTitle, k.semester, k.week, k.class_id AS classId,
              k.user_id AS userId, k.expires_at AS expiresAt
         FROM lesson_unlocks k JOIN courses co ON co.id = k.course_id ORDER BY k.created_at DESC`,
    )
    .all();
  return c.json({ unlocks: results });
});

adminClassRoutes.post("/unlocks", async (c) => {
  const body = await parseBody(
    c,
    z.object({
      courseId: z.string(),
      semester: z.number().int().min(1).max(4),
      week: z.number().int().min(1).max(13),
      classId: z.string().optional(),
      userId: z.string().optional(),
      expiresAt: dateSchema.optional(),
    }),
  );
  if ((body.classId === undefined) === (body.userId === undefined)) return fail(c, 400, "invalid_input", "Choose either a class or one student.");
  const id = crypto.randomUUID();
  await c.env.DB
    .prepare("INSERT INTO lesson_unlocks (id, course_id, semester, week, class_id, user_id, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .bind(id, body.courseId, body.semester, body.week, body.classId ?? null, body.userId ?? null, body.expiresAt ?? null)
    .run();
  return c.json({ id }, 201);
});

adminClassRoutes.delete("/unlocks/:id", async (c) => {
  await c.env.DB.prepare("DELETE FROM lesson_unlocks WHERE id = ?").bind(c.req.param("id")).run();
  return c.json({ ok: true });
});
