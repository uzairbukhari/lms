import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { gameBonus, gameForWeek, lessonQuizPoints, quizStars, weekStars } from "@lms/schema";
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
  return app.request(path, { method: opts.method ?? (opts.body !== undefined ? "POST" : "GET"), headers, body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined }, env);
}
const json = async <T = Record<string, any>>(res: Response) => (await res.json()) as T;

async function loginAs(displayName: string, classIds?: string[]) {
  const creds = (await json<{ credentials: { id: string; username: string; password: string } }>(await call("/api/admin/students", { body: { displayName, classIds } }))).credentials;
  const res = await call("/api/login", { body: { username: creds.username, password: creds.password } });
  return { id: creds.id, cookie: (res.headers.get("set-cookie") ?? "").split(";")[0] ?? "" };
}

type Q = { id: string; type: string };
function rightAnswers(questions: Q[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const q of questions) out[q.id] = q.type === "number" ? 4 : ["a"];
  return out;
}

type Checkpoint = { week: number; state: string; isCurrentWeek: boolean; lessons: { total: number; done: number }; stars: number; quizPoints: number; chestOpened: boolean; bestBonus: number; game: string; level: number };
type MapData = { semester: number; semesters: number[]; checkpoints: Checkpoint[]; points: { total: number; waiting: number } };

const ids: Record<string, string> = {};
let ava: { id: string; cookie: string };
const map = async () => json<MapData>(await call("/api/map", { cookie: ava.cookie }));
const cp = (m: MapData, week: number) => m.checkpoints.find((c) => c.week === week) as Checkpoint;
const complete = (id: string) => call(`/api/lessons/${id}/progress`, { method: "PUT", body: { lastBlock: 3, completed: true }, cookie: ava.cookie });
async function quiz(id: string) {
  const start = await json(await call(`/api/lessons/${id}/quiz/start`, { method: "POST", body: {}, cookie: ava.cookie }));
  return json(await call(`/api/quiz/attempts/${start.attemptId}/submit`, { body: { answers: rightAnswers(start.questions) }, cookie: ava.cookie }));
}

