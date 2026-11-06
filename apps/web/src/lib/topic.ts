export type SubLessonCard = { id: string; kind: "learn" | "try" | "play" | "use"; title: string; viewed: boolean; miniBest: number | null; miniCount: number; weak: boolean };
export type TopicData = {
  successCriteria: string[];
  realLife: string | null;
  warmUp: unknown[];
  ratings: { index: number; rating: number }[];
  lastQuiz: { percent: number; passed: boolean } | null;
  practise: { subId: string; title: string; wrong: number; total: number }[];
  subLessons: SubLessonCard[];
};
export type TopicLesson = { lesson: { id: string; title: string; subject: string; summary: string; minutes: number; objectives: string[] }; topic?: TopicData; readOnly: boolean; quiz: { questionCount: number; passPercent: number; inProgress?: { round: number; rounds: number } | null } };
export type PathTopic = { lessonId: string; title: string; position: number; status: "done" | "current" | "early" | "locked"; bestPercent: number | null; attempts: number; partsDone: number; partsTotal: number };
export type GrandQuiz = { quizId: string; status: "locked" | "ready" | "passed"; bestPercent: number | null; attempts: number; questionCount: number };
export type SubjectPath = { courseId: string; subject: string; topics: PathTopic[]; grand?: GrandQuiz | null };

export const KIND = {
  learn: { label: "Learn", emoji: "💡" },
  try: { label: "Try it", emoji: "🛠️" },
  play: { label: "Play", emoji: "🎮" },
  use: { label: "Use it", emoji: "🌍" },
} as const;

/** 3 stars for 90%+, 2 for 80%+, 1 for a pass (70%+), else none. */
export const starsFor = (percent: number | null): number => (percent === null ? 0 : percent >= 90 ? 3 : percent >= 80 ? 2 : percent >= 70 ? 1 : 0);

/** A big friendly glyph for a topic tile, picked from its title; falls back to the subject emoji. */
export function tileGlyph(title: string, fallback: string): string {
  const t = title.toLowerCase();
  const rules: [RegExp, string][] = [
    [/number facts|bonds/, "5+5"], [/place value/, "47"], [/add|subtract|taking/, "38+5"], [/money|coin/, "£1"],
    [/multipl|shar|divid/, "2×5"], [/fraction/, "½"], [/time|measur/, "🕐"], [/shape|geometry/, "△"],
  ];
  return rules.find(([re]) => re.test(t))?.[1] ?? fallback;
}

/** Pastel tile colours shared by the trail, card views and topic parts (dark ink on top). */
export const PASTELS = ["#ffb3c7", "#a0e8c8", "#ffd166", "#a5d8ff", "#d0bfff", "#ffc9a0", "#9fe3e0", "#f7a8e0"];
export const pastel = (i: number): string => PASTELS[i % PASTELS.length]!;
