import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { createTestEnv } from "../../test/db";

let env: Bindings;
let dispose: () => Promise<void>;
beforeAll(async () => { ({ env, dispose } = await createTestEnv()); });
afterAll(async () => dispose());

const call = (path: string, method = "GET", body?: unknown) =>
  app.request(path, { method, headers: body === undefined ? {} : { "Content-Type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body) }, env);
const j = async <T = Record<string, any>>(r: Response) => (await r.json()) as T;

describe("admin v3 routes", () => {
  it("creates tags once and lists them with lesson counts", async () => {
    const a = await j(await call("/api/admin/tags", "POST", { kind: "topic", label: "Fractions" }));
    const b = await j(await call("/api/admin/tags", "POST", { kind: "topic", label: "fractions" }));
    expect(b.id).toBe(a.id);
    const list = await j<{ tags: { label: string; lessons: number }[] }>(await call("/api/admin/tags"));
    expect(list.tags.filter((t) => t.label.toLowerCase() === "fractions")).toHaveLength(1);
  });

  it("sets a class's courses with unlock rules and validates drip", async () => {
    const cls = await env.DB.prepare("SELECT id FROM classes LIMIT 1").first<{ id: string }>();
    const classId = cls?.id ?? "k1";
    if (!cls) await env.DB.prepare("INSERT INTO classes (id, name) VALUES ('k1','Class 1')").run();
    await env.DB.prepare("INSERT INTO courses (id, title) VALUES ('c1','Maths 1'), ('c2','Science 1')").run();
    expect((await call(`/api/admin/classes/${classId}/courses`, "PUT", { courses: [{ courseId: "c1", unlockRule: "drip" }] })).status).toBe(400);
    const ok = await call(`/api/admin/classes/${classId}/courses`, "PUT", { courses: [{ courseId: "c2", unlockRule: "open" }, { courseId: "c1", unlockRule: "drip", dripStart: "2026-11-16", dripEveryDays: 7 }] });
    expect(ok.status).toBe(200);
    const got = await j<{ courses: { courseId: string; unlockRule: string; dripEveryDays: number | null }[] }>(await call(`/api/admin/classes/${classId}/courses`));
    expect(got.courses.map((x) => x.courseId)).toEqual(["c2", "c1"]);
    expect(got.courses[1]).toMatchObject({ unlockRule: "drip", dripEveryDays: 7 });
    const assigned = await env.DB.prepare("SELECT course_id AS c FROM course_assignments WHERE class_id = ? ORDER BY course_id").bind(classId).all<{ c: string }>();
    expect(assigned.results.map((r) => r.c)).toEqual(expect.arrayContaining(["c1", "c2"]));
  });

  it("adds a teacher with class access and logs it", async () => {
    const cls = await env.DB.prepare("SELECT id FROM classes LIMIT 1").first<{ id: string }>();
    const res = await call("/api/admin/staff", "POST", { displayName: "Miss Aisha", email: "Aisha@Example.com", classes: [{ classId: cls!.id, access: "edit" }] });
    expect(res.status).toBe(201);
    expect((await call("/api/admin/staff", "POST", { displayName: "Dup", email: "aisha@example.com" })).status).toBe(409);
    const list = await j<{ teachers: { email: string; classes: { access: string }[] }[] }>(await call("/api/admin/staff"));
    expect(list.teachers[0]).toMatchObject({ email: "aisha@example.com", classes: [{ access: "edit" }] });
    const act = await j<{ activity: { action: string }[] }>(await call("/api/admin/activity"));
    expect(act.activity.map((a) => a.action)).toContain("staff.create");
  });
});

describe("course builder", () => {
  it("saves order and sections and keeps old weekly placement", async () => {
    const subj = await env.DB.prepare("SELECT id FROM subjects LIMIT 1").first<{ id: string }>();
    for (const n of ["x1", "x2"]) await env.DB.prepare("INSERT INTO lessons (id, slug, subject_id, title, age_band, difficulty, content_json, source_json) VALUES (?, ?, ?, ?, '7-8', 1, '[]', '{}')").bind(n, n, subj!.id, n).run();
    const lessons = { results: [{ id: "x1" }, { id: "x2" }] };
    await env.DB.prepare("INSERT INTO courses (id, title) VALUES ('cb','Builder')").run();
    await env.DB.prepare("INSERT INTO course_lessons (course_id, lesson_id, position, semester, week) VALUES ('cb', ?, 0, 1, 2)").bind(lessons.results[0]!.id).run();
    const [a, b] = lessons.results.map((l) => l.id);
    const res = await call("/api/admin/courses/cb/builder", "PUT", { items: [{ lessonId: b, section: "Part B" }, { lessonId: a }] });
    expect(res.status).toBe(200);
    const got = await j<{ items: { lessonId: string; section: string | null }[] }>(await call("/api/admin/courses/cb/builder"));
    expect(got.items.map((x) => x.lessonId)).toEqual([b, a]);
    expect(got.items[0]!.section).toBe("Part B");
    const kept = await env.DB.prepare("SELECT semester, week FROM course_lessons WHERE course_id='cb' AND lesson_id = ?").bind(a).first();
    expect(kept).toMatchObject({ semester: 1, week: 2 });
  });
});

describe("lesson details", () => {
  it("saves an age range and rejects a backwards one", async () => {
    const subj = await env.DB.prepare("SELECT id FROM subjects LIMIT 1").first<{ id: string }>();
    await env.DB.prepare("INSERT INTO lessons (id, slug, subject_id, title, age_band, difficulty, content_json, source_json) VALUES ('m1','m1',?, 'M', '7-8', 1, '[]', '{}')").bind(subj!.id).run();
    expect((await call("/api/admin/lessons/m1/meta", "PUT", { ageMin: 9, ageMax: 6 })).status).toBe(400);
    expect((await call("/api/admin/lessons/m1/meta", "PUT", { ageMin: 6, ageMax: 8 })).status).toBe(200);
    expect(await env.DB.prepare("SELECT age_min AS a, age_max AS b FROM lessons WHERE id='m1'").first()).toMatchObject({ a: 6, b: 8 });
  });
});

describe("delete a class", () => {
  it("removes the class and its links but keeps the students", async () => {
    await env.DB.prepare("INSERT INTO classes (id, name) VALUES ('del1','Gone')").run();
    await env.DB.prepare("INSERT INTO users (id, role, username, display_name, password_hash) VALUES ('s1','student','delkid','Kid','x')").run();
    await env.DB.prepare("INSERT INTO class_members (class_id, user_id) VALUES ('del1','s1')").run();
    await env.DB.prepare("UPDATE users SET class_id = 'del1' WHERE id = 's1'").run();
    expect((await call("/api/admin/classes/del1", "DELETE")).status).toBe(200);
    expect(await env.DB.prepare("SELECT 1 FROM classes WHERE id='del1'").first()).toBeNull();
    expect(await env.DB.prepare("SELECT class_id AS c FROM users WHERE id='s1'").first()).toMatchObject({ c: null });
    expect((await call("/api/admin/classes/del1", "DELETE")).status).toBe(404);
  });
});
