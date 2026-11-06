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
  const start = await json(await call(`/api/lessons/${lessonId}/quiz/start`, { method: "POST", body: {}, cookie }));
  const answers: Record<string, unknown> = {};
  for (const q of start.questions as { id: string }[]) answers[q.id] = ["a"];
  return json(await call(`/api/quiz/attempts/${start.attemptId}/submit`, { body: { answers }, cookie }));
}

describe("choosing questions from one topic", () => {
  const q = (ref: string, depth: string | null, tag: string | null): SourceQuestion => ({ id: ref, ref, position: 1, type: "multiple_choice", prompt: ref, media_json: null, options_json: null, answer_json: "[]", hint: null, explanation: null, points: 1, skill_tag: tag, sub_lesson: null, depth, variant_of: null });
  it("takes one recall, one apply and one reason, avoiding repeated skills", () => {
    const picked = pickTopicMains([q("a", "recall", "x"), q("b", "recall", "y"), q("c", "apply", "x"), q("d", "apply", "z"), q("e", "reason", "z"), q("f", "reason", "w")], 3);
    expect(picked.map((p) => p.ref)).toEqual(["a", "d", "f"]);
  });
  it("falls back to any question when a depth is missing", () => {
    const picked = pickTopicMains([q("a", "recall", "x"), q("b", "recall", "y"), q("c", null, null)], 3);
    expect(picked.map((p) => p.ref).sort()).toEqual(["a", "b", "c"]);
  });
});

describe("grand quiz", () => {
  let courseId = "";
  let lessons: string[] = [];
  let cookie = "";
  let grandId = "";

  beforeAll(async () => {
    const c = await importCourse("grand-maths", 11);
    courseId = c.courseId;
    lessons = c.lessons;
    cookie = await childOnPath(courseId, "Zoe");
  });

  it("refuses to build under 12 published topics", async () => {
    const res = await call("/api/admin/exams/grand", { body: { courseId } });
    expect(res.status).toBe(400);
    expect((await json(res)).error).toBe("not_enough_topics");
  });

  it("builds 36 main questions for 12 topics, with variants copied and remapped", async () => {
    const r = await json<{ lesson: { lessonId: string } }>(await call("/api/admin/lessons/import", { body: { publish: true, file: topicFile("grand-maths", "grand-maths-t12", 12) } }));
    lessons.push(r.lesson.lessonId);
    const res = await call("/api/admin/exams/grand", { body: { courseId } });
    expect(res.status).toBe(201);
    const { exam } = await json(res);
    grandId = exam.id;
    expect(exam).toMatchObject({ topics: 12, questionCount: 36, version: 1 });
    expect(exam.variantCount).toBeGreaterThan(0);

    const { results } = await env.DB.prepare("SELECT * FROM questions WHERE quiz_id = ?").bind(grandId).all<any>();
    const mains = results.filter((q: any) => !q.variant_of);
    const variants = results.filter((q: any) => q.variant_of);
    expect(mains).toHaveLength(36);
    expect(variants).toHaveLength(exam.variantCount);
    for (const v of variants) expect(mains.some((m: any) => m.ref === v.variant_of && m.depth === v.depth && m.sub_lesson === v.sub_lesson)).toBe(true);
    // Three depths per topic, so 12 of each.
    for (const depth of ["recall", "apply", "reason"]) expect(mains.filter((m: any) => m.depth === depth)).toHaveLength(12);
    const quiz = await env.DB.prepare("SELECT kind, semester, pass_percent, max_attempts, blueprint_json FROM quizzes WHERE id = ?").bind(grandId).first<any>();
    expect(quiz).toMatchObject({ kind: "exam", semester: null, pass_percent: 70, max_attempts: null });
    expect(JSON.parse(quiz.blueprint_json).scope).toBe("course");
  });

  it("is a new version when rebuilt, and the old one stays", async () => {
    const again = await json(await call("/api/admin/exams/grand", { body: { courseId } }));
    expect(again.exam.version).toBe(2);
    const old = await env.DB.prepare("SELECT is_current FROM quizzes WHERE id = ?").bind(grandId).first<{ is_current: number }>();
    expect(old?.is_current).toBe(0);
    grandId = again.exam.id;
    expect((await json(await call("/api/admin/exams/grand"))).exams).toHaveLength(1);
  });

  it("stays locked until every topic is passed, then opens", async () => {
    let paths = await json<{ paths: any[] }>(await call("/api/paths", { cookie }));
    expect(paths.paths[0].grand).toMatchObject({ quizId: grandId, status: "locked", bestPercent: null, attempts: 0, questionCount: expect.any(Number) });
    expect((await call(`/api/exams/${grandId}/start`, { method: "POST", body: {}, cookie })).status).toBe(403);
    expect((await json(await call(`/api/exams/${grandId}/start`, { method: "POST", body: {}, cookie }))).error).toBe("topics_not_passed");

    for (const id of lessons.slice(0, 11)) await passTopic(id, cookie);
    expect((await call(`/api/exams/${grandId}/start`, { method: "POST", body: {}, cookie })).status).toBe(403);
    paths = await json(await call("/api/paths", { cookie }));
    expect(paths.paths[0].grand.status).toBe("locked");

    await passTopic(lessons[11]!, cookie);
    paths = await json(await call("/api/paths", { cookie }));
    expect(paths.paths[0].grand.status).toBe("ready");

    const started = await call(`/api/exams/${grandId}/start`, { method: "POST", body: {}, cookie });
    expect(started.status).toBe(200);
    const body = await json(started);
    expect(body.questions).toHaveLength(36);
    const answers: Record<string, unknown> = {};
    for (const q of body.questions as { id: string }[]) answers[q.id] = ["a"];
    const done = await json(await call(`/api/quiz/attempts/${body.attemptId}/submit`, { body: { answers }, cookie }));
    expect(done.passed).toBe(true);

    paths = await json(await call("/api/paths", { cookie }));
    expect(paths.paths[0].grand).toMatchObject({ status: "passed", bestPercent: 100, attempts: 1 });
  }, 180_000);

  it("is not in the semester exams list", async () => {
    const list = await json<{ exams: any[] }>(await call("/api/exams", { cookie }));
    expect(list.exams.some((e) => e.id === grandId)).toBe(false);
    expect((await json<{ exams: any[] }>(await call("/api/admin/exams"))).exams.some((e) => e.id === grandId)).toBe(false);
  });

  it("adds 50 bonus points once the grand quiz is passed", async () => {
    const withBonus = await json(await call("/api/map", { cookie }));
    const other = await childOnPath(courseId, "Yan");
    const without = await json(await call("/api/map", { cookie: other }));
    expect(withBonus.points.total - without.points.total).toBeGreaterThanOrEqual(50);
  });

  it("does not open for a child who is not on the course", async () => {
    const outsider = await childOnPath((await importCourse("grand-other", 1)).courseId, "Xan");
    expect((await call(`/api/exams/${grandId}/start`, { method: "POST", body: {}, cookie: outsider })).status).toBe(404);
  });
});
