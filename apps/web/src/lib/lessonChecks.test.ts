import { describe, expect, it } from "vitest";
import { lessonChecks } from "./lessonChecks";

describe("lessonChecks", () => {
  it("flags missing hints, explanations and variants", () => {
    const file = { lesson: {}, quiz: { questions: [{ ref: "q1", hint: "h" }, { ref: "q2", hint: "h", explanation: "e" }, { ref: "q2v", variant_of: "q2" }] } };
    const warns = lessonChecks(file).filter((c) => c.level === "warn").map((c) => c.text);
    expect(warns.some((t) => t.includes("Only 2 quiz questions"))).toBe(true);
    expect(warns.some((t) => t.includes("1 question has no explanation"))).toBe(true);
    expect(warns.some((t) => t.includes("1 question has no retake variant"))).toBe(true);
    expect(warns.some((t) => t.includes("no hint"))).toBe(false);
  });
  it("is happy with a complete lesson", () => {
    const qs = Array.from({ length: 10 }, (_, i) => ({ ref: `q${i}`, hint: "h", explanation: "e", depth: i < 3 ? "reason" : "recall" })).flatMap((q) => [q, { variant_of: q.ref }]);
    const file = { lesson: { success_criteria: ["I can"] }, sub_lessons: [1, 2, 3], quiz: { questions: qs } };
    expect(lessonChecks(file).every((c) => c.level === "ok")).toBe(true);
  });
});
