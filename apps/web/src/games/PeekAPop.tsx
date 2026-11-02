import { useEffect, useRef, useState } from "react";
import { sfx } from "../lib/sound";
import { Hud, pick, rand, usePops, useTimer, type GameProps } from "./common";

// Peek-a-Pop: critters peek out of their holes. Tap the friendly, wide-awake ones; leave the sleepy ones to snooze.

const SECONDS = 45;
type Hole = { up: boolean; face: string; sleepy: boolean; tapped: "" | "good" | "bad"; key: number };

export function PeekAPop({ level, skin, onEnd }: GameProps) {
  const count = level === 1 ? 9 : 12;
  const cols = level === 1 ? 3 : 4;
  // Holes live in a ref (timers read and change them) and a counter re-renders after each change.
  const holesRef = useRef<Hole[]>(Array.from({ length: count }, (_, i) => ({ up: false, face: "", sleepy: false, tapped: "", key: i })));
  const [, setTick] = useState(0);
  const setHoles = (fn: (hs: Hole[]) => Hole[]) => {
    holesRef.current = fn(holesRef.current);
    setTick((t) => t + 1);
  };
  const holes = holesRef.current;
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const ended = useRef(false);
  const { add, layer } = usePops();
  const area = useRef<HTMLDivElement>(null);

  const left = useTimer(SECONDS, true, () => {
    if (ended.current) return;
    ended.current = true;
    onEnd(scoreRef.current);
  });

  useEffect(() => {
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const popUp = () => {
      if (!alive || ended.current) return;
      const free = holesRef.current.map((h, i) => (h.up ? -1 : i)).filter((i) => i >= 0);
      if (free.length > 0) {
        const i = pick(free);
        const sleepy = Math.random() < (level === 1 ? 0.25 : 0.33);
        const stay = (level === 1 ? 1100 : 850) * rand(0.85, 1.2);
        setHoles((hs) => hs.map((h, j) => (j === i ? { up: true, face: sleepy ? skin.sleepy : pick(skin.critter), sleepy, tapped: "", key: h.key + 1 } : h)));
        const key = (holesRef.current[i] as Hole).key;
        timers.push(setTimeout(() => setHoles((hs2) => hs2.map((h, j) => (j === i && h.key === key ? { ...h, up: false } : h))), stay));
      }
      timers.push(setTimeout(popUp, (level === 1 ? 650 : 480) * rand(0.7, 1.2)));
    };
    timers.push(setTimeout(popUp, 300));
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [level, skin]);

  const tap = (i: number) => {
    const h = holes[i];
    if (!h || !h.up || h.tapped || ended.current) return;
    const cell = area.current?.children[i]?.getBoundingClientRect();
    const box = area.current?.getBoundingClientRect();
    const x = cell && box ? (cell.left + cell.width / 2 - box.left) / box.width : 0.5;
    const y = cell && box ? (cell.top - box.top) / box.height : 0.3;
    if (h.sleepy) {
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      sfx("wrong");
      add(x, y, "Shh! -1", false);
    } else {
      scoreRef.current += 1;
      sfx("pop");
      add(x, y, "+1");
    }
    setScore(scoreRef.current);
    setHoles((hs) => hs.map((x2, j) => (j === i ? { ...x2, tapped: h.sleepy ? "bad" : "good" } : x2)));
    setTimeout(() => setHoles((hs) => hs.map((x2, j) => (j === i ? { ...x2, up: false } : x2))), 260);
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <Hud score={score} left={left} total={SECONDS} />
      <p className="text-center font-display text-xl font-bold">Tap the friends <span aria-hidden="true">{skin.critter.join(" ")}</span> · don't wake the sleepy ones <span aria-hidden="true">{skin.sleepy}</span></p>
      <div className="relative flex flex-1 items-center justify-center">
        <div ref={area} className="grid w-full gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, maxWidth: cols * 200 }}>
          {holes.map((h, i) => (
            <button
              key={i}
              type="button"
              onPointerDown={() => tap(i)}
              aria-label={h.up ? (h.sleepy ? "A sleepy critter. Leave it!" : "A friendly critter. Tap it!") : "An empty hole"}
              className="relative aspect-square overflow-hidden"
              style={{ touchAction: "none", borderRadius: "50% 50% var(--radius) var(--radius)" }}
            >
              <span aria-hidden="true" className="absolute inset-x-[6%] bottom-[6%] h-[34%] rounded-[50%]" style={{ background: "color-mix(in srgb, var(--text) 55%, black)", boxShadow: "inset 0 10px 16px rgba(0,0,0,0.55)" }} />
              <span
                key={h.key}
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[16%] flex justify-center text-[clamp(44px,10vw,84px)] leading-none transition-transform duration-150 ease-out"
                style={{ transform: h.up ? "translateY(0)" : "translateY(120%)", clipPath: "inset(-50% 0 0 0)", filter: h.tapped === "good" ? "brightness(1.4)" : undefined }}
              >
                <span className={"inline-block " + (h.tapped === "good" ? "anim-pulse-once" : h.tapped === "bad" ? "shake" : h.up && h.sleepy ? "anim-snooze" : "")}>{h.face || "·"}</span>
              </span>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[16%]" style={{ background: "var(--surface)", borderTop: "var(--border-width) solid var(--surface-border)" }} />
            </button>
          ))}
        </div>
        {layer}
      </div>
    </div>
  );
}
