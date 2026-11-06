import { useEffect, useMemo, useRef } from "react";
import type { Actor, Backdrop as BackdropName } from "@lms/schema";
import { Backdrop } from "./Backdrop";
import { propReadout } from "./props/Prop";
import { ActorView, CountUp, Effect } from "./Actor";
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

export { ActorView, CountUp, Effect };

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
