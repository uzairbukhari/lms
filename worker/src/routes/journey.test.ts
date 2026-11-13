import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { pickTopicMains, type SourceQuestion } from "../lib/grand";
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

const mc = (prompt: string) => ({ type: "multiple_choice", prompt, options: [{ id: "a", text: "Right" }, { id: "b", text: "Wrong" }], answer: ["a"] });
function topicFile(course: string, slug: string, topic: number) {
  const base = lessonFixture({ slug, curriculum: { course, semester: 1, topic } }) as any;
  const sub = (id: string, kind: string) => ({ id, kind, title: `Part ${id}`, blocks: [{ type: "heading", text: id }, { type: "summary", points: ["ok"] }], mini_quiz: [mc("a"), mc("b"), mc("c")] });
  const depths = ["recall", "recall", "apply", "apply", "reason", "reason"];
  const questions: any[] = [];
  depths.forEach((depth, i) => {
    const ref = `q${i + 1}`;
    questions.push({ ...mc(`${slug} question ${i + 1}`), ref, sub_lesson: i % 2 ? "two" : "one", depth, skill_tag: ["number.count", "number.add", "number.compare"][i % 3] });
    // Only the first question of each depth has a retake variant.
    if (i % 2 === 0) questions.push({ ...mc(`${slug} question ${i + 1} again`), ref: `${ref}v`, variant_of: ref });
  });
  return {
    ...base,
    schema_version: "3.0",
    lesson: { ...base.lesson, success_criteria: ["I can count on", "I can cross ten"], standards: [{ framework: "cambridge", code: "2Ni.02" }], real_life: "Counting coins" },
    sub_lessons: [sub("one", "learn"), sub("two", "try")],
    quiz: { pass_percent: 70, questions },
  };
}

async function importCourse(course: string, count: number) {
  const lessons: string[] = [];
  let courseId = "";
  for (let t = 1; t <= count; t++) {
    const r = await json<{ lesson: { lessonId: string; courseId: string } }>(await call("/api/admin/lessons/import", { body: { publish: true, file: topicFile(course, `${course}-t${t}`, t) } }));
    lessons.push(r.lesson.lessonId);
    courseId = r.lesson.courseId;
  }
  return { lessons, courseId };
}

async function childOnPath(courseId: string, name: string) {
  const classId = (await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: `${name} club` } }))).class.id;
  await call("/api/admin/assignments", { body: { courseId, classId } });
  await call(`/api/admin/classes/${classId}`, { method: "PATCH", body: { unlockMode: "path" } });
  const creds = (await json<{ credentials: { username: string; password: string } }>(await call("/api/admin/students", { body: { displayName: name, classIds: [classId] } }))).credentials;
  return ((await call("/api/login", { body: { username: creds.username, password: creds.password } })).headers.get("set-cookie") ?? "").split(";")[0] ?? "";
}

async function passTopic(lessonId: string, cookie: string) {
  // The big quiz stays locked until every part has been viewed.
  for (const part of ["one", "two"]) await call(`/api/lessons/${lessonId}/parts/${part}`, { method: "PUT", body: { viewed: true }, cookie });
  const start = await json(await call(`/api/lessons/${lessonId}/quiz/start`, { method: "POST", body: {}, cookie }));
  const answers: Record<string, unknown> = {};
  for (const q of start.questions as { id: string }[]) answers[q.id] = ["a"];
  return json(await call(`/api/quiz/attempts/${start.attemptId}/submit`, { body: { answers }, cookie }));
}


describe("journey map", () => {
  let cookie = "";
  let lessons: string[] = [];
  beforeAll(async () => {
    const c = await importCourse("journey-maths", 6);
    lessons = c.lessons;
    cookie = await childOnPath(c.courseId, "Jay");
  });

  it("starts with every stop locked or open, and no weeks involved", async () => {
    const m = await json<any>(await call("/api/map", { cookie }));
    expect(m.journey).toBe(true);
    expect(m.checkpoints).toHaveLength(2);
    expect(m.checkpoints[0].state).toBe("open");
    expect(m.checkpoints[1].state).toBe("locked");
    expect(m.checkpoints[0].lessons).toEqual({ total: 3, done: 0 });
  });

  it("reaches a stop after three topics, and only then lets the game be played", async () => {
    expect((await call("/api/map/play", { body: { semester: 1, week: 1, score: 5 }, cookie })).status).toBe(403);
    for (const id of lessons.slice(0, 2)) await passTopic(id, cookie);
    expect((await json<any>(await call("/api/map", { cookie }))).checkpoints[0].lessons.done).toBe(2);
    await passTopic(lessons[2]!, cookie);
    const m = await json<any>(await call("/api/map", { cookie }));
    expect(m.checkpoints[0].state).toBe("reached");
    expect(m.checkpoints[1].state).toBe("open");
    const play = await call("/api/map/play", { body: { semester: 1, week: 1, score: 5 }, cookie });
    expect(play.status).toBe(200);
    expect((await call("/api/map/play", { body: { semester: 1, week: 2, score: 5 }, cookie })).status).toBe(403);
    const after = await json<any>(await call("/api/map", { cookie }));
    expect(after.checkpoints[0].chestOpened).toBe(true);
    expect(after.points.total).toBeGreaterThan(0);
  });
});
