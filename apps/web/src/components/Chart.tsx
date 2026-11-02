import type { ReactNode } from "react";
import { chartReadout, plain, type Block } from "../lib/slides";

type ChartBlock = Extract<Block, { type: "chart" }>;

/** Small drawn pictures made from a few numbers, so a new word like "pictogram" always comes with something to look at. */
export function Chart({ b }: { b: ChartBlock }) {
  return (
    <figure className="pop-in card flex flex-col gap-3 p-4" role="img" aria-label={`${plain(b.title)}. ${chartReadout(b)}`}>
      <figcaption className="font-display text-[clamp(1.5rem,3.2vw,2.2rem)] font-bold">📊 {b.title}</figcaption>
      <div aria-hidden="true">{draw(b)}</div>
      {b.caption && <p aria-hidden="true" className="text-[clamp(1.1rem,2.2vw,1.6rem)] text-muted">{b.caption}</p>}
    </figure>
  );
}

function draw(b: ChartBlock): ReactNode {
  switch (b.kind) {
    case "pictogram": return <Pictogram b={b} />;
    case "bar_chart": return <Bars b={b} />;
    case "tally": return <Tally b={b} />;
    case "table": return <Table b={b} />;
    case "number_line": return <NumberLine b={b} />;
    case "fraction": return <Fraction b={b} />;
  }
}

const rowsOf = (b: ChartBlock) => b.rows ?? [];
const text = "text-[clamp(1.2rem,2.6vw,1.9rem)]";

function Pictogram({ b }: { b: ChartBlock }) {
  const each = b.each ?? 1;
  return (
    <div className="flex flex-col gap-2">
      {rowsOf(b).map((r) => (
        <div key={r.label} className={`flex items-center gap-3 ${text}`}>
          <span className="w-28 shrink-0 font-bold sm:w-40">{r.label}</span>
          <span className="flex flex-1 flex-wrap gap-1 border-l-4 border-line pl-2 text-[clamp(1.6rem,3.6vw,2.6rem)] leading-none">
            {Array.from({ length: Math.round(r.value / each) }, (_, i) => <span key={i}>{r.emoji ?? "⭐"}</span>)}
          </span>
          <span className="w-10 shrink-0 text-right font-bold">{r.value}</span>
        </div>
      ))}
      <p className={`${text} text-muted`}>{each > 1 ? `Each picture stands for ${each}.` : "Each picture stands for 1."}</p>
    </div>
  );
}

