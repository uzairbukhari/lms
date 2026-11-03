import { describe, expect, it } from "vitest";
import { editableFields, getAt, setAt } from "./lessonEdit";

const file = {
  lesson: { slug: "x", title: "Halves", summary: "Split things in two.", unit: "Fractions" },
  blocks: [
    { type: "heading", text: "Sharing a pizza" },
    { type: "image", emoji: "🍕", caption: "One pizza", alt: "A pizza" },
    { type: "summary", points: ["Halves = 2 equal parts", "Quarters = 4"] },
    { type: "html_embed", title: "Widget", html: "<p>keep me</p>" },
  ],
  quiz: { questions: [{ ref: "q1", type: "multiple_choice", prompt: "What is each part?", options: [{ id: "a", text: "A half" }, { id: "b", text: "A quarter" }], answer: ["a"], hint: "Count the parts", skill_tag: "fractions.half" }] },
};

describe("quick edit helpers", () => {
  const fields = editableFields(file);
  const paths = fields.map((f) => f.path.join("."));

  it("offers wording but never ids, answers, tags or embedded code", () => {
    expect(paths).toContain("lesson.title");
    expect(paths).toContain("blocks.0.text");
    expect(paths).toContain("blocks.2.points.1");
    expect(paths).toContain("quiz.questions.0.options.1.text");
    expect(paths).toContain("quiz.questions.0.hint");
    expect(paths.some((p) => p.endsWith("skill_tag") || p.endsWith("answer") || p.endsWith(".id") || p.endsWith("html") || p.includes("emoji"))).toBe(false);
    expect(paths).not.toContain("lesson.unit");
  });

  it("labels things so a parent can find them", () => {
    expect(fields.find((f) => f.path.join(".") === "quiz.questions.0.options.1.text")?.label).toBe("Question 1 · Text (choice 2)");
    expect(fields.find((f) => f.path.join(".") === "blocks.0.text")?.label).toBe("Slide 1 (heading) · Text");
  });

  it("changes one value without touching the original", () => {
    const next = setAt(file, ["quiz", "questions", 0, "options", 1, "text"], "A fourth");
    expect(getAt(next, ["quiz", "questions", 0, "options", 1, "text"])).toBe("A fourth");
    expect(getAt(file, ["quiz", "questions", 0, "options", 1, "text"])).toBe("A quarter");
    expect(getAt(next, ["quiz", "questions", 0, "answer"])).toEqual(["a"]);
  });
});
