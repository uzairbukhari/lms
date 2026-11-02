import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PressedWord } from "../lib/wordHelp";

export type BubbleState =
  | { status: "loading" }
  | { status: "ready"; meaning: string; example?: string; source: "lesson" | "ai" | "static" | "preview" };

const WIDTH = 352;
const GAP = 10;
const MARGIN = 12;

/** The bubble that explains a word a child pressed and held. Fixed to the screen (not the slide, which is scaled), pointing at the word. */
export function WordBubble({ pressed, state, canSpeak, onSpeak, onClose }: {
  pressed: PressedWord; state: BubbleState; canSpeak: boolean; onSpeak: () => void; onClose: () => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number; above: boolean; arrow: number } | null>(null);

  // Place it above the word when there is room, otherwise below, and keep it fully on screen.
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const w = Math.min(WIDTH, window.innerWidth - MARGIN * 2);
    const h = el.offsetHeight;
    const r = pressed.rect;
    const centre = r.left + r.width / 2;
    const left = Math.max(MARGIN, Math.min(window.innerWidth - w - MARGIN, centre - w / 2));
    const above = r.top - h - GAP >= MARGIN || r.top + r.height + h + GAP > window.innerHeight - MARGIN;
    const top = above ? Math.max(MARGIN, r.top - h - GAP) : r.top + r.height + GAP;
    setPos({ left, top, above, arrow: Math.max(18, Math.min(w - 18, centre - left)) });
  }, [pressed, state]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const r = pressed.rect;
  return (
    <>
      {/* Tapping anywhere else closes the bubble, and does nothing else underneath it. */}
      <div className="fixed inset-0 z-40" onPointerDown={(e) => { e.preventDefault(); onClose(); }} aria-hidden="true" />
      <div className="pointer-events-none fixed z-40 rounded-md bg-accent/30 ring-2 ring-accent" style={{ left: r.left - 3, top: r.top - 1, width: r.width + 6, height: r.height + 2 }} aria-hidden="true" />
      <div
        ref={box}
        role="dialog"
        aria-label={`What does ${pressed.word} mean?`}
        className="pop-in card fixed z-50 flex flex-col gap-2 p-4 text-left shadow-xl"
        style={{ width: Math.min(WIDTH, window.innerWidth - MARGIN * 2), left: pos?.left ?? 0, top: pos?.top ?? 0, visibility: pos ? "visible" : "hidden" }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {pos && <span aria-hidden="true" className="absolute size-4 rotate-45 border-line bg-surface" style={pos.above ? { left: pos.arrow - 8, bottom: -9, borderRight: "2px solid", borderBottom: "2px solid" } : { left: pos.arrow - 8, top: -9, borderLeft: "2px solid", borderTop: "2px solid" }} />}
        <div className="flex items-center gap-2">
          <p className="flex-1 font-display text-2xl font-bold">📚 {pressed.word}</p>
          {canSpeak && state.status === "ready" && <button type="button" data-no-define className="btn !min-h-12 !min-w-12 !px-3" onClick={onSpeak} aria-label="Read this aloud">🔊</button>}
          <button type="button" data-no-define className="btn !min-h-12 !min-w-12 !px-3" onClick={onClose} aria-label="Close">✕</button>
        </div>
        {state.status === "loading" ? (
          <p role="status" className="text-xl text-muted">🤔 Thinking…</p>
        ) : (
          <>
            <p role="status" className="text-xl leading-snug">{state.meaning}</p>
            {state.example && <p className="text-lg text-muted">Example: {state.example}</p>}
            {state.source === "ai" && <p className="text-sm text-muted">🤖 Explained by your learning helper</p>}
          </>
        )}
      </div>
    </>
  );
}
