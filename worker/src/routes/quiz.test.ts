import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { examBlueprint } from "../lib/exams";
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
  return app.request(path, { method: opts.method ?? (opts.body !== undefined ? "POST" : "GET"), headers, body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined }, env);
}
const json = async <T = Record<string, any>>(res: Response) => (await res.json()) as T;

async function loginAs(displayName: string, classIds?: string[]) {
  const creds = (await json<{ credentials: { id: string; username: string; password: string } }>(await call("/api/admin/students", { body: { displayName, classIds } }))).credentials;
  const res = await call("/api/login", { body: { username: creds.username, password: creds.password } });
  return { id: creds.id, cookie: (res.headers.get("set-cookie") ?? "").split(";")[0] ?? "" };
}

type Q = { id: string; prompt: string; type: string; options?: { id: string; text: string }[] };
/** Answer every question right (or wrong) using what we know about the fixture. */
function answers(questions: Q[], right: boolean): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const q of questions) {
    if (q.type === "multiple_choice") out[q.id] = [right ? "a" : "b"];
    else if (q.type === "number") out[q.id] = right ? 4 : 5;
  }
  return out;
}

const ids: Record<string, string> = {};
let classId = "";
let courseId = "";
let ava: { id: string; cookie: string };

beforeAll(async () => {
  const today = new Date().toISOString().slice(0, 10);
  const dow = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7;
  const start = addDays(addDays(today, -dow), -7); // this is week 2
  classId = (await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Year 3" } }))).class.id;
  await call(`/api/admin/classes/${classId}/terms/generate`, { body: { startDate: start } });
  for (const week of [1, 2, 3]) {
    const r = await json<{ lesson: { lessonId: string; courseId: string } }>(
      await call("/api/admin/lessons/import", { body: { publish: true, file: lessonFixture({ slug: `maths-lesson-w${week}`, curriculum: { course: "maths-y3", semester: 1, week } }) } }),
    );
    ids[`w${week}`] = r.lesson.lessonId;
    courseId = r.lesson.courseId;
  }
  await call("/api/admin/assignments", { body: { courseId, classId } });
  ava = await loginAs("Ava", [classId]);
});

describe("lesson quiz", () => {
  it("is graded in the lesson's own week and never sends answers", async () => {
    const res = await call(`/api/lessons/${ids.w2}/quiz/start`, { method: "POST", body: {}, cookie: ava.cookie });
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).not.toContain('"answer"');
    expect(text).not.toContain("explanation");
    const body = JSON.parse(text);
    expect(body).toMatchObject({ mode: "graded", attemptNumber: 1, resumed: false });
    expect(body.questions).toHaveLength(2);
    ids.attempt = body.attemptId;
    ids.questions = JSON.stringify(body.questions);
  });

  it("resumes the attempt in progress instead of starting another", async () => {
    const again = await json(await call(`/api/lessons/${ids.w2}/quiz/start`, { method: "POST", body: {}, cookie: ava.cookie }));
    expect(again).toMatchObject({ attemptId: ids.attempt, resumed: true, attemptNumber: 1 });
  });

  it("grades on the server, records the answers, and reveals the right answers afterwards", async () => {
    const qs = JSON.parse(ids.questions as string) as Q[];
    const res = await json(await call(`/api/quiz/attempts/${ids.attempt}/submit`, { body: { answers: answers(qs, false) }, cookie: ava.cookie }));
    expect(res).toMatchObject({ score: 0, maxScore: 2, percent: 0, passed: false, mode: "graded" });
    expect(res.review[0]).toHaveProperty("answer");
    const stored = await env.DB.prepare("SELECT COUNT(*) AS n FROM attempt_answers WHERE attempt_id = ?").bind(ids.attempt).first<{ n: number }>();
    expect(stored?.n).toBe(2);
    expect((await call(`/api/quiz/attempts/${ids.attempt}/submit`, { body: { answers: {} }, cookie: ava.cookie })).status).toBe(409);
  });

  it("allows unlimited retakes, numbering each attempt", async () => {
    for (const n of [2, 3]) {
      const start = await json(await call(`/api/lessons/${ids.w2}/quiz/start`, { method: "POST", body: {}, cookie: ava.cookie }));
      expect(start.attemptNumber).toBe(n);
      const res = await json(await call(`/api/quiz/attempts/${start.attemptId}/submit`, { body: { answers: answers(start.questions, true) }, cookie: ava.cookie }));
      expect(res).toMatchObject({ percent: 100, passed: true });
    }
    const modes = await env.DB.prepare("SELECT attempt_number AS n, mode FROM quiz_attempts WHERE user_id = ? AND scope_key = ? ORDER BY attempt_number").bind(ava.id, `lesson:${ids.w2}`).all();
    expect(modes.results.map((r) => r.mode)).toEqual(["graded", "practice", "practice"]); // only the first try is graded
    const history = await json<{ attempts: { attemptNumber: number; percent: number }[] }>(await call(`/api/lessons/${ids.w2}/attempts`, { cookie: ava.cookie }));
    expect(history.attempts.map((a) => a.attemptNumber)).toEqual([3, 2, 1]);
  });

  it("autosaves answers and hands them back when the quiz is resumed", async () => {
    const start = await json(await call(`/api/lessons/${ids.w2}/quiz/start`, { method: "POST", body: {}, cookie: ava.cookie }));
    expect(start.draft).toBeNull();
    const draft = { answers: answers(start.questions, true), hintsUsed: [start.questions[0].id], index: 1 };
    expect((await call(`/api/quiz/attempts/${start.attemptId}/progress`, { method: "PUT", body: draft, cookie: ava.cookie })).status).toBe(200);
    const resumed = await json(await call(`/api/lessons/${ids.w2}/quiz/start`, { method: "POST", body: {}, cookie: ava.cookie }));
    expect(resumed).toMatchObject({ attemptId: start.attemptId, resumed: true, draft });
    expect((await call(`/api/quiz/attempts/${start.attemptId}/progress`, { method: "PUT", body: draft, cookie: (await loginAs("Other")).cookie })).status).toBe(404);
    await call(`/api/quiz/attempts/${start.attemptId}/submit`, { body: draft, cookie: ava.cookie });
    expect((await call(`/api/quiz/attempts/${start.attemptId}/progress`, { method: "PUT", body: draft, cookie: ava.cookie })).status).toBe(409);
  });

  it("records attempts at an older lesson as practice", async () => {
    const start = await json(await call(`/api/lessons/${ids.w1}/quiz/start`, { method: "POST", body: {}, cookie: ava.cookie }));
    expect(start.mode).toBe("practice");
    const res = await json(await call(`/api/quiz/attempts/${start.attemptId}/submit`, { body: { answers: answers(start.questions, true) }, cookie: ava.cookie }));
    expect(res.mode).toBe("practice");
    const row = await env.DB.prepare("SELECT mode, scope_key FROM quiz_attempts WHERE id = ?").bind(start.attemptId).first();
    expect(row).toMatchObject({ mode: "practice", scope_key: `lesson:${ids.w1}` });
  });

  it("refuses a future lesson and other children's attempts", async () => {
    expect((await call(`/api/lessons/${ids.w3}/quiz/start`, { method: "POST", body: {}, cookie: ava.cookie })).status).toBe(404);
    const other = await loginAs("Ben", [classId]);
    expect((await call(`/api/quiz/attempts/${ids.attempt}`, { cookie: other.cookie })).status).toBe(404);
    expect((await call(`/api/quiz/attempts/${ids.attempt}/submit`, { body: { answers: {} }, cookie: other.cookie })).status).toBe(404);
    expect((await call(`/api/quiz/attempts/${ids.attempt}`)).status).toBe(401);
  });

  it("shows a finished attempt's result again, and serves a static hint", async () => {
    const result = await json(await call(`/api/quiz/attempts/${ids.attempt}`, { cookie: ava.cookie }));
    expect(result).toMatchObject({ status: "submitted", percent: 0 });
    const next = await json(await call(`/api/lessons/${ids.w2}/quiz/start`, { method: "POST", body: {}, cookie: ava.cookie }));
    const hint = await json(await call(`/api/quiz/attempts/${next.attemptId}/hint`, { body: { questionId: next.questions[0].id }, cookie: ava.cookie }));
    expect(typeof hint.hint).toBe("string");
  });
});

