import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { createTestEnv } from "../../test/db";

let env: Bindings;
let dispose: () => Promise<void>;
beforeAll(async () => ({ env, dispose } = await createTestEnv()));
afterAll(async () => dispose());

const call = (path: string, method: string, body?: unknown, cookie?: string) =>
  app.request(path, { method, headers: { ...(body ? { "Content-Type": "application/json" } : {}), ...(cookie ? { Cookie: cookie } : {}) }, body: body ? JSON.stringify(body) : undefined }, env);

describe("home character", () => {
  it("defaults to Zainab, can be switched by the admin, and reaches the child's session", async () => {
    const created = (await (await call("/api/admin/students", "POST", { displayName: "Dua" })).json()) as any;
    const { id, username, password } = created.credentials;
    let list = (await (await call("/api/admin/students", "GET")).json()) as any;
    expect(list.students.find((s: any) => s.id === id).homeCharacter).toBe("zainab");
    expect((await call(`/api/admin/students/${id}`, "PATCH", { homeCharacter: "robot" })).status).toBe(400);
    const res = await call(`/api/admin/students/${id}`, "PATCH", { homeCharacter: "fatima" });
    expect(res.status).toBe(200);
    expect(((await res.json()) as any).student.homeCharacter).toBe("fatima");
    const login = await call("/api/login", "POST", { username, password });
    const cookie = (login.headers.get("set-cookie") ?? "").split(";")[0] as string;
    const me = (await (await call("/api/me", "GET", undefined, cookie)).json()) as any;
    expect(me.user.homeCharacter).toBe("fatima");
  });
});
