import { z } from "zod";
import { BACKDROPS, explainerSceneSchema } from "./lesson";
import { plain } from "./slides";
import { sentences } from "./sentences";

// A clip spec: an animated, narrated story made of explainer scenes, rendered to an mp4 by tools/clips.
// Validation and pure maths only (this package runs in the browser and the Worker). Hashing needs node:crypto and lives in scripts/clip-kit.mjs.
// Usage: docs/CLIPS.md.

export const CLIP_MAX_SCENES = 24;
/** Narration pace used to estimate how long a clip runs before the real audio exists. */
export const CLIP_WORDS_PER_SECOND = 2.3;
/** A short pause after each scene. */
export const CLIP_SCENE_GAP_SECONDS = 0.5;
/** The title card and the end card. */
export const CLIP_CARD_SECONDS = 1.5;
/** Hard limit for the whole video (matches the clip block's `seconds` maximum). */
export const CLIP_MAX_SECONDS = 90;
/** Aim for this range. Outside it the clip is allowed but `clipWarnings` says so. */
export const CLIP_TARGET_SECONDS = [45, 75] as const;
/** At least this share of scenes must have a `say` script, so the clip is really narrated. */
export const CLIP_MIN_SAY_SHARE = 0.8;
export const CLIP_FPS = 24;

export const clipSpecSchema = z
  .object({
    title: z.string().trim().min(1, "Cannot be empty").max(100, "Keep this under 100 characters"),
    /** Scenery behind the stage (default: picked from the words, like an explainer). */
    backdrop: z.enum(BACKDROPS).optional(),
    /** The subject, only used to pick scenery when `backdrop` is missing. */
    subject: z.string().trim().min(1).max(40).optional(),
    scenes: z.array(explainerSceneSchema).min(2).max(CLIP_MAX_SCENES),
  })
  .superRefine((spec, ctx) => {
    const said = spec.scenes.filter((s) => s.say).length;
    if (said < Math.ceil(spec.scenes.length * CLIP_MIN_SAY_SHARE)) {
      ctx.addIssue({ code: "custom", path: ["scenes"], message: `Only ${said} of ${spec.scenes.length} scenes have "say". At least 80% need a narration script.` });
    }
    const seconds = estimateClipSeconds(spec);
    if (seconds > CLIP_MAX_SECONDS) {
      ctx.addIssue({ code: "custom", path: ["scenes"], message: `This clip runs about ${Math.round(seconds)} seconds. The limit is ${CLIP_MAX_SECONDS}: cut scenes or words.` });
    }
  });

export type ClipSpec = z.infer<typeof clipSpecSchema>;
type Scene = ClipSpec["scenes"][number];

export type ClipParse = { ok: true; spec: ClipSpec } | { ok: false; issues: string[] };

/** Validate a clip spec. The returned spec has defaults filled in (for example item sizes), which is what gets hashed. */
export function parseClipSpec(input: unknown): ClipParse {
  const r = clipSpecSchema.safeParse(input);
  if (r.success) return { ok: true, spec: r.data };
  return { ok: false, issues: r.error.issues.map((i) => `${i.path.join(".") || "clip"}: ${i.message}`) };
}

const words = (text: string) => text.split(/\s+/).filter(Boolean).length;

/** What is read aloud for a scene (the voice reads `say`, or the caption when there is no script), as plain speakable text. */
export function sceneSpoken(scene: Pick<Scene, "say" | "caption">): string {
  return plain(scene.say ?? scene.caption);
}

/** Seconds a scene stays on screen when nothing is read aloud (same rule as the lesson explainer). */
export function sceneDwellSeconds(caption: string): number {
  return Math.min(7, Math.max(2.6, words(plain(caption)) * 0.38));
}

/** The sentences the narration reads for a scene, exactly as the app and the voice cache split them. Empty when there is no `say`. */
export function sceneSentences(scene: Pick<Scene, "say">): string[] {
  return scene.say ? sentences(plain(scene.say)) : [];
}

/** Every distinct sentence the clip needs voiced, in order. */
export function clipSentences(spec: Pick<ClipSpec, "scenes">): string[] {
  return [...new Set(spec.scenes.flatMap(sceneSentences))];
}

const estimateSentenceSeconds = (sentence: string) => Math.max(0.6, words(sentence) / CLIP_WORDS_PER_SECOND);

/** About how long the finished video runs: narration at 2.3 words a second, 0.5 s after each scene, plus the two cards. */
export function estimateClipSeconds(spec: Pick<ClipSpec, "scenes">): number {
  const body = spec.scenes.reduce((n, s) => {
    const parts = sceneSentences(s);
    const talk = parts.length ? parts.reduce((t, p) => t + estimateSentenceSeconds(p), 0) : sceneDwellSeconds(s.caption);
    return n + talk + CLIP_SCENE_GAP_SECONDS;
  }, 0);
  return body + 2 * CLIP_CARD_SECONDS;
}

