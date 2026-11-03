import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../api";
import { Confetti } from "../games/common";
import { sfx } from "../lib/sound";
import type { TeaserState } from "../lib/rewards";

/** One short puzzle a day. Right or wrong, it is only for fun: answering counts as done, and five right earn a sticker. */
export function Teaser() {
  const [state, setState] = useState<TeaserState | null>(null);
  const [failed, setFailed] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [stickers, setStickers] = useState<string[]>([]);

  useEffect(() => { api<TeaserState>("/api/teaser").then(setState).catch(() => setFailed(true)); }, []);

  async function choose(option: string) {
    if (!state || picked !== null || state.done) return;
    setPicked(option);
    const correct = option === state.teaser.answer;
    sfx(correct ? "correct" : "wrong");
    try {
      const r = await api<{ newStickers: string[] }>("/api/teaser", { body: { correct } });
      setStickers(r.newStickers);
      setState({ ...state, done: true, correct, solved: state.solved + (correct ? 1 : 0) });
    } catch { /* the answer is still shown; it will simply not be saved */ }
  }

  const t = state?.teaser;
  const answered = picked !== null || state?.done;
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-4 py-8 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl font-extrabold">🧩 Brain teaser</h1>
        <Link className="btn" to="/">← Home</Link>
      </header>
      {failed && <p role="alert" className="card p-5 text-lg">We couldn't load today's puzzle. Please try again.</p>}
      {!state && !failed && <p className="text-lg text-muted">Finding today's puzzle…</p>}
      {state && t && (
        <section className="card flex flex-col gap-5 p-6" aria-live="polite">
          <p className="text-xl font-bold">{t.prompt}</p>
          {t.shown && <p className="text-center font-display text-4xl font-extrabold" aria-label={t.shown.replace("□", "blank").replace("?", "what")}>{t.shown}</p>}
          <ul className="grid grid-cols-2 gap-3">
            {t.options.map((o) => {
              const isAnswer = o === t.answer;
              const mine = picked === o;
              return (
                <li key={o}>
                  <button type="button" disabled={!!answered} onClick={() => void choose(o)} className={"btn !min-h-16 w-full !text-3xl " + (mine ? "btn-primary" : "")} style={answered && isAnswer ? { outline: "4px solid var(--accent)" } : undefined}>
                    {o}{answered && isAnswer ? " ✅" : ""}
                  </button>
                </li>
              );
            })}
          </ul>
          {answered && (
            <div role="status" className="flex flex-col gap-2">
              <p className="text-xl font-bold">{state.correct === false || (picked !== null && picked !== t.answer) ? "Nice try! 💪" : "Brilliant! 🎉"}</p>
              <p className="text-lg">{t.explain}</p>
              <p className="text-muted">Come back tomorrow for a new one. You have solved {state.solved} so far.</p>
            </div>
          )}
          {stickers.length > 0 && <><Confetti /><p className="pop-in text-xl font-extrabold">🎉 You earned a new sticker! Find it in your sticker book.</p></>}
        </section>
      )}
    </main>
  );
}
