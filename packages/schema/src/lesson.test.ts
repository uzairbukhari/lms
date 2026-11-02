import { describe, expect, it } from "vitest";
import { gradeQuestion, parseLessonFile, toPublicQuestion, type QuizQuestion } from "./index";

const valid = () => ({
  schema_version: "1.0",
  lesson: {
    slug: "maths-halves-and-quarters",
    subject: "maths",
    title: "Halves and Quarters",
    summary: "Learn how to split things into 2 and 4 equal parts.",
    age_band: "7-8",
    difficulty: 1,
    estimated_minutes: 12,
    unit: "Fractions",
    learning_objectives: ["Explain equal parts"],
    tags: ["fractions"],
    curriculum: { course: "maths-year-1", semester: 1, week: 3 },
  },
  blocks: [
    { type: "heading", text: "Sharing a pizza" },
    { type: "text", markdown: "Two friends share a pizza **fairly**." },
    { type: "image", emoji: "🍕", caption: "One pizza" },
    {
      type: "check",
      question: {
        type: "multiple_choice",
        prompt: "A cake is cut into 2 equal parts. What is each part?",
        options: [{ id: "a", text: "A half" }, { id: "b", text: "A quarter" }],
        answer: ["a"],
      },
    },
    { type: "summary", points: ["Halves = 2 equal parts"] },
  ],
  quiz: {
    pass_percent: 70,
    questions: [
      {
        ref: "q1",
        type: "multiple_choice",
        prompt: "Which picture shows one half?",
        options: [{ id: "a", text: "Two equal parts, one shaded" }, { id: "b", text: "Three parts, one shaded" }],
        answer: ["a"],
        skill_tag: "fractions.identify_half",
      },
      { ref: "q2", type: "number", prompt: "How many quarters make one whole?", answer: { value: 4 } },
    ],
  },
});

describe("lesson file validation", () => {
  it("accepts a valid lesson and fills in defaults", () => {
    const r = parseLessonFile(valid());
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.lesson.quiz.shuffle_questions).toBe(true);
      expect(r.lesson.quiz.questions[1]).toMatchObject({ points: 1, answer: { value: 4, tolerance: 0 } });
    }
  });

  it("rejects the wrong schema version", () => {
    const f = valid() as Record<string, unknown>;
    f.schema_version = "2.0";
    expect(parseLessonFile(f).ok).toBe(false);
  });

  it("points to the problem with a readable path", () => {
    const f = valid();
    (f.quiz.questions[0] as { answer: string[] }).answer = ["z"];
    const r = parseLessonFile(f);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.issues[0]?.path).toBe("quiz.questions.0.answer");
      expect(r.issues[0]?.message).toMatch(/not one of the option ids/);
    }
  });

  it("rejects duplicate question refs, bad slugs and unknown block types", () => {
    const dupRef = valid();
    (dupRef.quiz.questions[1] as { ref: string }).ref = "q1";
    expect(parseLessonFile(dupRef).ok).toBe(false);

    const badSlug = valid();
    badSlug.lesson.slug = "Maths Halves";
    expect(parseLessonFile(badSlug).ok).toBe(false);

    const badBlock = valid();
    (badBlock.blocks as unknown[]).push({ type: "video", url: "x" });
    expect(parseLessonFile(badBlock).ok).toBe(false);
  });

  it("requires emoji or asset on image blocks", () => {
    const f = valid();
    f.blocks[2] = { type: "image", caption: "nothing to show" } as never;
    expect(parseLessonFile(f).ok).toBe(false);
  });

  it("checks order and match answers", () => {
    const f = valid();
    f.quiz.questions.push({
      ref: "q3", type: "order", prompt: "Put in order",
      items: [{ id: "a", text: "One" }, { id: "b", text: "Two" }], answer: ["a", "c"],
    } as never);
    expect(parseLessonFile(f).ok).toBe(false);

    const g = valid();
    g.quiz.questions.push({
      ref: "q3", type: "match", prompt: "Match",
      left: [{ id: "l1", text: "A" }, { id: "l2", text: "B" }],
      right: [{ id: "r1", text: "1" }, { id: "r2", text: "2" }],
      answer: { l1: "r1" },
    } as never);
    expect(parseLessonFile(g).ok).toBe(false);
  });
});

function q(partial: object): QuizQuestion {
  return { ref: "q", prompt: "p", points: 1, ...partial } as QuizQuestion;
}

