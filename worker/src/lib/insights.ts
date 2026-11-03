// Question insights (admin): how a question performs across children, using each child's first graded try.

export type InsightQuestion = {
  id: string; prompt: string; type: string; position: number; skill: string | null;
  children: number; firstTryPercent: number | null; allTryPercent: number | null;
  avgSeconds: number | null; hintPercent: number | null;
  commonWrong: { answer: string; count: number } | null;
  flag: "hard" | "unclear" | null;
};

type Opt = { id?: string; text?: string; label?: string };

/** Turn a stored response into short readable text (option ids become their wording). */
export function describeResponse(responseJson: string, optionsJson: string | null): string {
  let value: unknown;
  try { value = JSON.parse(responseJson); } catch { return responseJson.slice(0, 60); }
  let opts: Opt[] = [];
  try { opts = ((JSON.parse(optionsJson ?? "{}") as { options?: Opt[] }).options ?? []) as Opt[]; } catch { /* no options */ }
  const name = (v: unknown) => {
    const o = opts.find((x) => x.id === v);
    return o ? (o.text ?? o.label ?? String(v)) : String(v);
  };
  const text = Array.isArray(value) ? value.map(name).join(", ") : typeof value === "object" && value !== null ? JSON.stringify(value) : name(value);
  return text.length > 80 ? `${text.slice(0, 77)}...` : text;
}

/**
 * A question is "hard" when most children miss it on the first try, and "unclear" when children who got it wrong
 * mostly picked the same wrong answer (often a sign of ambiguous wording, or a wrong answer key).
 */
export function flagFor(children: number, firstTryPercent: number | null, commonWrongShare: number): "hard" | "unclear" | null {
  if (children < 2 || firstTryPercent === null) return null;
  if (firstTryPercent <= 30) return commonWrongShare >= 0.7 ? "unclear" : "hard";
  return null;
}

export async function lessonInsights(db: D1Database, lessonId: string, includePractice: boolean): Promise<InsightQuestion[]> {
  const modeSql = includePractice ? "" : "AND a.mode = 'graded'";
  const { results: questions } = await db
    .prepare("SELECT q.id, q.ref, q.prompt, q.type, q.position, q.skill_tag AS skill, q.options_json AS optionsJson FROM questions q JOIN quizzes z ON z.id = q.quiz_id WHERE z.lesson_id = ? AND z.is_current = 1 AND z.kind = 'lesson' ORDER BY q.position")
    .bind(lessonId)
    .all<{ id: string; ref: string; prompt: string; type: string; position: number; skill: string | null; optionsJson: string | null }>();
  // Every answer ever given to the questions of this lesson's quizzes (all versions share the lesson id).
  const { results: answers } = await db
    .prepare(
      `SELECT q.ref, aa.question_id AS questionId, aa.response_json AS response, aa.is_correct AS correct, aa.used_hint AS hint, aa.time_ms AS ms, a.user_id AS userId, a.attempt_number AS n
         FROM attempt_answers aa JOIN quiz_attempts a ON a.id = aa.attempt_id JOIN questions q ON q.id = aa.question_id
        WHERE a.lesson_id = ? AND a.status = 'submitted' AND a.user_id NOT IN (SELECT id FROM users WHERE is_test = 1) ${modeSql}`,
    )
    .bind(lessonId)
    .all<{ ref: string; questionId: string; response: string; correct: number; hint: number; ms: number | null; userId: string; n: number }>();
  const out: InsightQuestion[] = [];
  for (const q of questions) {
    const ref = q.ref;
    const rows = answers.filter((a) => a.ref === ref);
    const firstByChild = new Map<string, (typeof rows)[number]>();
    for (const r of [...rows].sort((x, y) => x.n - y.n)) if (!firstByChild.has(r.userId)) firstByChild.set(r.userId, r);
    const first = [...firstByChild.values()];
    const wrongs = first.filter((r) => r.correct === 0);
    const tally = new Map<string, number>();
    for (const w of wrongs) tally.set(w.response, (tally.get(w.response) ?? 0) + 1);
    const top = [...tally.entries()].sort((a, b) => b[1] - a[1])[0];
    const times = rows.map((r) => r.ms).filter((m): m is number => m !== null && m > 0);
    const firstPct = first.length ? (100 * first.filter((r) => r.correct === 1).length) / first.length : null;
    out.push({
      id: q.id, prompt: q.prompt, type: q.type, position: q.position, skill: q.skill,
      children: first.length,
      firstTryPercent: firstPct === null ? null : Math.round(firstPct),
      allTryPercent: rows.length ? Math.round((100 * rows.filter((r) => r.correct === 1).length) / rows.length) : null,
      avgSeconds: times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length / 1000) : null,
      hintPercent: rows.length ? Math.round((100 * rows.filter((r) => r.hint === 1).length) / rows.length) : null,
      commonWrong: top ? { answer: describeResponse(top[0], q.optionsJson), count: top[1] } : null,
      flag: flagFor(first.length, firstPct, top && wrongs.length ? top[1] / wrongs.length : 0),
    });
  }
  return out;
}
