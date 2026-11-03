import { describe, expect, it } from "vitest";
import { lessonOutline, plainText } from "./outline";

describe("lessonOutline", () => {
  const file = {
    lesson: { learning_objectives: ["Name the parts of a plant"] },
    blocks: [
      { type: "text", markdown: "Welcome. We start **today**." },
      { type: "heading", text: "Stop 1: Roots" },
      { type: "text", markdown: "**Roots** drink water. They hold the plant." },
      { type: "explainer", title: "Water goes up", scenes: [{ caption: "Water is in the soil." }, { caption: "It climbs." }] },
      { type: "summary", points: ["Roots drink."] },
    ],
  };
  it("groups by stop with terms, activities and a transcript", () => {
    const o = lessonOutline(file);
    expect(o.objectives).toEqual(["Name the parts of a plant"]);
    expect(o.sections.map((s) => s.heading)).toEqual(["Introduction", "Stop 1: Roots"]);
    expect(o.sections[1]?.terms).toEqual(["Roots"]);
    expect(o.sections[1]?.activities).toEqual(["Animation: Water goes up"]);
    expect(o.transcript).toContain("Water is in the soil. It climbs.");
    expect(o.summary).toEqual(["Roots drink."]);
  });
  it("strips markdown", () => expect(plainText("a **b** *c*")).toBe("a b c"));
});
