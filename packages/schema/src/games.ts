// The semester map's mini games (docs/SEMESTER_MAP.md). Shared so the browser and the Worker agree on
// which game each week plays and how a game score turns into a 0-10 bonus.

export const GAME_IDS = ["star-scoop", "number-bubbles", "twin-tiles", "peek-a-pop", "gem-maze", "sort-dash"] as const;
export type GameId = (typeof GAME_IDS)[number];
export type GameLevel = 1 | 2;

export const GAME_INFO: Record<GameId, { title: string; blurb: string; target: Record<GameLevel, number> }> = {
  "star-scoop": { title: "Star Scoop", blurb: "Catch the falling stars and dodge the grumpy rocks!", target: { 1: 30, 2: 45 } },
  "number-bubbles": { title: "Number Bubbles", blurb: "Pop only the bubbles that match the sign.", target: { 1: 14, 2: 18 } },
  "twin-tiles": { title: "Twin Tiles", blurb: "Flip the tiles and find every matching pair.", target: { 1: 100, 2: 100 } },
  "peek-a-pop": { title: "Peek-a-Pop", blurb: "Tap the friendly critters. Let the sleepy ones snooze!", target: { 1: 18, 2: 24 } },
  "gem-maze": { title: "Gem Maze", blurb: "Guide your explorer through the maze and grab the gems.", target: { 1: 8, 2: 10 } },
  "sort-dash": { title: "Sort Dash", blurb: "Send each thing to the right basket, quick!", target: { 1: 16, 2: 22 } },
};

/** The game a teaching week plays: six games, level 1 in weeks 1-6 and level 2 in weeks 7-12. */
export function gameForWeek(week: number): { game: GameId; level: GameLevel } {
  const i = (((week - 1) % GAME_IDS.length) + GAME_IDS.length) % GAME_IDS.length;
  return { game: GAME_IDS[i] as GameId, level: week > GAME_IDS.length ? 2 : 1 };
}

export const MAX_GAME_BONUS = 10;

/** Highest score the server will record for a game (three times the target), so a wild number cannot be stored. */
export const maxGameScore = (game: GameId, level: GameLevel): number => GAME_INFO[game].target[level] * 3;

/** Game score to bonus points: reaching the level's target earns the full 10. */
export function gameBonus(game: GameId, level: GameLevel, score: number): number {
  const s = Math.max(0, Math.min(score, maxGameScore(game, level)));
  return Math.min(MAX_GAME_BONUS, Math.round((s / GAME_INFO[game].target[level]) * MAX_GAME_BONUS));
}

/** Quiz points for one lesson: best graded try out of 10; a quiz only ever taken as practice earns half. */
export function lessonQuizPoints(bestGraded: number | null, bestPractice: number | null): number {
  if (bestGraded !== null) return Math.round(bestGraded / 10);
  if (bestPractice !== null) return Math.round(bestPractice / 20);
  return 0;
}

/** Stars for a week from the average best quiz percent: 90%+ three, 70%+ two, any quiz taken one. */
export function weekStars(bestPercents: number[]): 0 | 1 | 2 | 3 {
  if (bestPercents.length === 0) return 0;
  const avg = bestPercents.reduce((a, b) => a + b, 0) / bestPercents.length;
  return avg >= 90 ? 3 : avg >= 70 ? 2 : 1;
}
