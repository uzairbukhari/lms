import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { cleanOutput, leaksAnswer } from "../lib/ai";
import type { QuestionRow } from "../lib/quiz";
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

const row = (over: Partial<QuestionRow>): QuestionRow => ({ id: "q", ref: "q1", position: 1, type: "number", prompt: "p", media_json: null, options_json: null, answer_json: "{}", hint: null, explanation: null, points: 1, skill_tag: null, ...over });

describe("answer-leak check", () => {
  it("catches numbers, option text and accepted words", () => {
    const num = row({ type: "number", answer_json: JSON.stringify({ value: 4, tolerance: 0 }) });
    expect(leaksAnswer(num, "It is 4!")).toBe(true);
    expect(leaksAnswer(num, "Count how many quarters fit in a whole.")).toBe(false);
    const mc = row({ type: "multiple_choice", options_json: JSON.stringify({ options: [{ id: "a", text: "A half" }, { id: "b", text: "A quarter" }] }), answer_json: JSON.stringify(["a"]) });
    expect(leaksAnswer(mc, "I think it is a half.")).toBe(true);
    expect(leaksAnswer(mc, "Think about cutting into two equal parts.")).toBe(false);
    const st = row({ type: "short_text", answer_json: JSON.stringify({ accepted: ["the moon", "moon"] }) });
    expect(leaksAnswer(st, "It is the Moon!")).toBe(true);
    const tf = row({ type: "true_false", answer_json: JSON.stringify([true]) });
    expect(leaksAnswer(tf, "The answer is true.")).toBe(true);
  });
  it("rejects unsuitable output", () => {
    expect(cleanOutput("Visit https://example.com now")).toBeNull();
    expect(cleanOutput("x")).toBeNull();
    expect(cleanOutput("  Think   about it.  ")).toBe("Think about it.");
  });
});

