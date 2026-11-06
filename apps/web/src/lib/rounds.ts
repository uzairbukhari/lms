/** Quiz rounds: a client-side view over one question list. Short quizzes stay a single round. */

/** Quizzes with fewer questions than this are never split into rounds. */
export const ROUNDS_FROM = 24;

/**
 * How many questions go in each round.
 * Under 24 questions: one round (the whole quiz).
 * Age band "7-8": rounds of 6. Age band "9-10": rounds of 10 (9 for a 36-question grand quiz).
 * Unknown or mixed band: rounds of 6, which is gentlest for the youngest child.
 */
export function roundSizeFor(ageBand: string | null | undefined, total: number): number {
  if (total < ROUNDS_FROM) return Math.max(1, total);
  if (ageBand === "9-10") return total <= 30 ? 10 : 9;
  return 6;
}

export type Rounds = { size: number; count: number };
export function roundsFor(ageBand: string | null | undefined, total: number): Rounds {
  const size = roundSizeFor(ageBand, total);
  return { size, count: Math.max(1, Math.ceil(total / size)) };
}

/** Which round (0-based) a question index is in. */
export const roundOf = (index: number, size: number): number => Math.floor(index / size);
/** First and last question index (inclusive) of a round. */
export const roundStart = (round: number, size: number): number => round * size;
export const roundEnd = (round: number, size: number, total: number): number => Math.min(total, (round + 1) * size) - 1;

/** The round to resume in: the first round holding an unanswered question (the last round if all are answered). */
export function resumeRound(answered: boolean[], size: number): number {
  const first = answered.findIndex((a) => !a);
  return first === -1 ? roundOf(Math.max(0, answered.length - 1), size) : roundOf(first, size);
}

/** What the topic page needs to show "Carry on: round X of Y". Kept per lesson on this device. */
export type ActiveQuiz = { attemptId: string; round: number; rounds: number };
const activeKey = (lessonId: string) => `lms:quiz-active:${lessonId}`;
export function writeActive(lessonId: string, a: ActiveQuiz | null): void {
  try { if (a) localStorage.setItem(activeKey(lessonId), JSON.stringify(a)); else localStorage.removeItem(activeKey(lessonId)); } catch { /* storage may be blocked */ }
}
export function readActive(lessonId: string): ActiveQuiz | null {
  try {
    const a = JSON.parse(localStorage.getItem(activeKey(lessonId)) ?? "null") as ActiveQuiz | null;
    return a && a.rounds > 1 && a.round >= 1 && a.round <= a.rounds ? a : null;
  } catch { return null; }
}
