import type { Response } from "@lms/schema";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { api } from "../api";
import { QuestionView } from "../components/QuestionView";
import { Confetti } from "../games/common";
import { levelStars, type AnswerResult, type Deck, type DeckCard } from "../lib/cards";
import { sfx, speak, stopSpeech } from "../lib/sound";

const TITLES: Record<string, string> = { daily: "Today's cards", boost: "Boost round", words: "My words", semester: "Revision cards" };

/** Plays a deck: word cards flip or ask you to choose, missed quiz questions come back as real questions. */
export function Cards() {
  const { kind: kindParam } = useParams();
  const [params] = useSearchParams();
  const kind = (["boost", "words", "semester"].includes(kindParam ?? "") ? kindParam : "daily") as Deck["kind"];
  const semester = params.get("semester");
  const [deck, setDeck] = useState<Deck | null>(null);
  const [failed, setFailed] = useState(false);
  const [index, setIndex] = useState(0);
  const [right, setRight] = useState(0);
  const [earned, setEarned] = useState<number | null>(null);

  useEffect(() => {
    api<Deck>(`/api/cards/deck?kind=${kind}${semester ? `&semester=${semester}` : ""}`).then(setDeck).catch(() => setFailed(true));
    return stopSpeech;
  }, [kind, semester]);

  const done = deck !== null && index >= deck.cards.length;
  useEffect(() => {
    if (!done || !deck || deck.cards.length === 0 || (kind !== "daily" && kind !== "boost")) return;
    api<{ points: number }>("/api/cards/finish", { body: { kind } }).then((r) => { setEarned(r.points); if (r.points > 0) sfx("fanfare"); }).catch(() => undefined);
  }, [done, deck, kind]);

  const card = deck?.cards[index];
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-4 py-8 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl font-extrabold">{kind === "boost" ? "🚀" : "🃏"} {TITLES[kind]}</h1>
        <Link className="btn" to="/">← Home</Link>
      </header>
      {failed && <p role="alert" className="card p-5 text-lg">We couldn't load your cards. Please try again.</p>}
      {!deck && !failed && <p className="text-lg text-muted">Shuffling the cards…</p>}
      {deck && deck.cards.length === 0 && (
        <p className="card p-6 text-xl">{kind === "boost" ? "Nothing to boost today. Questions you miss in a quiz come back here a few days later. 🌟" : "No cards waiting. Finish a lesson to collect new words, or come back tomorrow! 🌙"}</p>
      )}
      {deck && card && (
        <>
          <div role="progressbar" aria-valuemin={0} aria-valuemax={deck.cards.length} aria-valuenow={index} aria-label="Cards done" className="h-3 overflow-hidden rounded-full border-2 border-line" style={{ background: "var(--track)" }}>
            <div className="h-full bg-accent transition-all" style={{ width: `${(index / deck.cards.length) * 100}%` }} />
          </div>
          <p className="font-bold text-muted">Card {index + 1} of {deck.cards.length} · {levelStars(card.box)}</p>
          <CardView key={card.id} card={card} onDone={(ok) => { if (ok) setRight((n) => n + 1); setIndex((i) => i + 1); }} />
        </>
      )}
      {done && deck.cards.length > 0 && (
        <section className="card flex flex-col items-center gap-3 p-8 text-center" role="status">
          {right === deck.cards.length && <Confetti />}
          <p className="text-6xl" aria-hidden="true">{right === deck.cards.length ? "🏆" : "🌟"}</p>
          <h2 className="font-display text-3xl font-extrabold">{right === deck.cards.length ? "Perfect!" : "Well done!"}</h2>
          <p className="text-xl">{right} of {deck.cards.length} right first time.</p>
          {earned !== null && earned > 0 && <p className="pop-in text-xl font-extrabold">⭐ +{earned} map points!</p>}
          <p className="text-muted">Cards you missed come back soon. Cards you know come back later.</p>
          <Link className="btn btn-primary" to="/">Back home</Link>
        </section>
      )}
    </main>
  );
}

