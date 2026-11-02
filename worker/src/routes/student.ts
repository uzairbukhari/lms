import { buildSlides } from "@lms/schema";
import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../env";
import { fail, parseBody } from "../lib/http";
import { todayIn, visibleLessonsFor, type Phase, type VisibleLesson } from "../lib/visibility";
import { requireStudent } from "../middleware/auth";

/** What a signed-in child can see and do. Every lesson request goes through visibleLessonsFor. */
export const studentRoutes = new Hono<AppEnv>();
// Scoped paths (not "*") so unknown /api routes still fall through to the JSON 404.
for (const path of ["/home", "/lessons/:id", "/lessons/:id/progress"]) studentRoutes.use(path, requireStudent);

type LessonRow = {
  id: string; slug: string; title: string; subject: string; summary: string; minutes: number;
  unit: string | null; version: number; content_json: string; source_json: string;
};

type Card = {
  id: string; slug: string; title: string; subject: string; summary: string; minutes: number;
  semester: number | null; week: number | null; phase: Phase;
  /** How many slides the lesson deck has, so the home screen can show how far through the child is. */
  slideCount: number;
  progress: { status: "started" | "completed"; lastBlock: number } | null;
  quiz: { attempts: number; bestPercent: number | null; latestPercent: number | null } | null;
};

async function cardsFor(db: D1Database, userId: string, visible: VisibleLesson[]): Promise<Card[]> {
  if (visible.length === 0) return [];
  const ids = visible.map((v) => v.lessonId);
  const marks = ids.map(() => "?").join(",");
  const [lessons, progress, attempts] = await Promise.all([
    db.prepare(`SELECT id, slug, title, subject_id AS subject, summary, estimated_minutes AS minutes, content_json FROM lessons WHERE id IN (${marks})`).bind(...ids).all<{ id: string; slug: string; title: string; subject: string; summary: string; minutes: number; content_json: string }>(),
    db.prepare(`SELECT lesson_id, status, last_block FROM lesson_progress WHERE user_id = ? AND lesson_id IN (${marks})`).bind(userId, ...ids).all<{ lesson_id: string; status: "started" | "completed"; last_block: number }>(),
    db
      .prepare(
        `SELECT lesson_id, COUNT(*) AS attempts, MAX(percent) AS best,
                (SELECT x.percent FROM quiz_attempts x WHERE x.user_id = a.user_id AND x.lesson_id = a.lesson_id AND x.status = 'submitted'
                  ORDER BY x.submitted_at DESC, x.attempt_number DESC LIMIT 1) AS latest
           FROM quiz_attempts a WHERE a.user_id = ? AND a.status = 'submitted' AND a.lesson_id IN (${marks}) GROUP BY a.lesson_id`,
      )
      .bind(userId, ...ids)
      .all<{ lesson_id: string; attempts: number; best: number | null; latest: number | null }>(),
  ]);
  return visible
    .map((v): Card | null => {
      const l = lessons.results.find((x) => x.id === v.lessonId);
      if (!l) return null;
      const { content_json, ...lesson } = l;
      const p = progress.results.find((x) => x.lesson_id === v.lessonId);
      const a = attempts.results.find((x) => x.lesson_id === v.lessonId);
      return {
        ...lesson,
        slideCount: buildSlides({ title: "", summary: "", minutes: 0, objectives: [] }, JSON.parse(content_json)).length,
        semester: v.semester,
        week: v.week,
        phase: v.phase,
        progress: p ? { status: p.status, lastBlock: p.last_block } : null,
        quiz: a ? { attempts: a.attempts, bestPercent: a.best, latestPercent: a.latest } : { attempts: 0, bestPercent: null, latestPercent: null },
      };
    })
    .filter((c): c is Card => c !== null);
}

