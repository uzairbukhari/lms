import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { buildSlides, plain, splitSentences, type Block } from "./lib/slides";

const meta = { title: "Maths Check-In", summary: "A tour of numbers.", minutes: 60, objectives: ["Count", "Add"] };

describe("plain and splitSentences", () => {
  it("strips markdown and emoji for speech", () => {
    expect(plain("A **big** and *small* `thing` 🎉")).toBe("A big and small thing");
  });
  it("splits sentences but keeps decimals together", () => {
    expect(splitSentences("It costs 1.5 dollars. Is that a lot? Yes!")).toEqual(["It costs 1.5 dollars.", "Is that a lot?", "Yes!"]);
  });
  it("keeps list lines as separate points", () => {
    expect(splitSentences("- one\n- two")).toEqual(["one", "two"]);
  });
});

describe("buildSlides", () => {
  const blocks: Block[] = [
    { type: "heading", text: "Welcome" },
    { type: "text", markdown: "Hello there. Let us start." },
    { type: "image", emoji: "🧮", caption: "Maths" },
    { type: "heading", text: "Stop 1" },
    { type: "text", markdown: "Numbers go up." },
    { type: "check", question: { type: "number", prompt: "What is 2 + 2?", answer: { value: 4, tolerance: 0 }, points: 1 } as never },
    { type: "summary", points: ["Numbers go up."] },
    { type: "callout", style: "tip", markdown: "Start the quiz." },
  ];
  const slides = buildSlides(meta, blocks);

  it("starts with a title slide and ends with a finish slide", () => {
    expect(slides[0]?.kind).toBe("title");
    expect(slides.at(-1)?.kind).toBe("finish");
  });
  it("puts each question and the summary on their own slide", () => {
    expect(slides.map((s) => s.kind)).toEqual(["title", "content", "content", "check", "summary", "finish"]);
  });
  it("moves the closing tip onto the finish slide", () => {
    expect(slides.at(-1)?.blocks).toHaveLength(1);
    expect(slides.at(-1)?.narration).toContain("Start the quiz.");
  });
  it("writes narration for every slide", () => {
    for (const s of slides) expect(s.narration.length).toBeGreaterThan(5);
    expect(slides[3]?.narration).toBe("What is 2 + 2?");
  });
  it("splits long content so no slide holds more than three blocks", () => {
    const many: Block[] = Array.from({ length: 7 }, (_, i) => ({ type: "text", markdown: `Fact ${i}.` }));
    const s = buildSlides(meta, [{ type: "heading", text: "Lots" }, ...many]).filter((x) => x.kind === "content");
    expect(s.length).toBe(3);
    expect(Math.max(...s.map((x) => x.blocks.length))).toBeLessThanOrEqual(3);
  });
});

describe("the real lessons", () => {
  it("make short slides with narration", () => {
    const file = JSON.parse(readFileSync(fileURLToPath(new URL("../../../content/lessons/diag-maths-class-4.json", import.meta.url)), "utf8")) as {
      lesson: { title: string; summary: string; learning_objectives: string[] };
      blocks: Block[];
    };
    const slides = buildSlides({ title: file.lesson.title, summary: file.lesson.summary, minutes: 60, objectives: file.lesson.learning_objectives }, file.blocks);
    expect(slides.length).toBeGreaterThan(10);
    for (const s of slides) {
      expect(s.narration.length).toBeGreaterThan(0);
      expect(s.blocks.length).toBeLessThanOrEqual(3 + 1);
    }
  });
});
