// Finds the word under a finger or pointer, so a long press can explain it. Works on any rendered text (no markup changes
// needed) using the browser's caret-from-point APIs: caretPositionFromPoint (Firefox, newer Chrome) or caretRangeFromPoint (Safari, Chrome).

export type PressedWord = { word: string; rect: { left: number; top: number; width: number; height: number } };

/** Pressing these should do their own job, not explain a word. */
const SKIP = "button, a, input, textarea, select, label, iframe, [data-no-define]";
const WORD_CHAR = /[\p{L}\p{N}'’-]/u;

type Doc = Document & {
  caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
  caretRangeFromPoint?: (x: number, y: number) => Range | null;
};

function caretAt(x: number, y: number): { node: Node; offset: number } | null {
  const d = document as Doc;
  if (d.caretPositionFromPoint) {
    const p = d.caretPositionFromPoint(x, y);
    return p ? { node: p.offsetNode, offset: p.offset } : null;
  }
  if (d.caretRangeFromPoint) {
    const r = d.caretRangeFromPoint(x, y);
    return r ? { node: r.startContainer, offset: r.startOffset } : null;
  }
  return null;
}

/** True when the element is something a long press should leave alone. */
export function isControl(el: Element | null): boolean {
  const hit = el?.closest(SKIP);
  // Sentence cards are buttons (tap to hear), but they are text first: allow words inside those.
  return !!hit && !hit.hasAttribute("data-words");
}

/** The word at a screen point inside `root`, or null when the point is not on a word. */
export function wordAtPoint(root: HTMLElement, x: number, y: number): PressedWord | null {
  const at = caretAt(x, y);
  if (!at || at.node.nodeType !== Node.TEXT_NODE || !root.contains(at.node)) return null;
  const text = at.node.textContent ?? "";
  let start = Math.min(at.offset, text.length);
  let end = start;
  while (start > 0 && WORD_CHAR.test(text[start - 1] as string)) start--;
  while (end < text.length && WORD_CHAR.test(text[end] as string)) end++;
  // Trim hyphens and apostrophes that are really punctuation at the edges.
  while (start < end && /['’-]/.test(text[start] as string)) start++;
  while (end > start && /['’-]/.test(text[end - 1] as string)) end--;
  if (end <= start) return null;
  const range = document.createRange();
  range.setStart(at.node, start);
  range.setEnd(at.node, end);
  const r = range.getBoundingClientRect();
  // The caret snaps to the nearest text, so make sure the press really landed on the word (with a little finger room).
  const pad = 10;
  if (x < r.left - pad || x > r.right + pad || y < r.top - pad || y > r.bottom + pad) return null;
  return { word: text.slice(start, end), rect: { left: r.left, top: r.top, width: r.width, height: r.height } };
}
