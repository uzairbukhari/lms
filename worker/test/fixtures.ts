/** A small valid lesson file (format 1.0) for tests. Pass overrides to change the slug, subject or curriculum slot. */
export function lessonFixture(over: { slug?: string; subject?: string; curriculum?: object | null; asset?: string } = {}) {
  const lesson: Record<string, unknown> = {
    slug: over.slug ?? "maths-halves-and-quarters",
    subject: over.subject ?? "maths",
    title: "Halves and Quarters",
    summary: "Learn how to split things into 2 and 4 equal parts.",
    age_band: "7-8",
    difficulty: 1,
    estimated_minutes: 12,
    unit: "Fractions",
    learning_objectives: ["Explain equal parts"],
  };
  if (over.curriculum !== null) lesson.curriculum = over.curriculum ?? { course: "maths-year-1", semester: 1, week: 3 };
  return {
    schema_version: "1.0",
    lesson,
    blocks: [
      { type: "heading", text: "Sharing a pizza" },
      over.asset ? { type: "image", asset: over.asset, alt: "A pizza" } : { type: "image", emoji: "🍕", caption: "One pizza" },
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
          ref: "q1", type: "multiple_choice", prompt: "Which picture shows one half?",
          options: [{ id: "a", text: "Two equal parts, one shaded" }, { id: "b", text: "Three parts, one shaded" }],
          answer: ["a"], explanation: "One of two equal parts is a half.", skill_tag: "fractions.identify_half",
        },
        { ref: "q2", type: "number", prompt: "How many quarters make one whole?", answer: { value: 4 }, skill_tag: "fractions.quarters" },
      ],
    },
  };
}
