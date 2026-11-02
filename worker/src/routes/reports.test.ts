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

type Q = { id: string; type: string };
const answers = (qs: Q[], right: boolean) => Object.fromEntries(qs.map((q) => [q.id, q.type === "number" ? (right ? 4 : 5) : [right ? "a" : "b"]]));

const ids: Record<string, string> = {};
let cookie = "";
let studentId = "";
let classId = "";

async function takeQuiz(lessonId: string, right: boolean) {
  const start = await json(await call(`/api/lessons/${lessonId}/quiz/start`, { method: "POST", body: {}, cookie }));
  await call(`/api/quiz/attempts/${start.attemptId}/submit`, { body: { answers: answers(start.questions, right), hintsUsed: [start.questions[0].id] }, cookie });
  return start.attemptId as string;
}

beforeAll(async () => {
  const today = new Date().toISOString().slice(0, 10);
  const dow = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7;
  const start = addDays(addDays(today, -dow), -7);
  classId = (await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Year 3" } }))).class.id;
  await call(`/api/admin/classes/${classId}/terms/generate`, { body: { startDate: start } });
  let courseId = "";
  for (const week of [1, 2]) {
    const r = await json<{ lesson: { lessonId: string; courseId: string } }>(await call("/api/admin/lessons/import", { body: { publish: true, file: lessonFixture({ slug: `maths-w${week}`, curriculum: { course: "maths-y3", semester: 1, week } }) } }));
    ids[`w${week}`] = r.lesson.lessonId;
    courseId = r.lesson.courseId;
  }
  await call("/api/admin/assignments", { body: { courseId, classId } });
  const creds = (await json<{ credentials: { id: string; username: string; password: string } }>(await call("/api/admin/students", { body: { displayName: "Ava", classIds: [classId] } }))).credentials;
  studentId = creds.id;
  cookie = ((await call("/api/login", { body: { username: creds.username, password: creds.password } })).headers.get("set-cookie") ?? "").split(";")[0] ?? "";

  ids.firstAttempt = await takeQuiz(ids.w2 as string, false); // graded, 0%
  await takeQuiz(ids.w2 as string, true); // graded, 100%
  await takeQuiz(ids.w1 as string, true); // an older week: practice, 100%
});

describe("student report", () => {
  it("counts graded attempts by default and keeps practice separate", async () => {
    const r = await json(await call(`/api/admin/reports/students/${studentId}`));
    expect(r.totals).toMatchObject({ gradedAttempts: 2, practiceAttempts: 1, averagePercent: 50, hintsUsed: 3 });
    expect(r.curve).toHaveLength(2);
    const w2 = r.lessons.find((l: { lessonId: string }) => l.lessonId === ids.w2);
    expect(w2).toMatchObject({ bestGraded: 100, bestPractice: null, attemptCount: 2 });
    const w1 = r.lessons.find((l: { lessonId: string }) => l.lessonId === ids.w1);
    expect(w1).toMatchObject({ bestGraded: null, bestPractice: 100 });
  });

  it("can include practice when asked", async () => {
    const r = await json(await call(`/api/admin/reports/students/${studentId}?includePractice=1`));
    expect(r.curve).toHaveLength(3);
    expect(r.totals.averagePercent).toBeCloseTo(66.7, 1);
  });

  it("lists the weakest skills and builds a semester report card", async () => {
    const r = await json(await call(`/api/admin/reports/students/${studentId}`));
    expect(r.weakestSkills[0]).toMatchObject({ percent: 50 });
    expect(r.reportCard).toEqual([{ subject: "maths", semester: 1, lessons: 1, lessonAverage: 100, examBest: null }]);
  });

  it("returns 404 for an unknown student", async () => {
    expect((await call("/api/admin/reports/students/nope")).status).toBe(404);
  });
});

describe("drill-down, class view and export", () => {
  it("shows exactly what was answered in an attempt, including the right answers", async () => {
    const r = await json(await call(`/api/admin/reports/attempts/${ids.firstAttempt}`));
    expect(r).toMatchObject({ percent: 0, passed: false, attempt: { mode: "graded", attemptNumber: 1 } });
    expect(r.questions).toHaveLength(2);
    expect(r.questions[0]).toHaveProperty("answer");
    expect(r.questions[0]).toHaveProperty("prompt");
    expect(r.questions.some((q: { usedHint: boolean }) => q.usedHint)).toBe(true);
  });

  it("summarises a class and finds the hardest questions", async () => {
    const r = await json(await call(`/api/admin/reports/classes/${classId}`));
    expect(r.students).toHaveLength(1);
    expect(r.students[0]).toMatchObject({ displayName: "Ava", gradedAttempts: 2 });
    expect(r.hardestQuestions[0]).toHaveProperty("prompt");
  });

  it("exports a CSV with a header row", async () => {
    const res = await call(`/api/admin/reports/students/${studentId}/export.csv`);
    expect(res.headers.get("content-type")).toContain("text/csv");
    const lines = (await res.text()).trim().split("\n");
    expect(lines[0]).toBe("submitted_at,what,kind,attempt,mode,score,max_score,percent,passed,seconds");
    expect(lines).toHaveLength(4);
  });

  it("is not available to a signed-in child", async () => {
    // The admin routes sit behind requireAdmin (Cloudflare Access); a child session alone is not enough in production.
    const res = await app.request(`/api/admin/reports/students/${studentId}`, { headers: { Cookie: cookie } }, { ...env, ENVIRONMENT: "production", DEV_ADMIN_EMAIL: undefined });
    expect([401, 403]).toContain(res.status);
  });
});

describe("admin overview", () => {
  it("summarises students, classes and recent quizzes for the dashboard", async () => {
    const res = await json(await call("/api/admin/overview"));
    expect(res.totals.activeStudents).toBeGreaterThanOrEqual(1);
    expect(res.totals.publishedLessons).toBe(2);
    expect(res.totals.attemptsThisWeek).toBe(3);
    expect(res.recent).toHaveLength(3);
    const year3 = res.classes.find((c: { name: string }) => c.name === "Year 3");
    expect(year3.hasCalendar).toBe(true);
    expect(year3.courses).toHaveLength(1);
    const ava = res.students.find((s: { id: string }) => s.id === studentId);
    expect(ava.gradedAttempts).toBe(2);
  });
});
