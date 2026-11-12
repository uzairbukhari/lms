import { useEffect, useRef, useState } from "react";
import { isCalm } from "../anim/cues";

/**
 * The child's character on the home page. Plays short clips one after another (each starts and ends standing, so the
 * loop is seamless). The clips are "stacked" MP4s: colour on top, a matching alpha mask below, drawn to a canvas so the
 * background is see-through on every browser, including iPad Safari, which cannot play transparent WebM.
 * Calm mode and "reduce motion" show the still picture instead. Every child uses the same clips for now.
 */
const CLIPS = ["/home-clips/wave.mp4", "/home-clips/book.mp4", "/home-clips/magnify.mp4"];
const W = 540;
const H = 724;
const PAUSE_MS = 2500;

export function HomeCharacter({ still = "/kids/zainab-stand.webp" }: { still?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const c = canvas.current;
    const v = video.current;
    if (!c || !v || isCalm()) return;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    const off = document.createElement("canvas");
    off.width = W; off.height = H * 2;
    const o = off.getContext("2d", { willReadFrequently: true });
    if (!ctx || !o) return;
    let i = 0, stopped = false, timer = 0, raf = 0;

    const draw = () => {
      if (stopped) return;
      if (v.readyState >= 2) {
        o.drawImage(v, 0, 0, W, H * 2);
        const colour = o.getImageData(0, 0, W, H);
        const mask = o.getImageData(0, H, W, H);
        for (let k = 0; k < colour.data.length; k += 4) colour.data[k + 3] = mask.data[k]!;
        ctx.putImageData(colour, 0, 0);
        setLive(true);
      }
      if (!v.paused && !v.ended) raf = requestAnimationFrame(draw);
    };
    const next = () => {
      if (stopped) return;
      v.src = CLIPS[i++ % CLIPS.length]!;
      v.play().then(() => { raf = requestAnimationFrame(draw); }).catch(() => { /* autoplay blocked: the still stays */ });
    };
    const onEnded = () => { timer = window.setTimeout(next, PAUSE_MS); };
    const onVisible = () => { if (document.hidden) v.pause(); else if (!v.ended && v.src) void v.play().then(() => { raf = requestAnimationFrame(draw); }).catch(() => undefined); };
    v.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisible);
    next();
    return () => {
      stopped = true;
      clearTimeout(timer); cancelAnimationFrame(raf);
      v.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisible);
      v.pause(); v.removeAttribute("src"); v.load();
    };
  }, []);

  return (
    <div className="hv3-kid" aria-hidden="true">
      <img src={still} alt="" className="hv3-kid-still" style={{ visibility: live ? "hidden" : "visible" }} />
      <canvas ref={canvas} width={W} height={H} className="hv3-kid-live" style={{ visibility: live ? "visible" : "hidden" }} />
      <video ref={video} muted playsInline preload="auto" tabIndex={-1} style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }} />
    </div>
  );
}
