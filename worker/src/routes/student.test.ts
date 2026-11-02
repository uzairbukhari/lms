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

async function call(path: string, opts: { method?: string; body?: unknown; cookie?: string } = {}) {
  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";
  if (opts.cookie) headers["Cookie"] = opts.cookie;
  return app.request(
    path,
    { method: opts.method ?? (opts.body !== undefined ? "POST" : "GET"), headers, body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined },
    env,
  );
}
const json = async <T = Record<string, any>>(res: Response) => (await res.json()) as T;

async function loginAs(displayName: string, classIds?: string[]) {
  const creds = (await json<{ credentials: { id: string; username: string; password: string } }>(await call("/api/admin/students", { body: { displayName, classIds } }))).credentials;
  const res = await call("/api/login", { body: { username: creds.username, password: creds.password } });
  return { id: creds.id, cookie: (res.headers.get("set-cookie") ?? "").split(";")[0] ?? "" };
}

const ids: Record<string, string> = {};
let classId = "";
let courseId = "";
let ava: { id: string; cookie: string };

beforeAll(async () => {
  // Today is week 2 of semester 1: week 1 is last week, week 3 is next week.
  const today = new Date().toISOString().slice(0, 10);
  const dow = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7; // Monday = 0
  const thisMonday = addDays(today, -dow);
  const start = addDays(thisMonday, -7);

  const cls = await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Year 3" } }));
  classId = cls.class.id;
  expect((await call(`/api/admin/classes/${classId}/terms/generate`, { body: { startDate: start } })).status).toBe(200);

  for (const week of [1, 2, 3]) {
    const r = await json<{ lesson: { lessonId: string; courseId: string } }>(
      await call("/api/admin/lessons/import", {
        body: { publish: true, file: lessonFixture({ slug: `maths-lesson-w${week}`, curriculum: { course: "maths-y3", semester: 1, week } }) },
      }),
    );
    ids[`w${week}`] = r.lesson.lessonId;
    courseId = r.lesson.courseId;
  }
  // A draft lesson in the current week must stay hidden.
  const draft = await json<{ lesson: { lessonId: string } }>(
    await call("/api/admin/lessons/import", { body: { file: lessonFixture({ slug: "science-draft", subject: "science", curriculum: { course: "maths-y3", semester: 1, week: 2 } }) } }),
  );
  ids.draft = draft.lesson.lessonId;

  expect((await call("/api/admin/assignments", { body: { courseId, classId } })).status).toBe(201);
  ava = await loginAs("Ava", [classId]);
});

describe("what a child can see", () => {
  it("requires a signed-in student", async () => {
    expect((await call("/api/home")).status).toBe(401);
  });

  it("shows this week's lessons and past weeks, and hides future weeks and drafts", async () => {
    const home = await json<{ thisWeek: { id: string }[]; lookBack: { id: string }[]; early: unknown[] }>(await call("/api/home", { cookie: ava.cookie }));
    expect(home.thisWeek.map((l) => l.id)).toEqual([ids.w2]);
    expect(home.lookBack.map((l) => l.id)).toEqual([ids.w1]);
    expect(home.early).toEqual([]);
  });

  it("refuses a future-week or draft lesson with 404", async () => {
    expect((await call(`/api/lessons/${ids.w3}`, { cookie: ava.cookie })).status).toBe(404);
    expect((await call(`/api/lessons/${ids.draft}`, { cookie: ava.cookie })).status).toBe(404);
    expect((await call(`/api/lessons/${ids.w3}/progress`, { method: "PUT", body: { lastBlock: 1 }, cookie: ava.cookie })).status).toBe(404);
  });

  it("opens this week's lesson for doing, and a past lesson read-only", async () => {
    const now = await json<{ lesson: { phase: string }; readOnly: boolean; blocks: unknown[]; quiz: { questionCount: number } }>(await call(`/api/lessons/${ids.w2}`, { cookie: ava.cookie }));
    expect(now).toMatchObject({ readOnly: false, lesson: { phase: "current" }, quiz: { questionCount: 2 } });
    expect(now.blocks.length).toBeGreaterThan(0);
    const past = await json<{ readOnly: boolean }>(await call(`/api/lessons/${ids.w1}`, { cookie: ava.cookie }));
    expect(past.readOnly).toBe(true);
  });

  it("never sends quiz answers in the lesson payload", async () => {
    const text = await (await call(`/api/lessons/${ids.w2}`, { cookie: ava.cookie })).text();
    expect(text).not.toContain("Two equal parts, one shaded");
  });

  it("does not show anything to a student with no class or assignment", async () => {
    const loner = await loginAs("Loner");
    const home = await json<{ thisWeek: unknown[]; lookBack: unknown[] }>(await call("/api/home", { cookie: loner.cookie }));
    expect(home.thisWeek).toEqual([]);
    expect(home.lookBack).toEqual([]);
    expect((await call(`/api/lessons/${ids.w2}`, { cookie: loner.cookie })).status).toBe(404);
  });

  it("opens a future week when the parent unlocks it early", async () => {
    expect((await call("/api/admin/unlocks", { body: { courseId, semester: 1, week: 3, classId } })).status).toBe(201);
    const home = await json<{ early: { id: string }[] }>(await call("/api/home", { cookie: ava.cookie }));
    expect(home.early.map((l) => l.id)).toEqual([ids.w3]);
    expect((await call(`/api/lessons/${ids.w3}`, { cookie: ava.cookie })).status).toBe(200);
  });

  it("opens every published lesson when the class is set to all_published", async () => {
    const other = await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Open" } }));
    await call(`/api/admin/classes/${other.class.id}`, { method: "PATCH", body: { visibilityMode: "all_published" } });
    await call("/api/admin/assignments", { body: { courseId, classId: other.class.id } });
    const kid = await loginAs("Kit", [other.class.id]);
    const home = await json<{ open: { id: string }[] }>(await call("/api/home", { cookie: kid.cookie }));
    expect(home.open.map((l) => l.id).sort()).toEqual([ids.w1, ids.w2, ids.w3].sort());
  });
});

describe("progress", () => {
  it("records progress, and a completed lesson is not changed by revisiting", async () => {
    expect((await call(`/api/lessons/${ids.w1}/progress`, { method: "PUT", body: { lastBlock: 3, completed: true }, cookie: ava.cookie })).status).toBe(200);
    const again = await json<{ unchanged?: boolean }>(await call(`/api/lessons/${ids.w1}/progress`, { method: "PUT", body: { lastBlock: 0, addSeconds: 60 }, cookie: ava.cookie }));
    expect(again.unchanged).toBe(true);
    const row = await env.DB.prepare("SELECT status, last_block, time_spent_sec FROM lesson_progress WHERE user_id = ? AND lesson_id = ?").bind(ava.id, ids.w1).first();
    expect(row).toMatchObject({ status: "completed", last_block: 3, time_spent_sec: 0 });
  });

  it("tracks a lesson in progress", async () => {
    await call(`/api/lessons/${ids.w2}/progress`, { method: "PUT", body: { lastBlock: 2, addSeconds: 30 }, cookie: ava.cookie });
    const home = await json<{ thisWeek: { progress: { status: string; lastBlock: number } }[] }>(await call("/api/home", { cookie: ava.cookie }));
    expect(home.thisWeek[0]?.progress).toEqual({ status: "started", lastBlock: 2 });
  });
});
