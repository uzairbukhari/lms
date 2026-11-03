import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import type { AppEnv } from "../env";

export const SESSION_COOKIE = "lms_session";
export const SESSION_TTL_SECONDS = 30 * 24 * 60 * 60;

export type SessionData = { userId: string; createdAt: number };

function newSessionId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

const key = (id: string) => `sess:${id}`;

/** Create a session and set the cookie. Returns the session id. */
export async function startSession(c: Context<AppEnv>, userId: string): Promise<string> {
  const id = newSessionId();
  const data: SessionData = { userId, createdAt: Date.now() };
  await c.env.SESSIONS.put(key(id), JSON.stringify(data), { expirationTtl: SESSION_TTL_SECONDS });
  setCookie(c, SESSION_COOKIE, id, {
    httpOnly: true,
    secure: new URL(c.req.url).protocol === "https:",
    sameSite: "Lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return id;
}

export async function readSession(c: Context<AppEnv>): Promise<SessionData | null> {
  const id = getCookie(c, SESSION_COOKIE);
  if (!id) return null;
  const raw = await c.env.SESSIONS.get(key(id));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionData;
  } catch {
    return null;
  }
}

export async function endSession(c: Context<AppEnv>): Promise<void> {
  const id = getCookie(c, SESSION_COOKIE);
  if (id) await c.env.SESSIONS.delete(key(id));
  deleteCookie(c, SESSION_COOKIE, { path: "/" });
}

// --- Login rate limiting: at most MAX_FAILURES wrong passwords per username and per IP in WINDOW seconds. ---

const MAX_FAILURES = 10;
const WINDOW_SECONDS = 15 * 60;

export function rateLimitKeys(username: string, ip: string): string[] {
  return [`rl:user:${username}`, `rl:ip:${ip}`];
}

export async function isRateLimited(kv: KVNamespace, keys: string[]): Promise<boolean> {
  for (const k of keys) {
    const count = Number((await kv.get(k)) ?? 0);
    if (count >= MAX_FAILURES) return true;
  }
  return false;
}

/** Wrong passwords so far in the current window (the highest of the per-username and per-IP counters). */
export async function failureCount(kv: KVNamespace, keys: string[]): Promise<number> {
  let max = 0;
  for (const k of keys) max = Math.max(max, Number((await kv.get(k)) ?? 0));
  return max;
}

/** After this many wrong passwords a Turnstile check is required (when configured). */
export const CHALLENGE_AFTER = 3;

export async function recordFailure(kv: KVNamespace, keys: string[]): Promise<void> {
  for (const k of keys) {
    const count = Number((await kv.get(k)) ?? 0);
    await kv.put(k, String(count + 1), { expirationTtl: WINDOW_SECONDS });
  }
}

export async function clearFailures(kv: KVNamespace, keys: string[]): Promise<void> {
  // Only the per-username counter is cleared, so one successful login cannot reset an IP's failures.
  const first = keys[0];
  if (first) await kv.delete(first);
}
