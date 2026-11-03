import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../env";
import { fail, parseBody } from "../lib/http";
import { blockedKey } from "./ai";

/** What the children were told by the AI helper, for the parent to review. Mounted under /api/admin. */
export const adminAiLogRoutes = new Hono<AppEnv>();

type Row = {
  id: string; kind: string; response: string; fromCache: number; flagged: number; createdAt: string; detail: string | null;
  childId: string | null; childName: string | null; prompt: string | null; lesson: string | null;
};

adminAiLogRoutes.get("/ai-log", async (c) => {
  const child = c.req.query("child");
  const kind = c.req.query("kind");
  const flaggedOnly = c.req.query("flagged") === "1";
  const before = c.req.query("before");
  const limit = Math.min(100, Math.max(5, Number(c.req.query("limit")) || 40));
  const where: string[] = [];
  const binds: (string | number)[] = [];
  if (child) { where.push("e.user_id = ?"); binds.push(child); }
  if (kind && ["hint", "explain", "define"].includes(kind)) { where.push("e.kind = ?"); binds.push(kind); }
  if (flaggedOnly) where.push("e.flagged = 1");
  if (before) { where.push("e.created_at < ?"); binds.push(before); }
  const { results } = await c.env.DB
    .prepare(
      `SELECT e.id, e.kind, e.response, e.from_cache AS fromCache, e.flagged, e.created_at AS createdAt, e.detail,
              u.id AS childId, u.display_name AS childName, q.prompt, l.title AS lesson
         FROM ai_events e LEFT JOIN users u ON u.id = e.user_id LEFT JOIN questions q ON q.id = e.question_id
              LEFT JOIN quizzes z ON z.id = q.quiz_id LEFT JOIN lessons l ON l.id = z.lesson_id
         ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY e.created_at DESC, e.id LIMIT ?`,
    )
    .bind(...binds, limit + 1)
    .all<Row>();
  const more = results.length > limit;
  const events = results.slice(0, limit).map((r) => ({ ...r, fromCache: r.fromCache === 1, flagged: r.flagged === 1 }));
  const children = await c.env.DB.prepare("SELECT id, display_name AS name FROM users WHERE role = 'student' ORDER BY display_name").all<{ id: string; name: string }>();
  const flaggedCount = (await c.env.DB.prepare("SELECT COUNT(*) AS n FROM ai_events WHERE flagged = 1").first<{ n: number }>())?.n ?? 0;
  return c.json({ events, next: more ? events[events.length - 1]?.createdAt ?? null : null, children: children.results, flaggedCount });
});

/**
 * Mark a reply as bad (or undo it). A bad reply is dropped from the cache and that question, or word, uses the stored
 * text from then on.
 */
adminAiLogRoutes.post("/ai-log/:id/flag", async (c) => {
  const { flagged } = await parseBody(c, z.object({ flagged: z.boolean() }));
  const id = c.req.param("id");
  const ev = await c.env.DB.prepare("SELECT cache_key AS cacheKey FROM ai_events WHERE id = ?").bind(id).first<{ cacheKey: string | null }>();
  if (!ev) return fail(c, 404, "not_found");
  await c.env.DB.prepare("UPDATE ai_events SET flagged = ? WHERE id = ?").bind(flagged ? 1 : 0, id).run();
  if (ev.cacheKey) {
    if (flagged) {
      await c.env.SESSIONS.delete(ev.cacheKey);
      await c.env.SESSIONS.put(blockedKey(ev.cacheKey), "1");
    } else {
      await c.env.SESSIONS.delete(blockedKey(ev.cacheKey));
    }
  }
  return c.json({ ok: true, flagged });
});