function Bars({ b }: { b: ChartBlock }) {
  const rows = rowsOf(b);
  const max = Math.max(1, ...rows.map((r) => r.value));
  const top = max <= 5 ? max : Math.ceil(max / 5) * 5;
  const ticks = top <= 10 ? Array.from({ length: top + 1 }, (_, i) => i) : Array.from({ length: 6 }, (_, i) => (top / 5) * i);
  const W = 460; const H = 260; const L = 44; const B = 56; const T = 14;
  const slot = (W - L - 10) / rows.length;
  const y = (v: number) => H - B - ((H - B - T) * v) / top;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-xl" fontFamily="inherit">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={L} x2={W - 10} y1={y(t)} y2={y(t)} stroke="currentColor" strokeOpacity={t === 0 ? 0.9 : 0.18} strokeWidth={t === 0 ? 2 : 1} />
          <text x={L - 8} y={y(t) + 5} textAnchor="end" fontSize="15" fill="currentColor">{t}</text>
        </g>
      ))}
      {rows.map((r, i) => {
        const w = Math.min(70, slot * 0.6);
        const x = L + slot * i + (slot - w) / 2;
        return (
          <g key={r.label}>
            <rect x={x} y={y(r.value)} width={w} height={H - B - y(r.value)} rx="6" fill="var(--accent)" stroke="var(--surface-border)" strokeWidth="2" className="bar-grow" style={{ animationDelay: `${i * 0.12}s` }} />
            <text x={x + w / 2} y={y(r.value) - 6} textAnchor="middle" fontSize="17" fontWeight="700" fill="currentColor">{r.value}</text>
            <text x={x + w / 2} y={H - B + 22} textAnchor="middle" fontSize="16" fill="currentColor">{r.emoji ? `${r.emoji} ` : ""}{r.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Tally({ b }: { b: ChartBlock }) {
  return (
    <div className="flex flex-col gap-3">
      {rowsOf(b).map((r) => {
        const fives = Math.floor(r.value / 5); const rest = r.value % 5;
        return (
          <div key={r.label} className={`flex items-center gap-3 ${text}`}>
            <span className="w-28 shrink-0 font-bold sm:w-40">{r.emoji ? `${r.emoji} ` : ""}{r.label}</span>
            <svg height="46" width={(fives + (rest ? 1 : 0)) * 64 + 8} className="flex-1" style={{ maxWidth: 420 }} stroke="currentColor" strokeWidth="4" strokeLinecap="round">
              {Array.from({ length: fives }, (_, g) => (
                <g key={g} transform={`translate(${g * 64 + 6} 0)`}>
                  {[0, 11, 22, 33].map((x) => <line key={x} x1={x + 4} y1="6" x2={x + 4} y2="40" />)}
                  <line x1="0" y1="34" x2="46" y2="12" />
                </g>
              ))}
              {Array.from({ length: rest }, (_, i) => <line key={i} x1={fives * 64 + 10 + i * 11} y1="6" x2={fives * 64 + 10 + i * 11} y2="40" />)}
            </svg>
            <span className="w-10 shrink-0 text-right font-bold">{r.value}</span>
          </div>
        );
      })}
      <p className={`${text} text-muted`}>Four lines with a line across them make a group of 5.</p>
    </div>
  );
}

function Table({ b }: { b: ChartBlock }) {
  return (
    <table className={`w-full max-w-xl border-collapse ${text}`}>
      <thead><tr className="border-b-4 border-line text-left"><th className="p-2">Name</th><th className="p-2 text-right">How many</th></tr></thead>
      <tbody>{rowsOf(b).map((r) => <tr key={r.label} className="border-b-2 border-line/50"><td className="p-2">{r.emoji ? `${r.emoji} ` : ""}{r.label}</td><td className="p-2 text-right font-bold">{r.value}</td></tr>)}</tbody>
    </table>
  );
}

function NumberLine({ b }: { b: ChartBlock }) {
  const from = b.from ?? 0; const to = b.to ?? 10; const step = b.step ?? 1;
  const n = Math.round((to - from) / step);
  const W = 520; const L = 24; const x = (v: number) => L + ((v - from) / (to - from)) * (W - 2 * L);
  const marks = new Set(b.marks ?? []);
  return (
    <svg viewBox={`0 0 ${W} 110`} className="w-full max-w-2xl" fontFamily="inherit">
      <line x1={L - 10} x2={W - L + 10} y1="60" y2="60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      {Array.from({ length: n + 1 }, (_, i) => {
        const v = Math.round((from + i * step) * 1000) / 1000;
        const on = marks.has(v);
        return (
          <g key={i}>
            <line x1={x(v)} x2={x(v)} y1="48" y2="72" stroke="currentColor" strokeWidth="3" />
            {on && <circle cx={x(v)} cy="60" r="14" fill="var(--accent)" stroke="var(--surface-border)" strokeWidth="3" className="pop-in" />}
            <text x={x(v)} y="98" textAnchor="middle" fontSize={n > 20 ? 11 : 17} fontWeight={on ? 800 : 400} fill="currentColor">{v}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Fraction({ b }: { b: ChartBlock }) {
  const parts = b.parts ?? 2; const shaded = b.shaded ?? 0;
  const W = 520; const bar = (W - 8) / parts;
  return (
    <div className="flex flex-col gap-2">
      <svg viewBox={`0 0 ${W} 70`} className="w-full max-w-2xl">
        {Array.from({ length: parts }, (_, i) => <rect key={i} x={4 + i * bar} y="6" width={bar} height="58" fill={i < shaded ? "var(--accent)" : "transparent"} stroke="var(--surface-border)" strokeWidth="3" className={i < shaded ? "bar-fill" : ""} style={{ animationDelay: `${i * 0.1}s` }} />)}
      </svg>
      <p className={`font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold`}>{shaded}/{parts} <span className={`${text} font-normal text-muted`}>({shaded} of {parts} equal parts)</span></p>
    </div>
  );
}
