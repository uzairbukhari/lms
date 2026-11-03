import { useEffect, useRef, useState } from "react";
import type { ThemeId } from "@lms/schema";
import { onGuideMood, useSpeaking, type Mood } from "./cues";

// The lesson guide: one original character per theme. Each is drawn as SVG with named parts (body, eyes, mouth,
// arms) that CSS animates by mood: idle bobbing, talking while narration plays, pointing at the stage, cheering,
// thinking and waving. Every part is decorative; the guide never carries information a child needs.

export const GUIDE_NAMES: Record<ThemeId, string> = { space: "Bleep", candy: "Jelly", sunny: "Sunny", forest: "Hoot" };

const Eyes = ({ cx1, cx2, cy, r = 7, pupil = "#1d1b2e" }: { cx1: number; cx2: number; cy: number; r?: number; pupil?: string }) => (
  <g className="g-eyes">
    <circle cx={cx1} cy={cy} r={r} fill="#fff" /><circle cx={cx2} cy={cy} r={r} fill="#fff" />
    <circle className="g-pupil" cx={cx1 + 1} cy={cy + 1} r={r * 0.55} fill={pupil} /><circle className="g-pupil" cx={cx2 + 1} cy={cy + 1} r={r * 0.55} fill={pupil} />
    <circle cx={cx1 + 2.5} cy={cy - 2} r={r * 0.2} fill="#fff" /><circle cx={cx2 + 2.5} cy={cy - 2} r={r * 0.2} fill="#fff" />
  </g>
);

function Bleep() {
  return (
    <svg viewBox="0 0 120 140" aria-hidden="true">
      <ellipse cx="60" cy="134" rx="30" ry="5" fill="#000" opacity="0.18" className="g-shadow" />
      <g className="g-body">
        <line x1="60" y1="22" x2="60" y2="8" stroke="#9aa7c7" strokeWidth="4" strokeLinecap="round" />
        <circle className="g-bulb" cx="60" cy="7" r="6" fill="#ffd166" />
        <g className="g-arm-l"><path d="M24 82 q-14 6 -16 22" stroke="#9aa7c7" strokeWidth="8" fill="none" strokeLinecap="round" /><circle cx="8" cy="106" r="6" fill="#5ad1ff" /></g>
        <g className="g-arm-r"><path d="M96 82 q14 6 16 22" stroke="#9aa7c7" strokeWidth="8" fill="none" strokeLinecap="round" /><circle cx="112" cy="106" r="6" fill="#5ad1ff" /></g>
        <rect x="28" y="70" width="64" height="52" rx="16" fill="#c9d3ea" stroke="#6b7aa3" strokeWidth="3" />
        <circle cx="60" cy="96" r="9" fill="#5ad1ff" className="g-heart" />
        <rect x="18" y="20" width="84" height="56" rx="20" fill="#e3e9f7" stroke="#6b7aa3" strokeWidth="3" />
        <rect x="27" y="29" width="66" height="38" rx="13" fill="#1d2550" />
        <Eyes cx1={46} cx2={74} cy={45} r={7} pupil="#5ad1ff" />
        <g className="g-mouth"><rect x="50" y="56" width="20" height="5" rx="2.5" fill="#5ad1ff" /></g>
      </g>
    </svg>
  );
}

function Jelly() {
  return (
    <svg viewBox="0 0 120 140" aria-hidden="true">
      <ellipse cx="60" cy="134" rx="32" ry="5" fill="#000" opacity="0.18" className="g-shadow" />
      <g className="g-body">
        <g className="g-arm-l"><path d="M24 92 q-14 -2 -18 12" stroke="#ff6b9a" strokeWidth="9" fill="none" strokeLinecap="round" /></g>
        <g className="g-arm-r"><path d="M96 92 q14 -2 18 12" stroke="#ff6b9a" strokeWidth="9" fill="none" strokeLinecap="round" /></g>
        <path d="M60 10 C82 34 102 58 102 88 C102 114 84 130 60 130 C36 130 18 114 18 88 C18 58 38 34 60 10 Z" fill="#ff8fb4" stroke="#e0507f" strokeWidth="3" />
        <path d="M44 40 C38 52 34 62 34 74" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.6" fill="none" />
        <circle cx="38" cy="96" r="6" fill="#ff5c8d" opacity="0.5" /><circle cx="82" cy="96" r="6" fill="#ff5c8d" opacity="0.5" />
        <circle cx="50" cy="30" r="2.5" fill="#ffd166" /><circle cx="70" cy="58" r="2.5" fill="#7ee8d4" /><circle cx="78" cy="40" r="2.5" fill="#93d8fb" />
        <Eyes cx1={46} cx2={74} cy={82} r={8} />
        <g className="g-mouth"><path d="M50 102 q10 10 20 0" stroke="#7a1f3d" strokeWidth="4" fill="#7a1f3d" strokeLinecap="round" /></g>
      </g>
    </svg>
  );
}

