import { IS_GRAND, grandScopeKey, type GrandInfo } from "./grand";
import { loadRules, MASTERY, ruleStatuses } from "./pathrules";
import type { PathStatus } from "./visibility";

export type PathTopic = { lessonId: string; title: string; position: number; status: PathStatus; bestPercent: number | null; attempts: number; partsDone: number; partsTotal: number };
export type SubjectPath = { courseId: string; subject: string; topics: PathTopic[]; grand: GrandInfo | null };

const marks = (n: number) => Array.from({ length: n }, () => "?").join(",");

/**
 * Every subject path a child is on (classes with unlock_mode "path"), with locked topics included so the star map can
 * show them with a padlock. Locked topics carry only a title; the lesson itself stays hidden by visibleLessonsFor.
 */
export async function pathsFor(db: D1Database, userId: string, today: string = new Date().toISOString().slice(0, 10)): Promise<SubjectPath[]> {
  const classIds = (
    await db
      .prepare("SELECT c.id FROM class_members m JOIN classes c ON c.id = m.class_id WHERE m.user_id = ? AND c.is_active = 1 AND (c.unlock_mode = 'path' OR c.structure_v3 = 1)")
      .bind(userId)
      .all<{ id: string }>()
  ).results.map((r) => r.id);
  if (classIds.length === 0) return [];

  const rows = (
    await db
      .prepare(
        `SELECT DISTINCT cl.course_id AS courseId, cl.lesson_id AS lessonId, cl.position, l.title, l.subject_id AS subject, COALESCE(json_array_length(l.source_json, '$.sub_lessons'), 0) AS partsTotal
           FROM course_assignments a
           JOIN course_lessons cl ON cl.course_id = a.course_id
           JOIN lessons l ON l.id = cl.lesson_id AND l.status = 'published'
           JOIN courses co ON co.id = a.course_id AND co.status = 'published'
          WHERE a.class_id IN (${marks(classIds.length)})`,
      )
      .bind(...classIds)
      .all<{ courseId: string; lessonId: string; position: number; title: string; subject: string; partsTotal: number }>()
  ).results;
  if (rows.length === 0) return [];

  const ids = rows.map((r) => r.lessonId);
  const [scores, openRows, partRows] = await Promise.all([
    db
      .prepare(`SELECT lesson_id, MAX(percent) AS best, MAX(passed) AS passed, COUNT(*) AS attempts FROM quiz_attempts WHERE user_id = ? AND status = 'submitted' AND lesson_id IN (${marks(ids.length)}) GROUP BY lesson_id`)
      .bind(userId, ...ids)
      .all<{ lesson_id: string; best: number | null; passed: number | null; attempts: number }>(),
    db
      .prepare(`SELECT DISTINCT lesson_id FROM path_unlocks WHERE lesson_id IN (${marks(ids.length)}) AND (user_id = ? OR class_id IN (${marks(classIds.length)}))`)
      .bind(...ids, userId, ...classIds)
      .all<{ lesson_id: string }>(),
    db
      .prepare(`SELECT lesson_id, COUNT(*) AS n FROM sub_lesson_progress WHERE user_id = ? AND viewed = 1 AND lesson_id IN (${marks(ids.length)}) GROUP BY lesson_id`)
      .bind(userId, ...ids)
      .all<{ lesson_id: string; n: number }>(),
  ]);
  const passed = new Set(scores.results.filter((s) => s.passed === 1).map((s) => s.lesson_id));
  const opened = new Set(openRows.results.map((r) => r.lesson_id));

  // Each course's current grand quiz, with how the child has done on any version of it.
  const courseIds = [...new Set(rows.map((r) => r.courseId))];
  const grandQuizzes = (
    await db
      .prepare(
        `SELECT z.id, z.course_id AS courseId, (SELECT COUNT(*) FROM questions q WHERE q.quiz_id = z.id) AS questionCount
           FROM quizzes z WHERE ${IS_GRAND} AND z.is_current = 1 AND z.course_id IN (${marks(courseIds.length)})`,
      )
      .bind(...courseIds)
      .all<{ id: string; courseId: string; questionCount: number }>()
  ).results;
  const grandTries = grandQuizzes.length
    ? (
        await db
          .prepare(`SELECT scope_key, MAX(percent) AS best, MAX(passed) AS passed, COUNT(*) AS attempts FROM quiz_attempts WHERE user_id = ? AND status = 'submitted' AND scope_key IN (${marks(courseIds.length)}) GROUP BY scope_key`)
          .bind(userId, ...courseIds.map(grandScopeKey))
          .all<{ scope_key: string; best: number | null; passed: number | null; attempts: number }>()
      ).results
    : [];
  const grandFor = (courseId: string): GrandInfo | null => {
    const quiz = grandQuizzes.find((g) => g.courseId === courseId);
    if (!quiz) return null;
    const tries = grandTries.find((t) => t.scope_key === grandScopeKey(courseId));
    const ready = rows.filter((r) => r.courseId === courseId).every((r) => passed.has(r.lessonId));
    return { quizId: quiz.id, status: tries?.passed === 1 ? "passed" : ready ? "ready" : "locked", bestPercent: tries?.best ?? null, attempts: tries?.attempts ?? 0, questionCount: quiz.questionCount };
  };

  const rules = await loadRules(db, classIds);
  const groups = new Map<string, typeof rows>();
  for (const r of rows) groups.set(`${r.courseId}:${r.subject}`, [...(groups.get(`${r.courseId}:${r.subject}`) ?? []), r]);
  return [...groups.values()].map((group) => {
    group.sort((a, b) => a.position - b.position);
    const statuses = ruleStatuses(group.map((g) => g.lessonId), passed, opened, rules.get(group[0]!.courseId) ?? MASTERY, today);
    return {
      courseId: group[0]!.courseId,
      grand: grandFor(group[0]!.courseId),
      subject: group[0]!.subject,
      topics: group.map((g, i): PathTopic => {
        const s = scores.results.find((x) => x.lesson_id === g.lessonId);
        return { lessonId: g.lessonId, title: g.title, position: g.position, status: statuses[i]!, bestPercent: s?.best ?? null, attempts: s?.attempts ?? 0, partsTotal: g.partsTotal, partsDone: Math.min(g.partsTotal, partRows.results.find((x) => x.lesson_id === g.lessonId)?.n ?? 0) };
      }),
    };
  });
}
