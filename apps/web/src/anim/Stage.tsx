import { useEffect, useMemo, useRef, useState } from "react";
import type { Actor, Backdrop as BackdropName } from "@lms/schema";
import { Backdrop } from "./Backdrop";
import { Prop, propReadout, propWidth } from "./props/Prop";
import { sfx } from "../lib/sound";

// A stage for a lesson picture: scenery behind, and each thing in the picture as its own actor that enters the
// moment the narration reaches its sentence. Older lessons that only have an `emoji` string get one actor per emoji.

/** Split an emoji string into single emoji (a family or a flag stays one). */
export function splitEmoji(s: string): string[] {
  const Seg = (Intl as unknown as { Segmenter?: new (l?: string, o?: { granularity: string }) => { segment: (t: string) => Iterable<{ segment: string }> } }).Segmenter;
  const parts = Seg ? [...new Seg(undefined, { granularity: "grapheme" }).segment(s)].map((x) => x.segment) : Array.from(s);
  return parts.map((p) => p.trim()).filter(Boolean);
}

export type PlacedActor = Required<Pick<Actor, "x" | "y" | "size" | "at" | "enter">> & Actor;

/** Where each actor stands and when it comes in, filling in what the lesson leaves out. `cards` = sentences on the slide. */
export function placeActors(actors: Actor[], cards: number): PlacedActor[] {
  const n = actors.length;
  const edge = n === 2 ? 28 : n === 3 ? 20 : 14;
  const spread = n === 1 ? [50] : actors.map((_, i) => edge + ((100 - 2 * edge) * i) / (n - 1));
  const props = actors.filter((a) => a.prop).length;
  return actors.map((a, i) => ({
    ...a,
    // A single drawn prop (a number line, a clock) is the main picture: centre it unless told otherwise.
    x: a.x ?? (a.prop && props === 1 && n <= 2 && actors.some((o) => o !== a && o.x !== undefined) ? 50 : spread[i]!),
    y: a.y ?? (a.prop ? 52 : 60 + (n > 3 && i % 2 ? -8 : 0)),
    size: a.size ?? (n === 1 ? 3 : n <= 3 ? 3 : 2),
    // Spread entrances over the slide's sentences: the first thing comes with the first sentence.
    at: a.at ?? (cards <= 1 ? 0 : Math.min(cards - 1, Math.floor((i * cards) / n))),
    enter: a.enter ?? (i % 2 ? "drop" : "pop"),
  }));
}

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

/** A number label that counts up from 0 when its actor arrives. */
export function CountUp({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(run ? 0 : to);
  useEffect(() => {
    if (!run) return;
    let v = 0; setN(0);
    const step = Math.max(1, Math.ceil(to / 20));
    const t = window.setInterval(() => { v = Math.min(to, v + step); setN(v); if (v >= to) window.clearInterval(t); }, 60);
    return () => window.clearInterval(t);
  }, [to, run]);
  return <>{n}</>;
}

export function ActorView({ a, shown }: { a: { emoji?: string; prop?: Actor["prop"]; label?: string; size: number; effect?: string }; shown: boolean }) {
  const num = a.label && /^\d{1,4}$/.test(a.label) ? Number(a.label) : null;
  return (
    <>
      <Effect kind={a.effect} />
      {a.prop
        ? <span className="block" style={{ width: `${propWidth(a.prop.kind, a.size)}cqw` }}><Prop spec={a.prop} /></span>
        : <span className="actor-emoji leading-none" style={{ fontSize: EMOJI_SIZE[a.size] ?? EMOJI_SIZE[2] }}>{a.emoji}</span>}
      {a.label && <span className="actor-label">{a.effect === "count" && num !== null ? <CountUp to={num} run={shown} /> : a.label}</span>}
    </>
  );
}

export function Stage({ actors, backdrop, cue, cards, alt }: { actors: Actor[]; backdrop: BackdropName; cue: number; cards: number; alt?: string }) {
  const placed = useMemo(() => placeActors(actors, cards), [actors, cards]);
  const seen = useRef(new Set<number>());
  // A soft pop for each thing as it arrives (not when everything is shown at once).
  useEffect(() => {
    if (!Number.isFinite(cue)) return;
    placed.forEach((a, i) => { if (a.at <= cue && !seen.current.has(i)) { seen.current.add(i); sfx("pop"); } });
  }, [cue, placed]);
  const label = alt || placed.map((a) => (a.prop ? propReadout(a.prop) : a.label ?? "")).filter(Boolean).join(" ");
  return (
    <div className="stage card relative aspect-[16/7] w-full overflow-hidden [container-type:inline-size]" role="img" aria-label={label}>
      <Backdrop name={backdrop} />
      {placed.map((a, i) => {
        const shown = cue >= a.at;
        return (
          <div key={i} className={`actor absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center ${shown ? `actor--in enter-${a.enter}` : "actor--wait"}`}
            style={{ left: `${a.x}%`, top: `${a.y}%`, animationDelay: shown && !Number.isFinite(cue) ? `${i * 0.12}s` : undefined }}>
            <span className={shown ? "actor-idle" : ""} style={{ animationDelay: `${(i * 0.37) % 1.5}s` }}><ActorView a={a} shown={shown} /></span>
          </div>
        );
      })}
    </div>
  );
}
