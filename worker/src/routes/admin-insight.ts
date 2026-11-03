import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../env";
import { fail, parseBody } from "../lib/http";
import { lessonInsights } from "../lib/insights";
import { aiAlertThreshold, AI_ALERT_KEY, setSetting } from "../lib/settings";
import { turnstileEnabled } from "../lib/turnstile";
import { FREE_NEURONS_PER_DAY } from "../lib/usage";

/** Question insights, the AI spend alert setting and the sign-in history. Mounted under /api/admin. */
export const adminInsightRoutes = new Hono<AppEnv>();

adminInsightRoutes.get("/insights/lessons/:id", async (c) => {
  const id = c.req.param("id");
  const lesson = await c.env.DB.prepare("SELECT id, title, subject_id AS subject FROM lessons WHERE id = ?").bind(id).first<{ id: string; title: string; subject: string }>();
  if (!lesson) return fail(c, 404, "not_found");
  const includePractice = c.req.query("includePractice") === "1";
  const questions = await lessonInsights(c.env.DB, id, includePractice);
  return c.json({ lesson, includePractice, questions });
});

/** Every lesson that has at least one question, with how many questions are flagged, for the picker. */
adminInsightRoutes.get("/insights", async (c) => {
  const { results } = await c.env.DB
    .prepare(
      `SELECT l.id, l.title, l.subject_id AS subject,
              (SELECT COUNT(DISTINCT a.user_id) FROM quiz_attempts a WHERE a.lesson_id = l.id AND a.status = 'submitted' AND a.mode = 'graded' AND a.user_id NOT IN (SELECT id FROM users WHERE is_test = 1)) AS children
         FROM lessons l WHERE EXISTS (SELECT 1 FROM quizzes z WHERE z.lesson_id = l.id AND z.is_current = 1) ORDER BY l.subject_id, l.sort_order, l.title`,
    )
    .all();
  return c.json({ lessons: results });
});

adminInsightRoutes.get("/settings/ai-alert", async (c) => {
  const neurons = await aiAlertThreshold(c.env.DB);
  const today = new Date().toISOString().slice(0, 10);
  const used = await c.env.DB.prepare("SELECT COALESCE(SUM(neurons), 0) AS n FROM ai_usage WHERE date(created_at) = ? AND (user_id IS NULL OR user_id NOT IN (SELECT id FROM users WHERE is_test = 1))").bind(today).first<{ n: number }>();
  return c.json({ neurons, freeNeuronsPerDay: FREE_NEURONS_PER_DAY, todayNeurons: Math.round(used?.n ?? 0) });
});

adminInsightRoutes.put("/settings/ai-alert", async (c) => {
  const { neurons } = await parseBody(c, z.object({ neurons: z.number().int().min(0).max(1_000_000) }));
  await setSetting(c.env.DB, AI_ALERT_KEY, String(neurons));
  return c.json({ neurons });
});

adminInsightRoutes.get("/students/:id/logins", async (c) => {
  const id = c.req.param("id");
  const { results } = await c.env.DB
    .prepare("SELECT id, ok, country, device, created_at AS createdAt FROM login_events WHERE user_id = ? ORDER BY created_at DESC, id LIMIT 60")
    .bind(id)
    .all<{ id: string; ok: number; country: string | null; device: string | null; createdAt: string }>();
  const failed24h = (await c.env.DB.prepare("SELECT COUNT(*) AS n FROM login_events WHERE user_id = ? AND ok = 0 AND created_at >= datetime('now', '-1 day')").bind(id).first<{ n: number }>())?.n ?? 0;
  return c.json({ logins: results.map((r) => ({ ...r, ok: r.ok === 1 })), failed24h });
});

/** Whether the Turnstile check on the student login is set up (keys are Worker variables, see docs/DEPLOY.md). */
adminInsightRoutes.get("/settings/security", (c) => c.json({ turnstile: turnstileEnabled(c.env) }));
