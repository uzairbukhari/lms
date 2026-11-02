import { z } from "zod";
import { SUBJECTS } from "./constants";

// The lesson file format, version 1.0 (docs/PLAN.md section 5).
// Claude generates this JSON; the admin importer validates it with `lessonFileSchema` before anything is saved.

export const SCHEMA_VERSION = "1.0" as const;

const shortId = z.string().regex(/^[A-Za-z0-9_-]{1,24}$/, "Use letters, numbers, - or _ (max 24 characters)");
const line = (max: number) => z.string().trim().min(1, "Cannot be empty").max(max, `Keep this under ${max} characters`);
const longText = (max: number) => z.string().trim().min(1, "Cannot be empty").max(max);
const optionSchema = z.object({ id: shortId, text: line(200) });

// --- Questions ------------------------------------------------------------------------------------

const questionExtras = (inQuiz: boolean) => ({
  ref: inQuiz ? shortId : shortId.optional(),
  points: z.number().int().min(1).max(5).default(1),
  skill_tag: z
    .string()
    .regex(/^[a-z0-9_]+(\.[a-z0-9_]+)*$/, 'Use lower case words like "fractions.compare"')
    .max(60)
    .optional(),
});

const commonFields = {
  prompt: line(400),
  hint: line(300).optional(),
  explanation: line(500).optional(),
  emoji: z.string().max(16).optional(),
};

function buildQuestionSchema(inQuiz: boolean) {
  const extras = questionExtras(inQuiz);
  return z.discriminatedUnion("type", [
    z.object({
      type: z.literal("multiple_choice"),
      ...commonFields,
      ...extras,
      options: z.array(optionSchema).min(2).max(6),
      answer: z.array(shortId).length(1, "Pick exactly one correct option"),
    }),
    z.object({
      type: z.literal("multi_select"),
      ...commonFields,
      ...extras,
      options: z.array(optionSchema).min(2).max(8),
      answer: z.array(shortId).min(1),
    }),
    z.object({
      type: z.literal("true_false"),
      ...commonFields,
      ...extras,
      answer: z.array(z.boolean()).length(1),
    }),
    z.object({
      type: z.literal("number"),
      ...commonFields,
      ...extras,
      answer: z.object({ value: z.number().finite(), tolerance: z.number().min(0).default(0) }),
    }),
    z.object({
      type: z.literal("short_text"),
      ...commonFields,
      ...extras,
      answer: z.object({ accepted: z.array(line(80)).min(1).max(12) }),
    }),
    z.object({
      type: z.literal("order"),
      ...commonFields,
      ...extras,
      items: z.array(optionSchema).min(2).max(8),
      answer: z.array(shortId).min(2),
    }),
    z.object({
      type: z.literal("match"),
      ...commonFields,
      ...extras,
      left: z.array(optionSchema).min(2).max(6),
      right: z.array(optionSchema).min(2).max(6),
      answer: z.record(shortId, shortId),
    }),
  ]);
}

type RawQuestion = z.infer<ReturnType<typeof buildQuestionSchema>>;

const dup = (ids: string[]) => ids.find((id, i) => ids.indexOf(id) !== i);

/** Cross-field checks: every answer id must exist, ids must be unique, and so on. */
function checkQuestion(q: RawQuestion, ctx: z.RefinementCtx): void {
  const add = (path: (string | number)[], message: string) => ctx.addIssue({ code: "custom", path, message });
  switch (q.type) {
    case "multiple_choice":
    case "multi_select": {
      const ids = q.options.map((o) => o.id);
      const d = dup(ids);
      if (d) add(["options"], `Option id "${d}" is used twice`);
      for (const a of q.answer) if (!ids.includes(a)) add(["answer"], `Answer "${a}" is not one of the option ids`);
      if (new Set(q.answer).size !== q.answer.length) add(["answer"], "Answer lists the same option twice");
      break;
    }
    case "order": {
      const ids = q.items.map((o) => o.id);
      const d = dup(ids);
      if (d) add(["items"], `Item id "${d}" is used twice`);
      if (q.answer.length !== ids.length || [...q.answer].sort().join() !== [...ids].sort().join()) {
        add(["answer"], "Answer must list every item id exactly once, in the correct order");
      }
      break;
    }
    case "match": {
      const l = q.left.map((o) => o.id);
      const r = q.right.map((o) => o.id);
      if (dup(l)) add(["left"], "Left ids must be unique");
      if (dup(r)) add(["right"], "Right ids must be unique");
      for (const id of l) if (!(id in q.answer)) add(["answer"], `Answer is missing left id "${id}"`);
      for (const [k, v] of Object.entries(q.answer)) {
        if (!l.includes(k)) add(["answer", k], `"${k}" is not a left id`);
        if (!r.includes(v)) add(["answer", k], `"${v}" is not a right id`);
      }
      break;
    }
    default:
      break;
  }
}

