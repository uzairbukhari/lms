import { useEffect, useMemo, useRef, useState } from "react";
import type { Backdrop as BackdropName, ExplainerItem as Item, ExplainerScene as Scene } from "@lms/schema";
import { onNarration, sfx, speak, speakingNow } from "../lib/sound";
import { plain } from "../lib/slides";
import { Backdrop, pickBackdrop } from "../anim/Backdrop";
import { ActorView } from "../anim/Stage";
import { isCalm } from "../anim/cues";
import { Markdown } from "./Markdown";

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

/** Seconds a step stays on screen when nothing is read aloud. */
const dwell = (caption: string) => Math.min(7, Math.max(2.6, plain(caption).split(/\s+/).length * 0.38));

/**
 * An animated picture told in steps, on drawn scenery. It plays by itself in time with the voice: each step's caption
 * is read, then the next step begins. Things that share an `id` glide (or hop) to their new place, new things enter
 * with a bounce, things that leave fade, shrink or fly away, and the camera can zoom onto a spot. The child can pause,
 * step back and forward, or watch again. Nothing here is saved.
 */
export function Explainer({ scenes, title = "", backdrop, autoplay = true, subject, narration = "" }: {
  scenes: Scene[]; title?: string; backdrop?: BackdropName; autoplay?: boolean; subject?: string;
  /** What the slide reads aloud first (it already includes the first caption), so step 2 waits for it to finish. */
  narration?: string;
}) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(autoplay);
  /** True until anything is shown by hand or by autoplay: step 1's words are then part of the slide's own narration. */
  const fresh = useRef(true);
  const scene = scenes[step] as Scene;
  const last = scenes.length - 1;

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
  useEffect(() => { setStep(0); setPlaying(autoplay); fresh.current = true; }, [scenes, autoplay]);

  const show = (n: number, say = true) => {
    fresh.current = false;
    const next = Math.max(0, Math.min(last, n));
    setStep(next);
    sfx("whoosh");
    if (say) speak(plain(scenes[next]?.say ?? scenes[next]?.caption ?? ""));
  };
  const manual = (n: number) => { setPlaying(false); show(n); };

  // Autoplay: wait until this step's words have been read (or a reading time when there is no voice), then move on.
  const waitFor = useRef("");
  useEffect(() => {
    if (!playing) return;
    if (step >= last) { setPlaying(false); return; }
    const text = step === 0 && fresh.current && narration ? narration : plain(scene.say ?? scene.caption);
    waitFor.current = text;
    let done = false;
    let timer = 0;
    const advance = () => { if (done) return; done = true; timer = window.setTimeout(() => show(step + 1), isCalm() ? 1200 : 800); };
    let heard = speakingNow() === text;
    const off = onNarration((e) => {
      if (e.text !== text) return;
      if (e.kind === "start" || e.kind === "sentence") { heard = true; window.clearTimeout(timer); }
      if (e.kind === "end") { if (e.finished) advance(); else setPlaying(false); }
    });
    // No voice started for this step: use a reading time instead.
    if (!heard) timer = window.setTimeout(() => { if (!heard) { done = true; show(step + 1); } }, (step === 0 ? 1.2 : 0) * 1000 + dwell(scene.say ?? scene.caption) * 1000);
    return () => { off(); window.clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, step]);

  const cam = scene.camera;
  return (
    <div className="flex flex-col gap-4">
      <div className="stage card relative aspect-[5/3] w-full overflow-hidden [container-type:inline-size]" role="img" aria-label={plain(scene.caption)}>
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
            return (
              <div key={key} aria-hidden="true" className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-[left,top] duration-[900ms] ease-in-out"
                style={{ left: `${wl?.x ?? pos.x}%`, top: `${pos.y}%`, zIndex: here ? 2 : 1 }}>
                <span className={`explainer-thing ${exit}`}>
                  <span key={`in${since}`} className={here && since === step ? `enter-${here.enter ?? "pop"}` : ""}>
                    <span key={moved ? `m${step}` : "still"} className={`flex flex-col items-center ${moved && here?.path && here.path !== "straight" ? `path-${here.path}` : ""}`}>
                      <span className={`flex flex-col items-center ${at.anim !== "none" && here ? `anim-${at.anim}` : ""}`}>
                        {word
                          ? <><span className="whitespace-nowrap rounded-2xl bg-surface/90 px-[0.3em] font-bold leading-tight" style={{ fontSize: `${wl?.fs ?? 5}cqw` }}>{at.emoji}</span>
                            {at.label && <span className="actor-label">{at.label}</span>}</>
                          : <ActorView a={{ emoji: at.emoji, prop: at.prop, label: at.label, size: at.size, effect: here?.effect }} shown={!!here} />}
                      </span>
                    </span>
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div role="status" aria-live="polite" key={step} className="pop-in card px-5 py-3 text-[clamp(1.35rem,2.8vw,2.1rem)] leading-snug"><Markdown text={scene.caption} /></div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn !min-h-14 !px-5 text-xl" onClick={() => manual(step - 1)} disabled={step === 0} aria-label="Previous step">←</button>
        <div className="flex gap-2" aria-hidden="true">{scenes.map((_, i) => <span key={i} className={`size-4 rounded-full border-2 border-line transition-colors ${i === step ? "bg-accent" : i < step ? "bg-accent/40" : ""}`} />)}</div>
        {step < last && (playing
          ? <button type="button" className="btn !min-h-14 !px-5 text-xl" onClick={() => setPlaying(false)} aria-label="Pause">⏸ <span className="hidden sm:inline">Pause</span></button>
          : <button type="button" className="btn !min-h-14 !px-5 text-xl" onClick={() => { setPlaying(true); show(step + 1); }} aria-label="Play">▶ <span className="hidden sm:inline">Play</span></button>)}
        {step < last
          ? <button type="button" className="btn btn-primary !min-h-14 !px-6 text-xl" onClick={() => manual(step + 1)}>Next step →</button>
          : <button type="button" className="btn !min-h-14 !px-6 text-xl" onClick={() => { show(0); setPlaying(autoplay); }}>↺ Watch again</button>}
      </div>
    </div>
  );
}
