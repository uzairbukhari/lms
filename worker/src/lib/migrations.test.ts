import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { applyMigration, createTestDb } from "../../test/db";

// Real databases already hold quiz attempts when a migration runs; a table rebuild must not trip foreign keys.
describe("migration 0006 on a database that already has attempts", () => {
  let db: D1Database;
  let dispose: () => Promise<void>;
  beforeAll(async () => {
    ({ db, dispose } = await createTestDb({ only: (f) => f < "0006" }));
  });
  afterAll(async () => dispose());

  it("keeps every question and every attempt answer, and then accepts the new types", async () => {
    const run = (sql: string, ...b: unknown[]) => db.prepare(sql).bind(...b).run();
    await run("INSERT INTO users (id, role, display_name, username) VALUES ('u1', 'student', 'Ava', 'ava')");
    await run("INSERT INTO lessons (id, slug, subject_id, title, summary, age_band, difficulty, estimated_minutes, sort_order, status, current_version, content_json, source_json) VALUES ('l1', 'maths-x', 'maths', 'T', 'S', '7-8', 1, 10, 1, 'published', 1, '[]', '{}')");
    await run("INSERT INTO quizzes (id, kind, lesson_id, version, is_current, pass_percent) VALUES ('z1', 'lesson', 'l1', 1, 1, 70)");
    await run("INSERT INTO questions (id, quiz_id, ref, position, type, prompt, answer_json) VALUES ('q1', 'z1', 'q1', 1, 'number', 'p', '{\"value\":1}')");
    await run("INSERT INTO questions (id, quiz_id, ref, position, type, prompt, answer_json, source_question_id) VALUES ('q2', 'z1', 'e1', 2, 'number', 'p', '{\"value\":1}', 'q1')");
    await run("INSERT INTO quiz_attempts (id, user_id, quiz_id, lesson_id, scope_key, attempt_number, mode) VALUES ('a1', 'u1', 'z1', 'l1', 'l1', 1, 'graded')");
    await run("INSERT INTO attempt_answers (attempt_id, question_id, response_json, is_correct, points_awarded) VALUES ('a1', 'q1', '1', 1, 1)");
    await run("INSERT INTO ai_events (id, user_id, question_id, kind, model, response) VALUES ('e1', 'u1', 'q1', 'hint', 'm', 'r')");

    await applyMigration(db, "0006_more_question_types.sql");
    await applyMigration(db, "0007_approved_videos.sql");

    const count = async (t: string) => (await db.prepare(`SELECT COUNT(*) AS n FROM ${t}`).first<{ n: number }>())?.n;
    expect(await count("questions")).toBe(2);
    expect(await count("attempt_answers")).toBe(1);
    expect(await count("ai_events")).toBe(1);
    expect((await db.prepare("PRAGMA foreign_key_check").all()).results).toEqual([]);
    await run("INSERT INTO questions (id, quiz_id, ref, position, type, prompt, answer_json) VALUES ('q3', 'z1', 'q3', 3, 'slider', 'p', '{\"value\":1}')");
    await expect(run("INSERT INTO questions (id, quiz_id, ref, position, type, prompt, answer_json) VALUES ('q4', 'z1', 'q4', 4, 'nonsense', 'p', '{}')")).rejects.toThrow();
  });
});
