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
