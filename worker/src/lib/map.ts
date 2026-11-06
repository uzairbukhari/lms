import { gameForWeek, lessonQuizPoints, weekStars, type GameId, type GameLevel } from "@lms/schema";
import { assignedCourseIds } from "./exams";
import { GRAND_BONUS_POINTS } from "./grand";
import { visibleLessonsFor, type Visibility } from "./visibility";

// The semester map (docs/SEMESTER_MAP.md): 12 weekly checkpoints plus exam week, reached by finishing every lesson
// of the week. Points are worked out here from quiz attempts and game plays; the browser never sends points.

const marks = (n: number) => Array.from({ length: n }, () => "?").join(",");
export const TEACHING_WEEKS = 12;

export type CheckpointState = "locked" | "open" | "reached";

export type Checkpoint = {
  week: number;
  /** locked = not released yet (future); open = released but lessons still to finish; reached = every lesson done. */
  state: CheckpointState;
  isCurrentWeek: boolean;
  lessons: { total: number; done: number };
  stars: 0 | 1 | 2 | 3;
  /** Points waiting in this week's chest (from quizzes). Banked once the game has been played. */
  quizPoints: number;
  chestOpened: boolean;
  bestBonus: number;
  plays: number;
  game: GameId;
  level: GameLevel;
};

export type MapData = {
  semester: number;
  semesters: number[];
  now: Visibility["now"];
  checkpoints: Checkpoint[];
  exam: { reached: boolean; isNow: boolean };
  points: { total: number; waiting: number };
};

type WeekLesson = { lessonId: string; semester: number; week: number };

/** Every published lesson the child is assigned, with its slot, whether or not it has been released yet. */
async function assignedSlots(db: D1Database, userId: string): Promise<WeekLesson[]> {
  const classIds = (
    await db.prepare("SELECT c.id FROM class_members m JOIN classes c ON c.id = m.class_id WHERE m.user_id = ? AND c.is_active = 1").bind(userId).all<{ id: string }>()
  ).results.map((r) => r.id);
  const courses = await assignedCourseIds(db, userId, classIds);
  if (courses.length === 0) return [];
  const { results } = await db
    .prepare(
      `SELECT DISTINCT cl.lesson_id AS lessonId, cl.semester, cl.week
         FROM course_lessons cl
         JOIN lessons l ON l.id = cl.lesson_id AND l.status = 'published'
         JOIN courses co ON co.id = cl.course_id AND co.status = 'published'
        WHERE cl.course_id IN (${marks(courses.length)}) AND cl.semester IS NOT NULL AND cl.week BETWEEN 1 AND ${TEACHING_WEEKS}`,
    )
    .bind(...courses)
    .all<WeekLesson>();
  // A lesson in two courses at different slots keeps its first slot only.
  const seen = new Set<string>();
  return results.filter((r) => (seen.has(r.lessonId) ? false : (seen.add(r.lessonId), true)));
}

/** Semesters the child may look at: the current one and every earlier one (never a later semester). */
function semestersFor(vis: Visibility): number[] {
  const visibleSem = vis.lessons.filter((l) => l.semester !== null && l.phase !== "open").map((l) => l.semester as number);
  const top = Math.max(vis.now?.semester ?? 1, ...visibleSem, 1);
  return Array.from({ length: Math.min(4, top) }, (_, i) => i + 1);
}

/** Bank totals across every semester: chests opened (quiz points) plus best game bonus per checkpoint. */
async function allTotals(db: D1Database, userId: string, vis: Visibility, slots: WeekLesson[]) {
  let total = 0;
  let waiting = 0;
  for (const s of semestersFor(vis)) {
    const cps = await checkpointsFor(db, userId, vis, slots, s);
    for (const cp of cps) {
      if (cp.chestOpened) total += cp.quizPoints + cp.bestBonus;
      else if (cp.state === "reached") waiting += cp.quizPoints;
    }
  }
  // A few extra points for finishing the day's flashcards and the Boost round.
  const cards = await db.prepare("SELECT COALESCE(SUM(points), 0) AS n FROM card_days WHERE user_id = ?").bind(userId).first<{ n: number }>();
  total += cards?.n ?? 0;
  // 50 bonus points once for each course's grand quiz the child has passed.
  const grand = await db
    .prepare("SELECT COUNT(DISTINCT scope_key) AS n FROM quiz_attempts WHERE user_id = ? AND status = 'submitted' AND passed = 1 AND scope_key LIKE 'grand:%'")
    .bind(userId)
    .first<{ n: number }>();
  total += (grand?.n ?? 0) * GRAND_BONUS_POINTS;
  return { total, waiting };
}

