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