describe("semester exams", () => {
  let examId = "";
  it("builds a frozen snapshot from the semester's quizzes", async () => {
    expect((await call("/api/admin/exams", { body: { courseId, semester: 2 } })).status).toBe(400); // nothing taught in semester 2 yet
    const res = await call("/api/admin/exams", { body: { courseId, semester: 1, questionCount: 4, maxAttempts: 2 } });
    expect(res.status).toBe(201);
    const { exam } = await json<{ exam: { id: string; questionCount: number } }>(res);
    examId = exam.id;
    expect(exam.questionCount).toBe(4);
    const copies = await env.DB.prepare("SELECT COUNT(*) AS n FROM questions WHERE quiz_id = ? AND source_question_id IS NOT NULL").bind(examId).first<{ n: number }>();
    expect(copies?.n).toBe(4);
  });

  it("stays closed until the exam week or the parent opens it", async () => {
    expect((await json<{ exams: unknown[] }>(await call("/api/exams", { cookie: ava.cookie }))).exams).toHaveLength(0);
    expect((await call(`/api/exams/${examId}/start`, { method: "POST", body: {}, cookie: ava.cookie })).status).toBe(404);
    await call("/api/admin/unlocks", { body: { courseId, semester: 1, week: 13, classId } });
    const list = await json<{ exams: { id: string; title: string; attemptsUsed: number }[] }>(await call("/api/exams", { cookie: ava.cookie }));
    expect(list.exams).toMatchObject([{ id: examId, title: "Maths Y3: Semester 1 exam", attemptsUsed: 0 }]);
  });

  it("limits attempts and records them against the exam scope", async () => {
    for (let n = 1; n <= 2; n++) {
      const start = await json(await call(`/api/exams/${examId}/start`, { method: "POST", body: {}, cookie: ava.cookie }));
      expect(start).toMatchObject({ mode: "graded", attemptNumber: n });
      expect(start.questions).toHaveLength(4);
      await call(`/api/quiz/attempts/${start.attemptId}/submit`, { body: { answers: answers(start.questions, true) }, cookie: ava.cookie });
    }
    const third = await call(`/api/exams/${examId}/start`, { method: "POST", body: {}, cookie: ava.cookie });
    expect(third.status).toBe(403);
    expect((await json(third)).error).toBe("no_attempts_left");
    const list = await json<{ exams: { attemptsUsed: number; bestPercent: number }[] }>(await call("/api/exams", { cookie: ava.cookie }));
    expect(list.exams[0]).toMatchObject({ attemptsUsed: 2, bestPercent: 100 });
  });

  it("rebuilding makes a new version and keeps the old one for its attempts", async () => {
    await call("/api/admin/exams", { body: { courseId, semester: 1, questionCount: 3 } });
    const { results } = await env.DB.prepare("SELECT version, is_current FROM quizzes WHERE kind = 'exam' ORDER BY version").all();
    expect(results).toEqual([{ version: 1, is_current: 0 }, { version: 2, is_current: 1 }]);
  });
});

