import { gameBonus, gameForWeek, maxGameScore } from "@lms/schema";
import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../env";
import { fail, parseBody } from "../lib/http";
import { checkpointReached, mapFor, pointTotals } from "../lib/map";
import { todayIn } from "../lib/visibility";
import { requireStudent } from "../middleware/auth";

/** The semester map and its mini games (docs/SEMESTER_MAP.md). */
export const mapRoutes = new Hono<AppEnv>();
for (const path of ["/map", "/map/*"]) mapRoutes.use(path, requireStudent);

mapRoutes.get("/map", async (c) => {
  const semester = Number(c.req.query("semester")) || undefined;
  return c.json(await mapFor(c.env.DB, c.get("user").id, todayIn(c.env.TIMEZONE), semester));
});

/**
 * A finished mini game. Only a reached checkpoint can be played. The first play opens the week's chest (banks its
 * quiz points); every play records its score, and the best bonus counts once.
 */
mapRoutes.post("/map/play", async (c) => {
  const user = c.get("user");
  const body = await parseBody(c, z.object({ semester: z.number().int().min(1).max(4), week: z.number().int().min(1).max(12), score: z.number().int().min(0).max(100000) }));
  const today = todayIn(c.env.TIMEZONE);
  if (!(await checkpointReached(c.env.DB, user.id, today, body.semester, body.week))) return fail(c, 403, "not_reached", "Finish this week's lessons to play here.");
  const { game, level } = gameForWeek(body.week);
  const score = Math.min(body.score, maxGameScore(game, level));
  const bonus = gameBonus(game, level, score);
  const before = await c.env.DB
    .prepare("SELECT COUNT(*) AS plays, MAX(bonus) AS best FROM game_plays WHERE user_id = ? AND semester = ? AND week = ?")
    .bind(user.id, body.semester, body.week)
    .first<{ plays: number; best: number | null }>();
  await c.env.DB
    .prepare("INSERT INTO game_plays (id, user_id, semester, week, game, level, score, bonus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(crypto.randomUUID(), user.id, body.semester, body.week, game, level, score, bonus)
    .run();
  return c.json({
    score,
    bonus,
    firstPlay: (before?.plays ?? 0) === 0,
    newBest: bonus > (before?.best ?? -1),
    points: await pointTotals(c.env.DB, user.id, today),
  });
});
