import type { ViewQuestion } from "../components/QuestionView";

export type DeckCard =
  | { id: string; source: "glossary" | "deck"; mode: "flip"; front: string; back: string; emoji: string | null; box: number }
  | { id: string; source: "glossary" | "deck"; mode: "choose"; front: string; options: string[]; emoji: string | null; box: number }
  | { id: string; source: "question"; mode: "question"; front: string; question: ViewQuestion & { id: string }; box: number };
export type Deck = { kind: "daily" | "boost" | "semester" | "words"; level: 1 | 2; cards: DeckCard[] };
export type AnswerResult = { correct: boolean; box: number; mastered: boolean; due: string; explanation?: string; answer?: string };
export type CardSummary = { daily: number; boost: number; mastered: number; words: number; dailyDone: boolean; boostDone: boolean };
export type WordRow = { word: string; meaning: string; source: "lesson" | "ai"; lesson: string; subject: string; mastered: boolean };
export type Revision = { semester: number; subjects: { subject: string; lessons: string[]; words: { term: string; meaning: string }[]; questions: { id: string; prompt: string; answer: string; explanation: string | null }[] }[] };

/** Levels are shown to children as stars on the card: 1 to 5. */
export const levelStars = (box: number) => "⭐".repeat(Math.max(0, Math.min(5, box))) || "🆕";