export const quizQuestionSchema = buildQuestionSchema(true).superRefine(checkQuestion);
export const checkQuestionSchema = buildQuestionSchema(false).superRefine(checkQuestion);

export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
export type CheckQuestion = z.infer<typeof checkQuestionSchema>;
export type QuestionType = QuizQuestion["type"];

// --- Lesson blocks --------------------------------------------------------------------------------

export const blockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("heading"), text: line(120) }),
  z.object({ type: z.literal("text"), markdown: longText(2000) }),
  z
    .object({
      type: z.literal("image"),
      emoji: z.string().max(16).optional(),
      asset: z.string().max(200).optional(),
      alt: line(200).optional(),
      caption: line(200).optional(),
    })
    .refine((b) => b.emoji || b.asset, { message: 'An image block needs an "emoji" or an uploaded "asset" name' }),
  z.object({ type: z.literal("callout"), style: z.enum(["tip", "fun_fact", "warning"]), markdown: longText(800) }),
  // A picture drawn from a few numbers: pictogram, bar chart, tally chart, table, number line or fraction bar.
  z
    .object({
      type: z.literal("chart"),
      kind: z.enum(["pictogram", "bar_chart", "tally", "table", "number_line", "fraction"]),
      title: line(100),
      caption: line(200).optional(),
      rows: z.array(z.object({ label: line(30), value: z.number().min(0).max(100), emoji: z.string().trim().min(1).max(16).optional() })).min(1).max(8).optional(),
      /** Pictogram only: how many each picture stands for (default 1). */
      each: z.number().int().min(1).max(20).optional(),
      /** Number line only. */
      from: z.number().min(-1000).max(1000).optional(),
      to: z.number().min(-1000).max(1000).optional(),
      step: z.number().positive().optional(),
      marks: z.array(z.number()).max(6).optional(),
      /** Fraction bar only: the whole is split into `parts` equal pieces and `shaded` of them are coloured. */
      parts: z.number().int().min(2).max(12).optional(),
      shaded: z.number().int().min(0).max(12).optional(),
    })
    .superRefine((b, ctx) => {
      const bad = (message: string, path: string) => ctx.addIssue({ code: "custom", path: [path], message });
      if (["pictogram", "bar_chart", "tally", "table"].includes(b.kind) && !b.rows?.length) bad(`A ${b.kind} needs "rows" (label and value)`, "rows");
      if (b.kind === "number_line") {
        if (b.from === undefined || b.to === undefined || b.from >= b.to) bad('A number line needs "from" smaller than "to"', "from");
        else if ((b.to - b.from) / (b.step ?? 1) > 40) bad("Too many tick marks: raise the step", "step");
      }
      if (b.kind === "fraction" && (!b.parts || b.shaded === undefined || b.shaded > b.parts)) bad('A fraction needs "parts" and "shaded" (not more than parts)', "parts");
    }),
  z.object({ type: z.literal("reveal"), prompt: line(300), answer_markdown: longText(800) }),
  z.object({ type: z.literal("check"), question: checkQuestionSchema }),
  z.object({ type: z.literal("steps"), items: z.array(line(300)).min(1).max(12) }),
  z.object({ type: z.literal("vocab"), word: line(40), meaning: line(300), example: line(300).optional() }),
  z.object({
    type: z.literal("activity"),
    title: line(100),
    materials: z.array(line(100)).max(12).optional(),
    instructions: z.array(line(300)).min(1).max(12),
  }),
  // Kid-friendly meanings for key words in the lesson (the bold ones). Not shown as a slide: a child long-presses a word to see it.
  z.object({ type: z.literal("glossary"), terms: z.array(z.object({ term: line(40), meaning: line(300) })).min(1).max(40) }),
  // Move-the-items play area (counters, coins, sweets...) so a child can try a counting, sharing or grouping idea without real objects.
  z.object({
    type: z.literal("manipulative"),
    title: line(100),
    goal: line(300).optional(),
    emoji: z.string().trim().min(1).max(16),
    count: z.number().int().min(1).max(20),
    zones: z.array(line(30)).min(1).max(4),
  }),
  // An animated, step-by-step picture: each scene places emoji on a stage; things sharing an `id` glide to their new spot between steps.
  z.object({
    type: z.literal("explainer"),
    title: line(100),
    scenes: z
      .array(
        z.object({
          caption: line(200),
          items: z
            .array(
              z.object({
                id: shortId.optional(),
                emoji: z.string().trim().min(1).max(16),
                label: line(30).optional(),
                x: z.number().min(0).max(100),
                y: z.number().min(0).max(100),
                size: z.number().int().min(1).max(3).default(2),
                anim: z.enum(["none", "bounce", "float", "spin", "pulse", "grow"]).default("none"),
              }),
            )
            .min(1)
            .max(14),
        }),
      )
      .min(2)
      .max(8),
  }),
  // A short brain exercise. Never graded or saved.
  z.object({
    type: z.literal("brain_game"),
    game: z.enum(["memory_match", "remember_order"]),
    title: line(100),
    goal: line(200).optional(),
    emojis: z.array(z.string().trim().min(1).max(16)).min(3).max(8),
  }),
  z.object({ type: z.literal("summary"), points: z.array(line(200)).min(1).max(8) }),
  z.object({ type: z.literal("html_embed"), title: line(100), html: longText(50_000) }),
]);
export type Block = z.infer<typeof blockSchema>;
export type BlockType = Block["type"];

