import { describe, expect, it } from "vitest";
import { DEFAULT_THEME, THEMES, isThemeId } from "./index";

describe("themes", () => {
  it("defaults to Space Explorers", () => {
    expect(DEFAULT_THEME).toBe("space");
  });

  it("lists all four themes", () => {
    expect([...THEMES]).toEqual(["space", "candy", "sunny", "forest"]);
  });

  it("recognises valid theme ids only", () => {
    expect(isThemeId("candy")).toBe(true);
    expect(isThemeId("neon")).toBe(false);
    expect(isThemeId(undefined)).toBe(false);
  });
});

import { blockNarration } from "./slides";
describe("teaching script", () => {
  it("is read aloud instead of the words on screen", () => {
    expect(blockNarration({ type: "text", markdown: "34 is **3 tens**", say: "Thirty-four is three tens and four ones." } as never)).toBe("Thirty-four is three tens and four ones.");
    expect(blockNarration({ type: "text", markdown: "Plain **text**" })).toBe("Plain text");
  });
});
