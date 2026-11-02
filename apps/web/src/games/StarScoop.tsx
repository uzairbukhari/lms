import { useRef, useState } from "react";
import { sfx } from "../lib/sound";
import { Arena, Hud, pick, rand, useGameLoop, usePops, useTimer, type GameProps } from "./common";

// Star Scoop: slide the catcher along the bottom to scoop falling treats; dodge the baddies.

type Item = { id: number; x: number; y: number; vy: number; kind: "good" | "gold" | "bad"; spin: number };
const SECONDS = 45;
const CATCH_Y = 0.86;

export function StarScoop({ level, skin, onEnd }: GameProps) {
  const [score, setScore] = useState(0);
  const [hit, setHit] = useState(0);
  const items = useRef<Item[]>([]);
  const catcherX = useRef(0.5);
  const spawnIn = useRef(0.3);
  const nextId = useRef(0);
  const scoreRef = useRef(0);
  const ended = useRef(false);
  const area = useRef<HTMLDivElement>(null);
  const { add, layer } = usePops();

  const finish = () => {
    if (ended.current) return;
    ended.current = true;
    onEnd(scoreRef.current);
  };
  const left = useTimer(SECONDS, true, finish);
  const speedUp = 1 + (1 - left / SECONDS) * 0.6; // gets a little quicker as time runs out

  useGameLoop(!ended.current, (dt) => {
    spawnIn.current -= dt;
    if (spawnIn.current <= 0) {
      spawnIn.current = (level === 1 ? 0.75 : 0.55) / speedUp;
      const r = Math.random();
      const kind: Item["kind"] = r < (level === 1 ? 0.18 : 0.26) ? "bad" : r > 0.9 ? "gold" : "good";
      items.current.push({ id: nextId.current++, x: rand(0.08, 0.92), y: -0.08, vy: rand(0.28, 0.4) * (level === 1 ? 1 : 1.3) * speedUp, kind, spin: pick([-1, 1]) });
    }
    const keep: Item[] = [];
    for (const it of items.current) {
      it.y += it.vy * dt;
      if (it.y >= CATCH_Y - 0.03 && it.y <= CATCH_Y + 0.04 && Math.abs(it.x - catcherX.current) < 0.11) {
        if (it.kind === "bad") {
          scoreRef.current = Math.max(0, scoreRef.current - 2);
          sfx("bump");
          setHit((h) => h + 1);
          add(it.x, CATCH_Y - 0.12, "-2", false);
        } else {
          const pts = it.kind === "gold" ? 3 : 1;
          scoreRef.current += pts;
          sfx(it.kind === "gold" ? "gold" : "coin");
          add(it.x, CATCH_Y - 0.12, `+${pts}`);
        }
        setScore(scoreRef.current);
        continue;
      }
      if (it.y < 1.1) keep.push(it);
    }
    items.current = keep;
  });

  const move = (clientX: number) => {
    const r = area.current?.getBoundingClientRect();
    if (!r) return;
    catcherX.current = Math.max(0.06, Math.min(0.94, (clientX - r.left) / r.width));
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <Hud score={score} left={left} total={SECONDS} />
      <Arena
        ref={area}
        onPointerDown={(e) => move(e.clientX)}
        onPointerMove={(e) => move(e.clientX)}
        aria-label="Move your finger left and right to catch the falling stars"
      >
        {items.current.map((it) => (
          <span
            key={it.id}
            aria-hidden="true"
            className="absolute text-[44px] leading-none"
            style={{ left: `${it.x * 100}%`, top: `${it.y * 100}%`, transform: `translate(-50%,-50%) rotate(${it.y * 300 * it.spin}deg)`, filter: it.kind === "gold" ? "drop-shadow(0 0 10px gold)" : undefined }}
          >
            {it.kind === "bad" ? skin.bad : it.kind === "gold" ? skin.gold : skin.good}
          </span>
        ))}
        <span
          key={hit}
          aria-hidden="true"
          className={"absolute -translate-x-1/2 text-[64px] leading-none " + (hit ? "shake" : "")}
          style={{ left: `${catcherX.current * 100}%`, top: `${CATCH_Y * 100 - 6}%` }}
        >
          {skin.catcher}
        </span>
        {layer}
      </Arena>
    </div>
  );
}
