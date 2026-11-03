import { buildGlossary, findInGlossary, gradeQuestion, normaliseWord, sentenceWith, wordVariants, type Block, type Response } from "@lms/schema";
import { publicQuestion, type QuestionRow } from "./quiz";
import { teaserLevel } from "./rewards";
import { addDays } from "./terms";
import { visibleLessonsFor } from "./visibility";

// Flashcards (docs/FLASHCARDS.md): five "levels" (Leitner boxes) for word cards, three for questions that come back after
// a miss (the Boost round). A card only climbs past level 3 once it has been answered in a form the app checks.

/** Days until a word card is due again after reaching level 1 to 5. */
export const WORD_STEPS = [1, 2, 4, 7, 14];
/** Days until a missed question comes back after reaching level 1 to 3 (it first comes back 3 days after the miss). */
export const QUESTION_STEPS = [7, 14, 30];
export const FIRST_RETURN_DAYS = 3;
export const NEW_PER_DAY = 3;
export const BOOST_SIZE = 5;
export const deckSize = (level: 1 | 2) => (level === 1 ? 8 : 12);

const SUPPORTED_QUESTIONS = new Set(["multiple_choice", "multi_select", "true_false", "number", "short_text", "order", "match", "fill_blank", "hotspot", "slider"]);
const chunk = <T>(list: T[], n: number) => Array.from({ length: Math.ceil(list.length / n) }, (_, i) => list.slice(i * n, i * n + n));
const marks = (n: number) => Array.from({ length: n }, () => "?").join(",");

export type DeckKind = "daily" | "boost" | "semester" | "words";
type CardRow = { id: string; source: "glossary" | "question" | "deck"; front: string; back: string; emoji: string | null; subject_id: string | null; lesson_id: string | null; question_id: string | null; semester: number | null };
type ReviewRow = { box: number; due: string; seen: number; checked_ok: number; mastered: number };

