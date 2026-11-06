// Grand quiz: one end-of-course quiz per course, built from the course's published topic lessons.
// It is a quizzes row with kind = 'exam', semester NULL and blueprint_json.scope = 'course' (no migration needed).

const marks = (n: number) => Array.from({ length: n }, () => "?").join(",");

/** Extra points banked once for each grand quiz a child has passed. */
export const GRAND_BONUS_POINTS = 50;
/** A grand quiz needs at least this many published topic lessons in the course. */
export const GRAND_MIN_TOPICS = 12;
export const GRAND_PASS_PERCENT = 70;

/** Attempts at any version of a course's grand quiz share this scope key. */
export const grandScopeKey = (courseId: string) => `grand:${courseId}`;

/** True when an exam's blueprint says it is a whole-course (grand) quiz. */
export function blueprintIsCourse(json: string | null): boolean {
  try { return (JSON.parse(json ?? "null") as { scope?: string } | null)?.scope === "course"; } catch { return false; }
}

/** SQL fragment that matches current-or-old grand quizzes (alias z). */
export const IS_GRAND = "z.kind = 'exam' AND z.semester IS NULL AND json_extract(z.blueprint_json, '$.scope') = 'course'";

/** Published topic lessons of a course, in path order. */
export async function publishedTopicIds(db: D1Database, courseId: string): Promise<string[]> {
  const { results } = await db
    .prepare(
      `SELECT cl.lesson_id AS id FROM course_lessons cl
         JOIN lessons l ON l.id = cl.lesson_id AND l.status = 'published'
        WHERE cl.course_id = ? GROUP BY cl.lesson_id ORDER BY MIN(cl.position)`,
    )
    .bind(courseId)
    .all<{ id: string }>();
  return results.map((r) => r.id);
}

/** Which of these lessons the child has passed (the same rule as the path: any submitted attempt that passed). */
export async function passedLessonIds(db: D1Database, userId: string, lessonIds: string[]): Promise<Set<string>> {
  if (lessonIds.length === 0) return new Set();
  const { results } = await db
    .prepare(`SELECT DISTINCT lesson_id FROM quiz_attempts WHERE user_id = ? AND status = 'submitted' AND passed = 1 AND lesson_id IN (${marks(lessonIds.length)})`)
    .bind(userId, ...lessonIds)
    .all<{ lesson_id: string }>();
  return new Set(results.map((r) => r.lesson_id));
}

/** True when the course has topics and the child has passed every one of them. */
export async function allTopicsPassed(db: D1Database, userId: string, courseId: string): Promise<boolean> {
  const topics = await publishedTopicIds(db, courseId);
  if (topics.length === 0) return false;
  const passed = await passedLessonIds(db, userId, topics);
  return topics.every((t) => passed.has(t));
}

export type SourceQuestion = {
  id: string; ref: string; position: number; type: string; prompt: string; media_json: string | null; options_json: string | null; answer_json: string;
  hint: string | null; explanation: string | null; points: number; skill_tag: string | null; sub_lesson: string | null; depth: string | null; variant_of: string | null;
};

const DEPTH_ORDER = ["recall", "apply", "reason"];

/**
 * Choose `n` main questions from one topic's quiz: first a recall, then an apply, then a reason question where the topic has them
 * (any question otherwise), preferring a skill the topic has not already used. Order is by position, so the result is stable.
 */
export function pickTopicMains(mains: SourceQuestion[], n: number): SourceQuestion[] {
  const chosen: SourceQuestion[] = [];
  const tags = new Set<string>();
  const fresh = (q: SourceQuestion) => !q.skill_tag || !tags.has(q.skill_tag);
  for (let i = 0; i < n; i++) {
    const left = mains.filter((q) => !chosen.includes(q));
    if (left.length === 0) break;
    const depth = i < DEPTH_ORDER.length ? DEPTH_ORDER[i] : undefined;
    const sameDepth = depth ? left.filter((q) => q.depth === depth) : [];
    const next = sameDepth.find(fresh) ?? sameDepth[0] ?? left.find(fresh) ?? left[0]!;
    chosen.push(next);
    if (next.skill_tag) tags.add(next.skill_tag);
  }
  return chosen;
}

export type GrandStatus = "locked" | "ready" | "passed";
export type GrandInfo = { quizId: string; status: GrandStatus; bestPercent: number | null; attempts: number; questionCount: number };