/** The `seconds` value for the lesson's clip block: the estimate rounded up, kept inside the block's 5 to 90 range. */
export function clipBlockSeconds(spec: Pick<ClipSpec, "scenes">): number {
  return Math.min(90, Math.max(5, Math.ceil(estimateClipSeconds(spec))));
}

/** The words spoken in the clip, for the transcript shown under the video. */
export function clipTranscript(spec: Pick<ClipSpec, "scenes">): string {
  return spec.scenes.filter((s) => s.say).map((s) => plain(s.say as string)).join(" ");
}

/** Gentle advice (not errors) about a clip that is outside the target length. */
export function clipWarnings(spec: Pick<ClipSpec, "scenes">): string[] {
  const out: string[] = [];
  const s = estimateClipSeconds(spec);
  if (s < CLIP_TARGET_SECONDS[0]) out.push(`About ${Math.round(s)} seconds: aim for ${CLIP_TARGET_SECONDS[0]} to ${CLIP_TARGET_SECONDS[1]}.`);
  if (s > CLIP_TARGET_SECONDS[1]) out.push(`About ${Math.round(s)} seconds: aim for ${CLIP_TARGET_SECONDS[0]} to ${CLIP_TARGET_SECONDS[1]}.`);
  return out;
}

/**
 * The file names for a clip: `clip-<lesson-slug>-<first 8 hex of the spec hash>.mp4` and the same with `.webp` for the poster.
 * They match the clip block's `asset` and `poster` patterns. The hash comes from clipSpecHash in scripts/clip-kit.mjs.
 */
export function clipAssetNames(slug: string, specHash: string): { asset: string; poster: string } {
  const base = `clip-${slug}-${specHash.slice(0, 8)}`.toLowerCase();
  return { asset: `${base}.mp4`, poster: `${base}.webp` };
}

// --- Timeline (shared by the preview, the tests and the Remotion composition) -------------------------

export type ClipSentenceTiming = { text: string; startFrame: number; frames: number };
export type ClipSceneTiming = {
  startFrame: number;
  frames: number;
  /** The sentences being spoken, in order; one entry holding the caption when the scene has no `say`. */
  sentences: ClipSentenceTiming[];
  spoken: boolean;
};
export type ClipTimeline = { fps: number; titleFrames: number; endFrames: number; stageFrames: number; scenes: ClipSceneTiming[]; totalFrames: number };

/**
 * Lay the clip out in frames: title card, each scene (its sentences back to back, then a 0.5 s pause), end card.
 * `durations[i][j]` is the measured length in seconds of scene i's sentence j (from the real mp3 files); when it is missing
 * the narration pace estimate is used, which is what the silent preview does.
 */
export function buildClipTimeline(spec: Pick<ClipSpec, "scenes">, opts: { fps?: number; durations?: (number[] | undefined)[] } = {}): ClipTimeline {
  const fps = opts.fps ?? CLIP_FPS;
  const f = (sec: number) => Math.max(1, Math.round(sec * fps));
  let at = f(CLIP_CARD_SECONDS);
  const titleFrames = at;
  const scenes: ClipSceneTiming[] = spec.scenes.map((scene, i) => {
    const parts = sceneSentences(scene);
    const startFrame = at;
    let cursor = at;
    let timings: ClipSentenceTiming[];
    if (parts.length) {
      const measured = opts.durations?.[i];
      timings = parts.map((text, j) => {
        const frames = f(measured?.[j] ?? estimateSentenceSeconds(text));
        const t = { text, startFrame: cursor, frames };
        cursor += frames;
        return t;
      });
    } else {
      const frames = f(sceneDwellSeconds(scene.caption));
      timings = [{ text: plain(scene.caption), startFrame: cursor, frames }];
      cursor += frames;
    }
    cursor += f(CLIP_SCENE_GAP_SECONDS);
    at = cursor;
    return { startFrame, frames: cursor - startFrame, sentences: timings, spoken: parts.length > 0 };
  });
  const stageFrames = at - titleFrames;
  const endFrames = f(CLIP_CARD_SECONDS);
  return { fps, titleFrames, endFrames, stageFrames, scenes, totalFrames: at + endFrames };
}

/** Which scene is on screen at a frame of the stage part (0 = first frame after the title card). Clamped to the last scene. */
export function sceneIndexAt(timeline: ClipTimeline, stageFrame: number): number {
  const t = stageFrame + timeline.titleFrames;
  let idx = 0;
  timeline.scenes.forEach((s, i) => { if (t >= s.startFrame) idx = i; });
  return idx;
}
