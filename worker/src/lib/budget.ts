import { aiDailyCap, DEFAULT_AI_CAP_NEURONS } from "./settings";
import { neuronsFor, TOKEN_MODEL_DEFAULT } from "./usage";

// A hard daily ceiling on Workers AI. Cloudflare gives 10,000 neurons free every day (the day resets at 00:00 UTC); this
// stops every model call once the day's metered total, plus the call about to be made, would pass the ceiling.
// The default ceiling sits a little under the free allowance because per-call neurons are estimated from published rates,
// so a small margin keeps the real total from creeping over 10,000. Cached replies and stored audio never reach this.

/** The ceiling is an admin setting (Settings page); the default is DEFAULT_AI_CAP_NEURONS, 500 under the free 10,000. */
export { DEFAULT_AI_CAP_NEURONS };

/** Rough cost of one text call before it is made (prompt of about 4 characters per token plus the reply allowance). */
export const TEXT_CALL_ESTIMATE = neuronsFor(TOKEN_MODEL_DEFAULT, { inputTokens: 600, outputTokens: 120 });

export type AiBudget = { used: number; ceiling: number; remaining: number; paused: boolean; resetsAt: string };

const utcDay = (d: Date) => d.toISOString().slice(0, 10);

/** Today's (UTC) metered neurons, from the same table the admin usage card reads. Every user counts, as Cloudflare's meter does. */
export async function aiBudget(db: D1Database, now = new Date()): Promise<AiBudget> {
  const row = await db.prepare("SELECT COALESCE(SUM(neurons), 0) AS n FROM ai_usage WHERE date(created_at) = ?").bind(utcDay(now)).first<{ n: number }>();
  const used = row?.n ?? 0;
  const ceiling = await aiDailyCap(db);
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return { used, ceiling, remaining: Math.max(0, ceiling - used), paused: used >= ceiling, resetsAt: next.toISOString() };
}

/**
 * True when a call expected to cost `estimate` neurons still fits under today's ceiling. If the budget cannot be read the
 * call is refused: failing closed is the safe side when the point is to avoid a bill.
 */
export async function canSpend(db: D1Database, estimate: number): Promise<boolean> {
  try {
    const b = await aiBudget(db);
    return b.used + estimate <= b.ceiling;
  } catch (err) {
    console.error("could not read AI budget", err);
    return false;
  }
}
