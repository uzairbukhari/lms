import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router";
import type { SessionUser } from "@lms/schema";
import { Avatar } from "../components/Avatar";
import { HomeCharacter } from "../components/HomeCharacter";
import type { CardSummary } from "../lib/cards";
import type { Rewards, TeaserState } from "../lib/rewards";
import type { SubjectPath } from "../lib/topic";
import { SubjectIcon, TINT, SUBJECT_LOOK, shortTitle } from "./StudentHome";
import "./home-v3.css";

export type UpNext = { kind: "carry" | "balance"; courseId: string; subject: string; lessonId: string } | null;
type ExamRow = { id: string; title: string; maxAttempts: number | null; attemptsUsed: number; passed: boolean };

const ICONS = {
  star: <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2 6.3 20.3l1.2-6.4L2.8 9.5l6.4-.8z" fill="currentColor" />,
  coin: <circle cx="12" cy="12" r="9" fill="currentColor" />,
  flame: <path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 1.6 1.2 2.5 2 2.5 0-3-1-5 1-8z" fill="currentColor" />,
  play: <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" stroke="none" />,
  cards: <><rect x="3" y="6" width="12" height="15" rx="2" /><path d="M8 3h11a2 2 0 0 1 2 2v13" /></>,
  puzzle: <path d="M10 3h4v3a2 2 0 1 0 4 0V3h3v7h-3a2 2 0 1 0 0 4h3v7h-7v-3a2 2 0 1 0-4 0v3H3v-7h3a2 2 0 1 0 0-4H3V3z" />,
  map: <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15" />,
  exam: <><path d="M9 11l3 3 8-8" /><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9" /></>,
  me: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  book: <path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2zM4 19V5" />,
  grow: <path d="M12 21v-9M12 12c0-4 3-6 7-6 0 4-3 6-7 6zM12 14c0-3-2-5-6-5 0 3 2 5 6 5z" />,
  bag: <path d="M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0" />,
  out: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
  chev: <path d="M9 5l7 7-7 7" />,
};
function Ico({ n, size }: { n: keyof typeof ICONS; size?: number }) {
  const filled = n === "star" || n === "coin" || n === "flame" || n === "play";
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={filled ? "none" : "currentColor"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[n]}</svg>;
}
const tint = (s: string): CSSProperties => ({ background: TINT[s] ?? "var(--tint-english)" });
const label = (s: string) => SUBJECT_LOOK[s]?.label ?? s;

