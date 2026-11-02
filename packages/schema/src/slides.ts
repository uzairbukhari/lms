import type { CheckQuestion } from "./lesson";

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
  | { type: "manipulative"; title: string; goal?: string; emoji: string; count: number; zones: string[] }
  | { type: "chart"; kind: "pictogram" | "bar_chart" | "tally" | "table" | "number_line" | "fraction"; title: string; caption?: string; rows?: { label: string; value: number; emoji?: string }[]; each?: number; from?: number; to?: number; step?: number; marks?: number[]; parts?: number; shaded?: number }
  | { type: "explainer"; title: string; scenes: { caption: string; items: { id?: string; emoji: string; label?: string; x: number; y: number; size: number; anim: "none" | "bounce" | "float" | "spin" | "pulse" | "grow" }[] }[] }
  | { type: "brain_game"; game: "memory_match" | "remember_order"; title: string; goal?: string; emojis: string[] }
  | { type: "glossary"; terms: { term: string; meaning: string }[] }
  | { type: "summary"; points: string[] }
  | { type: "html_embed"; title: string; html: string };

export type LessonMeta = { title: string; summary: string; minutes: number; objectives: string[] };

export type SlideKind = "title" | "content" | "check" | "reveal" | "activity" | "summary" | "embed" | "play" | "explain" | "brain" | "finish";

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

/** A chart's numbers in words, for reading aloud and screen readers. */
export function chartReadout(b: Extract<Block, { type: "chart" }>): string {
  if (b.kind === "number_line") return `A number line from ${b.from} to ${b.to}.${b.marks?.length ? ` Marked: ${b.marks.join(", ")}.` : ""}`;
  if (b.kind === "fraction") return `${b.shaded} out of ${b.parts} equal parts are coloured.`;
  const each = b.kind === "pictogram" && (b.each ?? 1) > 1 ? ` Each picture stands for ${b.each}.` : "";
  return `${(b.rows ?? []).map((r) => `${plain(r.label)}: ${r.value}`).join(". ")}.${each}`;
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
    case "manipulative":
      return `Let's play! ${plain(b.title)}. ${b.goal ? plain(b.goal) : `Move the ${b.count} things into ${b.zones.map(plain).join(" and ")}.`}`;
    case "chart":
      return `${plain(b.title)}. ${chartReadout(b)}${b.caption ? ` ${plain(b.caption)}` : ""}`;
    case "explainer":
      return `Watch! ${plain(b.title)}. ${plain(b.scenes[0]?.caption ?? "")}`;
    case "brain_game":
      return `Brain game! ${plain(b.title)}. ${b.goal ? plain(b.goal) : b.game === "memory_match" ? "Find the matching pairs." : "Watch the order, then copy it."}`;
    case "glossary":
      return "";
  }
}

const INTERACTIVE = new Set(["check", "reveal", "activity", "summary", "html_embed", "manipulative", "explainer", "brain_game"]);
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
    if (b.type === "glossary") continue; // reference data for long-press word help, never a slide
    if (b.type === "heading") {
      flush();
      heading = b.text;
      continue;
    }
    if (INTERACTIVE.has(b.type)) {
      flush();
      const kind: SlideKind = b.type === "check" ? "check" : b.type === "reveal" ? "reveal" : b.type === "activity" ? "activity" : b.type === "summary" ? "summary" : b.type === "manipulative" ? "play" : b.type === "explainer" ? "explain" : b.type === "brain_game" ? "brain" : "embed";
      const title = b.type === "manipulative" || b.type === "explainer" || b.type === "brain_game" ? b.title : b.type === "activity" ? `Try it: ${b.title}` : b.type === "html_embed" ? b.title : b.type === "check" ? "Check yourself" : b.type === "reveal" ? "Think about it" : "Remember";
      slides.push({ kind, title, eyebrow: heading || undefined, blocks: [b], narration: blockNarration(b) });
      if (b.type === "summary") afterSummary = true;
      continue;
    }
    if (b.type === "chart" && pending.some((p) => p.type === "chart")) flush(); // one drawn picture per slide, so each is big enough to read
    if (pending.filter((p) => p.type !== "image" && p.type !== "chart").length >= MAX_CONTENT_BLOCKS) flush();
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
