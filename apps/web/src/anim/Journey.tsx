import { useEffect, useState } from "react";
import type { ThemeId } from "@lms/schema";
import { Guide } from "./Guide";
import { sfx } from "../lib/sound";

// A two-second trip between stops: the guide walks along a little path from the last flag to the next one while the
// voice reads the new stop's heading. Tapping anywhere skips it. Not shown in Calm mode.

const STOP = /^\s*stop\s*(\d+)\s*[:.\-–]?\s*/i;

/** A flag's label: the number from "Stop 2: ..." headings, a star for a welcome or any other heading. */
export function stopLabel(title: string): string {
  return title.match(STOP)?.[1] ?? "★";
}

export function Journey({ theme, from, to, titles, onDone }: { theme: ThemeId; from: number; to: number; titles: string[]; onDone: () => void }) {
  const [walk, setWalk] = useState(false);
  useEffect(() => {
    sfx("whoosh");
    const a = window.setTimeout(() => { setWalk(true); sfx("step"); }, 250);
    const b = window.setTimeout(() => sfx("step"), 700);
    const c = window.setTimeout(() => sfx("sparkle"), 1300);
    const d = window.setTimeout(onDone, 2300);
    return () => [a, b, c, d].forEach((t) => window.clearTimeout(t));
  }, [onDone]);
  const total = titles.length;
  const title = titles[to - 1] ?? "";
  const num = title.match(STOP)?.[1];
  const xAt = (k: number) => 8 + (84 * (k - 1)) / Math.max(1, total - 1);
  const at = xAt(walk ? to : Math.max(1, from));
  return (
    <div className="journey" role="presentation" onClick={onDone}>
      <div className="journey-card">
        <p className="journey-title">{num && <span className="journey-stop">Stop {num}</span>} {title.replace(STOP, "")}</p>
        <div className="journey-road">
          <svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true"><path d="M2 12 Q 25 2 50 12 T 98 12" className="journey-path" /></svg>
          {titles.map((t, i) => (
            <span key={i} className={`journey-flag ${i + 1 <= (walk ? to : from) ? "journey-flag--done" : ""} ${i + 1 === to ? "journey-flag--next" : ""}`} style={{ left: `${xAt(i + 1)}%` }}>⚑<b>{stopLabel(t)}</b></span>
          ))}
          <span className={`journey-walker ${walk ? "journey-walker--go" : ""}`} style={{ left: `${at}%` }}><Guide theme={theme} base="idle" /></span>
        </div>
      </div>
    </div>
  );
}
