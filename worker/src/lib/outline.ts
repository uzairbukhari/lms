/** A plain-English outline of a lesson for the parent: what is taught, stop by stop, and a transcript to search videos by. */

type Block = Record<string, any>;
export type Outline = {
  objectives: string[];
  sections: { heading: string; points: string[]; terms: string[]; activities: string[] }[];
  glossary: { term: string; meaning: string }[];
  summary: string[];
  /** Everything a child reads or is told, as plain text. */
  transcript: string;
};

/** Markdown to plain text, and the **bold** words found in it. */
export function plainText(md: string): string {
  return md.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/[*_`>#]/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/\s+\n/g, "\n").trim();
}
const bolds = (md: string) => [...md.matchAll(/\*\*([^*]+)\*\*/g)].map((m) => (m[1] ?? "").trim()).filter(Boolean);
const uniq = <T,>(a: T[]) => [...new Set(a)];

const ACTIVITY: Record<string, string> = { explainer: "Animation", brain_game: "Brain game", manipulative: "Hands-on", activity: "Try it at home", video: "Video", check: "Quick question" };

export function lessonOutline(file: { lesson?: { learning_objectives?: string[] }; blocks?: Block[] }): Outline {
  const blocks = file.blocks ?? [];
  const sections: Outline["sections"] = [];
  let cur: Outline["sections"][number] = { heading: "Introduction", points: [], terms: [], activities: [] };
  const lines: string[] = [];
  let glossary: Outline["glossary"] = [];
  let summary: string[] = [];
  const flush = () => { if (cur.points.length || cur.terms.length || cur.activities.length || sections.length === 0) sections.push(cur); };

  for (const b of blocks) {
    switch (b.type) {
      case "heading":
        if (cur.points.length || cur.terms.length || cur.activities.length) flush();
        cur = { heading: String(b.text), points: [], terms: [], activities: [] };
        lines.push(`\n${b.text}`);
        break;
      case "text": {
        const t = plainText(String(b.markdown ?? ""));
        const first = t.split(/(?<=[.!?])\s+/)[0] ?? t;
        if (first) cur.points.push(first);
        cur.terms.push(...bolds(String(b.markdown ?? "")));
        lines.push(t);
        break;
      }
      case "callout": lines.push(plainText(String(b.markdown ?? ""))); break;
      case "image": if (b.caption || b.alt) lines.push(`[Picture] ${b.caption ?? b.alt}`); break;
      case "explainer":
        cur.activities.push(`${ACTIVITY.explainer}: ${b.title}`);
        lines.push(`[Animation: ${b.title}] ${(b.scenes ?? []).map((s: any) => s.caption).join(" ")}`);
        break;
      case "brain_game": cur.activities.push(`${ACTIVITY.brain_game}: ${b.title}`); lines.push(`[Brain game: ${b.title}] ${b.goal ?? ""}`); break;
      case "manipulative": cur.activities.push(`${ACTIVITY.manipulative}: ${b.title}`); lines.push(`[Hands-on: ${b.title}] ${b.goal ?? ""}`); break;
      case "activity": cur.activities.push(`${ACTIVITY.activity}: ${b.title}`); lines.push(`[Activity: ${b.title}] ${(b.instructions ?? []).join(" ")}`); break;
      case "video": cur.activities.push(`${ACTIVITY.video}: ${b.title}`); break;
      case "check": if (b.question?.prompt) { cur.activities.push(`${ACTIVITY.check}: ${b.question.prompt}`); lines.push(`[Question] ${b.question.prompt}`); } break;
      case "reveal": lines.push(`[Think] ${b.prompt} ${plainText(String(b.answer_markdown ?? ""))}`); break;
      case "steps": lines.push((b.items ?? []).map((s: string, i: number) => `${i + 1}. ${s}`).join("\n")); break;
      case "vocab": lines.push(`${b.word}: ${b.meaning}`); cur.terms.push(String(b.word)); break;
      case "glossary": glossary = (b.terms ?? []).map((t: any) => ({ term: String(t.term), meaning: String(t.meaning) })); break;
      case "summary": summary = (b.points ?? []).map(String); lines.push(`Summary: ${summary.join(" ")}`); break;
    }
  }
  flush();
  for (const s of sections) s.terms = uniq(s.terms);
  return { objectives: file.lesson?.learning_objectives ?? [], sections: sections.filter((s) => s.points.length || s.terms.length || s.activities.length), glossary, summary, transcript: lines.join("\n").trim() };
}
