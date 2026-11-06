import { Hono } from "hono";
import {
  AVATARS,
  bulkCreateStudentsSchema,
  createStudentSchema,
  updateStudentSchema,
  type StudentCredentials,
  type StudentSummary,
} from "@lms/schema";
import { z } from "zod";
import type { AppEnv } from "../env";
import { fail, parseBody } from "../lib/http";
import { hashPassword } from "../lib/password";
import { getUserById, getUserByUsername, isReservedUsername, uniqueUsername } from "../lib/users";
import { listBackups, runBackup } from "../lib/backup";
import { generatePassword, randomInt } from "../lib/words";
import { addDays, currentSlot, type TermRow } from "../lib/terms";
import { serveAsset } from "../lib/assets";
import { requireAdmin } from "../middleware/auth";
import { adminCardRoutes } from "./admin-cards";
import { adminClassRoutes } from "./admin-classes";
import { adminContentRoutes } from "./admin-content";
import { adminExamRoutes } from "./admin-exams";
import { adminAiLogRoutes } from "./admin-ai-log";
import { adminAiUsageRoutes } from "./admin-ai-usage";
import { adminInsightRoutes } from "./admin-insight";
import { adminOverviewRoutes } from "./admin-overview";
import { adminReportRoutes } from "./admin-reports";
import { adminVideoRoutes } from "./admin-videos";
import { adminWeekRoutes } from "./admin-week";
import { cachedAudio, prewarm } from "../lib/tts";

export const adminRoutes = new Hono<AppEnv>();
adminRoutes.use("*", requireAdmin);

adminRoutes.get("/me", (c) => c.json({ admin: c.get("admin") }));
adminRoutes.get("/backups", async (c) => c.json({ backups: await listBackups(c.env) }));
adminRoutes.post("/backups", async (c) => c.json(await runBackup(c.env), 201));
adminRoutes.get("/assets/file/:filename", (c) => serveAsset(c, c.req.param("filename")));
adminRoutes.route("/", adminContentRoutes);
adminRoutes.route("/", adminClassRoutes);
adminRoutes.route("/", adminExamRoutes);
adminRoutes.route("/", adminReportRoutes);
adminRoutes.route("/", adminOverviewRoutes);
adminRoutes.route("/", adminAiLogRoutes);
adminRoutes.route("/", adminInsightRoutes);
adminRoutes.route("/", adminWeekRoutes);
adminRoutes.route("/", adminCardRoutes);
/** Generate and store lesson narration ahead of time (also open to the automation service token). */
adminRoutes.post("/voice/prewarm", prewarm);
/** Download one stored sentence of narration (404 when not generated yet). Also open to the automation service token. */
adminRoutes.get("/voice/audio", cachedAudio);
adminRoutes.route("/", adminAiUsageRoutes);
adminRoutes.route("/", adminVideoRoutes);

// --- Classes (list and create; membership is managed from the student screens) -------------------

adminRoutes.get("/classes", async (c) => {
  const { results } = await c.env.DB
    .prepare(
      `SELECT c.id, c.name, c.description, c.is_active AS isActive,
              (SELECT COUNT(*) FROM class_members m WHERE m.class_id = c.id) AS studentCount
         FROM classes c ORDER BY c.name`,
    )
    .all();
  return c.json({ classes: results });
});

adminRoutes.post("/classes", async (c) => {
  const { name, description } = await parseBody(
    c,
    z.object({ name: z.string().trim().min(1).max(60), description: z.string().trim().max(200).optional() }),
  );
  const id = crypto.randomUUID();
  await c.env.DB.prepare("INSERT INTO classes (id, name, description) VALUES (?, ?, ?)").bind(id, name, description ?? null).run();
  return c.json({ class: { id, name, description: description ?? null } }, 201);
});

// --- Students --------------------------------------------------------------------------------------

type StudentRow = {
  id: string;
  display_name: string;
  username: string;
  avatar: string | null;
  theme: string;
  is_active: number;
  created_at: string;
  is_test: number;
  preview_date: string | null;
};

function previewOf(r: StudentRow, classIds: string[], terms: (TermRow & { class_id: string })[]): StudentSummary["preview"] {
  if (r.is_test !== 1 || !r.preview_date) return null;
  for (const id of classIds) {
    const slot = currentSlot(terms.filter((t) => t.class_id === id), r.preview_date);
    if (slot) return { ...slot, date: r.preview_date };
  }
  return null;
}

