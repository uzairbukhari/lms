import { describe, expect, it } from "vitest";
import { buildSlides, parseLessonFile } from "./index";

const base = (blocks: unknown[]) => ({
  schema_version: "1.0",
  lesson: { slug: "maths-hops", subject: "maths", title: "Hops", summary: "Hop along.", age_band: "7-8", difficulty: 1, estimated_minutes: 12, unit: "Number", learning_objectives: ["Add by hopping"], tags: [], curriculum: { course: "maths-year-1", semester: 1, week: 3 } },
  blocks,
  quiz: { pass_percent: 70, questions: [{ ref: "q1", type: "number", prompt: "What is 2 and 3?", answer: { value: 5 } }] },
});

describe("animation fields", () => {
  it("accepts backdrops, actors with cues and props, and explainer moves", () => {
    const r = parseLessonFile(base([
      { type: "heading", text: "Stop 1: Hopping", backdrop: "pond" },
      { type: "text", markdown: "The frog starts on 2. It hops 3 more." },
      { type: "image", actors: [{ prop: { kind: "number_line", from: 0, to: 10, value: 5 }, at: 0 }, { emoji: "🐸", at: 1, enter: "drop", effect: "sparkle" }] },
      { type: "explainer", title: "Hop", backdrop: "pond", autoplay: true, scenes: [
        { caption: "On 2.", items: [{ id: "n", prop: { kind: "number_line", value: 2 }, x: 50, y: 60 }] },
        { caption: "On 5.", camera: { zoom: 1.5, x: 50, y: 60 }, items: [{ id: "n", prop: { kind: "number_line", value: 5 }, x: 50, y: 60, path: "hop" }, { emoji: "⭐", x: 50, y: 20, enter: "pop", exit: "fly_up", effect: "glow" }] },
      ] },
    ]));
    expect(r.ok ? [] : r.issues).toEqual([]);
  });

  it("keeps old lessons valid and refuses an actor with nothing to show", () => {
    expect(parseLessonFile(base([{ type: "image", emoji: "🐻🌲" }])).ok).toBe(true);
    expect(parseLessonFile(base([{ type: "image", actors: [{ label: "nothing" }] }])).ok).toBe(false);
    expect(parseLessonFile(base([{ type: "heading", text: "x", backdrop: "volcano" }])).ok).toBe(false);
    expect(parseLessonFile(base([{ type: "image", actors: [{ prop: { kind: "teapot" } }] }])).ok).toBe(false);
  });

  it("numbers the stops and carries each stop's backdrop onto its slides", () => {
    const slides = buildSlides({ title: "T", summary: "S", minutes: 5, objectives: [] }, [
      { type: "heading", text: "Welcome" }, { type: "text", markdown: "Hi." },
      { type: "heading", text: "Stop 1: Ponds", backdrop: "pond" }, { type: "text", markdown: "Frogs." },
      { type: "check", question: { type: "true_false", prompt: "Frogs swim.", answer: true } as never },
    ]);
    expect(slides.map((s) => s.stop)).toEqual([undefined, 1, 2, 2, undefined]);
    expect(slides[2]?.backdrop).toBe("pond");
    expect(slides[3]?.backdrop).toBe("pond");
  });
});
