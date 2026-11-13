import { loadRules, MASTERY, ruleStatuses } from "./pathrules";
import { currentSlot, isReleased, type Now, type TermRow } from "./terms";

/** Today's date (YYYY-MM-DD) in the family's timezone, so a school week starts at local midnight, not UTC midnight. */
export function todayIn(timeZone = "UTC", now: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  } catch {
    return now.toISOString().slice(0, 10);
  }
}

/**
 * The date a child's school week is worked out from. The parent's test student can pretend "today" is any school week
 * (users.preview_date); real children never have one, so for them this is just the real date.
 */
export async function effectiveToday(db: D1Database, userId: string, realToday: string): Promise<string> {
  const preview = await db.prepare("SELECT preview_date AS d FROM users WHERE id = ? AND is_test = 1").bind(userId).first<{ d: string | null }>();
  return preview?.d ?? realToday;
}

export type Phase = "current" | "early" | "past" | "open";

export type VisibleLesson = {
  lessonId: string;
  courseId: string;
  subject: string;
  semester: number | null;
  week: number | null;
  phase: Phase;
  /** True when the lesson is on a mastery path (class unlock_mode "path") rather than a school week. */
  path?: boolean;
};

export type PathStatus = "done" | "current" | "early" | "locked";

/**
 * The state of each lesson on one subject's path, in order. Pure so it is easy to test (docs/CURRICULUM_V2.md part 1):
 * - a lesson the child has passed is "done" (open to look back at and practise);
 * - the first lesson not yet passed is "current";
 * - a later lesson the parent opened early is "early" (it does not open the ones after it);
 * - everything else is "locked".
 */
export function pathStatuses(orderedLessonIds: string[], passed: Set<string>, opened: Set<string>): PathStatus[] {
  let currentSeen = false;
  return orderedLessonIds.map((id) => {
    if (passed.has(id)) return "done";
    if (!currentSeen) {
      currentSeen = true;
      return "current";
    }
    return opened.has(id) ? "early" : "locked";
  });
}

export type Visibility = { today: string; now: Now; lessons: VisibleLesson[] };

const RANK: Record<Phase, number> = { current: 0, early: 1, past: 2, open: 3 };
const marks = (n: number) => Array.from({ length: n }, () => "?").join(",");

/**
 * Which lessons a student may open today (docs/PLAN.md section 4d):
 * - only lessons in PUBLISHED courses assigned to the student or to one of their classes;
 * - this week's lessons and every earlier week's (read-only history); never a future week;
 * - plus any week the parent has opened early for the student or their class;
 * - a class set to "all_published" opens every published lesson of its assigned courses.
 * This is the single place that decides visibility; the API refuses anything not returned here.
 */
