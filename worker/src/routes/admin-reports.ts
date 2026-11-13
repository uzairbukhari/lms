import { Hono } from "hono";
import type { AppEnv } from "../env";
import { fail } from "../lib/http";
import { attemptReview, loadQuestions, type AttemptRow, type QuestionRow } from "../lib/quiz";

/**
 * Reports for the parent. Quiz scores count graded attempts (taken in the lesson's own week); practice attempts are
 * always kept and shown separately, and only mix into totals when `includePractice=1` is asked for.
 */
export const adminReportRoutes = new Hono<AppEnv>();

type AttemptSummary = {
  id: string; attemptNumber: number; mode: "graded" | "practice"; percent: number; passed: number; submittedAt: string; durationSec: number | null;
  lessonId: string | null; lessonTitle: string | null; subject: string | null; kind: "lesson" | "exam"; examSemester: number | null; courseId: string | null; blueprint?: string | null;
};

const round1 = (n: number) => Math.round(n * 10) / 10;
const avg = (xs: number[]) => (xs.length ? round1(xs.reduce((a, b) => a + b, 0) / xs.length) : null);

async function studentReport(db: D1Database, userId: string, includePractice: boolean) {
  const user = await db.prepare("SELECT id, display_name AS displayName, username, avatar, is_active AS isActive FROM users WHERE id = ? AND role = 'student'").bind(userId).first<{ id: string; displayName: string; username: string; avatar: string | null; isActive: number }>();
  if (!user) return null;

  const attempts = (
    await db
      .prepare(
        `SELECT a.id, a.attempt_number AS attemptNumber, a.mode, a.percent, a.passed, a.submitted_at AS submittedAt, a.duration_sec AS durationSec,
                a.lesson_id AS lessonId, l.title AS lessonTitle, COALESCE(l.subject_id, z.subject_id) AS subject, z.kind, z.semester AS examSemester, z.course_id AS courseId, z.blueprint_json AS blueprint
           FROM quiz_attempts a JOIN quizzes z ON z.id = a.quiz_id LEFT JOIN lessons l ON l.id = a.lesson_id
          WHERE a.user_id = ? AND a.status = 'submitted' ORDER BY a.submitted_at, a.attempt_number`,
      )
      .bind(userId)
      .all<AttemptSummary>()
  ).results;
  const counted = (a: AttemptSummary) => a.mode === "graded" || includePractice;

  const slots = (await db.prepare("SELECT lesson_id AS lessonId, semester FROM course_lessons WHERE semester IS NOT NULL").all<{ lessonId: string; semester: number }>()).results;
  const semesterOf = new Map(slots.map((s) => [s.lessonId, s.semester]));

  // One row per lesson: every attempt, plus the best graded and best practice scores kept apart.
  const lessons = new Map<string, { lessonId: string; title: string; subject: string | null; semester: number | null; attempts: AttemptSummary[] }>();
  for (const a of attempts.filter((x) => x.kind === "lesson" && x.lessonId)) {
    const row = lessons.get(a.lessonId as string) ?? { lessonId: a.lessonId as string, title: a.lessonTitle ?? "", subject: a.subject, semester: semesterOf.get(a.lessonId as string) ?? null, attempts: [] };
    row.attempts.push(a);
    lessons.set(a.lessonId as string, row);
  }
  const lessonRows = [...lessons.values()].map((l) => {
    const best = (mode: string) => { const xs = l.attempts.filter((a) => a.mode === mode).map((a) => a.percent); return xs.length ? Math.max(...xs) : null; };
    return { ...l, bestGraded: best("graded"), bestPractice: best("practice"), attemptCount: l.attempts.length };
  });

  const skills = (
    await db
      .prepare(
        `SELECT q.skill_tag AS skill, SUM(aa.is_correct) AS correct, COUNT(*) AS total
           FROM attempt_answers aa JOIN quiz_attempts a ON a.id = aa.attempt_id JOIN questions q ON q.id = aa.question_id
          WHERE a.user_id = ? AND a.status = 'submitted' AND q.skill_tag IS NOT NULL ${includePractice ? "" : "AND a.mode = 'graded'"}
          GROUP BY q.skill_tag HAVING COUNT(*) >= 1`,
      )
      .bind(userId)
      .all<{ skill: string; correct: number; total: number }>()
  ).results
    .map((s) => ({ ...s, percent: round1((s.correct / s.total) * 100) }))
    .sort((a, b) => a.percent - b.percent || b.total - a.total);

  const progress = await db
    .prepare("SELECT COUNT(*) AS started, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed, COALESCE(SUM(time_spent_sec), 0) AS seconds FROM lesson_progress WHERE user_id = ?")
    .bind(userId)
    .first<{ started: number; completed: number | null; seconds: number }>();
  const hints = await db.prepare("SELECT COALESCE(SUM(aa.used_hint), 0) AS n FROM attempt_answers aa JOIN quiz_attempts a ON a.id = aa.attempt_id WHERE a.user_id = ?").bind(userId).first<{ n: number }>();

  // Report card: per subject and semester, the average of each lesson's best graded score, plus the best exam score.
  const card = new Map<string, { subject: string; semester: number; lessonScores: number[]; exam: number | null }>();
  const entry = (subject: string, semester: number) => {
    const k = `${subject}:${semester}`;
    const e = card.get(k) ?? { subject, semester, lessonScores: [], exam: null };
    card.set(k, e);
    return e;
  };
  for (const l of lessonRows) {
    if (l.subject && l.semester) {
      const s = includePractice ? Math.max(l.bestGraded ?? -1, l.bestPractice ?? -1) : l.bestGraded;
      if (s !== null && s >= 0) entry(l.subject, l.semester).lessonScores.push(s);
    }
  }
  for (const a of attempts.filter((x) => x.kind === "exam" && x.subject && x.examSemester)) {
    const e = entry(a.subject as string, a.examSemester as number);
    e.exam = Math.max(e.exam ?? 0, a.percent);
  }
  // By course: the courses of the student's class (plus any course a quizzed lesson belongs to), with class exams listed apart.
  const courseRows = (await db.prepare(
    `SELECT c.id AS courseId, c.title, c.subject_id AS subject, cl.lesson_id AS lessonId
       FROM courses c JOIN course_lessons cl ON cl.course_id = c.id
      WHERE c.id IN (SELECT cc.course_id FROM class_courses cc JOIN class_members m ON m.class_id = cc.class_id WHERE m.user_id = ?)
         OR cl.lesson_id IN (SELECT lesson_id FROM quiz_attempts WHERE user_id = ? AND lesson_id IS NOT NULL)`,
  ).bind(userId, userId).all<{ courseId: string; title: string; subject: string | null; lessonId: string }>()).results;
  const byCourseMap = new Map<string, { courseId: string; title: string; subject: string | null; lessonIds: Set<string> }>();
  for (const r of courseRows) {
    const e = byCourseMap.get(r.courseId) ?? { courseId: r.courseId, title: r.title, subject: r.subject, lessonIds: new Set<string>() };
    e.lessonIds.add(r.lessonId);
    byCourseMap.set(r.courseId, e);
  }
  const lessonScore = (l: (typeof lessonRows)[number]) => (includePractice ? Math.max(l.bestGraded ?? -1, l.bestPractice ?? -1) : l.bestGraded);
  const byCourse = [...byCourseMap.values()].map((c) => {
    const scores = lessonRows.filter((l) => c.lessonIds.has(l.lessonId)).map(lessonScore).filter((x): x is number => x !== null && x >= 0);
    const exams = attempts.filter((a) => a.kind === "exam" && a.courseId === c.courseId).map((a) => a.percent);
    return { courseId: c.courseId, title: c.title, subject: c.subject, lessonsTotal: c.lessonIds.size, lessonsQuizzed: scores.length, lessonAverage: avg(scores), examBest: exams.length ? Math.max(...exams) : null };
  }).sort((a, b) => a.title.localeCompare(b.title));
  const classExams = new Map<string, { title: string; best: number; attempts: number }>();
  for (const a of attempts.filter((x) => x.kind === "exam" && x.blueprint)) {
    let title = "";
    try { const bp = JSON.parse(a.blueprint as string); if (bp?.scope === "class") title = String(bp.title ?? "Class exam"); } catch { /* not a class exam */ }
    if (!title) continue;
    const e = classExams.get(title) ?? { title, best: 0, attempts: 0 };
    e.best = Math.max(e.best, a.percent); e.attempts++;
    classExams.set(title, e);
  }
  const reportCard = [...card.values()].map((e) => ({ subject: e.subject, semester: e.semester, lessons: e.lessonScores.length, lessonAverage: avg(e.lessonScores), examBest: e.exam })).sort((a, b) => a.semester - b.semester || a.subject.localeCompare(b.subject));

  const sorted = attempts.filter(counted);
  return {
    student: user,
    totals: {
      lessonsStarted: progress?.started ?? 0, lessonsCompleted: progress?.completed ?? 0, minutesSpent: Math.round((progress?.seconds ?? 0) / 60),
      gradedAttempts: attempts.filter((a) => a.mode === "graded").length, practiceAttempts: attempts.filter((a) => a.mode === "practice").length,
      averagePercent: avg(sorted.filter((a) => a.kind === "lesson").map((a) => a.percent)), hintsUsed: hints?.n ?? 0,
      lastActive: attempts.at(-1)?.submittedAt ?? null,
    },
    includePractice,
    /** Chronological scores for the learning curve. */
    curve: sorted.map((a) => ({ at: a.submittedAt, percent: a.percent, mode: a.mode, kind: a.kind, title: a.lessonTitle ?? "Exam" })),
    lessons: lessonRows.map((l) => ({ ...l, courses: [...byCourseMap.values()].filter((c) => c.lessonIds.has(l.lessonId)).map((c) => c.title) })).sort((a, b) => (a.semester ?? 9) - (b.semester ?? 9) || a.title.localeCompare(b.title)),
    exams: attempts.filter((a) => a.kind === "exam"),
    weakestSkills: skills.slice(0, 8),
    strongestSkills: [...skills].reverse().slice(0, 5),
    reportCard,
    byCourse,
    classExams: [...classExams.values()],
  };
}

