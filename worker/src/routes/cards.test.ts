import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { parsePairs } from "./admin-cards";
import { addDays } from "../lib/terms";
import { createTestEnv } from "../../test/db";
import { lessonFixture } from "../../test/fixtures";

let env: Bindings;
let dispose: () => Promise<void>;
beforeAll(async () => {
  ({ env, dispose } = await createTestEnv());
});
afterAll(async () => dispose());

async function call(path: string, opts: { body?: unknown; cookie?: string; method?: string } = {}) {
  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";
  if (opts.cookie) headers["Cookie"] = opts.cookie;
  return app.request(path, { method: opts.method ?? (opts.body !== undefined ? "POST" : "GET"), headers, body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined }, env);
}
const json = async <T = Record<string, any>>(res: Response) => (await res.json()) as T;
const today = () => new Date().toISOString().slice(0, 10);

const TERMS = [
  { term: "pizza", meaning: "A round food cut into slices." },
  { term: "halves", meaning: "Two equal parts of a whole." },
  { term: "equal", meaning: "The same size." },
  { term: "quarters", meaning: "Four equal parts of a whole." },
];

describe("parsePairs", () => {
  it("reads one card per line and ignores broken lines", () => {
    expect(parsePairs("7 x 8 | 56\nbad line\n  cat | Kitten | 🐱 \n | no front")).toEqual([
      { front: "7 x 8", back: "56", emoji: null },
      { front: "cat", back: "Kitten", emoji: "🐱" },
    ]);
  });
});

