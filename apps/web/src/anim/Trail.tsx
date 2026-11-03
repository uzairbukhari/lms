import { useEffect, useRef, useState } from "react";
import type { ThemeId } from "@lms/schema";
import type { Slide } from "@lms/schema";
import { onStar } from "./cues";
import { sfx } from "../lib/sound";

// The progress bar as a trail: a flag for each stop, a little token for the child that slides along as they go, and
// stars that fly in when a check is answered right.

const TOKEN: Record<ThemeId, string> = { space: "🚀", candy: "🍬", sunny: "🌻", forest: "🦉" };

export function Trail({ slides, index, theme }: { slides: Slide[]; index: number; theme: ThemeId }) {
  const last = Math.max(1, slides.length - 1);
  const pct = (i: number) => (i / last) * 100;
  const flags: { i: number; n: number }[] = [];
  slides.forEach((s, i) => { if (s.kind === "content" && s.stop && s.stop !== slides[i - 1]?.stop) flags.push({ i, n: s.stop }); });
  const token = useRef<HTMLSpanElement>(null);
  const [stars, setStars] = useState<{ id: number; x: number; y: number; tx: number; ty: number }[]>([]);
  const [bump, setBump] = useState(0);
  useEffect(() => onStar((x, y) => {
    const r = token.current?.getBoundingClientRect();
    if (!r) return;
    const id = Date.now() + Math.random();
    setStars((s) => [...s, { id, x, y, tx: r.left + r.width / 2, ty: r.top + r.height / 2 }]);
    window.setTimeout(() => { setStars((s) => s.filter((t) => t.id !== id)); setBump((b) => b + 1); sfx("coin"); }, 900);
  }), []);
  return (
    <div className="trail relative h-9" aria-hidden="true">
      <div className="trail-track absolute inset-x-3 top-1/2 h-3 -translate-y-1/2 rounded-full border-2 border-line bg-surface">
        <div className="h-full rounded-full bg-accent transition-all duration-700 ease-out" style={{ width: `${pct(index)}%` }} />
      </div>
      <div className="absolute inset-x-3 inset-y-0">
        {flags.map((f) => (
          <span key={f.i} className={`trail-flag ${index >= f.i ? "trail-flag--done" : ""}`} style={{ left: `${pct(f.i)}%` }}>⚑</span>
        ))}
        <span className="trail-goal" style={{ left: "100%" }}>🏁</span>
        <span ref={token} key={bump} className={`trail-token ${bump ? "trail-token--bump" : ""}`} style={{ left: `${pct(index)}%` }}>{TOKEN[theme]}</span>
      </div>
      {stars.map((s) => (
        <span key={s.id} className="fly-star" style={{ left: s.x, top: s.y, ["--dx" as string]: `${s.tx - s.x}px`, ["--dy" as string]: `${s.ty - s.y}px` }}>⭐</span>
      ))}
    </div>
  );
}
