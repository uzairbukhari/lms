import { z } from "zod";
import { SUBJECTS } from "./constants";

// The lesson file format, version 1.0 (docs/PLAN.md section 5).
// Claude generates this JSON; the admin importer validates it with `lessonFileSchema` before anything is saved.

export const SCHEMA_VERSION = "1.0" as const;
/** Topic lessons (sub-lessons, standards, mini quizzes). Version 1.0 files still import unchanged. */
export const SCHEMA_VERSION_V3 = "3.0" as const;

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
  /** Quiz only: how hard the thinking is, and which sub-lesson to practise again if the child gets it wrong. */
  depth: z.enum(["recall", "apply", "reason"]).optional(),
  sub_lesson: z.string().regex(/^[a-z0-9_]{1,24}$/, "Use the sub-lesson id (lower case letters, numbers, _)").optional(),
  /** Quiz only: this question is a retake variant of the question with this ref. Retakes swap in variants so answers cannot be memorised. */
  variant_of: shortId.optional(),
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
    z.object({
      // A sentence with gaps. Write each gap as {id} inside `text`, for example "Plants make food using {b1} and water."
      type: z.literal("fill_blank"),
      ...commonFields,
      ...extras,
      text: line(500),
      blanks: z.array(z.object({ id: shortId, options: z.array(optionSchema).min(2).max(6) })).min(1).max(5),
      answer: z.record(shortId, shortId),
    }),
    z.object({
      // A picture made of emoji (like an explainer scene); the child taps the right thing or things.
      type: z.literal("hotspot"),
      ...commonFields,
      ...extras,
      scene: z.object({
        items: z.array(z.object({ id: shortId, emoji: z.string().min(1).max(16), label: line(40), x: z.number().min(0).max(100), y: z.number().min(0).max(100), size: z.number().int().min(1).max(3).default(2) })).min(2).max(12),
        show_labels: z.boolean().default(false),
      }),
      answer: z.array(shortId).min(1).max(4),
    }),
    z.object({
      type: z.literal("slider"),
      ...commonFields,
      ...extras,
      range: z.object({ min: z.number().finite(), max: z.number().finite(), step: z.number().positive().default(1), unit: line(20).optional() }),
      answer: z.object({ value: z.number().finite(), tolerance: z.number().min(0).default(0) }),
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
    case "fill_blank": {
      const ids = q.blanks.map((b) => b.id);
      if (dup(ids)) add(["blanks"], "Blank ids must be unique");
      for (const id of ids) {
        if (!q.text.includes(`{${id}}`)) add(["text"], `The text must contain {${id}} where the gap goes`);
      }
      for (const m of q.text.matchAll(/\{([A-Za-z0-9_-]+)\}/g)) if (!ids.includes(m[1] as string)) add(["text"], `{${m[1]}} has no matching blank`);
      for (const b of q.blanks) {
        const o = b.options.map((x) => x.id);
        if (dup(o)) add(["blanks"], `Option ids in blank "${b.id}" must be unique`);
        const a = q.answer[b.id];
        if (a === undefined) add(["answer"], `Answer is missing blank "${b.id}"`);
        else if (!o.includes(a)) add(["answer", b.id], `"${a}" is not an option of blank "${b.id}"`);
      }
      for (const k of Object.keys(q.answer)) if (!ids.includes(k)) add(["answer", k], `"${k}" is not a blank id`);
      break;
    }
    case "hotspot": {
      const ids = q.scene.items.map((i) => i.id);
      if (dup(ids)) add(["scene", "items"], "Item ids must be unique");
      for (const a of q.answer) if (!ids.includes(a)) add(["answer"], `Answer "${a}" is not an item id`);
      if (new Set(q.answer).size !== q.answer.length) add(["answer"], "Answer lists the same item twice");
      break;
    }
    case "slider": {
      const { min, max, step } = q.range;
      if (min >= max) add(["range"], "min must be smaller than max");
      if (q.answer.value < min || q.answer.value > max) add(["answer", "value"], "The answer must be inside the range");
      if (max > min && step > max - min) add(["range", "step"], "step is bigger than the range");
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

// --- Animation (see docs/LESSON_GUIDELINES.md, part "Animation") ---------------------------------------

/** Drawn scenery behind pictures and explainers. */
export const BACKDROPS = ["plain", "meadow", "forest", "pond", "sea", "desert", "mountain", "sky", "space", "kitchen", "classroom", "home", "town", "farm", "map", "lab"] as const;
export type Backdrop = (typeof BACKDROPS)[number];
/** Drawn pictures with moving parts, used instead of emoji where a real diagram teaches better. */
export const PROPS = ["number_line", "ten_frame", "base_ten", "fraction_pizza", "fraction_bar", "clock", "thermometer", "balance", "plant", "body", "globe", "sun_earth", "robot_grid", "sorting_boxes", "venn", "coin"] as const;
export type PropKind = (typeof PROPS)[number];
export const ENTERS = ["pop", "fade", "drop", "grow", "slide_left", "slide_right", "walk_left", "walk_right"] as const;
export const EXITS = ["fade", "shrink", "fly_up", "drop"] as const;
export const EFFECTS = ["none", "rain", "steam", "sparkle", "wind", "glow", "hearts", "bubbles", "zzz", "arrow_right", "arrow_down", "count"] as const;

export const propSchema = z.object({
  kind: z.enum(PROPS),
  /** number_line: where the frog sits. ten_frame: counters. thermometer: degrees. sun_earth: hour of the day (0 to 24). */
  value: z.number().min(-1000).max(1000).optional(),
  from: z.number().min(-1000).max(1000).optional(),
  to: z.number().min(-1000).max(1000).optional(),
  /** fraction_pizza, fraction_bar. */
  parts: z.number().int().min(1).max(12).optional(),
  shaded: z.number().int().min(0).max(12).optional(),
  /** clock. */
  hour: z.number().int().min(0).max(23).optional(),
  minute: z.number().int().min(0).max(59).optional(),
  /** balance: weight on each pan. base_ten: tens and ones. */
  left: z.number().min(0).max(100).optional(),
  right: z.number().min(0).max(100).optional(),
  tens: z.number().int().min(0).max(9).optional(),
  ones: z.number().int().min(0).max(9).optional(),
  /** robot_grid: the robot's square (col, row from 0) and the way it faces. */
  col: z.number().int().min(0).max(5).optional(),
  row: z.number().int().min(0).max(5).optional(),
  facing: z.enum(["up", "down", "left", "right"]).optional(),
  /** plant: roots, stem, leaf, flower. body: brain, heart, lungs, stomach, bones, muscles. globe: a continent. coin: the text on its face, like "10p", "£1" or "Rs 5". */
  highlight: line(20).optional(),
  /** sorting_boxes and venn: box names (venn uses the first two). */
  labels: z.array(line(24)).max(3).optional(),
});
export type PropSpec = z.infer<typeof propSchema>;

const cue = z.number().int().min(0).max(20);

/** One thing on an image stage: an emoji or a drawn prop that enters when the narration reaches sentence `at`. */
const actorSchema = z
  .object({
    emoji: z.string().trim().min(1).max(16).optional(),
    prop: propSchema.optional(),
    label: line(30).optional(),
    /** Which sentence of the slide's text brings it in (0 = the first sentence). */
    at: cue.optional(),
    enter: z.enum(ENTERS).optional(),
    effect: z.enum(EFFECTS).optional(),
    x: z.number().min(0).max(100).optional(),
    y: z.number().min(0).max(100).optional(),
    size: z.number().int().min(1).max(3).optional(),
  })
  .refine((a) => a.emoji || a.prop, { message: 'An actor needs an "emoji" or a "prop"' });

/** What the voice says instead of the words on screen: a friendly teaching script (spoken numbers, questions, links to the picture). */
const say = longText(900).optional();

// --- Lesson blocks --------------------------------------------------------------------------------

export const blockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("heading"), text: line(120), backdrop: z.enum(BACKDROPS).optional() }),
  z.object({ type: z.literal("text"), say, markdown: longText(2000) }),
  z
    .object({
      type: z.literal("image"), say,
      emoji: z.string().max(16).optional(),
      asset: z.string().max(200).optional(),
      /** Who to thank for a real photo or diagram, shown under it, e.g. "Photo by Aaron Burden on Unsplash". Needed for every asset. */
      credit: line(200).optional(),
      alt: line(200).optional(),
      caption: line(200).optional(),
      /** Scenery behind the picture (default: the stop's backdrop, or one picked from the words). */
      backdrop: z.enum(BACKDROPS).optional(),
      /** The picture as separate things that enter with the narration. Without it, each emoji in `emoji` becomes one. */
      actors: z.array(actorSchema).min(1).max(8).optional(),
    })
    .refine((b) => b.emoji || b.asset || b.actors?.length, { message: 'An image block needs an "emoji", "actors" or an uploaded "asset" name' }),
  z.object({ type: z.literal("callout"), say, style: z.enum(["tip", "fun_fact", "warning"]), markdown: longText(800) }),
  // A picture drawn from a few numbers: pictogram, bar chart, tally chart, table, number line or fraction bar.
  z
    .object({
      type: z.literal("chart"), say,
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
  // A short clip (never longer than 100 seconds) played from YouTube's privacy-friendly player, cut to just the part we want.
  z
    .object({
      type: z.literal("video"),
      title: line(100),
      youtube: z.string().regex(/^[A-Za-z0-9_-]{11}$/, "Use the 11 character video id from the YouTube link (the part after v=)"),
      start: z.number().int().min(0).max(36000).default(0),
      end: z.number().int().min(1).max(36000),
      caption: line(200).optional(),
    })
    .superRefine((b, ctx) => {
      if (b.end <= b.start) ctx.addIssue({ code: "custom", path: ["end"], message: '"end" must be after "start"' });
      else if (b.end - b.start > 100) ctx.addIssue({ code: "custom", path: ["end"], message: "Clips must be 100 seconds or shorter: pick a shorter start and end" });
    }),
  // A short narrated clip made for this lesson: an mp4 and a still poster uploaded as assets, plus the words spoken in it.
  z.object({
    type: z.literal("clip"),
    title: line(100),
    asset: z.string().regex(/^[a-z0-9][a-z0-9._-]{0,120}[.]mp4$/, "Use the uploaded mp4 file name (lower case, ending .mp4)"),
    poster: z.string().regex(/^[a-z0-9][a-z0-9._-]{0,120}[.](webp|png|jpg)$/, "Use the uploaded poster picture name (.webp, .png or .jpg)"),
    seconds: z.number().int().min(5).max(90),
    transcript: longText(3000),
    caption: line(200).optional(),
  }),
  z.object({ type: z.literal("reveal"), say, prompt: line(300), answer_markdown: longText(800) }),
  z.object({ type: z.literal("check"), say, question: checkQuestionSchema }),
  z.object({ type: z.literal("steps"), say, items: z.array(line(300)).min(1).max(12) }),
  z.object({ type: z.literal("vocab"), word: line(40), meaning: line(300), example: line(300).optional() }),
  z.object({
    type: z.literal("activity"), say,
    title: line(100),
    materials: z.array(line(100)).max(12).optional(),
    instructions: z.array(line(300)).min(1).max(12),
  }),
  // Kid-friendly meanings for key words in the lesson (the bold ones). Not shown as a slide: a child long-presses a word to see it.
  z.object({ type: z.literal("glossary"), terms: z.array(z.object({ term: line(40), meaning: line(300) })).min(1).max(40) }),
  // Move-the-items play area (counters, coins, sweets...) so a child can try a counting, sharing or grouping idea without real objects.
  z.object({
    type: z.literal("manipulative"), say,
    title: line(100),
    goal: line(300).optional(),
    emoji: z.string().trim().min(1).max(16),
    count: z.number().int().min(1).max(20),
    zones: z.array(line(30)).min(1).max(4),
  }),
  // An animated, step-by-step picture: each scene places emoji on a stage; things sharing an `id` glide to their new spot between steps.
  z.object({
    type: z.literal("explainer"), say,
    title: line(100),
    /** Scenery behind the stage (default: picked from the words). */
    backdrop: z.enum(BACKDROPS).optional(),
    /** Plays by itself in time with the voice (default true). The child can still pause and step. */
    autoplay: z.boolean().optional(),
    scenes: z
      .array(
        z.object({
          caption: line(200),
          /** What the voice says for this step (default: the caption). */
          say,
          /** Zoom the stage onto a spot: zoom 1 to 3, x and y in percent of the stage. */
          camera: z.object({ zoom: z.number().min(1).max(3), x: z.number().min(0).max(100), y: z.number().min(0).max(100) }).optional(),
          items: z
            .array(
              z
                .object({
                  id: shortId.optional(),
                  emoji: z.string().trim().min(1).max(16).optional(),
                  prop: propSchema.optional(),
                  label: line(30).optional(),
                  x: z.number().min(0).max(100),
                  y: z.number().min(0).max(100),
                  size: z.number().int().min(1).max(3).default(2),
                  anim: z.enum(["none", "bounce", "float", "spin", "pulse", "grow"]).default("none"),
                  /** How a thing arrives the first time it shows, how it leaves, and how it travels between steps. */
                  enter: z.enum(ENTERS).optional(),
                  exit: z.enum(EXITS).optional(),
                  path: z.enum(["straight", "arc", "hop"]).optional(),
                  effect: z.enum(EFFECTS).optional(),
                })
                .refine((it) => it.emoji || it.prop, { message: 'An explainer item needs an "emoji" or a "prop"' }),
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
    type: z.literal("brain_game"), say,
    game: z.enum(["memory_match", "remember_order"]),
    title: line(100),
    goal: line(200).optional(),
    emojis: z.array(z.string().trim().min(1).max(16)).min(3).max(8),
  }),
  z.object({ type: z.literal("summary"), say, points: z.array(line(200)).min(1).max(8) }),
  z.object({ type: z.literal("html_embed"), title: line(100), html: longText(50_000) }),
]);
export type Block = z.infer<typeof blockSchema>;
export type BlockType = Block["type"];

// --- The whole file -------------------------------------------------------------------------------

const curriculumSchema = z
  .object({
    course: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use a slug like maths-year-1").max(80),
    semester: z.number().int().min(1).max(4),
    /** Weekly courses use a week; topic (mastery path) courses use the topic's place in the subject. */
    week: z.number().int().min(1).max(12).optional(),
    topic: z.number().int().min(1).max(60).optional(),
  })
  .refine((c) => (c.week === undefined) !== (c.topic === undefined), { message: 'Give either "week" or "topic", not both', path: ["topic"] });

const standardSchema = z.object({
  framework: z.enum(["nc_england", "cambridge", "pk_ncc", "csta", "ai4k12", "pyp"]),
  code: line(30),
  text: line(200).optional(),
});

const SUB_KINDS = ["learn", "try", "play", "use"] as const;
export const subLessonSchema = z.object({
  id: z.string().regex(/^[a-z0-9_]{1,24}$/, "Use lower case letters, numbers and _ (max 24)"),
  kind: z.enum(SUB_KINDS),
  title: line(80),
  blocks: z.array(blockSchema).min(1).max(30),
  /** 3 to 5 quick questions, marked on the child's screen (practice, not the big quiz). */
  mini_quiz: z.array(checkQuestionSchema).min(3).max(5),
});
export type SubLesson = z.infer<typeof subLessonSchema>;

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
  standards: z.array(standardSchema).max(12).optional(),
  success_criteria: z.array(line(160)).max(8).optional(),
  real_life: line(300).optional(),
  /** A 3-minute "remember" warm-up on earlier learning (up to 3 questions). */
  warm_up: z.array(checkQuestionSchema).max(3).optional(),
});

export const quizSchema = z
  .object({
    pass_percent: z.number().int().min(1).max(100).default(70),
    shuffle_questions: z.boolean().default(true),
    shuffle_options: z.boolean().default(true),
    max_attempts: z.number().int().min(1).max(50).nullable().optional(),
    questions: z.array(quizQuestionSchema).min(1).max(80),
  })
  .superRefine((quiz, ctx) => {
    const refs = quiz.questions.map((q) => q.ref as string);
    const d = dup(refs);
    if (d) ctx.addIssue({ code: "custom", path: ["questions"], message: `Question ref "${d}" is used twice` });
    const primaries = new Set(quiz.questions.filter((q) => !q.variant_of).map((q) => q.ref as string));
    quiz.questions.forEach((q, i) => {
      if (q.variant_of && !primaries.has(q.variant_of)) ctx.addIssue({ code: "custom", path: ["questions", i, "variant_of"], message: `"${q.variant_of}" is not a main question (a variant must point at a question that is not itself a variant)` });
      if (q.variant_of) {
        const main = quiz.questions.find((x) => x.ref === q.variant_of);
        if (main && main.type !== q.type) ctx.addIssue({ code: "custom", path: ["questions", i, "type"], message: `A variant must be the same question type as ${q.variant_of} (${main.type})` });
      }
    });
  });

export const lessonFileSchema = z
  .object({
    schema_version: z.enum([SCHEMA_VERSION, SCHEMA_VERSION_V3], { error: `schema_version must be "${SCHEMA_VERSION}" or "${SCHEMA_VERSION_V3}"` }),
    lesson: lessonMetaSchema,
    blocks: z.array(blockSchema).max(60),
    sub_lessons: z.array(subLessonSchema).min(1).max(8).optional(),
    quiz: quizSchema,
  })
  .superRefine((f, ctx) => {
    if (!f.sub_lessons && f.blocks.length === 0) ctx.addIssue({ code: "custom", path: ["blocks"], message: "A lesson needs at least one block (or sub_lessons)" });
    if (f.sub_lessons) {
      const d = dup(f.sub_lessons.map((x) => x.id));
      if (d) ctx.addIssue({ code: "custom", path: ["sub_lessons"], message: `Sub-lesson id "${d}" is used twice` });
      const ids = new Set(f.sub_lessons.map((x) => x.id));
      f.quiz.questions.forEach((q, i) => {
        if (q.sub_lesson && !ids.has(q.sub_lesson)) ctx.addIssue({ code: "custom", path: ["quiz", "questions", i, "sub_lesson"], message: `No sub-lesson with id "${q.sub_lesson}"` });
      });
      if (f.schema_version === SCHEMA_VERSION_V3) {
        const mains = f.quiz.questions.filter((q) => !q.variant_of);
        const reason = mains.filter((q) => q.depth === "reason").length;
        if (mains.length >= 15 && reason < 4) ctx.addIssue({ code: "custom", path: ["quiz", "questions"], message: `Topic quizzes need at least 4 questions with depth "reason" (found ${reason})` });
      }
    }
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
