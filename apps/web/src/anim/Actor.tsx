import { createContext, useContext, useEffect, useState } from "react";
import type { Actor } from "@lms/schema";
import { Prop, propWidth } from "./props/Prop";
import { AssetView, hasAsset } from "./assets";

// The drawing of one actor (an emoji or a prop, its label and its effect). No sound and no timers except CountUp's
// default ticker, so the clip renderer (tools/clips) can import it without pulling in the web app's audio code.

const EMOJI_SIZE = ["", "9cqw", "13cqw", "17cqw"];

export function Effect({ kind }: { kind?: string }) {
  if (!kind || kind === "none" || kind === "count") return null;
  const bits = kind === "glow" ? 1 : kind.startsWith("arrow") ? 1 : 5;
  return (
    <span className={`fx fx--${kind}`} aria-hidden="true">
      {Array.from({ length: bits }, (_, i) => (
        <i key={i} style={{ ["--i" as string]: i }}>{kind === "hearts" ? "❤" : kind === "zzz" ? "z" : kind === "sparkle" ? "✦" : kind === "arrow_right" ? "➜" : kind === "arrow_down" ? "⬇" : ""}</i>
      ))}
    </span>
  );
}

/** CountUp ticks every 60 ms and adds this many (a count of 20 or fewer goes up by 1). */
export const countStep = (to: number) => Math.max(1, Math.ceil(to / 20));
export const COUNT_TICK_MS = 60;
/** The number CountUp shows `ms` after its actor arrived: what the live ticker would show at that moment. */
export const countAt = (to: number, ms: number) => Math.min(to, countStep(to) * Math.floor(Math.max(0, ms) / COUNT_TICK_MS));

/**
 * Milliseconds since the actor arrived, when something else owns the clock. The web app leaves this unset (null) and CountUp
 * ticks by itself. The clip renderer sets it from the video frame, so a number is a pure function of the frame.
 */
export const ArrivalClock = createContext<number | null>(null);

/** A number label that counts up from 0 when its actor arrives. */
export function CountUp({ to, run }: { to: number; run: boolean }) {
  const clock = useContext(ArrivalClock);
  const [n, setN] = useState(run ? 0 : to);
  useEffect(() => {
    if (!run || clock !== null) return;
    let v = 0; setN(0);
    const step = countStep(to);
    const t = window.setInterval(() => { v = Math.min(to, v + step); setN(v); if (v >= to) window.clearInterval(t); }, COUNT_TICK_MS);
    return () => window.clearInterval(t);
  }, [to, run, clock]);
  if (clock !== null) return <>{run ? countAt(to, clock) : to}</>;
  return <>{n}</>;
}

export function ActorView({ a, shown }: { a: { emoji?: string; prop?: Actor["prop"]; label?: string; size: number; effect?: string }; shown: boolean }) {
  const num = a.label && /^\d{1,4}$/.test(a.label) ? Number(a.label) : null;
  return (
    <>
      <Effect kind={a.effect} />
      {a.prop
        ? <span className="block" style={{ width: `${propWidth(a.prop.kind, a.size)}cqw` }}><Prop spec={a.prop} /></span>
        : hasAsset(a.emoji)
          ? <span className="block">{<AssetView emoji={a.emoji!} size={a.size} effect={a.effect} />}</span>
          : <span className="actor-emoji leading-none" style={{ fontSize: EMOJI_SIZE[a.size] ?? EMOJI_SIZE[2] }}>{a.emoji}</span>}
      {a.label && <span className="actor-label">{a.effect === "count" && num !== null ? <CountUp to={num} run={shown} /> : a.label}</span>}
    </>
  );
}
