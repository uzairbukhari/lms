import { useEffect, useRef, useState } from "react";
import { sfx } from "../lib/sound";
import { Hud, shuffle, useTimer, type GameProps } from "./common";

// Twin Tiles: flip two tiles at a time to find matching pairs. Fewer wrong guesses = a higher score (out of 100).

const SECONDS = 90;
type Tile = { id: number; face: string; open: boolean; found: boolean };

export function TwinTiles({ level, skin, onEnd }: GameProps) {
  const pairs = level === 1 ? 6 : 8;
  const cols = 4;
  const [tiles, setTiles] = useState<Tile[]>(() => shuffle(skin.tiles.slice(0, pairs).flatMap((face, i) => [{ id: i * 2, face, open: false, found: false }, { id: i * 2 + 1, face, open: false, found: false }])));
  const [misses, setMisses] = useState(0);
  const [peek, setPeek] = useState(true);
  const busy = useRef(false);
  const ended = useRef(false);
  const found = tiles.filter((t) => t.found).length / 2;
  const scoreFor = (m: number, f: number) => (f === pairs ? Math.max(20, 100 - m * (level === 1 ? 6 : 4)) : f * 8);

  const end = (score: number) => {
    if (ended.current) return;
    ended.current = true;
    onEnd(score);
  };
  const left = useTimer(SECONDS, true, () => end(scoreFor(misses, found)));

  // A quick peek at every tile at the start.
  useEffect(() => {
    const t = setTimeout(() => {
      setPeek(false);
      sfx("flip");
    }, level === 1 ? 1600 : 1200);
    return () => clearTimeout(t);
  }, [level]);

  useEffect(() => {
    if (found === pairs) {
      sfx("done");
      const t = setTimeout(() => end(scoreFor(misses, found)), 700);
      return () => clearTimeout(t);
    }
  }, [found]);

  const flip = (tile: Tile) => {
    if (peek || busy.current || tile.open || tile.found || ended.current) return;
    sfx("flip");
    const open = tiles.filter((t) => t.open && !t.found);
    const next = tiles.map((t) => (t.id === tile.id ? { ...t, open: true } : t));
    setTiles(next);
    if (open.length === 1) {
      const other = open[0] as Tile;
      busy.current = true;
      if (other.face === tile.face) {
        setTimeout(() => {
          sfx("coin");
          setTiles((ts) => ts.map((t) => (t.face === tile.face ? { ...t, found: true } : t)));
          busy.current = false;
        }, 300);
      } else {
        setTimeout(() => {
          sfx("bump");
          setMisses((m) => m + 1);
          setTiles((ts) => ts.map((t) => (t.found ? t : { ...t, open: false })));
          busy.current = false;
        }, 750);
      }
    }
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <Hud score={found} left={left} total={SECONDS} extra={<span className="font-display text-xl font-bold">of {pairs} pairs</span>} />
      <div className="grid flex-1 content-center gap-3 self-center" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, width: "min(100%, 560px)" }}>
        {tiles.map((t, i) => {
          const shown = peek || t.open || t.found;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => flip(t)}
              aria-label={shown ? t.face : `Tile ${i + 1}, face down`}
              className="tile3d relative aspect-square"
              style={{ perspective: 600 }}
            >
              <span className={"tile3d-inner absolute inset-0 " + (shown ? "is-open" : "")}>
                <span className="tile3d-face absolute inset-0 flex items-center justify-center text-[clamp(28px,7vw,56px)]" style={{ background: "var(--accent)", color: "var(--accent-contrast)", borderRadius: "calc(var(--radius) * 0.6)", border: "var(--border-width) solid var(--surface-border)" }}>
                  ?
                </span>
                <span className={"tile3d-face tile3d-back absolute inset-0 flex items-center justify-center text-[clamp(32px,8vw,64px)] " + (t.found ? "anim-pulse-once" : "")} style={{ background: t.found ? "var(--done-tint)" : "var(--surface)", borderRadius: "calc(var(--radius) * 0.6)", border: "var(--border-width) solid var(--surface-border)" }}>
                  {t.face}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-center text-lg text-muted" aria-live="polite">{peek ? "Look carefully… remember where they are!" : `Wrong guesses: ${misses}`}</p>
    </div>
  );
}
