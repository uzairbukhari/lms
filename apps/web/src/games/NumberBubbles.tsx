import { useRef, useState } from "react";
import { sfx } from "../lib/sound";
import { Arena, Hud, rand, randInt, useGameLoop, usePops, useTimer, type GameProps } from "./common";

// Number Bubbles: bubbles drift upwards carrying numbers. Pop only the ones that fit the sign; the sign changes
// every 15 seconds.

type Rule = { sign: string; test: (n: number) => boolean; make: () => number };
const RULES: Record<1 | 2, Rule[]> = {
  1: [
    { sign: "Even numbers", test: (n) => n % 2 === 0, make: () => randInt(1, 20) },
    { sign: "Bigger than 10", test: (n) => n > 10, make: () => randInt(1, 20) },
    { sign: "Odd numbers", test: (n) => n % 2 === 1, make: () => randInt(1, 20) },
  ],
  2: [
    { sign: "Multiples of 5", test: (n) => n % 5 === 0, make: () => (Math.random() < 0.45 ? randInt(1, 10) * 5 : randInt(1, 50)) },
    { sign: "Makes 10 with 3 (3 + ? = 10)", test: (n) => n === 7, make: () => (Math.random() < 0.4 ? 7 : randInt(1, 12)) },
    { sign: "Multiples of 3", test: (n) => n % 3 === 0, make: () => (Math.random() < 0.45 ? randInt(1, 12) * 3 : randInt(1, 36)) },
  ],
};
const SECONDS = 45;
const COLOURS = ["#7ee8d4", "#93d8fb", "#c4b5fd", "#ffb4c8", "#ffd9a0"];

type Bubble = { id: number; x: number; y: number; vy: number; n: number; r: number; phase: number; colour: string; popping: number; wrong: number };

export function NumberBubbles({ level, onEnd }: GameProps) {
  const rules = RULES[level];
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const bubbles = useRef<Bubble[]>([]);
  const spawnIn = useRef(0);
  const nextId = useRef(0);
  const clock = useRef(0);
  const ended = useRef(false);
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
    sfx("whoosh");
  }

  useGameLoop(!ended.current, (dt) => {
    clock.current += dt;
    spawnIn.current -= dt;
    if (spawnIn.current <= 0) {
      spawnIn.current = level === 1 ? 0.85 : 0.7;
      bubbles.current.push({ id: nextId.current++, x: rand(0.1, 0.9), y: 1.12, vy: rand(0.12, 0.18) * (level === 1 ? 1 : 1.25), n: rule.make(), r: rand(36, 46), phase: rand(0, 6), colour: COLOURS[randInt(0, COLOURS.length - 1)] as string, popping: 0, wrong: 0 });
    }
    bubbles.current = bubbles.current.filter((b) => {
      if (b.popping) return (b.popping += dt) < 0.3;
      if (b.wrong) b.wrong = Math.max(0, b.wrong - dt);
      b.y -= b.vy * dt;
      return b.y > -0.15;
    });
  });

  const tap = (b: Bubble) => {
    if (b.popping || ended.current) return;
    if (rule.test(b.n)) {
      b.popping = 0.001;
      scoreRef.current += 1;
      sfx("pop");
      add(b.x, b.y - 0.06, "+1");
    } else {
      b.wrong = 0.45;
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      sfx("wrong");
      add(b.x, b.y - 0.06, "-1", false);
    }
    setScore(scoreRef.current);
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <Hud score={score} left={left} total={SECONDS} />
      <p key={rule.sign} className="pop-in self-center rounded-full bg-accent px-6 py-2 text-center font-display text-2xl font-extrabold text-on-accent" aria-live="assertive">
        Pop: {rule.sign}
      </p>
      <Arena aria-label={`Pop the bubbles showing ${rule.sign}`}>
        {bubbles.current.map((b) => {
          const wob = Math.sin(clock.current * 2 + b.phase) * 0.02;
          return (
            <button
              key={b.id}
              type="button"
              onPointerDown={() => tap(b)}
              aria-label={`Bubble ${b.n}`}
              className={"absolute flex items-center justify-center rounded-full font-display text-3xl font-extrabold " + (b.wrong ? "shake" : "")}
              style={{
                left: `${(b.x + wob) * 100}%`,
                top: `${b.y * 100}%`,
                width: b.r * 2,
                height: b.r * 2,
                marginLeft: -b.r,
                marginTop: -b.r,
                color: "#1b1f3b",
                background: `radial-gradient(circle at 30% 28%, #ffffffee 0 14%, ${b.colour}cc 15% 70%, ${b.colour} 100%)`,
                border: "3px solid #ffffffaa",
                boxShadow: "inset -6px -8px 0 rgba(0,0,0,0.08), 0 6px 14px rgba(0,0,0,0.18)",
                transform: b.popping ? `scale(${1 + b.popping * 3})` : undefined,
                opacity: b.popping ? 1 - b.popping / 0.3 : 1,
                touchAction: "none",
              }}
            >
              {b.n}
            </button>
          );
        })}
        {layer}
      </Arena>
    </div>
  );
}
