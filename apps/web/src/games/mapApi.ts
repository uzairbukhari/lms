import type { GameId, GameLevel } from "@lms/schema";

export type Checkpoint = {
  week: number;
  state: "locked" | "open" | "reached";
  isCurrentWeek: boolean;
  lessons: { total: number; done: number };
  stars: 0 | 1 | 2 | 3;
  quizPoints: number;
  chestOpened: boolean;
  bestBonus: number;
  plays: number;
  game: GameId;
  level: GameLevel;
};

export type MapData = {
  /** The Journey map: a stop every 3 topics passed. */
  journey?: boolean;
  semester: number;
  semesters: number[];
  now: { semester: number; week: number; exam: boolean } | null;
  checkpoints: Checkpoint[];
  exam: { reached: boolean; isNow: boolean };
  points: { total: number; waiting: number };
};

export type PlayResult = { score: number; bonus: number; firstPlay: boolean; newBest: boolean; points: { total: number; waiting: number } };

/** Where the character was last shown on this device, so the walk to a new checkpoint plays once. */
const posKey = (userId: string, semester: number) => `lms-map-pos:${userId}:${semester}`;
export function lastSeenStop(userId: string, semester: number): number | null {
  try {
    const v = localStorage.getItem(posKey(userId, semester));
    return v === null ? null : Number(v);
  } catch {
    return null;
  }
}
export function rememberStop(userId: string, semester: number, stop: number): void {
  try {
    localStorage.setItem(posKey(userId, semester), String(stop));
  } catch {
    // storage blocked: the walk may play again next time, which is harmless
  }
}
