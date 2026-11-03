// Workers AI usage metering. Cloudflare bills in "neurons": a fixed price per million tokens (or per thousand
// characters of speech) for each model. Rates below are Cloudflare's published pricing for the models we use;
// update them here if the pricing page changes. Costs shown in the admin panel are estimates.

export const NEURON_USD = 0.011 / 1000;
/** Neurons included free each day on every account (resets at 00:00 UTC). */
export const FREE_NEURONS_PER_DAY = 10_000;

const TOKEN_RATES: Record<string, { inPerM: number; outPerM: number }> = {
  "@cf/meta/llama-3.1-8b-instruct": { inPerM: 25_608, outPerM: 75_147 },
};
export const TOKEN_MODEL_DEFAULT = "@cf/meta/llama-3.1-8b-instruct";
const DEFAULT_TOKEN_RATE = TOKEN_RATES[TOKEN_MODEL_DEFAULT] as { inPerM: number; outPerM: number };
const SPEECH_NEURONS_PER_1K_CHARS: Record<string, number> = { "@cf/deepgram/aura-2-en": 2_727 };

export type UsageKind = "hint" | "explain" | "narration" | "define";

export function neuronsFor(model: string, u: { inputTokens?: number; outputTokens?: number; characters?: number }): number {
  const speech = SPEECH_NEURONS_PER_1K_CHARS[model];
  if (speech !== undefined) return ((u.characters ?? 0) / 1000) * speech;
  const r = TOKEN_RATES[model] ?? DEFAULT_TOKEN_RATE;
  return ((u.inputTokens ?? 0) / 1e6) * r.inPerM + ((u.outputTokens ?? 0) / 1e6) * r.outPerM;
}

/** Read token counts from a Workers AI response, falling back to a rough estimate (about 4 characters per token). */
export function tokensFrom(out: unknown, promptChars: number, replyText: unknown): { inputTokens: number; outputTokens: number } {
  const u = (out as { usage?: { prompt_tokens?: unknown; completion_tokens?: unknown } } | null)?.usage;
  const p = Number(u?.prompt_tokens);
  const c = Number(u?.completion_tokens);
  return {
    inputTokens: Number.isFinite(p) && p > 0 ? p : Math.ceil(promptChars / 4),
    outputTokens: Number.isFinite(c) && c > 0 ? c : Math.ceil((typeof replyText === "string" ? replyText.length : 0) / 4),
  };
}

/** Record one real model call. Metering must never break the feature it measures, so failures are only logged. */
export async function recordUsage(
  db: D1Database,
  e: { kind: UsageKind; model: string; userId?: string | null; inputTokens?: number; outputTokens?: number; characters?: number },
): Promise<void> {
  try {
    await db
      .prepare("INSERT INTO ai_usage (id, kind, model, user_id, input_tokens, output_tokens, characters, neurons) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(crypto.randomUUID(), e.kind, e.model, e.userId ?? null, e.inputTokens ?? 0, e.outputTokens ?? 0, e.characters ?? 0, neuronsFor(e.model, e))
      .run();
  } catch (err) {
    console.error("could not record AI usage", err);
  }
}
