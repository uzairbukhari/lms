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

async function call(path: string, opts: { method?: string; body?: unknown; form?: FormData; cookie?: string } = {}) {
  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";
  if (opts.cookie) headers["Cookie"] = opts.cookie;
  return app.request(
    path,
    { method: opts.method ?? (opts.body !== undefined || opts.form ? "POST" : "GET"), headers, body: opts.form ?? (opts.body !== undefined ? JSON.stringify(opts.body) : undefined) },
    env,
  );
}
const json = async <T = Record<string, unknown>>(res: Response) => (await res.json()) as T;

describe("lesson import", () => {
  it("validates without saving and returns readable problems", async () => {
    const bad = lessonFixture();
    (bad.quiz.questions[0] as { answer: string[] }).answer = ["zzz"];
    const res = await json<{ ok: boolean; issues: { path: string; message: string }[] }>(await call("/api/admin/lessons/validate", { body: { file: bad } }));
    expect(res.ok).toBe(false);
    expect(res.issues[0]?.path).toBe("quiz.questions.0.answer");
    expect((await json<{ lessons: unknown[] }>(await call("/api/admin/lessons"))).lessons).toHaveLength(0);
  });

  it("rejects an invalid file on import with 400 and saves nothing", async () => {
    const res = await call("/api/admin/lessons/import", { body: { file: { nope: true } } });
    expect(res.status).toBe(400);
    expect((await json<{ lessons: unknown[] }>(await call("/api/admin/lessons"))).lessons).toHaveLength(0);
  });

  it("imports a lesson as a draft, creates its course, and slots it into the curriculum", async () => {
    const res = await call("/api/admin/lessons/import", { body: { file: lessonFixture() } });
    expect(res.status).toBe(201);
    const { lesson } = await json<{ lesson: { lessonId: string; version: number; status: string; courseId: string } }>(res);
    expect(lesson).toMatchObject({ version: 1, status: "draft" });

    const list = await json<{ lessons: { slug: string; questionCount: number; slots: { semester: number; week: number; courseTitle: string }[] }[] }>(await call("/api/admin/lessons"));
    expect(list.lessons[0]).toMatchObject({ slug: "maths-halves-and-quarters", questionCount: 2 });
    expect(list.lessons[0]?.slots[0]).toMatchObject({ semester: 1, week: 3, courseTitle: "Maths Year 1" });
  });

  it("stores questions without leaking answers into the options", async () => {
    const row = await env.DB.prepare("SELECT options_json, answer_json FROM questions WHERE ref = 'q1'").first<{ options_json: string; answer_json: string }>();
    expect(row?.options_json).not.toContain("answer");
    expect(JSON.parse(row?.answer_json ?? "[]")).toEqual(["a"]);
  });

  it("re-importing the same slug makes version 2 and keeps old questions for old attempts", async () => {
    await call("/api/admin/lessons/import", { body: { file: lessonFixture(), publish: true } });
    const { results } = await env.DB.prepare("SELECT version, is_current FROM quizzes ORDER BY version").all<{ version: number; is_current: number }>();
    expect(results).toEqual([{ version: 1, is_current: 0 }, { version: 2, is_current: 1 }]);
    const lessons = await json<{ lessons: { version: number; status: string }[] }>(await call("/api/admin/lessons"));
    expect(lessons.lessons[0]).toMatchObject({ version: 2, status: "published" });
    const oldQuestions = await env.DB.prepare("SELECT COUNT(*) AS n FROM questions").first<{ n: number }>();
    expect(oldQuestions?.n).toBe(4);
  });

  it("filters by subject and changes status", async () => {
    const other = lessonFixture({ slug: "science-plants", subject: "science", curriculum: null });
    const imported = await json<{ lesson: { lessonId: string } }>(await call("/api/admin/lessons/import", { body: { file: other } }));
    expect((await json<{ lessons: unknown[] }>(await call("/api/admin/lessons?subject=science"))).lessons).toHaveLength(1);
    expect((await call(`/api/admin/lessons/${imported.lesson.lessonId}`, { method: "PATCH", body: { status: "archived" } })).status).toBe(200);
    expect((await json<{ lessons: unknown[] }>(await call("/api/admin/lessons?status=archived"))).lessons).toHaveLength(1);
  });

  it("returns the full file (with answers) to the admin for preview and re-editing", async () => {
    const list = await json<{ lessons: { id: string; slug: string }[] }>(await call("/api/admin/lessons?subject=maths"));
    const one = await json<{ lesson: { file: { quiz: { questions: { answer: unknown }[] } } } }>(await call(`/api/admin/lessons/${list.lessons[0]?.id}`));
    expect(one.lesson.file.quiz.questions[0]?.answer).toEqual(["a"]);
  });
});

