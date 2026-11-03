import { Hono, type Context } from "hono";
import { changePasswordSchema, loginSchema, setThemeSchema } from "@lms/schema";
import type { AppEnv } from "../env";
import { fail, parseBody } from "../lib/http";
import { burnPasswordCheck, hashPassword, verifyPassword } from "../lib/password";
import {
  CHALLENGE_AFTER,
  clearFailures,
  endSession,
  failureCount,
  isRateLimited,
  rateLimitKeys,
  readSession,
  recordFailure,
  startSession,
} from "../lib/session";
import { turnstileEnabled, verifyTurnstile } from "../lib/turnstile";
import { getUserById, getUserByUsername, toSessionUser } from "../lib/users";
import { requireStudent } from "../middleware/auth";

export const authRoutes = new Hono<AppEnv>();

/** Sign-in history for the parent: when, from which country and what kind of device. Never the password or IP. */
async function recordLogin(c: Context<AppEnv>, userId: string | null, username: string, ok: boolean) {
  const ua = c.req.header("User-Agent") ?? "";
  const device = /iPad|Tablet/i.test(ua) ? "iPad / tablet" : /iPhone|Android.*Mobile/i.test(ua) ? "Phone" : /Windows|Macintosh|Linux|CrOS/i.test(ua) ? "Computer" : "Unknown";
  try {
    await c.env.DB
      .prepare("INSERT INTO login_events (id, user_id, username, ok, country, device) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(crypto.randomUUID(), userId, username.slice(0, 40), ok ? 1 : 0, c.req.header("CF-IPCountry") ?? null, device)
      .run();
  } catch (e) {
    console.error("login history failed", e); // never block a sign-in because the history could not be written
  }
}

authRoutes.post("/login", async (c) => {
  const { username, password, turnstileToken } = await parseBody(c, loginSchema);
  const ip = c.req.header("CF-Connecting-IP") ?? "unknown";
  const keys = rateLimitKeys(username, ip);

  if (await isRateLimited(c.env.SESSIONS, keys)) {
    return fail(c, 429, "too_many_attempts", "Too many tries. Please wait a few minutes and try again.");
  }

  // After a few wrong passwords, ask for a Turnstile check (only when Turnstile is set up).
  if (turnstileEnabled(c.env) && (await failureCount(c.env.SESSIONS, keys)) >= CHALLENGE_AFTER && !(await verifyTurnstile(c.env, turnstileToken, ip))) {
    return c.json({ error: "challenge_required", message: "Please tick the box to show you are not a robot.", siteKey: c.env.TURNSTILE_SITE_KEY }, 403);
  }

  const row = await getUserByUsername(c.env.DB, username);
  const ok =
    row !== null && row.role === "student" && row.is_active === 1 && row.password_hash !== null
      ? await verifyPassword(password, row.password_hash)
      : (await burnPasswordCheck(password), false);

  if (!ok || !row) {
    // TEMP DEBUG (remove): why local login fails. Local development only; reason codes, no identifying data.
    if (c.env.ENVIRONMENT === "development") {
      const reason = !row ? "no_user" : row.role !== "student" ? "not_student" : row.is_active !== 1 ? "inactive" : row.password_hash === null ? "no_password" : !row.password_hash.startsWith("pbkdf2$100000$") ? "other_hash_format" : "password_mismatch";
      console.log("LOGIN_DEBUG", JSON.stringify({ reason, edgeSpaces: password !== password.trim() }));
    }
    await recordFailure(c.env.SESSIONS, keys);
    await recordLogin(c, row?.role === "student" ? row.id : null, username, false);
    // The same answer for "no such user", "wrong password" and "switched off", so usernames cannot be guessed.
    return fail(c, 401, "bad_login", "That username or password is not right.");
  }

  await clearFailures(c.env.SESSIONS, keys);
  await recordLogin(c, row.id, username, true);
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
