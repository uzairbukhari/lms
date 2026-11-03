import { plain } from "./slides";
import type { ViewQuestion } from "../components/QuestionView";

/** What the speaker button reads for a quiz question: the question, then its choices with their letters. */
export function questionToSpeech(q: ViewQuestion): string {
  const parts: string[] = [];
  const end = (s: string) => (/[.!?]$/.test(s) ? s : `${s}.`);
  parts.push(end(plain(q.prompt)));
  const letters = "ABCDEFGH";
  const list = (label: string, items: { text: string }[] | undefined) => {
    if (!items?.length) return;
    if (label) parts.push(label);
    items.forEach((o, i) => parts.push(end(`${letters[i] ?? i + 1}. ${plain(o.text)}`)));
  };
  switch (q.type) {
    case "multiple_choice":
    case "multi_select":
      list("", q.options);
      break;
    case "true_false":
      parts.push("True or false?");
      break;
    case "order":
      list("Put these in order.", q.items);
      break;
    case "match":
      list("Match these.", q.left);
      list("With these.", q.right);
      break;
    case "fill_blank":
      if (q.text) parts.push(end(plain(q.text.replace(/\{[^}]*\}|_{2,}/g, "blank"))));
      break;
    case "hotspot":
      if (q.scene?.show_labels) q.scene.items.forEach((it) => parts.push(end(it.label)));
      break;
    default:
      break;
  }
  return parts.join(" ");
}
