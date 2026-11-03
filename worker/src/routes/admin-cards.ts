import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../env";
import { fail, parseBody } from "../lib/http";

/** Parent side of flashcards: spots children flagged as confusing, and decks the parent makes. Mounted under /api/admin. */
export const adminCardRoutes = new Hono<AppEnv>();

adminCardRoutes.get("/stuck", async (c) => {
  const { results } = await c.env.DB
    .prepare(
      `SELECT f.id, f.status, f.slide, f.created_at AS createdAt, u.id AS childId, u.display_name AS childName, l.id AS lessonId, l.title AS lesson, l.subject_id AS subject, q.prompt AS question
         FROM stuck_flags f JOIN users u ON u.id = f.user_id JOIN lessons l ON l.id = f.lesson_id LEFT JOIN questions q ON q.id = f.question_id
       WHERE u.is_test = 0
        ORDER BY (f.status = 'open') DESC, f.created_at DESC LIMIT 200`,
    )
    .all();
  return c.json({ flags: results });
});

adminCardRoutes.post("/stuck/:id/done", async (c) => {
  const { done } = await parseBody(c, z.object({ done: z.boolean() }));
  const res = await c.env.DB.prepare("UPDATE stuck_flags SET status = ? WHERE id = ?").bind(done ? "done" : "open", c.req.param("id")).run();
  return res.meta.changes ? c.json({ ok: true }) : fail(c, 404, "not_found");
});

const deckSchema = z.object({
  title: z.string().trim().min(1).max(80),
  subjectId: z.string().max(40).nullable().optional(),
  /** One card per line: front | back (optionally front | back | emoji). */
  pairs: z.string().max(20_000),
  classIds: z.array(z.string()).max(20).default([]),
  userIds: z.array(z.string()).max(50).default([]),
});

export function parsePairs(text: string): { front: string; back: string; emoji: string | null }[] {
  return text
    .split("\n")
    .map((line) => line.split("|").map((p) => p.trim()))
    .filter((p) => p.length >= 2 && p[0] && p[1])
    .map((p) => ({ front: (p[0] as string).slice(0, 200), back: (p[1] as string).slice(0, 300), emoji: p[2] ? (p[2] as string).slice(0, 8) : null }));
}

adminCardRoutes.get("/decks", async (c) => {
  const { results } = await c.env.DB
    .prepare("SELECT d.id, d.title, d.subject_id AS subject, d.created_at AS createdAt, (SELECT COUNT(*) FROM cards c WHERE c.deck_id = d.id) AS cardCount FROM decks d ORDER BY d.created_at DESC")
    .all();
  const assigned = await c.env.DB
    .prepare("SELECT a.deck_id AS deckId, COALESCE(cl.name, u.display_name) AS name FROM deck_assignments a LEFT JOIN classes cl ON cl.id = a.class_id LEFT JOIN users u ON u.id = a.user_id")
    .all<{ deckId: string; name: string }>();
  return c.json({ decks: (results as { id: string }[]).map((d) => ({ ...d, assignedTo: assigned.results.filter((a) => a.deckId === d.id).map((a) => a.name) })) });
});

adminCardRoutes.get("/decks/:id", async (c) => {
  const deck = await c.env.DB.prepare("SELECT id, title FROM decks WHERE id = ?").bind(c.req.param("id")).first<{ id: string; title: string }>();
  if (!deck) return fail(c, 404, "not_found");
  const { results } = await c.env.DB.prepare("SELECT front, back, emoji FROM cards WHERE deck_id = ? ORDER BY id").bind(deck.id).all();
  return c.json({ deck, cards: results });
});

adminCardRoutes.post("/decks", async (c) => {
  const body = await parseBody(c, deckSchema);
  const pairs = parsePairs(body.pairs);
  if (pairs.length === 0) return fail(c, 400, "no_cards", "Type one card per line like: front | back");
  if (pairs.length > 300) return fail(c, 400, "too_many", "A deck can have up to 300 cards.");
  const id = crypto.randomUUID();
  const db = c.env.DB;
  const stmts = [
    db.prepare("INSERT INTO decks (id, title, subject_id) VALUES (?, ?, ?)").bind(id, body.title, body.subjectId ?? null),
    ...pairs.map((p, i) => db.prepare("INSERT INTO cards (id, source, front, back, emoji, subject_id, deck_id) VALUES (?, 'deck', ?, ?, ?, ?, ?)").bind(`d:${id}:${i + 1}`, p.front, p.back, p.emoji, body.subjectId ?? null, id)),
    ...body.classIds.map((cid) => db.prepare("INSERT INTO deck_assignments (deck_id, class_id) VALUES (?, ?)").bind(id, cid)),
    ...body.userIds.map((uid) => db.prepare("INSERT INTO deck_assignments (deck_id, user_id) VALUES (?, ?)").bind(id, uid)),
  ];
  for (let i = 0; i < stmts.length; i += 90) await db.batch(stmts.slice(i, i + 90));
  return c.json({ id, cards: pairs.length }, 201);
});

adminCardRoutes.delete("/decks/:id", async (c) => {
  const id = c.req.param("id");
  const db = c.env.DB;
  await db.batch([
    db.prepare("DELETE FROM card_reviews WHERE card_id IN (SELECT id FROM cards WHERE deck_id = ?)").bind(id),
    db.prepare("DELETE FROM cards WHERE deck_id = ?").bind(id),
    db.prepare("DELETE FROM deck_assignments WHERE deck_id = ?").bind(id),
    db.prepare("DELETE FROM decks WHERE id = ?").bind(id),
  ]);
  return c.json({ ok: true });
});
