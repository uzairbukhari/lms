import type { ShopSlot, Teaser } from "@lms/schema";

export type Sticker = { id: string; emoji: string; name: string; how: string; earned: boolean; isNew: boolean };
export type ShopRow = { id: string; slot: ShopSlot; emoji: string; name: string; cost: number; owned: boolean; equipped: boolean; affordable: boolean };
export type Rewards = {
  streak: { current: number; best: number };
  points: { earned: number; spent: number; balance: number };
  stickers: Sticker[];
  shop: ShopRow[];
  equipped: Partial<Record<ShopSlot, string>>;
};
export type TeaserState = { day: string; level: 1 | 2; teaser: Teaser; done: boolean; correct: boolean | null; solved: number };
export type Growth = {
  subjects: { subject: string; lessonsDone: number; stage: { emoji: string; label: string }; improved: number; lessons: { id: string; title: string; first: number; best: number; tries: number }[] }[];
};

/** The emoji a child is wearing on the map, looked up from the shop list. */
export function wornEmoji(r: Rewards | null, slot: ShopSlot): string | null {
  const id = r?.equipped[slot];
  return r?.shop.find((i) => i.id === id)?.emoji ?? null;
}
