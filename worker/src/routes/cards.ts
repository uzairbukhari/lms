import { buildGlossary, type Block } from "@lms/schema";
import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../env";
import { answerCard, buildDeck, cardSummary, describeAnswer, finishDeck, recordWord, syncCards, type DeckKind } from "../lib/cards";
import { fail, parseBody } from "../lib/http";
import type { QuestionRow } from "../lib/quiz";
import { todayIn, visibleLessonsFor } from "../lib/visibility";
import { requireStudent } from "../middleware/auth";

/** Flashcards, Boost round, Word Book, exam revision and "I'm stuck" (docs/FLASHCARDS.md). Everything is the child's own. */
export const cardRoutes = new Hono<AppEnv>();
for (const path of ["/cards/*", "/words", "/revision", "/stuck"]) cardRoutes.use(path, requireStudent);

cardRoutes.get("/cards/summary", async (c) => c.json(await cardSummary(c.env.DB, c.get("user").id, todayIn(c.env.TIMEZONE))));

cardRoutes.get("/cards/deck", async (c) => {
  const kind = z.enum(["daily", "boost", "semester", "words"]).safeParse(c.req.query("kind") ?? "daily");
  if (!kind.success) return fail(c, 400, "bad_request");
  const semester = Number(c.req.query("semester")) || undefined;
  return c.json(await buildDeck(c.env.DB, c.get("user").id, todayIn(c.env.TIMEZONE), kind.data as DeckKind, semester));
});

cardRoutes.post("/cards/answer", async (c) => {
  const body = await parseBody(c, z.object({ cardId: z.string().max(200), gotIt: z.boolean().optional(), choice: z.string().max(400).optional(), response: z.unknown().optional() }));
  const res = await answerCard(c.env.DB, c.get("user").id, todayIn(c.env.TIMEZONE), body);
  return res ? c.json(res) : fail(c, 404, "not_found");
});

cardRoutes.post("/cards/finish", async (c) => {
  const { kind } = await parseBody(c, z.object({ kind: z.enum(["daily", "boost"]) }));
  return c.json(await finishDeck(c.env.DB, c.get("user").id, todayIn(c.env.TIMEZONE), kind));
});

// --- Word Book ----------------------------------------------------------------------------------------

/** Called after a child presses and holds a word in a lesson and sees its meaning. */
cardRoutes.post("/words", async (c) => {
  const { lessonId, word } = await parseBody(c, z.object({ lessonId: z.string().max(80), word: z.string().max(60) }));
  const ok = await recordWord(c.env.DB, c.env.SESSIONS, c.get("user").id, todayIn(c.env.TIMEZONE), lessonId, word);
  return c.json({ saved: ok });
});

cardRoutes.get("/words", async (c) => {
  const user = c.get("user");
  const today = todayIn(c.env.TIMEZONE);
  await syncCards(c.env.DB, user.id, today);
  const { results } = await c.env.DB
    .prepare(
      `SELECT w.word, w.meaning, w.source, l.title AS lesson, l.subject_id AS subject,
              (SELECT r.mastered FROM card_reviews r WHERE r.user_id = w.user_id AND r.card_id = 'g:' || w.lesson_id || ':' || w.word) AS mastered
         FROM word_book w JOIN lessons l ON l.id = w.lesson_id WHERE w.user_id = ? ORDER BY l.subject_id, w.word`,
    )
    .bind(user.id)
    .all<{ word: string; meaning: string; source: string; lesson: string; subject: string; mastered: number | null }>();
  return c.json({ words: results.map((r) => ({ ...r, mastered: r.mastered === 1 })) });
});

// --- Exam revision pack -------------------------------------------------------------------------------

/** For one semester: per subject, the words to know and the questions the child missed, with the right answers. */
cardRoutes.get("/revision", async (c) => {
  const user = c.get("user");
  const today = todayIn(c.env.TIMEZONE);
  const vis = await visibleLessonsFor(c.env.DB, user.id, today);
  const semester = Number(c.req.query("semester")) || vis.now?.semester || 1;
  const inSemester = vis.lessons.filter((l) => l.semester === semester && l.phase !== "open");
  if (inSemester.length === 0) return c.json({ semester, subjects: [] });
  const ids = inSemester.map((l) => l.lessonId);
  const marks = ids.map(() => "?").join(",");
  const lessons = await c.env.DB.prepare(`SELECT id, title, subject_id AS subject, content_json FROM lessons WHERE id IN (${marks})`).bind(...ids).all<{ id: string; title: string; subject: string; content_json: string }>();
  const missed = await c.env.DB
    .prepare(
      `SELECT DISTINCT q.id, q.prompt, q.type, q.options_json, q.answer_json, q.explanation, a.lesson_id AS lessonId
         FROM attempt_answers aa JOIN quiz_attempts a ON a.id = aa.attempt_id JOIN questions q ON q.id = aa.question_id
        WHERE a.user_id = ? AND a.status = 'submitted' AND aa.is_correct = 0 AND a.lesson_id IN (${marks})`,
    )
    .bind(user.id, ...ids)
    .all<QuestionRow & { lessonId: string }>();
  const subjects = new Map<string, { subject: string; lessons: string[]; words: { term: string; meaning: string }[]; questions: { id: string; prompt: string; answer: string; explanation: string | null }[] }>();
  for (const l of lessons.results) {
    const s = subjects.get(l.subject) ?? { subject: l.subject, lessons: [], words: [], questions: [] };
    s.lessons.push(l.title);
    for (const e of buildGlossary(JSON.parse(l.content_json) as Block[]).values()) s.words.push({ term: e.term, meaning: e.meaning });
    for (const q of missed.results.filter((m) => m.lessonId === l.id)) s.questions.push({ id: q.id, prompt: q.prompt, answer: describeAnswer(q), explanation: q.explanation });
    subjects.set(l.subject, s);
  }
  return c.json({ semester, subjects: [...subjects.values()].sort((a, b) => a.subject.localeCompare(b.subject)) });
});

// --- I'm stuck ----------------------------------------------------------------------------------------

cardRoutes.post("/stuck", async (c) => {
  const body = await parseBody(c, z.object({ lessonId: z.string().max(80), slide: z.number().int().min(0).max(300).optional(), questionId: z.string().max(80).optional() }));
  const user = c.get("user");
  const vis = await visibleLessonsFor(c.env.DB, user.id, todayIn(c.env.TIMEZONE));
  if (!vis.lessons.some((l) => l.lessonId === body.lessonId)) return fail(c, 404, "not_found");
  if (body.questionId) {
    const ok = await c.env.DB.prepare("SELECT 1 AS ok FROM questions q JOIN quiz_attempts a ON a.quiz_id = q.quiz_id WHERE q.id = ? AND a.user_id = ? AND a.lesson_id = ?").bind(body.questionId, user.id, body.lessonId).first();
    if (!ok) return fail(c, 404, "not_found");
  }
  // The same spot flagged again before the parent has looked at it is not counted twice.
  const dup = await c.env.DB
    .prepare("SELECT id FROM stuck_flags WHERE user_id = ? AND lesson_id = ? AND status = 'open' AND COALESCE(slide, -1) = ? AND COALESCE(question_id, '') = ?")
    .bind(user.id, body.lessonId, body.slide ?? -1, body.questionId ?? "")
    .first();
  if (!dup) {
    await c.env.DB.prepare("INSERT INTO stuck_flags (id, user_id, lesson_id, slide, question_id) VALUES (?, ?, ?, ?, ?)").bind(crypto.randomUUID(), user.id, body.lessonId, body.slide ?? null, body.questionId ?? null).run();
  }
  return c.json({ ok: true });
});
