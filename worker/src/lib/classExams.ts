import { pickTopicMains, type SourceQuestion } from "./grand";

// A class exam is a quizzes row with kind = 'exam', class_id set, semester NULL and blueprint_json.scope = 'class'.
// blueprint.opensOn is the date children can start it; NULL means it is still a draft. Questions are frozen copies.

export const classExamScopeKey = (quizId: string) => `classexam:${quizId}`;
export const IS_CLASS_EXAM = "z.kind = 'exam' AND z.class_id IS NOT NULL AND json_extract(z.blueprint_json, '$.scope') = 'class'";

const marks = (n: number) => Array.from({ length: n }, () => "?").join(",");

export type Proposed = { questionId: string; lessonId: string; lessonTitle: string; type: string; prompt: string; skill: string | null; depth: string | null };

/** Lessons of the given courses (or just the chosen ones), published only, in course order. */
export async function lessonsForExam(db: D1Database, courseIds: string[], lessonIds?: string[]): Promise<{ id: string; title: string }[]> {
  if (!courseIds.length) return [];
  const { results } = await db
    .prepare(
      `SELECT l.id, l.title FROM course_lessons cl JOIN lessons l ON l.id = cl.lesson_id AND l.status = 'published'
        WHERE cl.course_id IN (${marks(courseIds.length)}) GROUP BY l.id ORDER BY MIN(cl.course_id), MIN(cl.position)`,
    )
    .bind(...courseIds)
    .all<{ id: string; title: string }>();
  return lessonIds?.length ? results.filter((r) => lessonIds.includes(r.id)) : results;
}

export async function mainQuestions(db: D1Database, lessonId: string): Promise<SourceQuestion[]> {
  const { results } = await db
    .prepare(
      `SELECT q.id, q.ref, q.position, q.type, q.prompt, q.media_json, q.options_json, q.answer_json, q.hint, q.explanation, q.points, q.skill_tag, q.sub_lesson, q.depth, q.variant_of
         FROM questions q JOIN quizzes z ON z.id = q.quiz_id AND z.is_current = 1 AND z.lesson_id = ? ORDER BY q.position`,
    )
    .bind(lessonId)
    .all<SourceQuestion>();
  return results;
}

/** Proposes questions: `perLesson` from each lesson, never repeating a question in `avoid` (used for "swap"). */
export async function proposeQuestions(db: D1Database, lessons: { id: string; title: string }[], perLesson: number, avoid: Set<string> = new Set()): Promise<Proposed[]> {
  const out: Proposed[] = [];
  for (const l of lessons) {
    const all = await mainQuestions(db, l.id);
    const mains = all.filter((q) => !q.variant_of && !avoid.has(q.id));
    for (const q of pickTopicMains(mains, perLesson)) out.push({ questionId: q.id, lessonId: l.id, lessonTitle: l.title, type: q.type, prompt: q.prompt, skill: q.skill_tag, depth: q.depth });
  }
  return out;
}

export type ClassExamSummary = { id: string; title: string; classId: string; questionCount: number; maxAttempts: number | null; passPercent: number; opensOn: string | null };

export async function classExamsFor(db: D1Database, classIds: string[]): Promise<ClassExamSummary[]> {
  if (!classIds.length) return [];
  const { results } = await db
    .prepare(
      `SELECT z.id, z.class_id AS classId, z.max_attempts AS maxAttempts, z.pass_percent AS passPercent,
              json_extract(z.blueprint_json, '$.title') AS title, json_extract(z.blueprint_json, '$.opensOn') AS opensOn,
              (SELECT COUNT(*) FROM questions q WHERE q.quiz_id = z.id) AS questionCount
         FROM quizzes z WHERE ${IS_CLASS_EXAM} AND z.is_current = 1 AND z.class_id IN (${marks(classIds.length)}) ORDER BY z.created_at DESC`,
    )
    .bind(...classIds)
    .all<ClassExamSummary>();
  return results;
}
