import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../env";
import { assignedCourseIds, examsForCourses, openExamSemesters } from "../lib/exams";
import { fail, parseBody } from "../lib/http";
import { attemptDraft, attemptQuestions, attemptReview, saveDraft, startAttempt, submitAttempt, type AttemptRow, type QuizRow } from "../lib/quiz";
import { todayIn, visibleLessonsFor } from "../lib/visibility";
import { requireStudent } from "../middleware/auth";

/** Quizzes and exams for a signed-in child. The browser never receives answers until an attempt is submitted. */
export const quizRoutes = new Hono<AppEnv>();
for (const path of ["/lessons/:id/quiz/*", "/lessons/:id/attempts", "/quiz/*", "/exams", "/exams/*"]) quizRoutes.use(path, requireStudent);

const QUIZ_COLUMNS = "id, kind, pass_percent, shuffle_questions, shuffle_options, max_attempts";

function startedBody(attempt: AttemptRow, quiz: QuizRow, questions: unknown[], resumed: boolean) {
  return { attemptId: attempt.id, attemptNumber: attempt.attempt_number, mode: attempt.mode, resumed, passPercent: quiz.pass_percent, questions, draft: attemptDraft(attempt) };
}

/**
 * Start (or resume) the quiz for a lesson the child may open. During the lesson's own week it is a graded attempt;
 * from any later week it is a practice attempt. Both are recorded, and a quiz can be retaken as often as the child likes.
 */
quizRoutes.post("/lessons/:id/quiz/start", async (c) => {
  const user = c.get("user");
  const lessonId = c.req.param("id");
  const vis = await visibleLessonsFor(c.env.DB, user.id, todayIn(c.env.TIMEZONE));
  const v = vis.lessons.find((l) => l.lessonId === lessonId);
  if (!v) return fail(c, 404, "not_found");
  const quiz = await c.env.DB.prepare(`SELECT ${QUIZ_COLUMNS} FROM quizzes WHERE lesson_id = ? AND is_current = 1`).bind(lessonId).first<QuizRow>();
  if (!quiz) return fail(c, 404, "not_found");
  const mode = v.phase === "current" || v.phase === "early" ? "graded" : "practice";
  const started = await startAttempt(c.env.DB, { userId: user.id, quiz, lessonId, scopeKey: `lesson:${lessonId}`, mode, gradedUntilPassed: v.path === true });
  if (!started.ok) return fail(c, 403, started.reason, started.reason === "no_attempts_left" ? "You have used all your tries." : "This quiz has no questions yet.");
  return c.json(startedBody(started.attempt, quiz, await attemptQuestions(c.env.DB, started.attempt, quiz), started.resumed));
});

quizRoutes.get("/lessons/:id/attempts", async (c) => {
  const user = c.get("user");
  const lessonId = c.req.param("id");
  const vis = await visibleLessonsFor(c.env.DB, user.id, todayIn(c.env.TIMEZONE));
  if (!vis.lessons.some((l) => l.lessonId === lessonId)) return fail(c, 404, "not_found");
  const { results } = await c.env.DB
    .prepare("SELECT id, attempt_number AS attemptNumber, mode, percent, passed, submitted_at AS submittedAt FROM quiz_attempts WHERE user_id = ? AND scope_key = ? AND status = 'submitted' ORDER BY attempt_number DESC")
    .bind(user.id, `lesson:${lessonId}`)
    .all();
  return c.json({ attempts: results });
});

async function ownAttempt(c: { env: AppEnv["Bindings"]; get: (k: "user") => { id: string } }, id: string) {
  const attempt = await c.env.DB.prepare("SELECT * FROM quiz_attempts WHERE id = ? AND user_id = ?").bind(id, c.get("user").id).first<AttemptRow>();
  if (!attempt) return null;
  const quiz = await c.env.DB.prepare(`SELECT ${QUIZ_COLUMNS} FROM quizzes WHERE id = ?`).bind(attempt.quiz_id).first<QuizRow>();
  return quiz ? { attempt, quiz } : null;
}

const submitSchema = z.object({
  answers: z.record(z.string(), z.unknown()),
  hintsUsed: z.array(z.string()).max(60).optional(),
  durationSec: z.number().int().min(0).max(6 * 3600).optional(),
});

quizRoutes.post("/quiz/attempts/:id/submit", async (c) => {
  const own = await ownAttempt(c, c.req.param("id"));
  if (!own) return fail(c, 404, "not_found");
  if (own.attempt.status !== "in_progress") return fail(c, 409, "already_submitted", "This quiz was already handed in.");
  const body = await parseBody(c, submitSchema);
  const result = await submitAttempt(c.env.DB, own.attempt, own.quiz, body.answers as never, { hintsUsed: body.hintsUsed, durationSec: body.durationSec });
  return c.json({ attemptId: own.attempt.id, mode: own.attempt.mode, attemptNumber: own.attempt.attempt_number, ...result });
});

