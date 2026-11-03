import { isLookupWord, normaliseWord, sentenceWith, wordVariants, type Block } from "@lms/schema";
import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../env";
import { AI_MODEL, DEFAULT_DAILY_CAP, definePrompt, explainPrompt, hintPrompt, leaksAnswer, runModel, sha, takeDailyAllowance } from "../lib/ai";
import { fail, parseBody } from "../lib/http";
import type { AttemptRow, QuestionRow } from "../lib/quiz";
import { narrate } from "../lib/tts";
import { todayIn, visibleLessonsFor } from "../lib/visibility";
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

async function log(db: D1Database, userId: string, questionId: string | null, kind: "hint" | "explain" | "define", model: string, response: string, fromCache: boolean, extra: { cacheKey?: string; detail?: string } = {}) {
  await db
    .prepare("INSERT INTO ai_events (id, user_id, question_id, kind, model, response, from_cache, cache_key, detail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(crypto.randomUUID(), userId, questionId, kind, model, response, fromCache ? 1 : 0, extra.cacheKey ?? null, extra.detail ?? null)
    .run();
}

/** A reply the parent marked as bad: it is never served again, the stored text is used instead (see admin-ai-log.ts). */
export const blockedKey = (cacheKey: string) => `ai:blocked:${cacheKey}`;
const isBlocked = async (kv: KVNamespace, cacheKey: string) => (await kv.get(blockedKey(cacheKey))) !== null;

/** A hint while a quiz is in progress. The answer is never given away: the reply is checked in code, and replaced if it leaks. */
aiRoutes.post("/ai/hint", async (c) => {
  const user = c.get("user");
  const { attemptId, questionId } = await parseBody(c, bodySchema);
  const found = await load(c, user.id, attemptId, questionId);
  if (!found || found.attempt.status !== "in_progress") return fail(c, 404, "not_found");
  const { question } = found;
  const fallback = question.hint ?? GENERIC_HINT;

  if (user.isTest) return c.json({ hint: fallback, source: "static" });
  const cacheKey = `ai:hint:v1:${question.id}`;
  if (await isBlocked(c.env.SESSIONS, cacheKey)) return c.json({ hint: fallback, source: "static" });
  const cached = await c.env.SESSIONS.get(cacheKey);
  if (cached) {
    await log(c.env.DB, user.id, question.id, "hint", AI_MODEL, cached, true, { cacheKey });
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
  await log(c.env.DB, user.id, question.id, "hint", AI_MODEL, text, false, { cacheKey });
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

  if (user.isTest) return c.json({ explanation: fallback, source: "static" });
  const key = `ai:explain:v1:${question.id}:${await sha(answer.response_json)}`;
  if (await isBlocked(c.env.SESSIONS, key)) return c.json({ explanation: fallback, source: "static" });
  const cached = await c.env.SESSIONS.get(key);
  if (cached) {
    await log(c.env.DB, user.id, question.id, "explain", AI_MODEL, cached, true, { cacheKey: key });
    return c.json({ explanation: cached, source: "ai" });
  }
  if (!c.env.AI || !(await takeDailyAllowance(c.env.SESSIONS, user.id, todayIn(c.env.TIMEZONE), DEFAULT_DAILY_CAP))) {
    return c.json({ explanation: fallback, source: "static" });
  }
  const text = await runModel(c.env.AI, explainPrompt(question, answer.response_json), { db: c.env.DB, userId: user.id, kind: "explain" });
  if (!text) return c.json({ explanation: fallback, source: "static" });
  await c.env.SESSIONS.put(key, text, { expirationTtl: 7 * 24 * 3600 });
  await log(c.env.DB, user.id, question.id, "explain", AI_MODEL, text, false, { cacheKey: key });
  return c.json({ explanation: text, source: "ai" });
});

// --- Long-press word help ------------------------------------------------------------------------

const DEFINE_DAILY_CAP = 40;
const NO_IDEA = "Hmm, I'm not sure about that word yet. Ask a grown-up to help!";

/**
 * A child pressed and held a word in a lesson. Only words that really appear in a lesson the child may open are
 * explained (so this is not a chat), the reply is a short kid-safe explanation, cached per lesson and word, and every real
 * model call is metered. Meanings written in the lesson are answered in the browser and never get here.
 */
aiRoutes.post("/ai/define", async (c) => {
  const user = c.get("user");
  const { lessonId, word: raw } = await parseBody(c, z.object({ lessonId: z.string().max(80), word: z.string().max(60) }));
  const word = normaliseWord(raw);
  if (!isLookupWord(word)) return fail(c, 400, "bad_word");

  const vis = await visibleLessonsFor(c.env.DB, user.id, todayIn(c.env.TIMEZONE));
  if (!vis.lessons.some((l) => l.lessonId === lessonId)) return fail(c, 404, "not_found");
  const row = await c.env.DB.prepare("SELECT subject_id AS subject, content_json FROM lessons WHERE id = ?").bind(lessonId).first<{ subject: string; content_json: string }>();
  if (!row) return fail(c, 404, "not_found");
  const sentence = sentenceWith(JSON.parse(row.content_json) as Block[], word);
  if (!sentence) return fail(c, 404, "not_found");

  if (user.isTest) return c.json({ word, meaning: NO_IDEA, source: "static" });
  const key = `ai:define:v1:${lessonId}:${wordVariants(word)[0]}`;
  const detail = `"${word}"`;
  if (await isBlocked(c.env.SESSIONS, key)) return c.json({ word, meaning: NO_IDEA, source: "static" });
  const cached = await c.env.SESSIONS.get(key);
  if (cached) {
    await log(c.env.DB, user.id, null, "define", AI_MODEL, cached, true, { cacheKey: key, detail });
    return c.json({ word, meaning: cached, source: "ai" });
  }
  if (!c.env.AI || !(await takeDailyAllowance(c.env.SESSIONS, `define:${user.id}`, todayIn(c.env.TIMEZONE), DEFINE_DAILY_CAP))) {
    return c.json({ word, meaning: NO_IDEA, source: "static" });
  }
  const text = await runModel(c.env.AI, definePrompt(word, sentence, row.subject), { db: c.env.DB, userId: user.id, kind: "define" });
  if (!text) return c.json({ word, meaning: NO_IDEA, source: "static" });
  await c.env.SESSIONS.put(key, text, { expirationTtl: 30 * 24 * 3600 });
  await log(c.env.DB, user.id, null, "define", AI_MODEL, text, false, { cacheKey: key, detail });
  return c.json({ word, meaning: text, source: "ai" });
});
