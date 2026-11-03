import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { GAME_INFO } from "@lms/schema";
import { api } from "../api";
import { useAuth } from "../auth";
import { Avatar } from "../components/Avatar";
import { wornEmoji, type Rewards } from "../lib/rewards";
import { Loader } from "../components/Loader";
import { Confetti } from "../games/common";
import { lastSeenStop, rememberStop, type Checkpoint, type MapData } from "../games/mapApi";
import { GAMES } from "../games/registry";
import { skinFor } from "../games/skins";
import { getSoundOn, setSoundOn, sfx } from "../lib/sound";
import { useTheme } from "../theme";

// The semester map (docs/SEMESTER_MAP.md): a winding trail from Start (bottom) up through 12 weekly checkpoints to
// the exam-week castle. The character walks to each checkpoint once all of that week's lessons are done.

const W = 360;
const GAP = 150;
const STOPS = 14; // start, weeks 1-12, finish
const H = (STOPS - 1) * GAP + 200;
const XS = [180, 92, 214, 288, 196, 78, 150, 284, 236, 96, 112, 252, 286, 180];
const point = (i: number) => ({ x: XS[i] as number, y: H - 100 - i * GAP });

/** Point on the curve between stop i and stop i+1 at t (0..1). */
function along(i: number, t: number) {
  const a = point(i), b = point(Math.min(STOPS - 1, i + 1));
  const c1 = { x: a.x, y: a.y - GAP / 2 }, c2 = { x: b.x, y: b.y + GAP / 2 };
  const u = 1 - t;
  return {
    x: u * u * u * a.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * b.x,
    y: u * u * u * a.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * b.y,
  };
}
const segment = (i: number) => {
  const a = point(i), b = point(i + 1);
  return `M${a.x} ${a.y} C${a.x} ${a.y - GAP / 2} ${b.x} ${b.y + GAP / 2} ${b.x} ${b.y}`;
};
const fullTrail = Array.from({ length: STOPS - 1 }, (_, i) => segment(i)).join(" ");

/** Stop the character stands on: the highest week reached (0 = Start). */
const targetStop = (m: MapData) => m.checkpoints.reduce((best, c) => (c.state === "reached" ? Math.max(best, c.week) : best), 0);

