import { buildGlossary, findInGlossary, gradeQuestion, isLookupWord, normaliseWord, type CheckQuestion, type Response } from "@lms/schema";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent, type ReactNode, type TouchEvent } from "react";
import { Link, useParams } from "react-router";
import { api, ApiError } from "../api";
import { Loader } from "../components/Loader";
import { Markdown } from "../components/Markdown";
import { QuestionView } from "../components/QuestionView";
import { WordBubble, type BubbleState } from "../components/WordBubble";
import { buildSlides, plain, splitSentences, type Block, type Slide } from "../lib/slides";
import { isControl, wordAtPoint, type PressedWord } from "../lib/wordHelp";
import { getSoundOn, hasTapped, isSpeaking, preloadNarration, setNarrationEnabled, setSoundOn, sfx, speak, speechSupported, stopSpeech } from "../lib/sound";

export type LessonPayload = {
  lesson: { id: string; title: string; subject: string; summary: string; minutes: number; objectives: string[]; semester: number | null; week: number | null; phase: string };
  blocks: Block[];
  quiz: { questionCount: number; passPercent: number };
  progress: { status: string; lastBlock: number } | null;
  readOnly: boolean;
  preview?: boolean;
};

const CALLOUT = {
  tip: { icon: "💡", label: "Tip" },
  fun_fact: { icon: "🤩", label: "Fun fact" },
  warning: { icon: "⚠️", label: "Careful" },
} as const;

export function LessonPlayer({ mode }: { mode: "student" | "preview" }) {
  const { id } = useParams();
  const [data, setData] = useState<LessonPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const started = useRef(Date.now());

  const back = mode === "preview" ? "/admin/lessons" : "/";
  const assetUrl = (name: string) => (mode === "preview" ? `/api/admin/assets/file/${encodeURIComponent(name)}` : `/api/assets/${encodeURIComponent(name)}`);

  useEffect(() => {
    const path = mode === "preview" ? `/api/admin/lessons/${id}/preview` : `/api/lessons/${id}`;
    // The parent's preview never uses the voice service (it costs AI usage); the children's lessons always do.
    setNarrationEnabled(mode !== "preview");
    api<LessonPayload>(path)
      .then(setData)
      .catch((e: unknown) => setError(e instanceof ApiError && e.status === 404 ? "That lesson isn't available yet." : "We couldn't load this lesson. Please try again."));
    return () => { stopSpeech(); setNarrationEnabled(true); };
  }, [id, mode]);

  /** Progress is only saved for real lessons that are open for doing; previews and look-back never change anything. */
  const canSave = mode === "student" && data !== null && !data.readOnly;
  const save = useCallback(
    (slide: number, completed = false) => {
      if (!canSave) return;
      const addSeconds = Math.min(1800, Math.round((Date.now() - started.current) / 1000));
      started.current = Date.now();
      void api(`/api/lessons/${id}/progress`, { method: "PUT", body: { lastBlock: Math.min(slide, 200), completed, addSeconds } }).catch(() => undefined);
    },
    [canSave, id],
  );

  if (error) return <Frame><p role="alert" className="text-2xl">{error}</p><Link className="btn" to={back}>← Back</Link></Frame>;
  if (!data) return <Loader label="Opening your lesson…" fullScreen />;
  return <Deck data={data} mode={mode} lessonId={id ?? ""} back={back} assetUrl={assetUrl} save={save} />;
}

function Frame({ children }: { children: ReactNode }) {
  return <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start gap-6 px-4 py-8">{children}</main>;
}

// --- The slide deck --------------------------------------------------------------------------------