describe("exam blueprint", () => {
  it("adds a revision share for later semesters", () => {
    expect([...examBlueprint(1, 20, 20)]).toEqual([[1, 20]]);
    expect([...examBlueprint(3, 20, 20)]).toEqual([[3, 16], [2, 2], [1, 2]]);
  });
  it("covers the whole year in semester 4", () => {
    const plan = examBlueprint(4, 21, 20);
    expect([...plan.values()].reduce((a, b) => a + b, 0)).toBe(21);
    expect([...plan.keys()].sort()).toEqual([1, 2, 3, 4]);
  });
});

describe("new question types end to end", () => {
  it("imports, hides answers, shuffles gaps and grades fill_blank, hotspot and slider", async () => {
    const file = lessonFixture({ slug: "maths-new-types", curriculum: { course: "maths-y3", semester: 1, week: 2 } }) as any;
    file.quiz.questions = [
      { ref: "q1", type: "fill_blank", points: 2, prompt: "Fill the gaps", text: "Plants need {b1} and {b2}.", blanks: [
        { id: "b1", options: [{ id: "x", text: "light" }, { id: "y", text: "sand" }] },
        { id: "b2", options: [{ id: "x", text: "water" }, { id: "y", text: "milk" }] } ], answer: { b1: "x", b2: "x" } },
      { ref: "q2", type: "hotspot", prompt: "Tap the heart", scene: { items: [{ id: "h", emoji: "❤️", label: "heart", x: 30, y: 40, size: 2 }, { id: "l", emoji: "🫁", label: "lungs", x: 70, y: 40, size: 2 }], show_labels: false }, answer: ["h"] },
      { ref: "q3", type: "slider", prompt: "About how many?", range: { min: 0, max: 100, step: 5 }, answer: { value: 50, tolerance: 5 } },
    ];
    const imp = await json<{ lesson: { lessonId: string } }>(await call("/api/admin/lessons/import", { body: { publish: true, file } }));
    const lid = imp.lesson.lessonId;
    await call("/api/admin/assignments", { body: { courseId, classId } });
    const start = await json(await call(`/api/lessons/${lid}/quiz/start`, { method: "POST", body: {}, cookie: ava.cookie }));
    const qs = start.questions as any[];
    expect(JSON.stringify(qs)).not.toContain('"answer"');
    const byType = Object.fromEntries(qs.map((x) => [x.type, x]));
    expect(byType.fill_blank.text).toContain("{b1}");
    expect(byType.fill_blank.blanks).toHaveLength(2);
    expect(byType.hotspot.scene.items).toHaveLength(2);
    expect(byType.slider.range.max).toBe(100);
    const res = await json(await call(`/api/quiz/attempts/${start.attemptId}/submit`, {
      body: { answers: { [byType.fill_blank.id]: { b1: "x", b2: "x" }, [byType.hotspot.id]: ["h"], [byType.slider.id]: 52 } }, cookie: ava.cookie }));
    expect(res.score).toBe(4);
    expect(res.maxScore).toBe(4);
  });
});
