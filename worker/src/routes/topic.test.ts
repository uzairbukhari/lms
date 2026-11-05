import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseLessonFile } from "@lms/schema";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
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
function topicFile(slug: string, topic: number) {
  const base = lessonFixture({ slug, curriculum: { course: "maths-topics", semester: 1, topic } }) as any;
  const sub = (id: string, kind: string) => ({ id, kind, title: `Part ${id}`, blocks: [{ type: "heading", text: id }, { type: "summary", points: ["ok"] }], mini_quiz: [mc("a"), mc("b"), mc("c")] });
  return {
    ...base,
    schema_version: "3.0",
    lesson: { ...base.lesson, success_criteria: ["I can count on", "I can cross ten"], standards: [{ framework: "cambridge", code: "2Ni.02" }], real_life: "Counting coins" },
    sub_lessons: [sub("one", "learn"), sub("two", "try")],
    quiz: {
      pass_percent: 70,
      questions: [
        { ...mc("q1"), ref: "q1", sub_lesson: "one", depth: "recall" },
        { ...mc("q2"), ref: "q2", sub_lesson: "two", depth: "reason" },
      ],
    },
  };
}

describe("topic lesson file (format 3.0)", () => {
  it("accepts sub-lessons, standards, criteria and a topic slot", () => {
    expect(parseLessonFile(topicFile("maths-t", 1)).ok).toBe(true);
  });
  it("still accepts a 1.0 file", () => {
    expect(parseLessonFile(lessonFixture()).ok).toBe(true);
  });
  it("rejects a question tagged to a missing sub-lesson", () => {
    const f = topicFile("maths-t", 1);
    f.quiz.questions[0]!.sub_lesson = "nope";
    expect(parseLessonFile(f).ok).toBe(false);
  });
  it("rejects both week and topic", () => {
    const f = topicFile("maths-t", 1);
    f.lesson.curriculum.week = 2;
    expect(parseLessonFile(f).ok).toBe(false);
  });
  it("needs 3 to 5 mini quiz questions", () => {
    const f = topicFile("maths-t", 1);
    f.sub_lessons[0]!.mini_quiz = [mc("a")];
    expect(parseLessonFile(f).ok).toBe(false);
  });
});

