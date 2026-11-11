// Frame-exact CSS animations and transitions for video rendering.
//
// Chromium runs CSS animations on its own clock, and replaces them a frame after you pause them, so setting
// `currentTime` once is not enough (docs/PHASE1_SPIKES.md). The working technique: pause every animation, set its
// time, wait two animation frames, and repeat until every animation is paused at the time we asked for.
//
// Each animation has its own time: the moment it started (when its element was first drawn, or when a transition
// began) is its "birth". An animation born at the start of scene 3 must show how it looks `now - start of scene 3` in.

export const frames = (n: number) => new Promise<void>((done) => { const step = (k: number) => (k === 0 ? done() : requestAnimationFrame(() => step(k - 1))); step(n); });

/** A name for an animation that survives Chromium replacing the Animation object: the element it plays on, and what it animates. */
const animKey = (a: Animation): string => {
  const e = a.effect as KeyframeEffect | null;
  const name = (a as CSSAnimation).animationName ?? (a as CSSTransition).transitionProperty ?? a.id ?? "";
  return `${e?.pseudoElement ?? ""}|${name}`;
};

export type Births = WeakMap<Element, Map<string, number>>;

/** Remember, for every animation that exists right now and is not known yet, the step (scene) that was on screen when it began. */
export function tagBirths(births: Births, step: number): void {
  for (const a of document.getAnimations()) {
    const el = (a.effect as KeyframeEffect | null)?.target;
    if (!el) continue;
    let m = births.get(el);
    if (!m) { m = new Map(); births.set(el, m); }
    const k = animKey(a);
    if (!m.has(k)) m.set(k, step);
  }
}

/**
 * Pause every animation at (now - the start of the scene it was born in), and keep doing so until that holds.
 * `stepStartMs[i]` is when scene i began on the video clock; `fallbackStep` is used for animations nobody tagged.
 */
export async function seekAll(births: Births, stepStartMs: number[], nowMs: number, fallbackStep: number): Promise<boolean> {
  const targetOf = (a: Animation) => {
    const el = (a.effect as KeyframeEffect | null)?.target;
    const born = (el && births.get(el)?.get(animKey(a))) ?? fallbackStep;
    return Math.max(0, nowMs - (stepStartMs[born] ?? 0));
  };
  for (let attempt = 0; attempt < 20; attempt++) {
    for (const a of document.getAnimations()) { a.pause(); a.currentTime = targetOf(a); }
    await frames(2);
    const settled = document.getAnimations().every((a) => (a.playState === "paused" || a.playState === "finished") && Math.abs(Number(a.currentTime) - targetOf(a)) < 0.5);
    if (settled) return true;
  }
  return false;
}
