import { useEffect, useState } from "react";
import { sfx } from "../lib/sound";

// Shown while something is loading. A rocket circles by planets while fun lines change underneath, and the child can
// tap the rocket to give it a boost so the wait feels like a little game rather than a blank screen.

const LINES = [
  "Warming up the rocket engines…",
  "Counting the stars…",
  "Packing your space snacks…",
  "Checking the map…",
  "Polishing the planets…",
  "Almost there…",
];

const CHEERS = ["Whoosh!", "Zoom!", "Boost!", "Wheee!", "Super fast!"];

export function Loader({ label, fullScreen = false }: { label: string; fullScreen?: boolean }) {
  const [line, setLine] = useState(0);
  const [boosts, setBoosts] = useState(0);
  const [jumping, setJumping] = useState(false);

  useEffect(() => {
    const t = window.setInterval(() => setLine((n) => (n + 1) % LINES.length), 2200);
    return () => window.clearInterval(t);
  }, []);

  const boost = () => {
    sfx("tap");
    setBoosts((n) => n + 1);
    setJumping(false);
    // Restart the jump animation even on quick repeat taps.
    requestAnimationFrame(() => setJumping(true));
  };

  return (
    <div className={`flex w-full flex-col items-center justify-center gap-5 px-4 text-center ${fullScreen ? "min-h-screen" : "min-h-[50vh]"}`}>
      <div className="relative grid size-48 place-items-center">
        <div className="loader-orbit absolute inset-0 rounded-full border-2 border-dashed border-line" aria-hidden="true">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">🪐</span>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-xl">🌙</span>
          <span className="absolute -left-3 top-1/2 -translate-y-1/2 text-xl">⭐</span>
          <span className="absolute -right-3 top-1/2 -translate-y-1/2 text-xl">🌍</span>
        </div>
        <button
          type="button"
          onClick={boost}
          onAnimationEnd={() => setJumping(false)}
          aria-label="Give the rocket a boost"
          className={`grid size-24 place-items-center rounded-full text-6xl ${jumping ? "loader-jump" : "float"}`}
        >
          🚀
        </button>
      </div>
      <p role="status" className="font-display text-2xl font-bold">{label}</p>
      <p key={line} aria-hidden="true" className="pop-in text-lg text-muted">{LINES[line]}</p>
      <div className="flex gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => <span key={i} className="loader-dot size-3 rounded-full bg-accent" style={{ animationDelay: `${i * 0.15}s` }} />)}
      </div>
      <p className="min-h-7 text-lg font-bold text-muted">
        {boosts === 0 ? "Tap the rocket to give it a boost!" : `${CHEERS[(boosts - 1) % CHEERS.length]} ${boosts} ${boosts === 1 ? "boost" : "boosts"}`}
      </p>
    </div>
  );
}