async function listStudents(db: D1Database, onlyId?: string): Promise<StudentSummary[]> {
  const where = onlyId ? "AND id = ?" : "";
  const stmt = db.prepare(
    `SELECT id, display_name, username, avatar, theme, is_active, created_at, is_test, preview_date
       FROM users WHERE role = 'student' ${where} ORDER BY display_name COLLATE NOCASE`,
  );
  const { results } = await (onlyId ? stmt.bind(onlyId) : stmt).all<StudentRow>();
  const memberships = await db
    .prepare("SELECT m.user_id, c.id, c.name FROM class_members m JOIN classes c ON c.id = m.class_id ORDER BY c.name")
    .all<{ user_id: string; id: string; name: string }>();
  const terms = results.some((r) => r.preview_date)
    ? (await db.prepare("SELECT t.class_id, t.number, t.name, t.start_date, t.end_date, t.teaching_weeks, t.exam_week FROM terms t").all<TermRow & { class_id: string }>()).results
    : [];
  return results.map((r) => ({
    id: r.id,
    displayName: r.display_name,
    username: r.username,
    avatar: (r.avatar as StudentSummary["avatar"]) ?? null,
    theme: r.theme as StudentSummary["theme"],
    isActive: r.is_active === 1,
    createdAt: r.created_at,
    classes: memberships.results.filter((m) => m.user_id === r.id).map((m) => ({ id: m.id, name: m.name })),
    isTest: r.is_test === 1,
    preview: previewOf(r, memberships.results.filter((m) => m.user_id === r.id).map((m) => m.id), terms),
  }));
}

/** Only keep class ids that exist, so a bad id cannot break the batch. */
async function validClassIds(db: D1Database, ids: string[] | undefined): Promise<string[]> {
  if (!ids?.length) return [];
  const unique = [...new Set(ids)];
  const placeholders = unique.map(() => "?").join(",");
  const { results } = await db.prepare(`SELECT id FROM classes WHERE id IN (${placeholders})`).bind(...unique).all<{ id: string }>();
  return results.map((r) => r.id);
}

async function insertStudent(
  db: D1Database,
  input: { displayName: string; username: string; password: string; avatar?: string; classIds: string[] },
): Promise<StudentCredentials> {
  const id = crypto.randomUUID();
  const avatar = input.avatar ?? AVATARS[randomInt(AVATARS.length)];
  const hash = await hashPassword(input.password);
  await db.batch([
    db
      .prepare("INSERT INTO users (id, role, username, display_name, password_hash, avatar) VALUES (?, 'student', ?, ?, ?, ?)")
      .bind(id, input.username, input.displayName, hash, avatar),
    ...input.classIds.map((classId) =>
      db.prepare("INSERT INTO class_members (class_id, user_id) VALUES (?, ?)").bind(classId, id),
    ),
  ]);
  return { id, displayName: input.displayName, username: input.username, password: input.password };
}

adminRoutes.get("/students", async (c) => c.json({ students: await listStudents(c.env.DB) }));

adminRoutes.post("/students", async (c) => {
  const body = await parseBody(c, createStudentSchema);
  if (body.username) {
    if (isReservedUsername(body.username) || (await getUserByUsername(c.env.DB, body.username))) {
      return fail(c, 409, "username_taken", "That username is already used. Try another one.");
    }
  }
  const credentials = await insertStudent(c.env.DB, {
    displayName: body.displayName,
    username: body.username ?? (await uniqueUsername(c.env.DB, body.displayName)),
    password: body.password ?? generatePassword(),
    avatar: body.avatar,
    classIds: await validClassIds(c.env.DB, body.classIds),
  });
  return c.json({ credentials }, 201);
});

adminRoutes.post("/students/bulk", async (c) => {
  const { names, classIds } = await parseBody(c, bulkCreateStudentsSchema);
  const classes = await validClassIds(c.env.DB, classIds);
  const created: StudentCredentials[] = [];
  for (const name of names) {
    created.push(
      await insertStudent(c.env.DB, {
        displayName: name,
        username: await uniqueUsername(c.env.DB, name),
        password: generatePassword(),
        classIds: classes,
      }),
    );
  }
  return c.json({ credentials: created }, 201);
});

/**
 * The parent's test student: one per family, flagged is_test so it never appears in a report or statistic.
 * Put it in any class and pick any school week to see exactly what a child in that week would see.
 */
adminRoutes.post("/students/test", async (c) => {
  const db = c.env.DB;
  if (await db.prepare("SELECT 1 FROM users WHERE is_test = 1").first()) return fail(c, 409, "test_exists", "There is already a test student.");
  const password = generatePassword();
  const id = crypto.randomUUID();
  const username = await uniqueUsername(db, "teststudent");
  await db
    .prepare("INSERT INTO users (id, role, username, display_name, password_hash, avatar, is_test) VALUES (?, 'student', ?, 'Test Student', ?, ?, 1)")
    .bind(id, username, await hashPassword(password), AVATARS[0])
    .run();
  const credentials: StudentCredentials = { id, displayName: "Test Student", username, password };
  return c.json({ credentials }, 201);
});