/** The home screen: this week's lessons, anything opened early, and the read-only look-back list. Never future weeks. */
studentRoutes.get("/home", async (c) => {
  const user = c.get("user");
  const today = todayIn(c.env.TIMEZONE);
  const vis = await visibleLessonsFor(c.env.DB, user.id, today);
  const cards = await cardsFor(c.env.DB, user.id, vis.lessons);
  const sortOrder = (a: Card, b: Card) => (b.semester ?? 0) - (a.semester ?? 0) || (b.week ?? 0) - (a.week ?? 0) || a.title.localeCompare(b.title);
  return c.json({
    today: vis.today,
    now: vis.now,
    thisWeek: cards.filter((x) => x.phase === "current").sort((a, b) => a.subject.localeCompare(b.subject)),
    early: cards.filter((x) => x.phase === "early"),
    open: cards.filter((x) => x.phase === "open").sort(sortOrder),
    lookBack: cards.filter((x) => x.phase === "past").sort(sortOrder),
  });
});

/** Everything the player needs for one lesson, if this child is allowed to open it. Quiz answers are never included. */
studentRoutes.get("/lessons/:id", async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");
  const vis = await visibleLessonsFor(c.env.DB, user.id, todayIn(c.env.TIMEZONE));
  const v = vis.lessons.find((l) => l.lessonId === id);
  if (!v) return fail(c, 404, "not_found"); // 404, not 403: a hidden lesson should not even be confirmed to exist
  const row = await c.env.DB
    .prepare("SELECT id, slug, title, subject_id AS subject, summary, estimated_minutes AS minutes, unit, current_version AS version, content_json, source_json FROM lessons WHERE id = ?")
    .bind(id)
    .first<LessonRow>();
  if (!row) return fail(c, 404, "not_found");
  const file = JSON.parse(row.source_json) as { lesson: { learning_objectives: string[] }; quiz: { questions: unknown[]; pass_percent?: number } };
  const progress = await c.env.DB
    .prepare("SELECT status, last_block AS lastBlock FROM lesson_progress WHERE user_id = ? AND lesson_id = ?")
    .bind(user.id, id)
    .first<{ status: string; lastBlock: number }>();
  return c.json({
    lesson: {
      id: row.id, slug: row.slug, title: row.title, subject: row.subject, summary: row.summary, minutes: row.minutes,
      unit: row.unit, objectives: file.lesson.learning_objectives, semester: v.semester, week: v.week, phase: v.phase,
    },
    blocks: JSON.parse(row.content_json),
    quiz: { questionCount: file.quiz.questions.length, passPercent: file.quiz.pass_percent ?? 70 },
    progress,
    readOnly: v.phase === "past",
  });
});

/**
 * Remember where the child is in a lesson. A lesson that is already completed is never changed by revisiting it,
 * so looking back at old lessons cannot alter recorded progress.
 */
studentRoutes.put("/lessons/:id/progress", async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");
  const vis = await visibleLessonsFor(c.env.DB, user.id, todayIn(c.env.TIMEZONE));
  if (!vis.lessons.some((l) => l.lessonId === id)) return fail(c, 404, "not_found");
  const body = await parseBody(c, z.object({ lastBlock: z.number().int().min(0).max(200), completed: z.boolean().optional(), addSeconds: z.number().int().min(0).max(1800).optional() }));
  const existing = await c.env.DB.prepare("SELECT status FROM lesson_progress WHERE user_id = ? AND lesson_id = ?").bind(user.id, id).first<{ status: string }>();
  if (existing?.status === "completed") return c.json({ ok: true, unchanged: true });
  if (!existing) {
    await c.env.DB
      .prepare("INSERT INTO lesson_progress (user_id, lesson_id, status, last_block, completed_at, time_spent_sec) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(user.id, id, body.completed ? "completed" : "started", body.lastBlock, body.completed ? new Date().toISOString() : null, body.addSeconds ?? 0)
      .run();
  } else {
    await c.env.DB
      .prepare("UPDATE lesson_progress SET status = ?, last_block = ?, completed_at = ?, time_spent_sec = time_spent_sec + ? WHERE user_id = ? AND lesson_id = ?")
      .bind(body.completed ? "completed" : "started", body.lastBlock, body.completed ? new Date().toISOString() : null, body.addSeconds ?? 0, user.id, id)
      .run();
  }
  return c.json({ ok: true });
});