describe("flashcards, boost round, word book, revision and stuck", () => {
  let lessonId = "";
  let classId = "";
  let childId = "";
  let cookie = "";
  let wrongAttempt = "";

  beforeAll(async () => {
    const dow = (new Date(`${today()}T00:00:00Z`).getUTCDay() + 6) % 7;
    classId = (await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Class 4" } }))).class.id;
    await call(`/api/admin/classes/${classId}/terms/generate`, { body: { startDate: addDays(addDays(today(), -dow), -7) } });
    const file = lessonFixture({ slug: "maths-w2", curriculum: { course: "maths-y4", semester: 1, week: 2 } }) as { blocks: unknown[] };
    file.blocks.push({ type: "glossary", terms: TERMS });
    const r = await json<{ lesson: { lessonId: string; courseId: string } }>(await call("/api/admin/lessons/import", { body: { publish: true, file } }));
    lessonId = r.lesson.lessonId;
    await call("/api/admin/assignments", { body: { courseId: r.lesson.courseId, classId } });
    const creds = (await json<{ credentials: { id: string; username: string; password: string } }>(await call("/api/admin/students", { body: { displayName: "Fatima", classIds: [classId] } }))).credentials;
    childId = creds.id;
    cookie = ((await call("/api/login", { body: { username: creds.username, password: creds.password } })).headers.get("set-cookie") ?? "").split(";")[0] ?? "";
  });

  it("needs a signed-in child", async () => {
    expect((await call("/api/cards/summary")).status).toBe(401);
    expect((await call("/api/stuck", { body: { lessonId } })).status).toBe(401);
  });

  it("makes word cards only from lessons the child has opened, three new ones a day", async () => {
    expect((await json(await call("/api/cards/summary", { cookie }))).daily).toBe(0);
    await call(`/api/lessons/${lessonId}/progress`, { method: "PUT", body: { lastBlock: 1 }, cookie });
    expect((await json(await call("/api/cards/summary", { cookie }))).daily).toBe(3);
    const deck = await json(await call("/api/cards/deck?kind=daily", { cookie }));
    expect(deck.cards).toHaveLength(3);
    expect(deck.cards.every((c: { mode: string }) => c.mode === "flip")).toBe(true);
    expect(deck.cards[0]).toHaveProperty("back");
  });

  it("moves a word card up when she knows it and back to level 1 when she does not", async () => {
    const deck = await json(await call("/api/cards/deck?kind=daily", { cookie }));
    const [a, b, c] = deck.cards as { id: string }[];
    const right = await json(await call("/api/cards/answer", { body: { cardId: a?.id, gotIt: true }, cookie }));
    expect(right).toMatchObject({ correct: true, box: 1, due: addDays(today(), 1) });
    const wrong = await json(await call("/api/cards/answer", { body: { cardId: b?.id, gotIt: false }, cookie }));
    expect(wrong).toMatchObject({ correct: false, box: 1 });
    await call("/api/cards/answer", { body: { cardId: c?.id, gotIt: true }, cookie });
    expect((await call("/api/cards/answer", { body: { cardId: "nope", gotIt: true }, cookie })).status).toBe(404);
  });

  it("only passes level 3 with an answer the app checks", async () => {
    const id = `g:${lessonId}:pizza`;
    await env.DB.prepare("UPDATE card_reviews SET box = 3, due = ?, seen = 1 WHERE user_id = ? AND card_id = ?").bind(today(), childId, id).run();
    const deck = await json(await call("/api/cards/deck?kind=daily", { cookie }));
    const card = deck.cards.find((c: { id: string }) => c.id === id);
    expect(card).toMatchObject({ mode: "choose" });
    expect(card.options).toHaveLength(4);
    expect(card).not.toHaveProperty("back");

    expect(await json(await call("/api/cards/answer", { body: { cardId: id, gotIt: true }, cookie }))).toMatchObject({ box: 3 }); // "got it" alone stays at 3
    expect(await json(await call("/api/cards/answer", { body: { cardId: id, choice: "The same size." }, cookie }))).toMatchObject({ correct: false, box: 1 });
    await env.DB.prepare("UPDATE card_reviews SET box = 3 WHERE user_id = ? AND card_id = ?").bind(childId, id).run();
    expect(await json(await call("/api/cards/answer", { body: { cardId: id, choice: TERMS[0]?.meaning }, cookie }))).toMatchObject({ correct: true, box: 4, answer: TERMS[0]?.meaning });
  });

  it("gives a few points for finishing the day's cards, once", async () => {
    const first = await json(await call("/api/cards/finish", { body: { kind: "daily" }, cookie }));
    expect(first.points).toBeGreaterThanOrEqual(2);
    expect(first.already).toBe(false);
    expect(await json(await call("/api/cards/finish", { body: { kind: "daily" }, cookie }))).toMatchObject({ points: 0, already: true });
    expect((await json(await call("/api/cards/summary", { cookie }))).dailyDone).toBe(true);
    const row = await env.DB.prepare("SELECT SUM(points) AS n FROM card_days WHERE user_id = ?").bind(childId).first<{ n: number }>();
    expect(row?.n).toBe(first.points);
  });

  it("brings back a missed quiz question in the Boost round, graded by the server", async () => {
    const start = await json(await call(`/api/lessons/${lessonId}/quiz/start`, { method: "POST", body: {}, cookie }));
    wrongAttempt = start.attemptId;
    const numberQ = start.questions.find((q: { type: string }) => q.type === "number").id as string;
    const choiceQ = start.questions.find((q: { type: string }) => q.type === "multiple_choice").id as string;
    await call(`/api/quiz/attempts/${wrongAttempt}/submit`, { body: { answers: { [numberQ]: 9, [choiceQ]: ["a"] } }, cookie }); // only the number question is wrong

    expect((await json(await call("/api/cards/deck?kind=boost", { cookie }))).cards).toHaveLength(0); // comes back 3 days later
    const card = await env.DB.prepare("SELECT card_id, due FROM card_reviews WHERE user_id = ? AND card_id LIKE 'q:%'").bind(childId).first<{ card_id: string; due: string }>();
    expect(card?.due).toBe(addDays(today(), 3));

    await env.DB.prepare("UPDATE card_reviews SET due = ? WHERE user_id = ? AND card_id = ?").bind(today(), childId, card?.card_id).run();
    const deck = await json(await call("/api/cards/deck?kind=boost", { cookie }));
    expect(deck.cards).toHaveLength(1);
    expect(deck.cards[0]).toMatchObject({ mode: "question", source: "question" });
    expect(JSON.stringify(deck.cards[0])).not.toContain("answer");

    const miss = await json(await call("/api/cards/answer", { body: { cardId: card?.card_id, response: 5 }, cookie }));
    expect(miss).toMatchObject({ correct: false, box: 1, answer: "4", due: addDays(today(), 3) });
    const hit = await json(await call("/api/cards/answer", { body: { cardId: card?.card_id, response: 4 }, cookie }));
    expect(hit).toMatchObject({ correct: true, box: 2, due: addDays(today(), 14) });
  });

  it("keeps pressed words in the Word Book, with the lesson's own meaning", async () => {
    expect((await json(await call("/api/words", { body: { lessonId, word: "Pizza" }, cookie }))).saved).toBe(true);
    expect((await json(await call("/api/words", { body: { lessonId, word: "zebra" }, cookie }))).saved).toBe(false); // not in the lesson
    expect((await call("/api/words", { body: { lessonId: "nope", word: "pizza" }, cookie })).status).toBe(200);
    const book = await json(await call("/api/words", { cookie }));
    expect(book.words).toEqual([expect.objectContaining({ word: "pizza", meaning: TERMS[0]?.meaning, source: "lesson", subject: "maths" })]);
    const deck = await json(await call("/api/cards/deck?kind=words", { cookie }));
    expect(deck.cards.map((c: { id: string }) => c.id)).toEqual([`g:${lessonId}:pizza`]);
  });

  it("builds an exam revision pack from the semester's words and missed questions", async () => {
    const r = await json(await call("/api/revision?semester=1", { cookie }));
    expect(r.subjects).toHaveLength(1);
    expect(r.subjects[0].words.map((w: { term: string }) => w.term)).toEqual(expect.arrayContaining(["pizza", "halves"]));
    expect(r.subjects[0].questions[0]).toMatchObject({ answer: "4" });
    expect((await json(await call("/api/revision?semester=3", { cookie }))).subjects).toEqual([]);
  });

  it("lets a child flag a confusing spot once, and the parent sees and clears it", async () => {
    expect((await call("/api/stuck", { body: { lessonId: "nope" }, cookie })).status).toBe(404);
    expect((await call("/api/stuck", { body: { lessonId, slide: 2 }, cookie })).status).toBe(200);
    await call("/api/stuck", { body: { lessonId, slide: 2 }, cookie });
    const list = await json(await call("/api/admin/stuck"));
    expect(list.flags).toHaveLength(1);
    expect(list.flags[0]).toMatchObject({ childName: "Fatima", slide: 2, status: "open" });
    expect((await json(await call("/api/admin/overview"))).attention.some((a: { kind: string }) => a.kind === "stuck")).toBe(true);
    await call(`/api/admin/stuck/${list.flags[0].id}/done`, { body: { done: true } });
    expect((await json(await call("/api/admin/overview"))).attention.some((a: { kind: string }) => a.kind === "stuck")).toBe(false);
  });

  it("gives the child a deck the parent made, and removes it again", async () => {
    expect((await call("/api/admin/decks", { body: { title: "Empty", pairs: "nothing here" } })).status).toBe(400);
    const made = await json(await call("/api/admin/decks", { body: { title: "Times tables", subjectId: "maths", pairs: "7 x 8 | 56\n6 x 9 | 54\n3 x 4 | 12", classIds: [classId] } }));
    expect(made.cards).toBe(3);
    expect((await json(await call("/api/admin/decks"))).decks[0]).toMatchObject({ title: "Times tables", cardCount: 3, assignedTo: ["Class 4"] });
    const deck = await json(await call("/api/cards/deck?kind=daily", { cookie }));
    expect(deck.cards.some((c: { source: string; front: string }) => c.source === "deck" && c.front === "7 x 8")).toBe(true);
    await call(`/api/admin/decks/${made.id}`, { method: "DELETE" });
    expect((await json(await call("/api/admin/decks"))).decks).toHaveLength(0);
    expect((await json(await call("/api/cards/deck?kind=daily", { cookie }))).cards.some((c: { source: string }) => c.source === "deck")).toBe(false);
  });

  it("is removed with the child", async () => {
    expect((await call(`/api/admin/students/${childId}`, { method: "DELETE" })).status).toBe(200);
    const left = await env.DB.prepare("SELECT (SELECT COUNT(*) FROM card_reviews) + (SELECT COUNT(*) FROM word_book) + (SELECT COUNT(*) FROM card_days) + (SELECT COUNT(*) FROM stuck_flags) AS n").first<{ n: number }>();
    expect(left?.n).toBe(0);
  });
});
