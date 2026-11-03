import { Hono } from "hono";
import type { AppEnv } from "../env";
import { fail } from "../lib/http";

/** Windows desktop shell: Tauri updater endpoint and parent-PIN check (docs/DESKTOP_APP.md). */
export const desktopRoutes = new Hono<AppEnv>();

const LATEST_KEY = "desktop/latest.json";

type Latest = {
  version: string;
  notes?: string;
  pub_date?: string;
  /** Oldest shell version allowed to keep running; older shells are told to update first. */
  min_version?: string;
  platforms: Record<string, { url: string; signature: string }>;
};

/** Compares dotted numeric versions. Returns negative, zero or positive like a - b. */
export function compareVersions(a: string, b: string): number {
  const pa = a.split(".").map((n) => parseInt(n, 10) || 0);
  const pb = b.split(".").map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}

async function loadLatest(env: AppEnv["Bindings"]): Promise<Latest | null> {
  const obj = await env.ASSETS_BUCKET.get(LATEST_KEY);
  if (!obj) return null;
  try {
    return (await obj.json()) as Latest;
  } catch {
    return null;
  }
}

// Tauri updater: 204 when up to date, otherwise {version, notes, pub_date, url, signature}.
desktopRoutes.get("/desktop/update/:target/:current", async (c) => {
  const { target, current } = c.req.param();
  const device = c.req.query("device");
  if (!/^[\w-]{1,40}$/.test(target) || !/^\d+(\.\d+){0,3}$/.test(current)) return fail(c, 400, "invalid_input");
  if (device && /^[\w-]{8,64}$/.test(device)) {
    await c.env.DB.prepare(
      `INSERT INTO desktop_installs (device_id, version, target) VALUES (?1, ?2, ?3)
       ON CONFLICT(device_id) DO UPDATE SET version = ?2, target = ?3, last_seen = datetime('now')`,
    ).bind(device, current, target).run();
  }
  const latest = await loadLatest(c.env);
  const platform = latest?.platforms[target];
  if (!latest || !platform || compareVersions(latest.version, current) <= 0) return c.body(null, 204);
  return c.json({ version: latest.version, notes: latest.notes ?? "", pub_date: latest.pub_date, url: platform.url, signature: platform.signature });
});

// Tells the shell whether it is too old to run. Public: carries no personal data.
desktopRoutes.get("/desktop/status/:current", async (c) => {
  const latest = await loadLatest(c.env);
  const mustUpdate = !!latest?.min_version && compareVersions(c.req.param("current"), latest.min_version) < 0;
  return c.json({ mustUpdate });
});

// Installer and signature files, served from R2.
desktopRoutes.get("/desktop/releases/*", async (c) => {
  const key = c.req.path.replace(/^\/api\//, "");
  if (key.includes("..")) return fail(c, 400, "invalid_input");
  const obj = await c.env.ASSETS_BUCKET.get(key);
  if (!obj) return fail(c, 404, "not_found");
  return new Response(obj.body, { headers: { "Content-Type": "application/octet-stream", "Cache-Control": "public, max-age=3600" } });
});

// Parent PIN to leave focus mode. The PIN is the DESKTOP_EXIT_PIN Worker secret, so it can be changed without a new installer.
desktopRoutes.post("/desktop/exit", async (c) => {
  const body = (await c.req.json().catch(() => null)) as { pin?: unknown } | null;
  const expected = c.env.DESKTOP_EXIT_PIN;
  if (!expected || typeof body?.pin !== "string") return c.json({ ok: false }, 403);
  const enc = new TextEncoder();
  const a = enc.encode(body.pin.padEnd(64).slice(0, 64));
  const b = enc.encode(expected.padEnd(64).slice(0, 64));
  let diff = body.pin.length ^ expected.length;
  for (let i = 0; i < a.length; i++) diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  return diff === 0 ? c.json({ ok: true }) : c.json({ ok: false }, 403);
});