beforeAll(async () => {
  const today = new Date().toISOString().slice(0, 10);
  const dow = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7;
  const start = addDays(addDays(today, -dow), -7); // today is in week 2
  const classId = (await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Year 3" } }))).class.id;
  await call(`/api/admin/classes/${classId}/terms/generate`, { body: { startDate: start } });
  const lessons: [string, string, number][] = [["w1", "maths", 1], ["w1s", "science", 1], ["w2", "maths", 2], ["w3", "maths", 3]];
  let courseId = "";
  for (const [key, subject, week] of lessons) {
    const r = await json<{ lesson: { lessonId: string; courseId: string } }>(
      await call("/api/admin/lessons/import", { body: { publish: true, file: lessonFixture({ slug: `lesson-${key}`, subject, curriculum: { course: "y3", semester: 1, week } }) } }),
    );
    ids[key] = r.lesson.lessonId;
    courseId = r.lesson.courseId;
  }
  await call("/api/admin/assignments", { body: { courseId, classId } });
  ava = await loginAs("Ava", [classId]);
});

describe("points rules", () => {
  it("turns quiz and game results into points", () => {
    expect(lessonQuizPoints(87, null)).toBe(9);
    expect(lessonQuizPoints(null, 100)).toBe(5);
    expect(lessonQuizPoints(60, 100)).toBe(6); // graded counts when there is one
    expect(lessonQuizPoints(null, null)).toBe(0);
    expect([null, 50, 69, 70, 79, 80, 89, 90, 100].map(quizStars)).toEqual([0, 0, 0, 1, 1, 2, 2, 3, 3]);
    expect(weekStars([])).toBe(0);
    expect(weekStars([50])).toBe(1);
    expect(weekStars([70, 80])).toBe(2);
    expect(weekStars([90, 100])).toBe(3);
    expect(gameForWeek(1)).toEqual({ game: "star-scoop", level: 1 });
    expect(gameForWeek(7)).toEqual({ game: "star-scoop", level: 2 });
    expect(gameForWeek(12)).toEqual({ game: "sort-dash", level: 2 });
    expect(gameBonus("star-scoop", 1, 15)).toBe(5);
    expect(gameBonus("star-scoop", 1, 9999)).toBe(10);
  });
});

describe("semester map", () => {
  it("needs a signed-in student", async () => {
    expect((await call("/api/map")).status).toBe(401);
  });

  it("shows 12 checkpoints: released weeks open, future weeks locked with nothing revealed", async () => {
    const m = await map();
    expect(m.semester).toBe(1);
    expect(m.semesters).toEqual([1]);
    expect(m.checkpoints).toHaveLength(12);
    expect(cp(m, 1)).toMatchObject({ state: "open", lessons: { total: 2, done: 0 }, isCurrentWeek: false });
    expect(cp(m, 2)).toMatchObject({ state: "open", lessons: { total: 1, done: 0 }, isCurrentWeek: true });
    expect(cp(m, 3)).toMatchObject({ state: "locked", lessons: { total: 0, done: 0 } });
    expect(cp(m, 12).state).toBe("locked");
    expect(m.points).toEqual({ total: 0, waiting: 0 });
  });

  it("refuses to play a checkpoint that is not reached", async () => {
    expect((await call("/api/map/play", { body: { semester: 1, week: 1, score: 10 }, cookie: ava.cookie })).status).toBe(403);
    expect((await call("/api/map/play", { body: { semester: 1, week: 3, score: 10 }, cookie: ava.cookie })).status).toBe(403);
  });

  it("reaches a week when every lesson is done, and holds the quiz points in its chest", async () => {
    await complete(ids.w1 as string);
    expect(cp(await map(), 1).state).toBe("open");
    await complete(ids.w1s as string);
    await quiz(ids.w1 as string); // last week's quiz: practice, so half points
    const m = await map();
    expect(cp(m, 1)).toMatchObject({ state: "reached", lessons: { total: 2, done: 2 }, stars: 3, quizPoints: 5, chestOpened: false });
    expect(m.points).toEqual({ total: 0, waiting: 5 });
  });

  it("banks the chest on the first game and keeps only the best bonus", async () => {
    const first = await json(await call("/api/map/play", { body: { semester: 1, week: 1, score: 15 }, cookie: ava.cookie }));
    expect(first).toMatchObject({ bonus: 5, firstPlay: true, newBest: true, points: { total: 10, waiting: 0 } });
    const better = await json(await call("/api/map/play", { body: { semester: 1, week: 1, score: 99999 }, cookie: ava.cookie }));
    expect(better).toMatchObject({ score: 90, bonus: 10, firstPlay: false, newBest: true, points: { total: 15 } });
    const worse = await json(await call("/api/map/play", { body: { semester: 1, week: 1, score: 1 }, cookie: ava.cookie }));
    expect(worse).toMatchObject({ newBest: false, points: { total: 15 } });
    expect(cp(await map(), 1)).toMatchObject({ chestOpened: true, bestBonus: 10 });
  });

  it("gives full points for a quiz taken in its own week", async () => {
    await complete(ids.w2 as string);
    await quiz(ids.w2 as string);
    const m = await map();
    expect(cp(m, 2)).toMatchObject({ state: "reached", quizPoints: 10, stars: 3 });
    expect(m.points).toEqual({ total: 15, waiting: 10 });
  });

  it("does not let another child see or play on this child's map", async () => {
    const loner = await loginAs("Loner");
    const m = await json<MapData>(await call("/api/map", { cookie: loner.cookie }));
    expect(m.checkpoints.every((c) => c.state !== "reached")).toBe(true);
    expect((await call("/api/map/play", { body: { semester: 1, week: 1, score: 10 }, cookie: loner.cookie })).status).toBe(403);
  });
});
