import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { sfx } from "../lib/sound";

type Props = { emoji: string; count: number; zones: string[] };
const PILE = -1;

/**
 * A play area: a pile of movable things and up to four labelled places to put them. Drag with a finger or mouse, or tap a
 * thing and then tap where it should go. Nothing is graded or saved: it is for trying an idea out without real objects.
 */
export function Manipulative({ emoji, count, zones }: Props) {
  const fresh = () => Array.from({ length: count }, () => PILE);
  const [where, setWhere] = useState<number[]>(fresh);
  const [picked, setPicked] = useState<number | null>(null);
  const [drag, setDrag] = useState<{ i: number; x: number; y: number } | null>(null);
  const gesture = useRef<{ i: number; id: number; x: number; y: number; moved: boolean } | null>(null);

  const place = (i: number, zone: number) => { sfx("tap"); setWhere((w) => w.map((z, k) => (k === i ? zone : z))); setPicked(null); };
  const zoneAt = (x: number, y: number): number | null => {
    const el = document.elementFromPoint(x, y)?.closest("[data-zone]");
    return el ? Number(el.getAttribute("data-zone")) : null;
  };

  const onDown = (e: React.PointerEvent, i: number) => {
    gesture.current = { i, id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const g = gesture.current;
    if (!g || g.id !== e.pointerId) return;
    if (!g.moved && Math.hypot(e.clientX - g.x, e.clientY - g.y) > 8) g.moved = true;
    if (g.moved) setDrag({ i: g.i, x: e.clientX, y: e.clientY });
  };
  const onUp = (e: React.PointerEvent) => {
    const g = gesture.current;
    gesture.current = null;
    if (!g || g.id !== e.pointerId) return;
    setDrag(null);
    if (g.moved) { const z = zoneAt(e.clientX, e.clientY); if (z !== null) place(g.i, z); return; }
    sfx("tap");
    setPicked((p) => (p === g.i ? null : g.i)); // a tap picks the thing up, a second tap puts it back down
  };

  const members = (zone: number) => where.flatMap((z, i) => (z === zone ? [i] : []));
  const token = (i: number) => (
    <button
      key={i}
      type="button"
      aria-pressed={picked === i}
      aria-label={`Thing ${i + 1}${picked === i ? ", picked up" : ""}`}
      className={`grid size-16 touch-none select-none place-items-center rounded-2xl text-4xl transition-transform ${picked === i ? "scale-110 ring-4 ring-accent" : ""} ${drag?.i === i ? "opacity-30" : ""}`}
      onPointerDown={(e) => onDown(e, i)} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={() => { gesture.current = null; setDrag(null); }}
      onContextMenu={(e) => e.preventDefault()}
    >{emoji}</button>
  );
  const area = (zone: number, label: string) => {
    const ids = members(zone);
    return (
      <div key={zone} data-zone={zone} role="group" aria-label={`${label}: ${ids.length}`}
        className={`card flex min-h-32 flex-col gap-2 p-3 ${picked !== null ? "cursor-pointer ring-2 ring-accent/60" : ""}`}
        onClick={() => { if (picked !== null && where[picked] !== zone) place(picked, zone); }}>
        <div className="flex items-center justify-between gap-2"><span className="font-bold">{label}</span><span className="rounded-full bg-accent px-3 text-on-accent font-bold">{ids.length}</span></div>
        <div className="flex flex-wrap gap-1">{ids.map(token)}</div>
      </div>
    );
  };

  const counts = zones.map((_, z) => members(z).length);
  const left = members(PILE).length;
  return (
    // Swiping to move things must not also swipe to the next slide.
    <div className="flex flex-col gap-4" onTouchStart={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()}>
      {area(PILE, "Pile")}
      <div className={`grid gap-3 ${zones.length > 1 ? "sm:grid-cols-2" : ""}`}>{zones.map((label, z) => area(z, label))}</div>
      <div className="flex flex-wrap items-center gap-3">
        <p role="status" aria-live="polite" className="pop-in card flex-1 px-4 py-2 text-center font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold">
          {counts.join(" + ")} = {counts.reduce((a, b) => a + b, 0)}{left > 0 ? ` (${left} still in the pile)` : ""}
        </p>
        <button type="button" className="btn !min-h-14 !px-5 text-xl" onClick={() => { sfx("tap"); setWhere(fresh()); setPicked(null); }}>↺ Start again</button>
      </div>
      {drag && createPortal(<span aria-hidden="true" className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 text-5xl drop-shadow-lg" style={{ left: drag.x, top: drag.y }}>{emoji}</span>, document.body)}
    </div>
  );
}
