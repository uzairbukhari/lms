import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { GAME_INFO, MAX_GAME_BONUS, gameBonus } from "@lms/schema";
import { api } from "../api";
import { Loader } from "../components/Loader";
import { Confetti } from "../games/common";
import type { Checkpoint, MapData, PlayResult } from "../games/mapApi";
import { GAMES } from "../games/registry";
import { skinFor } from "../games/skins";
import { getSoundOn, setSoundOn, sfx, startMusic, stopMusic } from "../lib/sound";
import { useTheme } from "../theme";

// One checkpoint's mini game: how to play, a 3-2-1 countdown, the game itself, then the reward screen
// (bonus stars count up, the chest bursts open the first time).

type Phase = "intro" | "countdown" | "playing" | "saving" | "result";

export function GamePlay() {
  const { semester: s, week: w } = useParams();
  const semester = Number(s), week = Number(w);
  const navigate = useNavigate();
  const [theme] = useTheme();
  const skin = skinFor(theme);
  const [cp, setCp] = useState<Checkpoint | null>(null);
  const [failed, setFailed] = useState("");
  const [phase, setPhase] = useState<Phase>("intro");
  const [count, setCount] = useState(3);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<PlayResult | null>(null);
  const [sound, setSound] = useState(getSoundOn);

  useEffect(() => {
    api<MapData>(`/api/map?semester=${semester}`)
      .then((m) => {
        const c = m.checkpoints.find((x) => x.week === week);
        if (!c || c.state !== "reached" || m.semester !== semester) setFailed("Reach this stop to play here.");
        else setCp(c);
      })
      .catch(() => setFailed("We couldn't load this game. Please try again."));
  }, [semester, week]);

  useEffect(() => () => stopMusic(), []);

  useEffect(() => {
    if (phase !== "countdown") return;
    if (count === 0) {
      sfx("go");
      const t = setTimeout(() => {
        setPhase("playing");
        startMusic(theme, cp?.level === 2 ? 1.2 : 1);
      }, 500);
      return () => clearTimeout(t);
    }
    sfx("tick");
    const t = setTimeout(() => setCount((c) => c - 1), 750);
    return () => clearTimeout(t);
  }, [phase, count, theme, cp]);

  const begin = () => {
    sfx("start");
    setCount(3);
    setPhase("countdown");
    setRound((r) => r + 1);
  };

  const finish = async (final: number) => {
    stopMusic();
    setScore(final);
    setPhase("saving");
    sfx("done");
    try {
      const r = await api<PlayResult>("/api/map/play", { body: { semester, week, score: Math.round(final) } });
      setResult(r);
      setCp((c) => (c ? { ...c, chestOpened: true, plays: c.plays + 1, bestBonus: Math.max(c.bestBonus, r.bonus) } : c));
    } catch {
      setResult(null);
    }
    setPhase("result");
  };

  const toggleSound = () => {
    const on = !sound;
    setSoundOn(on);
    setSound(on);
    if (!on) stopMusic();
    else if (phase === "playing") startMusic(theme);
  };

  if (failed) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 p-6 text-center">
        <span aria-hidden="true" className="text-7xl">🔒</span>
        <p className="text-2xl font-bold">{failed}</p>
        <Link to="/map" className="btn btn-primary">Back to the map</Link>
      </main>
    );
  }
  if (!cp) return <Loader label="Getting the game ready…" fullScreen />;

  const info = GAME_INFO[cp.game];
  const game = GAMES[cp.game];

  return (
    <main className="mx-auto flex h-[100dvh] max-w-6xl flex-col gap-3 overflow-hidden p-3 sm:p-5">
      <header className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="btn !min-h-12"
          onClick={() => {
            stopMusic();
            if (phase === "playing" || phase === "countdown") setPhase("intro");
            else navigate("/map");
          }}
        >
          {phase === "playing" || phase === "countdown" ? "✕ Stop" : "🗺️ Map"}
        </button>
        <h1 className="truncate font-display text-2xl font-extrabold sm:text-3xl"><span aria-hidden="true">{game.icon} </span>{info.title}{cp.level === 2 ? " 2" : ""}</h1>
        <button type="button" className="btn !min-h-12 !px-4" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? "Sound on" : "Sound off"}>{sound ? "🔊" : "🔇"}</button>
      </header>

      {phase === "intro" && (
        <section className="pop-in card mx-auto my-auto flex w-full max-w-xl flex-col items-center gap-4 p-6 text-center">
          <span aria-hidden="true" className="intro-bob text-8xl">{game.icon}</span>
          <h2 className="font-display text-4xl font-extrabold">{info.title}</h2>
          <p className="text-xl">{info.blurb}</p>
          <ol className="flex w-full flex-col gap-2 text-left text-lg">
            {game.how.map((h, i) => (
              <li key={h} className="flex items-center gap-3 rounded-2xl px-4 py-2" style={{ background: "var(--track)" }}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-display font-extrabold text-on-accent">{i + 1}</span>
                {h}
              </li>
            ))}
          </ol>
          <p className="text-lg font-bold">
            {cp.chestOpened ? `Your best bonus here: ${cp.bestBonus}/${MAX_GAME_BONUS}. Beat it!` : <>Play to open the chest: <span className="chest-wiggle inline-block">🎁</span> {cp.quizPoints} quiz points!</>}
          </p>
          <button type="button" className="btn btn-primary intro-glow !min-h-16 w-full !text-3xl" onClick={begin}>Play!</button>
        </section>
      )}

      {phase === "countdown" && (
        <div className="flex flex-1 items-center justify-center" aria-live="assertive">
          <span key={count} className="countdown-pop font-display text-[160px] font-extrabold leading-none" style={{ color: "var(--accent)", textShadow: "0 8px 0 rgba(0,0,0,0.25)" }}>
            {count === 0 ? "Go!" : count}
          </span>
        </div>
      )}

      {phase === "playing" && (
        <div className="flex min-h-0 flex-1 flex-col">
          <game.Component key={round} level={cp.level} skin={skin} onEnd={(s2) => void finish(s2)} />
        </div>
      )}

      {phase === "saving" && <Loader label="Counting your points…" />}

      {phase === "result" && <Result score={score} result={result} cp={cp} onAgain={begin} />}
    </main>
  );
}

