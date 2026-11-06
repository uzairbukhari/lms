import { useMemo } from "react";
import type { Backdrop as BackdropName, ExplainerItem as Item, ExplainerScene as Scene } from "@lms/schema";
import { plain } from "../lib/slides";
import { Backdrop, pickBackdrop } from "../anim/Backdrop";
import { ActorView, ArrivalClock } from "../anim/Actor";

/**
 * The picture of an explainer for one step: scenery, things (those sharing an `id` glide between steps), camera,
 * effects and word tiles. Pure view: no sound, no timers, no state. Used by the lesson player (Explainer.tsx) and by the
 * clip renderer (tools/clips), so a clip looks exactly like the lesson's animation.
 *
 * Deterministic frames. What is drawn depends only on (scenes, step). The motion between two steps is CSS: things that
 * share an id travel through a `transition: left, top`, and entrances, exits, idles and effects are CSS animations that
 * start when the element is first committed. The browser only starts a transition when it has seen the previous
 * step's style, so to show step N reproducibly the caller commits step 0, then 1, ... up to N, forcing a style recalculation
 * (`document.getAnimations()`) after each commit, and then reads or seeks the animations that were created. That
 * is the "settle handshake" (see tools/clips/src/ClipStage.tsx). The lesson player simply passes the step the child is on.
 *
 * `clock` is for the renderer only: when given, a CountUp label shows the number for that moment instead of ticking by itself.
 */
export type StageClock = { /** When each step began, in ms on the video clock. */ stepStartMs: number[]; /** The current time in ms. */ nowMs: number };

/** Some lessons put a word, not a picture, in `emoji` (for example "dog"). Those are drawn as word tiles and laid out in a row. */
const isWord = (t?: string) => !!t && /\p{L}|\p{N}/u.test(t) && !t.includes("⃣");
const WORD_FS = [0, 3.4, 5, 7]; // font size in % of the stage width, by item size
const keyOf = (it: Item, si: number, ii: number) => (it.id ? `id:${it.id}` : `s${si}:${ii}`);

/** Word tiles that share a row are spaced by their length so they never touch or overlap; the row shrinks to fit. */
function layoutWords(scene: Scene, si: number): Map<string, { x: number; fs: number }> {
  const out = new Map<string, { x: number; fs: number }>();
  const rows = new Map<number, { key: string; item: Item; w: number }[]>();
  scene.items.forEach((it, ii) => {
    if (!isWord(it.emoji) || it.prop) return;
    const fs = WORD_FS[it.size] ?? WORD_FS[2]!;
    const row = Math.round(it.y / 12);
    const list = rows.get(row) ?? [];
    list.push({ key: keyOf(it, si, ii), item: it, w: (it.emoji ?? "").length * 0.56 * fs + fs * 0.9 });
    rows.set(row, list);
  });
  for (const list of rows.values()) {
    list.sort((a, b) => a.item.x - b.item.x);
    const gap = 1.6;
    const total = list.reduce((n, r) => n + r.w, 0) + gap * (list.length - 1);
    const k = Math.min(1, 94 / total);
    let at = (100 - total * k) / 2;
    for (const r of list) {
      out.set(r.key, { x: at + (r.w * k) / 2, fs: (WORD_FS[r.item.size] ?? WORD_FS[2]!) * k });
      at += (r.w + gap) * k;
    }
  }
  return out;
}

export function ExplainerStage({ scenes, step, title = "", backdrop, subject, clock, className }: {
  scenes: Scene[]; step: number; title?: string; backdrop?: BackdropName; subject?: string; clock?: StageClock; className?: string;
}) {
  const scene = scenes[step] as Scene;

  // One element per thing: items with an id are the same element across steps, so moving them animates.
  const things = useMemo(() => {
    const map = new Map<string, { key: string; item: Item; seen: number[] }>();
    scenes.forEach((s, si) => s.items.forEach((it, ii) => {
      const key = keyOf(it, si, ii);
      const hit = map.get(key);
      if (hit) hit.seen.push(si); else map.set(key, { key, item: it, seen: [si] });
    }));
    return [...map.values()];
  }, [scenes]);

  const words = useMemo(() => scenes.map((s, si) => layoutWords(s, si)), [scenes]);
  const scenery = useMemo(() => backdrop ?? pickBackdrop([title, ...scenes.flatMap((s) => [s.caption, ...s.items.map((i) => i.emoji ?? i.label ?? "")])].join(" "), subject), [backdrop, title, scenes, subject]);

  const cam = scene.camera;
  return (
    <div className={`stage card relative aspect-[5/3] w-full overflow-hidden [container-type:inline-size]${className ? ` ${className}` : ""}`} role="img" aria-label={plain(scene.caption)}>
      <div className="camera absolute inset-0" style={{ transform: cam ? `scale(${cam.zoom})` : "none", transformOrigin: cam ? `${cam.x}% ${cam.y}%` : "50% 50%" }}>
        <Backdrop name={scenery} />
        {things.map(({ key, item, seen }) => {
          const here = scene.items.find((it, ii) => keyOf(it, step, ii) === key);
          const lastSeen = [...seen].reverse().find((s) => s <= step);
          const posScene = here ? step : (lastSeen ?? seen[0] ?? 0);
          const pos = here ?? scenes[posScene]?.items.find((it, ii) => keyOf(it, posScene, ii) === key) ?? item;
          const at = here ?? pos;
          // When did it arrive (for its entrance), and did it travel from the step before (for arcs and hops)?
          let since = step;
          while (since > 0 && seen.includes(since - 1)) since--;
          const prev = here && step > 0 && seen.includes(step - 1) ? scenes[step - 1]?.items.find((it, ii) => keyOf(it, step - 1, ii) === key) : undefined;
          const moved = prev && (prev.x !== here?.x || prev.y !== here?.y);
          const word = isWord(at.emoji) && !at.prop;
          const wl = word ? (words[posScene]?.get(key) ?? words[step]?.get(key)) : undefined;
          const exit = here ? "" : `exit-${pos.exit ?? "fade"}`;
          const view = (
            <span className={`flex flex-col items-center ${at.anim !== "none" && here ? `anim-${at.anim}` : ""}`}>
              {word
                ? <><span className="whitespace-nowrap rounded-2xl bg-surface/90 px-[0.3em] font-bold leading-tight" style={{ fontSize: `${wl?.fs ?? 5}cqw` }}>{at.emoji}</span>
                  {at.label && <span className="actor-label">{at.label}</span>}</>
                : <ActorView a={{ emoji: at.emoji, prop: at.prop, label: at.label, size: at.size, effect: here?.effect }} shown={!!here} />}
            </span>
          );
          return (
            <div key={key} aria-hidden="true" className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-[left,top] duration-[900ms] ease-in-out"
              style={{ left: `${wl?.x ?? pos.x}%`, top: `${pos.y}%`, zIndex: here ? 2 : 1 }}>
              <span className={`explainer-thing ${exit}`}>
                <span key={`in${since}`} className={here && since === step ? `enter-${here.enter ?? "pop"}` : ""}>
                  <span key={moved ? `m${step}` : "still"} className={`flex flex-col items-center ${moved && here?.path && here.path !== "straight" ? `path-${here.path}` : ""}`}>
                    {clock ? <ArrivalClock.Provider value={Math.max(0, clock.nowMs - (clock.stepStartMs[since] ?? 0))}>{view}</ArrivalClock.Provider> : view}
                  </span>
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
