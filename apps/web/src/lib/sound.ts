// Sound for the lesson slides: small synthesised effects (no audio files to download) and spoken narration using the
// device's own voices. Everything is optional and switched off together by the sound button.

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

export type Sfx = "next" | "back" | "tap" | "correct" | "wrong" | "done" | "start";

const SOUNDS: Record<Sfx, Note[]> = {
  next: [{ f: 523, at: 0, len: 0.1 }, { f: 784, at: 0.08, len: 0.14 }],
  back: [{ f: 659, at: 0, len: 0.1 }, { f: 440, at: 0.08, len: 0.14 }],
  tap: [{ f: 880, at: 0, len: 0.07, type: "triangle" }],
  correct: [{ f: 523, at: 0, len: 0.12 }, { f: 659, at: 0.1, len: 0.12 }, { f: 784, at: 0.2, len: 0.12 }, { f: 1047, at: 0.3, len: 0.3 }],
  wrong: [{ f: 294, at: 0, len: 0.16, type: "triangle" }, { f: 247, at: 0.15, len: 0.24, type: "triangle" }],
  done: [{ f: 523, at: 0, len: 0.14 }, { f: 659, at: 0.14, len: 0.14 }, { f: 784, at: 0.28, len: 0.14 }, { f: 1047, at: 0.42, len: 0.4 }, { f: 1319, at: 0.6, len: 0.5 }],
  start: [{ f: 392, at: 0, len: 0.12 }, { f: 523, at: 0.12, len: 0.12 }, { f: 659, at: 0.24, len: 0.12 }, { f: 784, at: 0.36, len: 0.3 }],
};

export function sfx(name: Sfx): void {
  if (!getSoundOn()) return;
  try {
    play(SOUNDS[name]);
  } catch {
    // no audio available: carry on silently
  }
}

// --- Narration -------------------------------------------------------------------------------------

let token = 0;

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
}

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
  const nice = /(samantha|karen|moira|serena|google uk english female|google us english|natural|aria|jenny)/i;
  return voices.find((v) => nice.test(v.name)) ?? voices.find((v) => v.default) ?? voices[0];
}

/** Speak text sentence by sentence (long utterances get cut off on some browsers). Replaces anything already being said. */
export function speak(text: string, onState?: (speaking: boolean) => void): void {
  if (!speechSupported() || !getSoundOn()) return;
  stopSpeech();
  const mine = ++token;
  const parts = text.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()).filter(Boolean) ?? [];
  if (parts.length === 0) return;
  const voice = pickVoice();
  onState?.(true);
  parts.forEach((p, i) => {
    const u = new SpeechSynthesisUtterance(p);
    u.rate = 0.9;
    u.pitch = 1.05;
    u.lang = "en-GB";
    if (voice) u.voice = voice;
    if (i === parts.length - 1) {
      u.onend = u.onerror = () => {
        if (token === mine) onState?.(false);
      };
    }
    window.speechSynthesis.speak(u);
  });
}

export function stopSpeech(): void {
  token++;
  if (speechSupported()) window.speechSynthesis.cancel();
}
