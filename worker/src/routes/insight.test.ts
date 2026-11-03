import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { describeResponse, flagFor } from "../lib/insights";
import { createTestEnv } from "../../test/db";
import { lessonFixture } from "../../test/fixtures";

let env: Bindings;
let dispose: () => Promise<void>;
beforeAll(async () => {
  ({ env, dispose } = await createTestEnv());
});
afterAll(async () => dispose());

async function call(path: string, opts: { body?: unknown; cookie?: string; method?: string; headers?: Record<string, string> } = {}) {
  const headers: Record<string, string> = { ...(opts.headers ?? {}) };
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";
  if (opts.cookie) headers["Cookie"] = opts.cookie;
  return app.request(path, { method: opts.method ?? (opts.body !== undefined ? "POST" : "GET"), headers, body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined }, env);
}
const json = async <T = Record<string, any>>(res: Response) => (await res.json()) as T;
const cookieOf = (res: Response) => (res.headers.get("set-cookie") ?? "").split(";")[0] ?? "";

describe("insight helpers", () => {
  it("turns option ids into wording", () => {
    const opts = JSON.stringify({ options: [{ id: "a", text: "A half" }, { id: "b", text: "A quarter" }] });
    expect(describeResponse('["b"]', opts)).toBe("A quarter");
    expect(describeResponse("5", null)).toBe("5");
  });
  it("flags questions most children miss", () => {
    expect(flagFor(1, 0, 1)).toBeNull();
    expect(flagFor(4, 25, 0.4)).toBe("hard");
    expect(flagFor(4, 0, 0.9)).toBe("unclear");
    expect(flagFor(4, 80, 1)).toBeNull();
  });
});

