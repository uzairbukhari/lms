import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { StudentCredentials } from "@lms/schema";
import { app } from "../index";
import type { Bindings } from "../env";
import { createTestEnv } from "../../test/db";

let env: Bindings;
let dispose: () => Promise<void>;

beforeAll(async () => {
  ({ env, dispose } = await createTestEnv());
});
afterAll(async () => dispose());

async function call(path: string, opts: { method?: string; body?: unknown; cookie?: string; e?: Bindings; ip?: string } = {}) {
  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";
  if (opts.cookie) headers["Cookie"] = opts.cookie;
  if (opts.ip) headers["CF-Connecting-IP"] = opts.ip;
  return app.request(
    path,
    { method: opts.method ?? (opts.body !== undefined ? "POST" : "GET"), headers, body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined },
    opts.e ?? env,
  );
}

function cookieFrom(res: Response): string {
  const set = res.headers.get("set-cookie") ?? "";
  return set.split(";")[0] ?? "";
}

async function createStudent(name: string, extra: object = {}): Promise<StudentCredentials> {
  const res = await call("/api/admin/students", { body: { displayName: name, ...extra } });
  expect(res.status).toBe(201);
  return ((await res.json()) as { credentials: StudentCredentials }).credentials;
}

describe("student login flow", () => {
  it("creates a student with a generated username and password, then logs in", async () => {
    const creds = await createStudent("Maya");
    expect(creds.username).toBe("maya");
    expect(creds.password).toMatch(/^[a-z]+-[a-z]+-\d{2}$/);

    const login = await call("/api/login", { body: { username: "Maya", password: creds.password } });
    expect(login.status).toBe(200);
    const cookie = cookieFrom(login);
    expect(cookie).toMatch(/^lms_session=/);
    expect(login.headers.get("set-cookie")).toMatch(/HttpOnly/i);

    const me = (await (await call("/api/me", { cookie })).json()) as { user: { username: string; theme: string } };
    expect(me.user.username).toBe("maya");
    expect(me.user.theme).toBe("space");
  });

  it("never returns password data", async () => {
    const creds = await createStudent("Zara");
    const login = await call("/api/login", { body: { username: "zara", password: creds.password } });
    const text = JSON.stringify(await login.json());
    expect(text).not.toMatch(/pbkdf2|password_hash|passwordHash/i);
  });

  it("gives the same answer for a wrong password and an unknown user", async () => {
    await createStudent("Noor", { password: "correct-pass-1" });
    const wrong = await call("/api/login", { body: { username: "noor", password: "nope" } });
    const unknown = await call("/api/login", { body: { username: "ghost", password: "nope" } });
    expect(wrong.status).toBe(401);
    expect(unknown.status).toBe(401);
    expect(await wrong.json()).toEqual(await unknown.json());
  });

  it("makes unique usernames for matching names", async () => {
    const a = await createStudent("Sam");
    const b = await createStudent("Sam");
    expect(a.username).toBe("sam");
    expect(b.username).toBe("sam2");
  });

  it("rejects a taken or reserved username", async () => {
    await createStudent("Leo", { username: "leo" });
    expect((await call("/api/admin/students", { body: { displayName: "Other", username: "leo" } })).status).toBe(409);
    expect((await call("/api/admin/students", { body: { displayName: "Boss", username: "admin" } })).status).toBe(409);
  });

  it("saves the chosen theme and lets a child change her password", async () => {
    const creds = await createStudent("Ivy", { password: "first-pass-1" });
    const cookie = cookieFrom(await call("/api/login", { body: { username: "ivy", password: "first-pass-1" } }));

    const theme = await call("/api/me/theme", { method: "PATCH", body: { theme: "candy" }, cookie });
    expect(theme.status).toBe(200);
    expect(((await (await call("/api/me", { cookie })).json()) as { user: { theme: string } }).user.theme).toBe("candy");
    expect((await call("/api/me/theme", { method: "PATCH", body: { theme: "neon" }, cookie })).status).toBe(400);

    expect((await call("/api/me/password", { body: { currentPassword: "wrong", newPassword: "second-pass-2" }, cookie })).status).toBe(400);
    expect((await call("/api/me/password", { body: { currentPassword: "first-pass-1", newPassword: "second-pass-2" }, cookie })).status).toBe(200);
    expect((await call("/api/login", { body: { username: creds.username, password: "first-pass-1" } })).status).toBe(401);
    expect((await call("/api/login", { body: { username: creds.username, password: "second-pass-2" } })).status).toBe(200);
  });

  it("logs out and ends the session", async () => {
    const creds = await createStudent("Eli");
    const cookie = cookieFrom(await call("/api/login", { body: { username: "eli", password: creds.password } }));
    expect((await call("/api/logout", { method: "POST", cookie })).status).toBe(200);
    expect(((await (await call("/api/me", { cookie })).json()) as { user: unknown }).user).toBeNull();
  });

  it("requires a session for /me/theme", async () => {
    expect((await call("/api/me/theme", { method: "PATCH", body: { theme: "candy" } })).status).toBe(401);
  });

  it("locks out after too many wrong passwords", async () => {
    await createStudent("Finn", { password: "right-pass-9" });
    for (let i = 0; i < 10; i++) {
      expect((await call("/api/login", { body: { username: "finn", password: "bad" }, ip: "9.9.9.9" })).status).toBe(401);
    }
    const locked = await call("/api/login", { body: { username: "finn", password: "right-pass-9" }, ip: "9.9.9.9" });
    expect(locked.status).toBe(429);
  });

  it("blocks a deactivated student, including an existing session", async () => {
    const creds = await createStudent("Kai");
    const cookie = cookieFrom(await call("/api/login", { body: { username: "kai", password: creds.password } }));
    expect((await call(`/api/admin/students/${creds.id}`, { method: "PATCH", body: { isActive: false } })).status).toBe(200);
    expect(((await (await call("/api/me", { cookie })).json()) as { user: unknown }).user).toBeNull();
    expect((await call("/api/login", { body: { username: "kai", password: creds.password } })).status).toBe(401);
  });

  it("reset-password issues a new password and the old one stops working", async () => {
    const creds = await createStudent("Rose");
    const res = await call(`/api/admin/students/${creds.id}/reset-password`, { method: "POST" });
    const fresh = ((await res.json()) as { credentials: StudentCredentials }).credentials;
    expect(fresh.password).not.toBe(creds.password);
    expect((await call("/api/login", { body: { username: "rose", password: creds.password } })).status).toBe(401);
    expect((await call("/api/login", { body: { username: "rose", password: fresh.password } })).status).toBe(200);
  });
});