describe("a child working through a topic", () => {
  let lessonId = "";
  let cookie = "";
  beforeAll(async () => {
    const classId = (await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Topic club" } }))).class.id;
    const r = await json<{ lesson: { lessonId: string; courseId: string } }>(await call("/api/admin/lessons/import", { body: { publish: true, file: topicFile("maths-topic-a", 1) } }));
    lessonId = r.lesson.lessonId;
    await call("/api/admin/assignments", { body: { courseId: r.lesson.courseId, classId } });
    await call(`/api/admin/classes/${classId}`, { method: "PATCH", body: { unlockMode: "path" } });
    const creds = (await json<{ credentials: { username: string; password: string } }>(await call("/api/admin/students", { body: { displayName: "Kim", classIds: [classId] } }))).credentials;
    cookie = ((await call("/api/login", { body: { username: creds.username, password: creds.password } })).headers.get("set-cookie") ?? "").split(";")[0] ?? "";
  });

  it("lists sub-lessons and criteria on the topic", async () => {
    const d = await json(await call(`/api/lessons/${lessonId}`, { cookie }));
    expect(d.topic.subLessons.map((s: any) => [s.id, s.kind, s.viewed])).toEqual([["one", "learn", false], ["two", "try", false]]);
    expect(d.topic.successCriteria).toHaveLength(2);
  });

  it("serves one sub-lesson and records its mini quiz, keeping the best score", async () => {
    const part = await json(await call(`/api/lessons/${lessonId}/parts/one`, { cookie }));
    expect(part.miniQuiz).toHaveLength(3);
    expect((await call(`/api/lessons/${lessonId}/parts/nope`, { cookie })).status).toBe(404);
    await call(`/api/lessons/${lessonId}/parts/one`, { method: "PUT", body: { miniPercent: 100 }, cookie });
    await call(`/api/lessons/${lessonId}/parts/one`, { method: "PUT", body: { miniPercent: 40 }, cookie });
    const d = await json(await call(`/api/lessons/${lessonId}`, { cookie }));
    expect(d.topic.subLessons[0]).toMatchObject({ viewed: true, miniBest: 100 });
  });

  it("saves I can ratings", async () => {
    expect((await call(`/api/lessons/${lessonId}/ratings`, { method: "PUT", body: { ratings: [{ index: 0, rating: 3 }, { index: 1, rating: 2 }] }, cookie })).status).toBe(200);
    const d = await json(await call(`/api/lessons/${lessonId}`, { cookie }));
    expect(d.topic.ratings).toEqual([{ index: 0, rating: 3 }, { index: 1, rating: 2 }]);
  });

  it("sends the child back to the sub-lessons they got wrong in a failed big quiz", async () => {
    const start = await json(await call(`/api/lessons/${lessonId}/quiz/start`, { method: "POST", body: {}, cookie }));
    const answers: Record<string, unknown> = {};
    for (const q of start.questions as { id: string }[]) answers[q.id] = ["b"]; // all wrong
    await call(`/api/quiz/attempts/${start.attemptId}/submit`, { body: { answers }, cookie });
    const d = await json(await call(`/api/lessons/${lessonId}`, { cookie }));
    expect(d.topic.lastQuiz.passed).toBe(false);
    expect(d.topic.practise.map((p: any) => p.subId).sort()).toEqual(["one", "two"]);
    expect(d.topic.subLessons.every((s: any) => s.weak)).toBe(true);
  });
});

describe("the pilot topic lesson", () => {
  it("imports, and a path class sees it with four sub-lessons", async () => {
    const file = JSON.parse(readFileSync(join(process.cwd(), "../content/topics/maths-class-1-place-value.json"), "utf8"));
    const classId = (await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Pilot class" } }))).class.id;
    const r = await json<{ lesson: { lessonId: string; courseId: string } }>(await call("/api/admin/lessons/import", { body: { publish: true, file } }));
    await call("/api/admin/assignments", { body: { courseId: r.lesson.courseId, classId } });
    await call(`/api/admin/classes/${classId}`, { method: "PATCH", body: { unlockMode: "path" } });
    const creds = (await json<{ credentials: { username: string; password: string } }>(await call("/api/admin/students", { body: { displayName: "Pia", classIds: [classId] } }))).credentials;
    const cookie = ((await call("/api/login", { body: { username: creds.username, password: creds.password } })).headers.get("set-cookie") ?? "").split(";")[0] ?? "";
    const d = await json(await call(`/api/lessons/${r.lesson.lessonId}`, { cookie }));
    expect(d.topic.subLessons.map((s: any) => s.kind)).toEqual(["learn", "try", "play", "use"]);
    expect(d.topic.warmUp).toHaveLength(3);
    expect(d.quiz.questionCount).toBe(15);
    const part = await json(await call(`/api/lessons/${r.lesson.lessonId}/parts/compare`, { cookie }));
    expect(part.miniQuiz.length).toBeGreaterThanOrEqual(3);
  });
});

describe("retakes get fresh questions", () => {
  it("rejects a variant of a missing or mismatched question", () => {
    const f = topicFile("maths-v", 1);
    f.quiz.questions.push({ ...mc("q1 again"), ref: "q1v", variant_of: "nope" } as never);
    expect(parseLessonFile(f).ok).toBe(false);
    f.quiz.questions[2] = { type: "true_false", prompt: "x", answer: [true], ref: "q1v", variant_of: "q1" } as never;
    expect(parseLessonFile(f).ok).toBe(false);
  });

  it("swaps in a different variant on each retake, and cycles back", async () => {
    const f = topicFile("maths-variants", 1) as any;
    f.lesson.curriculum.course = "maths-variants-course";
    f.quiz.questions.push({ ...mc("q1 variant A"), ref: "q1a", variant_of: "q1" }, { ...mc("q1 variant B"), ref: "q1b", variant_of: "q1" });
    const classId = (await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Variant club" } }))).class.id;
    const r = await json<{ lesson: { lessonId: string; courseId: string } }>(await call("/api/admin/lessons/import", { body: { publish: true, file: f } }));
    await call("/api/admin/assignments", { body: { courseId: r.lesson.courseId, classId } });
    await call(`/api/admin/classes/${classId}`, { method: "PATCH", body: { unlockMode: "path" } });
    const creds = (await json<{ credentials: { username: string; password: string } }>(await call("/api/admin/students", { body: { displayName: "Vee", classIds: [classId] } }))).credentials;
    const cookie = ((await call("/api/login", { body: { username: creds.username, password: creds.password } })).headers.get("set-cookie") ?? "").split(";")[0] ?? "";
    expect((await json(await call(`/api/lessons/${r.lesson.lessonId}`, { cookie }))).quiz.questionCount).toBe(2);
    const prompts: string[] = [];
    for (let n = 0; n < 4; n++) {
      const start = await json(await call(`/api/lessons/${r.lesson.lessonId}/quiz/start`, { method: "POST", body: {}, cookie }));
      expect(start.questions).toHaveLength(2);
      prompts.push((start.questions as { prompt: string }[]).map((q) => q.prompt).find((p) => p.startsWith("q1")) ?? "");
      const answers: Record<string, unknown> = {};
      for (const q of start.questions as { id: string }[]) answers[q.id] = ["b"]; // fail so it stays graded
      await call(`/api/quiz/attempts/${start.attemptId}/submit`, { body: { answers }, cookie });
    }
    expect(prompts).toEqual(["q1", "q1 variant A", "q1 variant B", "q1"]);
  });
});