/** Create the child's cards: words from lessons she has opened, questions she missed, and decks the parent assigned. */
export async function syncCards(db: D1Database, userId: string, today: string): Promise<void> {
  const vis = await visibleLessonsFor(db, userId, today);
  const visible = new Map(vis.lessons.map((l) => [l.lessonId, l]));
  const statements: D1PreparedStatement[] = [];
  const addCard = (c: Omit<CardRow, "emoji"> & { emoji?: string | null; deck_id?: string | null }, due: string) => {
    statements.push(
      db.prepare("INSERT OR IGNORE INTO cards (id, source, front, back, emoji, subject_id, lesson_id, question_id, deck_id, semester) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(c.id, c.source, c.front, c.back, c.emoji ?? null, c.subject_id, c.lesson_id, c.question_id, c.deck_id ?? null, c.semester),
      db.prepare("INSERT OR IGNORE INTO card_reviews (user_id, card_id, due) VALUES (?, ?, ?)").bind(userId, c.id, due),
    );
  };

  // 1. Words from lessons the child has opened.
  const opened = (await db.prepare("SELECT lesson_id AS id FROM lesson_progress WHERE user_id = ?").bind(userId).all<{ id: string }>()).results.filter((r) => visible.has(r.id));
  if (opened.length) {
    const rows = (await db.prepare(`SELECT id, subject_id AS subject, content_json FROM lessons WHERE id IN (${marks(opened.length)})`).bind(...opened.map((o) => o.id)).all<{ id: string; subject: string; content_json: string }>()).results;
    for (const l of rows) {
      for (const [key, entry] of buildGlossary(JSON.parse(l.content_json) as Block[])) {
        addCard({ id: `g:${l.id}:${key}`, source: "glossary", front: entry.term, back: entry.meaning, subject_id: l.subject, lesson_id: l.id, question_id: null, semester: visible.get(l.id)?.semester ?? null }, today);
      }
    }
  }

  // 2. Questions missed in a quiz come back 3 days after the miss.
  const missed = await db
    .prepare(
      `SELECT aa.question_id AS qid, q.prompt, q.type, q.explanation, a.lesson_id AS lessonId, l.subject_id AS subject, MIN(date(a.submitted_at)) AS day
         FROM attempt_answers aa JOIN quiz_attempts a ON a.id = aa.attempt_id JOIN questions q ON q.id = aa.question_id
         JOIN quizzes z ON z.id = q.quiz_id AND z.kind = 'lesson' JOIN lessons l ON l.id = a.lesson_id
        WHERE a.user_id = ? AND a.status = 'submitted' AND aa.is_correct = 0 GROUP BY aa.question_id`,
    )
    .bind(userId)
    .all<{ qid: string; prompt: string; type: string; explanation: string | null; lessonId: string; subject: string; day: string }>();
  for (const m of missed.results) {
    if (!visible.has(m.lessonId) || !SUPPORTED_QUESTIONS.has(m.type)) continue;
    addCard({ id: `q:${m.qid}`, source: "question", front: m.prompt, back: m.explanation ?? "", subject_id: m.subject, lesson_id: m.lessonId, question_id: m.qid, semester: visible.get(m.lessonId)?.semester ?? null }, addDays(m.day, FIRST_RETURN_DAYS));
  }

  // 3. Decks the parent assigned to the child or to one of their classes.
  const deckCards = await db
    .prepare(
      `SELECT c.id, c.front, c.back, c.emoji, c.subject_id, c.deck_id FROM cards c
        WHERE c.deck_id IN (SELECT deck_id FROM deck_assignments WHERE user_id = ? OR class_id IN (SELECT class_id FROM class_members WHERE user_id = ?))`,
    )
    .bind(userId, userId)
    .all<{ id: string; front: string; back: string; emoji: string | null; subject_id: string | null; deck_id: string }>();
  for (const c of deckCards.results) statements.push(db.prepare("INSERT OR IGNORE INTO card_reviews (user_id, card_id, due) VALUES (?, ?, ?)").bind(userId, c.id, today));

  for (const part of chunk(statements, 80)) await db.batch(part);
}

/** The right answer in words, for the feedback after a question card. Complicated shapes get a pointer to the explanation. */
export function describeAnswer(q: Pick<QuestionRow, "type" | "options_json" | "answer_json">): string {
  const answer = JSON.parse(q.answer_json) as unknown;
  const opts = (JSON.parse(q.options_json ?? "{}") as { options?: { id: string; text: string }[]; items?: { id: string; text: string }[]; left?: { id: string; text: string }[]; right?: { id: string; text: string }[] });
  const text = (list: { id: string; text: string }[] | undefined, id: unknown) => list?.find((o) => o.id === id)?.text ?? String(id);
  switch (q.type) {
    case "multiple_choice":
    case "multi_select":
      return (answer as string[]).map((id) => text(opts.options, id)).join(", ");
    case "true_false":
      return (Array.isArray(answer) ? answer[0] : answer) === true ? "True" : "False";
    case "number":
      return String((answer as { value: number }).value);
    case "short_text":
      return (answer as { accepted: string[] }).accepted[0] ?? "";
    case "order":
      return (answer as string[]).map((id) => text(opts.items, id)).join(" → ");
    case "match":
      return Object.entries(answer as Record<string, string>).map(([l, r]) => `${text(opts.left, l)} = ${text(opts.right, r)}`).join("; ");
    default:
      return "";
  }
}

export type DeckCard =
  | { id: string; source: "glossary" | "deck"; mode: "flip"; front: string; back: string; emoji: string | null; box: number }
  | { id: string; source: "glossary" | "deck"; mode: "choose"; front: string; options: string[]; emoji: string | null; box: number }
  | { id: string; source: "question"; mode: "question"; front: string; question: Record<string, unknown>; box: number };

function shuffleSeeded<T>(list: T[], seed: string): T[] {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const rand = () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h ^= h >>> 13; return ((h >>> 0) % 100000) / 100000; };
  return [...list].map((v) => [rand(), v] as const).sort((a, b) => a[0] - b[0]).map(([, v]) => v);
}

