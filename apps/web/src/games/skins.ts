import type { ThemeId } from "@lms/schema";

// Pictures for the semester map and the mini games, per theme. Emoji keep it light (nothing to download).

export type Skin = {
  /** Map: the character's ride, the checkpoint pictures (12 weeks), the finish, decorations. */
  ride: string;
  stops: string[];
  finish: string;
  start: string;
  decor: string[];
  trailName: string;
  /** Games */
  catcher: string;
  good: string;
  gold: string;
  bad: string;
  critter: string[];
  sleepy: string;
  hero: string;
  gem: string;
  tiles: string[];
};

export const SKINS: Record<ThemeId, Skin> = {
  space: {
    ride: "🚀", stops: ["🪐", "🌑", "🌍", "🛰️", "🌕", "☄️", "🪐", "🌒", "🛸", "🌖", "🌟", "🌌"], finish: "🏰", start: "🛖",
    decor: ["✨", "⭐", "🌠", "✨", "💫", "⭐"], trailName: "Star Trail",
    catcher: "🛸", good: "⭐", gold: "🌟", bad: "🪨", critter: ["👽", "🤖", "👾"], sleepy: "😴", hero: "🧑‍🚀", gem: "💎",
    tiles: ["🚀", "🪐", "🌙", "⭐", "👽", "🛸", "☄️", "🌍", "🔭", "🛰️"],
  },
  candy: {
    ride: "🦄", stops: ["🍭", "🧁", "🍩", "🍬", "🍪", "🎂", "🍫", "🍡", "🍰", "🍦", "🥧", "🍯"], finish: "🏰", start: "🏠",
    decor: ["🍬", "💖", "✨", "🍭", "💜", "🌈"], trailName: "Candy Lane",
    catcher: "🧺", good: "🍬", gold: "🍭", bad: "🥦", critter: ["🐰", "🐱", "🐻"], sleepy: "😴", hero: "🦄", gem: "🍓",
    tiles: ["🍭", "🧁", "🍩", "🍬", "🍪", "🎂", "🍫", "🍦", "🍓", "🍒"],
  },
  sunny: {
    ride: "🛴", stops: ["🛝", "⛱️", "🎈", "🪁", "⚽", "🎠", "🏀", "🎡", "🪀", "🏓", "🎢", "🏆"], finish: "🏟️", start: "🏡",
    decor: ["☀️", "🌼", "☁️", "🌻", "🦋", "🌷"], trailName: "Sunshine Path",
    catcher: "🪣", good: "🍎", gold: "🌟", bad: "🐝", critter: ["🐹", "🐥", "🐶"], sleepy: "😴", hero: "🐥", gem: "⭐",
    tiles: ["⚽", "🎈", "🪁", "🛝", "☀️", "🌻", "🦋", "🍦", "🏀", "🎠"],
  },
  forest: {
    ride: "🦊", stops: ["🍄", "🌳", "🏕️", "🌲", "🪵", "🦉", "🌿", "🐿️", "🪺", "🌾", "🍁", "🌈"], finish: "🏰", start: "🛖",
    decor: ["🌲", "🍃", "🌳", "🍄", "🌸", "🌿"], trailName: "Woodland Way",
    catcher: "🧺", good: "🌰", gold: "🍄", bad: "🕷️", critter: ["🦔", "🐿️", "🐰"], sleepy: "😴", hero: "🦊", gem: "🍓",
    tiles: ["🦊", "🦉", "🍄", "🌰", "🐿️", "🦔", "🌲", "🍁", "🐸", "🐞"],
  },
};

export const skinFor = (theme: string): Skin => SKINS[(theme in SKINS ? theme : "space") as ThemeId];
