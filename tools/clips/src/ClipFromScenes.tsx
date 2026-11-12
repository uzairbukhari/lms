import "./generated/app.css";
import "./clip.css";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { buildClipTimeline, CLIP_VOICE_RATE, sceneIndexAt, type ClipSpec } from "@lms/schema";
import { pickBackdrop } from "../../../apps/web/src/anim/Backdrop";
import { ClipStage } from "./ClipStage";
import { AssetView, hasAsset } from "../../../apps/web/src/anim/assets";

export const WIDTH = 1280;
export const HEIGHT = 768;
export const FPS = 24;

/** One sentence of narration: the mp3 (a file in tools/clips/.audio, served with staticFile) and how long it really is. */
export type SpokenSentence = { file: string; seconds: number };
export type ClipProps = {
  spec: ClipSpec;
  /** Per scene, per sentence. A scene with no entry (or no audio at all, `--silent`) uses reading time and plays no sound. */
  audio?: (SpokenSentence[] | undefined)[];
};

export const timelineOf = (props: ClipProps) => buildClipTimeline(props.spec, { fps: FPS, durations: props.audio?.map((s) => s?.map((x) => x.seconds)) });

function TitleCard({ title, emoji, end }: { title: string; emoji: string[]; end?: boolean }) {
  return (
    <AbsoluteFill className="clip-card">
      <div className="clip-card-emoji" style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 28, containerType: "inline-size", width: WIDTH }}>
        {emoji.map((e) => (hasAsset(e) ? <AssetView key={e} emoji={e} size={1} /> : <span key={e}>{e}</span>))}
      </div>
      <div className="clip-card-title">{end ? "The end" : title}</div>
      <div className="clip-card-sub">{end ? title : "A little story"}</div>
    </AbsoluteFill>
  );
}

export function ClipFromScenes(props: ClipProps) {
  const { spec } = props;
  const frame = useCurrentFrame();
  const t = timelineOf(props);
  const emoji = [...new Set(spec.scenes.flatMap((s) => s.items.map((i) => i.emoji)).filter((e): e is string => !!e && !/\p{L}|\p{N}/u.test(e)))].slice(0, 3);

  const stageStart = t.titleFrames;
  const stageEnd = t.titleFrames + t.stageFrames;
  const onStage = frame >= stageStart && frame < stageEnd;
  const stageFrame = Math.min(Math.max(frame - stageStart, 0), t.stageFrames - 1);
  const step = sceneIndexAt(t, stageFrame);
  const ms = (f: number) => (f / FPS) * 1000;
  const stepStartMs = t.scenes.map((s) => ms(s.startFrame - t.titleFrames));
  const scene = t.scenes[step]!;
  const spoken = [...scene.sentences].reverse().find((s) => frame >= s.startFrame) ?? scene.sentences[0];
  const backdrop = spec.backdrop ?? pickBackdrop([spec.title, ...spec.scenes.flatMap((s) => [s.caption, ...s.items.map((i) => i.emoji ?? i.label ?? "")])].join(" "), spec.subject);

  return (
    <AbsoluteFill style={{ background: "var(--bg)" }}>
      {frame < stageStart && <TitleCard title={spec.title} emoji={emoji} />}
      {onStage && (
        <>
          {/* Fresh for every frame: see ClipStage. */}
          <ClipStage key={frame} scenes={spec.scenes} step={step} stepStartMs={stepStartMs} nowMs={ms(stageFrame)} backdrop={backdrop} subject={spec.subject} title={spec.title} />
          {spoken && <div className="clip-caption" role="status">{spoken.text}</div>}
        </>
      )}
      {frame >= stageEnd && <TitleCard title={spec.title} emoji={emoji} end />}
      {props.audio?.map((sentences, i) => sentences?.map((s, j) => {
        const timing = t.scenes[i]?.sentences[j];
        if (!timing) return null;
        return (
          <Sequence key={`${i}-${j}`} from={timing.startFrame} durationInFrames={timing.frames}>
            <Audio src={staticFile(s.file)} playbackRate={CLIP_VOICE_RATE} />
          </Sequence>
        );
      }))}
    </AbsoluteFill>
  );
}
