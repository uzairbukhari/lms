import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../env";
import { fail, parseBody } from "../lib/http";
import { searchClips, videoDetails } from "../lib/youtube";
import { withoutVideo, withVideos, type ApprovedVideo } from "../lib/videos";

// Admin only (mounted under requireAdmin): find clips for a lesson, approve one with a click, remove it again.
export const adminVideoRoutes = new Hono<AppEnv>();

adminVideoRoutes.get("/videos/status", (c) => c.json({ configured: !!c.env.YOUTUBE_API_KEY }));

adminVideoRoutes.post("/videos/search", async (c) => {
  const key = c.env.YOUTUBE_API_KEY;
  if (!key) return fail(c, 503, "not_configured", "Add the YOUTUBE_API_KEY secret to the Worker first.");
  const { query } = await parseBody(c, z.object({ query: z.string().trim().min(2).max(100) }));
  try {
    return c.json({ clips: await searchClips(query, key) });
  } catch (e) {
    console.error("youtube search failed", e);
    return fail(c, 502, "youtube_failed", "YouTube did not answer. Check the key and its API restriction, then try again.");
  }
});

type Row = ApprovedVideo & { id: string; channel: string | null };

const listFor = (db: D1Database, lessonId: string) =>
  db.prepare("SELECT id, youtube, title, channel, start_sec, end_sec, caption FROM approved_videos WHERE lesson_id = ? ORDER BY created_at").bind(lessonId).all<Row>();

adminVideoRoutes.get("/lessons/:id/videos", async (c) => {
  const lesson = await c.env.DB.prepare("SELECT title FROM lessons WHERE id = ?").bind(c.req.param("id")).first<{ title: string }>();
  if (!lesson) return fail(c, 404, "not_found");
  return c.json({ title: lesson.title, videos: (await listFor(c.env.DB, c.req.param("id"))).results });
});

/** Rewrite the lesson's blocks (what children see) and the stored source file, without making a new version or touching the quiz. */
async function patchBlocks(db: D1Database, lessonId: string, change: (blocks: any[]) => any[]): Promise<boolean> {
  const row = await db.prepare("SELECT content_json, source_json FROM lessons WHERE id = ?").bind(lessonId).first<{ content_json: string; source_json: string }>();
  if (!row) return false;
  const blocks = change(JSON.parse(row.content_json));
  const file = JSON.parse(row.source_json);
  file.blocks = change(file.blocks);
  await db.prepare("UPDATE lessons SET content_json = ?, source_json = ?, updated_at = datetime('now') WHERE id = ?").bind(JSON.stringify(blocks), JSON.stringify(file), lessonId).run();
  return true;
}

adminVideoRoutes.post("/lessons/:id/videos", async (c) => {
  const key = c.env.YOUTUBE_API_KEY;
  if (!key) return fail(c, 503, "not_configured", "Add the YOUTUBE_API_KEY secret to the Worker first.");
  const lessonId = c.req.param("id");
  const body = await parseBody(c, z.object({
    youtube: z.string().regex(/^[A-Za-z0-9_-]{11}$/),
    start: z.number().int().min(0).max(36000).default(0),
    end: z.number().int().min(1).max(36000).optional(),
    caption: z.string().trim().max(200).optional(),
  }));
  // Never trust the browser: ask YouTube again that the video exists, can be embedded, and how long it is.
  let info;
  try { [info] = await videoDetails([body.youtube], key); } catch { return fail(c, 502, "youtube_failed", "YouTube did not answer. Try again."); }
  if (!info) return fail(c, 422, "not_embeddable", "That video cannot be embedded, or does not exist.");
  const end = Math.min(body.end ?? Math.min(info.seconds, body.start + 100), info.seconds);
  if (end <= body.start) return fail(c, 422, "bad_range", "The end must be after the start.");
  if (end - body.start > 100) return fail(c, 422, "too_long", "A clip can be at most 100 seconds. Choose a shorter part.");
  const v: ApprovedVideo = { youtube: info.youtube, title: info.title, start_sec: body.start, end_sec: end, caption: body.caption ?? null };
  const exists = await c.env.DB.prepare("SELECT id FROM lessons WHERE id = ?").bind(lessonId).first();
  if (!exists) return fail(c, 404, "not_found");
  await c.env.DB.prepare("INSERT INTO approved_videos (id, lesson_id, youtube, title, channel, start_sec, end_sec, caption) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT (lesson_id, youtube) DO UPDATE SET start_sec = excluded.start_sec, end_sec = excluded.end_sec, caption = excluded.caption")
    .bind(crypto.randomUUID(), lessonId, v.youtube, v.title, info.channel, v.start_sec, v.end_sec, v.caption).run();
  await patchBlocks(c.env.DB, lessonId, (b) => withVideos(withoutVideo(b, v.youtube), [v]));
  return c.json({ ok: true, video: { ...v, channel: info.channel } }, 201);
});

adminVideoRoutes.delete("/lessons/:id/videos/:youtube", async (c) => {
  const lessonId = c.req.param("id");
  const youtube = c.req.param("youtube");
  const res = await c.env.DB.prepare("DELETE FROM approved_videos WHERE lesson_id = ? AND youtube = ?").bind(lessonId, youtube).run();
  if (!res.meta.changes) return fail(c, 404, "not_found");
  await patchBlocks(c.env.DB, lessonId, (b) => withoutVideo(b, youtube));
  return c.json({ ok: true });
});
