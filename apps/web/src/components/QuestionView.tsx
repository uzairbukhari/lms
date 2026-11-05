import type { Response } from "@lms/schema";
import { useRef, useState, type ReactNode } from "react";
import { sfx } from "../lib/sound";
import { Markdown } from "./Markdown";

type Opt = { id: string; text: string };

/** A question as the player and quiz receive it (answers are present only for lesson check blocks). */
export type ViewQuestion = {
  type: "multiple_choice" | "multi_select" | "true_false" | "number" | "short_text" | "order" | "match" | "fill_blank" | "hotspot" | "slider";
  prompt: string;
  emoji?: string;
  options?: Opt[];
  items?: Opt[];
  left?: Opt[];
  right?: Opt[];
  text?: string;
  blanks?: { id: string; options: Opt[] }[];
  scene?: { items: { id: string; emoji: string; label: string; x: number; y: number; size: number }[]; show_labels?: boolean };
  range?: { min: number; max: number; step: number; unit?: string };
};

type Props = {
  q: ViewQuestion;
  value: Response;
  onChange: (v: Response) => void;
  disabled?: boolean;
};

// Right and wrong are shown with words and icons by the caller, never by colour alone.
const choice = (on: boolean) =>
  "answer-tile flex min-h-20 w-full cursor-pointer items-center gap-4 rounded-3xl border-[3px] px-5 py-4 text-left text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold " +
  (on ? "answer-on" : "bg-surface");

/** Each answer tile has its own friendly colour (with a letter and a tick as well, so colour is never the only clue). */
const TILE = ["#3b82f6", "#f59e0b", "#10b981", "#ec4899", "#8b5cf6", "#ef4444"];
const tileStyle = (i: number) => ({ ["--tile" as string]: TILE[i % TILE.length] });

/** Each matched pair gets its own colour and number, so pairs are never told apart by colour alone. */
const PAIR_COLOURS = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

const HELP: Record<ViewQuestion["type"], string | null> = {
  multiple_choice: "Pick one answer.",
  multi_select: "Pick all the right answers.",
  true_false: null,
  number: null,
  short_text: null,
  order: "Drag the grip ⠿ up or down, or use the arrows, to put these in the right order.",
  match: "Drag each one onto its partner, or tap one and then tap its partner.",
  fill_blank: "Tap each gap and choose the word that fits.",
  hotspot: "Tap the right picture.",
  slider: "Slide the dot, or tap the + and − buttons.",
};

