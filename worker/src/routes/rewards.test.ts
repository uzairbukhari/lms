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
const rightAnswers = (qs: Q[]) => Object.fromEntries(qs.map((q) => [q.id, q.type === "number" ? 4 : ["a"]]));

describe("rewards: streak, stickers, shop, growth and teaser", () => {
  const lessons: string[] = [];
  let studentId = "";
  let cookie = "";

  beforeAll(async () => {
    const today = new Date().toISOString().slice(0, 10);
    const dow = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7;
    const classId = (await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Class 1" } }))).class.id;
    await call(`/api/admin/classes/${classId}/terms/generate`, { body: { startDate: addDays(addDays(today, -dow), -7) } }); // week 2 is now
    let courseId = "";
    for (const week of [1, 2]) {
      const r = await json<{ lesson: { lessonId: string; courseId: string } }>(await call("/api/admin/lessons/import", { body: { publish: true, file: lessonFixture({ slug: `maths-w${week}`, curriculum: { course: "maths-y1", semester: 1, week } }) } }));
      lessons.push(r.lesson.lessonId);
      courseId = r.lesson.courseId;
    }
    await call("/api/admin/assignments", { body: { courseId, classId } });
    const creds = (await json<{ credentials: { id: string; username: string; password: string } }>(await call("/api/admin/students", { body: { displayName: "Zainab", classIds: [classId] } }))).credentials;
    studentId = creds.id;
    cookie = ((await call("/api/login", { body: { username: creds.username, password: creds.password } })).headers.get("set-cookie") ?? "").split(";")[0] ?? "";
  });

  const rewards = async () => json(await call("/api/rewards", { cookie }));
  const earned = (r: any) => (r.stickers as { id: string; earned: boolean }[]).filter((s) => s.earned).map((s) => s.id);

  it("needs a signed-in child", async () => {
    expect((await call("/api/rewards")).status).toBe(401);
    expect((await call("/api/teaser")).status).toBe(401);
  });

  it("starts empty, then rewards finished lessons with a streak and stickers (new only once)", async () => {
    let r = await rewards();
    expect(r.streak).toEqual({ current: 0, best: 0 });
    expect(earned(r)).toEqual([]);

    await call(`/api/lessons/${lessons[0]}/progress`, { method: "PUT", body: { lastBlock: 4, completed: true }, cookie });
    r = await rewards();
    expect(r.streak.current).toBe(1); // week 1 done; week 2 is the current week and still open
    expect(earned(r)).toEqual(["first-lesson"]);
    expect(r.stickers.find((s: { id: string }) => s.id === "first-lesson").isNew).toBe(true);
    expect((await rewards()).stickers.find((s: { id: string }) => s.id === "first-lesson").isNew).toBe(false);

    await call(`/api/lessons/${lessons[1]}/progress`, { method: "PUT", body: { lastBlock: 4, completed: true }, cookie });
    expect((await rewards()).streak).toEqual({ current: 2, best: 2 });
  });

  it("banks points by playing the map game, then lets the child buy, wear and take off a hat", async () => {
    const start = await json(await call(`/api/lessons/${lessons[1]}/quiz/start`, { method: "POST", body: {}, cookie }));
    await call(`/api/quiz/attempts/${start.attemptId}/submit`, { body: { answers: rightAnswers(start.questions) }, cookie });
    expect((await rewards()).points.balance).toBe(0); // the chest is not open yet
    const played = await json(await call("/api/map/play", { body: { semester: 1, week: 2, score: 0 }, cookie }));
    expect(played.points.total).toBeGreaterThanOrEqual(10);

    let r = await rewards();
    expect(earned(r)).toContain("first-100");
    expect(r.points.balance).toBe(played.points.total);

    expect((await call("/api/shop/buy", { body: { itemId: "nope" }, cookie })).status).toBe(404);
    expect((await call("/api/shop/buy", { body: { itemId: "pet-unicorn" }, cookie })).status).toBe(409); // too expensive
    const bought = await call("/api/shop/buy", { body: { itemId: "hat-cap" }, cookie });
    expect(bought.status).toBe(201);
    r = await json(bought);
    expect(r.points.balance).toBe(played.points.total - 10);
    expect(r.equipped.hat).toBe("hat-cap");
    expect(earned(r)).toContain("shopper");
    expect((await call("/api/shop/buy", { body: { itemId: "hat-cap" }, cookie })).status).toBe(409); // already owned

    // Cannot wear something not bought, or in the wrong slot.
    expect((await call("/api/shop/equip", { body: { slot: "hat", itemId: "hat-crown" }, cookie })).status).toBe(404);
    expect((await call("/api/shop/equip", { body: { slot: "pet", itemId: "hat-cap" }, cookie })).status).toBe(404);
    r = await json(await call("/api/shop/equip", { body: { slot: "hat", itemId: null }, cookie }));
    expect(r.equipped.hat).toBeUndefined();
  });

  it("shows the plant growing and first try next to best try", async () => {
    const g = await json(await call("/api/growth", { cookie }));
    const maths = g.subjects.find((s: { subject: string }) => s.subject === "maths");
    expect(maths).toMatchObject({ lessonsDone: 2, stage: { emoji: "🌱" } });
    expect(maths.lessons[0]).toMatchObject({ first: 100, best: 100, tries: 1 });
  });

  it("gives one brain teaser a day, at the right level, and counts only the first answer", async () => {
    const t = await json(await call("/api/teaser", { cookie }));
    expect(t).toMatchObject({ level: 1, done: false, solved: 0 });
    expect(t.teaser.options).toContain(t.teaser.answer);
    await call("/api/teaser", { body: { correct: true }, cookie });
    await call("/api/teaser", { body: { correct: false }, cookie }); // a second answer the same day is ignored
    expect(await json(await call("/api/teaser", { cookie }))).toMatchObject({ done: true, correct: true, solved: 1 });
  });

  it("is removed with the child", async () => {
    expect((await call(`/api/admin/students/${studentId}`, { method: "DELETE" })).status).toBe(200);
    const left = await env.DB.prepare("SELECT (SELECT COUNT(*) FROM sticker_awards) + (SELECT COUNT(*) FROM shop_purchases) + (SELECT COUNT(*) FROM teaser_plays) + (SELECT COUNT(*) FROM game_plays) AS n").first<{ n: number }>();
    expect(left?.n).toBe(0);
  });
});
