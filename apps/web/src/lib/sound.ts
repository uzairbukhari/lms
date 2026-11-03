// Sound for the lesson slides: small synthesised effects (no audio files to download) and spoken narration in a
// natural voice from the Worker, or the device's own voice when that is unavailable. Everything is optional and switched off together by the sound button.

const KEY = "lms-sound";

export function getSoundOn(): boolean {
  try {
    return localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}

export function setSoundOn(on: boolean): void {
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    // storage blocked: the choice lasts for this visit only
  }
  if (!on) stopSpeech();
}

// --- Sound effects ---------------------------------------------------------------------------------

type Ctx = AudioContext;
let ctx: Ctx | null = null;

function audio(): Ctx | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  ctx ??= new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

type Note = { f: number; at: number; len: number; type?: OscillatorType; vol?: number };

function play(notes: Note[]): void {
  const c = audio();
  if (!c) return;
  const t0 = c.currentTime;
  for (const n of notes) {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = n.type ?? "sine";
    osc.frequency.setValueAtTime(n.f, t0 + n.at);
    const v = n.vol ?? 0.18;
    gain.gain.setValueAtTime(0.0001, t0 + n.at);
    gain.gain.exponentialRampToValueAtTime(v, t0 + n.at + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + n.at + n.len);
    osc.connect(gain).connect(c.destination);
    osc.start(t0 + n.at);
    osc.stop(t0 + n.at + n.len + 0.02);
  }
}

export type Sfx =
  | "next" | "back" | "tap" | "correct" | "wrong" | "done" | "start"
  // Semester map and mini games
  | "pop" | "sparkle" | "coin" | "gold" | "bump" | "step" | "whoosh" | "fanfare" | "tick" | "go" | "flip" | "unlock" | "locked" | "chest";

