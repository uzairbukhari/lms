// Rewards for the children (week streak, sticker book, points shop, brain teaser). Shared so the Worker and the
// browser agree on what exists. Nothing here ranks children against each other: everything is personal.

// --- Week streak -------------------------------------------------------------------------------------

/**
 * `weeks` is every released week in time order, true when the child finished all its lessons. The streak is the run
 * of finished weeks ending now. A current week that is not finished yet does not break the streak (it is still on).
 */
export function weekStreak(weeks: { done: boolean; current: boolean }[]): { current: number; best: number } {
  let best = 0;
  let run = 0;
  for (const w of weeks) {
    if (w.done) { run++; best = Math.max(best, run); }
    else if (!w.current) run = 0;
  }
  // Trailing run: skip an unfinished current week at the end.
  let current = 0;
  for (let i = weeks.length - 1; i >= 0; i--) {
    const w = weeks[i] as { done: boolean; current: boolean };
    if (w.done) current++;
    else if (w.current && i === weeks.length - 1) continue;
    else break;
  }
  return { current, best };
}

// --- Stickers ----------------------------------------------------------------------------------------

export const STICKERS = [
  { id: "first-lesson", emoji: "🌟", name: "First step", how: "Finish your first lesson" },
  { id: "first-100", emoji: "💯", name: "Full marks", how: "Get every question right in a quiz" },
  { id: "quizzes-10", emoji: "🎯", name: "Quiz star", how: "Pass 10 quizzes" },
  { id: "full-week", emoji: "🗓️", name: "Busy bee week", how: "Finish a week with 5 or more lessons" },
  { id: "streak-3", emoji: "🔥", name: "On fire", how: "Finish 3 weeks in a row" },
  { id: "streak-6", emoji: "🚀", name: "Rocket streak", how: "Finish 6 weeks in a row" },
  { id: "map-semester", emoji: "🏰", name: "Castle reached", how: "Reach all 12 stops on a semester map" },
  { id: "points-100", emoji: "💰", name: "Treasure keeper", how: "Collect 100 map points" },
  { id: "teaser-5", emoji: "🧩", name: "Puzzle fan", how: "Solve 5 daily brain teasers" },
  { id: "shopper", emoji: "🛍️", name: "First treat", how: "Buy something in the shop" },
] as const;
export type StickerId = (typeof STICKERS)[number]["id"];

// --- Shop --------------------------------------------------------------------------------------------

export const SHOP_SLOTS = ["hat", "pet", "trail"] as const;
export type ShopSlot = (typeof SHOP_SLOTS)[number];
export const SLOT_LABEL: Record<ShopSlot, string> = { hat: "Hats", pet: "Pets", trail: "Trail sparkles" };

export const SHOP_ITEMS = [
  { id: "hat-cap", slot: "hat", emoji: "🧢", name: "Sporty cap", cost: 10 },
  { id: "hat-party", slot: "hat", emoji: "🥳", name: "Party hat", cost: 15 },
  { id: "hat-grad", slot: "hat", emoji: "🎓", name: "Graduation cap", cost: 25 },
  { id: "hat-top", slot: "hat", emoji: "🎩", name: "Top hat", cost: 30 },
  { id: "hat-crown", slot: "hat", emoji: "👑", name: "Golden crown", cost: 60 },
  { id: "pet-cat", slot: "pet", emoji: "🐱", name: "Kitten", cost: 20 },
  { id: "pet-dog", slot: "pet", emoji: "🐶", name: "Puppy", cost: 20 },
  { id: "pet-turtle", slot: "pet", emoji: "🐢", name: "Turtle", cost: 25 },
  { id: "pet-fox", slot: "pet", emoji: "🦊", name: "Fox", cost: 35 },
  { id: "pet-panda", slot: "pet", emoji: "🐼", name: "Panda", cost: 45 },
  { id: "pet-unicorn", slot: "pet", emoji: "🦄", name: "Unicorn", cost: 80 },
  { id: "trail-sparkle", slot: "trail", emoji: "✨", name: "Sparkles", cost: 15 },
  { id: "trail-flowers", slot: "trail", emoji: "🌸", name: "Flower petals", cost: 25 },
  { id: "trail-rainbow", slot: "trail", emoji: "🌈", name: "Rainbow", cost: 40 },
  { id: "trail-hearts", slot: "trail", emoji: "💖", name: "Hearts", cost: 40 },
] as const;
export type ShopItemId = (typeof SHOP_ITEMS)[number]["id"];
export const shopItem = (id: string) => SHOP_ITEMS.find((i) => i.id === id);

// --- Plant growth ------------------------------------------------------------------------------------

