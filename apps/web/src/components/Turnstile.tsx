import { useEffect, useRef } from "react";

type Api = { render: (el: HTMLElement, o: Record<string, unknown>) => string; remove: (id: string) => void; reset: (id: string) => void };
declare global { interface Window { turnstile?: Api } }

const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT}"]`);
    const el = existing ?? Object.assign(document.createElement("script"), { src: SCRIPT, async: true });
    el.addEventListener("load", () => resolve());
    el.addEventListener("error", () => reject(new Error("Could not load the check.")));
    if (!existing) document.head.appendChild(el);
  });
}

/** Cloudflare Turnstile check, shown on the login page only after a few wrong passwords. `resetKey` asks for a fresh token. */
export function Turnstile({ siteKey, onToken, resetKey }: { siteKey: string; onToken: (token: string) => void; resetKey: number }) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  useEffect(() => {
    let gone = false;
    loadScript().then(() => {
      if (gone || !box.current || !window.turnstile) return;
      widget.current = window.turnstile.render(box.current, { sitekey: siteKey, callback: onToken, "expired-callback": () => onToken(""), "error-callback": () => onToken("") });
    }).catch(() => onToken(""));
    return () => { gone = true; if (widget.current && window.turnstile) window.turnstile.remove(widget.current); widget.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);
  useEffect(() => { if (resetKey > 0 && widget.current && window.turnstile) { onToken(""); window.turnstile.reset(widget.current); } }, [resetKey]); // eslint-disable-line react-hooks/exhaustive-deps
  return <div ref={box} aria-label="Security check" className="flex justify-center" />;
}
