import type { CSSProperties } from "react";
import { PASTELS } from "../../lib/topic";
import "./rewards.css";

const STAR = "M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2 6.3 20.3l1.2-6.4L2.8 9.5l6.4-.8z";
const DOT = "M12 4a8 8 0 1 0 0.01 0z";

/** Where each piece lands, from the centre: evenly spread round a circle with two rings. Pure, so it can be tested. */
export function burstPieces(count: number, radius: number): { dx: number; dy: number; rot: number; s: number; delay: number; colour: string; shape: "star" | "dot" }[] {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2 - Math.PI / 2;
    const r = radius * (i % 2 === 0 ? 1 : 0.68);
    return {
      dx: Math.round(Math.cos(a) * r), dy: Math.round(Math.sin(a) * r),
      rot: (i * 47) % 180 - 90, s: i % 3 === 0 ? 1.25 : 0.9, delay: (i % 4) * 0.06,
      colour: PASTELS[i % PASTELS.length]!, shape: i % 3 === 2 ? "dot" : "star",
    };
  });
}

/**
 * A burst of stars and dots from the middle of its parent (the parent should be position: relative).
 * Decorative only. Calm mode and "reduce motion" show the pieces still, in a ring (shape, not just colour, carries the picture).
 */
export function RewardBurst({ count = 14, radius = 120 }: { count?: number; radius?: number }) {
  return (
    <div className="rb" aria-hidden="true">
      {burstPieces(count, radius).map((p, i) => (
        <span key={i} className="rb-piece" style={{ "--dx": `${p.dx}px`, "--dy": `${p.dy}px`, "--rot": `${p.rot}deg`, "--s": p.s, "--delay": `${p.delay}s` } as CSSProperties}>
          <svg viewBox="0 0 24 24"><path d={p.shape === "star" ? STAR : DOT} fill={p.colour} stroke="#161a40" strokeWidth="1.4" strokeLinejoin="round" /></svg>
        </span>
      ))}
    </div>
  );
}