export async function visibleLessonsFor(db: D1Database, userId: string, realToday: string): Promise<Visibility> {
  const [today, classRows] = await Promise.all([
    effectiveToday(db, userId, realToday),
    db
      .prepare("SELECT c.id, c.visibility_mode AS mode, c.unlock_mode AS unlockMode, c.structure_v3 AS v3 FROM class_members m JOIN classes c ON c.id = m.class_id WHERE m.user_id = ? AND c.is_active = 1")
      .bind(userId)
      .all<{ id: string; mode: string; unlockMode: string; v3: number }>(),
  ]);
  const classes = classRows.results;
  const classIds = classes.map((c) => c.id);

  const assigned = (
    await db
      .prepare(`SELECT DISTINCT course_id FROM course_assignments WHERE user_id = ? ${classIds.length ? `OR class_id IN (${marks(classIds.length)})` : ""}`)
      .bind(userId, ...classIds)
      .all<{ course_id: string }>()
  ).results.map((r) => r.course_id);
  if (assigned.length === 0) return { today, now: null, lessons: [] };

  const termRows = classIds.length
    ? (
        await db
          .prepare(`SELECT class_id, number, name, start_date, end_date, teaching_weeks, exam_week FROM terms WHERE class_id IN (${marks(classIds.length)})`)
          .bind(...classIds)
          .all<TermRow & { class_id: string }>()
      ).results
    : [];
  const calendars = classIds.map((id) => termRows.filter((t) => t.class_id === id)).filter((t) => t.length > 0);

  // Courses assigned to a class on a mastery path are handled by the path rules below, not by the school calendar.
  const pathClassIds = classes.filter((c) => c.unlockMode === "path" || c.v3 === 1).map((c) => c.id);
  const pathCourseIds = new Set(
    pathClassIds.length
      ? (await db.prepare(`SELECT DISTINCT course_id FROM course_assignments WHERE class_id IN (${marks(pathClassIds.length)})`).bind(...pathClassIds).all<{ course_id: string }>()).results.map((r) => r.course_id)
      : [],
  );

  const candidates = (
    await db
      .prepare(
        `SELECT cl.course_id AS courseId, cl.lesson_id AS lessonId, cl.position, cl.semester, cl.week, l.subject_id AS subject
           FROM course_lessons cl
           JOIN lessons l ON l.id = cl.lesson_id AND l.status = 'published'
           JOIN courses co ON co.id = cl.course_id AND co.status = 'published'
          WHERE cl.course_id IN (${marks(assigned.length)})`,
      )
      .bind(...assigned)
      .all<{ courseId: string; lessonId: string; position: number; semester: number | null; week: number | null; subject: string }>()
  ).results;

  const unlocks = (
    await db
      .prepare(
        `SELECT course_id, semester, week FROM lesson_unlocks
          WHERE (user_id = ? ${classIds.length ? `OR class_id IN (${marks(classIds.length)})` : ""})
            AND (expires_at IS NULL OR expires_at >= ?)`,
      )
      .bind(userId, ...classIds, today)
      .all<{ course_id: string; semester: number; week: number }>()
  ).results;

  const nows = calendars.map((terms) => ({ terms, now: currentSlot(terms, today) }));
  const now = nows.find((n) => n.now)?.now ?? null;
  const openLibrary = classes.some((c) => c.mode === "all_published");

  const best = new Map<string, VisibleLesson>();
  const offer = (l: VisibleLesson) => {
    const cur = best.get(l.lessonId);
    if (!cur || RANK[l.phase] < RANK[cur.phase]) best.set(l.lessonId, l);
  };

  // Mastery paths: one ordered path per course and subject; a lesson is open when everything before it is passed.
  const pathLessons = candidates.filter((c) => pathCourseIds.has(c.courseId));
  if (pathLessons.length) {
    const ids = pathLessons.map((c) => c.lessonId);
    const [passedRows, openRows] = await Promise.all([
      db.prepare(`SELECT DISTINCT lesson_id FROM quiz_attempts WHERE user_id = ? AND status = 'submitted' AND passed = 1 AND lesson_id IN (${marks(ids.length)})`).bind(userId, ...ids).all<{ lesson_id: string }>(),
      db
        .prepare(`SELECT DISTINCT lesson_id FROM path_unlocks WHERE lesson_id IN (${marks(ids.length)}) AND (user_id = ? ${pathClassIds.length ? `OR class_id IN (${marks(pathClassIds.length)})` : ""})`)
        .bind(...ids, userId, ...pathClassIds)
        .all<{ lesson_id: string }>(),
    ]);
    const passed = new Set(passedRows.results.map((r) => r.lesson_id));
    const opened = new Set(openRows.results.map((r) => r.lesson_id));
    const rules = await loadRules(db, pathClassIds);
    const groups = new Map<string, typeof pathLessons>();
    for (const c of pathLessons) groups.set(`${c.courseId}:${c.subject}`, [...(groups.get(`${c.courseId}:${c.subject}`) ?? []), c]);
    for (const group of groups.values()) {
      group.sort((a, b) => a.position - b.position);
      const statuses = ruleStatuses(group.map((g) => g.lessonId), passed, opened, rules.get(group[0]!.courseId) ?? MASTERY, today);
      group.forEach((c, i) => {
        const st = statuses[i];
        if (st === "locked") return;
        offer({ lessonId: c.lessonId, courseId: c.courseId, subject: c.subject, semester: c.semester, week: c.week, phase: st === "done" ? "past" : st === "early" ? "early" : "current", path: true });
      });
    }
  }

  for (const c of candidates) {
    if (pathCourseIds.has(c.courseId)) continue;
    const base = { lessonId: c.lessonId, courseId: c.courseId, subject: c.subject, semester: c.semester, week: c.week };
    if (c.semester !== null && c.week !== null) {
      const slot = { semester: c.semester, week: c.week };
      for (const { terms, now: calNow } of nows) {
        if (calNow && calNow.semester === slot.semester && calNow.week === slot.week && !calNow.exam) offer({ ...base, phase: "current" });
        else if (isReleased(slot, calNow, terms, today)) offer({ ...base, phase: "past" });
      }
      if (unlocks.some((u) => u.course_id === c.courseId && u.semester === slot.semester && u.week === slot.week)) offer({ ...base, phase: "early" });
    }
    if (openLibrary) offer({ ...base, phase: "open" });
  }
  return { today, now, lessons: [...best.values()] };
}
