import { positionInTerm, type TermRow } from "./terms";
import { effectiveToday } from "./visibility";

const marks = (n: number) => Array.from({ length: n }, () => "?").join(",");

export type ExamSummary = {
  id: string; courseId: string; title: string; subject: string | null; semester: number;
  questionCount: number; maxAttempts: number | null; passPercent: number;
};

/** Current exams for the given courses. */
export async function examsForCourses(db: D1Database, courseIds: string[]): Promise<ExamSummary[]> {
  if (courseIds.length === 0) return [];
  const { results } = await db
    .prepare(
      `SELECT z.id, z.course_id AS courseId, co.title AS courseTitle, z.subject_id AS subject, z.semester,
              z.max_attempts AS maxAttempts, z.pass_percent AS passPercent,
              (SELECT COUNT(*) FROM questions q WHERE q.quiz_id = z.id) AS questionCount
         FROM quizzes z JOIN courses co ON co.id = z.course_id
        WHERE z.kind = 'exam' AND z.is_current = 1 AND z.course_id IN (${marks(courseIds.length)})
        ORDER BY z.semester, co.title`,
    )
    .bind(...courseIds)
    .all<Omit<ExamSummary, "title"> & { courseTitle: string }>();
  return results.map(({ courseTitle, ...r }) => ({ ...r, title: `${courseTitle}: Semester ${r.semester} exam` }));
}

/** Which semesters' exams a child can sit today: during that semester's exam week, after it, or when the parent opens it early. */
export async function openExamSemesters(db: D1Database, userId: string, realToday: string): Promise<Set<string>> {
  const today = await effectiveToday(db, userId, realToday);
  const classes = (await db.prepare("SELECT c.id FROM class_members m JOIN classes c ON c.id = m.class_id WHERE m.user_id = ? AND c.is_active = 1").bind(userId).all<{ id: string }>()).results.map((c) => c.id);
  const open = new Set<string>(); // "courseId:semester"
  if (classes.length) {
    const terms = (await db.prepare(`SELECT class_id, number, name, start_date, end_date, teaching_weeks, exam_week FROM terms WHERE class_id IN (${marks(classes.length)})`).bind(...classes).all<TermRow & { class_id: string }>()).results;
    const assigned = await assignedCourseIds(db, userId, classes);
    for (const t of terms) {
      const pos = positionInTerm(t, today);
      if (pos.state === "exam" || pos.state === "after") for (const c of assigned) open.add(`${c}:${t.number}`);
    }
  }
  // The exam week is week 13 in an early-open request.
  const unlocks = (
    await db
      .prepare(`SELECT course_id, semester FROM lesson_unlocks WHERE week = 13 AND (user_id = ? ${classes.length ? `OR class_id IN (${marks(classes.length)})` : ""}) AND (expires_at IS NULL OR expires_at >= ?)`)
      .bind(userId, ...classes, today)
      .all<{ course_id: string; semester: number }>()
  ).results;
  for (const u of unlocks) open.add(`${u.course_id}:${u.semester}`);
  return open;
}

export async function assignedCourseIds(db: D1Database, userId: string, classIds: string[]): Promise<string[]> {
  const { results } = await db
    .prepare(`SELECT DISTINCT course_id FROM course_assignments WHERE user_id = ? ${classIds.length ? `OR class_id IN (${marks(classIds.length)})` : ""}`)
    .bind(userId, ...classIds)
    .all<{ course_id: string }>();
  return results.map((r) => r.course_id);
}

/** How many exam questions come from each semester. Semester 4 is cumulative; others add a revision share from earlier semesters. */
export function examBlueprint(semester: number, total: number, revisionPercent: number): Map<number, number> {
  const plan = new Map<number, number>();
  if (semester === 4) {
    const base = Math.floor(total / 4);
    let rest = total - base * 4;
    for (const s of [4, 3, 2, 1]) {
      plan.set(s, base + (rest > 0 ? 1 : 0));
      rest--;
    }
    return plan;
  }
  const earlier = semester - 1;
  const revision = earlier > 0 ? Math.round((total * revisionPercent) / 100) : 0;
  plan.set(semester, total - revision);
  if (revision > 0) {
    const each = Math.floor(revision / earlier);
    let rest = revision - each * earlier;
    for (let s = earlier; s >= 1; s--) {
      plan.set(s, each + (rest > 0 ? 1 : 0));
      rest--;
    }
  }
  return plan;
}
