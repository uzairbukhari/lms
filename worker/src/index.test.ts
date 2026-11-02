import { describe, expect, it } from "vitest";
import { app } from "./index";

describe("api", () => {
  it("GET /api/health reports ok", async () => {
    const res = await app.request("/api/health");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { ok: boolean; service: string; time: string };
    expect(body.ok).toBe(true);
    expect(body.service).toBe("lms");
    expect(Number.isNaN(Date.parse(body.time))).toBe(false);
  });

  it("unknown /api routes return JSON 404", async () => {
    const res = await app.request("/api/nope");
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "not_found" });
  });
});
