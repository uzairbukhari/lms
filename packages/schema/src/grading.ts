import type { CheckQuestion, QuizQuestion } from "./lesson";

// Grading is shared: the Worker grades every quiz and exam (the real score), and the lesson player uses the
// same function for instant, ungraded "check your understanding" feedback.

type AnyQuestion = QuizQuestion | CheckQuestion;

/** What a child answered. The shape depends on the question type. */
export type Response = string[] | boolean | number | string | Record<string, string> | null | undefined;

export interface GradeResult {
  correct: boolean;
  /** Points earned: all of them when correct; order and match questions give part credit. */
  points: number;
  /** 0 to 1: how much of the answer was right. */
  fraction: number;
}

const NONE: GradeResult = { correct: false, points: 0, fraction: 0 };

/** Lower case, no accents or punctuation, single spaces. "  The  Moon! " -> "the moon". */
export function normaliseText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s.]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseNumber(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string") return null;
  const cleaned = value.trim().replace(/\s+/g, "").replace(",", ".");
  if (!/^-?\d*\.?\d+$/.test(cleaned)) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

const sameSet = (a: string[], b: string[]) => a.length === b.length && [...a].sort().join("\u0000") === [...b].sort().join("\u0000");

export function gradeQuestion(q: AnyQuestion, response: Response): GradeResult {
  const points = q.points ?? 1;
  const result = (fraction: number): GradeResult => {
    if (fraction >= 1) return { correct: true, points, fraction: 1 };
    const partial = q.type === "order" || q.type === "match" ? Math.floor(points * fraction) : 0;
    return { correct: false, points: partial, fraction };
  };

  switch (q.type) {
    case "multiple_choice": {
      const picked = Array.isArray(response) ? response : typeof response === "string" ? [response] : [];
      return result(picked.length === 1 && picked[0] === q.answer[0] ? 1 : 0);
    }
    case "multi_select": {
      const picked = Array.isArray(response) ? [...new Set(response)] : [];
      return result(sameSet(picked, q.answer) ? 1 : 0);
    }
    case "true_false": {
      const value = typeof response === "boolean" ? response : response === "true" ? true : response === "false" ? false : undefined;
      return result(value !== undefined && value === q.answer[0] ? 1 : 0);
    }
    case "number": {
      const n = parseNumber(response);
      if (n === null) return NONE;
      return result(Math.abs(n - q.answer.value) <= q.answer.tolerance + 1e-9 ? 1 : 0);
    }
    case "short_text": {
      if (typeof response !== "string") return NONE;
      const given = normaliseText(response);
      return result(given !== "" && q.answer.accepted.some((a) => normaliseText(a) === given) ? 1 : 0);
    }
    case "order": {
      if (!Array.isArray(response)) return NONE;
      const right = q.answer.filter((id, i) => response[i] === id).length;
      return result(response.length === q.answer.length ? right / q.answer.length : 0);
    }
    case "match": {
      if (!response || typeof response !== "object" || Array.isArray(response)) return NONE;
      const pairs = Object.entries(q.answer);
      const right = pairs.filter(([l, r]) => (response as Record<string, string>)[l] === r).length;
      return result(right / pairs.length);
    }
  }
}

/** A question as a child sees it: everything except the answer. */
export type PublicQuestion = Omit<QuizQuestion, "answer" | "explanation"> & { id: string };

/** Strip the answer (and the explanation, shown only after submitting) before sending a question to a child. */
export function toPublicQuestion(q: QuizQuestion, id: string): PublicQuestion {
  const { answer: _answer, explanation: _explanation, ...rest } = q as QuizQuestion & { answer: unknown; explanation?: string };
  return { ...(rest as Omit<QuizQuestion, "answer" | "explanation">), id };
}
