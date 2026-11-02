// The school-year calendar: 4 semesters of 12 teaching weeks plus an exam week (docs/PLAN.md section 4d).

const DAY = 24 * 60 * 60 * 1000;

export type TermRow = {
  id?: string;
  class_id?: string;
  number: number;
  name: string;
  start_date: string; // YYYY-MM-DD, a Monday
  end_date: string;
  teaching_weeks: number;
  exam_week: number;
};

export function parseDate(iso: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const t = Date.parse(`${iso}T00:00:00Z`);
  return Number.isNaN(t) ? null : t;
}

export const formatDate = (ms: number): string => new Date(ms).toISOString().slice(0, 10);
export const addDays = (iso: string, days: number): string => formatDate((parseDate(iso) as number) + days * DAY);
export const isMonday = (iso: string): boolean => new Date(`${iso}T00:00:00Z`).getUTCDay() === 1;

/** Four back-to-back semesters starting on `startDate` (a Monday), each `weeksEach` weeks long, optionally with holiday gaps. */
export function generateTerms(startDate: string, opts: { weeksEach?: number; gapWeeks?: number } = {}): TermRow[] {
  const weeksEach = opts.weeksEach ?? 13;
  const gap = opts.gapWeeks ?? 0;
  const terms: TermRow[] = [];
  let start = startDate;
  for (let n = 1; n <= 4; n++) {
    const end = addDays(start, weeksEach * 7 - 1);
    terms.push({ number: n, name: `Semester ${n}`, start_date: start, end_date: end, teaching_weeks: weeksEach - 1, exam_week: weeksEach });
    start = addDays(end, 1 + gap * 7);
  }
  return terms;
}

export type TermPosition =
  | { state: "before"; term: TermRow }
  | { state: "teaching"; term: TermRow; week: number }
  | { state: "exam"; term: TermRow; week: number }
  | { state: "after"; term: TermRow };

/** Where a date falls in a term. Weeks run Monday to Sunday from the term's start date. */
export function positionInTerm(term: TermRow, today: string): TermPosition {
  const t = parseDate(today) as number;
  const start = parseDate(term.start_date) as number;
  const end = parseDate(term.end_date) as number;
  if (t < start) return { state: "before", term };
  if (t > end) return { state: "after", term };
  const week = Math.floor((t - start) / (7 * DAY)) + 1;
  return week >= term.exam_week ? { state: "exam", term, week } : { state: "teaching", term, week };
}

export type Now = { semester: number; week: number; exam: boolean } | null;

/** The semester and week "today" falls in for a class (null when between terms). */
export function currentSlot(terms: TermRow[], today: string): Now {
  for (const term of [...terms].sort((a, b) => a.number - b.number)) {
    const pos = positionInTerm(term, today);
    if (pos.state === "teaching") return { semester: term.number, week: pos.week, exam: false };
    if (pos.state === "exam") return { semester: term.number, week: pos.week, exam: true };
  }
  return null;
}

/** True when the (semester, week) slot is not later than the current one, i.e. already taught or being taught. */
export function isReleased(slot: { semester: number; week: number }, now: Now, terms: TermRow[], today: string): boolean {
  if (now) return slot.semester < now.semester || (slot.semester === now.semester && slot.week <= now.week);
  // Between terms: everything from semesters that have ended is released; nothing from the future.
  const ended = terms.filter((t) => positionInTerm(t, today).state === "after").map((t) => t.number);
  return ended.includes(slot.semester);
}
