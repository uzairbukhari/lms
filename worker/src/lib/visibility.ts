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
};

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
      .prepare("SELECT c.id, c.visibility_mode AS mode FROM class_members m JOIN classes c ON c.id = m.class_id WHERE m.user_id = ? AND c.is_active = 1")
      .bind(userId)
      .all<{ id: string; mode: string }>(),
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

  const candidates = (
    await db
      .prepare(
        `SELECT cl.course_id AS courseId, cl.lesson_id AS lessonId, cl.semester, cl.week, l.subject_id AS subject
           FROM course_lessons cl
           JOIN lessons l ON l.id = cl.lesson_id AND l.status = 'published'
           JOIN courses co ON co.id = cl.course_id AND co.status = 'published'
          WHERE cl.course_id IN (${marks(assigned.length)})`,
      )
      .bind(...assigned)
      .all<{ courseId: string; lessonId: string; semester: number | null; week: number | null; subject: string }>()
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

  for (const c of candidates) {
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
