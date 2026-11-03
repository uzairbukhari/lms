import { useEffect, useState } from "react";
import { onNarration, sentences } from "../lib/sound";

/** How far the narration of `text` has got: the index of the sentence being spoken, so pictures can enter with the voice.
 * When nothing is read aloud (sound off, the parent's preview, no voice), it steps on by itself at reading pace instead,
 * so the animation still plays. Infinity means "everything is showing". */
export function useCue(text: string, opts: { perSentence?: number } = {}): number {
  const total = sentences(text).length;
  const [at, setAt] = useState(-1);
  useEffect(() => {
    setAt(-1);
    let heard = false;
    let timer = 0;
    const off = onNarration((e) => {
      if (e.text !== text) return;
      if (e.kind === "start") { heard = true; window.clearTimeout(timer); setAt(-1); }
      if (e.kind === "sentence") { heard = true; window.clearTimeout(timer); setAt(e.index); }
      if (e.kind === "end") setAt(Infinity);
    });
    // No voice within a moment: walk through the sentences at reading pace.
    const words = text.split(/\s+/).filter(Boolean).length;
    const pace = opts.perSentence ?? Math.min(2600, Math.max(1100, (words / Math.max(1, total)) * 280));
    let i = -1;
    const tick = () => {
      if (heard) return;
      i += 1;
      setAt(i >= total ? Infinity : i);
      if (i < total) timer = window.setTimeout(tick, pace);
    };
    timer = window.setTimeout(tick, 900);
    return () => { off(); window.clearTimeout(timer); };
  }, [text, total, opts.perSentence]);
  return at;
}

/** True while any narration is playing (the guide's mouth moves). */
export function useSpeaking(): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => onNarration((e) => { if (e.kind === "start" || e.kind === "sentence") setOn(true); if (e.kind === "end") setOn(false); }), []);
  return on;
}

/** Calm mode: fades only, no bounces, no journey scenes. Kept in this browser. */
const CALM = "lms-calm";
export function getCalm(): boolean {
  try { return localStorage.getItem(CALM) === "on"; } catch { return false; }
}
export function setCalm(on: boolean): void {
  try { localStorage.setItem(CALM, on ? "on" : "off"); } catch { /* storage blocked: lasts for this visit */ }
  applyCalm(on);
}
export function applyCalm(on = getCalm()): void {
  if (typeof document !== "undefined") document.documentElement.toggleAttribute("data-calm", on);
}
export function isCalm(): boolean {
  if (typeof window === "undefined") return false;
  return document.documentElement.hasAttribute("data-calm") || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

/** The guide's mood is set from anywhere (a check answered, a new stop) and shown by the one guide on screen. */
export type Mood = "idle" | "talk" | "point" | "cheer" | "think" | "wave";
const moodListeners = new Set<(m: Mood) => void>();
export function setGuideMood(m: Mood): void { for (const fn of [...moodListeners]) fn(m); }
export function onGuideMood(fn: (m: Mood) => void): () => void { moodListeners.add(fn); return () => { moodListeners.delete(fn); }; }

/** A star that flies from a point on screen to the progress trail. */
const starListeners = new Set<(x: number, y: number) => void>();
export function flyStar(x: number, y: number): void { for (const fn of [...starListeners]) fn(x, y); }
export function onStar(fn: (x: number, y: number) => void): () => void { starListeners.add(fn); return () => { starListeners.delete(fn); }; }