/** Pick which school week the test student is in: { semester, week } (week 13 = exam week), or { clear: true } for the real week. */
adminRoutes.put("/students/:id/preview", async (c) => {
  const id = c.req.param("id");
  const row = await getUserById(c.env.DB, id);
  if (!row || row.role !== "student" || row.is_test !== 1) return fail(c, 404, "not_found");
  const body = await parseBody(c, z.object({ semester: z.number().int().min(1).max(4).optional(), week: z.number().int().min(1).max(13).optional(), clear: z.boolean().optional() }));
  if (body.clear) {
    await c.env.DB.prepare("UPDATE users SET preview_date = NULL WHERE id = ?").bind(id).run();
  } else {
    if (!body.semester || !body.week) return fail(c, 400, "bad_request", "Pick a semester and a week.");
    const terms = (
      await c.env.DB
        .prepare("SELECT t.number, t.name, t.start_date, t.end_date, t.teaching_weeks, t.exam_week FROM terms t JOIN class_members m ON m.class_id = t.class_id WHERE m.user_id = ? AND t.number = ?")
        .bind(id, body.semester)
        .all<TermRow>()
    ).results;
    const term = terms[0];
    if (!term) return fail(c, 400, "no_calendar", "Put the test student in a class that has school-year dates for that semester first.");
    await c.env.DB.prepare("UPDATE users SET preview_date = ? WHERE id = ?").bind(addDays(term.start_date, (body.week - 1) * 7), id).run();
  }
  const [student] = await listStudents(c.env.DB, id);
  return c.json({ student });
});

adminRoutes.patch("/students/:id", async (c) => {
  const id = c.req.param("id");
  const row = await getUserById(c.env.DB, id);
  if (!row || row.role !== "student") return fail(c, 404, "not_found");
  const body = await parseBody(c, updateStudentSchema);
  await c.env.DB
    .prepare(
      `UPDATE users SET display_name = ?, avatar = ?, theme = ?, is_active = ? WHERE id = ?`,
    )
    .bind(
      body.displayName ?? row.display_name,
      body.avatar === undefined ? row.avatar : body.avatar,
      body.theme ?? row.theme,
      body.isActive === undefined ? row.is_active : body.isActive ? 1 : 0,
      id,
    )
    .run();
  // Switching a child off ends their sessions' usefulness immediately: requireStudent checks is_active on every request.
  const [student] = await listStudents(c.env.DB, id);
  return c.json({ student });
});

adminRoutes.put("/students/:id/classes", async (c) => {
  const id = c.req.param("id");
  const row = await getUserById(c.env.DB, id);
  if (!row || row.role !== "student") return fail(c, 404, "not_found");
  const { classIds } = await parseBody(c, z.object({ classIds: z.array(z.string()).max(50) }));
  const valid = await validClassIds(c.env.DB, classIds);
  await c.env.DB.batch([
    c.env.DB.prepare("DELETE FROM class_members WHERE user_id = ?").bind(id),
    ...valid.map((classId) => c.env.DB.prepare("INSERT INTO class_members (class_id, user_id) VALUES (?, ?)").bind(classId, id)),
  ]);
  const [student] = await listStudents(c.env.DB, id);
  return c.json({ student });
});

adminRoutes.post("/students/:id/reset-password", async (c) => {
  const id = c.req.param("id");
  const row = await getUserById(c.env.DB, id);
  if (!row || row.role !== "student") return fail(c, 404, "not_found");
  const password = generatePassword();
  await c.env.DB
    .prepare("UPDATE users SET password_hash = ?, must_change_password = 0 WHERE id = ?")
    .bind(await hashPassword(password), id)
    .run();
  const credentials: StudentCredentials = { id, displayName: row.display_name, username: row.username, password };
  return c.json({ credentials });
});

/**
 * Permanently deletes a student and everything recorded about them (for privacy requests).
 * This is the only place attempt history is ever removed.
 */
adminRoutes.delete("/students/:id", async (c) => {
  const id = c.req.param("id");
  const row = await getUserById(c.env.DB, id);
  if (!row || row.role !== "student") return fail(c, 404, "not_found");
  const db = c.env.DB;
  await db.batch([
    db.prepare("DELETE FROM attempt_answers WHERE attempt_id IN (SELECT id FROM quiz_attempts WHERE user_id = ?)").bind(id),
    db.prepare("DELETE FROM quiz_attempts WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM lesson_progress WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM ai_events WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM login_events WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM game_plays WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM card_reviews WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM word_book WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM card_days WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM stuck_flags WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM deck_assignments WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM sticker_awards WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM shop_purchases WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM shop_equipped WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM teaser_plays WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM lesson_unlocks WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM course_assignments WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM class_members WHERE user_id = ?").bind(id),
    db.prepare("DELETE FROM users WHERE id = ? AND role = 'student'").bind(id),
  ]);
  return c.json({ ok: true });
});
