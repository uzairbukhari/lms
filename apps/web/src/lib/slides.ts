import type { CheckQuestion } from "@lms/schema";

// Turns a lesson's blocks into a deck of slides (one idea per slide) and works out what to read aloud for each.
// Pure functions, no browser APIs, so they are easy to test.

export type Block =
  | { type: "heading"; text: string }
  | { type: "text"; markdown: string }
  | { type: "image"; emoji?: string; asset?: string; alt?: string; caption?: string }
  | { type: "callout"; style: "tip" | "fun_fact" | "warning"; markdown: string }
  | { type: "reveal"; prompt: string; answer_markdown: string }
  | { type: "check"; question: CheckQuestion }
  | { type: "steps"; items: string[] }
  | { type: "vocab"; word: string; meaning: string; example?: string }
  | { type: "activity"; title: string; materials?: string[]; instructions: string[] }
  | { type: "summary"; points: string[] }
  | { type: "html_embed"; title: string; html: string };

export type LessonMeta = { title: string; summary: string; minutes: number; objectives: string[] };

export type SlideKind = "title" | "content" | "check" | "reveal" | "activity" | "summary" | "embed" | "finish";

export type Slide = {
  kind: SlideKind;
  title: string;
  /** Small label above the title, for example the section a question belongs to. */
  eyebrow?: string;
  blocks: Block[];
  /** Plain text read aloud for this slide. */
  narration: string;
};

const EMOJI = /[\p{Extended_Pictographic}‍️]/gu;

/** Markdown to plain speakable text: no asterisks, backticks or emoji. */
export function plain(md: string): string {
  return md
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(EMOJI, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Split text into sentences, keeping decimals like 1.5 together. Lists are split by line first. */
export function splitSentences(md: string): string[] {
  const out: string[] = [];
  for (const para of md.trim().split(/\n+/)) {
    const line = para.trim();
    if (!line) continue;
    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line)) {
      out.push(line.replace(/^\s*(?:[-*]|\d+[.)])\s+/, ""));
      continue;
    }
    for (const m of line.matchAll(/\S[\s\S]*?(?:[.!?]+(?=\s|$)|$)/g)) {
      const s = m[0].trim();
      if (s) out.push(s);
    }
  }
  return out;
}

const CALLOUT_LABEL = { tip: "Tip.", fun_fact: "Fun fact.", warning: "Careful." } as const;

function optionTexts(q: CheckQuestion): string[] {
  const any = q as unknown as { options?: { text: string }[]; items?: { text: string }[] };
  return (any.options ?? any.items ?? []).map((o) => o.text);
}

/** What to read aloud for one block. */
export function blockNarration(b: Block): string {
  switch (b.type) {
    case "heading":
      return plain(b.text);
    case "text":
      return plain(b.markdown);
    case "image":
      return b.caption ? plain(b.caption) : "";
    case "callout":
      return `${CALLOUT_LABEL[b.style]} ${plain(b.markdown)}`;
    case "reveal":
      return plain(b.prompt);
    case "check": {
      const opts = optionTexts(b.question);
      const base = plain(b.question.prompt);
      return opts.length && b.question.type !== "order" ? `${base} The choices are: ${opts.map(plain).join(", or ")}.` : base;
    }
    case "steps":
      return b.items.map((s, i) => `Step ${i + 1}. ${plain(s)}`).join(" ");
    case "vocab":
      return `${plain(b.word)}. ${plain(b.meaning)}${b.example ? ` For example: ${plain(b.example)}` : ""}`;
    case "activity":
      return `Let's try it! ${plain(b.title)}. ${b.materials?.length ? `You need: ${b.materials.map(plain).join(", ")}. ` : ""}${b.instructions.map((s, i) => `Step ${i + 1}. ${plain(s)}`).join(" ")}`;
    case "summary":
      return `Remember! ${b.points.map(plain).join(" ")}`;
    case "html_embed":
      return plain(b.title);
  }
}

const INTERACTIVE = new Set(["check", "reveal", "activity", "summary", "html_embed"]);
/** A content slide holds at most this many blocks (pictures do not count), so slides stay light. */
const MAX_CONTENT_BLOCKS = 3;

const sayAll = (title: string, blocks: Block[]) => [plain(title), ...blocks.map(blockNarration)].filter(Boolean).join(" ");

export function buildSlides(meta: LessonMeta, blocks: Block[]): Slide[] {
  const slides: Slide[] = [];
  slides.push({
    kind: "title",
    title: meta.title,
    blocks: [],
    narration: `${plain(meta.title)}. ${plain(meta.summary)} Today you will: ${meta.objectives.map(plain).join(". ")}.`,
  });

  let heading = "";
  let pending: Block[] = [];
  let afterSummary = false;
  const finishNotes: Block[] = [];

  const flush = () => {
    if (pending.length === 0) return;
    if (afterSummary) {
      finishNotes.push(...pending);
    } else {
      slides.push({ kind: "content", title: heading, blocks: pending, narration: sayAll(heading, pending) });
    }
    pending = [];
  };

  for (const b of blocks) {
    if (b.type === "heading") {
      flush();
      heading = b.text;
      continue;
    }
    if (INTERACTIVE.has(b.type)) {
      flush();
      const kind: SlideKind = b.type === "check" ? "check" : b.type === "reveal" ? "reveal" : b.type === "activity" ? "activity" : b.type === "summary" ? "summary" : "embed";
      const title = b.type === "activity" ? `Try it: ${b.title}` : b.type === "html_embed" ? b.title : b.type === "check" ? "Check yourself" : b.type === "reveal" ? "Think about it" : "Remember";
      slides.push({ kind, title, eyebrow: heading || undefined, blocks: [b], narration: blockNarration(b) });
      if (b.type === "summary") afterSummary = true;
      continue;
    }
    if (pending.filter((p) => p.type !== "image").length >= MAX_CONTENT_BLOCKS) flush();
    pending.push(b);
  }
  flush();

  slides.push({
    kind: "finish",
    title: "All done! Great job!",
    blocks: finishNotes,
    narration: `All done! Great job! ${finishNotes.map(blockNarration).filter(Boolean).join(" ")}`.trim(),
  });
  return slides;
}
