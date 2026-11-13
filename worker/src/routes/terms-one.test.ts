import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { createTestEnv } from "../../test/db";

let env: Bindings;
let dispose: () => Promise<void>;
beforeAll(async () => ({ env, dispose } = await createTestEnv()));
afterAll(async () => dispose());

const call = (path: string, method: string, body?: unknown) =>
  app.request(path, { method, headers: body ? { "Content-Type": "application/json" } : {}, body: body ? JSON.stringify(body) : undefined }, env);

describe("one semester at a time", () => {
  it("adds, edits and deletes single semesters", async () => {
    const cls = (await (await call("/api/admin/classes", "POST", { name: "Milestones" })).json()) as any;
    const classId = cls.id ?? cls.class?.id;
    const base = `/api/admin/classes/${classId}/terms`;
    expect((await call(base, "POST", { startDate: "2026-11-11" })).status).toBe(400); // Wednesday
    const a = await call(base, "POST", { startDate: "2026-11-09" });
    expect(a.status).toBe(201);
    expect(((await a.json()) as any).term.number).toBe(1);
    const b = (await (await call(base, "POST", { startDate: "2027-02-01", teachingWeeks: 8 })).json()) as any;
    expect(b.term).toMatchObject({ number: 2, teaching_weeks: 8, exam_week: 9 });
    expect((await call(base, "POST", { startDate: "2027-05-03", number: 2 })).status).toBe(409);
    const p = (await (await call(`${base}/2`, "PATCH", { teachingWeeks: 10 })).json()) as any;
    expect(p.term).toMatchObject({ start_date: "2027-02-01", teaching_weeks: 10 });
    expect((await call(`${base}/2`, "DELETE")).status).toBe(200);
    expect((await call(`${base}/2`, "DELETE")).status).toBe(404);
    const detail = (await (await call(`/api/admin/classes/${classId}`, "GET")).json()) as any;
    expect(detail.terms).toHaveLength(1);
  });
});
