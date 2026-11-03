import { Hono } from "hono";
import type { AppEnv } from "../env";
import { aiAlertThreshold } from "../lib/settings";
import { FREE_NEURONS_PER_DAY } from "../lib/usage";
import { weekStatus } from "../lib/week";
import { addDays, currentSlot, type TermRow } from "../lib/terms";

/** Read-only numbers for the admin Dashboard and the Students table. Mounted under /api/admin. */
export const adminOverviewRoutes = new Hono<AppEnv>();

type Attention = { kind: "no_calendar" | "no_courses" | "draft_soon" | "inactive" | "ai_spend" | "sign_in_failures" | "week_due" | "stuck"; message: string; href: string };

adminOverviewRoutes.get("/overview", async (c) => {
  const db = c.env.DB;
  const today = new Date().toISOString().slice(0, 10);
  const weekAgo = addDays(today, -7);
  const monthAgo = addDays(today, -30);

  const [students, lessons, classes, terms, assignments, recent, perStudent, month, week, slots] = await Promise.all([
    db.prepare("SELECT id, display_name AS name FROM users WHERE role = 'student' AND is_test = 0 AND is_active = 1").all<{ id: string; name: string }>(),
    db.prepare("SELECT status, COUNT(*) AS n FROM lessons GROUP BY status").all<{ status: string; n: number }>(),
    db.prepare("SELECT c.id, c.name, (SELECT COUNT(*) FROM class_members m WHERE m.class_id = c.id AND m.user_id NOT IN (SELECT id FROM users WHERE is_test = 1)) AS studentCount FROM classes c WHERE c.is_active = 1 ORDER BY c.name").all<{ id: string; name: string; studentCount: number }>(),
    db.prepare("SELECT class_id, number, name, start_date, end_date, teaching_weeks, exam_week FROM terms").all<TermRow & { class_id: string }>(),
    db.prepare("SELECT a.class_id AS classId, a.course_id AS courseId, co.title FROM course_assignments a JOIN courses co ON co.id = a.course_id WHERE a.class_id IS NOT NULL").all<{ classId: string; courseId: string; title: string }>(),
    db
      .prepare(
        `SELECT a.id, a.user_id AS studentId, u.display_name AS studentName, COALESCE(l.title, 'Semester exam') AS title, a.percent, a.mode, a.submitted_at AS submittedAt
           FROM quiz_attempts a JOIN users u ON u.id = a.user_id LEFT JOIN lessons l ON l.id = a.lesson_id
          WHERE a.status = 'submitted' AND u.is_test = 0 ORDER BY a.submitted_at DESC LIMIT 10`,
      )
      .all(),
    db
      .prepare(
        `SELECT user_id AS id, MAX(submitted_at) AS lastActive, COUNT(CASE WHEN mode = 'graded' THEN 1 END) AS gradedAttempts, AVG(CASE WHEN mode = 'graded' THEN percent END) AS averagePercent
           FROM quiz_attempts WHERE status = 'submitted' AND user_id NOT IN (SELECT id FROM users WHERE is_test = 1) GROUP BY user_id`,
      )
      .all<{ id: string; lastActive: string | null; gradedAttempts: number; averagePercent: number | null }>(),
    db.prepare("SELECT AVG(percent) AS avg FROM quiz_attempts WHERE status = 'submitted' AND mode = 'graded' AND submitted_at >= ? AND user_id NOT IN (SELECT id FROM users WHERE is_test = 1)").bind(monthAgo).first<{ avg: number | null }>(),
    db.prepare("SELECT COUNT(*) AS n FROM quiz_attempts WHERE status = 'submitted' AND submitted_at >= ? AND user_id NOT IN (SELECT id FROM users WHERE is_test = 1)").bind(weekAgo).first<{ n: number }>(),
    db
      .prepare(
        `SELECT cl.course_id AS courseId, cl.semester, cl.week, l.title FROM course_lessons cl JOIN lessons l ON l.id = cl.lesson_id
          WHERE l.status != 'published' AND cl.semester IS NOT NULL`,
      )
      .all<{ courseId: string; semester: number; week: number; title: string }>(),
  ]);

  const statusCount = (s: string) => lessons.results.find((r) => r.status === s)?.n ?? 0;
  const activity = new Map(perStudent.results.map((r) => [r.id, r]));
  const attention: Attention[] = [];
  const classCards = classes.results.map((cl) => {
    const clTerms = terms.results.filter((t) => t.class_id === cl.id);
    const courses = assignments.results.filter((a) => a.classId === cl.id);
    const now = currentSlot(clTerms, today);
    if (clTerms.length === 0) attention.push({ kind: "no_calendar", message: `${cl.name} has no school-year dates, so no lessons are released.`, href: `/admin/classes/${cl.id}` });
    if (courses.length === 0) attention.push({ kind: "no_courses", message: `${cl.name} has no courses assigned.`, href: `/admin/classes/${cl.id}` });
    for (const s of slots.results) {
      if (!courses.some((co) => co.courseId === s.courseId) || !now) continue;
      const order = (sem: number, w: number) => sem * 100 + w;
      if (order(s.semester, s.week) <= order(now.semester, now.week + 1)) {
        attention.push({ kind: "draft_soon", message: `"${s.title}" is still a draft but is planned for S${s.semester} week ${s.week} (${cl.name}).`, href: "/admin/lessons" });
      }
    }
    return { id: cl.id, name: cl.name, studentCount: cl.studentCount, courses: courses.map((co) => co.title), hasCalendar: clTerms.length > 0, now };
  });
  for (const s of students.results) {
    const last = activity.get(s.id)?.lastActive;
    if (last && last.slice(0, 10) < weekAgo) attention.push({ kind: "inactive", message: `${s.name} has not taken a quiz since ${last.slice(0, 10)}.`, href: `/admin/students/${s.id}` });
  }

  // AI spend alert (A13): today's Workers AI use against the limit set in Settings.
  const threshold = await aiAlertThreshold(db);
  const usedToday = (await db.prepare("SELECT COALESCE(SUM(neurons), 0) AS n FROM ai_usage WHERE date(created_at) = ? AND (user_id IS NULL OR user_id NOT IN (SELECT id FROM users WHERE is_test = 1))").bind(today).first<{ n: number }>())?.n ?? 0;
  if (threshold > 0 && usedToday >= threshold) {
    attention.push({ kind: "ai_spend", message: `AI use today is ${Math.round(usedToday).toLocaleString("en")} of your ${threshold.toLocaleString("en")} alert limit${usedToday >= FREE_NEURONS_PER_DAY ? ", and past the free daily allowance (it now costs money)" : ""}.`, href: "/admin/settings" });
  }
  // From Saturday, anything not finished is due tomorrow (lessons are due Sunday).
  const due = await weekStatus(db, c.env.TIMEZONE);
  if (due.dueSoon) {
    for (const st of due.students) {
      if (st.total > 0 && st.done < st.total) attention.push({ kind: "week_due", message: `${st.name} has ${st.total - st.done} of ${st.total} lessons left to finish ${due.daysLeft === 0 ? "today" : "by tomorrow"}.`, href: "/admin" });
    }
  }
  const stuck = (await db.prepare("SELECT COUNT(*) AS n FROM stuck_flags WHERE status = 'open' AND user_id NOT IN (SELECT id FROM users WHERE is_test = 1)").first<{ n: number }>())?.n ?? 0;
  if (stuck > 0) attention.push({ kind: "stuck", message: `${stuck} spot${stuck === 1 ? "" : "s"} the children flagged as confusing ("I'm stuck").`, href: "/admin/stuck" });
  // Repeated wrong passwords on one child's login (someone guessing, or a child who forgot).
  const failures = await db
    .prepare("SELECT e.user_id AS id, u.display_name AS name, COUNT(*) AS n FROM login_events e JOIN users u ON u.id = e.user_id WHERE u.is_test = 0 AND e.ok = 0 AND e.created_at >= datetime('now', '-1 day') GROUP BY e.user_id HAVING n >= 5")
    .all<{ id: string; name: string; n: number }>();
  for (const f of failures.results) attention.push({ kind: "sign_in_failures", message: `${f.n} wrong passwords for ${f.name}'s login in the last day.`, href: `/admin/students/${f.id}` });

  return c.json({
    totals: {
      activeStudents: students.results.length,
      publishedLessons: statusCount("published"),
      draftLessons: statusCount("draft"),
      averagePercent30d: month?.avg === null || month?.avg === undefined ? null : Math.round(month.avg * 10) / 10,
      attemptsThisWeek: week?.n ?? 0,
    },
    classes: classCards,
    recent: recent.results,
    attention,
    students: perStudent.results.map((r) => ({ ...r, averagePercent: r.averagePercent === null ? null : Math.round(r.averagePercent * 10) / 10 })),
  });
});
