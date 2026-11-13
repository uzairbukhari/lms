import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { createTestEnv } from "../../test/db";
import { pointTotals } from "../lib/map";

let env: Bindings;
let dispose: () => Promise<void>;
beforeAll(async () => ({ env, dispose } = await createTestEnv()));
afterAll(async () => dispose());

const call = async (path: string, method: string, body?: unknown, cookie?: string) => {
  const res = await app.request(path, { method, headers: { ...(body ? { "Content-Type": "application/json" } : {}), ...(cookie ? { Cookie: cookie } : {}) }, body: body ? JSON.stringify(body) : undefined }, env);
  return { status: res.status, json: (await res.json().catch(() => ({}))) as any, headers: res.headers };
};

describe("archiving a class gives its students a fresh start", () => {
  it("moves progress to a saved record, frees the child for a new class and keeps the record reviewable", async () => {
    const subj = await env.DB.prepare("SELECT id FROM subjects LIMIT 1").first<{ id: string }>();
    await env.DB.prepare("INSERT INTO lessons (id, slug, subject_id, title, age_band, difficulty, content_json, source_json) VALUES ('arc1','arc1',?, 'Fractions', '7-8', 1, '[]', '{}')").bind(subj!.id).run();
    const cls = (await call("/api/admin/classes", "POST", { name: "Class 4" })).json;
    const classId = cls.id ?? cls.class?.id;
    const made = (await call("/api/admin/students", "POST", { displayName: "Fatima", classIds: [classId] })).json.credentials;
    await env.DB.prepare("INSERT INTO lesson_progress (user_id, lesson_id, status, completed_at) VALUES (?, 'arc1', 'completed', datetime('now'))").bind(made.id).run();

    const archived = await call(`/api/admin/classes/${classId}`, "PATCH", { isActive: false });
    expect(archived.json.archivedStudents).toBe(1);

    // The child is clear of the class and has no progress left.
    const students = (await call("/api/admin/students", "GET")).json.students;
    const child = students.find((s: any) => s.id === made.id);
    expect(child.classes).toEqual([]);
    expect(students.filter((s: any) => s.displayName === "Fatima")).toHaveLength(1); // the saved record is not listed
    expect((await env.DB.prepare("SELECT COUNT(*) AS n FROM lesson_progress WHERE user_id = ?").bind(made.id).first<{ n: number }>())?.n).toBe(0);

    // The class page lists the saved record, and its report still shows the old progress.
    const detail = (await call(`/api/admin/classes/${classId}`, "GET")).json;
    expect(detail.members).toHaveLength(0);
    expect(detail.archived).toHaveLength(1);
    const rec = detail.archived[0].recordId;
    const report = (await call(`/api/admin/reports/students/${rec}`, "GET")).json;
    expect(report.totals.lessonsCompleted).toBe(1);
    expect(report.archive.className).toBe("Class 4");
    const classReport = (await call(`/api/admin/reports/classes/${classId}`, "GET")).json;
    expect(classReport.students.map((s: any) => s.displayName)).toEqual(["Fatima"]);

    // The child's own page lists the previous class, and the class cannot be deleted while it holds records.
    const own = (await call(`/api/admin/reports/students/${made.id}`, "GET")).json;
    expect(own.previousClasses).toHaveLength(1);
    expect(own.totals.lessonsCompleted).toBe(0);
    expect((await call(`/api/admin/classes/${classId}`, "DELETE")).status).toBe(409);

    // Points the child had are carried over.
    await env.DB.prepare("UPDATE users SET carried_points = 42 WHERE id = ?").bind(made.id).run();
    expect((await pointTotals(env.DB, made.id, "2026-11-13")).total).toBeGreaterThanOrEqual(42);

    // A new class starts clean.
    const next = (await call("/api/admin/classes", "POST", { name: "Class 5" })).json;
    await call(`/api/admin/students/${made.id}/classes`, "PUT", { classIds: [next.id ?? next.class?.id] });
    const own2 = (await call(`/api/admin/reports/students/${made.id}`, "GET")).json;
    expect(own2.totals.lessonsCompleted).toBe(0);
    expect(own2.previousClasses).toHaveLength(1);

    // Deleting the child also removes the saved record.
    expect((await call(`/api/admin/students/${made.id}`, "DELETE")).status).toBe(200);
    expect((await env.DB.prepare("SELECT COUNT(*) AS n FROM users WHERE id = ?").bind(rec).first<{ n: number }>())?.n).toBe(0);
  });
});
