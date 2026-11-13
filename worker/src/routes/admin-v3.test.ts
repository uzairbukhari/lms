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
