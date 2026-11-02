import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTestDb } from "../test/db";

let db: D1Database;
let dispose: () => Promise<void>;

beforeAll(async () => {
  ({ db, dispose } = await createTestDb());
});
afterAll(async () => dispose());

describe("schema", () => {
  it("seeds the four subjects in order", async () => {
    const { results } = await db.prepare("SELECT id FROM subjects ORDER BY sort_order").all<{ id: string }>();
    expect(results.map((r) => r.id)).toEqual(["maths", "science", "data-ai", "general-knowledge"]);
  });

  it("numbers attempts uniquely per user and scope", async () => {
    await db.prepare("INSERT INTO users (id, role, username, display_name) VALUES ('u1','student','maya','Maya')").run();
    await db.prepare("INSERT INTO quizzes (id, version, kind) VALUES ('q1', 1, 'exam')").run();
    const insert = (id: string, n: number) =>
      db
        .prepare("INSERT INTO quiz_attempts (id, user_id, quiz_id, scope_key, attempt_number) VALUES (?, 'u1', 'q1', 'exam:x:1', ?)")
        .bind(id, n)
        .run();
    await insert("a1", 1);
    await insert("a2", 2);
    await expect(insert("a3", 2)).rejects.toThrow();
  });
});