const SOUNDS: Record<Sfx, Note[]> = {
  next: [{ f: 523, at: 0, len: 0.1 }, { f: 784, at: 0.08, len: 0.14 }],
  back: [{ f: 659, at: 0, len: 0.1 }, { f: 440, at: 0.08, len: 0.14 }],
  tap: [{ f: 880, at: 0, len: 0.07, type: "triangle" }],
  correct: [{ f: 523, at: 0, len: 0.12 }, { f: 659, at: 0.1, len: 0.12 }, { f: 784, at: 0.2, len: 0.12 }, { f: 1047, at: 0.3, len: 0.3 }],
  wrong: [{ f: 294, at: 0, len: 0.16, type: "triangle" }, { f: 247, at: 0.15, len: 0.24, type: "triangle" }],
  done: [{ f: 523, at: 0, len: 0.14 }, { f: 659, at: 0.14, len: 0.14 }, { f: 784, at: 0.28, len: 0.14 }, { f: 1047, at: 0.42, len: 0.4 }, { f: 1319, at: 0.6, len: 0.5 }],
  start: [{ f: 392, at: 0, len: 0.12 }, { f: 523, at: 0.12, len: 0.12 }, { f: 659, at: 0.24, len: 0.12 }, { f: 784, at: 0.36, len: 0.3 }],
  pop: [{ f: 1200, at: 0, len: 0.05, type: "square", vol: 0.08 }, { f: 1800, at: 0.03, len: 0.08, vol: 0.12 }],
  coin: [{ f: 988, at: 0, len: 0.08, type: "square", vol: 0.07 }, { f: 1319, at: 0.07, len: 0.18, type: "square", vol: 0.07 }],
  gold: [{ f: 1047, at: 0, len: 0.08, type: "square", vol: 0.07 }, { f: 1319, at: 0.07, len: 0.08, type: "square", vol: 0.07 }, { f: 1568, at: 0.14, len: 0.08, type: "square", vol: 0.07 }, { f: 2093, at: 0.21, len: 0.25, type: "square", vol: 0.07 }],
  bump: [{ f: 140, at: 0, len: 0.18, type: "sawtooth", vol: 0.12 }, { f: 100, at: 0.08, len: 0.2, type: "triangle", vol: 0.15 }],
  step: [{ f: 520, at: 0, len: 0.05, type: "triangle", vol: 0.1 }],
  whoosh: [{ f: 300, at: 0, len: 0.12, type: "sine", vol: 0.08 }, { f: 600, at: 0.05, len: 0.12, vol: 0.06 }, { f: 900, at: 0.1, len: 0.12, vol: 0.04 }],
  fanfare: [
    { f: 523, at: 0, len: 0.12, type: "square", vol: 0.07 }, { f: 523, at: 0.13, len: 0.08, type: "square", vol: 0.07 }, { f: 523, at: 0.22, len: 0.08, type: "square", vol: 0.07 },
    { f: 698, at: 0.32, len: 0.35, type: "square", vol: 0.07 }, { f: 880, at: 0.7, len: 0.14, type: "square", vol: 0.07 }, { f: 1047, at: 0.86, len: 0.6, type: "square", vol: 0.07 },
    { f: 262, at: 0.32, len: 1.1, type: "triangle", vol: 0.12 },
  ],
  sparkle: [{ f: 1568, at: 0, len: 0.06, vol: 0.06 }, { f: 2093, at: 0.05, len: 0.06, vol: 0.05 }, { f: 2637, at: 0.1, len: 0.12, vol: 0.04 }],
  tick: [{ f: 660, at: 0, len: 0.12, type: "triangle" }],
  go: [{ f: 880, at: 0, len: 0.1, type: "square", vol: 0.08 }, { f: 1320, at: 0.08, len: 0.35, type: "square", vol: 0.08 }],
  flip: [{ f: 700, at: 0, len: 0.05, type: "triangle", vol: 0.1 }, { f: 1000, at: 0.04, len: 0.05, type: "triangle", vol: 0.1 }],
  unlock: [{ f: 784, at: 0, len: 0.1 }, { f: 988, at: 0.1, len: 0.1 }, { f: 1175, at: 0.2, len: 0.1 }, { f: 1568, at: 0.3, len: 0.4 }],
  locked: [{ f: 220, at: 0, len: 0.08, type: "square", vol: 0.06 }, { f: 220, at: 0.12, len: 0.08, type: "square", vol: 0.06 }],
  chest: [
    { f: 392, at: 0, len: 0.1, type: "triangle" }, { f: 523, at: 0.1, len: 0.1, type: "triangle" }, { f: 659, at: 0.2, len: 0.1, type: "triangle" },
    { f: 1047, at: 0.3, len: 0.1, type: "square", vol: 0.06 }, { f: 1319, at: 0.38, len: 0.1, type: "square", vol: 0.06 }, { f: 1568, at: 0.46, len: 0.1, type: "square", vol: 0.06 }, { f: 2093, at: 0.54, len: 0.4, type: "square", vol: 0.06 },
  ],
};

// --- Game music --------------------------------------------------------------------------------------
// A soft, cheerful loop (pentatonic melody over a bass note) for the mini games. Quiet so effects stay clear.

let musicTimer: ReturnType<typeof setInterval> | null = null;
const TUNES: Record<string, { bass: number[]; tune: number[] }> = {
  space: { bass: [131, 131, 165, 147], tune: [523, 659, 784, 659, 880, 784, 659, 587, 523, 587, 659, 784, 659, 587, 523, 392] },
  candy: { bass: [175, 175, 220, 196], tune: [698, 880, 1047, 880, 784, 698, 784, 880, 1047, 1175, 1047, 880, 784, 880, 698, 523] },
  sunny: { bass: [196, 196, 247, 220], tune: [784, 659, 784, 988, 880, 784, 659, 587, 659, 784, 880, 784, 659, 587, 523, 587] },
  forest: { bass: [147, 147, 196, 175], tune: [587, 698, 880, 698, 784, 698, 587, 523, 587, 698, 784, 880, 784, 698, 587, 440] },
};

/** Start the game music loop (does nothing if sound is off). */
export function startMusic(theme = "space", tempo = 1): void {
  stopMusic();
  if (!getSoundOn()) return;
  const t = TUNES[theme] ?? TUNES.space!;
  let i = 0;
  const beat = 220 / tempo;
  musicTimer = setInterval(() => {
    if (!getSoundOn()) return;
    try {
      const notes: Note[] = [];
      if (i % 2 === 0) notes.push({ f: t.tune[(i / 2) % t.tune.length]!, at: 0, len: 0.22, type: "triangle", vol: 0.045 });
      if (i % 8 === 0) notes.push({ f: t.bass[(i / 8) % t.bass.length]!, at: 0, len: 0.8, type: "sine", vol: 0.07 });
      if (i % 4 === 2) notes.push({ f: 2400, at: 0, len: 0.03, type: "square", vol: 0.012 });
      play(notes);
    } catch {
      // no audio: stay quiet
    }
    i++;
  }, beat);
}

