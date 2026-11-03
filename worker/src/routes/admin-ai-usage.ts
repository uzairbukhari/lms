import { Hono } from "hono";
import type { AppEnv } from "../env";
import { aiBudget } from "../lib/budget";
import { FREE_NEURONS_PER_DAY, NEURON_USD } from "../lib/usage";

/** Workers AI usage for the admin Dashboard: tokens, requests, neurons and an estimated cost. Mounted under /api/admin. */
export const adminAiUsageRoutes = new Hono<AppEnv>();

type DayRow = { day: string; requests: number; inputTokens: number; outputTokens: number; characters: number; neurons: number };

const dayKey = (d: Date) => d.toISOString().slice(0, 10);

adminAiUsageRoutes.get("/ai-usage", async (c) => {
  const days = Math.min(90, Math.max(7, Number(c.req.query("days")) || 30));
  const now = new Date();
  const start = new Date(now.getTime() - (days - 1) * 86_400_000);
  const since = dayKey(start);

  const [perDay, perKind] = await Promise.all([
    c.env.DB
      .prepare(
        `SELECT date(created_at) AS day, COUNT(*) AS requests, SUM(input_tokens) AS inputTokens, SUM(output_tokens) AS outputTokens, SUM(characters) AS characters, SUM(neurons) AS neurons
           FROM ai_usage WHERE date(created_at) >= ? AND (user_id IS NULL OR user_id NOT IN (SELECT id FROM users WHERE is_test = 1)) GROUP BY day`,
      )
      .bind(since)
      .all<DayRow>(),
    c.env.DB
      .prepare(
        `SELECT kind, COUNT(*) AS requests, SUM(input_tokens + output_tokens) AS tokens, SUM(characters) AS characters, SUM(neurons) AS neurons
           FROM ai_usage WHERE date(created_at) >= ? AND (user_id IS NULL OR user_id NOT IN (SELECT id FROM users WHERE is_test = 1)) GROUP BY kind ORDER BY neurons DESC`,
      )
      .bind(since)
      .all<{ kind: string; requests: number; tokens: number; characters: number; neurons: number }>(),
  ]);

  const byDay = new Map(perDay.results.map((r) => [r.day, r]));
  const daily = Array.from({ length: days }, (_, i) => {
    const date = dayKey(new Date(start.getTime() + i * 86_400_000));
    const r = byDay.get(date);
    const neurons = r?.neurons ?? 0;
    return {
      date,
      requests: r?.requests ?? 0,
      tokens: (r?.inputTokens ?? 0) + (r?.outputTokens ?? 0),
      characters: r?.characters ?? 0,
      neurons: Math.round(neurons),
      // Cloudflare gives 10,000 neurons free every day, so only the part above that is billed.
      billableUsd: Math.max(0, neurons - FREE_NEURONS_PER_DAY) * NEURON_USD,
    };
  });

  const sum = (f: (d: (typeof daily)[number]) => number) => daily.reduce((a, d) => a + f(d), 0);
  const today = daily[daily.length - 1];
  return c.json({
    days,
    freeNeuronsPerDay: FREE_NEURONS_PER_DAY,
    todayNeurons: today?.neurons ?? 0,
    // The hard daily ceiling: counts every user (as Cloudflare's meter does), so it can differ slightly from todayNeurons.
    budget: await aiBudget(c.env.DB, now).then((b) => ({ ...b, used: Math.round(b.used) })),
    totals: {
      requests: sum((d) => d.requests),
      inputTokens: perDay.results.reduce((a, r) => a + (r.inputTokens ?? 0), 0),
      outputTokens: perDay.results.reduce((a, r) => a + (r.outputTokens ?? 0), 0),
      tokens: sum((d) => d.tokens),
      characters: sum((d) => d.characters),
      neurons: sum((d) => d.neurons),
      grossUsd: sum((d) => d.neurons) * NEURON_USD,
      billableUsd: sum((d) => d.billableUsd),
    },
    daily,
    byKind: perKind.results.map((k) => ({ ...k, neurons: Math.round(k.neurons ?? 0), tokens: k.tokens ?? 0, characters: k.characters ?? 0 })),
  });
});
