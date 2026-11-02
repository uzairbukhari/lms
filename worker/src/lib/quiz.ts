import { gradeQuestion, type Response } from "@lms/schema";

// The quiz engine shared by lesson quizzes and semester exams. Grading happens here, on the server;
// the child's browser only ever receives questions without answers.

export type QuestionRow = {
  id: string; ref: string; position: number; type: string; prompt: string; media_json: string | null;
  options_json: string | null; answer_json: string; hint: string | null; explanation: string | null;
  points: number; skill_tag: string | null;
};

export type QuizRow = { id: string; kind: string; pass_percent: number; shuffle_questions: number; shuffle_options: number; max_attempts: number | null };
export type AttemptRow = {
  id: string; user_id: string; quiz_id: string; lesson_id: string | null; scope_key: string; attempt_number: number;
  mode: "graded" | "practice"; status: "in_progress" | "submitted" | "abandoned"; question_order: string | null;
  started_at: string; submitted_at: string | null; score: number | null; max_score: number | null; percent: number | null; passed: number | null;
};

/** Small seeded generator so a child's option order stays the same if they reload mid-quiz. */
function seeded(seed: string): () => number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 3432918353), (h = (h << 13) | (h >>> 19));
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(items: T[], rand: () => number): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j] as T, a[i] as T];
  }
  return a;
}

const parse = <T>(json: string | null): T | null => (json ? (JSON.parse(json) as T) : null);

/** The full question (with the answer) in the shape gradeQuestion expects. Never sent to a child. */
function gradable(q: QuestionRow) {
  return { type: q.type, prompt: q.prompt, points: q.points, ...(parse<object>(q.options_json) ?? {}), answer: JSON.parse(q.answer_json) } as Parameters<typeof gradeQuestion>[0];
}

/** What the child sees: the prompt and choices, without the answer, hint text or explanation. */
export function publicQuestion(q: QuestionRow, attemptId: string, shuffleOptions: boolean) {
  const opts = parse<{ options?: unknown[]; items?: unknown[]; left?: unknown[]; right?: unknown[] }>(q.options_json) ?? {};
  const rand = seeded(`${attemptId}:${q.id}`);
  const out: Record<string, unknown> = { id: q.id, type: q.type, prompt: q.prompt, points: q.points, hasHint: q.hint !== null, ...(parse<{ emoji?: string }>(q.media_json) ?? {}) };
  if (opts.options) out.options = shuffleOptions ? shuffled(opts.options, rand) : opts.options;
  // Items to put in order must not start in the right order, so they are always shuffled.
  if (opts.items) out.items = shuffled(opts.items, rand);
  if (opts.left) out.left = opts.left;
  if (opts.right) out.right = shuffleOptions ? shuffled(opts.right ?? [], rand) : opts.right;
  return out;
}

export async function loadQuestions(db: D1Database, quizId: string, ids?: string[]): Promise<QuestionRow[]> {
  const { results } = await db.prepare("SELECT * FROM questions WHERE quiz_id = ? ORDER BY position").bind(quizId).all<QuestionRow>();
  if (!ids) return results;
  const byId = new Map(results.map((q) => [q.id, q]));
  return ids.map((id) => byId.get(id)).filter((q): q is QuestionRow => q !== undefined);
}

export type StartResult =
  | { ok: true; attempt: AttemptRow; resumed: boolean }
  | { ok: false; reason: "no_attempts_left" | "no_questions" };

/**
 * Begin a quiz or exam attempt, or resume the one already in progress. Attempts are append-only and numbered per child per scope.
 * `maxAttempts` (when set) counts submitted attempts, so abandoning a half-finished one never uses one up.
 */
