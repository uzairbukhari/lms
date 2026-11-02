import { Hono } from "hono";
import { changePasswordSchema, loginSchema, setThemeSchema } from "@lms/schema";
import type { AppEnv } from "../env";
import { fail, parseBody } from "../lib/http";
import { burnPasswordCheck, hashPassword, verifyPassword } from "../lib/password";
import {
  clearFailures,
  endSession,
  isRateLimited,
  rateLimitKeys,
  readSession,
  recordFailure,
  startSession,
} from "../lib/session";
import { getUserById, getUserByUsername, toSessionUser } from "../lib/users";
import { requireStudent } from "../middleware/auth";

export const authRoutes = new Hono<AppEnv>();

authRoutes.post("/login", async (c) => {
  const { username, password } = await parseBody(c, loginSchema);
  const ip = c.req.header("CF-Connecting-IP") ?? "unknown";
  const keys = rateLimitKeys(username, ip);

  if (await isRateLimited(c.env.SESSIONS, keys)) {
    return fail(c, 429, "too_many_attempts", "Too many tries. Please wait a few minutes and try again.");
  }

  const row = await getUserByUsername(c.env.DB, username);
  const ok =
    row !== null && row.role === "student" && row.is_active === 1 && row.password_hash !== null
      ? await verifyPassword(password, row.password_hash)
      : (await burnPasswordCheck(password), false);

  if (!ok || !row) {
    await recordFailure(c.env.SESSIONS, keys);
    // The same answer for "no such user", "wrong password" and "switched off", so usernames cannot be guessed.
    return fail(c, 401, "bad_login", "That username or password is not right.");
  }

  await clearFailures(c.env.SESSIONS, keys);
  await startSession(c, row.id);
  return c.json({ user: toSessionUser(row) });
});

authRoutes.post("/logout", async (c) => {
  await endSession(c);
  return c.json({ ok: true });
});

/** The child's own profile, or { user: null } when not signed in (so the app can show the login page). */
authRoutes.get("/me", async (c) => {
  const session = await readSession(c);
  if (!session) return c.json({ user: null });
  const row = await getUserById(c.env.DB, session.userId);
  if (!row || row.role !== "student" || row.is_active !== 1) return c.json({ user: null });
  return c.json({ user: toSessionUser(row) });
});

authRoutes.patch("/me/theme", requireStudent, async (c) => {
  const { theme } = await parseBody(c, setThemeSchema);
  const user = c.get("user");
  await c.env.DB.prepare("UPDATE users SET theme = ? WHERE id = ?").bind(theme, user.id).run();
  return c.json({ user: { ...user, theme } });
});

authRoutes.post("/me/password", requireStudent, async (c) => {
  const { currentPassword, newPassword } = await parseBody(c, changePasswordSchema);
  const user = c.get("user");
  const row = await getUserById(c.env.DB, user.id);
  if (!row?.password_hash || !(await verifyPassword(currentPassword, row.password_hash))) {
    return fail(c, 400, "wrong_password", "That is not your current password.");
  }
  await c.env.DB
    .prepare("UPDATE users SET password_hash = ?, must_change_password = 0 WHERE id = ?")
    .bind(await hashPassword(newPassword), user.id)
    .run();
  return c.json({ ok: true });
});