// --- The whole file -------------------------------------------------------------------------------

const curriculumSchema = z.object({
  course: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use a slug like maths-year-1").max(80),
  semester: z.number().int().min(1).max(4),
  week: z.number().int().min(1).max(12),
});

export const lessonMetaSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lower case words joined with - (for example maths-halves-and-quarters)")
    .max(80),
  subject: z.enum(SUBJECTS),
  title: line(80),
  summary: line(250),
  age_band: z.enum(["7-8", "9-10", "7-10"]),
  difficulty: z.number().int().min(1).max(3),
  estimated_minutes: z.number().int().min(1).max(60),
  unit: line(80).optional(),
  learning_objectives: z.array(line(200)).min(1).max(6),
  tags: z.array(line(40)).max(12).optional(),
  curriculum: curriculumSchema.optional(),
});

export const quizSchema = z
  .object({
    pass_percent: z.number().int().min(1).max(100).default(70),
    shuffle_questions: z.boolean().default(true),
    shuffle_options: z.boolean().default(true),
    max_attempts: z.number().int().min(1).max(50).nullable().optional(),
    questions: z.array(quizQuestionSchema).min(1).max(40),
  })
  .superRefine((quiz, ctx) => {
    const refs = quiz.questions.map((q) => q.ref as string);
    const d = dup(refs);
    if (d) ctx.addIssue({ code: "custom", path: ["questions"], message: `Question ref "${d}" is used twice` });
  });

export const lessonFileSchema = z.object({
  schema_version: z.literal(SCHEMA_VERSION, { error: `schema_version must be "${SCHEMA_VERSION}"` }),
  lesson: lessonMetaSchema,
  blocks: z.array(blockSchema).min(1).max(60),
  quiz: quizSchema,
});

export type LessonFile = z.infer<typeof lessonFileSchema>;
export type LessonMeta = z.infer<typeof lessonMetaSchema>;

export interface LessonIssue {
  path: string;
  message: string;
}

/** Turn a validation error into short, readable lines you can paste back to Claude ("fix these"). */
export function lessonIssues(error: z.ZodError): LessonIssue[] {
  return error.issues.slice(0, 40).map((i) => ({
    path: i.path.length ? i.path.map(String).join(".") : "(file)",
    message: i.message,
  }));
}

export function parseLessonFile(
  input: unknown,
): { ok: true; lesson: LessonFile } | { ok: false; issues: LessonIssue[] } {
  const result = lessonFileSchema.safeParse(input);
  return result.success ? { ok: true, lesson: result.data } : { ok: false, issues: lessonIssues(result.error) };
}
