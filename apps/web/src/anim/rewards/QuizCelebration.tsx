import type { CSSProperties } from "react";
import { RewardBurst } from "./RewardBurst";
import "./rewards.css";

const STAR = "M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2 6.3 20.3l1.2-6.4L2.8 9.5l6.4-.8z";
const GOLD = "#ffd166";
const INK = "#161a40";

function Trophy({ grand }: { grand: boolean }) {
  return (
    <svg className="qc-trophy" viewBox="0 0 120 120" aria-hidden="true">
      <path d="M30 22h60v26a30 30 0 0 1-60 0z" fill={GOLD} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M30 30H14c0 20 8 30 20 32M90 30h16c0 20-8 30-20 32" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M60 78v14M42 104h36l-4-12H46z" fill={GOLD} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d={STAR} transform="translate(40 26) scale(1.7)" fill={grand ? "#ffffff" : INK} stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The big "you passed" picture: a trophy that bounces in, sparkles and the stars earned.
 * Stars earned are solid, stars not earned are empty outlines, so the number is clear without colour.
 * A grand quiz pass is bigger. Calm mode and "reduce motion" show it still.
 */
export function QuizCelebration({ stars, grand = false }: { stars: number; grand?: boolean }) {
  const size = grand ? 210 : 150;
  const sparkles: [number, number, number][] = [[-8, 6, 0], [88, 0, 0.5], [96, 62, 1.1], [-14, 66, 1.6]];
  return (
    <div className="qc-wrap" style={{ "--qc-size": `${size}px` } as CSSProperties} data-grand={grand ? "true" : undefined}>
      <div className="qc-stage">
        <RewardBurst count={grand ? 22 : 14} radius={grand ? 190 : 130} />
        <Trophy grand={grand} />
        {sparkles.map(([x, y, d], i) => (
          <span key={i} className="qc-sparkle" aria-hidden="true" style={{ left: `${x}%`, top: `${y}%`, "--delay": `${d}s` } as CSSProperties}>
            <svg viewBox="0 0 24 24"><path d="M12 1l2.4 8.6L23 12l-8.6 2.4L12 23l-2.4-8.6L1 12l8.6-2.4z" fill={GOLD} stroke={INK} strokeWidth="1.4" strokeLinejoin="round" /></svg>
          </span>
        ))}
      </div>
      <div className="qc-stars" role="img" aria-label={`${stars} out of 3 stars`}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="qc-star" style={{ "--delay": `${0.5 + i * 0.25}s` } as CSSProperties}>
            <svg width={grand ? 52 : 40} height={grand ? 52 : 40} viewBox="0 0 24 24">
              <path d={STAR} fill={i < stars ? GOLD : "none"} stroke={i < stars ? INK : "currentColor"} strokeWidth="1.8" strokeLinejoin="round" strokeDasharray={i < stars ? undefined : "3 2.4"} style={{ opacity: i < stars ? 1 : 0.55 }} />
            </svg>
          </span>
        ))}
      </div>
      {grand && <p className="font-display text-3xl font-extrabold">Grand quiz champion!</p>}
    </div>
  );
}
