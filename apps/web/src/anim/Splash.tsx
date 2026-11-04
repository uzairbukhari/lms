import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { KidPuppet, preloadKids, runSteps, type Kid, type PoseStep } from "./Kids";
import { isCalm } from "./cues";

// The splash screen shown each time a student opens the app, before the login screen. Fatima, Zainab and Ibrahim
// star in a short scene (about five seconds). A different scene plays on every open: paper plane, letter blocks, pop-up
// book. Tap anywhere to skip. Calm mode and reduced motion get a still, gentle fade instead.

export type SplashScene = "plane" | "blocks" | "book";
export const SCENES: SplashScene[] = ["plane", "blocks", "book"];
export const SPLASH_MS = 5600;
export const SPLASH_CALM_MS = 2400;
const LAST = "lms-splash-last";

/** A different scene on every open: never the one shown last time (remembered in this browser), otherwise random. */
export function nextScene(rand: () => number = Math.random): SplashScene {
  let last = -1;
  try { last = Number(localStorage.getItem(LAST) ?? -1); } catch { /* private window: just pick one */ }
  const options = SCENES.map((_, i) => i).filter((i) => i !== last);
  const i = options[Math.floor(rand() * options.length)] ?? 0;
  try { localStorage.setItem(LAST, String(i)); } catch { /* ignore */ }
  return SCENES[i] as SplashScene;
}

const NAMES: Record<Kid, string> = { long: "Fatima", curly: "Zainab", boy: "Ibrahim" };
const HEIGHTS: Record<Kid, string> = { long: "58cqmin", curly: "54cqmin", boy: "48cqmin" };

type KidProps = { kid: Kid; x: string; bottom?: string; delay?: number; move?: string; inner?: string; tagAt?: number; z?: number; poses?: PoseStep[] };

function SplashKid({ kid, x, bottom = "9%", delay = 0, move = "", inner = "", tagAt = 3.3, z = 3, poses }: KidProps) {
  const style = { left: x, bottom, height: HEIGHTS[kid], zIndex: z, "--d": `${delay}s` } as CSSProperties;
  return (
    <div className="sp-kid" style={style}>
      <div className={`sp-move ${move}`}>
        <div className={`sp-in ${inner}`}>
          <KidPuppet kid={kid} steps={poses} />
          <span className="sp-tag" style={{ animationDelay: `${tagAt}s` }}>{NAMES[kid]}</span>
        </div>
      </div>
    </div>
  );
}

function Title({ className = "", delay = 3.4 }: { className?: string; delay?: number }) {
  return (
    <h1 className={`sp-title font-display ${className}`} style={{ animationDelay: `${delay}s` }}>
      Learning <span>Adventures</span>
    </h1>
  );
}

