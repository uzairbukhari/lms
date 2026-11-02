import { useState } from "react";
import { sfx, stopSpeech } from "../lib/sound";

/**
 * A short clip from YouTube, cut to the part we chose. Nothing is loaded from YouTube until the child presses play, and then
 * only from the privacy-friendly youtube-nocookie.com player with related videos kept to the same channel.
 */
export function VideoClip({ title, id, start, end, caption }: { title: string; id: string; start: number; end: number; caption?: string }) {
  const [playing, setPlaying] = useState(false);
  const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?start=${start}&end=${end}&autoplay=1&rel=0&modestbranding=1&playsinline=1&cc_load_policy=1&iv_load_policy=3&disablekb=0&fs=1`;
  const seconds = end - start;
  return (
    <div className="flex flex-col gap-3" onTouchStart={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()}>
      <div className="card relative aspect-video w-full overflow-hidden">
        {playing ? (
          <iframe title={title} src={src} className="absolute inset-0 size-full" allow="encrypted-media; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" sandbox="allow-scripts allow-same-origin allow-presentation" />
        ) : (
          <button type="button" className="absolute inset-0 grid place-items-center bg-accent/20 text-center" onClick={() => { stopSpeech(); sfx("start"); setPlaying(true); }} aria-label={`Play the video: ${title}`}>
            <span className="flex flex-col items-center gap-3">
              <span className="grid size-24 place-items-center rounded-full bg-accent text-5xl text-on-accent shadow-lg" aria-hidden="true">▶</span>
              <span className="font-display text-[clamp(1.4rem,3.2vw,2.2rem)] font-bold">{title}</span>
              <span className="text-xl text-muted">🎬 About {seconds} seconds</span>
            </span>
          </button>
        )}
      </div>
      {caption && <p className="text-[clamp(1.1rem,2.2vw,1.6rem)] text-muted">{caption}</p>}
      {playing && <button type="button" className="btn self-start !min-h-12 !px-5 text-lg" onClick={() => setPlaying(false)}>↺ Watch again</button>}
    </div>
  );
}
