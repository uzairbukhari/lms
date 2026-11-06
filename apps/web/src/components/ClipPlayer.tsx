import { useState } from "react";
import { getCalm } from "../anim/cues";
import { getSoundOn, sfx, stopSpeech } from "../lib/sound";

/**
 * A short narrated clip made for the lesson (an mp4 we store ourselves, not YouTube). Nothing downloads until the child presses
 * play. In Calm mode the poster and the words are shown first, with a "Watch anyway" button. A transcript is always one tap away.
 */
export function ClipPlayer({ title, src, poster, seconds, transcript, caption }: { title: string; src: string; poster: string; seconds: number; transcript: string; caption?: string }) {
  const calm = getCalm();
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [words, setWords] = useState(calm);
  const play = () => { stopSpeech(); sfx("start"); setPlaying(true); };
  return (
    <div className="flex flex-col gap-3" onTouchStart={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()}>
      <div className="video-frame card relative aspect-[5/3] overflow-hidden">
        {playing && !failed ? (
          <video
            className="absolute inset-0 size-full bg-black"
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
            preload="none"
            muted={!getSoundOn()}
            aria-label={title}
            onError={() => setFailed(true)}
          />
        ) : (
          <button type="button" className="absolute inset-0 grid place-items-center text-center" style={{ background: `center / cover url(${poster})` }} onClick={play} aria-label={`Play the movie: ${title}`}>
            <span className="flex flex-col items-center gap-3 rounded-3xl bg-surface/85 px-6 py-4">
              <span className="grid size-20 place-items-center rounded-full bg-accent text-4xl text-on-accent shadow-lg" aria-hidden="true">▶</span>
              <span className="font-display text-[clamp(1.2rem,2.8vw,2rem)] font-bold">{title}</span>
              <span className="text-lg text-muted">{calm ? "Watch anyway · " : "🎬 "}About {seconds} seconds</span>
            </span>
          </button>
        )}
      </div>
      {failed && <p role="alert" className="text-lg font-bold">The movie did not load. Check your internet and try again.</p>}
      {caption && <p className="text-xl text-muted">{caption}</p>}
      <button type="button" className="btn !min-h-12 self-start" aria-expanded={words} onClick={() => setWords((w) => !w)}>{words ? "Hide the words" : "Read the words"}</button>
      {words && <p className="card p-4 text-xl leading-snug">{transcript}</p>}
    </div>
  );
}
