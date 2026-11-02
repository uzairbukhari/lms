import { useEffect, useMemo, useRef, useState } from "react";
import { sfx } from "../lib/sound";

const shuffle = <T,>(xs: T[]): T[] => { const a = [...xs]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j] as T, a[i] as T]; } return a; };

/** Short brain exercises: find the pairs, or watch an order and copy it. Never graded or saved. */
export function BrainGame({ game, emojis }: { game: "memory_match" | "remember_order"; emojis: string[] }) {
  return game === "memory_match" ? <MemoryMatch emojis={emojis} /> : <RememberOrder emojis={emojis} />;
}

function MemoryMatch({ emojis }: { emojis: string[] }) {
  const deal = () => shuffle([...emojis, ...emojis].map((e, i) => ({ id: i, e })));
  const [cards, setCards] = useState(deal);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [tries, setTries] = useState(0);
  const lock = useRef(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const flip = (id: number) => {
    if (lock.current || open.includes(id)) return;
    sfx("tap");
    const now = [...open, id];
    setOpen(now);
    if (now.length < 2) return;
    setTries((t) => t + 1);
    const [a, b] = now.map((i) => cards.find((c) => c.id === i)!.e);
    if (a === b) { sfx("correct"); setMatched((m) => new Set(m).add(a as string)); setOpen([]); return; }
    lock.current = true;
    timer.current = window.setTimeout(() => { setOpen([]); lock.current = false; }, 900);
  };
  const done = matched.size === emojis.length;
  const cols = cards.length <= 6 ? 3 : 4;
  return (
    <div className="flex flex-col gap-4" onTouchStart={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()}>
      <div className="mx-auto grid w-full max-w-xl gap-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {cards.map((c) => {
          const up = open.includes(c.id) || matched.has(c.e);
          return (
            <button key={c.id} type="button" disabled={up} onClick={() => flip(c.id)} aria-label={up ? c.e : "Hidden card"}
              className={`card grid aspect-square place-items-center text-[clamp(2.5rem,8vw,4.5rem)] ${up ? "flip-in" : "bg-accent"} ${matched.has(c.e) ? "opacity-60" : ""}`}>
              {up ? c.e : "❓"}
            </button>
          );
        })}
      </div>
      <p role="status" aria-live="polite" className="card px-4 py-2 text-center text-2xl font-bold">
        {done ? `🎉 You found every pair in ${tries} tries!` : `Tries: ${tries}`}
      </p>
      <button type="button" className="btn self-center !min-h-14 !px-6 text-xl" onClick={() => { window.clearTimeout(timer.current); lock.current = false; setCards(deal()); setOpen([]); setMatched(new Set()); setTries(0); }}>↺ New game</button>
    </div>
  );
}

function RememberOrder({ emojis }: { emojis: string[] }) {
  const [length, setLength] = useState(3);
  const [seq, setSeq] = useState<number[]>([]);
  const [phase, setPhase] = useState<"idle" | "showing" | "input" | "won">("idle");
  const [lit, setLit] = useState<number | null>(null);
  const [got, setGot] = useState(0);
  const [oops, setOops] = useState(false);
  const timers = useRef<number[]>([]);
  const max = Math.min(8, emojis.length + 3);
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);
  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };

  const show = (s: number[]) => {
    setPhase("showing"); setGot(0); setOops(false);
    s.forEach((n, i) => { later(() => { setLit(n); sfx("tap"); }, 700 + i * 900); later(() => setLit(null), 700 + i * 900 + 600); });
    later(() => setPhase("input"), 700 + s.length * 900);
  };
  const start = (len: number) => { timers.current.forEach(window.clearTimeout); const s = Array.from({ length: len }, () => Math.floor(Math.random() * emojis.length)); setSeq(s); show(s); };

  const press = (n: number) => {
    if (phase !== "input") return;
    if (seq[got] === n) {
      sfx("tap");
      if (got + 1 === seq.length) { sfx("correct"); setPhase("won"); } else setGot(got + 1);
    } else {
      sfx("wrong"); setOops(true);
      later(() => show(seq), 1100);
      setPhase("showing");
    }
  };
  const msg = phase === "idle" ? "Press Watch, then copy the order." : phase === "showing" ? (oops ? "Not quite. Watch again!" : "👀 Watch carefully…") : phase === "input" ? `Your turn! ${got}/${seq.length}` : "🎉 You remembered it!";
  return (
    <div className="flex flex-col items-center gap-4" onTouchStart={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()}>
      <div className={`flex flex-wrap justify-center gap-3 ${oops ? "shake" : ""}`}>
        {emojis.map((e, n) => (
          <button key={n} type="button" disabled={phase !== "input"} onClick={() => press(n)} aria-label={e}
            className={`card grid size-24 place-items-center text-6xl transition-transform ${lit === n ? "scale-125 ring-8 ring-accent" : ""}`}>{e}</button>
        ))}
      </div>
      <p role="status" aria-live="polite" className="card px-5 py-2 text-center text-2xl font-bold">{msg}</p>
      <div className="flex gap-3">
        {phase === "idle" && <button type="button" className="btn btn-primary !min-h-14 !px-6 text-xl" onClick={() => start(length)}>▶ Watch</button>}
        {phase === "won" && (
          <>
            <button type="button" className="btn btn-primary !min-h-14 !px-6 text-xl" onClick={() => { const n = Math.min(max, length + 1); setLength(n); start(n); }}>{length < max ? "Harder! ➕" : "Play again"}</button>
            <button type="button" className="btn !min-h-14 !px-6 text-xl" onClick={() => start(length)}>↺ Same length</button>
          </>
        )}
      </div>
    </div>
  );
}
