import { useLayoutEffect } from "react";
import { continueRender, delayRender, useCurrentFrame, useVideoConfig } from "remotion";

const css = `
@keyframes slide { from { transform: translateX(0) } to { transform: translateX(800px) } }
@keyframes spin { to { transform: rotate(360deg) } }
.box { position:absolute; left:100px; top:200px; width:120px; height:120px; background:#ff7a59; border-radius:24px; animation: slide 3s ease-in-out both; }
.ring { position:absolute; left:300px; top:450px; width:100px; height:100px; border:12px solid #3a86ff; border-radius:50%; border-top-color:#ffd166; animation: spin 2s linear infinite; }
`;

const frames = (n: number) => new Promise<void>((done) => { const step = (k: number) => (k === 0 ? done() : requestAnimationFrame(() => step(k - 1))); step(n); });

/** Pause every CSS animation at time t and wait until that holds for two animation frames in a row. */
async function seekAll(t: number): Promise<boolean> {
  for (let attempt = 0; attempt < 20; attempt++) {
    const all = document.getAnimations();
    for (const a of all) { a.pause(); a.currentTime = t; }
    await frames(2);
    const now = document.getAnimations();
    if (now.every((a) => a.playState === "paused" && a.currentTime === t)) return true;
  }
  return false;
}

export const Spike = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  useLayoutEffect(() => {
    const handle = delayRender("seek animations");
    seekAll((frame / fps) * 1000).then((ok) => { if (!ok) console.error("SPIKE seek never settled"); continueRender(handle); });
  }, [frame, fps]);
  return (
    <div style={{ width: 1280, height: 768, background: "#fffbe6", position: "relative" }}>
      <style>{css}</style>
      <div className="box" />
      <div className="ring" />
    </div>
  );
};