export function stopMusic(): void {
  if (musicTimer) clearInterval(musicTimer);
  musicTimer = null;
}

export function sfx(name: Sfx): void {
  if (!getSoundOn()) return;
  try {
    play(SOUNDS[name]);
  } catch {
    // no audio available: carry on silently
  }
}

// --- Narration -------------------------------------------------------------------------------------
// A natural voice generated by the Worker (one short MP3 per sentence, cached there), played through the same audio
// context as the sound effects so it is allowed on tablets after the first tap. Falls back to the device's own voice
// when the Worker voice is unavailable (offline, local development, daily limit).

let token = 0;
let waiting = false;

// --- Narration cues: lets the animation follow the voice ------------------------------------------------
// Every spoken sentence is announced as it starts, so pictures can enter the moment the voice names them.
export type NarrationEvent = { kind: "sentence"; text: string; index: number; total: number } | { kind: "start"; text: string } | { kind: "end"; text: string; finished: boolean };
const listeners = new Set<(e: NarrationEvent) => void>();
/** Listen to narration as it plays. Returns the function that stops listening. */
export function onNarration(fn: (e: NarrationEvent) => void): () => void {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}
function emit(e: NarrationEvent): void {
  for (const fn of [...listeners]) {
    try { fn(e); } catch { /* a listener failing must never stop the voice */ }
  }
}
let speakingText: string | null = null;
/** The text being read aloud right now, if any. */
export function speakingNow(): string | null {
  return speakingText;
}
let current: AudioBufferSourceNode | null = null;
let voiceUrl = "/api/ai/voice";
let serverVoiceOff = false;
let narrationOn = true;
const clips = new Map<string, Promise<AudioBuffer | null>>();

/** The parent's test student hears nothing from the voice service or the device voice. */
let voiceBlocked = false;
export function setVoiceBlocked(blocked: boolean): void {
  if (blocked === voiceBlocked) return;
  voiceBlocked = blocked;
  narrationOn = !blocked;
}

/** Narration is off in the admin preview: nothing is fetched from the voice service and nothing is read aloud. */
export function setNarrationEnabled(on: boolean): void {
  narrationOn = on && !voiceBlocked;
  if (!on) stopSpeech();
}

export function narrationEnabled(): boolean {
  return narrationOn;
}

export function speechSupported(): boolean {
  return narrationOn && typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
}

/** How narration splits text into sentences (one voice clip each). Animation cues count sentences the same way. */
export function sentences(text: string): string[] {
  return text.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()).filter(Boolean) ?? [];
}

function clip(sentence: string): Promise<AudioBuffer | null> {
  const known = clips.get(sentence);
  if (known) return known;
  const c = audio();
  if (!narrationOn || serverVoiceOff || !c) return Promise.resolve(null);
  const p = fetch(voiceUrl, { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: sentence }) })
    .then(async (res) => {
      if (!res.ok) throw new Error(String(res.status));
      return await c.decodeAudioData(await res.arrayBuffer());
    })
    .catch(() => {
      serverVoiceOff = true;
      clips.delete(sentence);
      return null;
    });
  clips.set(sentence, p);
  // Keep memory small: forget the oldest clips once a few slides' worth are held.
  if (clips.size > 60) clips.delete(clips.keys().next().value as string);
  return p;
}

/** Start fetching a slide's narration so it plays without a pause when the child gets there. */
export function preloadNarration(text: string): void {
  if (!narrationOn || !getSoundOn()) return;
  for (const s of sentences(text)) void clip(s);
}

function playClip(buffer: AudioBuffer, mine: number): Promise<void> {
  return new Promise((resolve) => {
    const c = audio();
    if (!c || token !== mine) return resolve();
    const src = c.createBufferSource();
    src.buffer = buffer;
    src.connect(c.destination);
    src.onended = () => {
      if (current === src) current = null;
      resolve();
    };
    current = src;
    src.start();
  });
}

