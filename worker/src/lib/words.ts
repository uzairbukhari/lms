// Friendly generated passwords like "blue-tiger-42": easy for a child to read and type.

const COLOURS = ["red", "blue", "green", "pink", "gold", "purple", "orange", "silver", "yellow", "teal", "brown", "white"];
const ANIMALS = [
  "tiger", "panda", "koala", "otter", "zebra", "lion", "rabbit", "dolphin", "penguin", "turtle",
  "monkey", "parrot", "giraffe", "fox", "owl", "hippo", "puppy", "kitten", "pony", "dragon",
];

/** Uniform random integer in [0, max) from crypto randomness (no modulo bias). */
export function randomInt(max: number): number {
  const limit = Math.floor(0x1_0000_0000 / max) * max;
  const buf = new Uint32Array(1);
  do {
    crypto.getRandomValues(buf);
  } while ((buf[0] as number) >= limit);
  return (buf[0] as number) % max;
}

export function generatePassword(): string {
  const colour = COLOURS[randomInt(COLOURS.length)] as string;
  const animal = ANIMALS[randomInt(ANIMALS.length)] as string;
  const number = 10 + randomInt(90);
  return `${colour}-${animal}-${number}`;
}

/** "Maya Rose" -> "mayarose". Returns "" if nothing usable is left. */
export function usernameBase(displayName: string): string {
  return displayName
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 16);
}
