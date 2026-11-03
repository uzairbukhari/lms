// Builds the text a parent pastes into Claude to author the next lesson. No AI is called in the app.

export type PromptInput = {
  course: { title: string; subject: string; ageBand: string | null };
  semester: number;
  week: number;
  topic: string;
  earlier: { semester: number; week: number; title: string; summary: string }[];
  weakSkills: { skill: string; percent: number }[];
  childName: string | null;
  className: string | null;
  repoUrl: string;
};

const SUBJECTS: Record<string, string> = { maths: "Maths", science: "Science", "data-ai": "Computer Science, Data & AI", "general-knowledge": "General Knowledge", english: "English" };

export function buildPrompt(i: PromptInput): string {
  const subject = SUBJECTS[i.course.subject] ?? i.course.subject;
  const lines: string[] = [];
  lines.push(`Please write ONE lesson for my children's learning platform, as a single lesson JSON file (format v1.0).`);
  lines.push("");
  lines.push("## What to write");
  lines.push(`- Course: ${i.course.title} (${subject}${i.course.ageBand ? `, ages ${i.course.ageBand}` : ""})`);
  lines.push(`- Place in the year: semester ${i.semester}, week ${i.week}`);
  lines.push(`- Topic: ${i.topic.trim() || "[tell me the topic, or suggest the next one that follows from the earlier lessons below]"}`);
  if (i.className) lines.push(`- Class: ${i.className}`);
  if (i.childName) lines.push(`- Written with ${i.childName} in mind (first name only; do not put the name in the lesson).`);
  lines.push("");
  lines.push("## What has already been taught in this course");
  if (i.earlier.length === 0) lines.push("Nothing yet: this is the first lesson, so start gently.");
  for (const e of i.earlier) lines.push(`- S${e.semester} week ${e.week}: ${e.title}${e.summary ? ` (${e.summary})` : ""}`);
  lines.push("Build on these without repeating them. You may revisit an earlier idea briefly in the warm-up.");
  if (i.weakSkills.length) {
    lines.push("");
    lines.push(`## Skills ${i.childName ?? "the class"} found hard recently (weave gentle practice into the lesson)`);
    for (const s of i.weakSkills) lines.push(`- ${s.skill} (${Math.round(s.percent)}% right)`);
  }
  lines.push("");
  lines.push("## House rules (from docs/LESSON_GUIDELINES.md)");
  lines.push("- British spelling; examples from the UK and Pakistan; for sensitive topics prefer an Islamic/Muslim perspective.");
  lines.push("- A picture for every stop and concept; a glossary entry for every bold word.");
  lines.push("- Each lesson has an explainer, a brain game and a hands-on activity.");
  lines.push("- About one hour in total including the quiz. The quiz has 15 questions that use all the control types (single choice, multi-select, true/false, short text, inline dropdown fill-blank, drag match, drag order, image hotspot, slider).");
  lines.push("- Videos only if I have approved them, and never longer than 100 seconds. Do not invent links.");
  lines.push("- Every question needs a hint and an explanation, and no AI is needed to run the lesson.");
  lines.push("");
  lines.push("## Reference");
  lines.push(`Read the guidelines and block list first: ${i.repoUrl}/blob/main/docs/LESSON_GUIDELINES.md and ${i.repoUrl}/blob/main/docs/LESSON_CAPABILITIES.md. Set \`curriculum\` to course "${i.course.title}", semester ${i.semester}, week ${i.week}.`);
  lines.push("Reply with only the JSON file.");
  return lines.join("\n");
}
