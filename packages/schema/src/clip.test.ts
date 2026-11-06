import { describe, expect, it } from "vitest";
import { type ClipSpec, buildClipTimeline, clipAssetNames, clipBlockSeconds, clipSentences, clipSpecSchema, clipTranscript, clipWarnings, estimateClipSeconds, parseClipSpec, sceneIndexAt } from "./clip";
import { blockSchema } from "./lesson";
import { sentences } from "./sentences";

import sample from "../../../content/clips/sample-halves.json";
const must = (input: unknown): ClipSpec => { const r = parseClipSpec(input); if (!r.ok) throw new Error(r.issues.join("; ")); return r.spec; };
const scene = (say?: string, caption = "A caption") => ({ caption, ...(say ? { say } : {}), items: [{ emoji: "🐭", x: 50, y: 50 }] });
const spec = (scenes: unknown[]) => ({ title: "T", scenes });

describe("clip spec", () => {
  it("accepts the sample and lands in the target length", () => {
    const r = parseClipSpec(sample);
    expect(r.ok).toBe(true);
    const s = estimateClipSeconds(must(sample));
    expect(s).toBeGreaterThan(45);
    expect(s).toBeLessThan(75);
    expect(clipWarnings(must(sample))).toEqual([]);
  });

  it("allows up to 24 scenes but no more", () => {
    const many = (n: number) => spec(Array.from({ length: n }, () => scene("Hi there.")));
    expect(clipSpecSchema.safeParse(many(24)).success).toBe(true);
    expect(clipSpecSchema.safeParse(many(25)).success).toBe(false);
    expect(clipSpecSchema.safeParse(many(1)).success).toBe(false);
  });

  it("needs a narration script on at least 80% of scenes", () => {
    const s = (said: number, total: number) => spec(Array.from({ length: total }, (_, i) => scene(i < said ? "One short line." : undefined)));
    expect(clipSpecSchema.safeParse(s(4, 5)).success).toBe(true);
    const bad = clipSpecSchema.safeParse(s(3, 5));
    expect(bad.success).toBe(false);
    expect(JSON.stringify(bad.error?.issues)).toContain("80%");
  });

  it("refuses a clip longer than 90 seconds", () => {
    const long = Array.from({ length: 24 }, () => scene("This sentence has ten words in it to make it long. ".repeat(2)));
    const r = parseClipSpec(spec(long));
    expect(r.ok).toBe(false);
  });

  it("warns about a very short clip without refusing it", () => {
    const r = parseClipSpec(spec([scene("Hello."), scene("Bye.")]));
    expect(r.ok).toBe(true);
    expect(clipWarnings(must(spec([scene("Hello."), scene("Bye.")])))).toHaveLength(1);
  });

  it("derives the transcript and the sentences the voice must say", () => {
    const r = { spec: must(spec([scene("One. Two **bold** words!"), scene(undefined, "Silent"), scene("Three?"), scene("One."), scene("Four.")])) };
    expect(clipTranscript(r.spec)).toBe("One. Two bold words! Three? One. Four.");
    expect(clipSentences(r.spec)).toEqual(["One.", "Two bold words!", "Three?", "Four."]);
  });

  it("turns the clip length into a valid clip block", () => {
    const parsed = { spec: must(sample) };
    const names = clipAssetNames("maths-class-1-fractions", "ABCDEF0123456789");
    expect(names).toEqual({ asset: "clip-maths-class-1-fractions-abcdef01.mp4", poster: "clip-maths-class-1-fractions-abcdef01.webp" });
    const block = blockSchema.safeParse({ type: "clip", title: "x", ...names, seconds: clipBlockSeconds(parsed.spec), transcript: clipTranscript(parsed.spec) });
    expect(block.success).toBe(true);
  });
});

describe("narration sentences", () => {
  it("splits text one voice clip at a time", () => {
    expect(sentences("One. Two! Three?")).toEqual(["One.", "Two!", "Three?"]);
    expect(sentences("No stop")).toEqual(["No stop"]);
    expect(sentences("  ")).toEqual([]);
  });
});

describe("clip timeline", () => {
  const s = { spec: spec([scene("Aaa bbb ccc. Ddd eee fff."), scene(undefined, "Look at this"), scene("Last one.")]) as never };

  it("lays out cards, scenes and gaps in frames, and estimates when no audio is given", () => {
    const t = buildClipTimeline(s.spec);
    expect(t.titleFrames).toBe(36);
    expect(t.endFrames).toBe(36);
    expect(t.scenes[0]!.startFrame).toBe(36);
    expect(t.scenes[0]!.sentences.map((x) => x.text)).toEqual(["Aaa bbb ccc.", "Ddd eee fff."]);
    expect(t.scenes[1]!.spoken).toBe(false);
    expect(t.scenes[1]!.sentences[0]!.text).toBe("Look at this");
    let at = 36;
    for (const sc of t.scenes) { expect(sc.startFrame).toBe(at); at += sc.frames; }
    expect(t.totalFrames).toBe(at + 36);
    expect(t.stageFrames).toBe(at - 36);
  });

  it("uses measured sentence lengths: each scene lasts its sentences plus half a second", () => {
    const t = buildClipTimeline(s.spec, { durations: [[2, 3], undefined, [1.5]] });
    expect(t.scenes[0]!.frames).toBe(48 + 72 + 12);
    expect(t.scenes[0]!.sentences.map((x) => x.frames)).toEqual([48, 72]);
    expect(t.scenes[2]!.frames).toBe(36 + 12);
    expect(t.scenes[1]!.frames).toBe(Math.round(2.6 * 24) + 12);
  });

  it("finds the scene on screen at a frame", () => {
    const t = buildClipTimeline(s.spec, { durations: [[2, 3], undefined, [1.5]] });
    expect(sceneIndexAt(t, 0)).toBe(0);
    expect(sceneIndexAt(t, t.scenes[1]!.startFrame - t.titleFrames)).toBe(1);
    expect(sceneIndexAt(t, 9999)).toBe(2);
  });
});