const progressSchema = z.object({
  answers: z.record(z.string(), z.unknown()),
  hintsUsed: z.array(z.string()).max(60).default([]),
  index: z.number().int().min(0).max(200).default(0),
});

/** Autosave: the answers so far, so a dropped connection or a failed hand-in never loses them. */
quizRoutes.put("/quiz/attempts/:id/progress", async (c) => {
  const own = await ownAttempt(c, c.req.param("id"));
  if (!own) return fail(c, 404, "not_found");
  if (own.attempt.status !== "in_progress") return fail(c, 409, "already_submitted", "This quiz was already handed in.");
  const body = await parseBody(c, progressSchema);
  if (JSON.stringify(body.answers).length > 60_000) return fail(c, 422, "too_large");
  await saveDraft(c.env.DB, own.attempt.id, body);
  return c.json({ saved: true });
});

/** An attempt in progress (to resume) or the recorded result of a finished one. */
quizRoutes.get("/quiz/attempts/:id", async (c) => {
  const own = await ownAttempt(c, c.req.param("id"));
  if (!own) return fail(c, 404, "not_found");
  if (own.attempt.status === "submitted") {
    return c.json({ attemptId: own.attempt.id, status: "submitted", mode: own.attempt.mode, attemptNumber: own.attempt.attempt_number, ...(await attemptReview(c.env.DB, own.attempt)) });
  }
  return c.json({ status: own.attempt.status, ...startedBody(own.attempt, own.quiz, await attemptQuestions(c.env.DB, own.attempt, own.quiz), true) });
});

/** The static hint for one question of an attempt in progress. (AI hints are layered on top in the AI routes.) */
quizRoutes.post("/quiz/attempts/:id/hint", async (c) => {
  const own = await ownAttempt(c, c.req.param("id"));
  if (!own || own.attempt.status !== "in_progress") return fail(c, 404, "not_found");
  const { questionId } = await parseBody(c, z.object({ questionId: z.string() }));
  const row = await c.env.DB.prepare("SELECT hint FROM questions WHERE id = ? AND quiz_id = ?").bind(questionId, own.attempt.quiz_id).first<{ hint: string | null }>();
  if (!row) return fail(c, 404, "not_found");
  return c.json({ hint: row.hint ?? "Read the question again, slowly. Take your time!" });
});

// --- Semester exams ---------------------------------------------------------------------------------------

/** The exams this child can sit now, with how many tries they have used. */
quizRoutes.get("/exams", async (c) => {
  const user = c.get("user");
  const db = c.env.DB;
  const classIds = (await db.prepare("SELECT c.id FROM class_members m JOIN classes c ON c.id = m.class_id WHERE m.user_id = ? AND c.is_active = 1").bind(user.id).all<{ id: string }>()).results.map((r) => r.id);
  const courses = await assignedCourseIds(db, user.id, classIds);
  const open = await openExamSemesters(db, user.id, todayIn(c.env.TIMEZONE));
  const exams = (await examsForCourses(db, courses)).filter((e) => open.has(`${e.courseId}:${e.semester}`));
  const out = [];
  for (const e of exams) {
    const stats = await db
      .prepare("SELECT COUNT(*) AS used, MAX(percent) AS best, MAX(passed) AS passed FROM quiz_attempts WHERE user_id = ? AND quiz_id = ? AND status = 'submitted'")
      .bind(user.id, e.id)
      .first<{ used: number; best: number | null; passed: number | null }>();
    out.push({ ...e, attemptsUsed: stats?.used ?? 0, bestPercent: stats?.best ?? null, passed: stats?.passed === 1 });
  }
  return c.json({ exams: out });
});

quizRoutes.post("/exams/:id/start", async (c) => {
  const user = c.get("user");
  const db = c.env.DB;
  const quiz = await db.prepare(`SELECT ${QUIZ_COLUMNS}, course_id, semester FROM quizzes WHERE id = ? AND kind = 'exam' AND is_current = 1`).bind(c.req.param("id")).first<QuizRow & { course_id: string; semester: number }>();
  if (!quiz) return fail(c, 404, "not_found");
  const open = await openExamSemesters(db, user.id, todayIn(c.env.TIMEZONE));
  if (!open.has(`${quiz.course_id}:${quiz.semester}`)) return fail(c, 404, "not_found");
  const started = await startAttempt(db, { userId: user.id, quiz, lessonId: null, scopeKey: `exam:${quiz.course_id}:${quiz.semester}`, mode: "graded" });
  if (!started.ok) return fail(c, 403, started.reason, started.reason === "no_attempts_left" ? "You have used all your tries for this exam." : "This exam has no questions yet.");
  return c.json(startedBody(started.attempt, quiz, await attemptQuestions(db, started.attempt, quiz), started.resumed));
});