function CardView({ card, onDone }: { card: DeckCard; onDone: (right: boolean) => void }) {
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [response, setResponse] = useState<Response>(undefined);

  async function send(body: Record<string, unknown>) {
    setBusy(true);
    try {
      const r = await api<AnswerResult>("/api/cards/answer", { body: { cardId: card.id, ...body } });
      setResult(r);
      sfx(r.correct ? "correct" : "wrong");
    } catch { /* the card stays; she can try again */ }
    setBusy(false);
  }
  const next = <button type="button" className="btn btn-primary self-start" onClick={() => { stopSpeech(); onDone(result?.correct ?? false); }}>Next card →</button>;

  if (card.mode === "question") {
    const q = card.question;
    return (
      <section className="card flex flex-col gap-4 p-6" aria-label="Question card">
        <p className="font-bold text-muted">A question to try again</p>
        <QuestionView q={q} value={response} onChange={setResponse} disabled={result !== null} />
        {result === null ? (
          <button type="button" className="btn btn-primary self-start" disabled={busy || response === undefined || response === ""} onClick={() => void send({ response })}>Check</button>
        ) : (
          <div role="status" className="flex flex-col gap-2">
            <p className="text-xl font-bold">{result.correct ? "✅ Yes! You've got it." : "❌ Not this time."}</p>
            {!result.correct && result.answer && <p className="text-lg">Right answer: <strong>{result.answer}</strong></p>}
            {result.explanation && <p className="text-muted">{result.explanation}</p>}
            {next}
          </div>
        )}
      </section>
    );
  }

  const listen = <button type="button" className="btn self-start" onClick={() => speak(card.front, undefined, { force: true })} aria-label="Read the card aloud">🔊 Listen</button>;
  if (card.mode === "choose") {
    return (
      <section className="card flex flex-col gap-4 p-6" aria-label="Choose card">
        <p className="font-bold text-muted">What does this mean?</p>
        <p className="font-display text-4xl font-extrabold">{card.emoji ? `${card.emoji} ` : ""}{card.front}</p>
        {listen}
        <ul className="flex flex-col gap-3">
          {card.options.map((o) => {
            const isRight = result !== null && o === result.answer;
            return (
              <li key={o}>
                <button type="button" className="btn w-full !justify-start !text-left" disabled={busy || result !== null} aria-pressed={picked === o}
                  style={isRight ? { outline: "4px solid var(--accent)" } : undefined} onClick={() => { setPicked(o); void send({ choice: o }); }}>{o}{isRight ? " ✅" : result && picked === o ? " ❌" : ""}</button>
              </li>
            );
          })}
        </ul>
        {result && <div role="status" className="flex flex-col gap-2"><p className="text-xl font-bold">{result.correct ? "Brilliant! 🎉" : "Not quite. Now you know! 💪"}</p>{next}</div>}
      </section>
    );
  }

  return (
    <section className="card flex flex-col gap-4 p-6" aria-label="Flip card">
      <p className="font-display text-4xl font-extrabold">{card.emoji ? `${card.emoji} ` : ""}{card.front}</p>
      {listen}
      {!flipped ? (
        <button type="button" className="btn btn-primary !min-h-16 !text-xl" onClick={() => { sfx("flip"); setFlipped(true); }}>Show the answer</button>
      ) : result === null ? (
        <>
          <p className="pop-in rounded-2xl border-2 border-line p-4 text-2xl font-bold">{card.back}</p>
          <p className="font-bold">Did you know it?</p>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="btn btn-primary !min-h-16" disabled={busy} onClick={() => void send({ gotIt: true })}>✅ Got it</button>
            <button type="button" className="btn !min-h-16" disabled={busy} onClick={() => void send({ gotIt: false })}>🔁 Not yet</button>
          </div>
        </>
      ) : (
        <div role="status" className="flex flex-col gap-2">
          <p className="rounded-2xl border-2 border-line p-4 text-2xl font-bold">{card.back}</p>
          <p className="text-lg">{result.correct ? "Nice! It will come back later." : "No problem. It will come back tomorrow."}</p>
          {next}
        </div>
      )}
    </section>
  );
}