function Result({ score, result, cp, onAgain }: { score: number; result: PlayResult | null; cp: Checkpoint; onAgain: () => void }) {
  const bonus = result?.bonus ?? gameBonus(cp.game, cp.level, score);
  const [shown, setShown] = useState(0);
  const [chest, setChest] = useState<"shut" | "open">("shut");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    for (let i = 1; i <= MAX_GAME_BONUS; i++) {
      timers.current.push(setTimeout(() => {
        setShown(i);
        if (i <= bonus) sfx("coin");
      }, 250 + i * 160));
    }
    if (result?.firstPlay) {
      timers.current.push(setTimeout(() => {
        setChest("open");
        sfx("chest");
      }, 250 + MAX_GAME_BONUS * 160 + 500));
    }
    timers.current.push(setTimeout(() => sfx(bonus >= 7 ? "fanfare" : "correct"), 250 + MAX_GAME_BONUS * 160 + (result?.firstPlay ? 1300 : 200)));
    return () => timers.current.forEach(clearTimeout);
  }, [bonus, result]);

  const cheer = bonus >= 9 ? "Amazing!" : bonus >= 6 ? "Brilliant!" : bonus >= 3 ? "Well done!" : "Good try!";
  return (
    <section className="pop-in card mx-auto my-auto flex w-full max-w-xl flex-col items-center gap-4 p-6 text-center">
      {bonus >= 6 && <Confetti />}
      <h2 className="font-display text-5xl font-extrabold">{cheer}</h2>
      <p className="text-2xl">You scored <b>{score}</b></p>
      <div className="flex flex-wrap justify-center gap-1" aria-label={`Game bonus: ${bonus} out of ${MAX_GAME_BONUS}`} role="img">
        {Array.from({ length: MAX_GAME_BONUS }, (_, i) => (
          <span key={i} aria-hidden="true" className={"text-4xl transition-all duration-200 " + (i < shown && i < bonus ? "star-pop" : "")} style={{ opacity: i < shown && i < bonus ? 1 : 0.18, filter: i < shown && i < bonus ? undefined : "grayscale(1)" }}>⭐</span>
        ))}
      </div>
      <p className="text-xl font-bold">Game bonus: +{bonus}{result && !result.newBest && !result.firstPlay ? " (your best still counts)" : result?.newBest && !result.firstPlay ? " · new best!" : ""}</p>
      {result?.firstPlay && (
        <div className="flex flex-col items-center gap-1">
          <span aria-hidden="true" className={"text-7xl " + (chest === "open" ? "chest-burst" : "chest-wiggle")}>{chest === "open" ? "🪙" : "🎁"}</span>
          {chest === "open" && <p className="pop-in text-2xl font-extrabold">Chest opened! +{cp.quizPoints} quiz points</p>}
        </div>
      )}
      {result ? (
        <p className="text-lg text-muted">You now have <b className="text-text">🪙 {result.points.total}</b> points</p>
      ) : (
        <p role="alert" className="text-lg">We couldn't save this game. Check the internet and play again.</p>
      )}
      <div className="grid w-full grid-cols-2 gap-3">
        <button type="button" className="btn !min-h-14" onClick={onAgain}>Play again</button>
        <Link to="/map" className="btn btn-primary !min-h-14">Back to the map</Link>
      </div>
    </section>
  );
}
