import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseLessonFile, sectionsWithoutVisual, type Block } from "@lms/schema";

// Every lesson file committed under content/lessons must pass the same validation the admin importer uses.
const dir = join(process.cwd(), "../content/lessons");
const files = readdirSync(dir).filter((f: string) => f.endsWith(".json"));

describe("content/lessons", () => {
  it("has the 10 week-1 diagnostic lessons and the 10 week-2 lessons", () => {
    expect(files.filter((f: string) => f.startsWith("diag-"))).toHaveLength(10);
    expect(files.filter((f: string) => f.startsWith("w2-"))).toHaveLength(10);
  });
  for (const f of files) {
    it(`${f} is valid`, () => {
      const result = parseLessonFile(JSON.parse(readFileSync(join(dir, f), "utf8")));
      if (!result.ok) throw new Error(JSON.stringify(result.issues, null, 1));
      expect(result.lesson.lesson.curriculum).toMatchObject({ semester: 1, week: f.startsWith("diag-") ? 1 : 2 });
      const { questions } = result.lesson.quiz;
      expect(questions.length).toBe(15);
      // every quiz uses all nine controls (number and short_text both count as typed answers)
      const kinds = new Set(questions.map((q) => (q.type === "number" ? "short_text" : q.type)));
      expect([...kinds].sort()).toEqual(["fill_blank", "hotspot", "match", "multi_select", "multiple_choice", "order", "short_text", "slider", "true_false"]);
    });
    it(`${f} shows something for every stop`, () => {
      const blocks = (JSON.parse(readFileSync(join(dir, f), "utf8")) as { blocks: Block[] }).blocks;
      expect(sectionsWithoutVisual(blocks)).toEqual([]);
    });
    it(`${f} has a glossary, an explainer, a brain game and something hands-on`, () => {
      const types = (JSON.parse(readFileSync(join(dir, f), "utf8")) as { blocks: { type: string }[] }).blocks.map((b) => b.type);
      for (const t of ["glossary", "explainer", "brain_game"]) expect(types).toContain(t);
      expect(types.includes("manipulative") || types.includes("activity")).toBe(true);
    });
    it(`${f} explains every bold word in its glossary`, () => {
      const blocks = (JSON.parse(readFileSync(join(dir, f), "utf8")) as { blocks: { type: string; markdown?: string; terms?: { term: string }[] }[] }).blocks;
      const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
      const terms = (blocks.find((b) => b.type === "glossary")?.terms ?? []).map((t) => norm(t.term));
      const bold = blocks.flatMap((b) => [...(b.markdown ?? "").matchAll(/\*\*(.+?)\*\*/g)].map((m) => norm(m[1] as string)));
      expect(bold.filter((w) => !terms.some((t) => t === w || t.includes(w) || w.includes(t)))).toEqual([]);
    });
    it(`${f} has no video unless its id looks real`, () => {
      const blocks = (JSON.parse(readFileSync(join(dir, f), "utf8")) as { blocks: { type: string; youtube?: string; start?: number; end?: number }[] }).blocks;
      for (const b of blocks.filter((x) => x.type === "video")) expect((b.end ?? 0) - (b.start ?? 0)).toBeLessThanOrEqual(100);
    });
  }
});

describe("manipulative block", () => {
  it("is accepted by the lesson format, with limits", async () => {
    const { lessonFixture } = await import("../test/fixtures");
    const ok = lessonFixture();
    ok.blocks.push({ type: "manipulative", title: "Split it", emoji: "🪙", count: 10, zones: ["A", "B"] } as never);
    expect(parseLessonFile(ok).ok).toBe(true);
    const bad = lessonFixture();
    bad.blocks.push({ type: "manipulative", title: "Too many", emoji: "🪙", count: 99, zones: ["A"] } as never);
    expect(parseLessonFile(bad).ok).toBe(false);
  });
});

describe("explainer and brain game blocks", () => {
  it("accept good input and reject out-of-range input", async () => {
    const { lessonFixture } = await import("../test/fixtures");
    const ok = lessonFixture();
    ok.blocks.push(
      { type: "explainer", title: "Apples", scenes: [{ caption: "One", items: [{ emoji: "🍎", x: 20, y: 50 }] }, { caption: "Two", items: [{ id: "a", emoji: "🍎", x: 80, y: 50, anim: "bounce" }] }] } as never,
      { type: "brain_game", game: "memory_match", title: "Pairs", emojis: ["🐶", "🐱", "🐟"] } as never,
    );
    expect(parseLessonFile(ok).ok).toBe(true);
    const oneScene = lessonFixture();
    oneScene.blocks.push({ type: "explainer", title: "x", scenes: [{ caption: "One", items: [{ emoji: "🍎", x: 20, y: 50 }] }] } as never);
    expect(parseLessonFile(oneScene).ok).toBe(false);
    const offStage = lessonFixture();
    offStage.blocks.push({ type: "explainer", title: "x", scenes: [{ caption: "a", items: [{ emoji: "🍎", x: 120, y: 50 }] }, { caption: "b", items: [{ emoji: "🍎", x: 1, y: 50 }] }] } as never);
    expect(parseLessonFile(offStage).ok).toBe(false);
    const fewCards = lessonFixture();
    fewCards.blocks.push({ type: "brain_game", game: "memory_match", title: "x", emojis: ["🐶"] } as never);
    expect(parseLessonFile(fewCards).ok).toBe(false);
  });
});

describe("chart block", () => {
  it("needs the right fields for its kind", async () => {
    const { lessonFixture } = await import("../test/fixtures");
    const withChart = (chart: object) => { const f = lessonFixture(); f.blocks.push({ type: "chart", title: "T", ...chart } as never); return parseLessonFile(f).ok; };
    expect(withChart({ kind: "pictogram", rows: [{ label: "Apples", value: 3, emoji: "🍎" }] })).toBe(true);
    expect(withChart({ kind: "bar_chart" })).toBe(false);
    expect(withChart({ kind: "number_line", from: 0, to: 10, marks: [3] })).toBe(true);
    expect(withChart({ kind: "number_line", from: 10, to: 0 })).toBe(false);
    expect(withChart({ kind: "number_line", from: 0, to: 1000, step: 1 })).toBe(false);
    expect(withChart({ kind: "fraction", parts: 4, shaded: 2 })).toBe(true);
    expect(withChart({ kind: "fraction", parts: 4, shaded: 5 })).toBe(false);
  });
});

describe("video block", () => {
  it("is limited to clips of 100 seconds or less", async () => {
    const { lessonFixture } = await import("../test/fixtures");
    const withVideo = (v: object) => { const f = lessonFixture(); f.blocks.push({ type: "video", title: "A clip", youtube: "aaaaaaaaaaa", ...v } as never); return parseLessonFile(f).ok; };
    expect(withVideo({ start: 10, end: 110 })).toBe(true);
    expect(withVideo({ start: 10, end: 111 })).toBe(false);
    expect(withVideo({ start: 50, end: 40 })).toBe(false);
    expect(withVideo({ end: 60, youtube: "not-an-id" })).toBe(false);
  });
});
