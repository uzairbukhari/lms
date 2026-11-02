import { describe, expect, it } from "vitest";
import { buildGlossary, findInGlossary, isLookupWord, normaliseWord, sentenceWith, wordVariants } from "./glossary";
import { buildSlides, type Block } from "./slides";

const blocks: Block[] = [
  { type: "heading", text: "Loops" },
  { type: "text", markdown: "A **loop** repeats steps. Debugging means fixing mistakes." },
  { type: "vocab", word: "Algorithm", meaning: "A list of steps.", example: "A recipe." },
  { type: "glossary", terms: [{ term: "Loop", meaning: "Doing something again and again." }] },
];

describe("word help", () => {
  it("normalises and screens words", () => {
    expect(normaliseWord("“Don’t,”")).toBe("don't");
    expect(isLookupWord("loop")).toBe(true);
    expect(["a", "12", "two words", "x".repeat(40), "<b>"].some(isLookupWord)).toBe(false);
  });
  it("tries simple singular forms", () => {
    expect(wordVariants("Batteries")).toContain("battery");
    expect(wordVariants("loops")).toContain("loop");
    expect(wordVariants("kid's")).toContain("kid");
  });
  it("prefers the lesson's glossary, then vocab blocks, and ignores unknown words", () => {
    const g = buildGlossary(blocks);
    expect(findInGlossary(g, "loops")?.meaning).toBe("Doing something again and again.");
    expect(findInGlossary(g, "algorithm")).toMatchObject({ meaning: "A list of steps.", example: "A recipe." });
    expect(findInGlossary(g, "debugging")).toBeUndefined();
  });
  it("finds the sentence a word is used in", () => {
    expect(sentenceWith(blocks, "debugging")).toBe("Debugging means fixing mistakes.");
    expect(sentenceWith(blocks, "loops")).toBe("A loop repeats steps.");
    expect(sentenceWith(blocks, "dragon")).toBeNull();
  });
  it("never turns the glossary into a slide", () => {
    const meta = { title: "T", summary: "S", minutes: 5, objectives: ["o"] };
    expect(buildSlides(meta, blocks).some((s) => s.blocks.some((b) => b.type === "glossary"))).toBe(false);
  });
});

describe("manipulative block", () => {
  const play: Block = { type: "manipulative", title: "Counting treasure", emoji: "🪙", count: 10, zones: ["Left hand", "Right hand"] };
  it("becomes its own play slide with a spoken intro", () => {
    const slides = buildSlides({ title: "T", summary: "S", minutes: 5, objectives: ["o"] }, [play]);
    const s = slides.find((x) => x.kind === "play");
    expect(s?.title).toBe("Counting treasure");
    expect(s?.narration).toContain("Move the 10 things into Left hand and Right hand");
  });
});

describe("chart block", () => {
  const meta = { title: "T", summary: "S", minutes: 5, objectives: ["o"] };
  const chart = (title: string): Block => ({ type: "chart", kind: "bar_chart", title, rows: [{ label: "A", value: 3 }, { label: "B", value: 5 }] });
  it("rides along with the text and gets one picture per slide", () => {
    const slides = buildSlides(meta, [{ type: "heading", text: "Data" }, { type: "text", markdown: "A chart." }, chart("One"), chart("Two")]);
    const content = slides.filter((s) => s.kind === "content");
    expect(content).toHaveLength(2);
    expect(content[0]?.blocks.map((b) => b.type)).toEqual(["text", "chart"]);
    expect(content[1]?.blocks.map((b) => b.type)).toEqual(["chart"]);
  });
  it("reads its numbers aloud", () => {
    const s = buildSlides(meta, [chart("Votes")]).find((x) => x.kind === "content");
    expect(s?.narration).toContain("A: 3. B: 5.");
  });
});
