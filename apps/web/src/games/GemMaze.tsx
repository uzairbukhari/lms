import { useCallback, useEffect, useRef, useState } from "react";
import { sfx } from "../lib/sound";
import { Hud, pick, shuffle, useTimer, type GameProps } from "./common";

// Gem Maze: a fresh maze every round. Swipe (or use the arrow pad or keyboard) to walk the explorer one square at a
// time and collect every gem. Clearing a maze earns 2 extra and builds a new one.

const SECONDS = 60;
type Cell = { n: boolean; e: boolean; s: boolean; w: boolean }; // true = wall
type Dir = "n" | "e" | "s" | "w";
const STEP: Record<Dir, [number, number]> = { n: [0, -1], e: [1, 0], s: [0, 1], w: [-1, 0] };
const OPP: Record<Dir, Dir> = { n: "s", s: "n", e: "w", w: "e" };

/** A perfect maze (one route between any two squares) by a random depth-first walk, with a few extra openings. */
export function makeMaze(size: number): Cell[][] {
  const g: Cell[][] = Array.from({ length: size }, () => Array.from({ length: size }, () => ({ n: true, e: true, s: true, w: true })));
  const seen = Array.from({ length: size }, () => Array<boolean>(size).fill(false));
  const stack: [number, number][] = [[0, 0]];
  (seen[0] as boolean[])[0] = true;
  while (stack.length) {
    const [x, y] = stack[stack.length - 1] as [number, number];
    const options = (Object.keys(STEP) as Dir[]).filter((d) => {
      const [dx, dy] = STEP[d];
      const nx = x + dx, ny = y + dy;
      return nx >= 0 && ny >= 0 && nx < size && ny < size && !seen[ny]?.[nx];
    });
    if (!options.length) {
      stack.pop();
      continue;
    }
    const d = pick(options);
    const [dx, dy] = STEP[d];
    (g[y] as Cell[])[x] = { ...(g[y]?.[x] as Cell), [d]: false };
    (g[y + dy] as Cell[])[x + dx] = { ...(g[y + dy]?.[x + dx] as Cell), [OPP[d]]: false };
    (seen[y + dy] as boolean[])[x + dx] = true;
    stack.push([x + dx, y + dy]);
  }
  // Knock through a few extra walls so there is more than one way round (kinder for young players).
  for (let k = 0; k < size; k++) {
    const x = Math.floor(Math.random() * (size - 1));
    const y = Math.floor(Math.random() * size);
    (g[y] as Cell[])[x] = { ...(g[y]?.[x] as Cell), e: false };
    (g[y] as Cell[])[x + 1] = { ...(g[y]?.[x + 1] as Cell), w: false };
  }
  return g;
}