// Ranked: the first name found wins. Neural ("Natural") voices first, then the friendlier built-in ones.
const PREFERRED = [/natural/i, /google uk english female/i, /samantha/i, /serena|moira|karen|tessa/i, /google us english/i, /zira|hazel|libby|sonia/i];

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
  for (const re of PREFERRED) {
    const v = voices.find((x) => re.test(x.name));
    if (v) return v;
  }
  return voices.find((v) => v.default) ?? voices[0];
}

/** Read sentences with the device's own voice. Resolves when the last one ends. */
function deviceSpeak(parts: string[], mine: number, offset = 0, total = parts.length, text = ""): Promise<void> {
  return new Promise((resolve) => {
    if (!speechSupported() || parts.length === 0 || token !== mine) return resolve();
    const voice = pickVoice();
    window.speechSynthesis.resume();
    parts.forEach((p, i) => {
      const u = new SpeechSynthesisUtterance(p);
      u.rate = 0.9;
      u.pitch = 1.05;
      u.lang = "en-GB";
      if (voice) u.voice = voice;
      u.onstart = () => { if (token === mine) emit({ kind: "sentence", text, index: offset + i, total }); };
      if (i === parts.length - 1) u.onend = u.onerror = () => resolve();
      window.speechSynthesis.speak(u);
    });
  });
}

/** Speak text sentence by sentence. Replaces anything already being said. */
export function speak(text: string, onState?: (speaking: boolean) => void, opts: { force?: boolean } = {}): void {
  // `force` is for a speaker button the child pressed herself: it reads aloud even when slide sound is switched off.
  if (!narrationOn || (!getSoundOn() && !opts.force)) return;
  stopSpeech();
  const mine = ++token;
  const parts = sentences(text);
  if (parts.length === 0) return;
  onState?.(true);
  waiting = true;
  speakingText = text;
  emit({ kind: "start", text });
  for (const p of parts) void clip(p);
  void (async () => {
    // Chrome often drops speech queued straight after cancel(), so give the cancel a moment to settle first.
    await new Promise((r) => window.setTimeout(r, 80));
    for (let i = 0; i < parts.length; i++) {
      const buffer = await clip(parts[i] as string);
      if (token !== mine) return;
      waiting = false;
      if (!buffer) {
        await deviceSpeak(parts.slice(i), mine, i, parts.length, text);
        break;
      }
      emit({ kind: "sentence", text, index: i, total: parts.length });
      await playClip(buffer, mine);
      if (token !== mine) return;
    }
    waiting = false;
    if (token === mine) { speakingText = null; emit({ kind: "end", text, finished: true }); onState?.(false); }
  })();
}

// Tablets (iPad Safari above all) only let a page talk or beep once something has played inside a real tap. Play a
// silent utterance and wake the audio context on the first tap anywhere, so later narration started from a timer works.
// Only click, touchend and keydown count as a tap here: pointerdown from a finger does not.
const UNLOCK_EVENTS = ["click", "touchend", "keydown"] as const;

function unlockAudio(): void {
  for (const e of UNLOCK_EVENTS) window.removeEventListener(e, unlockAudio, true);
  try {
    audio();
  } catch {
    // no audio available
  }
  if (speechSupported()) {
    const u = new SpeechSynthesisUtterance(" ");
    u.volume = 0;
    window.speechSynthesis.speak(u);
  }
}

if (typeof window !== "undefined") {
  for (const e of UNLOCK_EVENTS) window.addEventListener(e, unlockAudio, { capture: true, passive: true });
}

/** True when the child has already tapped the page, so the browser will allow sound. */
export function hasTapped(): boolean {
  return typeof navigator !== "undefined" && (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation?.hasBeenActive === true;
}

/** True while narration is playing or about to start. */
export function isSpeaking(): boolean {
  return waiting || current !== null || (speechSupported() && (window.speechSynthesis.speaking || window.speechSynthesis.pending));
}

export function stopSpeech(): void {
  token++;
  if (speakingText !== null) { const text = speakingText; speakingText = null; emit({ kind: "end", text, finished: false }); }
  waiting = false;
  if (current) {
    current.onended = null;
    try {
      current.stop();
    } catch {
      // already stopped
    }
    current = null;
  }
  if (speechSupported()) window.speechSynthesis.cancel();
}
