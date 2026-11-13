import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { createTestEnv } from "../../test/db";

let env: Bindings;
let dispose: () => Promise<void>;
beforeAll(async () => ({ env, dispose } = await createTestEnv()));
afterAll(async () => dispose());

const call = async (path: string, method: string, body?: unknown) => {
  const res = await app.request(path, { method, headers: body ? { "Content-Type": "application/json" } : {}, body: body ? JSON.stringify(body) : undefined }, env);
  return { status: res.status, json: (await res.json().catch(() => ({}))) as any };
};

describe("archiving and deleting courses", () => {
  it("hides archived courses by default, restores them, and deletes only unused ones", async () => {
    const a = (await call("/api/admin/courses", "POST", { title: "Old maths" })).json.course.id;
    const b = (await call("/api/admin/courses", "POST", { title: "Used maths" })).json.course.id;
    const cls = (await call("/api/admin/classes", "POST", { name: "Class 1" })).json;
    const classId = cls.id ?? cls.class?.id;
    await call(`/api/admin/classes/${classId}/courses`, "PUT", { courses: [{ courseId: b, unlockRule: "mastery", passPercent: 70 }] });

    await call(`/api/admin/courses/${a}`, "PATCH", { status: "archived" });
    expect((await call("/api/admin/courses", "GET")).json.courses.map((c: any) => c.id)).not.toContain(a);
    expect((await call("/api/admin/courses?archived=1", "GET")).json.courses.map((c: any) => c.id)).toContain(a);
    await call(`/api/admin/courses/${a}`, "PATCH", { status: "published" });
    expect((await call("/api/admin/courses", "GET")).json.courses.map((c: any) => c.id)).toContain(a);

    expect((await call(`/api/admin/courses/${b}`, "DELETE")).status).toBe(409);
    expect((await call(`/api/admin/courses/${a}`, "DELETE")).status).toBe(200);
    expect((await call(`/api/admin/courses/${a}`, "GET")).status).toBe(404);
  });
});
