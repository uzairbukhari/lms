import { useEffect, useRef, useState } from "react";
import type { Backdrop as BackdropName, ExplainerScene as Scene } from "@lms/schema";
import { onNarration, sfx, speak, speakingNow } from "../lib/sound";
import { plain } from "../lib/slides";
import { isCalm } from "../anim/cues";
import { Markdown } from "./Markdown";
import { ExplainerStage } from "./ExplainerStage";

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

  return (
    <div className="explainer flex flex-col gap-4">
      <ExplainerStage scenes={scenes} step={step} title={title} backdrop={backdrop} subject={subject} />
      <div className="explainer-side flex flex-col gap-4">
      <div role="status" aria-live="polite" key={step} className="pop-in card px-5 py-3 text-[clamp(1.2rem,min(2.8vw,3.3vh),2.1rem)] leading-snug"><Markdown text={scene.caption} /></div>
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
    </div>
  );
}
