import { Hono } from "hono";
import type { HealthResponse } from "@lms/schema";

/** Cloudflare bindings declared in wrangler.jsonc. */
export type Bindings = {
  ASSETS: Fetcher;
  DB: D1Database;
  ASSETS_BUCKET: R2Bucket;
  SESSIONS: KVNamespace;
  AI: Ai;
};

export const app = new Hono<{ Bindings: Bindings }>();

app.get("/api/health", (c) => {
  const body: HealthResponse = { ok: true, service: "lms", time: new Date().toISOString() };
  return c.json(body);
});

// Unknown API routes return JSON, never the SPA shell.
app.all("/api/*", (c) => c.json({ error: "not_found" }, 404));

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "internal_error" }, 500);
});

export default app;
