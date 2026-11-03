import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { createTestEnv } from "../../test/db";
import { compareVersions } from "./desktop";

let env: Bindings;
let dispose: () => Promise<void>;
beforeAll(async () => {
  ({ env, dispose } = await createTestEnv());
  env.DESKTOP_EXIT_PIN = "4821";
});
afterAll(async () => dispose());

const get = (path: string) => app.request(path, {}, env);
const latest = { version: "1.2.0", notes: "Fixes", min_version: "1.1.0", platforms: { "windows-x86_64": { url: "https://x/y.exe", signature: "sig" } } };

describe("compareVersions", () => {
  it("orders numerically", () => {
    expect(compareVersions("1.10.0", "1.9.0")).toBeGreaterThan(0);
    expect(compareVersions("1.0", "1.0.0")).toBe(0);
    expect(compareVersions("0.9.9", "1.0.0")).toBeLessThan(0);
  });
});

describe("desktop updater", () => {
  it("returns 204 when nothing is published", async () => {
    expect((await get("/api/desktop/update/windows-x86_64/1.0.0")).status).toBe(204);
  });
  it("offers a newer version and 204 when current", async () => {
    await env.ASSETS_BUCKET.put("desktop/latest.json", JSON.stringify(latest));
    const res = await get("/api/desktop/update/windows-x86_64/1.1.0?device=abcdefgh1234");
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ version: "1.2.0", url: "https://x/y.exe", signature: "sig" });
    expect((await get("/api/desktop/update/windows-x86_64/1.2.0")).status).toBe(204);
    expect((await get("/api/desktop/update/linux-x86_64/1.0.0")).status).toBe(204);
  });
  it("records the device", async () => {
    const row = await env.DB.prepare("SELECT version FROM desktop_installs WHERE device_id = 'abcdefgh1234'").first<{ version: string }>();
    expect(row?.version).toBe("1.1.0");
  });
  it("rejects bad input", async () => {
    expect((await get("/api/desktop/update/windows-x86_64/not-a-version")).status).toBe(400);
  });
  it("flags shells below min_version", async () => {
    expect(await (await get("/api/desktop/status/1.0.0")).json()).toEqual({ mustUpdate: true });
    expect(await (await get("/api/desktop/status/1.1.0")).json()).toEqual({ mustUpdate: false });
  });
  it("serves release files", async () => {
    await env.ASSETS_BUCKET.put("desktop/releases/1.2.0/a.exe", "bin");
    const res = await get("/api/desktop/releases/1.2.0/a.exe");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("bin");
    expect((await get("/api/desktop/releases/9.9.9/none.exe")).status).toBe(404);
  });
});

describe("parent PIN", () => {
  const post = (pin: unknown) => app.request("/api/desktop/exit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pin }) }, env);
  it("accepts the right PIN only", async () => {
    expect((await post("4821")).status).toBe(200);
    expect((await post("1234")).status).toBe(403);
    expect((await post(4821)).status).toBe(403);
  });
});
