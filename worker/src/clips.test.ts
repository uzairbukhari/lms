import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";
import { parseLessonFile } from "@lms/schema";

// The clip pipeline's pure parts (scripts/clip-kit.mjs, topic-kit clip insertion, manifest records, narration fetching with a fake server).
const root = join(process.cwd(), "..");
const load = async (p: string) => (await import(pathToFileURL(join(root, p)).href)) as any;
const read = (p: string) => JSON.parse(readFileSync(join(root, p), "utf8"));
const sample = read("content/clips/sample-halves.json");

/** A few silent MPEG1 layer III frames (128 kbps, 44.1 kHz): 417 bytes and 1152 samples each. */
const mp3 = (frames: number, id3 = false) => {
  const frame = Buffer.alloc(417);
  frame.set([0xff, 0xfb, 0x90, 0x00]);
  const tag = id3 ? Buffer.concat([Buffer.from("ID3\x03\x00\x00\x00\x00\x00\x0a"), Buffer.alloc(10)]) : Buffer.alloc(0);
  return Buffer.concat([tag, ...Array.from({ length: frames }, () => frame)]);
};

describe("clip hash and names", () => {
  it("hashes the canonical JSON: key order does not matter, content does", async () => {
    const kit = await load("scripts/clip-kit.mjs");
    expect(kit.canonicalJson({ b: 1, a: [{ d: 2, c: undefined }] })).toBe('{"a":[{"d":2}],"b":1}');
    const a = await kit.checkClip("sample-halves", sample);
    const reordered = { scenes: sample.scenes, backdrop: sample.backdrop, title: sample.title };
    expect((await kit.checkClip("sample-halves", reordered)).hash).toBe(a.hash);
    expect(a.hash).toMatch(/^[0-9a-f]{64}$/);
    const changed = { ...sample, title: "Another title" };
    expect((await kit.checkClip("sample-halves", changed)).hash).not.toBe(a.hash);
  });

  it("names the files from the lesson slug and the first 8 hex of the hash, matching the clip block patterns", async () => {
    const kit = await load("scripts/clip-kit.mjs");
    const c = await kit.checkClip("maths-class-1-fractions", sample);
    expect(c.names.asset).toBe(`clip-maths-class-1-fractions-${c.hash.slice(0, 8)}.mp4`);
    expect(c.names.poster).toBe(`clip-maths-class-1-fractions-${c.hash.slice(0, 8)}.webp`);
    const { blockSchema } = await load("packages/schema/src/index.ts").catch(() => ({ blockSchema: null }));
    if (blockSchema) expect(blockSchema.safeParse({ type: "clip", title: "x", ...c.names, seconds: 60, transcript: "x" }).success).toBe(true);
  });

  it("lists every problem with a bad spec", async () => {
    const kit = await load("scripts/clip-kit.mjs");
    await expect(kit.checkClip("x", { title: "", scenes: [] })).rejects.toThrow(/not valid/);
  });
});

describe("mp3 length", () => {
  it("adds up frame lengths, skipping an ID3 tag", async () => {
    const { mp3Seconds } = await load("scripts/clip-kit.mjs");
    expect(mp3Seconds(mp3(10))).toBeCloseTo((10 * 1152) / 44100, 5);
    expect(mp3Seconds(mp3(10, true))).toBeCloseTo((10 * 1152) / 44100, 5);
    expect(() => mp3Seconds(Buffer.alloc(50))).toThrow(/not an mp3/);
  });
});

