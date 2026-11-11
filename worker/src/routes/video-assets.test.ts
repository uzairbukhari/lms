import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { hasContentHash, parseRange } from "../lib/assets";
import { createTestEnv } from "../../test/db";

let env: Bindings;
let dispose: () => Promise<void>;
let cookie = "";
beforeAll(async () => {
  ({ env, dispose } = await createTestEnv());
  const r = await app.request("/api/admin/students", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ displayName: "Vid" }) }, env);
  const creds = ((await r.json()) as { credentials: { username: string; password: string } }).credentials;
  const login = await app.request("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(creds) }, env);
  cookie = (login.headers.get("set-cookie") ?? "").split(";")[0] ?? "";
});
afterAll(async () => dispose());

function mp4Bytes(): Uint8Array {
  const b = new Uint8Array(100);
  b.set([0, 0, 0, 24, 0x66, 0x74, 0x79, 0x70]); // size, "ftyp"
  for (let i = 8; i < 100; i++) b[i] = i;
  return b;
}
const upload = (name: string, bytes: Uint8Array, type = "video/mp4") => {
  const form = new FormData();
  form.set("file", new File([bytes], name, { type }));
  return app.request("/api/admin/assets", { method: "POST", body: form }, env);
};
const get = (name: string, range?: string) => app.request(`/api/assets/${name}`, { headers: { Cookie: cookie, ...(range ? { Range: range } : {}) } }, env);

describe("video assets", () => {
  it("accepts a real mp4 and rejects other content named .mp4", async () => {
    expect((await upload("clip.mp4", mp4Bytes())).status).toBe(201);
    const bad = await upload("fake.mp4", new Uint8Array([137, 80, 78, 71, 1, 2, 3, 4, 5, 6]));
    expect(bad.status).toBe(400);
    expect((await upload("tiny.mp4", new Uint8Array([1, 2]))).status).toBe(400);
  });

  it("serves the whole file with Accept-Ranges and no sandbox CSP", async () => {
    const res = await get("clip.mp4");
    expect(res.status).toBe(200);
    expect(res.headers.get("accept-ranges")).toBe("bytes");
    expect(res.headers.get("content-type")).toBe("video/mp4");
    expect(res.headers.get("content-security-policy")).toBeNull();
    expect((await res.arrayBuffer()).byteLength).toBe(100);
  });

  it("answers a Range request with 206 and Content-Range", async () => {
    const res = await get("clip.mp4", "bytes=10-19");
    expect(res.status).toBe(206);
    expect(res.headers.get("content-range")).toBe("bytes 10-19/100");
    expect([...new Uint8Array(await res.arrayBuffer())]).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
    const open = await get("clip.mp4", "bytes=90-");
    expect(open.status).toBe(206);
    expect(open.headers.get("content-range")).toBe("bytes 90-99/100");
    const suffix = await get("clip.mp4", "bytes=-5");
    expect(suffix.headers.get("content-range")).toBe("bytes 95-99/100");
  });

  it("answers an unsatisfiable range with 416", async () => {
    const res = await get("clip.mp4", "bytes=500-600");
    expect(res.status).toBe(416);
    expect(res.headers.get("content-range")).toBe("bytes */100");
  });

  it("caches hashed file names for good and keeps CSP on images", async () => {
    await upload("clip-0123abcd.mp4", mp4Bytes());
    expect((await get("clip-0123abcd.mp4")).headers.get("cache-control")).toContain("immutable");
    expect((await get("clip.mp4")).headers.get("cache-control")).not.toContain("immutable");
    const form = new FormData();
    form.set("file", new File([new Uint8Array([137, 80, 78, 71])], "pic.png", { type: "image/png" }));
    await app.request("/api/admin/assets", { method: "POST", body: form }, env);
    expect((await get("pic.png")).headers.get("content-security-policy")).toContain("sandbox");
  });

  it("helpers", () => {
    expect(hasContentHash("a.1234abcd.mp4")).toBe(true);
    expect(hasContentHash("pizza.png")).toBe(false);
    expect(hasContentHash("lesson-1234.png")).toBe(false);
    expect(parseRange("bytes=0-1,5-6", 100)).toBeNull();
  });
});