adminReportRoutes.get("/reports/students/:id", async (c) => {
  const report = await studentReport(c.env.DB, c.req.param("id"), c.req.query("includePractice") === "1");
  if (!report) return fail(c, 404, "not_found");
  const id = c.req.param("id");
  // A saved record from an archived class says so; a current student lists the classes they have been through.
  const rec = await c.env.DB.prepare("SELECT u.archive_of AS ofId, u.archived_at AS archivedAt, c.id AS classId, c.name AS className FROM users u JOIN classes c ON c.id = u.archive_class_id WHERE u.id = ? AND u.archive_of IS NOT NULL").bind(id).first<{ ofId: string; archivedAt: string; classId: string; className: string }>();
  const previous = (await c.env.DB.prepare("SELECT m.record_user_id AS recordId, m.class_id AS classId, c.name AS className, m.archived_at AS archivedAt FROM class_archive_members m JOIN classes c ON c.id = m.class_id WHERE m.user_id = ? ORDER BY m.archived_at DESC").bind(id).all()).results;
  return c.json({ ...report, archive: rec ?? null, previousClasses: previous });
});

/** Everything about one attempt, question by question, so the parent can see exactly what was answered. */
adminReportRoutes.get("/reports/attempts/:id", async (c) => {
  const attempt = await c.env.DB.prepare("SELECT * FROM quiz_attempts WHERE id = ?").bind(c.req.param("id")).first<AttemptRow>();
  if (!attempt) return fail(c, 404, "not_found");
  const review = await attemptReview(c.env.DB, attempt);
  const questions = await loadQuestions(c.env.DB, attempt.quiz_id, review.review.map((r) => r.questionId));
  const hinted = new Set((await c.env.DB.prepare("SELECT question_id FROM attempt_answers WHERE attempt_id = ? AND used_hint = 1").bind(attempt.id).all<{ question_id: string }>()).results.map((r) => r.question_id));
  const byId = new Map<string, QuestionRow>(questions.map((q) => [q.id, q]));
  return c.json({
    attempt: { id: attempt.id, attemptNumber: attempt.attempt_number, mode: attempt.mode, status: attempt.status, startedAt: attempt.started_at, submittedAt: attempt.submitted_at },
    score: review.score, maxScore: review.maxScore, percent: review.percent, passed: review.passed,
    questions: review.review.map((r) => {
      const q = byId.get(r.questionId);
      return { ...r, prompt: q?.prompt, type: q?.type, options: q?.options_json ? JSON.parse(q.options_json) : null, skill: q?.skill_tag ?? null, usedHint: hinted.has(r.questionId) };
    }),
  });
});

