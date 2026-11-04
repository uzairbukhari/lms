import { beforeEach, describe, expect, it } from "vitest";
import { SCENES, nextScene } from "./anim/Splash";

describe("splash scene choice", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    (globalThis as { localStorage?: unknown }).localStorage = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
    };
  });

  it("never shows the same scene twice in a row", () => {
    let last = nextScene();
    for (let i = 0; i < 60; i++) {
      const next = nextScene();
      expect(next).not.toBe(last);
      last = next;
    }
  });

  it("can reach every scene", () => {
    const seen = new Set<string>();
    for (let i = 0; i < 80; i++) seen.add(nextScene());
    expect([...seen].sort()).toEqual([...SCENES].sort());
  });

  it("still picks a scene when storage is unavailable", () => {
    (globalThis as { localStorage?: unknown }).localStorage = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
    expect(SCENES).toContain(nextScene());
  });
});

import { SPLASH_MS } from "./anim/Splash";
import { soundTimeline } from "./anim/splashSound";

describe("splash sounds", () => {
  it("every scene has sounds that finish before the splash ends and end with a fanfare", () => {
    for (const scene of SCENES) {
      const events = soundTimeline(scene);
      expect(events.length).toBeGreaterThan(8);
      for (const e of events) {
        expect(e.at).toBeGreaterThan(0);
        expect(e.at).toBeLessThan(SPLASH_MS / 1000 - 0.8); // room for the sound to ring out
      }
      expect(events.some((e) => e.fx === "fanfare")).toBe(true);
    }
  });

  it("plays one xylophone note per letter block, rising", () => {
    const notes = soundTimeline("blocks").filter((e) => ["do", "re", "mi", "fa", "sol"].includes(e.fx));
    expect(notes.map((e) => e.fx)).toEqual(["do", "re", "mi", "fa", "sol"]);
  });
});
