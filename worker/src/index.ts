import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import type { HealthResponse } from "@lms/schema";
import type { AppEnv } from "./env";
import { adminRoutes } from "./routes/admin";
import { serveAsset } from "./lib/assets";
import { requireStudent } from "./middleware/auth";
import { authRoutes } from "./routes/auth";

export type { Bindings } from "./env";

export const app = new Hono<AppEnv>();

app.get("/api/health", (c) => {
  const body: HealthResponse = { ok: true, service: "lms", time: new Date().toISOString() };
  return c.json(body);
});

app.route("/api", authRoutes);
app.get("/api/assets/:filename", requireStudent, (c) => serveAsset(c, c.req.param("filename")));
app.route("/api/admin", adminRoutes);

// Unknown API routes return JSON, never the SPA shell.
app.all("/api/*", (c) => c.json({ error: "not_found" }, 404));

app.onError((err, c) => {
  if (err instanceof HTTPException) return err.getResponse();
  console.error(err);
  return c.json({ error: "internal_error" }, 500);
});

export default app;
