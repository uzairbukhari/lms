import { useCallback, useEffect, useRef, useState, type ComponentPropsWithRef, type ReactNode } from "react";
import type { GameLevel } from "@lms/schema";
import type { Skin } from "./skins";

/** What every mini game receives. A game calls onEnd once with its final score. */
export type GameProps = { level: GameLevel; skin: Skin; onEnd: (score: number) => void };

export const rand = (a: number, b: number) => a + Math.random() * (b - a);
export const randInt = (a: number, b: number) => Math.floor(rand(a, b + 1));
export const pick = <T,>(xs: readonly T[]): T => xs[Math.floor(Math.random() * xs.length)] as T;
export function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j] as T, a[i] as T];
  }
  return a;
}

/** Calls `tick(dt seconds)` every animation frame while `running`, then re-renders. */
export function useGameLoop(running: boolean, tick: (dt: number) => void) {
  const [, setFrame] = useState(0);
  const tickRef = useRef(tick);
  tickRef.current = tick;
  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    let raf = 0;
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000); // a hidden tab never jumps the game forward
      last = t;
      tickRef.current(dt);
      setFrame((f) => (f + 1) % 1_000_000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running]);
}

/** A countdown in seconds. Calls onDone once when it reaches zero. */
export function useTimer(seconds: number, running: boolean, onDone: () => void): number {
  const [left, setLeft] = useState(seconds);
  const done = useRef(onDone);
  done.current = onDone;
  useEffect(() => {
    if (!running) return;
    const started = performance.now() - (seconds - left) * 1000;
    const id = setInterval(() => {
      const l = Math.max(0, seconds - (performance.now() - started) / 1000);
      setLeft(l);
      if (l <= 0) {
        clearInterval(id);
        done.current();
      }
    }, 100);
    return () => clearInterval(id);
  }, [running, seconds]);
  return left;
}

/** "+1" style messages that float up and fade where something happened. */
export type Pop = { id: number; x: number; y: number; text: string; good: boolean };
export function usePops() {
  const [pops, setPops] = useState<Pop[]>([]);
  const next = useRef(0);
  const add = useCallback((x: number, y: number, text: string, good = true) => {
    const id = next.current++;
    setPops((p) => [...p, { id, x, y, text, good }]);
    setTimeout(() => setPops((p) => p.filter((q) => q.id !== id)), 800);
  }, []);
  const layer = (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {pops.map((p) => (
        <span
          key={p.id}
          className="game-pop absolute font-display text-3xl font-extrabold"
          style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%`, color: p.good ? "var(--star)" : "#ff6b6b", textShadow: "0 2px 0 rgba(0,0,0,0.35)" }}
        >
          {p.text}
        </span>
      ))}
    </div>
  );
  return { add, layer };
}

/** Score and time bar along the top of a game. */
export function Hud({ score, left, total, extra }: { score: number; left: number; total: number; extra?: ReactNode }) {
  const pct = Math.max(0, Math.min(100, (left / total) * 100));
  const low = left <= 5;
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex min-w-[96px] items-center justify-center gap-1.5 rounded-full border-[length:var(--border-width)] border-line bg-surface px-4 py-1.5 font-display text-2xl font-extrabold" aria-live="polite" aria-label={`Score ${score}`}>
        <span aria-hidden="true">⭐</span>
        <span key={score} className="game-bump inline-block">{score}</span>
      </span>
      <div className="relative h-5 flex-1 overflow-hidden rounded-full border-[length:var(--border-width)] border-line" style={{ background: "var(--track)" }} role="timer" aria-label={`${Math.ceil(left)} seconds left`}>
        <div className="h-full transition-[width] duration-100 ease-linear" style={{ width: `${pct}%`, background: low ? "#ff6b6b" : "var(--accent)" }} />
      </div>
      <span className={"min-w-[48px] text-right font-display text-2xl font-extrabold " + (low ? "game-throb" : "")}>{Math.ceil(left)}s</span>
      {extra}
    </div>
  );
}

/** The play area: a rounded panel that fills the screen below the HUD and never scrolls while playing. */
export function Arena({ children, className = "", ...rest }: { children: ReactNode; className?: string } & ComponentPropsWithRef<"div">) {
  return (
    <div
      {...rest}
      className={"game-arena relative w-full flex-1 touch-none select-none overflow-hidden " + className}
      style={{ borderRadius: "var(--radius)", border: "var(--border-width) solid var(--surface-border)", background: "color-mix(in srgb, var(--surface) 70%, transparent)", minHeight: 360, ...(rest.style ?? {}) }}
    >
      {children}
    </div>
  );
}

/** Falling confetti for celebrations. */
export function Confetti({ pieces = 60 }: { pieces?: number }) {
  const [bits] = useState(() =>
    Array.from({ length: pieces }, (_, i) => ({
      i,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      dur: 1.8 + Math.random() * 1.6,
      color: ["#ffd166", "#ff6b9a", "#7ee8d4", "#93d8fb", "#c4b5fd", "#ffa94d"][i % 6],
      size: 8 + Math.random() * 8,
      spin: Math.random() > 0.5 ? 1 : -1,
    })),
  );
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {bits.map((b) => (
        <span
          key={b.i}
          className="confetti-bit absolute top-[-20px] block"
          style={{ left: `${b.left}%`, width: b.size, height: b.size * 0.6, background: b.color, animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s`, ["--spin" as string]: b.spin }}
        />
      ))}
    </div>
  );
}