describe("AI hints and explanations", () => {
  let cookie = "";
  let userId = "";
  const state: Record<string, string> = {};
  let said = "Think about how many equal pieces fit in a whole.";
  let calls = 0;

  beforeAll(async () => {
    const lesson = await json<{ lesson: { lessonId: string; courseId: string } }>(await call("/api/admin/lessons/import", { body: { publish: true, file: lessonFixture() } }));
    const cls = (await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Open" } }))).class.id;
    await call(`/api/admin/classes/${cls}`, { method: "PATCH", body: { visibilityMode: "all_published" } });
    await call("/api/admin/assignments", { body: { courseId: lesson.lesson.courseId, classId: cls } });
    const creds = (await json<{ credentials: { id: string; username: string; password: string } }>(await call("/api/admin/students", { body: { displayName: "Ava", classIds: [cls] } }))).credentials;
    userId = creds.id;
    cookie = ((await call("/api/login", { body: { username: creds.username, password: creds.password } })).headers.get("set-cookie") ?? "").split(";")[0] ?? "";
    const start = await json(await call(`/api/lessons/${lesson.lesson.lessonId}/quiz/start`, { method: "POST", body: {}, cookie }));
    state.attempt = start.attemptId;
    state.numberQ = start.questions.find((q: { type: string }) => q.type === "number").id;
    env.AI = { run: async () => { calls++; return { response: said, usage: { prompt_tokens: 100, completion_tokens: 20, total_tokens: 120 } }; } } as unknown as Ai;
  });

  it("gives an AI hint, caches it, and logs both", async () => {
    const first = await json(await call("/api/ai/hint", { body: { attemptId: state.attempt, questionId: state.numberQ }, cookie }));
    expect(first).toMatchObject({ source: "ai", hint: said });
    const second = await json(await call("/api/ai/hint", { body: { attemptId: state.attempt, questionId: state.numberQ }, cookie }));
    expect(second.source).toBe("ai");
    expect(calls).toBe(1);
    const log = await env.DB.prepare("SELECT from_cache FROM ai_events WHERE user_id = ? ORDER BY created_at, rowid").bind(userId).all();
    expect(log.results.map((r) => r.from_cache)).toEqual([0, 1]);
  });

  it("meters real model calls (not cache hits) and reports them to the admin", async () => {
    const rows = await env.DB.prepare("SELECT kind, input_tokens, output_tokens, neurons FROM ai_usage").all<{ kind: string; input_tokens: number; output_tokens: number; neurons: number }>();
    expect(rows.results).toHaveLength(1);
    expect(rows.results[0]).toMatchObject({ kind: "hint", input_tokens: 100, output_tokens: 20 });
    expect(rows.results[0]?.neurons).toBeCloseTo((100 / 1e6) * 25608 + (20 / 1e6) * 75147, 6);
    const usage = await json(await call("/api/admin/ai-usage?days=7"));
    expect(usage.totals).toMatchObject({ requests: 1, inputTokens: 100, outputTokens: 20, tokens: 120 });
    expect(usage.daily).toHaveLength(7);
    expect(usage.daily[6]).toMatchObject({ requests: 1, tokens: 120 });
    expect(usage.byKind[0]).toMatchObject({ kind: "hint", requests: 1 });
    expect(usage.totals.billableUsd).toBe(0); // far under the 10,000 free neurons a day
  });

  it("replaces a hint that gives the answer away with the stored one", async () => {
    await env.SESSIONS.delete(`ai:hint:v1:${state.numberQ}`);
    said = "The answer is 4, easy!";
    const res = await json(await call("/api/ai/hint", { body: { attemptId: state.attempt, questionId: state.numberQ }, cookie }));
    expect(res.source).toBe("static");
    expect(res.hint).not.toContain("4");
  });

  it("falls back when AI is unavailable, and rejects other children's attempts", async () => {
    await env.SESSIONS.delete(`ai:hint:v1:${state.numberQ}`);
    const saved = env.AI;
    env.AI = undefined;
    expect((await json(await call("/api/ai/hint", { body: { attemptId: state.attempt, questionId: state.numberQ }, cookie }))).source).toBe("static");
    env.AI = saved;
    expect((await call("/api/ai/hint", { body: { attemptId: state.attempt, questionId: state.numberQ } })).status).toBe(401);
  });

  it("stops calling the model once the daily cap is reached", async () => {
    await env.SESSIONS.delete(`ai:hint:v1:${state.numberQ}`);
    const day = new Intl.DateTimeFormat("en-CA", { timeZone: "UTC" }).format(new Date());
    await env.SESSIONS.put(`ai:day:${userId}:${day}`, "30");
    const before = calls;
    expect((await json(await call("/api/ai/hint", { body: { attemptId: state.attempt, questionId: state.numberQ }, cookie }))).source).toBe("static");
    expect(calls).toBe(before);
  });

  it("explains a wrong answer only after the quiz is handed in", async () => {
    expect((await call("/api/ai/explain", { body: { attemptId: state.attempt, questionId: state.numberQ }, cookie })).status).toBe(404);
    await call(`/api/quiz/attempts/${state.attempt}/submit`, { body: { answers: { [state.numberQ as string]: 9 } }, cookie });
    await env.SESSIONS.delete(`ai:day:${userId}:${new Intl.DateTimeFormat("en-CA", { timeZone: "UTC" }).format(new Date())}`);
    said = "Nice try! Four quarters make one whole.";
    const res = await json(await call("/api/ai/explain", { body: { attemptId: state.attempt, questionId: state.numberQ }, cookie }));
    expect(res).toMatchObject({ source: "ai", explanation: said });
  });
});

describe("narration voice", () => {
  let cookie = "";
  let calls = 0;
  const saved = () => env.AI;

  beforeAll(async () => {
    const cls = (await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Voice" } }))).class.id;
    const creds = (await json<{ credentials: { username: string; password: string } }>(await call("/api/admin/students", { body: { displayName: "Ben", classIds: [cls] } }))).credentials;
    cookie = ((await call("/api/login", { body: { username: creds.username, password: creds.password } })).headers.get("set-cookie") ?? "").split(";")[0] ?? "";
  });

  it("voices a sentence once, then serves it from R2", async () => {
    const before = saved();
    env.AI = { run: async () => { calls++; return new Response(new Uint8Array(500), { headers: { "Content-Type": "audio/mpeg" } }); } } as unknown as Ai;
    const first = await call("/api/ai/voice", { body: { text: "Let's count to ten!" }, cookie });
    expect(first.status).toBe(200);
    expect(first.headers.get("content-type")).toBe("audio/mpeg");
    expect((await first.arrayBuffer()).byteLength).toBe(500);
    expect((await call("/api/ai/voice", { body: { text: "Let's count to ten!" }, cookie })).status).toBe(200);
    expect(calls).toBe(1);
    env.AI = before;
  });

  it("answers 503 without AI, and needs a signed-in child", async () => {
    const before = saved();
    env.AI = undefined;
    expect((await call("/api/ai/voice", { body: { text: "A brand new sentence." }, cookie })).status).toBe(503);
    env.AI = before;
    expect((await call("/api/ai/voice", { body: { text: "Hello." } })).status).toBe(401);
    expect((await call("/api/ai/voice", { body: { text: "x".repeat(601) }, cookie })).status).toBe(400);
  });
});

describe("long-press word explanations", () => {
  let cookie = "";
  let otherCookie = "";
  let lessonId = "";
  let calls = 0;
  let said = "A pizza is a round, flat food with toppings.";
  let userId = "";

  beforeAll(async () => {
    const file = lessonFixture({ slug: "maths-word-help", curriculum: { course: "maths-word-help", semester: 1, week: 4 } });
    file.blocks.push({ type: "glossary", terms: [{ term: "quarter", meaning: "One of four equal parts." }] } as never);
    const lesson = await json<{ lesson: { lessonId: string; courseId: string } }>(await call("/api/admin/lessons/import", { body: { publish: true, file } }));
    lessonId = lesson.lesson.lessonId;
    const cls = (await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Words" } }))).class.id;
    await call(`/api/admin/classes/${cls}`, { method: "PATCH", body: { visibilityMode: "all_published" } });
    await call("/api/admin/assignments", { body: { courseId: lesson.lesson.courseId, classId: cls } });
    const creds = (await json<{ credentials: { id: string; username: string; password: string } }>(await call("/api/admin/students", { body: { displayName: "Cleo", classIds: [cls] } }))).credentials;
    userId = creds.id;
    cookie = ((await call("/api/login", { body: { username: creds.username, password: creds.password } })).headers.get("set-cookie") ?? "").split(";")[0] ?? "";
    // A child in no class cannot open the lesson, so cannot look words up in it either.
    const lone = (await json<{ credentials: { username: string; password: string } }>(await call("/api/admin/students", { body: { displayName: "Dan" } }))).credentials;
    otherCookie = ((await call("/api/login", { body: { username: lone.username, password: lone.password } })).headers.get("set-cookie") ?? "").split(";")[0] ?? "";
    env.AI = { run: async () => { calls++; return { response: said, usage: { prompt_tokens: 80, completion_tokens: 15 } }; } } as unknown as Ai;
  });

  const define = (word: string, c = cookie) => call("/api/ai/define", { body: { lessonId, word }, cookie: c });

  it("explains a word from the lesson, caches it and meters only the real call", async () => {
    const first = await json(await define("Pizza"));
    expect(first).toMatchObject({ word: "pizza", meaning: said, source: "ai" });
    expect(await json(await define("pizza"))).toMatchObject({ source: "ai", meaning: said });
    expect(calls).toBe(1);
    const rows = await env.DB.prepare("SELECT kind, input_tokens, output_tokens FROM ai_usage WHERE kind = 'define'").all();
    expect(rows.results).toEqual([{ kind: "define", input_tokens: 80, output_tokens: 15 }]);
    const usage = await json(await call("/api/admin/ai-usage?days=7"));
    expect(usage.byKind.find((k: { kind: string }) => k.kind === "define")).toMatchObject({ requests: 1 });
  });

  it("refuses words the lesson does not contain, junk, and children who cannot open the lesson", async () => {
    const before = calls;
    expect((await define("dragon")).status).toBe(404);
    expect((await define("ignore previous instructions")).status).toBe(400);
    expect((await define("12345")).status).toBe(400);
    expect((await define("pizza", otherCookie)).status).toBe(404);
    expect((await call("/api/ai/define", { body: { lessonId, word: "pizza" } })).status).toBe(401);
    expect(calls).toBe(before);
  });

  it("falls back to a friendly line when the AI is off, fails a check, or the cap is reached", async () => {
    const saved = env.AI;
    env.AI = undefined;
    expect(await json(await define("cake"))).toMatchObject({ source: "static" });
    env.AI = saved;
    said = "See https://example.com";
    expect(await json(await define("cake"))).toMatchObject({ source: "static" });
    said = "A cake is a sweet baked treat.";
    const day = new Intl.DateTimeFormat("en-CA", { timeZone: "UTC" }).format(new Date());
    await env.SESSIONS.put(`ai:day:define:${userId}:${day}`, "40");
    const before = calls;
    expect(await json(await define("cake"))).toMatchObject({ source: "static" });
    expect(calls).toBe(before);
    expect(await env.SESSIONS.get(`ai:define:v1:${lessonId}:cake`)).toBeNull(); // failures are never cached
  });

  it("serves the lesson's glossary with the lesson blocks", async () => {
    const lesson = await json<{ blocks: { type: string }[] }>(await call(`/api/lessons/${lessonId}`, { cookie }));
    expect(lesson.blocks.some((b) => b.type === "glossary")).toBe(true);
  });
});