export async function buildDeck(db: D1Database, userId: string, today: string, kind: DeckKind, semester?: number) {
  await syncCards(db, userId, today);
  const level = await teaserLevel(db, userId);
  const base = `SELECT c.*, r.box, r.due, r.seen, r.checked_ok, r.mastered FROM card_reviews r JOIN cards c ON c.id = r.card_id WHERE r.user_id = ? AND r.mastered = 0`;
  let rows: (CardRow & ReviewRow)[];
  let limit = deckSize(level);
  if (kind === "boost") {
    limit = BOOST_SIZE;
    rows = (await db.prepare(`${base} AND c.source = 'question' AND r.due <= ? ORDER BY r.due, r.box`).bind(userId, today).all<CardRow & ReviewRow>()).results;
  } else if (kind === "semester") {
    limit = 20;
    rows = (await db.prepare(`${base} AND c.semester = ? ORDER BY r.box, r.due`).bind(userId, semester ?? 0).all<CardRow & ReviewRow>()).results;
  } else if (kind === "words") {
    rows = (await db.prepare(`${base} AND c.source = 'glossary' AND EXISTS (SELECT 1 FROM word_book w WHERE w.user_id = r.user_id AND w.lesson_id = c.lesson_id AND ('g:' || w.lesson_id || ':' || lower(w.word)) = c.id) ORDER BY r.box, r.due`).bind(userId).all<CardRow & ReviewRow>()).results;
  } else {
    rows = (await db.prepare(`${base} AND c.source != 'question' AND r.due <= ? ORDER BY r.due, r.box`).bind(userId, today).all<CardRow & ReviewRow>()).results;
    let fresh = 0;
    rows = rows.filter((r) => (r.seen === 0 ? ++fresh <= NEW_PER_DAY : true));
  }
  rows = rows.slice(0, limit);

  // Wrong answers for multiple choice come from the child's other word cards.
  const pool = (await db.prepare("SELECT DISTINCT c.back, c.subject_id AS subject FROM card_reviews r JOIN cards c ON c.id = r.card_id WHERE r.user_id = ? AND c.source != 'question' AND c.back != ''").bind(userId).all<{ back: string; subject: string | null }>()).results;
  const cards: DeckCard[] = [];
  for (const r of rows) {
    if (r.source === "question") {
      const q = await db.prepare("SELECT * FROM questions WHERE id = ?").bind(r.question_id).first<QuestionRow>();
      if (q) cards.push({ id: r.id, source: "question", mode: "question", front: r.front, question: publicQuestion(q, `card:${r.id}:${today}`, true), box: r.box });
      continue;
    }
    const wrong = shuffleSeeded(pool.filter((p) => p.back !== r.back && p.subject === r.subject_id).map((p) => p.back), `${r.id}:${today}`);
    const others = shuffleSeeded(pool.filter((p) => p.back !== r.back && p.subject !== r.subject_id).map((p) => p.back), `${r.id}:${today}:x`);
    const distractors = [...new Set([...wrong, ...others])].slice(0, 3);
    if (r.box >= 3 && distractors.length === 3) cards.push({ id: r.id, source: r.source, mode: "choose", front: r.front, options: shuffleSeeded([r.back, ...distractors], `${r.id}:${today}:o`), emoji: r.emoji, box: r.box });
    else cards.push({ id: r.id, source: r.source, mode: "flip", front: r.front, back: r.back, emoji: r.emoji, box: r.box });
  }
  return { kind, level, cards };
}

export type AnswerInput = { cardId: string; gotIt?: boolean; choice?: string; response?: unknown };
export type AnswerResult = { correct: boolean; box: number; mastered: boolean; due: string; explanation?: string; answer?: string };

/** Marks one answer and moves the card between levels. Right answers on checked forms (choose, question) are decided here, not in the browser. */
export async function answerCard(db: D1Database, userId: string, today: string, input: AnswerInput): Promise<AnswerResult | null> {
  const card = await db.prepare("SELECT c.*, r.box, r.checked_ok FROM card_reviews r JOIN cards c ON c.id = r.card_id WHERE r.user_id = ? AND c.id = ?").bind(userId, input.cardId).first<CardRow & { box: number; checked_ok: number }>();
  if (!card) return null;
  let correct = false;
  let checked = false;
  let explanation: string | undefined;
  let answer: string | undefined;
  if (card.source === "question") {
    const q = await db.prepare("SELECT * FROM questions WHERE id = ?").bind(card.question_id).first<QuestionRow>();
    if (!q) return null;
    const graded = gradeQuestion({ type: q.type, prompt: q.prompt, points: q.points, ...(JSON.parse(q.options_json ?? "{}") as object), answer: JSON.parse(q.answer_json) } as Parameters<typeof gradeQuestion>[0], input.response as Response);
    correct = graded.correct;
    checked = true;
    explanation = q.explanation ?? undefined;
    answer = describeAnswer(q) || undefined;
  } else if (input.choice !== undefined) {
    correct = input.choice === card.back;
    checked = true;
    answer = card.back;
  } else {
    correct = input.gotIt === true;
    answer = card.back;
  }

  const steps = card.source === "question" ? QUESTION_STEPS : WORD_STEPS;
  const top = steps.length;
  let box = card.box;
  let mastered = false;
  if (correct) {
    if (card.box >= top && (checked || card.checked_ok === 1)) mastered = true;
    box = Math.min(card.box + 1, top);
    if (!checked && card.source !== "question" && box > 3) box = 3; // levels 4 and 5 need a checked answer
  } else {
    box = 1;
  }
  const due = correct ? addDays(today, steps[Math.min(box, top) - 1] as number) : addDays(today, card.source === "question" ? FIRST_RETURN_DAYS : 1);
  await db
    .prepare("UPDATE card_reviews SET box = ?, due = ?, seen = 1, checked_ok = CASE WHEN ? = 1 THEN 1 ELSE checked_ok END, mastered = ?, misses = misses + ?, last_at = ?, last_result = ? WHERE user_id = ? AND card_id = ?")
    .bind(box, due, correct && checked ? 1 : 0, mastered ? 1 : 0, correct ? 0 : 1, today, correct ? 1 : 0, userId, input.cardId)
    .run();
  return { correct, box, mastered, due, explanation, answer };
}