describe("AI log, flagging and the spend alert", () => {
  let lessonId = "";
  let cookie = "";
  let attempt = "";
  let numberQ = "";
  let studentId = "";

  beforeAll(async () => {
    const lesson = await json<{ lesson: { lessonId: string; courseId: string } }>(await call("/api/admin/lessons/import", { body: { publish: true, file: lessonFixture() } }));
    lessonId = lesson.lesson.lessonId;
    const cls = (await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Open" } }))).class.id;
    await call(`/api/admin/classes/${cls}`, { method: "PATCH", body: { visibilityMode: "all_published" } });
    await call("/api/admin/assignments", { body: { courseId: lesson.lesson.courseId, classId: cls } });
    const creds = (await json<{ credentials: { id: string; username: string; password: string } }>(await call("/api/admin/students", { body: { displayName: "Ava", classIds: [cls] } }))).credentials;
    studentId = creds.id;
    cookie = cookieOf(await call("/api/login", { body: { username: creds.username, password: creds.password } }));
    const start = await json(await call(`/api/lessons/${lessonId}/quiz/start`, { method: "POST", body: {}, cookie }));
    attempt = start.attemptId;
    numberQ = start.questions.find((q: { type: string }) => q.type === "number").id;
    env.AI = { run: async () => ({ response: "Think about how many equal pieces fit in a whole.", usage: { prompt_tokens: 100, completion_tokens: 20, total_tokens: 120 } }) } as unknown as Ai;
  });

  it("lists what the AI told a child and lets the parent mark a reply as bad", async () => {
    await call("/api/ai/hint", { body: { attemptId: attempt, questionId: numberQ }, cookie });
    const log = await json(await call("/api/admin/ai-log"));
    expect(log.events).toHaveLength(1);
    expect(log.events[0]).toMatchObject({ kind: "hint", childName: "Ava", flagged: false, response: expect.stringContaining("equal pieces") });
    expect(log.children).toEqual([expect.objectContaining({ name: "Ava" })]);

    const id = log.events[0].id as string;
    expect((await json(await call(`/api/admin/ai-log/${id}/flag`, { body: { flagged: true } }))).flagged).toBe(true);
    // The question now gets the stored hint, even though the model would answer.
    const after = await json(await call("/api/ai/hint", { body: { attemptId: attempt, questionId: numberQ }, cookie }));
    expect(after.source).toBe("static");
    expect((await json(await call("/api/admin/ai-log?flagged=1"))).events).toHaveLength(1);

    await call(`/api/admin/ai-log/${id}/flag`, { body: { flagged: false } });
    expect((await json(await call("/api/ai/hint", { body: { attemptId: attempt, questionId: numberQ }, cookie }))).source).toBe("ai");
    expect((await call("/api/admin/ai-log/nope/flag", { body: { flagged: true } })).status).toBe(404);
  });

  it("filters the log by child and kind", async () => {
    expect((await json(await call(`/api/admin/ai-log?child=${studentId}&kind=hint`))).events.length).toBeGreaterThan(0);
    expect((await json(await call("/api/admin/ai-log?kind=explain"))).events).toHaveLength(0);
  });

  it("shows how a question performs across children", async () => {
    const wrong = { [numberQ]: 9 };
    await call(`/api/quiz/attempts/${attempt}/submit`, { body: { answers: wrong }, cookie });
    const r = await json(await call(`/api/admin/insights/lessons/${lessonId}?includePractice=1`));
    const q = r.questions.find((x: { id: string }) => x.id === numberQ);
    expect(q).toMatchObject({ children: 1, firstTryPercent: 0, commonWrong: { answer: "9", count: 1 }, flag: null });
    expect((await call("/api/admin/insights/lessons/nope")).status).toBe(404);
    expect((await json(await call("/api/admin/insights"))).lessons[0]).toMatchObject({ id: lessonId });
  });

  it("warns on the dashboard once AI use passes the limit set in Settings", async () => {
    expect((await json(await call("/api/admin/settings/ai-alert"))).neurons).toBe(8000);
    const before = (await json(await call("/api/admin/overview"))).attention.filter((a: { kind: string }) => a.kind === "ai_spend");
    expect(before).toHaveLength(0);
    await call("/api/admin/settings/ai-alert", { method: "PUT", body: { neurons: 1 } });
    const after = (await json(await call("/api/admin/overview"))).attention.filter((a: { kind: string }) => a.kind === "ai_spend");
    expect(after).toHaveLength(1);
    await call("/api/admin/settings/ai-alert", { method: "PUT", body: { neurons: 0 } }); // 0 = off
    expect((await json(await call("/api/admin/overview"))).attention.some((a: { kind: string }) => a.kind === "ai_spend")).toBe(false);
    expect((await call("/api/admin/settings/ai-alert", { method: "PUT", body: { neurons: -5 } })).status).toBe(400);
  });
});

describe("sign-in history and the Turnstile check", () => {
  let studentId = "";
  let username = "";
  let password = "";

  beforeAll(async () => {
    const creds = (await json<{ credentials: { id: string; username: string; password: string } }>(await call("/api/admin/students", { body: { displayName: "Zara" } }))).credentials;
    ({ id: studentId, username, password } = creds);
  });

  it("records good and bad sign-ins for the parent, without passwords", async () => {
    await call("/api/login", { body: { username, password: "wrong" }, headers: { "CF-IPCountry": "PK", "User-Agent": "Mozilla/5.0 (iPad; CPU OS 17)" } });
    await call("/api/login", { body: { username, password }, headers: { "CF-IPCountry": "PK", "User-Agent": "Mozilla/5.0 (iPad; CPU OS 17)" } });
    const r = await json(await call(`/api/admin/students/${studentId}/logins`));
    expect(r.logins).toHaveLength(2);
    expect(r.logins.map((l: { ok: boolean }) => l.ok).sort()).toEqual([false, true]);
    expect(r.logins[0]).toMatchObject({ country: "PK", device: "iPad / tablet" });
    expect(r.failed24h).toBe(1);
    expect(JSON.stringify(r)).not.toContain("wrong");
  });

  it("flags repeated wrong passwords on the dashboard", async () => {
    for (let i = 0; i < 4; i++) await call("/api/login", { body: { username, password: "nope" }, headers: { "CF-Connecting-IP": "9.9.9.9" } });
    const att = (await json(await call("/api/admin/overview"))).attention.filter((a: { kind: string }) => a.kind === "sign_in_failures");
    expect(att.length).toBe(1);
    expect(att[0].message).toContain("Zara");
  });

  it("asks for a Turnstile check after three wrong passwords only when Turnstile is set up", async () => {
    // Not configured: the earlier failures never asked for a check.
    expect((await call("/api/login", { body: { username, password }, headers: { "CF-Connecting-IP": "9.9.9.9" } })).status).toBe(200);

    const env2 = await createTestEnv({ TURNSTILE_SITE_KEY: "site", TURNSTILE_SECRET: "secret" });
    try {
      const login = (body: object) => app.request("/api/login", { method: "POST", headers: { "Content-Type": "application/json", "CF-Connecting-IP": "8.8.8.8" }, body: JSON.stringify(body) }, env2.env);
      const made = await app.request("/api/admin/students", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ displayName: "Omar" }) }, env2.env);
      const c = (await made.json()) as { credentials: { username: string; password: string } };
      for (let i = 0; i < 3; i++) expect((await login({ username: c.credentials.username, password: "bad" })).status).toBe(401);
      const asked = await login({ username: c.credentials.username, password: c.credentials.password });
      expect(asked.status).toBe(403);
      expect(await asked.json()).toMatchObject({ error: "challenge_required", siteKey: "site" });
      // A token that fails verification (there is no network in tests) is treated as not verified.
      expect((await login({ username: c.credentials.username, password: c.credentials.password, turnstileToken: "x" })).status).toBe(403);
    } finally {
      await env2.dispose();
    }
  });
});