describe("assets", () => {
  it("uploads a file, warns about missing assets, and serves it to a signed-in child only", async () => {
    const warn = await json<{ missingAssets: string[] }>(
      await call("/api/admin/lessons/import", { body: { file: lessonFixture({ slug: "maths-with-image", asset: "pizza.png", curriculum: null }) } }),
    );
    expect(warn.missingAssets).toEqual(["pizza.png"]);

    const form = new FormData();
    form.set("file", new File([new Uint8Array([137, 80, 78, 71])], "Pizza.PNG", { type: "image/png" }));
    const up = await call("/api/admin/assets", { form });
    expect(up.status).toBe(201);
    expect((await json<{ asset: { filename: string } }>(up)).asset.filename).toBe("pizza.png");

    const ok = await json<{ ok: boolean; missingAssets: string[] }>(
      await call("/api/admin/lessons/validate", { body: { file: lessonFixture({ slug: "maths-with-image", asset: "pizza.png", curriculum: null }) } }),
    );
    expect(ok.missingAssets).toEqual([]);

    expect((await call("/api/assets/pizza.png")).status).toBe(401);
    const creds = (await json<{ credentials: { username: string; password: string } }>(await call("/api/admin/students", { body: { displayName: "Ava" } }))).credentials;
    const login = await call("/api/login", { body: { username: creds.username, password: creds.password } });
    const cookie = (login.headers.get("set-cookie") ?? "").split(";")[0] ?? "";
    const file = await call("/api/assets/pizza.png", { cookie });
    expect(file.status).toBe(200);
    expect(file.headers.get("content-type")).toBe("image/png");
    expect(file.headers.get("x-content-type-options")).toBe("nosniff");
    expect((await call("/api/assets/missing.png", { cookie })).status).toBe(404);
  });

  it("rejects unsafe types and path tricks", async () => {
    const form = new FormData();
    form.set("file", new File(["<script>"], "evil.html", { type: "text/html" }));
    expect((await call("/api/admin/assets", { form })).status).toBe(400);
    expect((await call("/api/admin/assets/file/..%2Fsecret")).status).toBe(404);
  });
});