function Sunny() {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg viewBox="0 0 120 140" aria-hidden="true">
      <ellipse cx="60" cy="134" rx="26" ry="5" fill="#000" opacity="0.18" className="g-shadow" />
      <g className="g-body">
        <path d="M60 88 L60 132" stroke="#3f9a3a" strokeWidth="7" strokeLinecap="round" />
        <g className="g-arm-l"><path d="M60 112 q-26 -4 -34 -20 q18 0 34 20" fill="#5cc04f" stroke="#3f9a3a" strokeWidth="2" /></g>
        <g className="g-arm-r"><path d="M60 118 q26 -4 34 -20 q-18 0 -34 20" fill="#5cc04f" stroke="#3f9a3a" strokeWidth="2" /></g>
        <g className="g-petals">{petals.map((a) => <ellipse key={a} cx="60" cy="18" rx="9" ry="17" fill="#ffc83d" stroke="#e8a500" strokeWidth="2" transform={`rotate(${a} 60 52)`} />)}</g>
        <circle cx="60" cy="52" r="27" fill="#8a5a2b" stroke="#6b4320" strokeWidth="3" />
        <Eyes cx1={50} cx2={70} cy={48} r={6.5} />
        <circle cx="42" cy="60" r="4" fill="#ff8f6b" opacity="0.6" /><circle cx="78" cy="60" r="4" fill="#ff8f6b" opacity="0.6" />
        <g className="g-mouth"><path d="M52 62 q8 8 16 0" stroke="#3d220b" strokeWidth="3.5" fill="#3d220b" strokeLinecap="round" /></g>
      </g>
    </svg>
  );
}

function Hoot() {
  return (
    <svg viewBox="0 0 120 140" aria-hidden="true">
      <ellipse cx="60" cy="134" rx="30" ry="5" fill="#000" opacity="0.18" className="g-shadow" />
      <g className="g-body">
        <g className="g-arm-l"><path d="M26 64 q-16 22 -6 52 q10 -10 14 -30" fill="#8b5e3c" stroke="#5e3d24" strokeWidth="2" /></g>
        <g className="g-arm-r"><path d="M94 64 q16 22 6 52 q-10 -10 -14 -30" fill="#8b5e3c" stroke="#5e3d24" strokeWidth="2" /></g>
        <path d="M30 34 L24 10 L46 26 Z M90 34 L96 10 L74 26 Z" fill="#8b5e3c" stroke="#5e3d24" strokeWidth="2" />
        <ellipse cx="60" cy="76" rx="36" ry="52" fill="#a8744a" stroke="#5e3d24" strokeWidth="3" />
        <ellipse cx="60" cy="92" rx="22" ry="30" fill="#f1d9b5" />
        <path d="M50 88 q4 4 8 0 M62 98 q4 4 8 0 M50 108 q4 4 8 0" stroke="#c9a77c" strokeWidth="2" fill="none" />
        <circle cx="45" cy="50" r="15" fill="#f1d9b5" /><circle cx="75" cy="50" r="15" fill="#f1d9b5" />
        <Eyes cx1={45} cx2={75} cy={50} r={10} />
        <g className="g-mouth"><path d="M55 62 L65 62 L60 72 Z" fill="#ffb02e" stroke="#c97c00" strokeWidth="1.5" /></g>
        <path d="M44 128 l-4 6 M50 128 l0 7 M70 128 l0 7 M76 128 l4 6" stroke="#ffb02e" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

const ART: Record<ThemeId, () => React.JSX.Element> = { space: Bleep, candy: Jelly, sunny: Sunny, forest: Hoot };

/** The guide in its corner. `base` is its resting mood for this slide; checks and new stops change it for a moment. */
export function Guide({ theme, base = "idle", visible = true }: { theme: ThemeId; base?: Mood; visible?: boolean }) {
  const speaking = useSpeaking();
  const [flash, setFlash] = useState<Mood | null>(null);
  const timer = useRef(0);
  useEffect(() => onGuideMood((m) => {
    window.clearTimeout(timer.current);
    setFlash(m);
    timer.current = window.setTimeout(() => setFlash(null), m === "think" ? 2600 : 1900);
  }), []);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const mood: Mood = flash ?? (base === "point" || base === "wave" ? base : speaking ? "talk" : base);
  const Art = ART[theme] ?? Bleep;
  return (
    <div aria-hidden="true" className={`guide guide--${mood} guide--${theme} ${visible ? "guide--in" : "guide--out"} ${speaking ? "guide--speaking" : ""}`}>
      {mood === "think" && <span className="guide-bubble">?</span>}
      {mood === "cheer" && <span className="guide-bubble guide-bubble--star">★</span>}
      <Art />
    </div>
  );
}
