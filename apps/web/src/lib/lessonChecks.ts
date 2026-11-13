export type Check = { level: "ok" | "warn"; text: string };

type Q = { type?: string; hint?: string; explanation?: string; depth?: string; variant_of?: string; ref?: string };

/** Plain-language checks shown beside the lesson editor, so gaps are visible before a child meets them. */
export function lessonChecks(file: Record<string, any>): Check[] {
  const out: Check[] = [];
  const all: Q[] = file.quiz?.questions ?? [];
  const mains = all.filter((q) => !q.variant_of);
  const parts: unknown[] = file.sub_lessons ?? [];
  const add = (ok: boolean, good: string, bad: string) => out.push({ level: ok ? "ok" : "warn", text: ok ? good : bad });

  add(mains.length >= 10, `${mains.length} quiz questions`, `Only ${mains.length} quiz questions (aim for 10 or more)`);
  const noHint = mains.filter((q) => !q.hint).length;
  add(noHint === 0, "Every question has a hint", `${noHint} question${noHint === 1 ? " has" : "s have"} no hint`);
  const noWhy = mains.filter((q) => !q.explanation).length;
  add(noWhy === 0, "Every question explains its answer", `${noWhy} question${noWhy === 1 ? " has" : "s have"} no explanation`);
  const reason = mains.filter((q) => q.depth === "reason").length;
  if (mains.some((q) => q.depth)) add(reason >= 2, `${reason} reasoning questions`, `Only ${reason} reasoning question${reason === 1 ? "" : "s"} (aim for 2 or more)`);
  const noVariant = mains.filter((q) => q.ref && !all.some((v) => v.variant_of === q.ref)).length;
  add(noVariant === 0, "Every question has a retake variant", `${noVariant} question${noVariant === 1 ? " has" : "s have"} no retake variant, so a retake repeats it`);
  if (parts.length) add(parts.length >= 3, `${parts.length} parts to explore`, `Only ${parts.length} part${parts.length === 1 ? "" : "s"}`);
  add(!!file.lesson?.success_criteria?.length, "Has “I can” success criteria", "No “I can” success criteria yet");
  return out;
}
