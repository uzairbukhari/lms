import { SLOT_LABEL, SHOP_SLOTS } from "@lms/schema";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../api";
import { Confetti } from "../games/common";
import { sfx } from "../lib/sound";
import type { Rewards as RewardsData } from "../lib/rewards";

/** The week streak, sticker book and points shop. Everything here is the child's own; nothing compares children. */
export function Rewards() {
  const [data, setData] = useState<RewardsData | null>(null);
  const [failed, setFailed] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => { api<RewardsData>("/api/rewards").then(setData).catch(() => setFailed(true)); }, []);
  const fresh = data?.stickers.filter((s) => s.isNew) ?? [];
  useEffect(() => { if (fresh.length) sfx("fanfare"); }, [fresh.length]);

  async function buy(id: string) {
    setMessage("");
    try { setData(await api<RewardsData>("/api/shop/buy", { body: { itemId: id } })); sfx("correct"); }
    catch (e) { setMessage(e instanceof Error ? e.message : "Could not buy that."); sfx("wrong"); }
  }
  async function wear(slot: string, itemId: string | null) {
    sfx("tap");
    try { setData(await api<RewardsData>("/api/shop/equip", { body: { slot, itemId } })); } catch { setMessage("Could not change that."); }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-8 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl font-extrabold">🎒 Stickers and shop</h1>
        <Link className="btn" to="/">← Home</Link>
      </header>
      {failed && <p role="alert" className="card p-5 text-lg">We couldn't load your stickers. Please try again.</p>}
      {!data && !failed && <p className="text-lg text-muted">Opening your sticker book…</p>}
      {data && (
        <>
          {fresh.length > 0 && (
            <>
              <Confetti />
              <section role="status" className="pop-in card flex flex-col items-center gap-2 p-6 text-center">
                <h2 className="font-display text-2xl font-extrabold">🎉 New {fresh.length === 1 ? "sticker" : "stickers"}!</h2>
                <p className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xl">{fresh.map((s) => <span key={s.id} className="inline-flex items-center gap-2"><span aria-hidden="true" className="text-5xl">{s.emoji}</span><span className="font-bold">{s.name}</span></span>)}</p>
              </section>
            </>
          )}

          <section aria-labelledby="streak" className="card flex flex-wrap items-center gap-5 p-5">
            <span aria-hidden="true" className="text-6xl">{data.streak.current > 0 ? "🔥" : "🌱"}</span>
            <div>
              <h2 id="streak" className="font-display text-2xl font-extrabold">{data.streak.current === 0 ? "Start a streak!" : `${data.streak.current}-week streak`}</h2>
              <p className="text-lg text-muted">
                {data.streak.current === 0 ? "Finish every lesson in a week to light the flame." : "Every week you finish all your lessons keeps the flame going."}
                {data.streak.best > data.streak.current ? ` Your best is ${data.streak.best} weeks.` : ""}
              </p>
            </div>
          </section>

          <section aria-labelledby="stickers" className="flex flex-col gap-3">
            <h2 id="stickers" className="font-display text-3xl font-extrabold">Sticker book ({data.stickers.filter((s) => s.earned).length} of {data.stickers.length})</h2>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {data.stickers.map((s) => (
                <li key={s.id} className="card flex flex-col items-center gap-1 p-4 text-center" style={{ opacity: s.earned ? 1 : 0.55 }}>
                  <span aria-hidden="true" className="text-5xl" style={{ filter: s.earned ? "none" : "grayscale(1)" }}>{s.earned ? s.emoji : "❔"}</span>
                  <p className="text-lg font-bold">{s.earned ? s.name : "Secret sticker"}</p>
                  <p className="text-sm text-muted">{s.earned ? "Collected!" : s.how}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="shop" className="flex flex-col gap-4">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 id="shop" className="font-display text-3xl font-extrabold">🛍️ Shop</h2>
              <p className="text-xl font-extrabold" aria-live="polite">⭐ {data.points.balance} points to spend</p>
            </div>
            <p className="text-muted">Collect points on your map by opening the chest at each stop. What you buy appears on your map character.</p>
            {message && <p role="alert" className="text-lg font-bold">{message}</p>}
            {SHOP_SLOTS.map((slot) => (
              <div key={slot} className="flex flex-col gap-2">
                <h3 className="font-display text-xl font-bold">{SLOT_LABEL[slot]}</h3>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {data.shop.filter((i) => i.slot === slot).map((i) => (
                    <li key={i.id} className="card flex flex-col items-center gap-2 p-4 text-center">
                      <span aria-hidden="true" className="text-5xl">{i.emoji}</span>
                      <p className="font-bold">{i.name}</p>
                      {i.owned ? (
                        <button type="button" className={"btn !min-h-12 " + (i.equipped ? "" : "btn-primary")} onClick={() => void wear(slot, i.equipped ? null : i.id)} aria-pressed={i.equipped}>{i.equipped ? "Take off" : "Wear it"}</button>
                      ) : (
                        <button type="button" className="btn !min-h-12" disabled={!i.affordable} onClick={() => void buy(i.id)}>⭐ {i.cost}{i.affordable ? " · Buy" : ""}</button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </>
      )}
    </main>
  );
}