describe("grading", () => {
  it("multiple choice", () => {
    const m = q({ type: "multiple_choice", options: [{ id: "a", text: "A" }, { id: "b", text: "B" }], answer: ["b"] });
    expect(gradeQuestion(m, ["b"]).correct).toBe(true);
    expect(gradeQuestion(m, ["a"]).correct).toBe(false);
    expect(gradeQuestion(m, [])).toMatchObject({ correct: false, points: 0 });
    expect(gradeQuestion(m, ["a", "b"]).correct).toBe(false);
  });

  it("multi select needs exactly the right set", () => {
    const m = q({ type: "multi_select", options: [{ id: "a", text: "A" }, { id: "b", text: "B" }, { id: "c", text: "C" }], answer: ["a", "c"] });
    expect(gradeQuestion(m, ["c", "a"]).correct).toBe(true);
    expect(gradeQuestion(m, ["a"]).correct).toBe(false);
    expect(gradeQuestion(m, ["a", "b", "c"]).correct).toBe(false);
  });

  it("true/false", () => {
    const t = q({ type: "true_false", answer: [false] });
    expect(gradeQuestion(t, false).correct).toBe(true);
    expect(gradeQuestion(t, true).correct).toBe(false);
    expect(gradeQuestion(t, undefined).correct).toBe(false);
  });

  it("numbers accept text, commas and tolerance", () => {
    const n = q({ type: "number", answer: { value: 3.5, tolerance: 0.1 } });
    expect(gradeQuestion(n, "3,5").correct).toBe(true);
    expect(gradeQuestion(n, 3.55).correct).toBe(true);
    expect(gradeQuestion(n, "3.7").correct).toBe(false);
    expect(gradeQuestion(n, "abc").correct).toBe(false);
  });

  it("short text ignores case, accents and punctuation", () => {
    const s = q({ type: "short_text", answer: { accepted: ["photosynthesis", "photo synthesis"] } });
    expect(gradeQuestion(s, "  Photosynthesis! ").correct).toBe(true);
    expect(gradeQuestion(s, "photosynthesys").correct).toBe(false);
    expect(gradeQuestion(s, "").correct).toBe(false);
  });

  it("order and match give part credit", () => {
    const o = q({ type: "order", points: 2, items: [{ id: "a", text: "A" }, { id: "b", text: "B" }, { id: "c", text: "C" }, { id: "d", text: "D" }], answer: ["a", "b", "c", "d"] });
    expect(gradeQuestion(o, ["a", "b", "c", "d"])).toMatchObject({ correct: true, points: 2 });
    expect(gradeQuestion(o, ["a", "b", "d", "c"])).toMatchObject({ correct: false, points: 1 });
    const m = q({
      type: "match", points: 2,
      left: [{ id: "l1", text: "" }, { id: "l2", text: "" }], right: [{ id: "r1", text: "" }, { id: "r2", text: "" }],
      answer: { l1: "r1", l2: "r2" },
    });
    expect(gradeQuestion(m, { l1: "r1", l2: "r2" }).correct).toBe(true);
    expect(gradeQuestion(m, { l1: "r1", l2: "r1" })).toMatchObject({ correct: false, points: 1 });
  });

  it("public questions never include the answer or explanation", () => {
    const m = q({ type: "multiple_choice", options: [{ id: "a", text: "A" }, { id: "b", text: "B" }], answer: ["b"], explanation: "because" });
    const pub = JSON.stringify(toPublicQuestion(m, "id1"));
    expect(pub).not.toContain("because");
    expect(pub).not.toContain('"answer"');
    expect(pub).toContain("id1");
  });
});

describe("fill_blank, hotspot and slider questions", () => {
  const blank = () => q({
    type: "fill_blank", points: 2, text: "Plants make food using {b1} and {b2}.",
    blanks: [
      { id: "b1", options: [{ id: "x", text: "sunlight" }, { id: "y", text: "sand" }] },
      { id: "b2", options: [{ id: "x", text: "water" }, { id: "y", text: "milk" }] },
    ],
    answer: { b1: "x", b2: "x" },
  });
  const hot = () => q({
    type: "hotspot", prompt: "Tap the heart",
    scene: { items: [{ id: "h", emoji: "❤️", label: "heart", x: 30, y: 40, size: 2 }, { id: "l", emoji: "🫁", label: "lungs", x: 70, y: 40, size: 2 }], show_labels: false },
    answer: ["h"],
  });
  const slide = () => q({ type: "slider", range: { min: 0, max: 100, step: 5 }, answer: { value: 50, tolerance: 5 } });

  it("fill_blank grades each gap with part credit", () => {
    expect(gradeQuestion(blank(), { b1: "x", b2: "x" })).toMatchObject({ correct: true, points: 2 });
    expect(gradeQuestion(blank(), { b1: "x", b2: "y" })).toMatchObject({ correct: false, points: 1 });
    expect(gradeQuestion(blank(), undefined).correct).toBe(false);
  });

  it("hotspot needs exactly the right pictures", () => {
    expect(gradeQuestion(hot(), ["h"]).correct).toBe(true);
    expect(gradeQuestion(hot(), ["l"]).correct).toBe(false);
    expect(gradeQuestion(hot(), ["h", "l"]).correct).toBe(false);
    expect(gradeQuestion(hot(), []).correct).toBe(false);
  });

  it("slider accepts values within tolerance", () => {
    expect(gradeQuestion(slide(), 50).correct).toBe(true);
    expect(gradeQuestion(slide(), 55).correct).toBe(true);
    expect(gradeQuestion(slide(), 60).correct).toBe(false);
    expect(gradeQuestion(slide(), undefined).correct).toBe(false);
  });

  it("the file is checked: gaps must match the text, answers must exist, slider answer must be in range", () => {
    const base = (extra: object) => {
      const f = valid();
      f.quiz.questions.push({ ref: "q9", prompt: "x", ...extra } as never);
      return parseLessonFile(f).ok;
    };
    expect(base(blank())).toBe(true);
    expect(base(hot())).toBe(true);
    expect(base(slide())).toBe(true);
    expect(base({ ...blank(), text: "No gaps here" })).toBe(false);
    expect(base({ ...blank(), text: "A {b1} and {zz}", })).toBe(false);
    expect(base({ ...blank(), answer: { b1: "x", b2: "nope" } })).toBe(false);
    expect(base({ ...hot(), answer: ["ghost"] })).toBe(false);
    expect(base({ ...slide(), answer: { value: 500, tolerance: 0 } })).toBe(false);
    expect(base({ ...slide(), range: { min: 10, max: 10, step: 1 } })).toBe(false);
  });
});
