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
export type TopicLesson = { lesson: { id: string; title: string; subject: string; summary: string; minutes: number; objectives: string[] }; topic?: TopicData; readOnly: boolean; quiz: { questionCount: number; passPercent: number } };
export type PathTopic = { lessonId: string; title: string; position: number; status: "done" | "current" | "early" | "locked"; bestPercent: number | null; attempts: number };
export type SubjectPath = { courseId: string; subject: string; topics: PathTopic[] };

export const KIND = {
  learn: { label: "Learn", emoji: "💡" },
  try: { label: "Try it", emoji: "🛠️" },
  play: { label: "Play", emoji: "🎮" },
  use: { label: "Use it", emoji: "🌍" },
} as const;
