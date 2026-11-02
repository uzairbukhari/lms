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
