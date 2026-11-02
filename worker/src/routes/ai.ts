import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../env";
import { AI_MODEL, DEFAULT_DAILY_CAP, explainPrompt, hintPrompt, leaksAnswer, runModel, sha, takeDailyAllowance } from "../lib/ai";
import { fail, parseBody } from "../lib/http";
import type { AttemptRow, QuestionRow } from "../lib/quiz";
import { narrate } from "../lib/tts";
import { todayIn } from "../lib/visibility";
import { requireStudent } from "../middleware/auth";

/** Optional AI help inside a quiz. Fixed prompts only: there is no free-form chat. Always falls back to the stored text. */
export const aiRoutes = new Hono<AppEnv>();
aiRoutes.use("/ai/*", requireStudent);

/** Lesson narration in a natural voice (see lib/tts.ts). */
aiRoutes.post("/ai/voice", narrate);

const bodySchema = z.object({ attemptId: z.string(), questionId: z.string() });
const GENERIC_HINT = "Read the question again, slowly. Take your time!";

async function load(c: { env: AppEnv["Bindings"] }, userId: string, attemptId: string, questionId: string) {
  const attempt = await c.env.DB.prepare("SELECT * FROM quiz_attempts WHERE id = ? AND user_id = ?").bind(attemptId, userId).first<AttemptRow>();
  if (!attempt) return null;
  const question = await c.env.DB.prepare("SELECT * FROM questions WHERE id = ? AND quiz_id = ?").bind(questionId, attempt.quiz_id).first<QuestionRow>();
  return question ? { attempt, question } : null;
}

async function log(db: D1Database, userId: string, questionId: string, kind: "hint" | "explain", model: string, response: string, fromCache: boolean) {
  await db
    .prepare("INSERT INTO ai_events (id, user_id, question_id, kind, model, response, from_cache) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .bind(crypto.randomUUID(), userId, questionId, kind, model, response, fromCache ? 1 : 0)
    .run();
}

/** A hint while a quiz is in progress. The answer is never given away: the reply is checked in code, and replaced if it leaks. */
aiRoutes.post("/ai/hint", async (c) => {
  const user = c.get("user");
  const { attemptId, questionId } = await parseBody(c, bodySchema);
  const found = await load(c, user.id, attemptId, questionId);
  if (!found || found.attempt.status !== "in_progress") return fail(c, 404, "not_found");
  const { question } = found;
  const fallback = question.hint ?? GENERIC_HINT;

  const cacheKey = `ai:hint:v1:${question.id}`;
  const cached = await c.env.SESSIONS.get(cacheKey);
  if (cached) {
    await log(c.env.DB, user.id, question.id, "hint", AI_MODEL, cached, true);
    return c.json({ hint: cached, source: "ai" });
  }
  const cap = DEFAULT_DAILY_CAP;
  if (!c.env.AI || !(await takeDailyAllowance(c.env.SESSIONS, user.id, todayIn(c.env.TIMEZONE), cap))) {
    return c.json({ hint: fallback, source: "static" });
  }
  const text = await runModel(c.env.AI, hintPrompt(question), { db: c.env.DB, userId: user.id, kind: "hint" });
  if (!text || leaksAnswer(question, text)) {
    await log(c.env.DB, user.id, question.id, "hint", "static-fallback", fallback, false);
    return c.json({ hint: fallback, source: "static" });
  }
  await c.env.SESSIONS.put(cacheKey, text, { expirationTtl: 7 * 24 * 3600 });
  await log(c.env.DB, user.id, question.id, "hint", AI_MODEL, text, false);
  return c.json({ hint: text, source: "ai" });
});

/** "Why was my answer wrong?" after handing in. Falls back to the question's stored explanation. */
aiRoutes.post("/ai/explain", async (c) => {
  const user = c.get("user");
  const { attemptId, questionId } = await parseBody(c, bodySchema);
  const found = await load(c, user.id, attemptId, questionId);
  if (!found || found.attempt.status !== "submitted") return fail(c, 404, "not_found");
  const { question } = found;
  const fallback = question.explanation ?? "Have a look at the right answer above, then try again. You can do it!";
  const answer = await c.env.DB.prepare("SELECT response_json, is_correct FROM attempt_answers WHERE attempt_id = ? AND question_id = ?").bind(attemptId, questionId).first<{ response_json: string; is_correct: number }>();
  if (!answer || answer.is_correct === 1) return c.json({ explanation: fallback, source: "static" });

  const key = `ai:explain:v1:${question.id}:${await sha(answer.response_json)}`;
  const cached = await c.env.SESSIONS.get(key);
  if (cached) {
    await log(c.env.DB, user.id, question.id, "explain", AI_MODEL, cached, true);
    return c.json({ explanation: cached, source: "ai" });
  }
  if (!c.env.AI || !(await takeDailyAllowance(c.env.SESSIONS, user.id, todayIn(c.env.TIMEZONE), DEFAULT_DAILY_CAP))) {
    return c.json({ explanation: fallback, source: "static" });
  }
  const text = await runModel(c.env.AI, explainPrompt(question, answer.response_json), { db: c.env.DB, userId: user.id, kind: "explain" });
  if (!text) return c.json({ explanation: fallback, source: "static" });
  await c.env.SESSIONS.put(key, text, { expirationTtl: 7 * 24 * 3600 });
  await log(c.env.DB, user.id, question.id, "explain", AI_MODEL, text, false);
  return c.json({ explanation: text, source: "ai" });
});
