import { useLayoutEffect, useRef, useState } from "react";
import { continueRender, delayRender } from "remotion";
import type { Backdrop, ExplainerScene } from "@lms/schema";
import { ExplainerStage } from "../../../apps/web/src/components/ExplainerStage";
import { seekAll, tagBirths, type Births } from "./seek";

/**
 * The lesson explainer's picture for one video frame, as a pure function of (step, time).
 *
 * The settle handshake: this component is mounted fresh for every frame (the parent keys it by the frame number). It draws
 * step 0, forces a style recalculation and notes which animations started, then draws step 1, and so on up to `step`.
 * That is exactly what a child sees, so the CSS transitions that depend on the previous step (things gliding between
 * places) are created, and every animation knows which scene it was born in. Then all animations are seeked to
 * (now - the start of their scene) and the frame is released to Remotion. A number counting up reads the same clock.
 */
export function ClipStage({ scenes, step, stepStartMs, nowMs, backdrop, subject, title }: {
  scenes: ExplainerScene[]; step: number; stepStartMs: number[]; nowMs: number; backdrop?: Backdrop; subject?: string; title?: string;
}) {
  const [shown, setShown] = useState(0);
  const births = useRef<Births>(new WeakMap());
  const [handle] = useState(() => delayRender("clip stage settle", { timeoutInMilliseconds: 60000 }));
  const released = useRef(false);

  useLayoutEffect(() => {
    tagBirths(births.current, shown);
    if (shown < step) { setShown(shown + 1); return; }
    seekAll(births.current, stepStartMs, nowMs, step).then((ok) => {
      if (!ok) console.error(`clip: animations did not settle at ${nowMs} ms`);
      if (!released.current) { released.current = true; continueRender(handle); }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, step, nowMs]);

  return <ExplainerStage scenes={scenes} step={shown} backdrop={backdrop} subject={subject} title={title} className="clip-bare" clock={{ stepStartMs, nowMs }} />;
}