describe("topicLesson with a clip", () => {
  it("inserts a Movie time stop before the learn summary and still passes the importer's validation", async () => {
    const { topicLesson, CLIP_SPECS } = await load("scripts/topic-kit.mjs");
    const slug = (read("scripts/legacy-15.json") as string[]).find((s) => s.startsWith("maths-class-1-")) ?? "maths-class-1-fractions";
    const file = read(`content/topics/${slug}.json`);
    const mains = file.quiz.questions.filter((q: any) => !q.variant_of);
    const strip = ({ ref, sub_lesson, depth, variant_of, ...rest }: any) => rest;
    const spec: any = {
      slug, subject: file.lesson.subject, cls: file.lesson.age_band === "7-8" ? 1 : 4, topic: file.lesson.curriculum.topic, title: file.lesson.title, summary: file.lesson.summary,
      unit: file.lesson.unit, difficulty: file.lesson.difficulty, objectives: file.lesson.learning_objectives, success_criteria: file.lesson.success_criteria, real_life: file.lesson.real_life,
      standards: file.lesson.standards, warm_up: file.lesson.warm_up, intro: file.blocks,
      // Lessons are now built with their clip already in place, so take it (and its "Movie time" heading) out first: this test adds the clip itself.
      subs: file.sub_lessons.map((s: any) => ({ id: s.id, kind: s.kind, title: s.title, blocks: s.blocks.filter((b: any, i: number, all: any[]) => b.type !== "clip" && !(b.type === "heading" && b.text === "Movie time" && all[i + 1]?.type === "clip")), mini: s.mini_quiz })),
      quiz: mains.map((m: any) => ({ q: strip(m), sub: m.sub_lesson, depth: m.depth, alts: file.quiz.questions.filter((v: any) => v.variant_of === m.ref).map(strip) })),
    };
    // (Without a clip a lesson on the new standard is refused by the guideline audit, so only the with-clip build is checked here.)
    const withClip = topicLesson({ ...spec, clip: { ...sample, caption: "Watch Pip share a pizza." } });
    const parsed = parseLessonFile(withClip);
    if (!parsed.ok) throw new Error(JSON.stringify(parsed.issues));
    const learn = withClip.sub_lessons.find((s: any) => s.kind === "learn");
    const types = learn.blocks.map((b: any) => b.type);
    const at = types.indexOf("clip");
    expect(types[at - 1]).toBe("heading");
    expect(learn.blocks[at - 1].text).toBe("Movie time");
    expect(types[at + 1]).toBe("summary");
    const kit = await load("scripts/clip-kit.mjs");
    const c = await kit.checkClip(slug, sample);
    expect(learn.blocks[at]).toMatchObject({ type: "clip", title: sample.title, asset: c.names.asset, poster: c.names.poster, caption: "Watch Pip share a pizza." });
    expect(learn.blocks[at].seconds).toBeGreaterThanOrEqual(45);
    expect(learn.blocks[at].seconds).toBeLessThanOrEqual(90);
    expect(learn.blocks[at].transcript).toContain("Pip the mouse");
    expect(CLIP_SPECS.get(slug)).toEqual(sample);
    // The clip only touches the learn part: every other part is exactly what the spec says.
    expect(withClip.sub_lessons.filter((s: any) => s.kind !== "learn").map((s: any) => s.blocks)).toEqual(spec.subs.filter((s: any) => s.kind !== "learn").map((s: any) => s.blocks));
  });

  it("refuses a clip spec that breaks the rules", async () => {
    const { topicLesson } = await load("scripts/topic-kit.mjs");
    expect(() => topicLesson({ slug: "x", clip: { title: "t", scenes: [] }, subs: [] })).toThrow(/not valid/);
  });
});

describe("media manifest record", () => {
  it("upserts both files as generated and unreviewed, and updates in place on a re-render", async () => {
    const { upsertManifest } = await load("scripts/render-clip.mjs");
    const dir = mkdtempSync(join(tmpdir(), "manifest-"));
    const path = join(dir, "manifest.json");
    writeFileSync(path, JSON.stringify({ files: [{ file: "keep.jpg", lessons: ["a"], source: "unsplash", sha256: "x" }] }));
    const files = [{ file: "clip-a-12345678.mp4", sha256: "1".repeat(64), alt: "Narrated clip: T" }, { file: "clip-a-12345678.webp", sha256: "2".repeat(64), alt: "Poster" }];
    upsertManifest("a", "T", files, path);
    upsertManifest("a", "T", [{ ...files[0], sha256: "3".repeat(64) }], path);
    const m = JSON.parse(readFileSync(path, "utf8"));
    expect(m.files).toHaveLength(3);
    expect(m.files[0].file).toBe("keep.jpg");
    expect(m.files[1]).toMatchObject({ file: "clip-a-12345678.mp4", lessons: ["a"], source: "generated", sha256: "3".repeat(64), reviewed: false });
    expect(m.files[2]).toMatchObject({ source: "generated", reviewed: false });
    rmSync(dir, { recursive: true, force: true });
  });
});