/** One line per student for a class: who is keeping up, and who has not opened anything lately. */
adminReportRoutes.get("/reports/classes/:id", async (c) => {
  const id = c.req.param("id");
  const cls = await c.env.DB.prepare("SELECT id, name FROM classes WHERE id = ?").bind(id).first<{ id: string; name: string }>();
  if (!cls) return fail(c, 404, "not_found");
  const includePractice = c.req.query("includePractice") === "1";
  // An archived class is read from the records saved when it was archived.
  const { results: members } = await c.env.DB.prepare("SELECT u.id FROM class_members m JOIN users u ON u.id = m.user_id WHERE m.class_id = ? AND u.is_test = 0 UNION SELECT record_user_id FROM class_archive_members WHERE class_id = ? ORDER BY 1").bind(id, id).all<{ id: string }>();
  const students = [];
  for (const m of members) {
    const r = await studentReport(c.env.DB, m.id, includePractice);
    if (r) students.push({ id: r.student.id, displayName: r.student.displayName, ...r.totals, weakest: r.weakestSkills[0]?.skill ?? null });
  }
  students.sort((a, b) => a.displayName.localeCompare(b.displayName));
  const { results: hardest } = await c.env.DB
    .prepare(
      `SELECT q.id, q.prompt, l.title AS lesson, SUM(aa.is_correct) AS correct, COUNT(*) AS total
         FROM attempt_answers aa JOIN quiz_attempts a ON a.id = aa.attempt_id JOIN questions q ON q.id = aa.question_id JOIN quizzes z ON z.id = q.quiz_id LEFT JOIN lessons l ON l.id = z.lesson_id
        WHERE a.user_id IN (SELECT m.user_id FROM class_members m JOIN users u ON u.id = m.user_id WHERE m.class_id = ? AND u.is_test = 0 UNION SELECT record_user_id FROM class_archive_members WHERE class_id = ?) AND a.status = 'submitted' AND a.mode = 'graded' AND z.kind = 'lesson'
        GROUP BY q.id HAVING COUNT(*) >= 1 ORDER BY (1.0 * SUM(aa.is_correct) / COUNT(*)) ASC LIMIT 5`,
    )
    .bind(id, id)
    .all();
  return c.json({ class: cls, includePractice, students, hardestQuestions: hardest });
});

