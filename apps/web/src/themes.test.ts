import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { THEMES } from "@lms/schema";

const css = readFileSync(new URL("./themes.css", import.meta.url), "utf8");

function parseThemes(source: string): Record<string, Record<string, string>> {
  const themes: Record<string, Record<string, string>> = {};
  for (const block of source.matchAll(/\[data-theme="(\w+)"\]\s*\{([^}]*)\}/g)) {
    const [, id, body] = block;
    const vars: Record<string, string> = {};
    for (const decl of (body ?? "").matchAll(/--([\w-]+):\s*([^;]+);/g)) {
      vars[decl[1] as string] = (decl[2] as string).trim();
    }
    themes[id as string] = vars;
  }
  return themes;
}

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const channels = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * (channels[0] as number) + 0.7152 * (channels[1] as number) + 0.0722 * (channels[2] as number);
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

const REQUIRED = [
  "bg", "surface", "surface-border", "text", "text-muted", "accent", "accent-contrast",
  "radius", "border-width", "shadow", "font-display", "font-body",
];

const themes = parseThemes(css);

describe("theme tokens", () => {
  it("defines every theme id from the shared package", () => {
    expect(Object.keys(themes).sort()).toEqual([...THEMES].sort());
  });

  for (const id of THEMES) {
    describe(id, () => {
      const t = themes[id] ?? {};

      it("defines all required tokens", () => {
        for (const name of REQUIRED) expect(t[name], `--${name}`).toBeTruthy();
      });

      it("meets WCAG AA contrast (4.5:1) for text pairs", () => {
        const pairs: [string, string][] = [
          ["text", "bg"],
          ["text-muted", "bg"],
          ["text", "surface"],
          ["text-muted", "surface"],
          ["accent-contrast", "accent"],
        ];
        for (const [fg, bg] of pairs) {
          const ratio = contrast(t[fg] as string, t[bg] as string);
          expect(ratio, `${id}: --${fg} on --${bg} is ${ratio.toFixed(2)}`).toBeGreaterThanOrEqual(4.5);
        }
      });
    });
  }
});
