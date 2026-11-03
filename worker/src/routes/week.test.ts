import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { daysUntilSunday } from "../lib/week";
import { buildPrompt } from "../lib/promptBuilder";
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

describe("helpers", () => {
  it("counts days to Sunday", () => {
    expect(daysUntilSunday("2026-11-02")).toBe(6); // Monday
    expect(daysUntilSunday("2026-11-07")).toBe(1); // Saturday
    expect(daysUntilSunday("2026-11-08")).toBe(0); // Sunday
  });
  it("asks Claude for a single lesson and keeps the house rules", () => {
    const text = buildPrompt({
      course: { title: "Maths Class 4", subject: "maths", ageBand: "9" }, semester: 1, week: 4, topic: "",
      earlier: [{ semester: 1, week: 3, title: "Halves", summary: "Sharing in two" }],
      weakSkills: [{ skill: "fractions.quarters", percent: 40 }], childName: "Fatima", className: null, repoUrl: "https://example.com/r",
    });
    expect(text).toContain("S1 week 3: Halves");
    expect(text).toContain("fractions.quarters (40% right)");
    expect(text).toContain("[tell me the topic");
    expect(text).toContain("British spelling");
    expect(text).toContain("https://example.com/r/blob/main/docs/LESSON_GUIDELINES.md");
  });
});

describe("this week and the prompt builder", () => {
  let courseId = "";
  let classId = "";
  let studentId = "";
  let cookie = "";
  const lessons: string[] = [];

  beforeAll(async () => {
    const today = new Date().toISOString().slice(0, 10);
    const dow = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7;
    const monday = addDays(today, -dow);
    classId = (await json<{ class: { id: string } }>(await call("/api/admin/classes", { body: { name: "Year 3" } }))).class.id;
    await call(`/api/admin/classes/${classId}/terms/generate`, { body: { startDate: addDays(monday, -7) } }); // week 2 is now
    for (const week of [1, 2]) {
      const r = await json<{ lesson: { lessonId: string; courseId: string } }>(await call("/api/admin/lessons/import", { body: { publish: true, file: lessonFixture({ slug: `maths-w${week}`, curriculum: { course: "maths-y3", semester: 1, week } }) } }));
      lessons.push(r.lesson.lessonId);
      courseId = r.lesson.courseId;
    }
    await call("/api/admin/assignments", { body: { courseId, classId } });
    const creds = (await json<{ credentials: { id: string; username: string; password: string } }>(await call("/api/admin/students", { body: { displayName: "Ava", classIds: [classId] } }))).credentials;
    studentId = creds.id;
    cookie = ((await call("/api/login", { body: { username: creds.username, password: creds.password } })).headers.get("set-cookie") ?? "").split(";")[0] ?? "";
  });

  it("shows each child's lessons for this week only, and how far they are", async () => {
    let w = await json(await call("/api/admin/week"));
    expect(w.students).toHaveLength(1);
    expect(w.students[0]).toMatchObject({ name: "Ava", total: 1, done: 0, classes: ["Year 3"] });
    expect(w.students[0].lessons[0]).toMatchObject({ title: "Halves and Quarters", status: "not_started" });

    await call(`/api/lessons/${lessons[1]}/progress`, { method: "PUT", body: { lastBlock: 1 }, cookie });
    w = await json(await call("/api/admin/week"));
    expect(w.students[0].lessons[0].status).toBe("in_progress");

    await call(`/api/lessons/${lessons[1]}/progress`, { method: "PUT", body: { lastBlock: 5, completed: true }, cookie });
    w = await json(await call("/api/admin/week"));
    expect(w.students[0]).toMatchObject({ done: 1, total: 1 });
    expect(w.students[0].lessons[0].status).toBe("done");
  });

  it("builds a prompt from the course so far", async () => {
    const r = await json(await call(`/api/admin/prompt?courseId=${courseId}&semester=1&week=3&studentId=${studentId}&topic=Perimeter`));
    expect(r.prompt).toContain("Topic: Perimeter");
    expect(r.prompt).toContain("S1 week 2: Halves and Quarters");
    expect(r.prompt).toContain("semester 1, week 3");
    expect((await call("/api/admin/prompt?courseId=nope&semester=1&week=3")).status).toBe(404);
    expect((await call(`/api/admin/prompt?courseId=${courseId}&semester=9&week=3`)).status).toBe(400);
  });
});
