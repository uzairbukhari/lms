import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { pathStatuses } from "../lib/visibility";
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
  return app.request(path, { method: opts.method ?? (opts.body !== undefined ? "POST" : "GET"), headers, body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined }, env);
}
const json = async <T = Record<string, any>>(res: Response) => (await res.json()) as T;

describe("pathStatuses", () => {
  const ids = ["a", "b", "c", "d"];
  it("opens only the first lesson on a fresh path", () => {
    expect(pathStatuses(ids, new Set(), new Set())).toEqual(["current", "locked", "locked", "locked"]);
  });
  it("opens the next lesson once the one before is passed", () => {
    expect(pathStatuses(ids, new Set(["a"]), new Set())).toEqual(["done", "current", "locked", "locked"]);
    expect(pathStatuses(ids, new Set(["a", "b"]), new Set())).toEqual(["done", "done", "current", "locked"]);
  });
  it("does not skip ahead because a later lesson was passed", () => {
    expect(pathStatuses(ids, new Set(["c"]), new Set())).toEqual(["current", "locked", "done", "locked"]);
  });
  it("lets the parent open one lesson early without opening the ones after it", () => {
    expect(pathStatuses(ids, new Set(), new Set(["c"]))).toEqual(["current", "locked", "early", "locked"]);
  });
  it("finishes with every lesson done", () => {
    expect(pathStatuses(ids, new Set(ids), new Set())).toEqual(["done", "done", "done", "done"]);
  });
});

describe("a class on a mastery path", () => {
  const lessons: string[] = [];
  let classId = "";
  let courseId = "";
  let ava: { id: string; cookie: string };

  const visible = async () => (await json<{ thisWeek: { id: string }[]; lookBack: { id: string }[]; early: { id: string }[] }>(await call("/api/home", { cookie: ava.cookie })));
  const pass = async (lessonId: string, right: boolean) => {
    const start = await json(await call(`/api/lessons/${lessonId}/quiz/start`, { method: "POST", body: {}, cookie: ava.cookie }));
    const answers: Record<string, unknown> = {};
    for (const q of start.questions as { id: string; type: string }[]) answers[q.id] = q.type === "multiple_choice" ? [right ? "a" : "b"] : right ? 4 : 5;
    const res = await json(await call(`/api/quiz/attempts/${start.attemptId}/submit`, { body: { answers }, cookie: ava.cookie }));
    return { start, res };
  };

  beforeAll(async () => {
    classId = (await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Path club" } }))).class.id;
    for (const n of [1, 2, 3]) {
      const r = await json<{ lesson: { lessonId: string; courseId: string } }>(await call("/api/admin/lessons/import", { body: { publish: true, file: lessonFixture({ slug: `maths-topic-${n}`, curriculum: { course: "maths-path", semester: 1, week: n } }) } }));
      lessons.push(r.lesson.lessonId);
      courseId = r.lesson.courseId;
      await env.DB.prepare("UPDATE course_lessons SET position = ? WHERE course_id = ? AND lesson_id = ?").bind(n, courseId, r.lesson.lessonId).run();
    }
    await call("/api/admin/assignments", { body: { courseId, classId } });
    const patch = await call(`/api/admin/classes/${classId}`, { method: "PATCH", body: { unlockMode: "path" } });
    expect(patch.status).toBe(200);
    const creds = (await json<{ credentials: { id: string; username: string; password: string } }>(await call("/api/admin/students", { body: { displayName: "Zed", classIds: [classId] } }))).credentials;
    ava = { id: creds.id, cookie: ((await call("/api/login", { body: { username: creds.username, password: creds.password } })).headers.get("set-cookie") ?? "").split(";")[0] ?? "" };
  });

  it("reports the unlock mode on the class", async () => {
    const c = await json<{ class: { unlockMode: string } }>(await call(`/api/admin/classes/${classId}`));
    expect(c.class.unlockMode).toBe("path");
  });

  it("shows only the first topic and hides the rest, even though no school week is set", async () => {
    const h = await visible();
    expect(h.thisWeek.map((l) => l.id)).toEqual([lessons[0]]);
    expect((await call(`/api/lessons/${lessons[1]}`, { cookie: ava.cookie })).status).toBe(404);
    const paths = await json<{ paths: { topics: { lessonId: string; status: string }[] }[] }>(await call("/api/paths", { cookie: ava.cookie }));
    expect(paths.paths[0]?.topics.map((t) => t.status)).toEqual(["current", "locked", "locked"]);
  });

  it("keeps a failed topic graded on every retry, and does not unlock the next", async () => {
    const first = await pass(lessons[0]!, false);
    expect(first.res).toMatchObject({ passed: false, mode: "graded" });
    const retry = await pass(lessons[0]!, false);
    expect(retry.res).toMatchObject({ passed: false, mode: "graded" }); // weekly lessons would call this practice
    expect((await visible()).thisWeek.map((l) => l.id)).toEqual([lessons[0]]);
  });

  it("opens the next topic when the quiz is passed, and later tries on the passed topic are practice", async () => {
    const ok = await pass(lessons[0]!, true);
    expect(ok.res).toMatchObject({ passed: true, mode: "graded" });
    const h = await visible();
    expect(h.thisWeek.map((l) => l.id)).toEqual([lessons[1]]);
    expect(h.lookBack.map((l) => l.id)).toEqual([lessons[0]]);
    expect((await call(`/api/lessons/${lessons[2]}`, { cookie: ava.cookie })).status).toBe(404);
    const again = await pass(lessons[0]!, true);
    expect(again.res.mode).toBe("practice");
    const paths = await json<{ paths: { topics: { status: string; bestPercent: number | null }[] }[] }>(await call("/api/paths", { cookie: ava.cookie }));
    expect(paths.paths[0]?.topics.map((t) => t.status)).toEqual(["done", "current", "locked"]);
    expect(paths.paths[0]?.topics[0]?.bestPercent).toBe(100);
  });

  it("lets the parent open the third topic early, and take it back", async () => {
    const created = await json<{ id: string }>(await call("/api/admin/path-unlocks", { body: { lessonId: lessons[2], userId: ava.id } }));
    expect((await visible()).early.map((l) => l.id)).toEqual([lessons[2]]);
    expect((await json<{ unlocks: unknown[] }>(await call("/api/admin/path-unlocks"))).unlocks).toHaveLength(1);
    await call(`/api/admin/path-unlocks/${created.id}`, { method: "DELETE" });
    expect((await visible()).early).toEqual([]);
    expect((await call("/api/admin/path-unlocks", { body: { lessonId: lessons[2] } })).status).toBe(400); // needs a class or a student
  });

  it("leaves weekly classes alone", async () => {
    await call(`/api/admin/classes/${classId}`, { method: "PATCH", body: { unlockMode: "weekly" } });
    // No calendar is set, so a weekly class shows nothing: the path rules no longer apply.
    expect((await visible()).thisWeek).toEqual([]);
  });
});