/** A few map points for finishing the day's cards or the Boost round; once a day each. */
export async function finishDeck(db: D1Database, userId: string, today: string, kind: "daily" | "boost") {
  const where = kind === "boost" ? "c.source = 'question'" : "c.source != 'question'";
  const stats = await db
    .prepare(`SELECT COUNT(*) AS answered, COALESCE(SUM(r.last_result), 0) AS right FROM card_reviews r JOIN cards c ON c.id = r.card_id WHERE r.user_id = ? AND r.last_at = ? AND ${where}`)
    .bind(userId, today)
    .first<{ answered: number; right: number }>();
  const answered = stats?.answered ?? 0;
  const right = stats?.right ?? 0;
  if (answered < 3) return { points: 0, answered, right, already: false };
  const perfect = right === answered;
  const points = kind === "boost" ? 3 + (perfect ? 2 : 0) : 2 + (perfect ? 1 : 0);
  const res = await db.prepare("INSERT OR IGNORE INTO card_days (user_id, day, kind, points) VALUES (?, ?, ?, ?)").bind(userId, today, kind, points).run();
  const already = !res.meta.changes;
  return { points: already ? 0 : points, answered, right, already };
}

export async function cardSummary(db: D1Database, userId: string, today: string) {
  await syncCards(db, userId, today);
  const level = await teaserLevel(db, userId);
  const count = async (sql: string, ...b: unknown[]) => (await db.prepare(sql).bind(...b).first<{ n: number }>())?.n ?? 0;
  const dueWords = await count("SELECT COUNT(*) AS n FROM card_reviews r JOIN cards c ON c.id = r.card_id WHERE r.user_id = ? AND r.mastered = 0 AND c.source != 'question' AND r.due <= ? AND r.seen = 1", userId, today);
  const fresh = await count("SELECT COUNT(*) AS n FROM card_reviews r JOIN cards c ON c.id = r.card_id WHERE r.user_id = ? AND r.mastered = 0 AND c.source != 'question' AND r.due <= ? AND r.seen = 0", userId, today);
  const boost = await count("SELECT COUNT(*) AS n FROM card_reviews r JOIN cards c ON c.id = r.card_id WHERE r.user_id = ? AND r.mastered = 0 AND c.source = 'question' AND r.due <= ?", userId, today);
  const mastered = await count("SELECT COUNT(*) AS n FROM card_reviews WHERE user_id = ? AND mastered = 1", userId);
  const words = await count("SELECT COUNT(*) AS n FROM word_book WHERE user_id = ?", userId);
  const doneDaily = await count("SELECT COUNT(*) AS n FROM card_days WHERE user_id = ? AND day = ? AND kind = 'daily'", userId, today);
  const doneBoost = await count("SELECT COUNT(*) AS n FROM card_days WHERE user_id = ? AND day = ? AND kind = 'boost'", userId, today);
  return {
    daily: Math.min(dueWords + Math.min(fresh, NEW_PER_DAY), deckSize(level)),
    boost: Math.min(boost, BOOST_SIZE),
    mastered, words, dailyDone: doneDaily > 0, boostDone: doneBoost > 0,
  };
}

/** Save a pressed word in the Word Book. The meaning is looked up here, never taken from the browser. */
export async function recordWord(db: D1Database, kv: KVNamespace, userId: string, today: string, lessonId: string, rawWord: string): Promise<boolean> {
  const vis = await visibleLessonsFor(db, userId, today);
  if (!vis.lessons.some((l) => l.lessonId === lessonId)) return false;
  const lesson = await db.prepare("SELECT content_json FROM lessons WHERE id = ?").bind(lessonId).first<{ content_json: string }>();
  if (!lesson) return false;
  const blocks = JSON.parse(lesson.content_json) as Block[];
  const word = normaliseWord(rawWord);
  if (!word || !sentenceWith(blocks, word)) return false;
  const mine = findInGlossary(buildGlossary(blocks), word);
  let meaning = mine?.meaning;
  let source: "lesson" | "ai" = "lesson";
  if (!meaning) {
    meaning = (await kv.get(`ai:define:v1:${lessonId}:${wordVariants(word)[0]}`)) ?? undefined;
    source = "ai";
  }
  if (!meaning) return false;
  await db.prepare("INSERT OR IGNORE INTO word_book (user_id, lesson_id, word, meaning, source) VALUES (?, ?, ?, ?, ?)").bind(userId, lessonId, mine ? normaliseWord(mine.term) : word, meaning, source).run();
  return true;
}
