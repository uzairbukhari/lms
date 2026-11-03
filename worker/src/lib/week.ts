import { todayIn, visibleLessonsFor } from "./visibility";

export type WeekLesson = { lessonId: string; title: string; subject: string; status: "not_started" | "in_progress" | "done"; bestPercent: number | null };
export type WeekStudent = { id: string; name: string; classes: string[]; lessons: WeekLesson[]; done: number; total: number };
export type WeekStatus = {
  today: string;
  /** Days left until Sunday, when this week's lessons are due (0 on Sunday itself). */
  daysLeft: number;
  /** True from Saturday on: anything unfinished now needs a nudge. */
  dueSoon: boolean;
  students: WeekStudent[];
};

export const daysUntilSunday = (today: string) => (7 - new Date(`${today}T00:00:00Z`).getUTCDay()) % 7;

/** Per active child: this week's lessons (plus anything opened early) with how far each one is. */
export async function weekStatus(db: D1Database, timeZone: string | undefined): Promise<WeekStatus> {
  const today = todayIn(timeZone);
  const daysLeft = daysUntilSunday(today);
  const kids = await db
    .prepare("SELECT id, display_name AS name FROM users WHERE role = 'student' AND is_active = 1 ORDER BY display_name")
    .all<{ id: string; name: string }>();
  const students: WeekStudent[] = [];
  for (const k of kids.results) {
    const vis = await visibleLessonsFor(db, k.id, today);
    const mine = vis.lessons.filter((l) => l.phase === "current" || l.phase === "early");
    const ids = mine.map((l) => l.lessonId);
    const marks = ids.map(() => "?").join(",");
    const [titles, progress, best, classes] = await Promise.all([
      ids.length ? db.prepare(`SELECT id, title FROM lessons WHERE id IN (${marks})`).bind(...ids).all<{ id: string; title: string }>() : { results: [] as { id: string; title: string }[] },
      ids.length ? db.prepare(`SELECT lesson_id AS id, status FROM lesson_progress WHERE user_id = ? AND lesson_id IN (${marks})`).bind(k.id, ...ids).all<{ id: string; status: string }>() : { results: [] as { id: string; status: string }[] },
      ids.length
        ? db.prepare(`SELECT lesson_id AS id, MAX(percent) AS best FROM quiz_attempts WHERE user_id = ? AND status = 'submitted' AND lesson_id IN (${marks}) GROUP BY lesson_id`).bind(k.id, ...ids).all<{ id: string; best: number | null }>()
        : { results: [] as { id: string; best: number | null }[] },
      db.prepare("SELECT c.name FROM class_members m JOIN classes c ON c.id = m.class_id WHERE m.user_id = ? ORDER BY c.name").bind(k.id).all<{ name: string }>(),
    ]);
    const lessons = mine
      .map((l): WeekLesson => {
        const p = progress.results.find((x) => x.id === l.lessonId)?.status;
        return {
          lessonId: l.lessonId,
          title: titles.results.find((t) => t.id === l.lessonId)?.title ?? "Lesson",
          subject: l.subject,
          status: p === "completed" ? "done" : p ? "in_progress" : "not_started",
          bestPercent: best.results.find((b) => b.id === l.lessonId)?.best ?? null,
        };
      })
      .sort((a, b) => a.subject.localeCompare(b.subject));
    students.push({ id: k.id, name: k.name, classes: classes.results.map((c) => c.name), lessons, done: lessons.filter((l) => l.status === "done").length, total: lessons.length });
  }
  return { today, daysLeft, dueSoon: daysLeft <= 1, students };
}
