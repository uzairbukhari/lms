import type { MiddlewareHandler } from "hono";
import type { AppEnv } from "../env";
import { verifyAccessJwt } from "../lib/access";
import { fail } from "../lib/http";
import { loadTeacher } from "../lib/staff";
import { readSession } from "../lib/session";
import { getUserById, toSessionUser } from "../lib/users";

/** Lets a signed-in, active child through. Sets c.var.user. */
export const requireStudent: MiddlewareHandler<AppEnv> = async (c, next) => {
  const session = await readSession(c);
  if (!session) return fail(c, 401, "not_signed_in");
  const row = await getUserById(c.env.DB, session.userId);
  if (!row || row.role !== "student" || row.is_active !== 1) return fail(c, 401, "not_signed_in");
  c.set("user", toSessionUser(row));
  await next();
};

/**
 * Lets only the parent through, verified by Cloudflare Access (or ENVIRONMENT=development with DEV_ADMIN_EMAIL).
 * The admin account row is created the first time you sign in.
 */
export const requireAdmin: MiddlewareHandler<AppEnv> = async (c, next) => {
  const env = c.env;
  const adminEmail = env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!adminEmail) return fail(c, 403, "admin_not_configured", "Set ADMIN_EMAIL for the Worker.");

  let email: string | undefined;
  if (env.ENVIRONMENT === "development" && env.DEV_ADMIN_EMAIL) {
    email = env.DEV_ADMIN_EMAIL.trim().toLowerCase();
  } else if (env.ACCESS_TEAM_DOMAIN && env.ACCESS_AUD) {
    const identity = await verifyAccessJwt(c.req.header("Cf-Access-Jwt-Assertion"), {
      teamDomain: env.ACCESS_TEAM_DOMAIN,
      aud: env.ACCESS_AUD,
    });
    email = identity?.email;
    // A service token (used by Claude to import lessons) acts as the admin, but only on the content routes listed below.
    if (!email && identity?.commonName && env.ACCESS_SERVICE_TOKEN_ID && identity.commonName === env.ACCESS_SERVICE_TOKEN_ID) {
      if (!automationMayCall(c.req.method, c.req.path)) return fail(c, 403, "service_token_scope", "This token can only create and read lessons and upload images.");
      email = adminEmail;
    }
  } else {
    return fail(c, 403, "admin_not_configured", "Set ACCESS_TEAM_DOMAIN and ACCESS_AUD for the Worker.");
  }

  if (!email) return fail(c, 401, "access_required");
  if (email !== adminEmail) {
    // Not the super admin: only a teacher added by the super admin gets in, and only to the routes teachers may use.
    const teacher = await loadTeacher(env.DB, email);
    if (!teacher) return fail(c, 403, "not_admin");
    if (!teacherMayCall(c.req.method, c.req.path)) return fail(c, 403, "teacher_scope", "Teachers cannot use this part of the admin yet.");
    c.set("admin", { userId: teacher.id, email, actor: teacher });
    return next();
  }

  const userId = await ensureAdminUser(env.DB, email);
  c.set("admin", { userId, email, actor: { id: userId, level: "super", classes: {} } });
  await next();
};

/** What a teacher may call for now: read the library and see who they are. Class actions are added with their own permission checks. */
export function teacherMayCall(method: string, path: string): boolean {
  if (method.toUpperCase() !== "GET") return false;
  return /^\/api\/admin\/(me|lessons(\/[^/]+(\/(outline|preview))?)?|courses(\/[^/]+)?|assets(\/file\/[^/]+)?)$/.test(path);
}

/** What a service token may do: check, import and read lessons and courses, and upload images. Nothing about children, classes, results or settings. */
export function automationMayCall(method: string, path: string): boolean {
  const m = method.toUpperCase();
  if (m === "POST") return /^\/api\/admin\/(lessons\/(validate|import)|assets|voice\/prewarm)$/.test(path);
  if (m === "GET") return /^\/api\/admin\/(lessons(\/[^/]+(\/(outline|preview))?)?|courses(\/[^/]+)?|assets|voice\/audio)$/.test(path);
  return false;
}

/** Finds or creates the admin's user row. The first admin also gets a default "Family" class. */
async function ensureAdminUser(db: D1Database, email: string): Promise<string> {
  const existing = await db
    .prepare("SELECT id FROM users WHERE role = 'admin' AND admin_email = ?")
    .bind(email)
    .first<{ id: string }>();
  if (existing) return existing.id;

  const id = crypto.randomUUID();
  const statements = [
    db
      .prepare(
        "INSERT INTO users (id, role, username, display_name, admin_email) VALUES (?, 'admin', ?, 'Parent', ?)",
      )
      // "@" cannot appear in a child's username, so this never clashes with one.
      .bind(id, `@admin-${id.slice(0, 8)}`, email),
    db.prepare(
      "INSERT INTO classes (id, name, description) SELECT ?, 'Family', 'Your own children' WHERE NOT EXISTS (SELECT 1 FROM classes)",
    ).bind(crypto.randomUUID()),
  ];
  await db.batch(statements);
  return id;
}
