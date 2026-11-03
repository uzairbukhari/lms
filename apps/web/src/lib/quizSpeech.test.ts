import { describe, expect, it } from "vitest";
import { questionToSpeech } from "./quizSpeech";

describe("questionToSpeech", () => {
  it("reads the question and its lettered choices", () => {
    const text = questionToSpeech({ type: "multiple_choice", prompt: "What is **half** of 8?", options: [{ id: "a", text: "4" }, { id: "b", text: "16" }] });
    expect(text).toBe("What is half of 8? A. 4. B. 16.");
  });
  it("adds a spoken cue for true or false and for ordering", () => {
    expect(questionToSpeech({ type: "true_false", prompt: "A square has four sides." })).toBe("A square has four sides. True or false?");
    expect(questionToSpeech({ type: "order", prompt: "Order the planets", items: [{ id: "1", text: "Mercury" }, { id: "2", text: "Venus" }] })).toContain("Put these in order. A. Mercury. B. Venus.");
  });
  it("reads nothing extra for typed answers", () => {
    expect(questionToSpeech({ type: "number", prompt: "How many legs?" })).toBe("How many legs?");
  });
});
