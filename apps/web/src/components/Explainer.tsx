import { useEffect, useMemo, useState } from "react";
import { sfx, speak } from "../lib/sound";
import { plain } from "../lib/slides";

type Item = { id?: string; emoji: string; label?: string; x: number; y: number; size: number; anim: "none" | "bounce" | "float" | "spin" | "pulse" | "grow" };
type Scene = { caption: string; items: Item[] };

/** Some lessons put a word, not a picture, in `emoji` (for example "dog"). Those are drawn as word tiles and laid out in a row. */
const isWord = (t: string) => /\p{L}|\p{N}/u.test(t) && !t.includes("\u20E3");
const WORD_FS = [0, 3.4, 5, 7]; // font size in % of the stage width, by item size
const keyOf = (it: Item, si: number, ii: number) => (it.id ? `id:${it.id}` : `s${si}:${ii}`);

/** Word tiles that share a row are spaced by their length so they never touch or overlap; the row shrinks to fit. */
function layoutWords(scene: Scene, si: number): Map<string, { x: number; fs: number }> {
  const out = new Map<string, { x: number; fs: number }>();
  const rows = new Map<number, { key: string; item: Item; w: number }[]>();
  scene.items.forEach((it, ii) => {
    if (!isWord(it.emoji)) return;
    const fs = WORD_FS[it.size] ?? WORD_FS[2]!;
    const row = Math.round(it.y / 12);
    const list = rows.get(row) ?? [];
    list.push({ key: keyOf(it, si, ii), item: it, w: it.emoji.length * 0.56 * fs + fs * 0.9 });
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

const SIZE = ["", "text-[clamp(2rem,6vw,3.5rem)]", "text-[clamp(3rem,9vw,5.5rem)]", "text-[clamp(4.5rem,13vw,8rem)]"];

/**
 * An animated picture told in steps. Things that share an `id` glide to their new place between steps, things that
 * are not in the current step fade out, and each step's caption is read aloud. Nothing here is saved.
 */
export function Explainer({ scenes }: { scenes: Scene[] }) {
  const [step, setStep] = useState(0);
  const scene = scenes[step] as Scene;

  // One element per thing: items with an id are the same element across steps, so moving them animates.
  const things = useMemo(() => {
    const map = new Map<string, { key: string; item: Item; seen: number[] }>();
    scenes.forEach((s, si) => s.items.forEach((it, ii) => {
      const key = it.id ? `id:${it.id}` : `s${si}:${ii}`;
      const hit = map.get(key);
      if (hit) hit.seen.push(si); else map.set(key, { key, item: it, seen: [si] });
    }));
    return [...map.values()];
  }, [scenes]);

  const words = useMemo(() => scenes.map((s, si) => layoutWords(s, si)), [scenes]);
  useEffect(() => { setStep(0); }, [scenes]);

  const to = (n: number) => { const next = Math.max(0, Math.min(scenes.length - 1, n)); setStep(next); sfx("next"); speak(plain(scenes[next]?.caption ?? "")); };

  return (
    <div className="flex flex-col gap-4">
      <div className="card relative aspect-[5/3] w-full overflow-hidden [container-type:inline-size]" role="img" aria-label={scene.caption}>
        {things.map(({ key, item, seen }) => {
          const here = scene.items.find((it, ii) => (it.id ? `id:${it.id}` : `s${step}:${ii}`) === key);
          const at = here ?? item;
          const lastSeen = [...seen].reverse().find((s) => s <= step);
          const posScene = here ? step : (lastSeen ?? seen[0] ?? 0);
          const pos = here ?? scenes[posScene]?.items.find((it, ii) => keyOf(it, posScene, ii) === key) ?? item;
          const word = isWord(at.emoji);
          const wl = word ? (words[posScene]?.get(key) ?? words[step]?.get(key)) : undefined;
          if (word) {
            return (
              <div key={key} aria-hidden="true" className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-all duration-[900ms] ease-in-out"
                style={{ left: `${wl?.x ?? pos.x}%`, top: `${pos.y}%`, opacity: here ? 1 : 0 }}>
                <span className={`whitespace-nowrap rounded-2xl bg-surface/90 px-[0.3em] font-bold leading-tight ${at.anim !== "none" && here ? `anim-${at.anim}` : ""}`} style={{ fontSize: `${wl?.fs ?? 5}cqw` }}>{at.emoji}</span>
                {(here ?? pos).label && <span className="whitespace-nowrap rounded-full bg-surface/90 px-3 text-[clamp(1.1rem,2.6cqw,1.8rem)] font-bold">{(here ?? pos).label}</span>}
              </div>
            );
          }
          return (
            <div key={key} aria-hidden="true" className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-all duration-[900ms] ease-in-out"
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, opacity: here ? 1 : 0 }}>
              <span className={`${SIZE[at.size] ?? SIZE[2]} leading-none ${at.anim !== "none" && here ? `anim-${at.anim}` : ""}`}>{at.emoji}</span>
              {(here ?? pos).label && <span className="whitespace-nowrap rounded-full bg-surface/90 px-3 text-[clamp(1.1rem,2.6cqw,1.8rem)] font-bold">{(here ?? pos).label}</span>}
            </div>
          );
        })}
      </div>
      <p role="status" aria-live="polite" key={step} className="pop-in card px-5 py-3 text-[clamp(1.35rem,2.8vw,2.1rem)] leading-snug">{scene.caption}</p>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn !min-h-14 !px-5 text-xl" onClick={() => to(step - 1)} disabled={step === 0} aria-label="Previous step">←</button>
        <div className="flex gap-2" aria-hidden="true">{scenes.map((_, i) => <span key={i} className={`size-4 rounded-full border-2 border-line ${i === step ? "bg-accent" : ""}`} />)}</div>
        {step < scenes.length - 1
          ? <button type="button" className="btn btn-primary !min-h-14 !px-6 text-xl" onClick={() => to(step + 1)}>Next step →</button>
          : <button type="button" className="btn !min-h-14 !px-6 text-xl" onClick={() => to(0)}>↺ Watch again</button>}
      </div>
    </div>
  );
}