function Sparkles({ at, count = 14 }: { at: number; count?: number }) {
  return (
    <div className="sp-sparkles" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <i
          key={i}
          style={{
            "--a": `${(360 / count) * i}deg`,
            "--r": `${22 + (i % 3) * 9}cqmin`,
            animationDelay: `${at + (i % 4) * 0.04}s`,
            background: ["#ffd166", "#ff8fb4", "#7ee8d4", "#93d8fb", "#c7b6ff"][i % 5],
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

function Plane() {
  return (
    <svg viewBox="0 0 80 50" className="sp-plane" aria-hidden="true">
      <path d="M4 22 L76 4 L50 46 L40 30 Z" fill="#ffffff" stroke="#6b7aa3" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M4 22 L40 30 L76 4" fill="#e3e9f7" stroke="#6b7aa3" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M40 30 L36 44 L50 46 Z" fill="#c9d3ea" stroke="#6b7aa3" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

function PlaneScene() {
  return (
    <>
      <div className="sp-plane-wrap"><Plane /></div>
      <Title className="card" delay={3.0} />
      <SplashKid kid="long" x="20%" delay={0.1} inner="jump-late" poses={[[0.7, "wave"], [2.0, "stand"], [3.2, "cheer"]]} />
      <SplashKid kid="boy" x="6%" delay={0.3} move="sp-chase" inner="sp-hop" poses={[...runSteps(0.9, 3.2), [3.3, "cheer"]]} />
      <SplashKid kid="curly" x="82%" delay={0.2} inner="jump-late" poses={[[1.1, "catch"], [2.6, "stand"], [3.1, "cheer"]]} />
      <Sparkles at={3.0} />
    </>
  );
}

const LETTERS = [
  { ch: "L", c: "#ff7aa8" },
  { ch: "E", c: "#ffb347" },
  { ch: "A", c: "#58c4dd" },
  { ch: "R", c: "#7bd88f" },
  { ch: "N", c: "#b79cff" },
];

function BlocksScene() {
  return (
    <>
      <div className="sp-blocks">
        {LETTERS.map((b, i) => (
          <b key={b.ch} className={i === LETTERS.length - 1 ? "sp-block last" : "sp-block"} style={{ background: b.c, animationDelay: `${0.5 + i * 0.32}s` }}>
            {b.ch}
          </b>
        ))}
      </div>
      <SplashKid kid="long" x="20%" delay={0.1} inner="jump-late" poses={[[2.0, "catch"], [3.2, "cheer"]]} />
      <SplashKid kid="boy" x="50%" delay={0.25} inner="jump-late" poses={[[2.0, "catch"], [3.2, "cheer"]]} />
      <SplashKid kid="curly" x="80%" delay={0.2} inner="jump-late" poses={[[2.0, "catch"], [3.2, "cheer"]]} />
      <Title delay={3.5} />
      <Sparkles at={3.3} />
    </>
  );
}

function BookScene() {
  return (
    <>
      <SplashKid kid="long" x="30%" bottom="15%" delay={1.3} inner="pop-up" z={2} poses={[[1.5, "wave"], [3.2, "cheer"]]} />
      <SplashKid kid="boy" x="50%" bottom="15%" delay={1.8} inner="pop-up" z={2} poses={[[2.0, "wave"], [3.2, "cheer"]]} />
      <SplashKid kid="curly" x="70%" bottom="15%" delay={2.3} inner="pop-up" z={2} poses={[[2.5, "wave"], [3.2, "cheer"]]} />
      <div className="sp-book" aria-hidden="true">
        <div className="sp-book-back" />
        <div className="sp-page sp-page-l" /><div className="sp-page sp-page-r" />
        <div className="sp-cover" />
      </div>
      <Sparkles at={1.2} />
      <Sparkles at={2.9} count={10} />
      <Title delay={3.4} />
    </>
  );
}

function Backdrop(): ReactNode {
  return (
    <div className="sp-bg" aria-hidden="true">
      <div className="sp-sun" />
      <div className="sp-cloud c1" /><div className="sp-cloud c2" /><div className="sp-cloud c3" />
      <div className="sp-hill h1" /><div className="sp-hill h2" />
      <div className="sp-ground" />
    </div>
  );
}

export function Splash({ onDone, scene }: { onDone: () => void; scene?: SplashScene }) {
  const calm = useRef(isCalm()).current;
  const pick = useRef(scene ?? nextScene()).current;
  const [leaving, setLeaving] = useState(false);
  const [ready, setReady] = useState(false);
  const done = useRef(false);

  function finish(fast: boolean) {
    if (done.current) return;
    done.current = true;
    setLeaving(true);
    window.setTimeout(onDone, fast ? 260 : 520);
  }

  // Wait for the pose images (a second or less, then cached) so the scene never starts with missing children.
  useEffect(() => { void preloadKids().then(() => setReady(true)); }, []);

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => finish(false), calm ? SPLASH_CALM_MS : SPLASH_MS);
    const key = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish(true); };
    window.addEventListener("keydown", key);
    return () => { window.clearTimeout(t); window.removeEventListener("keydown", key); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <div
      className={`splash ${leaving ? "splash-out" : ""} ${calm ? "splash-calm" : `splash-${pick}`}`}
      role="dialog"
      aria-label="Welcome to Learning Adventures"
      data-scene={calm ? "calm" : pick}
      onPointerDown={() => finish(true)}
    >
      <div className="sp-stage">
        <Backdrop />
        {!ready ? null : calm ? (
          <>
            <SplashKid kid="long" x="30%" delay={0} tagAt={0.3} />
            <SplashKid kid="boy" x="50%" delay={0} tagAt={0.3} />
            <SplashKid kid="curly" x="70%" delay={0} tagAt={0.3} />
            <Title delay={0.2} />
          </>
        ) : pick === "plane" ? <PlaneScene /> : pick === "blocks" ? <BlocksScene /> : <BookScene />}
        {ready && <p className="sp-skip">Tap to skip</p>}
      </div>
    </div>
  );
}
