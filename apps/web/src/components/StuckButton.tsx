import { useEffect, useState } from "react";
import { api } from "../api";

/** "I'm stuck": records the spot for a grown-up. It never opens a chat. */
export function StuckButton({ lessonId, slide, questionId, compact }: { lessonId: string; slide?: number; questionId?: string; compact?: boolean }) {
  const [state, setState] = useState<"idle" | "sent" | "failed">("idle");
  // A new slide or question starts fresh.
  useEffect(() => setState("idle"), [lessonId, slide, questionId]);
  const send = async () => {
    try {
      await api("/api/stuck", { method: "POST", body: { lessonId, slide, questionId } });
      setState("sent");
    } catch { setState("failed"); }
  };
  if (state === "sent") return <p role="status" className="text-base font-bold">Thanks! A grown-up will take a look. 💛</p>;
  return (
    <>
      <button type="button" className={"btn " + (compact ? "!min-h-14 !px-4" : "self-start")} onClick={() => void send()} aria-label="I'm stuck, this is confusing">
        🙋{compact ? <span className="hidden sm:inline"> I'm stuck</span> : " I'm stuck"}
      </button>
      {state === "failed" && <span role="alert" className="text-sm">Couldn't send that. Try again.</span>}
    </>
  );
}
