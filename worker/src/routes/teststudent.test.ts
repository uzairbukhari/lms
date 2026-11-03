import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
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

describe("test student", () => {
  let classId = "";
  let testId = "";
  let cookie = "";
  const lessonIds: string[] = [];

  beforeAll(async () => {
    const today = new Date().toISOString().slice(0, 10);
    const monday = addDays(today, -((new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7));
    classId = (await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Year 3" } }))).class.id;
    await call(`/api/admin/classes/${classId}/terms/generate`, { body: { startDate: monday } }); // week 1 is now
    let courseId = "";
    for (const week of [1, 5]) {
      const r = await json<{ lesson: { lessonId: string; courseId: string } }>(await call("/api/admin/lessons/import", { body: { publish: true, file: lessonFixture({ slug: `t-w${week}`, curriculum: { course: "maths-y3", semester: 1, week } }) } }));
      lessonIds.push(r.lesson.lessonId);
      courseId = r.lesson.courseId;
    }
    await call("/api/admin/assignments", { body: { courseId, classId } });
    const created = await call("/api/admin/students/test", { method: "POST", body: {} });
    expect(created.status).toBe(201);
    const creds = (await json<{ credentials: { id: string; username: string; password: string } }>(created)).credentials;
    testId = creds.id;
    await call(`/api/admin/students/${testId}/classes`, { method: "PUT", body: { classIds: [classId] } });
    cookie = ((await call("/api/login", { body: { username: creds.username, password: creds.password } })).headers.get("set-cookie") ?? "").split(";")[0] ?? "";
  });

  const week = async () => {
    const home = await json<{ thisWeek: { id: string }[] }>(await call("/api/home", { cookie }));
    return home.thisWeek.map((l) => l.id);
  };

  it("allows only one test student and flags it", async () => {
    expect((await call("/api/admin/students/test", { method: "POST", body: {} })).status).toBe(409);
    const list = await json<{ students: { id: string; isTest: boolean }[] }>(await call("/api/admin/students"));
    expect(list.students.find((s) => s.id === testId)?.isTest).toBe(true);
  });

  it("lets the parent pick any week, and the child then sees that week", async () => {
    const before = await week();
    expect(before).toContain(lessonIds[0]);
    expect(before).not.toContain(lessonIds[1]);
    const set = await call(`/api/admin/students/${testId}/preview`, { method: "PUT", body: { semester: 1, week: 5 } });
    expect(set.status).toBe(200);
    expect((await json(set)).student.preview).toMatchObject({ semester: 1, week: 5 });
    const after = await week();
    expect(after).toContain(lessonIds[1]);
    await call(`/api/admin/students/${testId}/preview`, { method: "PUT", body: { clear: true } });
    const back = await week();
    expect(back).not.toContain(lessonIds[1]);
  });

  it("rejects a week preview for a real child", async () => {
    const kid = (await json<{ credentials: { id: string } }>(await call("/api/admin/students", { body: { displayName: "Ava", classIds: [classId] } }))).credentials;
    expect((await call(`/api/admin/students/${kid.id}/preview`, { method: "PUT", body: { semester: 1, week: 2 } })).status).toBe(404);
  });

  it("leaves the test student out of analytics, the week view and AI usage", async () => {
    const lessonId = lessonIds[0] as string;
    const started = await json<{ attemptId: string }>(await call(`/api/lessons/${lessonId}/quiz/start`, { method: "POST", body: {}, cookie }));
    expect(started.attemptId).toBeTruthy();
    await env.DB.prepare("UPDATE quiz_attempts SET status = 'submitted', percent = 100, submitted_at = datetime('now') WHERE user_id = ?").bind(testId).run();
    await env.DB.prepare("INSERT INTO ai_usage (id, kind, model, user_id, neurons) VALUES ('u1', 'hint', 'm', ?, 500)").bind(testId).run();

    const overview = await json<any>(await call("/api/admin/overview"));
    expect(overview.recent.some((r: any) => r.studentId === testId)).toBe(false);
    expect(overview.students.some((s: any) => s.id === testId)).toBe(false);
    expect(overview.classes.find((k: any) => k.id === classId).studentCount).toBe(1); // Ava only
    expect(overview.totals.activeStudents).toBe(1);

    const week = await json<{ students: { id: string }[] }>(await call("/api/admin/week"));
    expect(week.students.some((s) => s.id === testId)).toBe(false);

    const usage = await json<any>(await call("/api/admin/ai-usage"));
    expect(usage.totals.requests).toBe(0);
    const settings = await json<any>(await call("/api/admin/settings/ai-alert"));
    expect(settings.todayNeurons).toBe(0);
    const log = await json<any>(await call("/api/admin/ai-log"));
    expect(log.children.some((k: any) => k.id === testId)).toBe(false);
  });

  it("has every AI feature switched off", async () => {
    expect((await json<any>(await call("/api/me", { cookie }))).user.isTest).toBe(true);
    // Voice is refused even for text that is already stored.
    await env.ASSETS_BUCKET.put("tts/v1/x", "x");
    expect((await call("/api/ai/voice", { body: { text: "Hello there" }, cookie })).status).toBe(503);
    const started = await json<{ attemptId: string; questions: { id: string }[] }>(await call(`/api/lessons/${lessonIds[0]}/quiz/start`, { method: "POST", body: {}, cookie }));
    const hint = await json<{ source: string }>(await call("/api/ai/hint", { body: { attemptId: started.attemptId, questionId: started.questions[0]?.id }, cookie }));
    expect(hint.source).toBe("static");
  });
});