export function QuestionView({ q, value, onChange, disabled }: Props) {
  const name = `q-${q.prompt.length}-${q.type}`;
  const pick = (v: Response) => { sfx("tap"); onChange(v); };
  return (
    <fieldset className="flex flex-col gap-3" disabled={disabled}>
      <legend className="mb-3 text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-snug">
        {q.emoji ? <span aria-hidden="true">{q.emoji} </span> : null}
        <Markdown text={q.prompt} />
      </legend>
      {HELP[q.type] && <p className="-mt-1 text-base font-bold text-muted">{HELP[q.type]}</p>}

      {(q.type === "multiple_choice" || q.type === "multi_select") && (
        <div className={`grid gap-4 ${(q.options ?? []).every((o) => o.text.length < 18) ? ((q.options?.length ?? 0) === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2") : ""}`}>
        {q.options?.map((o, i) => {
          const picked = Array.isArray(value) ? value : [];
          const on = picked.includes(o.id);
          const single = q.type === "multiple_choice";
          const short = (q.options ?? []).every((x) => x.text.length < 18);
          return (
            <label key={o.id} className={choice(on) + (short ? " answer-tall" : "")} style={tileStyle(i)}>
              <input
                type={single ? "radio" : "checkbox"}
                name={name}
                className="sr-only"
                checked={on}
                onChange={() => pick(single ? [o.id] : on ? picked.filter((x) => x !== o.id) : [...picked, o.id])}
              />
              <span aria-hidden="true" className={`tile-badge grid size-12 shrink-0 place-items-center text-2xl font-extrabold text-white ${single ? "rounded-full" : "rounded-xl"}`}>
                {on ? "✓" : String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{o.text}</span>
            </label>
          );
        })}
        </div>
      )}

      {q.type === "true_false" && (
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="True or false">
          {[true, false].map((b) => (
            <label key={String(b)} className={choice(value === b) + " min-h-28 justify-center !text-3xl"} style={tileStyle(b ? 2 : 5)}>
              <input type="radio" name={name} className="sr-only" checked={value === b} onChange={() => pick(b)} />
              {b ? "✅ True" : "❌ False"}
            </label>
          ))}
        </div>
      )}

      {q.type === "number" && (
        <input
          className="input max-w-xs text-2xl"
          inputMode="decimal"
          aria-label="Your answer"
          placeholder="Type a number"
          value={typeof value === "string" || typeof value === "number" ? String(value) : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {q.type === "short_text" && (
        <input
          className="input max-w-md text-xl"
          aria-label="Your answer"
          placeholder="Type your answer"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {q.type === "order" && <OrderInput items={q.items ?? []} value={Array.isArray(value) ? value : null} onChange={onChange} />}
      {q.type === "match" && <MatchInput left={q.left ?? []} right={q.right ?? []} value={asRecord(value)} onChange={onChange} />}
      {q.type === "fill_blank" && <FillBlankInput text={q.text ?? ""} blanks={q.blanks ?? []} value={asRecord(value)} onChange={onChange} />}
      {q.type === "hotspot" && q.scene && <HotspotInput scene={q.scene} value={Array.isArray(value) ? value : []} onChange={onChange} />}
      {q.type === "slider" && q.range && <SliderInput range={q.range} value={typeof value === "number" ? value : value === undefined || value === null || value === "" ? null : Number(value)} onChange={onChange} />}
    </fieldset>
  );
}

const asRecord = (v: Response): Record<string, string> => (v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, string>) : {});

// --- Dragging ------------------------------------------------------------------------------------------------
// A small pointer-based drag that works the same with a finger, a pen and a mouse (the browser's built-in drag and drop does not work on touch screens).

type Drag = { id: string; label: string; x: number; y: number };

function useDrag(onDrop: (id: string, target: string | null) => void, onMove?: (id: string, target: string | null) => void) {
  const [drag, setDrag] = useState<Drag | null>(null);
  const live = useRef<Drag | null>(null);
  const targetAt = (x: number, y: number) => (document.elementFromPoint(x, y)?.closest("[data-drop]") as HTMLElement | null)?.dataset.drop ?? null;
  const start = (e: React.PointerEvent, id: string, label: string) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.preventDefault();
    const d = { id, label, x: e.clientX, y: e.clientY };
    live.current = d;
    setDrag(d);
    sfx("tap");
    const move = (m: PointerEvent) => {
      const n = { id, label, x: m.clientX, y: m.clientY };
      live.current = n;
      setDrag(n);
      onMove?.(id, targetAt(m.clientX, m.clientY));
    };
    const end = (u: PointerEvent) => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      live.current = null;
      setDrag(null);
      onDrop(id, u.type === "pointercancel" ? null : targetAt(u.clientX, u.clientY));
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  };
  const ghost: ReactNode = drag ? (
    <div aria-hidden="true" className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-accent bg-surface px-4 py-2 text-lg font-bold shadow-xl" style={{ left: drag.x, top: drag.y }}>
      {drag.label}
    </div>
  ) : null;
  return { start, dragging: drag?.id ?? null, ghost };
}

/** Reordering: drag the grip, or use the arrows (touch, mouse and keyboard all work). */
function OrderInput({ items, value, onChange }: { items: Opt[]; value: string[] | null; onChange: (v: string[]) => void }) {
  const order = value && value.length === items.length ? value : items.map((i) => i.id);
  const byId = new Map(items.map((i) => [i.id, i.text]));
  const [over, setOver] = useState<string | null>(null);
  const move = (from: number, to: number) => {
    if (to < 0 || to >= order.length || from === to) return;
    const next = [...order];
    const [x] = next.splice(from, 1);
    next.splice(to, 0, x as string);
    sfx("tap");
    onChange(next);
  };
  const { start, dragging, ghost } = useDrag(
    (id, target) => { setOver(null); if (target) move(order.indexOf(id), order.indexOf(target)); },
    (_id, target) => setOver(target),
  );
  return (
    <>
      <ol className="flex flex-col gap-2">
        {order.map((id, i) => (
          <li key={id} data-drop={id}
            className={`flex items-center gap-2 rounded-2xl border-2 bg-surface px-3 py-2 text-lg font-semibold transition ${dragging === id ? "opacity-40" : ""} ${over === id && dragging !== id ? "border-accent bg-accent/10" : "border-line"}`}>
            <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/15 font-bold">{i + 1}</span>
            <span className="flex-1">{byId.get(id)}</span>
            <button type="button" className="btn !min-h-11 !min-w-11 cursor-grab touch-none !px-3" aria-label={`Drag ${byId.get(id)}`} onPointerDown={(e) => start(e, id, byId.get(id) ?? "")}>⠿</button>
            <button type="button" className="btn !min-h-11 !px-3" aria-label={`Move ${byId.get(id)} up`} disabled={i === 0} onClick={() => move(i, i - 1)}>↑</button>
            <button type="button" className="btn !min-h-11 !px-3" aria-label={`Move ${byId.get(id)} down`} disabled={i === order.length - 1} onClick={() => move(i, i + 1)}>↓</button>
          </li>
        ))}
      </ol>
      {ghost}
    </>
  );
}

/** Matching: drag a left card onto its partner, or tap one then tap its partner. Each pair gets a number and colour. */
function MatchInput({ left, right, value, onChange }: { left: Opt[]; right: Opt[]; value: Record<string, string>; onChange: (v: Record<string, string>) => void }) {
  const [held, setHeld] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const pairNo = (l: string) => left.findIndex((x) => x.id === l);
  const leftFor = (r: string) => Object.entries(value).find(([, v]) => v === r)?.[0];
  const link = (l: string, r: string) => {
    const next = { ...value };
    for (const k of Object.keys(next)) if (next[k] === r) delete next[k];
    next[l] = r;
    sfx("correct");
    setHeld(null);
    onChange(next);
  };
  const unlink = (l: string) => { const next = { ...value }; delete next[l]; sfx("tap"); onChange(next); };
  const { start, dragging, ghost } = useDrag(
    (id, target) => { setOver(null); if (target) link(id, target); },
    (_id, target) => setOver(target),
  );
  return (
    <>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        <ul className="flex flex-col gap-2" aria-label="Things to match">
          {left.map((l, i) => {
            const done = value[l.id] !== undefined;
            const colour = PAIR_COLOURS[i % PAIR_COLOURS.length];
            return (
              <li key={l.id}>
                <button type="button" aria-pressed={held === l.id}
                  className={`flex min-h-14 w-full touch-none items-center gap-2 rounded-2xl border-2 px-3 py-2 text-left text-lg font-semibold transition ${dragging === l.id ? "opacity-40" : ""} ${held === l.id ? "border-accent bg-accent/15 shadow-md" : "border-line bg-surface"}`}
                  style={done ? { borderColor: colour } : undefined}
                  onPointerDown={(e) => start(e, l.id, l.text)}
                  onClick={() => { sfx("tap"); setHeld(held === l.id ? null : l.id); }}>
                  <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full text-sm font-bold text-white" style={{ background: colour }}>{i + 1}</span>
                  <span className="flex-1">{l.text}</span>
                  {done && <span role="button" tabIndex={0} aria-label={`Undo match for ${l.text}`} className="text-muted" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); unlink(l.id); }}>✕</span>}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="flex flex-col gap-2" aria-label="Partners">
          {right.map((r) => {
            const l = leftFor(r.id);
            const n = l !== undefined ? pairNo(l) : -1;
            return (
              <li key={r.id} data-drop={r.id}>
                <button type="button"
                  className={`flex min-h-14 w-full items-center gap-2 rounded-2xl border-2 px-3 py-2 text-left text-lg font-semibold transition ${over === r.id ? "border-accent bg-accent/15" : "border-dashed border-line bg-surface"} ${held ? "animate-pulse" : ""}`}
                  style={n >= 0 ? { borderStyle: "solid", borderColor: PAIR_COLOURS[n % PAIR_COLOURS.length] } : undefined}
                  onClick={() => { if (held) link(held, r.id); }}>
                  <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full border-2 border-line text-sm font-bold" style={n >= 0 ? { background: PAIR_COLOURS[n % PAIR_COLOURS.length], color: "#fff", borderColor: "transparent" } : undefined}>{n >= 0 ? n + 1 : "·"}</span>
                  <span className="flex-1">{r.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <p role="status" className="text-sm text-muted">{Object.keys(value).length} of {left.length} matched{held ? ". Now tap its partner." : "."}</p>
      {ghost}
    </>
  );
}

/** A sentence with gaps: each gap is a dropdown that sits inside the sentence. */
function FillBlankInput({ text, blanks, value, onChange }: { text: string; blanks: { id: string; options: Opt[] }[]; value: Record<string, string>; onChange: (v: Record<string, string>) => void }) {
  const parts = text.split(/(\{[A-Za-z0-9_-]+\})/g);
  return (
    <p className="rounded-2xl border-2 border-line bg-surface px-4 py-5 text-[1.4rem] leading-[3rem]">
      {parts.map((part, i) => {
        const m = /^\{([A-Za-z0-9_-]+)\}$/.exec(part);
        const blank = m ? blanks.find((b) => b.id === m[1]) : undefined;
        if (!blank) return <span key={i}>{part}</span>;
        const chosen = value[blank.id];
        return (
          <select key={i} aria-label={`Gap ${blanks.indexOf(blank) + 1}`}
            className={`mx-1 inline-block min-h-11 max-w-full rounded-xl border-2 border-b-4 px-2 align-middle text-[1.2rem] font-bold ${chosen ? "border-accent bg-accent/15" : "animate-pulse border-dashed border-accent bg-surface"}`}
            value={chosen ?? ""} onChange={(e) => { sfx("tap"); onChange({ ...value, [blank.id]: e.target.value }); }}>
            <option value="">Choose…</option>
            {blank.options.map((o) => <option key={o.id} value={o.id}>{o.text}</option>)}
          </select>
        );
      })}
    </p>
  );
}

const ICON_SIZE = ["", "text-[clamp(2.5rem,8vw,4rem)]", "text-[clamp(3.5rem,11vw,6rem)]", "text-[clamp(4.5rem,14vw,8rem)]"];

/** Tap the right picture(s) in an emoji scene. Chosen pictures get a ring and a tick. */
function HotspotInput({ scene, value, onChange }: { scene: NonNullable<ViewQuestion["scene"]>; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="card relative aspect-[5/3] w-full overflow-hidden" role="group" aria-label="Pictures to choose from">
      {scene.items.map((it) => {
        const on = value.includes(it.id);
        return (
          <button key={it.id} type="button" aria-pressed={on} aria-label={it.label}
            className={`absolute flex min-h-14 min-w-14 -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-2xl p-1 transition active:scale-90 ${on ? "bg-accent/20 ring-4 ring-accent" : "hover:bg-accent/10 hover:ring-2 hover:ring-accent/40"}`}
            style={{ left: `${it.x}%`, top: `${it.y}%` }}
            onClick={() => { sfx("tap"); onChange(on ? value.filter((x) => x !== it.id) : [...value, it.id].slice(-4)); }}>
            <span aria-hidden="true" className={`${ICON_SIZE[it.size] ?? ICON_SIZE[2]} leading-none`}>{it.emoji}</span>
            {scene.show_labels && <span className="rounded-full bg-surface/90 px-2 text-base font-bold">{it.label}</span>}
            {on && <span aria-hidden="true" className="absolute -right-1 -top-1 grid size-7 place-items-center rounded-full bg-accent text-sm font-bold text-white">✓</span>}
          </button>
        );
      })}
    </div>
  );
}

/** A big slider with a live number, tick marks and plus / minus buttons, so it is easy to be exact. */
function SliderInput({ range, value, onChange }: { range: NonNullable<ViewQuestion["range"]>; value: number | null; onChange: (v: number) => void }) {
  const { min, max, step, unit } = range;
  const clamp = (n: number) => Math.min(max, Math.max(min, Math.round(n / step) * step));
  const shown = value ?? null;
  const set = (n: number) => { sfx("tap"); onChange(Number(clamp(n).toFixed(6))); };
  return (
    <div className="flex flex-col gap-3 rounded-2xl border-2 border-line bg-surface px-4 py-5">
      <p className="text-center font-display text-4xl font-extrabold" aria-live="polite">
        {shown === null ? <span className="text-muted">?</span> : shown}{shown !== null && unit ? <span className="ml-2 text-2xl font-bold text-muted">{unit}</span> : null}
      </p>
      <div className="flex items-center gap-3">
        <button type="button" className="btn !min-h-14 !min-w-14 text-2xl" aria-label="Less" onClick={() => set((shown ?? min) - step)}>−</button>
        <div className="relative flex-1">
          <input type="range" min={min} max={max} step={step} aria-label="Slider" value={shown ?? min} style={{ accentColor: "var(--accent)" }}
            className={`h-12 w-full cursor-pointer ${shown === null ? "opacity-60" : ""}`}
            onChange={(e) => set(Number(e.target.value))} onPointerDown={() => { if (shown === null) set(shown ?? min); }} />
        </div>
        <button type="button" className="btn !min-h-14 !min-w-14 text-2xl" aria-label="More" onClick={() => set((shown ?? min) + step)}>+</button>
      </div>
      <div className="flex justify-between text-lg font-bold text-muted" aria-hidden="true"><span>{min}{unit ? ` ${unit}` : ""}</span><span>{max}{unit ? ` ${unit}` : ""}</span></div>
    </div>
  );
}
