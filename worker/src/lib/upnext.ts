// "Up next" on the student home (docs/ADMIN_V3_PLAN.md section 7.1):
//  1. carry on: a topic the child left part-way through (most recently touched, any subject);
//  2. otherwise the next open topic in the subject used least in the last 7 days (ties: fewer topics passed, then list order).
import type { SubjectPath } from "./path";

export type Activity = {
  /** lessonId -> ISO-ish timestamp of the child's last part or quiz activity on it. */
  lastByLesson: Record<string, string>;
  /** subject -> number of activity rows in the last 7 days. */
  recentBySubject: Record<string, number>;
};
export type UpNext = { kind: "carry" | "balance"; courseId: string; subject: string; lessonId: string } | null;

const isOpen = (s: string) => s === "current" || s === "early";

export function chooseUpNext(paths: SubjectPath[], act: Activity): UpNext {
  let carry: { p: SubjectPath; lessonId: string; at: string } | null = null;
  for (const p of paths) {
    for (const t of p.topics) {
      if (!isOpen(t.status) || t.partsDone <= 0) continue;
      const at = act.lastByLesson[t.lessonId] ?? "";
      if (!carry || at > carry.at) carry = { p, lessonId: t.lessonId, at };
    }
  }
  if (carry) return { kind: "carry", courseId: carry.p.courseId, subject: carry.p.subject, lessonId: carry.lessonId };

  const candidates = paths
    .map((p, order) => ({ p, order, topic: p.topics.find((t) => isOpen(t.status)), done: p.topics.filter((t) => t.status === "done").length }))
    .filter((c): c is typeof c & { topic: NonNullable<typeof c.topic> } => !!c.topic);
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => (act.recentBySubject[a.p.subject] ?? 0) - (act.recentBySubject[b.p.subject] ?? 0) || a.done - b.done || a.order - b.order);
  const best = candidates[0]!;
  return { kind: "balance", courseId: best.p.courseId, subject: best.p.subject, lessonId: best.topic.lessonId };
}

const marks = (n: number) => Array.from({ length: n }, () => "?").join(",");

/** Reads the child's recent activity from sub-lesson progress and submitted quiz attempts. */
export async function activityFor(db: D1Database, userId: string, paths: SubjectPath[]): Promise<Activity> {
  const ids = paths.flatMap((p) => p.topics.map((t) => t.lessonId));
  if (ids.length === 0) return { lastByLesson: {}, recentBySubject: {} };
  const subjectOf = new Map(paths.flatMap((p) => p.topics.map((t) => [t.lessonId, p.subject] as const)));
  const [prog, att] = await Promise.all([
    db.prepare(`SELECT lesson_id AS id, MAX(updated_at) AS last, SUM(CASE WHEN updated_at >= datetime('now','-7 days') THEN 1 ELSE 0 END) AS recent FROM sub_lesson_progress WHERE user_id = ? AND lesson_id IN (${marks(ids.length)}) GROUP BY lesson_id`).bind(userId, ...ids).all<{ id: string; last: string | null; recent: number }>(),
    db.prepare(`SELECT lesson_id AS id, MAX(submitted_at) AS last, SUM(CASE WHEN submitted_at >= datetime('now','-7 days') THEN 1 ELSE 0 END) AS recent FROM quiz_attempts WHERE user_id = ? AND status = 'submitted' AND lesson_id IN (${marks(ids.length)}) GROUP BY lesson_id`).bind(userId, ...ids).all<{ id: string; last: string | null; recent: number }>(),
  ]);
  const lastByLesson: Record<string, string> = {};
  const recentBySubject: Record<string, number> = {};
  for (const r of [...prog.results, ...att.results]) {
    if (r.last && r.last > (lastByLesson[r.id] ?? "")) lastByLesson[r.id] = r.last;
    const s = subjectOf.get(r.id);
    if (s) recentBySubject[s] = (recentBySubject[s] ?? 0) + (r.recent ?? 0);
  }
  return { lastByLesson, recentBySubject };
}
