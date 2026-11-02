import type { Block } from "./slides";

// "Show it before you name it": every stop of a lesson (the part under one heading) should have something to look at.
// Used by tests on the committed lessons and available to the importer.

const VISUAL = new Set(["image", "chart", "explainer", "manipulative", "video", "brain_game", "html_embed"]);

/** Headings whose section holds only words: no picture, chart, animation, video or movable things. */
export function sectionsWithoutVisual(blocks: Block[]): string[] {
  const missing: string[] = [];
  let heading: string | null = null;
  let seen = false;
  const close = () => { if (heading !== null && !seen) missing.push(heading); };
  for (const b of blocks) {
    if (b.type === "heading") { close(); heading = b.text; seen = false; continue; }
    if (b.type === "summary") { close(); heading = null; continue; }
    if (VISUAL.has(b.type)) seen = true;
  }
  close();
  return missing;
}
