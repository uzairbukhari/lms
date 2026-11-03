import { Hono } from "hono";
import type { AppEnv } from "../env";
import { fail } from "../lib/http";
import { buildPrompt } from "../lib/promptBuilder";
import { weekStatus } from "../lib/week";

/** This week's progress per child, and the "make the next lesson" prompt. Mounted under /api/admin. */
export const adminWeekRoutes = new Hono<AppEnv>();

adminWeekRoutes.get("/week", async (c) => c.json(await weekStatus(c.env.DB, c.env.TIMEZONE)));

adminWeekRoutes.get("/prompt", async (c) => {
  const courseId = c.req.query("courseId") ?? "";
  const semester = Number(c.req.query("semester"));
  const week = Number(c.req.query("week"));
  if (!courseId || !Number.isInteger(semester) || semester < 1 || semester > 4 || !Number.isInteger(week) || week < 1 || week > 13) return fail(c, 400, "bad_request", "Pick a course, semester and week.");
  const db = c.env.DB;
  const course = await db.prepare("SELECT title, subject_id AS subject, age_band AS ageBand FROM courses WHERE id = ?").bind(courseId).first<{ title: string; subject: string; ageBand: string | null }>();
  if (!course) return fail(c, 404, "not_found");
  const studentId = c.req.query("studentId") || null;
  const classId = c.req.query("classId") || null;

  const earlier = await db
    .prepare(
      `SELECT cl.semester, cl.week, l.title, l.summary FROM course_lessons cl JOIN lessons l ON l.id = cl.lesson_id
        WHERE cl.course_id = ? AND cl.semester IS NOT NULL AND (cl.semester * 100 + cl.week) < ? ORDER BY cl.semester, cl.week`,
    )
    .bind(courseId, semester * 100 + week)
    .all<{ semester: number; week: number; title: string; summary: string }>();

  const weakWhere = studentId ? "a.user_id = ?" : classId ? "a.user_id IN (SELECT m.user_id FROM class_members m JOIN users u ON u.id = m.user_id WHERE m.class_id = ? AND u.is_test = 0)" : "";
  const weak = weakWhere
    ? await db
        .prepare(
          `SELECT q.skill_tag AS skill, 100.0 * SUM(aa.is_correct) / COUNT(*) AS percent
             FROM attempt_answers aa JOIN quiz_attempts a ON a.id = aa.attempt_id JOIN questions q ON q.id = aa.question_id
            WHERE ${weakWhere} AND a.status = 'submitted' AND a.mode = 'graded' AND q.skill_tag IS NOT NULL
            GROUP BY q.skill_tag HAVING COUNT(*) >= 2 AND percent < 70 ORDER BY percent LIMIT 5`,
        )
        .bind(studentId ?? classId)
        .all<{ skill: string; percent: number }>()
    : { results: [] as { skill: string; percent: number }[] };
  const child = studentId ? await db.prepare("SELECT display_name AS name FROM users WHERE id = ? AND role = 'student'").bind(studentId).first<{ name: string }>() : null;
  const cls = classId ? await db.prepare("SELECT name FROM classes WHERE id = ?").bind(classId).first<{ name: string }>() : null;

  const prompt = buildPrompt({
    course, semester, week, topic: c.req.query("topic") ?? "", earlier: earlier.results, weakSkills: weak.results,
    childName: child?.name ?? null, className: cls?.name ?? null, repoUrl: "https://github.com/uzairbukhari/lms",
  });
  return c.json({ prompt });
});