export function GemMaze({ level, skin, onEnd }: GameProps) {
  const size = level === 1 ? 6 : 8;
  const gemsEach = level === 1 ? 4 : 5;
  const [maze, setMaze] = useState(() => makeMaze(size));
  const [pos, setPos] = useState<[number, number]>([0, 0]);
  const [gems, setGems] = useState<string[]>(() => placeGems(size, gemsEach));
  const [score, setScore] = useState(0);
  const [bump, setBump] = useState(0);
  const [round, setRound] = useState(1);
  const scoreRef = useRef(0);
  const ended = useRef(false);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const left = useTimer(SECONDS, true, () => {
    if (ended.current) return;
    ended.current = true;
    onEnd(scoreRef.current);
  });

  const go = useCallback(
    (d: Dir) => {
      if (ended.current) return;
      const [x, y] = pos;
      if (maze[y]?.[x]?.[d]) {
        sfx("bump");
        setBump((b) => b + 1);
        return;
      }
      const [dx, dy] = STEP[d];
      const nx = x + dx, ny = y + dy;
      setPos([nx, ny]);
      sfx("step");
      const key = `${nx},${ny}`;
      if (gems.includes(key)) {
        const rest = gems.filter((g) => g !== key);
        scoreRef.current += 1;
        sfx("coin");
        if (rest.length === 0) {
          scoreRef.current += 2;
          setTimeout(() => {
            sfx("unlock");
            setMaze(makeMaze(size));
            setGems(placeGems(size, gemsEach, `${nx},${ny}`));
            setRound((r) => r + 1);
          }, 350);
        }
        setGems(rest);
        setScore(scoreRef.current);
      }
    },
    [pos, maze, gems, size, gemsEach],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const d = ({ ArrowUp: "n", ArrowRight: "e", ArrowDown: "s", ArrowLeft: "w" } as Record<string, Dir>)[e.key];
      if (d) {
        e.preventDefault();
        go(d);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const cell = 100 / size;
  const wall = "var(--surface-border)";
  return (
    <div className="flex h-full flex-col gap-3">
      <Hud score={score} left={left} total={SECONDS} extra={<span className="font-display text-xl font-bold">Maze {round}</span>} />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 lg:flex-row">
        <div
          key={round}
          className="pop-in relative aspect-square touch-none select-none"
          style={{ width: "min(92vw, 62vh, 560px)", background: "var(--surface)", borderRadius: "calc(var(--radius) * 0.5)", border: `4px solid ${wall}` }}
          onPointerDown={(e) => (touch.current = { x: e.clientX, y: e.clientY })}
          onPointerUp={(e) => {
            const t = touch.current;
            touch.current = null;
            if (!t) return;
            const dx = e.clientX - t.x, dy = e.clientY - t.y;
            if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
            go(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "e" : "w") : dy > 0 ? "s" : "n");
          }}
          aria-label="Maze. Swipe or use the arrows to move."
          role="application"
        >
          {maze.map((row, y) =>
            row.map((c, x) => (
              <span
                key={`${x},${y}`}
                aria-hidden="true"
                className="absolute"
                style={{
                  left: `${x * cell}%`, top: `${y * cell}%`, width: `${cell}%`, height: `${cell}%`,
                  borderTop: c.n ? `4px solid ${wall}` : undefined, borderRight: c.e ? `4px solid ${wall}` : undefined,
                  borderBottom: c.s ? `4px solid ${wall}` : undefined, borderLeft: c.w ? `4px solid ${wall}` : undefined,
                  boxSizing: "border-box",
                }}
              />
            )),
          )}
          {gems.map((g) => {
            const [gx, gy] = g.split(",").map(Number) as [number, number];
            return (
              <span key={g} aria-hidden="true" className="anim-float absolute flex items-center justify-center" style={{ left: `${gx * cell}%`, top: `${gy * cell}%`, width: `${cell}%`, height: `${cell}%`, fontSize: `min(${48 / size}vw, ${36 / size * 1.6}vh, ${300 / size}px)` }}>
                {skin.gem}
              </span>
            );
          })}
          <span
            key={`hero-${bump}`}
            aria-hidden="true"
            className={"absolute flex items-center justify-center transition-[left,top] duration-150 ease-out " + (bump ? "shake" : "")}
            style={{ left: `${pos[0] * cell}%`, top: `${pos[1] * cell}%`, width: `${cell}%`, height: `${cell}%`, fontSize: `min(${56 / size}vw, ${40 / size * 1.6}vh, ${340 / size}px)` }}
          >
            {skin.hero}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2" aria-label="Arrow pad">
          <span />
          <button type="button" className="btn !min-h-16 !min-w-16 !text-3xl" onClick={() => go("n")} aria-label="Up">⬆️</button>
          <span />
          <button type="button" className="btn !min-h-16 !min-w-16 !text-3xl" onClick={() => go("w")} aria-label="Left">⬅️</button>
          <span />
          <button type="button" className="btn !min-h-16 !min-w-16 !text-3xl" onClick={() => go("e")} aria-label="Right">➡️</button>
          <span />
          <button type="button" className="btn !min-h-16 !min-w-16 !text-3xl" onClick={() => go("s")} aria-label="Down">⬇️</button>
          <span />
        </div>
      </div>
    </div>
  );
}

function placeGems(size: number, n: number, avoid = "0,0"): string[] {
  const all: string[] = [];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (`${x},${y}` !== avoid && x + y > 1) all.push(`${x},${y}`);
  return shuffle(all).slice(0, n);
}
