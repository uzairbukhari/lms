// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { applyTheme, getStoredTheme } from "./theme";

describe("theme storage", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("defaults to space when nothing is saved", () => {
    expect(getStoredTheme()).toBe("space");
  });

  it("applies and remembers a theme", () => {
    applyTheme("candy");
    expect(document.documentElement.getAttribute("data-theme")).toBe("candy");
    expect(getStoredTheme()).toBe("candy");
  });

  it("ignores an invalid saved value", () => {
    localStorage.setItem("lms-theme", "neon");
    expect(getStoredTheme()).toBe("space");
  });
});
