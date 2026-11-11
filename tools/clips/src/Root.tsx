import { Composition } from "remotion";
import sample from "../../../content/clips/sample-halves.json";
import type { ClipSpec } from "@lms/schema";
import { ClipFromScenes, FPS, HEIGHT, WIDTH, timelineOf, type ClipProps } from "./ClipFromScenes";

const defaults: ClipProps = { spec: sample as unknown as ClipSpec };

/** The only composition. Props (the spec, and the measured narration files unless `--silent`) come from scripts/render-clip.mjs. */
export const Root = () => (
  <Composition
    id="ClipFromScenes"
    component={ClipFromScenes}
    width={WIDTH}
    height={HEIGHT}
    fps={FPS}
    durationInFrames={timelineOf(defaults).totalFrames}
    defaultProps={defaults}
    calculateMetadata={({ props }) => ({ durationInFrames: timelineOf(props).totalFrames })}
  />
);
