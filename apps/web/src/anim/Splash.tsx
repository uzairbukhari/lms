import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { getSoundOn, probeAutoplay } from "../lib/sound";
import { playSplashSounds } from "./splashSound";
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

type KidProps = { kid: Kid; x: string; bottom?: string; delay?: number; move?: string; inner?: string; tagAt?: number; z?: number; poses?: PoseStep[]; tag?: boolean };

function SplashKid({ kid, x, bottom = "9%", delay = 0, move = "", inner = "", tagAt = 3.3, z = 3, poses, tag = true }: KidProps) {
  const style = { left: x, bottom, height: HEIGHTS[kid], zIndex: z, "--d": `${delay}s` } as CSSProperties;
  return (
    <div className="sp-kid" style={style}>
      <div className={`sp-move ${move}`}>
        <div className={`sp-in ${inner}`}>
          <KidPuppet kid={kid} steps={poses} />
          {tag && <span className="sp-tag" style={{ animationDelay: `${tagAt}s` }}>{NAMES[kid]}</span>}
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
  return <img src="/splash/plane.webp" className="sp-plane" alt="" draggable={false} />;
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

const LETTERS = ["l", "e", "a", "r", "n"];

function BlocksScene() {
  return (
    <>
      <div className="sp-blocks">
        {LETTERS.map((ch, i) => (
          <img
            key={ch}
            src={`/splash/block-${ch}.webp`}
            alt=""
            draggable={false}
            className={i === LETTERS.length - 1 ? "sp-block last" : "sp-block"}
            style={{ animationDelay: `${0.5 + i * 0.32}s` }}
          />
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
      <SplashKid kid="long" x="30%" tag={false} bottom="15%" delay={1.3} inner="pop-up" z={2} poses={[[1.5, "wave"], [3.2, "cheer"]]} />
      <SplashKid kid="boy" x="50%" tag={false} bottom="15%" delay={1.8} inner="pop-up" z={2} poses={[[2.0, "wave"], [3.2, "cheer"]]} />
      <SplashKid kid="curly" x="70%" tag={false} bottom="15%" delay={2.3} inner="pop-up" z={2} poses={[[2.5, "wave"], [3.2, "cheer"]]} />
      <img className="sp-book" src="/splash/book.webp" alt="" draggable={false} />
      <div className="sp-booktags" aria-hidden="true">
        <span style={{ left: "30%" }}>{NAMES.long}</span><span style={{ left: "50%" }}>{NAMES.boy}</span><span style={{ left: "70%" }}>{NAMES.curly}</span>
      </div>
      <Sparkles at={1.2} />
      <Sparkles at={2.9} count={10} />
      <Title delay={3.4} />
    </>
  );
}

const CLOUDS = [
  { n: 2, top: "7%", left: "6%", w: "26cqmin", dur: "26s", delay: "-4s" },
  { n: 4, top: "20%", left: "40%", w: "18cqmin", dur: "20s", delay: "-9s" },
  { n: 5, top: "11%", left: "62%", w: "20cqmin", dur: "32s", delay: "-15s" },
  { n: 3, top: "30%", left: "78%", w: "16cqmin", dur: "24s", delay: "-2s" },
];

function Backdrop(): ReactNode {
  return (
    <div className="sp-bg" aria-hidden="true">
      <img className="sp-bgimg" src="/splash/background.webp" alt="" draggable={false} />
      <img className="sp-sun" src="/splash/sun.webp" alt="" draggable={false} />
      {CLOUDS.map((c) => (
        <img
          key={c.n}
          className="sp-cloud"
          src={`/splash/cloud-${c.n}.webp`}
          alt=""
          draggable={false}
          style={{ top: c.top, left: c.left, width: c.w, animationDuration: c.dur, animationDelay: c.delay }}
        />
      ))}
    </div>
  );
}

/** Before the scene when the browser would keep it silent: one tap starts the show, with sound. */
function SoundGate({ onPlay, onSkip }: { onPlay: () => void; onSkip: () => void }) {
  return (
    <>
      <Title delay={0.2} />
      <SplashKid kid="long" x="30%" delay={0.1} tagAt={0.6} poses={[[0.5, "wave"]]} />
      <SplashKid kid="boy" x="50%" delay={0.2} tagAt={0.7} poses={[[0.7, "wave"]]} />
      <SplashKid kid="curly" x="70%" delay={0.3} tagAt={0.8} poses={[[0.9, "wave"]]} />
      <button type="button" className="sp-play font-display" onClick={onPlay}>
        <span aria-hidden="true">▶</span> Tap to play
      </button>
      <button type="button" className="sp-skipbtn" onClick={(e) => { e.stopPropagation(); onSkip(); }}>
        Skip
      </button>
    </>
  );
}

export function Splash({ onDone, scene }: { onDone: () => void; scene?: SplashScene }) {
  const calm = useRef(isCalm()).current;
  // Chosen once for this opening. (Choosing during render re-ran every render and scrambled the "last scene" memory.)
  const [pick] = useState<SplashScene>(() => scene ?? nextScene());
  const [leaving, setLeaving] = useState(false);
  const [ready, setReady] = useState(false);
  /** checking: asking the browser about sound; gate: waiting for a tap so it can play sound; playing: the show. */
  const [mode, setMode] = useState<"checking" | "gate" | "playing">("checking");
  const done = useRef(false);

  function finish(fast: boolean) {
    if (done.current) return;
    done.current = true;
    setLeaving(true);
    window.setTimeout(onDone, fast ? 260 : 520);
  }

  // Wait for the pose images (a second or less, then cached) so the scene never starts with missing children.
  useEffect(() => { void preloadKids().then(() => setReady(true)); }, []);

  // Silent splash for Calm mode or when sound is off. Otherwise, if the browser would block sound, ask for a tap first.
  useEffect(() => {
    if (calm || !getSoundOn()) { setMode("playing"); return; }
    let live = true;
    void probeAutoplay().then((ok) => { if (live) setMode(ok ? "playing" : "gate"); });
    return () => { live = false; };
  }, [calm]);

  const playing = ready && mode === "playing";

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => finish(false), calm ? SPLASH_CALM_MS : SPLASH_MS);
    const stopSounds = calm ? () => undefined : playSplashSounds(pick);
    const key = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish(true); };
    window.addEventListener("keydown", key);
    return () => { window.clearTimeout(t); stopSounds(); window.removeEventListener("keydown", key); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  return (
    <div
      className={`splash ${leaving ? "splash-out" : ""} ${calm ? "splash-calm" : `splash-${pick}`}`}
      role="dialog"
      aria-label="Welcome to Learning Adventures"
      data-scene={calm ? "calm" : pick}
      data-mode={mode}
      onPointerDown={() => { if (playing) finish(true); }}
    >
      <div className="sp-stage">
        <Backdrop />
        {!ready || mode === "checking" ? null : mode === "gate" ? (
          <SoundGate onPlay={() => setMode("playing")} onSkip={() => finish(true)} />
        ) : calm ? (
          <>
            <SplashKid kid="long" x="30%" delay={0} tagAt={0.3} />
            <SplashKid kid="boy" x="50%" delay={0} tagAt={0.3} />
            <SplashKid kid="curly" x="70%" delay={0} tagAt={0.3} />
            <Title delay={0.2} />
          </>
        ) : pick === "plane" ? <PlaneScene /> : pick === "blocks" ? <BlocksScene /> : <BookScene />}
        {playing && <p className="sp-skip">Tap to skip</p>}
      </div>
    </div>
  );
}