async function checkpointsFor(db: D1Database, userId: string, vis: Visibility, slots: WeekLesson[], semester: number): Promise<Checkpoint[]> {
  const inSem = slots.filter((s) => s.semester === semester);
  const ids = inSem.map((s) => s.lessonId);
  const visible = new Map(vis.lessons.map((l) => [l.lessonId, l]));

  const [progress, attempts, plays] = await Promise.all([
    ids.length
      ? db.prepare(`SELECT lesson_id FROM lesson_progress WHERE user_id = ? AND status = 'completed' AND lesson_id IN (${marks(ids.length)})`).bind(userId, ...ids).all<{ lesson_id: string }>()
      : Promise.resolve({ results: [] as { lesson_id: string }[] }),
    ids.length
      ? db
          .prepare(
            `SELECT lesson_id, MAX(CASE WHEN mode = 'graded' THEN percent END) AS graded, MAX(CASE WHEN mode = 'practice' THEN percent END) AS practice
               FROM quiz_attempts WHERE user_id = ? AND status = 'submitted' AND lesson_id IN (${marks(ids.length)}) GROUP BY lesson_id`,
          )
          .bind(userId, ...ids)
          .all<{ lesson_id: string; graded: number | null; practice: number | null }>()
      : Promise.resolve({ results: [] as { lesson_id: string; graded: number | null; practice: number | null }[] }),
    db
      .prepare("SELECT week, COUNT(*) AS plays, MAX(bonus) AS best FROM game_plays WHERE user_id = ? AND semester = ? GROUP BY week")
      .bind(userId, semester)
      .all<{ week: number; plays: number; best: number }>(),
  ]);
  const completed = new Set(progress.results.map((r) => r.lesson_id));
  const now = vis.now;
  const slotPast = (week: number) => (now ? semester < now.semester || (semester === now.semester && week <= now.week) : semester < Math.max(1, ...vis.lessons.map((l) => l.semester ?? 0)));

  const out: Checkpoint[] = [];
  for (let week = 1; week <= TEACHING_WEEKS; week++) {
    const lessons = inSem.filter((s) => s.week === week);
    // Released = the child can open at least one of the week's lessons (or, for an empty week, its date has come).
    const released = lessons.length > 0 ? lessons.some((l) => visible.has(l.lessonId)) : slotPast(week);
    const done = lessons.filter((l) => completed.has(l.lessonId)).length;
    const state: CheckpointState = !released ? "locked" : done === lessons.length ? "reached" : "open";
    const scores = lessons.map((l) => attempts.results.find((a) => a.lesson_id === l.lessonId)).filter((a) => a !== undefined);
    const best = scores.map((a) => Math.max(a.graded ?? -1, a.practice ?? -1)).filter((p) => p >= 0);
    const play = plays.results.find((p) => p.week === week);
    const { game, level } = gameForWeek(week);
    out.push({
      week,
      state,
      isCurrentWeek: !!now && !now.exam && now.semester === semester && now.week === week,
      // Locked weeks show nothing but a padlock, so hidden weeks are never described.
      lessons: state === "locked" ? { total: 0, done: 0 } : { total: lessons.length, done },
      stars: state === "locked" ? 0 : weekStars(best),
      quizPoints: state === "locked" ? 0 : scores.reduce((sum, a) => sum + lessonQuizPoints(a.graded, a.practice), 0),
      chestOpened: !!play && state === "reached",
      bestBonus: state === "reached" ? (play?.best ?? 0) : 0,
      plays: play?.plays ?? 0,
      game,
      level,
    });
  }
  return out;
}

export async function mapFor(db: D1Database, userId: string, today: string, semester?: number): Promise<MapData> {
  const vis = await visibleLessonsFor(db, userId, today);
  const slots = await assignedSlots(db, userId);
  const semesters = semestersFor(vis);
  const sem = semester && semesters.includes(semester) ? semester : (semesters[semesters.length - 1] ?? 1);
  const checkpoints = await checkpointsFor(db, userId, vis, slots, sem);
  const now = vis.now;
  const examTime = !!now && (now.semester > sem || (now.semester === sem && now.exam));
  return {
    semester: sem,
    semesters,
    now,
    checkpoints,
    exam: { reached: examTime && checkpoints.every((c) => c.state === "reached"), isNow: !!now && now.exam && now.semester === sem },
    points: await allTotals(db, userId, vis, slots),
  };
}

/** For the play endpoint: is this checkpoint reached by the child today? */
export async function checkpointReached(db: D1Database, userId: string, today: string, semester: number, week: number): Promise<boolean> {
  const data = await mapFor(db, userId, today, semester);
  return data.semester === semester && data.checkpoints.some((c) => c.week === week && c.state === "reached");
}

export async function pointTotals(db: D1Database, userId: string, today: string) {
  const vis = await visibleLessonsFor(db, userId, today);
  return allTotals(db, userId, vis, await assignedSlots(db, userId));
}

/**
 * Every released week of the child in time order, across all semesters, for the week streak and stickers.
 * A week counts as done when every lesson of it is finished (an empty rest-stop week counts too).
 */
export async function weekTimeline(db: D1Database, userId: string, today: string) {
  const vis = await visibleLessonsFor(db, userId, today);
  const slots = await assignedSlots(db, userId);
  const weeks: { semester: number; week: number; done: boolean; current: boolean; lessons: number }[] = [];
  const reachedBySemester = new Map<number, number>();
  for (const semester of semestersFor(vis)) {
    const cps = await checkpointsFor(db, userId, vis, slots, semester);
    reachedBySemester.set(semester, cps.filter((c) => c.state === "reached").length);
    for (const cp of cps) {
      if (cp.state === "locked") continue;
      weeks.push({ semester, week: cp.week, done: cp.state === "reached", current: cp.isCurrentWeek, lessons: cp.lessons.total });
    }
  }
  return { weeks, reachedBySemester };
}
