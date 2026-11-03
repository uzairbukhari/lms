import { useRef, useState } from "react";
import { sfx } from "../lib/sound";
import { Hud, pick, randInt, useGameLoop, usePops, useTimer, type GameProps } from "./common";

// Sort Dash: one thing at a time slides down the middle. Send it to the correct basket (tap a side, or swipe) before
// it reaches the bottom. The sorting rule changes every 15 seconds.

type Thing = { label: string; side: 0 | 1 };
type Rule = { left: string; right: string; make: () => Thing };
const living = ["🐶", "🌳", "🐟", "🌻", "🐦", "🐝", "🌵", "🐢", "🍄", "🐸"];
const notLiving = ["🪨", "🚗", "⚽", "🧸", "✏️", "⏰", "🧱", "💡", "🔑", "🎈"];
const land = ["🐘", "🦁", "🐄", "🐇", "🦒", "🐎"];
const sea = ["🐙", "🐠", "🦈", "🐳", "🦀", "🪼"];
const RULES: Record<1 | 2, Rule[]> = {
  1: [
    { left: "Living", right: "Not living", make: () => (Math.random() < 0.5 ? { label: pick(living), side: 0 } : { label: pick(notLiving), side: 1 }) },
    { left: "Odd", right: "Even", make: () => { const n = randInt(1, 20); return { label: String(n), side: n % 2 === 0 ? 1 : 0 }; } },
    { left: "Less than 10", right: "10 or more", make: () => { const n = randInt(1, 19); return { label: String(n), side: n >= 10 ? 1 : 0 }; } },
  ],
  2: [
    { left: "Lives on land", right: "Lives in the sea", make: () => (Math.random() < 0.5 ? { label: pick(land), side: 0 } : { label: pick(sea), side: 1 }) },
    { left: "Odd", right: "Even", make: () => { const n = randInt(11, 99); return { label: String(n), side: n % 2 === 0 ? 1 : 0 }; } },
    { left: "Answer < 10", right: "Answer ≥ 10", make: () => { const a = randInt(1, 9), b = randInt(1, 9); return { label: `${a} + ${b}`, side: a + b >= 10 ? 1 : 0 }; } },
  ],
};
const SECONDS = 45;

export function SortDash({ level, onEnd }: GameProps) {
  const rules = RULES[level];
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const ended = useRef(false);
  const thing = useRef<(Thing & { y: number; id: number; leaving: 0 | -1 | 1; t: number }) | null>(null);
  const nextId = useRef(0);
  const touch = useRef<number | null>(null);
  const [flash, setFlash] = useState<{ side: 0 | 1; good: boolean; id: number } | null>(null);
  const { add, layer } = usePops();

  const left = useTimer(SECONDS, true, () => {
    if (ended.current) return;
    ended.current = true;
    onEnd(scoreRef.current);
  });
  const ruleIndex = Math.min(rules.length - 1, Math.floor((SECONDS - left) / 15));
  const rule = rules[ruleIndex] as Rule;
  const lastRule = useRef(ruleIndex);
  if (lastRule.current !== ruleIndex) {
    lastRule.current = ruleIndex;
    thing.current = null;
    sfx("whoosh");
  }
  const fallTime = (level === 1 ? 3.6 : 2.8) * (1 - (1 - left / SECONDS) * 0.25);

  useGameLoop(!ended.current, (dt) => {
    const t = thing.current;
    if (!t) {
      thing.current = { ...rule.make(), y: 0, id: nextId.current++, leaving: 0, t: 0 };
      return;
    }
    if (t.leaving) {
      t.t += dt;
      if (t.t > 0.3) thing.current = null;
      return;
    }
    t.y += dt / fallTime;
    if (t.y >= 1) {
      sfx("whoosh");
      add(0.5, 0.8, "Too slow!", false);
      thing.current = null;
    }
  });

  const send = (side: 0 | 1) => {
    const t = thing.current;
    if (!t || t.leaving || ended.current) return;
    const good = t.side === side;
    t.leaving = side === 0 ? -1 : 1;
    if (good) {
      scoreRef.current += 1;
      sfx("coin");
      add(side === 0 ? 0.2 : 0.8, 0.55, "+1");
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      sfx("wrong");
      add(side === 0 ? 0.2 : 0.8, 0.55, "-1", false);
    }
    setScore(scoreRef.current);
    setFlash({ side, good, id: t.id });
  };

  const t = thing.current;
  const basket = (side: 0 | 1, label: string) => (
    <button
      type="button"
      onPointerDown={() => send(side)}
      className={"btn flex h-full flex-1 flex-col !justify-end !rounded-[var(--radius)] !px-2 !pb-5 " + (flash?.side === side ? (flash.good ? "anim-pulse-once" : "shake") : "")}
      key={`${side}-${flash?.side === side ? flash.id : "x"}`}
      style={{ background: flash?.side === side ? (flash.good ? "color-mix(in srgb, #3ccf7a 35%, var(--surface))" : "color-mix(in srgb, #ff6b6b 35%, var(--surface))") : "var(--surface)", touchAction: "none" }}
      aria-label={`Basket: ${label}`}
    >
      <span aria-hidden="true" className="text-5xl">🧺</span>
      <span className="font-display text-[clamp(18px,3.4vw,28px)] font-extrabold leading-tight">{label}</span>
      <span aria-hidden="true" className="text-2xl">{side === 0 ? "⬅️" : "➡️"}</span>
    </button>
  );

  return (
    <div className="flex h-full flex-col gap-3">
      <Hud score={score} left={left} total={SECONDS} />
      <div
        className="relative flex flex-1 touch-none select-none gap-3"
        onPointerDown={(e) => (touch.current = e.clientX)}
        onPointerUp={(e) => {
          const x = touch.current;
          touch.current = null;
          if (x !== null && Math.abs(e.clientX - x) > 40) send(e.clientX > x ? 1 : 0);
        }}
      >
        {basket(0, rule.left)}
        <div className="relative w-[34%] overflow-hidden" style={{ borderRadius: "var(--radius)", background: "color-mix(in srgb, var(--track) 80%, transparent)", border: "var(--border-width) dashed var(--surface-border)" }} aria-live="polite">
          {t && (
            <span
              key={t.id}
              className="absolute left-1/2 flex items-center justify-center rounded-3xl font-display font-extrabold"
              style={{
                top: `${t.y * 80 + 4}%`,
                transform: `translateX(calc(-50% + ${t.leaving * t.t * 600}%)) scale(${t.leaving ? 1 - t.t * 2 : 1})`,
                fontSize: t.label.length > 3 ? "clamp(22px,4vw,36px)" : "clamp(40px,8vw,64px)",
                background: "var(--surface)",
                border: "var(--border-width) solid var(--surface-border)",
                padding: "8px 14px",
                minWidth: 80,
                boxShadow: "var(--shadow)",
              }}
            >
              {t.label}
            </span>
          )}
        </div>
        {basket(1, rule.right)}
        {layer}
      </div>
    </div>
  );
}
