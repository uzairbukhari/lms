import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { sentences, ttsKey } from "../lib/tts";
import { createTestEnv } from "../../test/db";

let env: Bindings;
let dispose: () => Promise<void>;
let aiCalls: string[] = [];
beforeAll(async () => {
  ({ env, dispose } = await createTestEnv());
  env.AI = {
    run: async (_model: string, input: { text: string }) => {
      aiCalls.push(input.text);
      return new Response(new Uint8Array(300), { status: 200 });
    },
  } as unknown as Ai;
});
afterAll(async () => dispose());

const post = (texts: unknown) =>
  app.request("/api/admin/voice/prewarm", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ texts }) }, env);
const json = async (res: Response) => (await res.json()) as Record<string, any>;

describe("voice prewarm", () => {
  it("splits like the app does", () => {
    expect(sentences("One. Two! Three?")).toEqual(["One.", "Two!", "Three?"]);
  });

  it("generates each new sentence once, stores it under the child cache key, and skips what is stored", async () => {
    aiCalls = [];
    const first = await json(await post(["Hello there. How are you?", "Hello there."]));
    expect(first).toMatchObject({ generated: 2, skipped: 0, deferred: 0 });
    expect(aiCalls).toEqual(["Hello there.", "How are you?"]);
    expect(await env.ASSETS_BUCKET.head(await ttsKey("Hello there."))).not.toBeNull();

    aiCalls = [];
    const second = await json(await post(["Hello there.", "Brand new one."]));
    expect(second).toMatchObject({ generated: 1, skipped: 1, deferred: 0 });
    expect(aiCalls).toEqual(["Brand new one."]);
    const usage = await env.DB.prepare("SELECT COUNT(*) AS n FROM ai_usage WHERE kind = 'narration'").first<{ n: number }>();
    expect(usage?.n).toBe(3);
  });

  it("stops at the daily ceiling and reports the rest as deferred", async () => {
    aiCalls = [];
    await app.request("/api/admin/settings/ai-cap", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ neurons: 2000 }) }, env);
    const long = (c: string) => `${c.repeat(500)}.`;
    const res = await json(await post([long("a"), long("b"), long("c")]));
    expect(res.generated + res.deferred).toBe(3);
    expect(res.deferred).toBeGreaterThan(0);
    expect(res.generated).toBeGreaterThan(0);
    expect(aiCalls).toHaveLength(res.generated);
  });

  it("validates the request", async () => {
    expect((await post([])).status).toBe(400);
    expect((await post(Array.from({ length: 101 }, (_, i) => `s${i}`))).status).toBe(400);
    expect((await post(["x".repeat(601)])).status).toBe(400);
  });

  it("serves a stored sentence for download, and 404 for one that is not stored", async () => {
    // "Hello there." was stored by the first test; stored audio is free, so this holds even after the daily ceiling was lowered.
    const hit = await app.request(`/api/admin/voice/audio?text=${encodeURIComponent("Hello there.")}`, {}, env);
    expect(hit.status).toBe(200);
    expect(hit.headers.get("Content-Type")).toBe("audio/mpeg");
    expect((await hit.arrayBuffer()).byteLength).toBe(300);
    const miss = await app.request(`/api/admin/voice/audio?text=${encodeURIComponent("Never generated sentence.")}`, {}, env);
    expect(miss.status).toBe(404);
    expect((await app.request("/api/admin/voice/audio", {}, env)).status).toBe(400);
  });

  it("defers everything when the voice service is missing", async () => {
    const saved = env.AI;
    env.AI = undefined;
    expect(await json(await post(["Nothing stored for this."]))).toMatchObject({ generated: 0, deferred: 1 });
    env.AI = saved;
  });
});
