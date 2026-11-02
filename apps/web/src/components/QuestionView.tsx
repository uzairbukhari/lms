import type { Response } from "@lms/schema";
import { Markdown } from "./Markdown";

/** A question as the player and quiz receive it (answers are present only for lesson check blocks). */
export type ViewQuestion = {
  type: "multiple_choice" | "multi_select" | "true_false" | "number" | "short_text" | "order" | "match";
  prompt: string;
  emoji?: string;
  options?: { id: string; text: string }[];
  items?: { id: string; text: string }[];
  left?: { id: string; text: string }[];
  right?: { id: string; text: string }[];
};

type Props = {
  q: ViewQuestion;
  value: Response;
  onChange: (v: Response) => void;
  disabled?: boolean;
};

// Right and wrong are shown with words and icons by the caller, never by colour alone.
const choice = (on: boolean) =>
  "flex min-h-14 w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left text-lg font-semibold transition " +
  (on ? "border-accent bg-accent/15" : "border-line bg-surface hover:border-accent/60");

export function QuestionView({ q, value, onChange, disabled }: Props) {
  const name = `q-${q.prompt.length}-${q.type}`;
  return (
    <fieldset className="flex flex-col gap-3" disabled={disabled}>
      <legend className="mb-2 text-xl font-bold">
        {q.emoji ? <span aria-hidden="true">{q.emoji} </span> : null}
        <Markdown text={q.prompt} />
      </legend>

      {(q.type === "multiple_choice" || q.type === "multi_select") &&
        q.options?.map((o) => {
          const picked = Array.isArray(value) ? value : [];
          const on = picked.includes(o.id);
          const toggle = () =>
            onChange(q.type === "multiple_choice" ? [o.id] : on ? picked.filter((x) => x !== o.id) : [...picked, o.id]);
          return (
            <label key={o.id} className={choice(on)}>
              <input
                type={q.type === "multiple_choice" ? "radio" : "checkbox"}
                name={name}
                className="size-5 accent-[var(--accent)]"
                checked={on}
                onChange={toggle}
              />
              {o.text}
            </label>
          );
        })}
      {q.type === "multi_select" && <p className="text-sm text-muted">Pick all the right answers.</p>}

      {q.type === "true_false" && (
        <div className="grid grid-cols-2 gap-3">
          {[true, false].map((b) => (
            <label key={String(b)} className={choice(value === b) + " justify-center"}>
              <input type="radio" name={name} className="sr-only" checked={value === b} onChange={() => onChange(b)} />
              {b ? "✅ True" : "❌ False"}
            </label>
          ))}
        </div>
      )}

      {q.type === "number" && (
        <input
          className="input max-w-xs text-2xl"
          inputMode="decimal"
          aria-label="Your answer"
          value={typeof value === "string" || typeof value === "number" ? String(value) : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {q.type === "short_text" && (
        <input
          className="input max-w-md text-xl"
          aria-label="Your answer"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {q.type === "order" && <OrderInput items={q.items ?? []} value={Array.isArray(value) ? value : null} onChange={onChange} />}
      {q.type === "match" && <MatchInput left={q.left ?? []} right={q.right ?? []} value={value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, string>) : {}} onChange={onChange} />}
    </fieldset>
  );
}

/** Reordering with up and down buttons: works with touch, mouse and keyboard, no drag needed. */
function OrderInput({ items, value, onChange }: { items: { id: string; text: string }[]; value: string[] | null; onChange: (v: string[]) => void }) {
  const order = value && value.length === items.length ? value : items.map((i) => i.id);
  const byId = new Map(items.map((i) => [i.id, i.text]));
  const move = (from: number, to: number) => {
    if (to < 0 || to >= order.length) return;
    const next = [...order];
    const [x] = next.splice(from, 1);
    next.splice(to, 0, x as string);
    onChange(next);
  };
  return (
    <>
      <p className="text-sm text-muted">Use the arrows to put these in the right order.</p>
      <ol className="flex flex-col gap-2">
        {order.map((id, i) => (
          <li key={id} className="flex items-center gap-2 rounded-2xl border-2 border-line bg-surface px-3 py-2 text-lg font-semibold">
            <span className="w-6 text-muted">{i + 1}.</span>
            <span className="flex-1">{byId.get(id)}</span>
            <button type="button" className="btn !min-h-10 !px-3" aria-label={`Move ${byId.get(id)} up`} disabled={i === 0} onClick={() => move(i, i - 1)}>↑</button>
            <button type="button" className="btn !min-h-10 !px-3" aria-label={`Move ${byId.get(id)} down`} disabled={i === order.length - 1} onClick={() => move(i, i + 1)}>↓</button>
          </li>
        ))}
      </ol>
    </>
  );
}

function MatchInput({ left, right, value, onChange }: { left: { id: string; text: string }[]; right: { id: string; text: string }[]; value: Record<string, string>; onChange: (v: Record<string, string>) => void }) {
  return (
    <>
      <p className="text-sm text-muted">Match each one with its partner.</p>
      <ul className="flex flex-col gap-2">
        {left.map((l) => (
          <li key={l.id} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-line bg-surface px-3 py-2 text-lg font-semibold">
            <span className="min-w-32 flex-1">{l.text}</span>
            <select className="input !w-auto" aria-label={`Match for ${l.text}`} value={value[l.id] ?? ""} onChange={(e) => onChange({ ...value, [l.id]: e.target.value })}>
              <option value="">Choose…</option>
              {right.map((r) => <option key={r.id} value={r.id}>{r.text}</option>)}
            </select>
          </li>
        ))}
      </ul>
    </>
  );
}
