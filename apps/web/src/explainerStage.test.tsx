import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { ExplainerScene } from "@lms/schema";
import { ExplainerStage } from "./components/ExplainerStage";
import { countAt } from "./anim/Actor";

// The stage is a pure view of (scenes, step): the lesson player and the clip renderer both draw it.
const item = (over: Record<string, unknown>) => ({ x: 50, y: 50, size: 2, anim: "none", ...over });
const scenes = [
  { caption: "Start", items: [item({ id: "a", emoji: "🐭", x: 20 }), item({ id: "n", emoji: "🔢", label: "10", effect: "count" })] },
  { caption: "Move **on**", items: [item({ id: "a", emoji: "🐭", x: 80 }), item({ id: "n", emoji: "🔢", label: "10", effect: "count" }), item({ emoji: "🍕", x: 40 })] },
] as unknown as ExplainerScene[];

describe("ExplainerStage", () => {
  it("draws one element per id, which moves between steps", () => {
    const a = renderToStaticMarkup(<ExplainerStage scenes={scenes} step={0} backdrop="plain" />);
    const b = renderToStaticMarkup(<ExplainerStage scenes={scenes} step={1} backdrop="plain" />);
    expect(a).toContain('aria-label="Start"');
    expect(a).toContain("left:20%");
    expect(b).toContain("left:80%");
    expect(b).toContain("🍕");
    expect(a.match(/exit-fade/g)).toHaveLength(1); // not here yet: drawn hidden
    expect(b).not.toContain("exit-fade");
    expect(a).toContain("transition-[left,top]");
  });

  it("is the same markup every time (no timers, no randomness)", () => {
    const draw = () => renderToStaticMarkup(<ExplainerStage scenes={scenes} step={1} backdrop="plain" />);
    expect(draw()).toBe(draw());
  });

  it("takes a count-up value from the clock when one is given, and ticks by itself otherwise", () => {
    const at = (ms: number) => renderToStaticMarkup(<ExplainerStage scenes={scenes} step={0} backdrop="plain" clock={{ stepStartMs: [0, 1000], nowMs: ms }} />);
    expect(at(0)).toContain(">0</span>");
    expect(at(120)).toContain(">2</span>");
    expect(at(5000)).toContain(">10</span>");
    expect(renderToStaticMarkup(<ExplainerStage scenes={scenes} step={0} backdrop="plain" />)).toContain(">0</span>");
    expect([0, 59, 60, 600, 1200, 99999].map((ms) => countAt(40, ms))).toEqual([0, 0, 2, 20, 40, 40]);
  });
});
