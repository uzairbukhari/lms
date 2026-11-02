import { blockNarration, plain, splitSentences, type Block } from "./slides";

// Word help for the lesson player: a child presses and holds a word to hear what it means.
// Meanings written into the lesson (glossary blocks and vocab blocks) always win; only other words need the AI.
// Pure functions shared by the web app and the Worker.

export type GlossaryEntry = { term: string; meaning: string; example?: string };

/** One word as typed in a lesson, tidied for matching: lower case, plain apostrophes, no edge punctuation. */
export function normaliseWord(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[‘’ʼ]/g, "'")
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
}

/** A single word worth looking up: letters (and inner hyphens or apostrophes), no digits, not tiny, not huge. */
export function isLookupWord(word: string): boolean {
  return /^\p{L}[\p{L}'-]{1,29}$/u.test(word);
}

/** The word itself plus simple singular forms, so "loops" finds "loop" and "batteries" finds "battery". */
export function wordVariants(word: string): string[] {
  const w = normaliseWord(word);
  const out = [w];
  if (w.endsWith("'s")) out.push(w.slice(0, -2));
  if (w.endsWith("ies") && w.length > 4) out.push(`${w.slice(0, -3)}y`);
  if (w.endsWith("es") && w.length > 3) out.push(w.slice(0, -2));
  if (w.endsWith("s") && w.length > 3) out.push(w.slice(0, -1));
  return [...new Set(out)];
}

/** Every meaning the lesson itself provides, keyed by the normalised term. Glossary entries beat vocab blocks. */
export function buildGlossary(blocks: Block[]): Map<string, GlossaryEntry> {
  const map = new Map<string, GlossaryEntry>();
  for (const b of blocks) {
    if (b.type === "vocab") {
      const key = normaliseWord(b.word);
      if (key && !map.has(key)) map.set(key, { term: plain(b.word), meaning: plain(b.meaning), example: b.example ? plain(b.example) : undefined });
    }
  }
  for (const b of blocks) {
    if (b.type === "glossary") for (const t of b.terms) { const key = normaliseWord(t.term); if (key) map.set(key, { term: plain(t.term), meaning: plain(t.meaning) }); }
  }
  return map;
}

/** Look a word up in the lesson's own glossary, trying simple singular forms. */
export function findInGlossary(glossary: Map<string, GlossaryEntry>, word: string): GlossaryEntry | undefined {
  for (const v of wordVariants(word)) { const hit = glossary.get(v); if (hit) return hit; }
  return undefined;
}

/** Everything a child can read in the lesson, as plain sentences. Used to check a looked-up word really is in the lesson. */
export function lessonSentences(blocks: Block[]): string[] {
  const out: string[] = [];
  const headings: string[] = [];
  for (const b of blocks) {
    if (b.type === "glossary") continue;
    if (b.type === "heading") { headings.push(plain(b.text)); continue; }
    const text = b.type === "text" || b.type === "callout" ? b.markdown : blockNarration(b);
    for (const s of splitSentences(text)) { const p = plain(s); if (p) out.push(p); }
  }
  // Headings come last: a sentence gives a word far better context.
  return [...out, ...headings];
}

/** The first lesson sentence that contains the word (any simple form of it), or null when the lesson never uses it. */
export function sentenceWith(blocks: Block[], word: string): string | null {
  const forms = new Set(wordVariants(word));
  for (const s of lessonSentences(blocks)) {
    const words = s.split(/\s+/).map(normaliseWord);
    if (words.some((w) => forms.has(w) || wordVariants(w).some((v) => forms.has(v)))) return s;
  }
  return null;
}
