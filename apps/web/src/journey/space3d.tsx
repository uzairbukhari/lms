import { useEffect, useRef, useState } from "react";
import { getCalm } from "../anim/cues";
import "./space3d.css";

// The 3D Space Explorers art for the journey map (pictures and clips made in Nano Banana and Google Flow).
const A = "/journey/space";
export const SPACE = {
  stop: (n: number) => `${A}/stop-${String(n).padStart(2, "0")}.webp`,
  launchpad: `${A}/start-launchpad.webp`, castle: `${A}/finish-castle.webp`, rocket: `${A}/rocket.webp`, rocketSide: `${A}/rocket-side.webp`,
  chestClosed: `${A}/chest-closed.webp`, chestOpen: `${A}/chest-open.webp`, coin: `${A}/coin.webp`, star: `${A}/star-gold.webp`, lock: `${A}/lock.webp`,
  intro: `${A}/intro.mp4`, arrive: `${A}/arrive.mp4`, chest: `${A}/chest.mp4`, finish: `${A}/finish.mp4`, introPoster: `${A}/intro-poster.jpg`,
};

/** True when motion should be kept to a minimum (reduce-motion setting or Calm mode). */
export const calmMotion = () => {
  try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches || getCalm(); } catch { return false; }
};

const SPARKS = Array.from({ length: 16 }, (_, i) => ({ i, left: (i * 37 + 11) % 96, top: (i * 53 + 7) % 94, size: 14 + ((i * 7) % 20), delay: (i * 0.41) % 3.4 }));
const ROCKS = [
  { src: `${A}/asteroid.webp`, left: "-4%", top: "18%", w: 110, delay: 0 },
  { src: `${A}/asteroid.webp`, left: "86%", top: "40%", w: 70, delay: 3 },
  { src: `${A}/asteroid.webp`, left: "4%", top: "72%", w: 56, delay: 6 },
];

/** Moving space behind the map: tiled stars, two drifting nebulae, floating asteroids and twinkles. */
export function SpaceBackdrop() {
  return (
    <div className="sp-bg" aria-hidden="true">
      <div className="tile" />
      <img className="neb a" src={`${A}/nebula.webp`} alt="" />
      <img className="neb b" src={`${A}/nebula.webp`} alt="" />
      {ROCKS.map((r, i) => <img key={i} className="rock" src={r.src} alt="" width={r.w} style={{ left: r.left, top: r.top, width: r.w, animationDelay: `${r.delay}s`, filter: "brightness(0.8)" }} />)}
      {SPARKS.map((s) => <img key={s.i} className="spark" src={`${A}/sparkle.webp`} alt="" style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, animationDelay: `${s.delay}s` }} />)}
    </div>
  );
}

/** A full-screen or card-sized clip that closes itself when it ends (or when tapped, or if the browser will not play it). */
export function ClipOverlay({ src, poster, mode, onDone, skipLabel = "Skip" }: { src: string; poster?: string; mode: "full" | "card"; onDone: () => void; skipLabel?: string }) {
  const [out, setOut] = useState(false);
  const done = useRef(false);
  const finish = () => {
    if (done.current) return;
    done.current = true;
    setOut(true);
    setTimeout(onDone, 600);
  };
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.play().catch(() => finish());
    const guard = setTimeout(finish, 12000);
    return () => clearTimeout(guard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={`sp-clip ${mode} ${out ? "out" : ""}`} role="dialog" aria-modal="true" aria-label="Animation" onClick={finish}>
      <video ref={ref} src={src} poster={poster} muted playsInline preload="auto" onEnded={finish} onError={finish} />
      <button type="button" className="btn sp-skip" onClick={(e) => { e.stopPropagation(); finish(); }}>{skipLabel}</button>
    </div>
  );
}

/** Once a day, per child, the intro clip plays when the map opens. */
export function useIntroToday(userId: string | undefined, enabled: boolean) {
  const [show, setShow] = useState(() => {
    if (!enabled || !userId || calmMotion()) return false;
    const key = `lms-journey-intro-${userId}`;
    const today = new Date().toISOString().slice(0, 10);
    try {
      if (localStorage.getItem(key) === today) return false;
      localStorage.setItem(key, today);
    } catch { /* private mode: play it */ }
    return true;
  });
  return [show, () => setShow(false)] as const;
}

/** The treasure chest on the game result card: wiggles shut, bursts open with coins when it opens. */
export function SpaceChest({ open }: { open: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => { if (open) ref.current?.play().catch(() => setFailed(true)); }, [open]);
  if (calmMotion() || failed) return <img src={open ? SPACE.chestOpen : SPACE.chestClosed} alt="" width={120} className={open ? "chest-burst" : ""} />;
  return open
    ? <video ref={ref} className="sp-chest-video" src={SPACE.chest} muted playsInline preload="auto" onError={() => setFailed(true)} />
    : <img src={SPACE.chestClosed} alt="" width={140} className="chest-wiggle" />;
}