describe("curriculum planner, classes and assignments", () => {
  it("replaces a course's lesson slots and reads them back in order", async () => {
    const courses = await json<{ courses: { id: string; slug: string }[] }>(await call("/api/admin/courses"));
    const course = courses.courses.find((c) => c.slug === "maths-year-1");
    const lessons = await json<{ lessons: { id: string; slug: string }[] }>(await call("/api/admin/lessons?subject=maths"));
    const lessonId = lessons.lessons.find((l) => l.slug === "maths-halves-and-quarters")?.id as string;

    const put = await call(`/api/admin/courses/${course?.id}/lessons`, { method: "PUT", body: { slots: [{ lessonId, semester: 2, week: 5 }] } });
    expect(put.status).toBe(200);
    const detail = await json<{ slots: { semester: number; week: number }[] }>(await call(`/api/admin/courses/${course?.id}`));
    expect(detail.slots).toMatchObject([{ semester: 2, week: 5 }]);

    expect((await call(`/api/admin/courses/${course?.id}/lessons`, { method: "PUT", body: { slots: [{ lessonId, semester: 2, week: null }] } })).status).toBe(400);
  });

  it("generates four semesters from a Monday and rejects other days", async () => {
    const classes = await json<{ classes: { id: string; name: string }[] }>(await call("/api/admin/classes"));
    const family = classes.classes.find((c) => c.name === "Family");
    expect((await call(`/api/admin/classes/${family?.id}/terms/generate`, { body: { startDate: "2026-09-08" } })).status).toBe(400);
    const ok = await call(`/api/admin/classes/${family?.id}/terms/generate`, { body: { startDate: "2026-09-07" } });
    expect(ok.status).toBe(200);
    const detail = await json<{ terms: { number: number; startDate: string; examWeek: number }[] }>(await call(`/api/admin/classes/${family?.id}`));
    expect(detail.terms.map((t) => t.startDate)).toEqual(["2026-09-07", "2026-12-07", "2027-03-08", "2027-06-07"]);
    expect(detail.terms[0]?.examWeek).toBe(13);
  });

  it("assigns a course to a class once, and to a single student", async () => {
    const classes = await json<{ classes: { id: string; name: string }[] }>(await call("/api/admin/classes"));
    const family = classes.classes.find((c) => c.name === "Family")?.id as string;
    const course = (await json<{ courses: { id: string }[] }>(await call("/api/admin/courses"))).courses[0]?.id as string;
    const student = (await json<{ students: { id: string }[] }>(await call("/api/admin/students"))).students[0]?.id as string;

    expect((await call("/api/admin/assignments", { body: { courseId: course, classId: family } })).status).toBe(201);
    expect((await call("/api/admin/assignments", { body: { courseId: course, classId: family } })).status).toBe(409);
    expect((await call("/api/admin/assignments", { body: { courseId: course, userId: student } })).status).toBe(201);
    expect((await call("/api/admin/assignments", { body: { courseId: course } })).status).toBe(400);
    expect((await call("/api/admin/assignments", { body: { courseId: course, classId: family, userId: student } })).status).toBe(400);
    const list = await json<{ assignments: unknown[] }>(await call("/api/admin/assignments"));
    expect(list.assignments).toHaveLength(2);
  });

  it("sets class membership", async () => {
    const family = (await json<{ classes: { id: string; name: string }[] }>(await call("/api/admin/classes"))).classes.find((c) => c.name === "Family")?.id as string;
    const students = (await json<{ students: { id: string }[] }>(await call("/api/admin/students"))).students;
    const res = await call(`/api/admin/classes/${family}/members`, { method: "PUT", body: { userIds: students.map((s) => s.id) } });
    expect((await json<{ count: number }>(res)).count).toBe(students.length);
  });
});

describe("backups", () => {
  it("writes a database backup to R2 and keeps only the newest few", async () => {
    const first = await call("/api/admin/backups", { method: "POST", body: {} });
    expect(first.status).toBe(201);
    const { key, rows } = await json<{ key: string; rows: number }>(first);
    expect(key).toMatch(/^backups\/\d{4}-\d{2}-\d{2}\.json$/);
    expect(rows).toBeGreaterThan(0);
    const stored = JSON.parse(await (await env.ASSETS_BUCKET.get(key))!.text()) as { tables: { subjects: unknown[] } };
    expect(stored.tables.subjects.length).toBeGreaterThan(0);
    for (let d = 1; d <= 10; d++) await env.ASSETS_BUCKET.put(`backups/2020-01-${String(d).padStart(2, "0")}.json`, "{}");
    await call("/api/admin/backups", { method: "POST", body: {} });
    const list = await json<{ backups: { key: string }[] }>(await call("/api/admin/backups"));
    expect(list.backups).toHaveLength(8);
    expect(list.backups[0]?.key).toBe(key);
  });
});