describe("admin", () => {
  it("creates the admin row and a default Family class on first use", async () => {
    const res = await call("/api/admin/me");
    expect(res.status).toBe(200);
    const classes = (await (await call("/api/admin/classes")).json()) as { classes: { name: string }[] };
    expect(classes.classes.map((c) => c.name)).toContain("Family");
  });

  it("bulk-creates students into a class", async () => {
    const cls = (await (await call("/api/admin/classes", { body: { name: "Saturday Club" } })).json()) as { class: { id: string } };
    const res = await call("/api/admin/students/bulk", { body: { names: ["Ana", "Ben", "Ana"], classIds: [cls.class.id] } });
    expect(res.status).toBe(201);
    const { credentials } = (await res.json()) as { credentials: StudentCredentials[] };
    expect(credentials.map((c) => c.username)).toEqual(["ana", "ben", "ana2"]);
    const list = (await (await call("/api/admin/students")).json()) as { students: { username: string; classes: { name: string }[] }[] };
    expect(list.students.find((s) => s.username === "ben")?.classes.map((c) => c.name)).toEqual(["Saturday Club"]);
  });

  it("deletes a student and their records", async () => {
    const creds = await createStudent("Temp");
    expect((await call(`/api/admin/students/${creds.id}`, { method: "DELETE" })).status).toBe(200);
    const list = (await (await call("/api/admin/students")).json()) as { students: { id: string }[] };
    expect(list.students.some((s) => s.id === creds.id)).toBe(false);
  });

  it("refuses admin routes without Cloudflare Access", async () => {
    const locked: Bindings = { ...env, ENVIRONMENT: "production", DEV_ADMIN_EMAIL: undefined };
    expect((await call("/api/admin/students", { e: locked })).status).toBe(403); // Access not configured

    const configured: Bindings = { ...locked, ACCESS_TEAM_DOMAIN: "family.cloudflareaccess.com", ACCESS_AUD: "aud" };
    expect((await call("/api/admin/students", { e: configured })).status).toBe(401); // no Access token
  });

  it("does not treat a student session as admin", async () => {
    const creds = await createStudent("Mia");
    const cookie = cookieFrom(await call("/api/login", { body: { username: "mia", password: creds.password } }));
    const configured: Bindings = {
      ...env, ENVIRONMENT: "production", DEV_ADMIN_EMAIL: undefined,
      ACCESS_TEAM_DOMAIN: "family.cloudflareaccess.com", ACCESS_AUD: "aud",
    };
    expect((await call("/api/admin/students", { cookie, e: configured })).status).toBe(401);
  });
});
