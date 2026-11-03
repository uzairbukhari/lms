import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import type { HealthResponse } from "@lms/schema";
import type { AppEnv, Bindings } from "./env";
import { runBackup } from "./lib/backup";
import { adminRoutes } from "./routes/admin";
import { serveAsset } from "./lib/assets";
import { requireStudent } from "./middleware/auth";
import { aiRoutes } from "./routes/ai";
import { authRoutes } from "./routes/auth";
import { cardRoutes } from "./routes/cards";
import { desktopRoutes } from "./routes/desktop";
import { mapRoutes } from "./routes/map";
import { quizRoutes } from "./routes/quiz";
import { rewardRoutes } from "./routes/rewards";
import { studentRoutes } from "./routes/student";

export type { Bindings } from "./env";

export const app = new Hono<AppEnv>();

app.get("/api/health", (c) => {
  const body: HealthResponse = { ok: true, service: "lms", time: new Date().toISOString() };
  return c.json(body);
});

app.route("/api", authRoutes);
app.route("/api", desktopRoutes);
app.get("/api/assets/:filename", requireStudent, (c) => serveAsset(c, c.req.param("filename")));
app.route("/api/admin", adminRoutes);
app.route("/api", studentRoutes);
app.route("/api", quizRoutes);
app.route("/api", mapRoutes);
app.route("/api", aiRoutes);
app.route("/api", rewardRoutes);
app.route("/api", cardRoutes);

// Unknown API routes return JSON, never the SPA shell.
app.all("/api/*", (c) => c.json({ error: "not_found" }, 404));

app.onError((err, c) => {
  if (err instanceof HTTPException) return err.getResponse();
  console.error(err);
  return c.json({ error: "internal_error" }, 500);
});

export default {
  fetch: app.fetch,
  // Weekly cron (see wrangler.jsonc): copy the database to R2.
  scheduled(_event: ScheduledController, env: Bindings, ctx: ExecutionContext) {
    ctx.waitUntil(runBackup(env));
  },
};
