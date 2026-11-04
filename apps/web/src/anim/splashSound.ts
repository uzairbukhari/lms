import { audioRunning, playNotes, playNoise, sfx } from "../lib/sound";
import type { SplashScene } from "./Splash";

// The sounds for the splash scenes, all synthesised (no audio files): pops as the children appear, a whoosh for the
// plane, xylophone notes as the letter blocks land, page flutters for the book, a fanfare when they cheer. Each scene
// is a timeline of [seconds after the scene starts, sound], kept next to the animation timings in Splash.tsx.

export type SplashFx =
  | "pop" | "sparkle" | "coin" | "fanfare" | "unlock" | "tick" | "step" | "step2"
  | "throw" | "fly" | "loop" | "thud" | "flutter" | "gasp"
  | "do" | "re" | "mi" | "fa" | "sol" | "boing1" | "boing2" | "boing3" | "wobble" | "wobble2";

export type SplashEvent = { at: number; fx: SplashFx };

const ev = (at: number, fx: SplashFx): SplashEvent => ({ at, fx });

const NOTE: Record<"do" | "re" | "mi" | "fa" | "sol", number> = { do: 523, re: 587, mi: 659, fa: 698, sol: 784 };

/** What plays, and when, in each scene. */
export function soundTimeline(scene: SplashScene): SplashEvent[] {
  if (scene === "plane") {
    const steps: SplashEvent[] = [];
    for (let t = 0.95, i = 0; t < 3.1; t += 0.32, i++) steps.push(ev(t, i % 2 ? "step2" : "step"));
    return [
      ev(0.15, "pop"), ev(0.25, "pop"), ev(0.35, "pop"),
      ev(0.75, "throw"), ev(0.95, "fly"), ev(2.15, "loop"),
      ev(1.15, "gasp"),
      ...steps,
      ev(3.0, "unlock"), ev(3.1, "sparkle"), ev(3.25, "fanfare"),
    ];
  }
  if (scene === "blocks") {
    const notes: SplashFx[] = ["do", "re", "mi", "fa", "sol"];
    return [
      ev(0.15, "pop"), ev(0.3, "pop"), ev(0.4, "pop"),
      ...notes.map((fx, i) => ev(i === 4 ? 2.75 : 1.12 + i * 0.32, fx)),
      ev(2.0, "gasp"),
      ev(2.95, "wobble"), ev(3.2, "wobble2"), ev(3.45, "wobble2"),
      ev(3.25, "fanfare"), ev(3.5, "sparkle"), ev(3.6, "coin"),
    ];
  }
  return [
    ev(0.25, "thud"), ev(0.4, "pop"),
    ev(0.6, "flutter"), ev(0.75, "flutter"), ev(0.9, "flutter"),
    ev(1.2, "sparkle"),
    ev(1.45, "boing1"), ev(1.5, "sparkle"), ev(1.95, "boing2"), ev(2.0, "sparkle"), ev(2.45, "boing3"), ev(2.5, "sparkle"),
    ev(3.25, "fanfare"), ev(3.4, "sparkle"), ev(3.6, "coin"),
  ];
}

const FX: Record<SplashFx, () => void> = {
  pop: () => sfx("pop"),
  sparkle: () => sfx("sparkle"),
  coin: () => sfx("coin"),
  fanfare: () => sfx("fanfare"),
  unlock: () => sfx("unlock"),
  tick: () => sfx("tick"),
  step: () => playNotes([{ f: 440, at: 0, len: 0.05, type: "triangle", vol: 0.06 }]),
  step2: () => playNotes([{ f: 520, at: 0, len: 0.05, type: "triangle", vol: 0.06 }]),
  throw: () => playNoise({ len: 0.35, from: 500, to: 2200, vol: 0.09 }),
  fly: () => playNoise({ len: 1.9, from: 700, to: 1500, vol: 0.05, q: 0.9 }),
  loop: () => playNoise({ len: 0.5, from: 1800, to: 700, vol: 0.06 }),
  gasp: () => playNotes([{ f: 700, at: 0, len: 0.08, vol: 0.1 }, { f: 940, at: 0.07, len: 0.12, vol: 0.1 }]),
  thud: () => playNotes([{ f: 150, at: 0, len: 0.18, type: "sine", vol: 0.2 }, { f: 90, at: 0.04, len: 0.22, type: "sine", vol: 0.2 }]),
  flutter: () => playNoise({ len: 0.14, from: 3200, to: 1400, vol: 0.07, q: 2 }),
  do: () => block(NOTE.do),
  re: () => block(NOTE.re),
  mi: () => block(NOTE.mi),
  fa: () => block(NOTE.fa),
  sol: () => block(NOTE.sol),
  boing1: () => boing(523),
  boing2: () => boing(659),
  boing3: () => boing(784),
  wobble: () => playNotes([{ f: 392, at: 0, len: 0.14, type: "triangle", vol: 0.12 }, { f: 330, at: 0.1, len: 0.18, type: "triangle", vol: 0.12 }]),
  wobble2: () => playNotes([{ f: 440, at: 0, len: 0.1, type: "triangle", vol: 0.08 }, { f: 370, at: 0.08, len: 0.12, type: "triangle", vol: 0.08 }]),
};

/** A block landing: a soft thud under a bright xylophone note. */
function block(f: number): void {
  playNotes([
    { f: 130, at: 0, len: 0.12, type: "sine", vol: 0.16 },
    { f, at: 0, len: 0.4, type: "triangle", vol: 0.16 },
    { f: f * 2, at: 0, len: 0.2, type: "sine", vol: 0.05 },
  ]);
}

/** A springy "boing" rising to the pitch, as a child pops up. */
function boing(f: number): void {
  playNotes([
    { f: f * 0.6, at: 0, len: 0.08, type: "triangle", vol: 0.14 },
    { f: f * 0.85, at: 0.05, len: 0.1, type: "triangle", vol: 0.14 },
    { f, at: 0.1, len: 0.22, type: "triangle", vol: 0.14 },
  ]);
}

/**
 * Start a scene's sounds. Returns a function that cancels whatever has not played yet (when the splash is skipped).
 * A sound is skipped, never queued, if the browser is not letting the page make noise.
 */
export function playSplashSounds(scene: SplashScene): () => void {
  const timers = soundTimeline(scene).map(({ at, fx }) =>
    window.setTimeout(() => {
      if (audioRunning()) FX[fx]();
    }, at * 1000),
  );
  return () => timers.forEach((id) => window.clearTimeout(id));
}