export function HomeV3(p: {
  user: SessionUser; logout: () => void | Promise<void>; paths: SubjectPath[]; upNext: UpNext; stars: number; points: number | null;
  rewards: Rewards | null; cards: CardSummary | null; teaser: TeaserState | null; exams: ExamRow[]; hasMapLinks?: boolean;
}) {
  const { user, paths, upNext } = p;
  const [menu, setMenu] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(false); };
    const onDown = (e: MouseEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setMenu(false); };
    document.addEventListener("keydown", onKey); document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, [menu]);

  const path = upNext ? paths.find((x) => x.courseId === upNext.courseId && x.subject === upNext.subject) : undefined;
  const topic = path?.topics.find((t) => t.lessonId === upNext?.lessonId);
  const doneIn = (x: SubjectPath) => x.topics.filter((t) => t.status === "done").length;
  const openExam = p.exams.find((e) => !e.passed && (e.maxAttempts === null || e.attemptsUsed < e.maxAttempts));
  const streak = p.rewards?.streak.current ?? 0;
  const newSticker = !!p.rewards?.stickers.some((s) => s.isNew);
  const allDone = paths.length > 0 && paths.every((x) => doneIn(x) === x.topics.length);

  return (
    <main className="hv3">
      <header className="hv3-top">
        <Avatar name={user.displayName} avatar={user.avatar} size={56} />
        <div>
          <h1 className="hv3-hi">Hi, {user.displayName}!</h1>
          <p>{streak > 1 ? `${streak} weeks in a row. Keep it up!` : "Welcome back"}</p>
        </div>
        <div className="hv3-pills">
          <span className="hv3-pill" aria-label={`${p.stars} stars`}><span style={{ color: "var(--star)", display: "inline-flex" }}><Ico n="star" /></span>{p.stars}</span>
          {p.points !== null && <span className="hv3-pill hide-portrait" aria-label={`${p.points} coins`}><span style={{ color: "#f5b301", display: "inline-flex" }}><Ico n="coin" /></span>{p.points}</span>}
          {streak > 0 && <Link to="/rewards" className="hv3-pill hide-portrait" aria-label={`${streak} week streak`}><span style={{ color: "#ff8a4c", display: "inline-flex" }}><Ico n="flame" /></span>{streak}</Link>}
          <div className="hv3-menu-wrap" ref={wrap}>
            <button type="button" className="hv3-pill hv3-me" aria-haspopup="menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
              <Ico n="me" /> Me {newSticker && <span className="hv3-dot" role="img" aria-label="New sticker" />}
            </button>
            {menu && (
              <nav className="hv3-menu hv3-card" aria-label="Me" onClick={() => setMenu(false)}>
                <Link to="/growth"><Ico n="grow" size={24} /> My growth</Link>
                <Link to="/rewards"><Ico n="bag" size={24} /> Stickers and shop{p.rewards ? ` · ${p.rewards.points.balance}` : ""}</Link>
                {p.cards && p.cards.words > 0 && <Link to="/words"><Ico n="book" size={24} /> My word book ({p.cards.words})</Link>}
                {p.cards && p.cards.boost > 0 && <Link to="/cards/boost"><Ico n="cards" size={24} /> Boost round</Link>}
                <Link to="/map"><Ico n="map" size={24} /> Journey map</Link>
                <button type="button" onClick={() => void p.logout()}><Ico n="out" size={24} /> Log out</button>
              </nav>
            )}
          </div>
        </div>
      </header>

      <div className="hv3-main">
        <section className="hv3-hero hv3-card" aria-label="Up next">
          {topic && path ? (
            <>
              <div className="hv3-eyebrow"><span className="hv3-sic" style={tint(path.subject)}><SubjectIcon subject={path.subject} size={18} /></span>{upNext?.kind === "carry" ? "Carry on" : "Up next"} · {label(path.subject)}</div>
              <h1>{shortTitle(topic.title)}</h1>
              <p className="hv3-part">{topic.partsDone > 0 && topic.partsDone < topic.partsTotal ? `Part ${topic.partsDone + 1} of ${topic.partsTotal}` : topic.partsDone >= topic.partsTotal && topic.partsTotal > 0 ? "Ready for the big quiz" : `${topic.partsTotal} parts to explore`}</p>
              {topic.partsTotal > 0 && <div className="hv3-dots" role="img" aria-label={`${topic.partsDone} of ${topic.partsTotal} parts done`}>{Array.from({ length: topic.partsTotal }, (_, i) => <i key={i} className={i < topic.partsDone ? "done" : ""} />)}</div>}
              <Link to={`/topic/${topic.lessonId}`} className="hv3-play"><Ico n="play" /> {topic.partsDone > 0 ? "Keep going" : "Start"}</Link>
            </>
          ) : (
            <>
              <div className="hv3-eyebrow">{allDone ? "All done" : "Welcome"}</div>
              <h1>{allDone ? "You finished every topic!" : "Pick a subject to start"}</h1>
              <p className="hv3-part">{allDone ? "Try a grand quiz or a brain teaser." : "Choose any subject from the list."}</p>
            </>
          )}
          <HomeCharacter />
        </section>

        <div className="hv3-daily">
          {p.cards && p.cards.daily > 0 && <DailyTile to="/cards/daily" icon="cards" bg="english" title="Today's cards" sub={p.cards.dailyDone ? "All done today" : `${p.cards.daily} to practise`} badge={p.cards.dailyDone ? undefined : p.cards.daily} />}
          <DailyTile to="/teaser" icon="puzzle" bg="data-ai" title="Brain teaser" sub={p.teaser?.done ? "Done today" : "A new one today"} badge={p.teaser && !p.teaser.done ? 1 : undefined} />
          {openExam ? <DailyTile to={`/exam/${openExam.id}`} icon="exam" bg="maths" title="Exam" sub={openExam.title} badge={1} /> : <DailyTile to="/map" icon="map" bg="science" title="Journey map" sub="See your adventure" />}
        </div>

        <section className="hv3-subjects hv3-card" aria-labelledby="hv3-subj">
          <h2 id="hv3-subj">My subjects</h2>
          {paths.map((x) => {
            const done = doneIn(x);
            const cur = x.topics.find((t) => t.status === "current" || t.status === "early");
            const on = !!upNext && x.courseId === upNext.courseId && x.subject === upNext.subject;
            const pct = x.topics.length ? Math.round((done / x.topics.length) * 100) : 0;
            const mapTo = `/path/${x.courseId}/${x.subject}`;
            return (
              <div key={`${x.courseId}:${x.subject}`} className={"hv3-row" + (on ? " on" : "")}>
                <Link to={cur ? `/topic/${cur.lessonId}` : mapTo} className="hv3-row-main" aria-label={`${label(x.subject)}: ${cur ? shortTitle(cur.title) : "all topics done"}. ${done} of ${x.topics.length} topics done${on ? ". Up next" : ""}`}>
                  <span className="hv3-ring" style={{ "--p": pct } as CSSProperties}><span className="hv3-sic" style={tint(x.subject)}><SubjectIcon subject={x.subject} size={26} /></span></span>
                  <span className="hv3-st"><small>{label(x.subject)}</small><b>{cur ? shortTitle(cur.title) : "All topics done"}</b><span>{cur ? `Topic ${done + 1} of ${x.topics.length}` : `${x.topics.length} of ${x.topics.length} topics`}</span></span>
                </Link>
                <Link to={mapTo} className="hv3-map" aria-label={`Open the ${label(x.subject)} map`}><Ico n="map" /></Link>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}

function DailyTile({ to, icon, bg, title, sub, badge }: { to: string; icon: keyof typeof ICONS; bg: string; title: string; sub: ReactNode; badge?: number }) {
  return (
    <Link to={to} className="hv3-tile hv3-card" aria-label={`${title}. ${typeof sub === "string" ? sub : ""}${badge ? ` (${badge})` : ""}`}>
      <span className="ic" style={tint(bg)}><Ico n={icon} /></span>
      <div><b>{title}</b><span className="sub">{sub}</span></div>
      {badge ? <span className="hv3-badge" aria-hidden="true">{badge}</span> : null}
    </Link>
  );
}