/** Spreadsheet export of every submitted attempt for a student. */
adminReportRoutes.get("/reports/students/:id/export.csv", async (c) => {
  const id = c.req.param("id");
  const user = await c.env.DB.prepare("SELECT display_name FROM users WHERE id = ? AND role = 'student'").bind(id).first<{ display_name: string }>();
  if (!user) return fail(c, 404, "not_found");
  const { results } = await c.env.DB
    .prepare(
      `SELECT a.submitted_at, COALESCE(l.title, CASE WHEN z.semester IS NULL THEN 'Grand quiz' ELSE 'Semester ' || z.semester || ' exam' END) AS what, z.kind, a.attempt_number, a.mode, a.score, a.max_score, a.percent, a.passed, a.duration_sec
         FROM quiz_attempts a JOIN quizzes z ON z.id = a.quiz_id LEFT JOIN lessons l ON l.id = a.lesson_id
        WHERE a.user_id = ? AND a.status = 'submitted' ORDER BY a.submitted_at`,
    )
    .bind(id)
    .all<Record<string, string | number | null>>();
  // Prefix risky leading characters so a spreadsheet never treats a lesson title as a formula.
  const cell = (v: string | number | null) => {
    const s = v === null ? "" : String(v);
    const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
    return /[",\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
  };
  const head = ["submitted_at", "what", "kind", "attempt", "mode", "score", "max_score", "percent", "passed", "seconds"];
  const rows = results.map((r) => Object.values(r).map(cell).join(","));
  return new Response([head.join(","), ...rows].join("\n") + "\n", {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${user.display_name.replace(/[^A-Za-z0-9]+/g, "-")}-attempts.csv"`, "X-Content-Type-Options": "nosniff" },
  });
});