function Deck({ data, mode, lessonId, back, assetUrl, save }: {
  data: LessonPayload; mode: "student" | "preview"; lessonId: string; back: string; assetUrl: (n: string) => string; save: (slide: number, completed?: boolean) => void;
}) {
  const { lesson } = data;
  const slides = useMemo(() => buildSlides(lesson, data.blocks), [lesson, data.blocks]);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<"next" | "back">("next");
  const [soundOn, setSound] = useState(getSoundOn);
  const [speaking, setSpeaking] = useState(false);
  // Opening the lesson from the home page was itself a tap, so narration can start straight away.
  const interacted = useRef(hasTapped());
  const [unlocked, setUnlocked] = useState(interacted.current);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const slide = slides[index] as Slide;
  const last = slides.length - 1;
  const resumeAt = data.progress && data.progress.lastBlock > 0 && data.progress.lastBlock < last ? data.progress.lastBlock : 0;

  // First time through a lesson (in production) the child cannot race ahead: Next waits on each new slide until the
  // narration has finished, or for a reading time based on its length when sound is off or the voice fails.
  // Slides already reached (going back, or resuming) are free to move through.
  const paced = import.meta.env.PROD && mode === "student" && !data.readOnly && data.progress?.status !== "completed";
  const [furthest, setFurthest] = useState(resumeAt);
  const [ready, setReady] = useState(true);

  const listen = useCallback(() => speak(slide.narration, (on) => { setSpeaking(on); if (!on) setReady(true); }), [slide]);
  const stop = () => { stopSpeech(); setSpeaking(false); };

  const go = useCallback((to: number) => {
    const next = Math.max(0, Math.min(last, to));
    if (next === index) return;
    if (paced && next > furthest && !ready) return;
    interacted.current = true;
    setFurthest((f) => Math.max(f, next));
    setDir(next > index ? "next" : "back");
    sfx(next === last ? "done" : next > index ? "next" : "back");
    setIndex(next);
    setSpeaking(false);
    save(next, next === last);
  }, [index, last, save, paced, furthest, ready]);

  useEffect(() => {
    if (!paced || index < furthest) { setReady(true); return; }
    setReady(false);
    const words = slide.narration.split(/\s+/).filter(Boolean).length;
    const reading = Math.min(12, Math.max(2, words * 0.3));
    // With sound on, narration ending is what unlocks Next; the longer timer only covers audio that never plays.
    const wait = soundOn && unlocked ? reading * 2 + 3 : reading;
    const t = window.setTimeout(() => setReady(true), wait * 1000);
    return () => window.clearTimeout(t);
  }, [index, paced, furthest, slide, soundOn, unlocked]);

  // Browsers only allow sound after the child has touched the page, so the first tap anywhere switches narration on.
  useEffect(() => {
    if (unlocked) return;
    const unlock = () => { interacted.current = true; setUnlocked(true); };
    window.addEventListener("click", unlock, { once: true, capture: true });
    window.addEventListener("keydown", unlock, { once: true, capture: true });
    return () => { window.removeEventListener("click", unlock, true); window.removeEventListener("keydown", unlock, true); };
  }, [unlocked]);

  // Fetch the next slide's narration in the background so it starts without a pause.
  useEffect(() => {
    const next = slides[index + 1];
    if (next && soundOn) preloadNarration(next.narration);
  }, [index, slides, soundOn]);

  // Read each slide aloud once sound is allowed, unless a tap has already started something being read.
  useEffect(() => {
    if (!unlocked || !soundOn) return;
    const t = window.setTimeout(() => { if (!isSpeaking()) listen(); }, 350);
    return () => { window.clearTimeout(t); stopSpeech(); };
  }, [index, soundOn, unlocked, listen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) return;
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  const onTouchStart = (e: TouchEvent) => { const t = e.touches[0]; if (t) touch.current = { x: t.clientX, y: t.clientY }; };
  const onTouchEnd = (e: TouchEvent) => {
    const s = touch.current; const t = e.changedTouches[0];
    touch.current = null;
    if (!s || !t) return;
    const dx = t.clientX - s.x; const dy = t.clientY - s.y;
    if (Math.abs(dx) > 70 && Math.abs(dy) < 80) go(index + (dx < 0 ? 1 : -1));
  };

  // --- Press and hold a word to hear what it means ---
  const glossary = useMemo(() => buildGlossary(data.blocks), [data.blocks]);
  const defined = useRef(new Map<string, { meaning: string; source: "ai" | "static" }>());
  const [bubble, setBubble] = useState<{ pressed: PressedWord; state: BubbleState } | null>(null);
  const holding = useRef<{ x: number; y: number; timer: number } | null>(null);
  const swallowClick = useRef(false);
  const lookup = useRef(0);

  const closeBubble = useCallback(() => { lookup.current++; setBubble(null); }, []);
  useEffect(closeBubble, [index, closeBubble]);

  const explain = useCallback((pressed: PressedWord) => {
    const id = ++lookup.current;
    const set = (state: BubbleState) => { if (lookup.current === id) setBubble({ pressed, state }); };
    const word = normaliseWord(pressed.word);
    const mine = findInGlossary(glossary, word);
    const say = (text: string) => { if (soundOn && unlocked) speak(`${pressed.word}. ${text}`); };
    sfx("tap");
    if (mine) {
      set({ status: "ready", meaning: mine.meaning, example: mine.example, source: "lesson" });
      say(mine.meaning);
    } else if (!isLookupWord(word)) {
      set({ status: "ready", meaning: "That one is too tricky for me to explain. Try another word!", source: "static" });
    } else if (mode === "preview") {
      // Previews never use AI: only meanings saved in the lesson show here.
      set({ status: "ready", meaning: "Preview: this word has no meaning saved in the lesson, so children will get a short helper explanation instead. No AI is used in previews.", source: "preview" });
    } else {
      const known = defined.current.get(word);
      if (known) { set({ status: "ready", meaning: known.meaning, source: known.source }); say(known.meaning); return; }
      set({ status: "loading" });
      api<{ meaning: string; source: "ai" | "static" }>("/api/ai/define", { method: "POST", body: { lessonId, word } })
        .then((r) => { defined.current.set(word, { meaning: r.meaning, source: r.source }); set({ status: "ready", meaning: r.meaning, source: r.source }); say(r.meaning); })
        .catch(() => set({ status: "ready", meaning: "I couldn't find out just now. Try again in a moment!", source: "static" }));
    }
  }, [glossary, lessonId, mode, soundOn, unlocked]);

  const cancelHold = () => { if (holding.current) { window.clearTimeout(holding.current.timer); holding.current = null; } };
  const onHoldStart = (e: PointerEvent<HTMLElement>) => {
    if ((e.pointerType === "mouse" && e.button !== 0) || isControl(e.target as Element)) return;
    cancelHold();
    const { clientX: x, clientY: y } = e;
    const root = e.currentTarget;
    const timer = window.setTimeout(() => {
      holding.current = null;
      const hit = wordAtPoint(root, x, y);
      if (!hit) return;
      // The press that opened the bubble must not also count as a tap on the sentence under it.
      swallowClick.current = true;
      window.setTimeout(() => { swallowClick.current = false; }, 700);
      explain(hit);
    }, 450);
    holding.current = { x, y, timer };
  };
  const onHoldMove = (e: PointerEvent) => {
    const h = holding.current;
    if (h && Math.hypot(e.clientX - h.x, e.clientY - h.y) > 12) cancelHold();
  };
  useEffect(() => cancelHold, []);

  const toggleSound = () => { const on = !soundOn; setSoundOn(on); setSound(on); if (on) sfx("tap"); else setSpeaking(false); };

  return (
    <main className="fixed inset-0 flex flex-col" aria-label={lesson.title}>
      <header className="flex items-center gap-3 px-3 pb-2 pt-3 sm:px-6">
        <Link className="btn !min-h-12 !px-4" to={back} onClick={() => { stopSpeech(); save(index, index === last); }} aria-label="Leave the lesson">✕<span className="hidden sm:inline"> Exit</span></Link>
        <div className="flex-1" role="progressbar" aria-valuemin={1} aria-valuemax={slides.length} aria-valuenow={index + 1} aria-label="Lesson progress">
          <div className="h-3 overflow-hidden rounded-full border-2 border-line bg-surface">
            <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${((index + 1) / slides.length) * 100}%` }} />
          </div>
        </div>
        <p className="min-w-14 text-right text-lg font-bold text-muted">{index + 1}/{slides.length}</p>
      </header>

      {(data.preview || data.readOnly) && (
        <p className="mx-3 card px-4 py-2 text-center font-bold sm:mx-6" role="note">{data.preview ? "👀 Preview. Nothing here is saved." : "📖 Looking back: your progress stays as it was."}</p>
      )}

      <section key={index} className={`no-select min-h-0 flex-1 px-4 py-3 sm:px-10 ${dir === "next" ? "slide-in-next" : "slide-in-back"}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
        onPointerDown={onHoldStart} onPointerMove={onHoldMove} onPointerUp={cancelHold} onPointerCancel={cancelHold} onPointerLeave={cancelHold}
        onContextMenu={(e) => e.preventDefault()}
        onClickCapture={(e) => { if (swallowClick.current) { swallowClick.current = false; e.preventDefault(); e.stopPropagation(); } }} aria-live="polite">
        <FitToScreen>
          <SlideView slide={slide} lesson={lesson} quiz={data.quiz} mode={mode} lessonId={lessonId} assetUrl={assetUrl} resumeAt={resumeAt} onGo={go} onLeave={() => { stopSpeech(); save(index, true); }} />
        </FitToScreen>
      </section>

      {bubble && <WordBubble pressed={bubble.pressed} state={bubble.state} canSpeak={speechSupported()} onSpeak={() => speak(`${bubble.pressed.word}. ${bubble.state.status === "ready" ? bubble.state.meaning : ""}`)} onClose={closeBubble} />}

      <footer className="flex items-center gap-2 border-t-2 border-line bg-surface px-3 py-3 sm:gap-4 sm:px-6">
        <button type="button" className="btn !min-h-16 !px-5 text-xl" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide">← <span className="hidden sm:inline">Back</span></button>
        <div className="flex flex-1 items-center justify-center gap-2">
          {speechSupported() && (
            <>
              <button type="button" className="btn !min-h-14 !px-4" onClick={() => { interacted.current = true; if (speaking) stop(); else { sfx("tap"); listen(); } }} aria-label={speaking ? "Stop reading" : "Read this slide aloud"}>
                {speaking ? "⏸" : "🔊"}<span className="hidden sm:inline"> {speaking ? "Stop" : "Listen"}</span>
              </button>
              <button type="button" className="btn !min-h-14 !px-4" onClick={() => { interacted.current = true; sfx("tap"); listen(); }} aria-label="Read this slide again">🔁<span className="hidden sm:inline"> Again</span></button>
            </>
          )}
          <button type="button" className="btn !min-h-14 !px-4" onClick={toggleSound} aria-pressed={!soundOn} aria-label={soundOn ? "Turn sound off" : "Turn sound on"}>{soundOn ? "🔔" : "🔕"}</button>
        </div>
        <button type="button" className="btn btn-primary !min-h-16 !px-6 text-xl" onClick={() => go(index + 1)} disabled={index === last || (paced && index >= furthest && !ready)} aria-label={ready ? "Next slide" : "Next slide, available after listening"}>{ready ? <><span className="hidden sm:inline">Next </span>→</> : "⏳"}</button>
      </footer>
    </main>
  );
}

/** Shrinks a slide that is too tall so everything shows at once with no scrolling. Text re-wraps at the wider width as it
 * shrinks, so the scale is settled over a few passes. Below MIN_SCALE text gets too small to read, so it scrolls instead. */
const MIN_SCALE = 0.5;

function FitToScreen({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, height: 0 });

  useLayoutEffect(() => {
    const outer = box.current; const content = inner.current;
    if (!outer || !content) return;
    let frame = 0;
    const measure = () => {
      const avail = outer.clientHeight;
      if (avail <= 0) return;
      let scale = 1;
      for (let i = 0; i < 6; i++) {
        content.style.width = `${100 / scale}%`;
        const next = Math.max(MIN_SCALE, Math.min(1, avail / content.offsetHeight));
        if (Math.abs(next - scale) < 0.005) break;
        scale = next;
      }
      content.style.width = `${100 / scale}%`;
      const height = content.offsetHeight * scale;
      setFit((f) => (Math.abs(f.scale - scale) < 0.005 && Math.abs(f.height - height) < 1 ? f : { scale, height }));
    };
    measure();
    const ro = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); });
    ro.observe(outer);
    // Pictures loading or an answer appearing changes the height: watch the slide's own content, not the scaled wrapper.
    if (content.firstElementChild) ro.observe(content.firstElementChild);
    return () => { ro.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return (
    <div ref={box} className={`flex h-full w-full flex-col ${fit.scale <= MIN_SCALE ? "overflow-y-auto" : "justify-center overflow-hidden"}`}>
      <div className="relative w-full shrink-0" style={{ height: fit.height || undefined }}>
        <div ref={inner} className="absolute left-0 top-0" style={{ width: `${100 / fit.scale}%`, transform: `scale(${fit.scale})`, transformOrigin: "top left" }}>
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 py-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

// --- One slide -------------------------------------------------------------------------------------

type ViewProps = {
  slide: Slide; lesson: LessonPayload["lesson"]; quiz: LessonPayload["quiz"]; mode: "student" | "preview"; lessonId: string;
  assetUrl: (n: string) => string; resumeAt: number; onGo: (n: number) => void; onLeave: () => void;
};

const titleCls = "font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight";
const bodyCls = "text-[clamp(1.35rem,2.8vw,2.1rem)] leading-snug";

function SlideView(p: ViewProps) {
  const { slide } = p;
  switch (slide.kind) {
    case "title":
      return (
        <>
          <div className="float text-center text-[clamp(5rem,14vw,9rem)]" aria-hidden="true">🚀</div>
          <h1 className={`${titleCls} text-center`}>{slide.title}</h1>
          <p className={`${bodyCls} text-center text-muted`}>{p.lesson.summary}</p>
          <ul className="mx-auto flex max-w-2xl flex-col gap-2">
            {p.lesson.objectives.map((o, i) => <li key={o} className={`pop-in ${bodyCls} card px-4 py-2`} style={{ animationDelay: `${0.15 + i * 0.12}s` }}>🎯 {o}</li>)}
          </ul>
          <p className="text-center text-xl text-muted">About {p.lesson.minutes} minutes</p>
          <p className="text-center text-xl text-muted">💡 Press and hold any word to find out what it means.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" className="btn btn-primary !min-h-16 !px-8 text-2xl" onClick={() => { sfx("start"); p.onGo(1); }}>Let's go! 🚀</button>
            {p.resumeAt > 0 && <button type="button" className="btn !min-h-16 !px-6 text-xl" onClick={() => p.onGo(p.resumeAt)}>Carry on where I was</button>}
          </div>
        </>
      );
    case "content":
      return <ContentSlide slide={slide} assetUrl={p.assetUrl} />;
    case "check":
      return <CheckSlide slide={slide} />;
    case "reveal":
      return <RevealSlide slide={slide} />;
    case "activity":
      return <ActivitySlide slide={slide} />;
    case "summary":
      return <SummarySlide slide={slide} />;
    case "embed": {
      const b = slide.blocks[0] as Extract<Block, { type: "html_embed" }>;
      // Scripts may run, but with no same-origin access: the page cannot read the session or call the API.
      return <iframe title={b.title} sandbox="allow-scripts" srcDoc={b.html} className="h-[60vh] w-full rounded-2xl border-2 border-line bg-white" />;
    }
    case "finish":
      return (
        <>
          <div className="pop-in text-center text-[clamp(4rem,10vw,6rem)]" aria-hidden="true">🎉</div>
          <h2 className={`${titleCls} text-center`}>{slide.title}</h2>
          {p.mode === "preview" ? (
            <p className={`${bodyCls} text-center`}>The quiz has {p.quiz.questionCount} questions. Pass mark is {p.quiz.passPercent}%.</p>
          ) : (
            <>
              <p className={`${bodyCls} text-center`}>Next up: a quiz with {p.quiz.questionCount} questions.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link className="btn btn-primary !min-h-16 !px-8 text-2xl" to={`/lesson/${p.lessonId}/quiz`} onClick={p.onLeave}>Start the quiz ✏️</Link>
                <Link className="btn !min-h-16 !px-6 text-xl" to="/" onClick={p.onLeave}>Back home</Link>
                <button type="button" className="btn !min-h-16 !px-6 text-xl" onClick={() => p.onGo(0)}>Read again 🔁</button>
              </div>
            </>
          )}
          {slide.blocks.map((b, i) => b.type === "callout" ? <Callout key={i} b={b} /> : null)}
        </>
      );
  }
}

function Callout({ b }: { b: Extract<Block, { type: "callout" }> }) {
  return (
    <aside className="pop-in card flex items-center gap-4 p-4" role="note">
      <span aria-hidden="true" className="text-5xl">{CALLOUT[b.style].icon}</span>
      <div className={bodyCls}><p className="font-bold">{CALLOUT[b.style].label}</p><Markdown text={b.markdown} /></div>
    </aside>
  );
}

/** Heading plus short points. Tap a point to hear it. */
function ContentSlide({ slide, assetUrl }: { slide: Slide; assetUrl: (n: string) => string }) {
  let n = 0;
  return (
    <>
      {slide.title && <h2 className={titleCls}>{slide.title}</h2>}
      {[...slide.blocks.filter((b) => b.type === "image"), ...slide.blocks.filter((b) => b.type !== "image")].map((b, bi) => {
        switch (b.type) {
          case "text":
            return (
              <ul key={bi} className="flex flex-col gap-3">
                {splitSentences(b.markdown).map((s) => (
                  <li key={s}>
                    <button type="button" data-words className={`pop-in card w-full px-5 py-3 text-left ${bodyCls}`} style={{ animationDelay: `${0.1 + n++ * 0.15}s` }} onClick={() => { sfx("tap"); speak(plain(s)); }}>
                      <Markdown text={s} />
                    </button>
                  </li>
                ))}
              </ul>
            );
          case "image":
            return (
              <figure key={bi} className="flex flex-col items-center gap-2">
                {b.asset ? <img src={assetUrl(b.asset)} alt={b.alt ?? ""} className="max-h-72 rounded-xl" /> : <span className="float text-[clamp(5rem,13vw,8rem)]" role="img" aria-label={b.alt ?? b.caption ?? "picture"}>{b.emoji}</span>}
                {b.caption && <figcaption className="text-xl text-muted">{b.caption}</figcaption>}
              </figure>
            );
          case "callout":
            return <Callout key={bi} b={b} />;
          case "vocab":
            return (
              <button key={bi} type="button" data-words className={`pop-in card flex flex-col gap-1 px-5 py-4 text-left ${bodyCls}`} onClick={() => { sfx("tap"); speak(`${plain(b.word)}. ${plain(b.meaning)}`); }}>
                <span className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold">📚 {b.word}</span>
                <span>{b.meaning}</span>
                {b.example && <span className="text-muted">Example: {b.example}</span>}
              </button>
            );
          case "steps":
            return <StepList key={bi} items={b.items} />;
          default:
            return null;
        }
      })}
    </>
  );
}

/** Tap a step to tick it off. */
function StepList({ items }: { items: string[] }) {
  const [done, setDone] = useState<Set<number>>(new Set());
  return (
    <ol className="flex flex-col gap-3">
      {items.map((s, i) => (
        <li key={s}>
          <button type="button" data-words aria-pressed={done.has(i)} className={`pop-in card flex w-full items-center gap-4 px-5 py-3 text-left ${bodyCls}`} style={{ animationDelay: `${i * 0.12}s` }}
            onClick={() => { sfx("tap"); setDone((d) => { const x = new Set(d); if (x.has(i)) x.delete(i); else x.add(i); return x; }); }}>
            <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-line font-display text-2xl font-bold" aria-hidden="true">{done.has(i) ? "✅" : i + 1}</span>
            <span className={done.has(i) ? "line-through opacity-70" : ""}>{s}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}

/** "Check your understanding": instant feedback, never scored or recorded. Retry as often as you like. */
function CheckSlide({ slide }: { slide: Slide }) {
  const q = (slide.blocks[0] as Extract<Block, { type: "check" }>).question as CheckQuestion;
  const [value, setValue] = useState<Response>(undefined);
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");
  const [showHint, setShowHint] = useState(false);
  const submit = () => {
    const ok = gradeQuestion(q, value).correct;
    setState(ok ? "correct" : "wrong");
    sfx(ok ? "correct" : "wrong");
  };
  return (
    <>
      <p className="text-xl font-bold text-muted">✋ Check yourself{slide.eyebrow ? ` · ${slide.eyebrow}` : ""}</p>
      <div className={`card flex flex-col gap-4 p-5 sm:p-8 ${state === "wrong" ? "shake" : ""} ${bodyCls}`}>
        <QuestionView q={q} value={value} onChange={(v) => { setValue(v); setState("idle"); }} />
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary !min-h-16 !px-8 text-xl" onClick={submit}>Check ✔</button>
          {q.hint && state !== "correct" && <button type="button" className="btn !min-h-16 !px-6 text-xl" onClick={() => { sfx("tap"); setShowHint(true); }}>💡 Hint</button>}
        </div>
        {showHint && q.hint && <p role="note" className="text-xl">💡 {q.hint}</p>}
        <p role="status" aria-live="polite" className="text-2xl font-bold">
          {state === "correct" && <span className="pop-in inline-block">🎉 Yes! {q.explanation}</span>}
          {state === "wrong" && <>🤔 Not quite. Have another go!</>}
        </p>
      </div>
    </>
  );
}

function RevealSlide({ slide }: { slide: Slide }) {
  const b = slide.blocks[0] as Extract<Block, { type: "reveal" }>;
  const [open, setOpen] = useState(false);
  return (
    <>
      <p className="text-xl font-bold text-muted">🤔 Think about it</p>
      <h2 className={titleCls}>{b.prompt}</h2>
      {open ? (
        <div className={`pop-in card p-5 ${bodyCls}`}><Markdown text={b.answer_markdown} /></div>
      ) : (
        <button type="button" className="btn btn-primary !min-h-16 self-start !px-8 text-xl" onClick={() => { sfx("correct"); setOpen(true); speak(plain(b.answer_markdown)); }}>👆 Tap to see the answer</button>
      )}
    </>
  );
}

function ActivitySlide({ slide }: { slide: Slide }) {
  const b = slide.blocks[0] as Extract<Block, { type: "activity" }>;
  return (
    <>
      <p className="text-xl font-bold text-muted">🛠️ Try it!</p>
      <h2 className={titleCls}>{b.title}</h2>
      {b.materials && b.materials.length > 0 && (
        <p className={`pop-in card px-5 py-3 ${bodyCls}`}><strong>You need:</strong> {b.materials.join(", ")}</p>
      )}
      <StepList items={b.instructions} />
    </>
  );
}

function SummarySlide({ slide }: { slide: Slide }) {
  const b = slide.blocks[0] as Extract<Block, { type: "summary" }>;
  return (
    <>
      <h2 className={titleCls}>⭐ Remember</h2>
      <ul className="flex flex-col gap-3">
        {b.points.map((pt, i) => (
          <li key={pt}>
            <button type="button" data-words className={`pop-in card flex w-full items-center gap-4 px-5 py-3 text-left ${bodyCls}`} style={{ animationDelay: `${0.1 + i * 0.2}s` }} onClick={() => { sfx("tap"); speak(plain(pt)); }}>
              <span aria-hidden="true" className="text-4xl">⭐</span>{pt}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