export function SemesterMap() {
  const { user } = useAuth();
  const [theme] = useTheme();
  const skin = skinFor(theme);
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [map, setMap] = useState<MapData | null>(null);
  const [failed, setFailed] = useState(false);
  const [pos, setPos] = useState(0); // character position in stops, fractional while walking
  const [walking, setWalking] = useState(false);
  const [arrived, setArrived] = useState<number | null>(null);
  const [sheet, setSheet] = useState<Checkpoint | "finish" | "start" | null>(null);
  const [wobble, setWobble] = useState<number | null>(null);
  const [sound, setSound] = useState(getSoundOn);
  const [worn, setWorn] = useState<Rewards | null>(null);
  const charRef = useRef<HTMLDivElement>(null);
  const semester = Number(params.get("semester")) || undefined;

  useEffect(() => { api<Rewards>("/api/rewards").then(setWorn).catch(() => undefined); }, []);
  useEffect(() => {
    setMap(null);
    api<MapData>(`/api/map${semester ? `?semester=${semester}` : ""}`).then(setMap).catch(() => setFailed(true));
  }, [semester]);

  // Place the character, then walk to any newly reached checkpoint.
  useEffect(() => {
    if (!map || !user) return;
    const target = targetStop(map);
    const seen = lastSeenStop(user.id, map.semester);
    const from = seen === null || seen > target ? target : seen;
    setPos(from);
    setArrived(null);
    requestAnimationFrame(() => charRef.current?.scrollIntoView({ block: "center", behavior: "auto" }));
    if (from === target) {
      rememberStop(user.id, map.semester, target);
      return;
    }
    let raf = 0;
    let stepTimer: ReturnType<typeof setInterval> | null = null;
    const startDelay = setTimeout(() => {
      setWalking(true);
      sfx("start");
      stepTimer = setInterval(() => sfx("step"), 260);
      const perStop = 1300;
      const t0 = performance.now();
      const total = (target - from) * perStop;
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / total);
        const eased = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
        setPos(from + (target - from) * eased);
        charRef.current?.scrollIntoView({ block: "center", behavior: "auto" });
        if (k < 1) raf = requestAnimationFrame(tick);
        else {
          if (stepTimer) clearInterval(stepTimer);
          setWalking(false);
          setArrived(target);
          sfx("fanfare");
          rememberStop(user.id, map.semester, target);
        }
      };
      raf = requestAnimationFrame(tick);
    }, 900);
    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(raf);
      if (stepTimer) clearInterval(stepTimer);
    };
  }, [map, user]);

  const decor = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        i,
        left: i % 2 === 0 ? 2 + ((i * 37) % 18) : 80 + ((i * 53) % 17),
        top: 3 + ((i * 4.4) % 94),
        size: 22 + ((i * 7) % 22),
        delay: (i * 0.37) % 3,
        emoji: skin.decor[i % skin.decor.length],
      })),
    [skin],
  );

  if (!user) return null;
  const toggleSound = () => {
    const on = !sound;
    setSoundOn(on);
    setSound(on);
    if (on) sfx("tap");
  };

  const seg = Math.min(STOPS - 2, Math.floor(pos));
  const here = along(seg, pos - seg);
  const reachedTrail = Array.from({ length: Math.floor(pos) }, (_, i) => segment(i)).join(" ");

  const tapStop = (cp: Checkpoint) => {
    if (walking) return;
    if (cp.state === "locked") {
      sfx("locked");
      setWobble(cp.week);
      setTimeout(() => setWobble(null), 500);
    } else sfx("tap");
    setSheet(cp);
  };

  return (
    <main className="relative mx-auto flex min-h-screen max-w-5xl flex-col">
      <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6" style={{ background: "color-mix(in srgb, var(--bg) 88%, transparent)", backdropFilter: "blur(6px)", borderBottom: "var(--border-width) solid var(--surface-border)" }}>
        <div className="flex items-center gap-3">
          <Link to="/" className="btn !min-h-12" aria-label="Back to my lessons"><span aria-hidden="true">🏠</span> Home</Link>
          <div>
            <h1 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">{skin.trailName}</h1>
            {map && (
              <div className="flex items-center gap-1 text-muted">
                {map.semesters.length > 1 && (
                  <button type="button" className="rounded-full px-2 text-xl font-bold disabled:opacity-30" disabled={map.semester <= (map.semesters[0] ?? 1)} onClick={() => setParams({ semester: String(map.semester - 1) })} aria-label="Earlier semester">◀</button>
                )}
                <span className="font-bold">Semester {map.semester}</span>
                {map.semesters.length > 1 && (
                  <button type="button" className="rounded-full px-2 text-xl font-bold disabled:opacity-30" disabled={map.semester >= (map.semesters[map.semesters.length - 1] ?? 1)} onClick={() => setParams({ semester: String(map.semester + 1) })} aria-label="Later semester">▶</button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {map && (
            <span className="inline-flex items-center gap-2 rounded-full border-[length:var(--border-width)] border-line bg-surface px-4 py-2 font-display text-xl font-extrabold" aria-label={`${map.points.total} points`}>
              <span aria-hidden="true" className="coin-spin inline-block">🪙</span> {map.points.total}
              {map.points.waiting > 0 && <span className="text-base font-bold text-muted">· 🎁 {map.points.waiting} waiting</span>}
            </span>
          )}
          <button type="button" className="btn !min-h-12 !px-4" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? "Sound on" : "Sound off"}>{sound ? "🔊" : "🔇"}</button>
        </div>
      </header>

      {failed && <p role="alert" className="p-6 text-xl">We couldn't load your map. Please refresh the page.</p>}
      {!map && !failed && <Loader label="Unrolling your map…" />}

      {map && (
        <div className="relative flex-1 px-2 pb-10 pt-4">
          {decor.map((d) => (
            <span key={d.i} aria-hidden="true" className="map-twinkle pointer-events-none absolute" style={{ left: `${d.left}%`, top: `${d.top}%`, fontSize: d.size, animationDelay: `${d.delay}s` }}>{d.emoji}</span>
          ))}
          <div className="relative mx-auto w-full" style={{ maxWidth: 540, aspectRatio: `${W} / ${H}` }}>
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
              <path d={fullTrail} fill="none" stroke="var(--trail)" strokeWidth="26" strokeLinecap="round" opacity="0.55" />
              <path d={fullTrail} fill="none" stroke="var(--surface)" strokeWidth="6" strokeLinecap="round" strokeDasharray="2 16" opacity="0.9" />
              {reachedTrail && <path d={reachedTrail} fill="none" stroke="var(--accent)" strokeWidth="14" strokeLinecap="round" />}
              {pos - seg > 0.001 && pos < STOPS - 1 && (
                <path d={segment(seg)} fill="none" stroke="var(--accent)" strokeWidth="14" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - (pos - seg)} />
              )}
            </svg>

            {/* Start */}
            <StopShell i={0} onClick={() => { sfx("tap"); setSheet("start"); }} label="Start">
              <span className="text-5xl" aria-hidden="true">{skin.start}</span>
            </StopShell>

            {map.checkpoints.map((cp) => (
              <WeekStop key={cp.week} cp={cp} icon={skin.stops[cp.week - 1] ?? "⭐"} wobble={wobble === cp.week} arrived={arrived === cp.week} onTap={() => tapStop(cp)} />
            ))}

            {/* Finish: exam week */}
            <StopShell i={STOPS - 1} onClick={() => { sfx(map.exam.reached ? "fanfare" : "tap"); setSheet("finish"); }} label="Exam week castle">
              <span className={"text-6xl " + (map.exam.reached ? "anim-bounce" : "")} aria-hidden="true">{skin.finish}</span>
              <span className="absolute -bottom-7 whitespace-nowrap rounded-full bg-surface px-3 font-display text-base font-extrabold" style={{ border: "var(--border-width) solid var(--surface-border)" }}>Exam week</span>
            </StopShell>

            {/* The character */}
            <div
              ref={charRef}
              className="pointer-events-none absolute z-20"
              style={{ left: `${(here.x / W) * 100}%`, top: `${(here.y / H) * 100}%`, transform: "translate(-50%, calc(-100% - 46px))" }}
              aria-label={`You are at ${Math.round(pos) === 0 ? "the start" : `week ${Math.round(pos)}`}`}
              role="img"
            >
              <div className={walking ? "map-walk" : "intro-bob"}>
                <div className="relative">
                  <div className="rounded-full p-1" style={{ background: "var(--accent)", boxShadow: "0 6px 0 rgba(0,0,0,0.25)" }}>
                    <Avatar name={user.displayName} avatar={user.avatar} size={54} />
                  </div>
                  {wornEmoji(worn, "hat") && <span aria-hidden="true" className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl">{wornEmoji(worn, "hat")}</span>}
                  {wornEmoji(worn, "pet") && <span aria-hidden="true" className="absolute -bottom-2 -right-8 text-4xl">{wornEmoji(worn, "pet")}</span>}
                  {wornEmoji(worn, "trail") && (
                    <span aria-hidden="true" className="absolute -left-16 top-1/2 flex -translate-y-1/2 gap-1 text-2xl">
                      <span style={{ opacity: 0.35 }}>{wornEmoji(worn, "trail")}</span><span style={{ opacity: 0.6 }}>{wornEmoji(worn, "trail")}</span><span>{wornEmoji(worn, "trail")}</span>
                    </span>
                  )}
                  <span aria-hidden="true" className="absolute -bottom-3 -left-7 text-4xl">{skin.ride}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {arrived !== null && <Confetti />}
      {arrived !== null && map && (
        <div role="status" className="pop-in fixed inset-x-4 bottom-6 z-40 mx-auto flex max-w-lg items-center gap-3 p-4 card">
          <span aria-hidden="true" className="text-5xl">{skin.stops[arrived - 1]}</span>
          <div className="flex-1">
            <p className="font-display text-2xl font-extrabold">You reached week {arrived}!</p>
            <p className="text-lg">A new game is waiting: {GAME_INFO[(map.checkpoints[arrived - 1] as Checkpoint).game].title}</p>
          </div>
          <button type="button" className="btn btn-primary" onClick={() => { setArrived(null); navigate(`/map/play/${map.semester}/${arrived}`); }}>Play!</button>
        </div>
      )}

      {sheet && map && <StopSheet sheet={sheet} map={map} onClose={() => setSheet(null)} onPlay={(w) => navigate(`/map/play/${map.semester}/${w}`)} />}
    </main>
  );
}

function StopShell({ i, children, onClick, label, className = "", style }: { i: number; children: React.ReactNode; onClick: () => void; label: string; className?: string; style?: React.CSSProperties }) {
  const p = point(i);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={"absolute z-10 flex h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full " + className}
      style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%`, ...style }}
    >
      {children}
    </button>
  );
}

function WeekStop({ cp, icon, wobble, arrived, onTap }: { cp: Checkpoint; icon: string; wobble: boolean; arrived: boolean; onTap: () => void }) {
  const locked = cp.state === "locked";
  const reached = cp.state === "reached";
  const label = `Week ${cp.week}: ${locked ? "locked" : reached ? `reached, ${cp.stars} stars, play ${GAME_INFO[cp.game].title}` : `${cp.lessons.done} of ${cp.lessons.total} lessons done`}`;
  return (
    <StopShell
      i={cp.week}
      onClick={onTap}
      label={label}
      className={(wobble ? "shake " : "") + (arrived ? "map-arrive " : "") + (cp.isCurrentWeek && !reached ? "intro-glow " : "")}
      style={{
        background: locked ? "var(--done-tint)" : reached ? "var(--accent)" : "var(--surface)",
        border: `5px solid ${cp.isCurrentWeek ? "var(--accent)" : "var(--surface-border)"}`,
        boxShadow: reached ? "0 0 0 6px color-mix(in srgb, var(--accent) 35%, transparent), 0 8px 0 rgba(0,0,0,0.25)" : "0 6px 0 rgba(0,0,0,0.2)",
      }}
    >
      <span aria-hidden="true" className={"text-[44px] leading-none " + (locked ? "opacity-40 grayscale" : "")}>{icon}</span>
      {locked && <span aria-hidden="true" className="absolute text-3xl">🔒</span>}
      <span aria-hidden="true" className="absolute -left-3 -top-3 flex h-9 min-w-9 items-center justify-center rounded-full px-1 font-display text-lg font-extrabold" style={{ background: "var(--surface)", color: "var(--text)", border: "3px solid var(--surface-border)" }}>
        {cp.week}
      </span>
      {reached && !cp.chestOpened && <span aria-hidden="true" className="chest-wiggle absolute -right-4 -top-4 text-4xl">🎁</span>}
      {reached && cp.chestOpened && <span aria-hidden="true" className="absolute -right-3 -top-3 text-2xl">{GAMES[cp.game].icon}</span>}
      {!locked && (
        <span aria-hidden="true" className="absolute -bottom-8 flex gap-0.5 whitespace-nowrap rounded-full px-2 text-xl" style={{ background: "var(--surface)", border: "2px solid var(--surface-border)" }}>
          {reached || cp.stars > 0 ? [1, 2, 3].map((s) => <span key={s} style={{ opacity: s <= cp.stars ? 1 : 0.25 }}>⭐</span>) : <span className="font-display text-base font-extrabold">{cp.lessons.done}/{cp.lessons.total}</span>}
        </span>
      )}
      {cp.isCurrentWeek && !reached && <span aria-hidden="true" className="absolute -top-10 whitespace-nowrap rounded-full bg-accent px-3 font-display text-base font-extrabold text-on-accent">This week</span>}
    </StopShell>
  );
}

function StopSheet({ sheet, map, onClose, onPlay }: { sheet: Checkpoint | "finish" | "start"; map: MapData; onClose: () => void; onPlay: (week: number) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  let body: React.ReactNode;
  if (sheet === "start") {
    body = (
      <>
        <h2 className="font-display text-3xl font-extrabold">Ready, explorer?</h2>
        <p className="text-lg">Finish every lesson in a week and you'll travel to that week's stop. Each stop has a game to play and a treasure chest full of points from your quizzes!</p>
      </>
    );
  } else if (sheet === "finish") {
    body = (
      <>
        <h2 className="font-display text-3xl font-extrabold">The exam week castle</h2>
        <p className="text-lg">{map.exam.reached ? "You made it all the way! Well done, superstar! 🎉" : "Reach all 12 stops, then finish the semester with your exams here."}</p>
      </>
    );
  } else {
    const cp = sheet;
    const info = GAME_INFO[cp.game];
    if (cp.state === "locked") {
      body = (
        <>
          <h2 className="font-display text-3xl font-extrabold">Week {cp.week} <span aria-hidden="true">🔒</span></h2>
          <p className="text-lg">This stop opens in a future week. Keep exploring!</p>
        </>
      );
    } else if (cp.state === "open") {
      const left = cp.lessons.total - cp.lessons.done;
      body = (
        <>
          <h2 className="font-display text-3xl font-extrabold">Week {cp.week}</h2>
          <p className="text-lg">Finish {left} more {left === 1 ? "lesson" : "lessons"} to travel here and unlock <b>{info.title}</b>.</p>
          <div className="h-4 overflow-hidden rounded-full border-2 border-line" style={{ background: "var(--track)" }} role="progressbar" aria-valuemin={0} aria-valuemax={cp.lessons.total} aria-valuenow={cp.lessons.done} aria-label="Lessons done">
            <div className="h-full bg-accent" style={{ width: `${(cp.lessons.done / Math.max(1, cp.lessons.total)) * 100}%` }} />
          </div>
          <Link to="/" className="btn btn-primary">Go to my lessons</Link>
        </>
      );
    } else {
      body = (
        <>
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="anim-bounce text-6xl">{GAMES[cp.game].icon}</span>
            <div>
              <p className="font-bold text-muted">Week {cp.week} game{cp.level === 2 ? " · level 2" : ""}</p>
              <h2 className="font-display text-3xl font-extrabold">{info.title}</h2>
            </div>
          </div>
          <p className="text-lg">{info.blurb}</p>
          <div className="flex flex-wrap gap-3 text-lg font-bold">
            <span className="rounded-full bg-surface px-3 py-1" style={{ border: "2px solid var(--surface-border)" }}>{[1, 2, 3].map((s) => <span key={s} aria-hidden="true" style={{ opacity: s <= cp.stars ? 1 : 0.25 }}>⭐</span>)} <span className="sr-only">{cp.stars} stars</span></span>
            {cp.chestOpened ? (
              <span className="rounded-full bg-surface px-3 py-1" style={{ border: "2px solid var(--surface-border)" }}>🪙 {cp.quizPoints + cp.bestBonus} points earned</span>
            ) : (
              <span className="chest-wiggle rounded-full bg-surface px-3 py-1" style={{ border: "2px solid var(--surface-border)" }}>🎁 {cp.quizPoints} quiz points inside!</span>
            )}
            {cp.plays > 0 && <span className="rounded-full bg-surface px-3 py-1" style={{ border: "2px solid var(--surface-border)" }}>Best bonus {cp.bestBonus}/10</span>}
          </div>
          <button type="button" className="btn btn-primary intro-glow !min-h-16 !text-2xl" onClick={() => { sfx("start"); onPlay(cp.week); }}>
            {cp.plays > 0 ? "Play again" : "Play and open the chest!"}
          </button>
        </>
      );
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
      <button type="button" aria-label="Close" className="absolute inset-0 cursor-default" style={{ background: "rgba(0,0,0,0.45)" }} onClick={onClose} />
      <div className="sheet-up card relative m-3 flex w-full max-w-lg flex-col gap-4 p-6">
        <button type="button" onClick={onClose} className="btn absolute right-3 top-3 !min-h-11 !px-3" aria-label="Close">✕</button>
        {body}
      </div>
    </div>
  );
}
