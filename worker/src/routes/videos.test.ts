import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { app } from "../index";
import type { Bindings } from "../env";
import { parseDuration } from "../lib/youtube";
import { withVideos, withoutVideo } from "../lib/videos";
import { createTestEnv } from "../../test/db";
import { lessonFixture } from "../../test/fixtures";

let env: Bindings;
let dispose: () => Promise<void>;
beforeAll(async () => { ({ env, dispose } = await createTestEnv()); });
afterAll(async () => dispose());
afterEach(() => vi.unstubAllGlobals());

const call = (path: string, body?: unknown, method?: string) =>
  app.request(path, { method: method ?? (body !== undefined ? "POST" : "GET"), headers: body !== undefined ? { "Content-Type": "application/json" } : {}, body: body !== undefined ? JSON.stringify(body) : undefined }, env);
const json = async (r: Response) => (await r.json()) as any;

/** A fake YouTube API: one short embeddable made-for-kids video, one long one, one that cannot be embedded. */
function fakeYouTube() {
  const videos: Record<string, any> = {
    shortvid_01: { id: "shortvid_01", snippet: { title: "Food chains", channelTitle: "Kids Channel" }, contentDetails: { duration: "PT1M20S" }, status: { embeddable: true, privacyStatus: "public", madeForKids: true } },
    longvid_001: { id: "longvid_001", snippet: { title: "Long one", channelTitle: "Other" }, contentDetails: { duration: "PT3M" }, status: { embeddable: true, privacyStatus: "public", madeForKids: false } },
    blocked_001: { id: "blocked_001", snippet: { title: "No embed", channelTitle: "X" }, contentDetails: { duration: "PT30S" }, status: { embeddable: false, privacyStatus: "public" } },
  };
  vi.stubGlobal("fetch", vi.fn(async (url: string) => {
    const u = new URL(url);
    if (u.pathname.endsWith("/search")) return Response.json({ items: Object.keys(videos).map((id) => ({ id: { videoId: id } })) });
    const ids = (u.searchParams.get("id") ?? "").split(",");
    return Response.json({ items: ids.map((i) => videos[i]).filter(Boolean) });
  }));
}

describe("helpers", () => {
  it("parses ISO durations", () => {
    expect(parseDuration("PT1M30S")).toBe(90);
    expect(parseDuration("PT45S")).toBe(45);
    expect(parseDuration("PT1H2M3S")).toBe(3723);
    expect(parseDuration("nonsense")).toBe(0);
  });
  it("adds a video before the summary, once, and removes it again", () => {
    const blocks = [{ type: "heading", text: "A" }, { type: "summary", points: ["x"] }];
    const v = { youtube: "abcdefghijk", title: "T", start_sec: 0, end_sec: 50, caption: null };
    const out = withVideos(blocks, [v]);
    expect(out.map((b) => b.type)).toEqual(["heading", "video", "summary"]);
    expect(withVideos(out, [v])).toBe(out);
    expect(withoutVideo(out, "abcdefghijk")).toEqual(blocks);
  });
});

describe("suggested videos", () => {
  let lessonId = "";
  beforeAll(async () => {
    lessonId = (await json(await call("/api/admin/lessons/import", { publish: true, file: lessonFixture({ slug: "maths-video-test" }) }))).lesson.lessonId;
  });

  it("says when the key is missing", async () => {
    expect((await json(await call("/api/admin/videos/status"))).configured).toBe(false);
    expect((await call("/api/admin/videos/search", { query: "fractions" })).status).toBe(503);
  });

  it("finds clips, approves one, keeps it across a re-import, and removes it", async () => {
    env.YOUTUBE_API_KEY = "test-key";
    fakeYouTube();
    const found = (await json(await call("/api/admin/videos/search", { query: "food chains" }))).clips;
    expect(found.map((c: any) => c.youtube)).toEqual(["shortvid_01", "longvid_001"]); // blocked one dropped, short first
    expect(found[0].madeForKids).toBe(true);
    expect(found[1].needsTrim).toBe(true);

    // The server re-checks the video itself, and enforces the 100 second limit.
    expect((await call(`/api/admin/lessons/${lessonId}/videos`, { youtube: "blocked_001" })).status).toBe(422);
    expect((await call(`/api/admin/lessons/${lessonId}/videos`, { youtube: "longvid_001", start: 0, end: 150 })).status).toBe(422);
    const ok = await call(`/api/admin/lessons/${lessonId}/videos`, { youtube: "shortvid_01", caption: "Watch the chain" });
    expect(ok.status).toBe(201);

    const preview = await json(await call(`/api/admin/lessons/${lessonId}/preview`));
    const vid = preview.blocks.find((b: any) => b.type === "video");
    expect(vid).toMatchObject({ youtube: "shortvid_01", start: 0, end: 80, title: "Food chains" });
    expect(preview.blocks.at(-1).type).toBe("summary");

    // Re-importing the lesson from Claude keeps the approved video.
    await call("/api/admin/lessons/import", { publish: true, file: lessonFixture({ slug: "maths-video-test" }) });
    const again = await json(await call(`/api/admin/lessons/${lessonId}/preview`));
    expect(again.blocks.filter((b: any) => b.type === "video")).toHaveLength(1);

    expect((await json(await call(`/api/admin/lessons/${lessonId}/videos`))).videos).toHaveLength(1);
    expect((await call(`/api/admin/lessons/${lessonId}/videos/shortvid_01`, undefined, "DELETE")).status).toBe(200);
    const gone = await json(await call(`/api/admin/lessons/${lessonId}/preview`));
    expect(gone.blocks.some((b: any) => b.type === "video")).toBe(false);
  });
});
