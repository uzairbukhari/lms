import { useEffect, useState } from "react";

// The three children of the splash screen: Fatima, Zainab and Ibrahim. Each has seven poses, cut out of Uzair's
// artwork and stored as transparent images in public/kids/. A scene "acts" by swapping poses on a timeline.
// All images share one canvas (450x630, feet at the bottom) so swapping poses never makes a child jump.

export type Kid = "long" | "curly" | "boy";
export type Pose = "stand" | "wave" | "cheer" | "run1" | "run2" | "catch" | "blink";
export const POSES: Pose[] = ["stand", "wave", "cheer", "run1", "run2", "catch", "blink"];
export const KID_FILES: Record<Kid, string> = { long: "fatima", curly: "zainab", boy: "ibrahim" };
/** [seconds from the start of the scene, pose to switch to] */
export type PoseStep = [number, Pose];

export function poseUrl(kid: Kid, pose: Pose): string {
  return `/kids/${KID_FILES[kid]}-${pose}.webp`;
}

/** Alternate the two running poses between two times (seconds), switching every `every` seconds. */
export function runSteps(from: number, to: number, every = 0.16): PoseStep[] {
  const steps: PoseStep[] = [];
  let flip = false;
  for (let t = from; t < to; t += every) {
    steps.push([t, flip ? "run2" : "run1"]);
    flip = !flip;
  }
  return steps;
}

/** Load all 21 images so poses swap without flicker. Resolves when done, or after `ms` whatever happens. */
export function preloadKids(ms = 2500): Promise<void> {
  const loads = (Object.keys(KID_FILES) as Kid[]).flatMap((k) =>
    POSES.map(
      (p) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = poseUrl(k, p);
        }),
    ),
  );
  return Promise.race([Promise.all(loads).then(() => undefined), new Promise<void>((r) => window.setTimeout(r, ms))]);
}

/** The pose for a child at this moment of the scene. `steps` is relative to when the component mounted. */
export function usePose(steps: PoseStep[] = []): Pose {
  const [pose, setPose] = useState<Pose>("stand");
  useEffect(() => {
    const timers = steps.map(([t, p]) => window.setTimeout(() => setPose(p), t * 1000));
    return () => timers.forEach((id) => window.clearTimeout(id));
    // The timeline is fixed for the life of the scene.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return pose;
}

export function KidPuppet({ kid, steps = [], className = "" }: { kid: Kid; steps?: PoseStep[]; className?: string }) {
  const pose = usePose(steps);
  return (
    <div className={`kid kid-${kid} ${className}`} aria-hidden="true">
      <img className="kid-img" src={poseUrl(kid, pose)} alt="" draggable={false} />
      {/* A quick blink while standing still. */}
      {pose === "stand" && <img className="kid-blink" src={poseUrl(kid, "blink")} alt="" draggable={false} />}
    </div>
  );
}