export async function startAttempt(
  db: D1Database,
  p: { userId: string; quiz: QuizRow; lessonId: string | null; scopeKey: string; mode: "graded" | "practice" },
): Promise<StartResult> {
  const open = await db
    .prepare("SELECT * FROM quiz_attempts WHERE user_id = ? AND scope_key = ? AND status = 'in_progress' AND quiz_id = ? ORDER BY attempt_number DESC LIMIT 1")
    .bind(p.userId, p.scopeKey, p.quiz.id)
    .first<AttemptRow>();
  if (open) return { ok: true, attempt: open, resumed: true };

  const stats = await db
    .prepare("SELECT COALESCE(MAX(attempt_number), 0) AS last, SUM(CASE WHEN status = 'submitted' THEN 1 ELSE 0 END) AS submitted FROM quiz_attempts WHERE user_id = ? AND scope_key = ?")
    .bind(p.userId, p.scopeKey)
    .first<{ last: number; submitted: number | null }>();
  if (p.quiz.max_attempts !== null && (stats?.submitted ?? 0) >= p.quiz.max_attempts) return { ok: false, reason: "no_attempts_left" };

  const questions = await loadQuestions(db, p.quiz.id);
  if (questions.length === 0) return { ok: false, reason: "no_questions" };
  const order = (p.quiz.shuffle_questions ? shuffled(questions, Math.random) : questions).map((q) => q.id);

  const id = crypto.randomUUID();
  const number = (stats?.last ?? 0) + 1;
  await db
    .prepare("INSERT INTO quiz_attempts (id, user_id, quiz_id, lesson_id, scope_key, attempt_number, mode, question_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(id, p.userId, p.quiz.id, p.lessonId, p.scopeKey, number, p.mode, JSON.stringify(order))
    .run();
  const attempt = await db.prepare("SELECT * FROM quiz_attempts WHERE id = ?").bind(id).first<AttemptRow>();
  return { ok: true, attempt: attempt as AttemptRow, resumed: false };
}

export async function attemptQuestions(db: D1Database, attempt: AttemptRow, quiz: QuizRow) {
  const order = JSON.parse(attempt.question_order ?? "[]") as string[];
  return (await loadQuestions(db, attempt.quiz_id, order)).map((q) => publicQuestion(q, attempt.id, quiz.shuffle_options === 1));
}

export type ReviewItem = {
  questionId: string; correct: boolean; points: number; maxPoints: number; response: unknown;
  /** Shown only after submitting: the right answer and why. */
  answer: unknown; explanation: string | null;
};

export type SubmitResult = { score: number; maxScore: number; percent: number; passed: boolean; review: ReviewItem[] };

/** Grade and record an attempt. Questions with no answer count as wrong. Safe to call once; a second call is refused by the caller. */
export async function submitAttempt(
  db: D1Database,
  attempt: AttemptRow,
  quiz: QuizRow,
  answers: Record<string, Response>,
  extra: { hintsUsed?: string[]; durationSec?: number } = {},
): Promise<SubmitResult> {
  const order = JSON.parse(attempt.question_order ?? "[]") as string[];
  const questions = await loadQuestions(db, attempt.quiz_id, order);
  const hinted = new Set(extra.hintsUsed ?? []);
  let score = 0;
  let maxScore = 0;
  const review: ReviewItem[] = [];
  const statements: D1PreparedStatement[] = [];

  for (const q of questions) {
    const response = answers[q.id] ?? null;
    const g = gradeQuestion(gradable(q), response as Response);
    score += g.points;
    maxScore += q.points;
    const stored = JSON.stringify(response ?? null);
    statements.push(
      db
        .prepare("INSERT INTO attempt_answers (attempt_id, question_id, response_json, is_correct, points_awarded, used_hint) VALUES (?, ?, ?, ?, ?, ?)")
        .bind(attempt.id, q.id, stored.length > 2000 ? "null" : stored, g.correct ? 1 : 0, g.points, hinted.has(q.id) ? 1 : 0),
    );
    review.push({ questionId: q.id, correct: g.correct, points: g.points, maxPoints: q.points, response, answer: JSON.parse(q.answer_json), explanation: q.explanation });
  }
  const percent = maxScore === 0 ? 0 : Math.round((score / maxScore) * 1000) / 10;
  const passed = percent >= quiz.pass_percent;
  const duration = Math.max(0, Math.min(Math.round(extra.durationSec ?? (Date.now() - Date.parse(attempt.started_at.replace(" ", "T") + "Z")) / 1000), 6 * 3600)) || 0;
  statements.push(
    db
      .prepare("UPDATE quiz_attempts SET status = 'submitted', submitted_at = datetime('now'), duration_sec = ?, score = ?, max_score = ?, percent = ?, passed = ? WHERE id = ? AND status = 'in_progress'")
      .bind(duration, score, maxScore, percent, passed ? 1 : 0, attempt.id),
  );
  await db.batch(statements);
  return { score, maxScore, percent, passed, review };
}

/** The recorded result of a submitted attempt, rebuilt from storage (for the results screen and for the parent). */
export async function attemptReview(db: D1Database, attempt: AttemptRow): Promise<SubmitResult> {
  const { results } = await db
    .prepare(
      `SELECT a.question_id AS questionId, a.response_json, a.is_correct, a.points_awarded, q.points AS maxPoints, q.answer_json, q.explanation
         FROM attempt_answers a JOIN questions q ON q.id = a.question_id WHERE a.attempt_id = ?`,
    )
    .bind(attempt.id)
    .all<{ questionId: string; response_json: string; is_correct: number; points_awarded: number; maxPoints: number; answer_json: string; explanation: string | null }>();
  const order = JSON.parse(attempt.question_order ?? "[]") as string[];
  const byId = new Map(results.map((r) => [r.questionId, r]));
  const review = order
    .map((id) => byId.get(id))
    .filter((r): r is NonNullable<typeof r> => r !== undefined)
    .map((r): ReviewItem => ({ questionId: r.questionId, correct: r.is_correct === 1, points: r.points_awarded, maxPoints: r.maxPoints, response: JSON.parse(r.response_json), answer: JSON.parse(r.answer_json), explanation: r.explanation }));
  return { score: attempt.score ?? 0, maxScore: attempt.max_score ?? 0, percent: attempt.percent ?? 0, passed: attempt.passed === 1, review };
}
