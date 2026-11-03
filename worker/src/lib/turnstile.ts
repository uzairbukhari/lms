import type { Bindings } from "../env";

/** True when both Turnstile keys are set, so the login page can ask for a check after repeated failures. */
export const turnstileEnabled = (env: Bindings) => Boolean(env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET);

/** Checks a token with Cloudflare. Fails closed: any error counts as not verified. */
export async function verifyTurnstile(env: Bindings, token: string | undefined, ip: string): Promise<boolean> {
  if (!env.TURNSTILE_SECRET || !token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
