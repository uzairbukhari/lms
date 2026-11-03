import { shopItem, SHOP_SLOTS, growthStage, teaserFor } from "@lms/schema";
import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../env";
import { fail, parseBody } from "../lib/http";
import { buyItem, rewardsFor, teaserLevel } from "../lib/rewards";
import { todayIn, visibleLessonsFor } from "../lib/visibility";
import { requireStudent } from "../middleware/auth";

/** Week streak, sticker book, points shop, plant growth and the daily brain teaser. All personal: nothing compares children. */
export const rewardRoutes = new Hono<AppEnv>();
for (const path of ["/rewards", "/shop/*", "/growth", "/teaser"]) rewardRoutes.use(path, requireStudent);

rewardRoutes.get("/rewards", async (c) => c.json(await rewardsFor(c.env.DB, c.get("user").id, todayIn(c.env.TIMEZONE))));

rewardRoutes.post("/shop/buy", async (c) => {
  const { itemId } = await parseBody(c, z.object({ itemId: z.string().max(40) }));
  const user = c.get("user");
  const today = todayIn(c.env.TIMEZONE);
  const res = await buyItem(c.env.DB, user.id, itemId, today);
  if (!res.ok) return fail(c, res.code === "unknown_item" ? 404 : 409, res.code, res.message);
  // Wear what was just bought (hat, pet or trail), as a treat.
  const item = shopItem(itemId);
  if (item) await c.env.DB.prepare("INSERT INTO shop_equipped (user_id, slot, item_id) VALUES (?, ?, ?) ON CONFLICT(user_id, slot) DO UPDATE SET item_id = excluded.item_id").bind(user.id, item.slot, item.id).run();
  return c.json(await rewardsFor(c.env.DB, user.id, today), 201);
});

/** Wear a bought item, or take the slot's item off (itemId null). */
rewardRoutes.post("/shop/equip", async (c) => {
  const { slot, itemId } = await parseBody(c, z.object({ slot: z.enum(SHOP_SLOTS), itemId: z.string().max(40).nullable() }));
  const user = c.get("user");
  if (itemId === null) {
    await c.env.DB.prepare("DELETE FROM shop_equipped WHERE user_id = ? AND slot = ?").bind(user.id, slot).run();
  } else {
    const item = shopItem(itemId);
    const owns = await c.env.DB.prepare("SELECT 1 AS ok FROM shop_purchases WHERE user_id = ? AND item_id = ?").bind(user.id, itemId).first();
    if (!item || item.slot !== slot || !owns) return fail(c, 404, "not_found");
    await c.env.DB.prepare("INSERT INTO shop_equipped (user_id, slot, item_id) VALUES (?, ?, ?) ON CONFLICT(user_id, slot) DO UPDATE SET item_id = excluded.item_id").bind(user.id, slot, itemId).run();
  }
  return c.json(await rewardsFor(c.env.DB, user.id, todayIn(c.env.TIMEZONE)));
});

/**
 * "My growth": per subject, how many lessons are finished (the plant grows) and, for each lesson with a quiz, the first
 * try next to the best try. Only the child's own numbers; the wording is about getting better, not about scores.
 */
rewardRoutes.get("/growth", async (c) => {
  const user = c.get("user");
  const vis = await visibleLessonsFor(c.env.DB, user.id, todayIn(c.env.TIMEZONE));
  const ids = vis.lessons.map((l) => l.lessonId);
  if (ids.length === 0) return c.json({ subjects: [] });
  const marks = ids.map(() => "?").join(",");
  const [lessons, done, tries] = await Promise.all([
    c.env.DB.prepare(`SELECT id, title, subject_id AS subject FROM lessons WHERE id IN (${marks})`).bind(...ids).all<{ id: string; title: string; subject: string }>(),
    c.env.DB.prepare(`SELECT lesson_id AS id FROM lesson_progress WHERE user_id = ? AND status = 'completed' AND lesson_id IN (${marks})`).bind(user.id, ...ids).all<{ id: string }>(),
    c.env.DB.prepare(`SELECT lesson_id AS id, percent, attempt_number AS n FROM quiz_attempts WHERE user_id = ? AND status = 'submitted' AND lesson_id IN (${marks}) ORDER BY submitted_at, attempt_number`).bind(user.id, ...ids).all<{ id: string; percent: number; n: number }>(),
  ]);
  const finished = new Set(done.results.map((r) => r.id));
  const subjects = new Map<string, { subject: string; lessonsDone: number; lessons: { id: string; title: string; first: number; best: number; tries: number }[] }>();
  for (const l of lessons.results) {
    const s = subjects.get(l.subject) ?? { subject: l.subject, lessonsDone: 0, lessons: [] };
    if (finished.has(l.id)) s.lessonsDone++;
    const mine = tries.results.filter((t) => t.id === l.id);
    if (mine.length > 0) s.lessons.push({ id: l.id, title: l.title, first: Math.round(mine[0]!.percent), best: Math.round(Math.max(...mine.map((t) => t.percent))), tries: mine.length });
    subjects.set(l.subject, s);
  }
  return c.json({
    subjects: [...subjects.values()].sort((a, b) => a.subject.localeCompare(b.subject)).map((s) => ({ ...s, stage: growthStage(s.lessonsDone), improved: s.lessons.filter((l) => l.best > l.first).length })),
  });
});

rewardRoutes.get("/teaser", async (c) => {
  const user = c.get("user");
  const day = todayIn(c.env.TIMEZONE);
  const level = await teaserLevel(c.env.DB, user.id);
  const played = await c.env.DB.prepare("SELECT correct FROM teaser_plays WHERE user_id = ? AND day = ?").bind(user.id, day).first<{ correct: number }>();
  const solved = (await c.env.DB.prepare("SELECT COUNT(*) AS n FROM teaser_plays WHERE user_id = ? AND correct = 1").bind(user.id).first<{ n: number }>())?.n ?? 0;
  return c.json({ day, level, teaser: teaserFor(day, level), done: played !== null, correct: played ? played.correct === 1 : null, solved });
});

/** Records today's answer once. The puzzle is low stakes (a sticker after five), so the browser says whether it was right. */
rewardRoutes.post("/teaser", async (c) => {
  const { correct } = await parseBody(c, z.object({ correct: z.boolean() }));
  const user = c.get("user");
  const day = todayIn(c.env.TIMEZONE);
  await c.env.DB.prepare("INSERT OR IGNORE INTO teaser_plays (user_id, day, correct) VALUES (?, ?, ?)").bind(user.id, day, correct ? 1 : 0).run();
  const rewards = await rewardsFor(c.env.DB, user.id, day);
  return c.json({ newStickers: rewards.stickers.filter((s) => s.isNew).map((s) => s.id) });
});