describe("narration fetching", () => {
  const sentencesOf = (text: string) => text.match(/[^.!?]+[.!?]*/g)!.map((s) => s.trim());
  const setup = async (deferred: number) => {
    const kit = await load("scripts/clip-kit.mjs");
    const { ensureAudio, BudgetError } = await load("scripts/clip-audio.mjs");
    process.env.LMS_URL = "https://example.test";
    process.env.CF_ACCESS_CLIENT_ID = "id";
    process.env.CF_ACCESS_CLIENT_SECRET = "secret";
    const stamp = `Zz${Date.now()}`;
    const clip = await kit.checkClip("audio-test", {
      title: "T",
      scenes: [`${stamp} one. ${stamp} two!`, `${stamp} three?`].map((say) => ({ caption: "c", say, items: [{ emoji: "🐭", x: 50, y: 50 }] })),
    });
    const calls: string[] = [];
    const stored = new Set<string>();
    const fetchImpl = async (url: string, init?: any) => {
      calls.push(`${init?.method ?? "GET"} ${new URL(url).pathname}`);
      if (url.includes("/voice/prewarm")) {
        const { texts } = JSON.parse(init.body);
        const fresh = texts.filter((t: string) => !stored.has(t));
        const generated = Math.max(0, fresh.length - deferred);
        fresh.slice(0, generated).forEach((t: string) => stored.add(t));
        expect(init.headers["CF-Access-Client-Id"]).toBe("id");
        return new Response(JSON.stringify({ generated, skipped: texts.length - fresh.length, deferred: fresh.length - generated, failed: 0, total: texts.length }));
      }
      const text = new URL(url).searchParams.get("text")!;
      return stored.has(text) ? new Response(mp3(5 + text.length % 7)) : new Response("{}", { status: 404 });
    };
    return { kit, ensureAudio, BudgetError, clip, fetchImpl, calls, stamp };
  };

  it("voices every sentence, downloads each mp3 once and writes measured durations", async () => {
    const { kit, ensureAudio, clip, fetchImpl, calls, stamp } = await setup(0);
    const record = await ensureAudio(clip, { fetchImpl, log: () => {} });
    expect(record.scenes.map((s: any) => s.map((x: any) => x.text))).toEqual([[`${stamp} one.`, `${stamp} two!`], [`${stamp} three?`]]);
    for (const s of record.scenes.flat()) expect(s.seconds).toBeCloseTo(((5 + s.text.length % 7) * 1152) / 44100, 2);
    expect(calls.filter((c) => c.startsWith("POST"))).toHaveLength(1);
    // Already downloaded: a second run makes no calls at all.
    calls.length = 0;
    await ensureAudio(clip, { fetchImpl, log: () => {} });
    expect(calls).toEqual([]);
    for (const s of record.scenes.flat()) rmSync(join(kit.AUDIO_DIR, s.file), { force: true });
    rmSync(kit.audioRecordPath(clip.hash), { force: true });
  });

  it("stops with a clear message when the daily budget defers sentences", async () => {
    const { kit, ensureAudio, BudgetError, clip, fetchImpl } = await setup(2);
    const err = await ensureAudio(clip, { fetchImpl, log: () => {} }).catch((e: Error) => e);
    expect(err).toBeInstanceOf(BudgetError);
    expect((err as Error).message).toMatch(/2 sentences still need voicing.*after 00:00 UTC/);
    for (const t of clip.spec.scenes.flatMap((s: any) => sentencesOf(s.say))) rmSync(join(kit.AUDIO_DIR, kit.sentenceFile(t)), { force: true });
  });
});
