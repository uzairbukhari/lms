// Quick edit (admin): find the plain wording inside a lesson file so a typo, hint or answer can be fixed in the browser.
// Only text is offered, never structure, so an edited file stays valid. The file is saved through the normal import.

export type Path = (string | number)[];
export type Field = { path: Path; label: string; value: string; group: "lesson" | "slides" | "quiz"; multiline: boolean };

const TEXT_KEYS = new Set(["text", "markdown", "answer_markdown", "caption", "prompt", "meaning", "example", "word", "term", "title", "alt", "hint", "explanation", "label", "narration"]);
const LIST_KEYS = new Set(["items", "points"]);
const KEY_NAMES: Record<string, string> = {
  text: "Text", markdown: "Text", answer_markdown: "Answer", caption: "Caption", prompt: "Question", meaning: "Meaning", example: "Example", word: "Word",
  term: "Word", title: "Title", alt: "Picture description", hint: "Hint", explanation: "Explanation", label: "Label", narration: "Narration", items: "Item", points: "Point",
};

type Json = null | string | number | boolean | Json[] | { [k: string]: Json };

export function editableFields(file: unknown): Field[] {
  const out: Field[] = [];
  const f = file as { lesson?: { title?: string; summary?: string }; blocks?: Json[]; quiz?: { questions?: Json[] } };
  if (typeof f.lesson?.title === "string") out.push({ path: ["lesson", "title"], label: "Lesson title", value: f.lesson.title, group: "lesson", multiline: false });
  if (typeof f.lesson?.summary === "string") out.push({ path: ["lesson", "summary"], label: "Lesson summary", value: f.lesson.summary, group: "lesson", multiline: true });

  const walk = (node: Json, path: Path, group: Field["group"], where: string) => {
    if (Array.isArray(node)) {
      node.forEach((v, i) => walk(v, [...path, i], group, where));
      return;
    }
    if (node === null || typeof node !== "object") return;
    for (const [key, v] of Object.entries(node)) {
      const here = [...path, key];
      if (typeof v === "string" && TEXT_KEYS.has(key) && v.trim() !== "") {
        out.push({ path: here, label: `${where} · ${KEY_NAMES[key] ?? key}${suffix(path)}`, value: v, group, multiline: v.length > 70 || key === "markdown" });
      } else if (Array.isArray(v) && LIST_KEYS.has(key)) {
        v.forEach((s, i) => { if (typeof s === "string" && s.trim() !== "") out.push({ path: [...here, i], label: `${where} · ${KEY_NAMES[key]} ${i + 1}`, value: s, group, multiline: s.length > 70 }); });
      } else if (v !== null && typeof v === "object") {
        walk(v, here, group, where);
      }
    }
  };
  (f.blocks ?? []).forEach((b, i) => walk(b, ["blocks", i], "slides", `Slide ${i + 1} (${String((b as { type?: string }).type ?? "")})`));
  (f.quiz?.questions ?? []).forEach((q, i) => walk(q, ["quiz", "questions", i], "quiz", `Question ${i + 1}`));
  return out;
}

/** "options" entries are shown as "Choice 2" so several texts in one question stay apart. */
function suffix(path: Path): string {
  const n = path.length;
  const last = path[n - 1];
  const parent = path[n - 2];
  return typeof last === "number" && (parent === "options" || parent === "left" || parent === "right") ? ` (choice ${last + 1})` : "";
}

/** A copy of the file with one value changed. */
export function setAt<T>(file: T, path: Path, value: unknown): T {
  const copy = structuredClone(file) as Record<string | number, unknown>;
  let node: Record<string | number, unknown> = copy;
  for (const key of path.slice(0, -1)) node = node[key] as Record<string | number, unknown>;
  node[path[path.length - 1] as string | number] = value;
  return copy as T;
}

export function getAt(file: unknown, path: Path): unknown {
  return path.reduce<unknown>((n, k) => (n === null || n === undefined ? undefined : (n as Record<string | number, unknown>)[k]), file);
}