export const GROWTH_STAGES = [
  { min: 0, emoji: "🌰", label: "A seed" },
  { min: 1, emoji: "🌱", label: "A sprout" },
  { min: 3, emoji: "🌿", label: "A little plant" },
  { min: 6, emoji: "🪴", label: "A bushy plant" },
  { min: 10, emoji: "🌳", label: "A tree" },
  { min: 15, emoji: "🍎", label: "A tree with fruit" },
] as const;
/** The stage for a number of lessons finished in one subject. */
export const growthStage = (lessonsDone: number) => [...GROWTH_STAGES].reverse().find((s) => lessonsDone >= s.min) ?? GROWTH_STAGES[0];

// --- Brain teaser of the day --------------------------------------------------------------------------

export type Teaser = { kind: "pattern" | "odd-one-out" | "missing-number" | "double"; prompt: string; shown: string; options: string[]; answer: string; explain: string };

/** A small seeded random generator so the same day gives the same puzzle on every device. */
export function seeded(seed: string): () => number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

const ODD_SETS: { same: string[]; odd: string[]; why: string }[] = [
  { same: ["🍎", "🍌", "🍇", "🍓"], odd: ["🚗", "⚽", "📚"], why: "is not a fruit" },
  { same: ["🐶", "🐱", "🐰", "🐻"], odd: ["🌳", "🏠", "🍕"], why: "is not an animal" },
  { same: ["🚗", "🚌", "🚲", "✈️"], odd: ["🍎", "🐟", "🌼"], why: "cannot take you somewhere" },
  { same: ["🌼", "🌹", "🌷", "🌻"], odd: ["🐘", "🍞", "⚽"], why: "is not a flower" },
  { same: ["☀️", "🌙", "⭐", "☁️"], odd: ["🍕", "🐶", "🚗"], why: "is not in the sky" },
];

const shuffle = <T,>(rand: () => number, list: T[]) => [...list].sort(() => rand() - 0.5);
const pick = <T,>(rand: () => number, list: T[]) => list[Math.floor(rand() * list.length)] as T;
const wrongNumbers = (rand: () => number, answer: number, count: number) => {
  const set = new Set<number>();
  while (set.size < count) { const w = answer + Math.floor(rand() * 7) - 3; if (w !== answer && w >= 0) set.add(w); }
  return [...set];
};

/** Today's puzzle for a level (1 = younger, 2 = older). The kind rotates by day; numbers and pictures come from the seed. */
export function teaserFor(day: string, level: 1 | 2): Teaser {
  const rand = seeded(`${day}:${level}`);
  const kinds: Teaser["kind"][] = ["pattern", "odd-one-out", "missing-number", "double"];
  const dayNumber = Math.floor(Date.parse(`${day}T00:00:00Z`) / 86_400_000);
  const kind = kinds[((dayNumber % 4) + 4) % 4] as Teaser["kind"];
  const options = (answer: string, wrong: string[]) => shuffle(rand, [answer, ...wrong]);

  if (kind === "pattern") {
    const step = level === 1 ? pick(rand, [2, 3, 5, 10]) : pick(rand, [4, 6, 7, 9, 12]);
    const start = Math.floor(rand() * (level === 1 ? 10 : 30)) + 1;
    const seq = [0, 1, 2, 3].map((i) => start + i * step);
    const answer = start + 4 * step;
    return { kind, prompt: "What number comes next?", shown: `${seq.join(", ")}, ?`, options: options(String(answer), wrongNumbers(rand, answer, 3).map(String)), answer: String(answer), explain: `The numbers go up by ${step} each time, so ${seq[3]} + ${step} = ${answer}.` };
  }
  if (kind === "odd-one-out") {
    const set = pick(rand, ODD_SETS);
    const same = shuffle(rand, set.same).slice(0, 3);
    const odd = pick(rand, set.odd);
    return { kind, prompt: "Which one does not belong?", shown: "", options: shuffle(rand, [...same, odd]), answer: odd, explain: `${odd} ${set.why}.` };
  }
  if (kind === "missing-number") {
    const a = Math.floor(rand() * (level === 1 ? 9 : 40)) + 2;
    const b = Math.floor(rand() * (level === 1 ? 9 : 40)) + 2;
    const total = a + b;
    return { kind, prompt: "Which number fits in the box?", shown: `${a} + □ = ${total}`, options: options(String(b), wrongNumbers(rand, b, 3).map(String)), answer: String(b), explain: `${total} − ${a} = ${b}.` };
  }
  const n = level === 1 ? Math.floor(rand() * 8) + 2 : Math.floor(rand() * 15) + 6;
  const answer = n * 2;
  return { kind, prompt: "I am thinking of a number. I double it and get this number. What was my number?", shown: String(answer), options: options(String(n), wrongNumbers(rand, n, 3).map(String)), answer: String(n), explain: `Double ${n} is ${answer}, so I was thinking of ${n}.` };
}
