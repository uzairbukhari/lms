import type { Context } from "hono";
import type { AppEnv } from "../env";

/** Stream an uploaded file from R2. SVGs are locked down so a script inside one cannot run if opened directly. */
export async function serveAsset(c: Context<AppEnv>, filename: string): Promise<Response> {
  if (!/^[a-z0-9][a-z0-9._-]*$/.test(filename)) return c.json({ error: "not_found" }, 404);
  const object = await c.env.ASSETS_BUCKET.get(`lessons/${filename}`);
  if (!object) return c.json({ error: "not_found" }, 404);
  const headers = new Headers();
  headers.set("Content-Type", object.httpMetadata?.contentType ?? "application/octet-stream");
  headers.set("Cache-Control", "private, max-age=3600");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; sandbox");
  return new Response(object.body, { headers });
}
