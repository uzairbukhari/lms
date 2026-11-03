import { describe, expect, it } from "vitest";
import { pickBackdrop } from "./anim/Backdrop";
import { placeActors, splitEmoji } from "./anim/Stage";

describe("lesson animation helpers", () => {
  it("splits an emoji picture into one actor per emoji", () => {
    expect(splitEmoji("🐪🐟🦅")).toEqual(["🐪", "🐟", "🦅"]);
    expect(splitEmoji("👨‍👩‍👧")).toHaveLength(1);
  });

  it("spreads actors across the stage and over the slide's sentences", () => {
    const a = placeActors([{ emoji: "🐻" }, { emoji: "🌲" }], 3);
    expect(a.map((x) => x.at)).toEqual([0, 1]);
    expect(a[0]!.x).toBeLessThan(a[1]!.x);
    expect(placeActors([{ emoji: "🐻", at: 2, x: 10 }], 3)[0]).toMatchObject({ at: 2, x: 10 });
  });

  it("picks scenery from the words, then from the subject", () => {
    expect(pickBackdrop("A bear lives in a forest 🐻🌲")).toBe("forest");
    expect(pickBackdrop("Rockets fly to the Moon")).toBe("space");
    expect(pickBackdrop("Count to ten", "maths")).toBe("classroom");
    expect(pickBackdrop("Count to ten")).toBe("plain");
  });
});
