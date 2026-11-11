import type { PropSpec } from "@lms/schema";

// Drawn pictures with moving parts. Each is an SVG whose moving parts are CSS-transformed, so when an explainer
// changes a value between steps (the frog's number, the clock's time, the thermometer's degrees) the part glides
// there instead of jumping. All sizes are in the SVG's own units; the parent sets the width.

const INK = "#2b2d42";
const tx = (x: number, y = 0) => ({ transform: `translate(${x}px, ${y}px)` });

function NumberLine({ p }: { p: PropSpec }) {
  const from = p.from ?? 0;
  const to = p.to ?? 10;
  const span = Math.max(1, to - from);
  const step = span > 20 ? Math.ceil(span / 10) : 1;
  const xAt = (n: number) => 20 + ((n - from) / span) * 260;
  const value = Math.max(from, Math.min(to, p.value ?? from));
  const ticks: number[] = [];
  for (let n = from; n <= to; n += step) ticks.push(n);
  return (
    <svg viewBox="0 0 300 110">
      <line x1="10" y1="80" x2="290" y2="80" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M290 80 l-8 -6 v12z M10 80 l8 -6 v12z" fill={INK} />
      {ticks.map((n) => (
        <g key={n}>
          <line x1={xAt(n)} y1="72" x2={xAt(n)} y2="88" stroke={INK} strokeWidth="3" />
          <text x={xAt(n)} y="106" textAnchor="middle" fontSize="14" fontWeight="700" fill={INK} className={n === value ? "prop-hot-text" : ""}>{n}</text>
        </g>
      ))}
      <g className="prop-move" style={tx(xAt(value))}>
        <g key={value} className="prop-hop">
          <ellipse cx="0" cy="58" rx="16" ry="12" fill="#5cc04f" stroke="#2f7a2a" strokeWidth="2" />
          <circle cx="-7" cy="46" r="6" fill="#5cc04f" stroke="#2f7a2a" strokeWidth="2" /><circle cx="7" cy="46" r="6" fill="#5cc04f" stroke="#2f7a2a" strokeWidth="2" />
          <circle cx="-7" cy="45" r="3" fill="#fff" /><circle cx="7" cy="45" r="3" fill="#fff" /><circle cx="-6" cy="45" r="1.6" fill={INK} /><circle cx="8" cy="45" r="1.6" fill={INK} />
          <path d="M-6 60 q6 5 12 0" stroke="#2f7a2a" strokeWidth="2" fill="none" />
        </g>
      </g>
    </svg>
  );
}

function TenFrame({ p }: { p: PropSpec }) {
  const n = Math.max(0, Math.min(10, Math.round(p.value ?? 0)));
  return (
    <svg viewBox="0 0 260 112">
      <rect x="5" y="5" width="250" height="102" rx="8" fill="#fff" stroke={INK} strokeWidth="4" />
      {Array.from({ length: 10 }, (_, i) => {
        const x = 5 + (i % 5) * 50; const y = 5 + Math.floor(i / 5) * 51;
        return (
          <g key={i}>
            <rect x={x} y={y} width="50" height="51" fill="none" stroke={INK} strokeWidth="2" />
            <circle cx={x + 25} cy={y + 25.5} r="17" fill={i < 5 ? "#ff6b6b" : "#4d96ff"} className="prop-pop" style={{ transform: `scale(${i < n ? 1 : 0})`, transformOrigin: `${x + 25}px ${y + 25.5}px`, transitionDelay: `${i * 0.06}s` }} />
          </g>
        );
      })}
    </svg>
  );
}

function BaseTen({ p }: { p: PropSpec }) {
  const tens = p.tens ?? 0; const ones = p.ones ?? 0;
  const total = tens * 10 + ones;
  const words = [tens > 0 ? `${tens} ${tens === 1 ? "ten" : "tens"}` : "", ones > 0 ? `${ones} ${ones === 1 ? "one" : "ones"}` : ""].filter(Boolean).join(" and ");
  return (
    <svg viewBox="0 0 300 206">
      <rect x="2" y="2" width="296" height="202" rx="16" fill="#fffaf0" stroke="#d9c8a3" strokeWidth="3" />
      <rect x="10" y="10" width="170" height="32" rx="10" fill="#dbe9ff" /><rect x="190" y="10" width="100" height="32" rx="10" fill="#fff0c2" />
      <text x="95" y="33" textAnchor="middle" fontSize="20" fontWeight="800" fill="#1f5fbf">Tens</text>
      <text x="240" y="33" textAnchor="middle" fontSize="20" fontWeight="800" fill="#a87800">Ones</text>
      <line x1="185" y1="50" x2="185" y2="160" stroke="#d9c8a3" strokeWidth="2" strokeDasharray="5 5" />
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i} className="prop-pop" style={{ transform: `scale(${i < tens ? 1 : 0})`, transformOrigin: `${19 + i * 18}px 105px`, transitionDelay: `${i * 0.07}s` }}>
          <rect x={12 + i * 18} y="50" width="15" height="110" rx="4" fill="#4d96ff" stroke="#1f5fbf" strokeWidth="2" />
          {Array.from({ length: 9 }, (_, j) => <line key={j} x1={12 + i * 18} x2={27 + i * 18} y1={61 + j * 11} y2={61 + j * 11} stroke="#bcd7ff" strokeWidth="1.5" />)}
        </g>
      ))}
      {Array.from({ length: 9 }, (_, i) => {
        const cx = 203 + (i % 3) * 30; const cy = 56 + Math.floor(i / 3) * 34;
        return <rect key={i} x={cx} y={cy} width="24" height="24" rx="5" fill="#ffc83d" stroke="#c99500" strokeWidth="2" className="prop-pop" style={{ transform: `scale(${i < ones ? 1 : 0})`, transformOrigin: `${cx + 12}px ${cy + 12}px`, transitionDelay: `${0.25 + i * 0.07}s` }} />;
      })}
      {total > 0 && <text x="150" y="192" textAnchor="middle" fontSize="19" fontWeight="800" fill={INK}>{words} = <tspan fill="#d6336c" fontSize="24">{total}</tspan></text>}
    </svg>
  );
}

function Coin({ p }: { p: PropSpec }) {
  const face = p.highlight ?? "1p";
  const pound = face.startsWith("£");
  const copper = /^[12]p$/.test(face);
  const [rim, fill, edge] = copper ? ["#b4683a", "#d98a56", "#8a4a22"] : pound ? ["#d9a920", "#e9ecef", "#9a7a10"] : ["#a7adb5", "#dfe3e8", "#6f7680"];
  const size = face.length > 3 ? 30 : face.length > 2 ? 40 : 52;
  return (
    <svg viewBox="0 0 120 120">
      <circle cx="60" cy="62" r="54" fill={edge} opacity="0.35" />
      <circle cx="60" cy="58" r="54" fill={rim} stroke={edge} strokeWidth="3" />
      <circle cx="60" cy="58" r="42" fill={fill} stroke={edge} strokeWidth="2" />
      <text x="60" y="58" textAnchor="middle" dominantBaseline="central" fontSize={size} fontWeight="800" fill="#3a3f47">{face}</text>
    </svg>
  );
}

function Pizza({ p }: { p: PropSpec }) {
  const parts = Math.max(1, p.parts ?? 4); const shaded = Math.min(parts, p.shaded ?? 1);
  const r = 70; const c = 80;
  const pt = (a: number) => [c + r * Math.sin(a), c - r * Math.cos(a)] as const;
  return (
    <svg viewBox="0 0 160 160">
      <circle cx={c} cy={c} r={r + 6} fill="#e0a458" />
      {Array.from({ length: parts }, (_, i) => {
        const a0 = (i / parts) * Math.PI * 2; const a1 = ((i + 1) / parts) * Math.PI * 2;
        const [x0, y0] = pt(a0); const [x1, y1] = pt(a1); const mid = (a0 + a1) / 2;
        const d = parts === 1 ? `M${c} ${c - r} A${r} ${r} 0 1 1 ${c - 0.01} ${c - r}Z` : `M${c} ${c} L${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1} ${y1}Z`;
        const on = i < shaded;
        return (
          <g key={i} className="prop-slice" style={{ transform: on ? `translate(${Math.sin(mid) * 6}px, ${-Math.cos(mid) * 6}px)` : "none" }}>
            <path d={d} fill={on ? "#ffcf56" : "#fff3d6"} stroke="#c97c00" strokeWidth="2.5" />
            {on && <circle cx={c + Math.sin(mid) * r * 0.6} cy={c - Math.cos(mid) * r * 0.6} r="7" fill="#d64545" />}
          </g>
        );
      })}
    </svg>
  );
}

function FractionBar({ p }: { p: PropSpec }) {
  const parts = Math.max(1, p.parts ?? 4); const shaded = Math.min(parts, p.shaded ?? 1);
  const w = 280 / parts;
  return (
    <svg viewBox="0 0 300 70">
      {Array.from({ length: parts }, (_, i) => (
        <rect key={i} x={10 + i * w} y="10" width={w} height="50" fill={i < shaded ? "#4d96ff" : "#fff"} stroke={INK} strokeWidth="3" className="prop-fill" style={{ transitionDelay: `${i * 0.08}s` }} />
      ))}
    </svg>
  );
}

function Clock({ p }: { p: PropSpec }) {
  const h = (p.hour ?? 3) % 12; const m = p.minute ?? 0;
  return (
    <svg viewBox="0 0 160 160">
      <circle cx="80" cy="80" r="72" fill="#fff" stroke={INK} strokeWidth="6" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i + 1) / 12) * Math.PI * 2;
        return <text key={i} x={80 + Math.sin(a) * 56} y={86 - Math.cos(a) * 56} textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>{i + 1}</text>;
      })}
      <g className="prop-turn" style={{ transform: `rotate(${(h + m / 60) * 30}deg)`, transformOrigin: "80px 80px" }}><line x1="80" y1="80" x2="80" y2="42" stroke={INK} strokeWidth="7" strokeLinecap="round" /></g>
      <g className="prop-turn" style={{ transform: `rotate(${m * 6}deg)`, transformOrigin: "80px 80px" }}><line x1="80" y1="80" x2="80" y2="24" stroke="#d64545" strokeWidth="4" strokeLinecap="round" /></g>
      <circle cx="80" cy="80" r="6" fill={INK} />
    </svg>
  );
}

function Thermometer({ p }: { p: PropSpec }) {
  const from = p.from ?? -10; const to = p.to ?? 50; const v = Math.max(from, Math.min(to, p.value ?? 20));
  const k = (v - from) / (to - from);
  const hot = v >= 25; const cold = v <= 5;
  return (
    <svg viewBox="0 0 90 200">
      <rect x="30" y="10" width="30" height="150" rx="15" fill="#fff" stroke={INK} strokeWidth="4" />
      <rect x="38" y="20" width="14" height="140" rx="7" fill={hot ? "#ff5a5a" : cold ? "#4d96ff" : "#ff9f43"} className="prop-grow-y" style={{ transform: `scaleY(${Math.max(0.04, k)})`, transformOrigin: "45px 160px" }} />
      <circle cx="45" cy="170" r="22" fill={hot ? "#ff5a5a" : cold ? "#4d96ff" : "#ff9f43"} stroke={INK} strokeWidth="4" />
      {[0, 0.25, 0.5, 0.75, 1].map((t) => <g key={t}><line x1="62" y1={156 - t * 136} x2="72" y2={156 - t * 136} stroke={INK} strokeWidth="2" /><text x="74" y={160 - t * 136} fontSize="10" fontWeight="700" fill={INK}>{Math.round(from + t * (to - from))}</text></g>)}
      <text x="45" y="175" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">{Math.round(v)}°</text>
    </svg>
  );
}

function Balance({ p }: { p: PropSpec }) {
  const l = p.left ?? 1; const r = p.right ?? 1;
  const tilt = Math.max(-18, Math.min(18, (r - l) * 4));
  return (
    <svg viewBox="0 0 240 170">
      <path d="M120 60 L100 160 H140 Z" fill="#c99a6b" stroke="#8b5e3c" strokeWidth="3" />
      <g className="prop-turn" style={{ transform: `rotate(${tilt}deg)`, transformOrigin: "120px 60px" }}>
        <rect x="20" y="55" width="200" height="10" rx="5" fill="#8b5e3c" />
        {[{ x: 30, n: l }, { x: 210, n: r }].map(({ x, n }) => (
          <g key={x} className="prop-turn" style={{ transform: `rotate(${-tilt}deg)`, transformOrigin: `${x}px 60px` }}>
            <line x1={x} y1="60" x2={x - 22} y2="104" stroke={INK} strokeWidth="2" /><line x1={x} y1="60" x2={x + 22} y2="104" stroke={INK} strokeWidth="2" />
            <path d={`M${x - 30} 104 H${x + 30} Q${x} 124 ${x - 30} 104Z`} fill="#ffd166" stroke="#c99500" strokeWidth="2.5" />
            <text x={x} y="98" textAnchor="middle" fontSize="18" fontWeight="800" fill={INK}>{n}</text>
          </g>
        ))}
      </g>
      <circle cx="120" cy="60" r="7" fill={INK} />
    </svg>
  );
}

const hot = (on: boolean) => (on ? "prop-highlight" : "");

function Plant({ p }: { p: PropSpec }) {
  const h = (p.highlight ?? "").toLowerCase();
  return (
    <svg viewBox="0 0 160 200">
      <rect x="0" y="130" width="160" height="70" fill="#b98552" />
      <g className={hot(h.startsWith("root"))} stroke="#7a4f2a" strokeWidth="3" fill="none" strokeLinecap="round"><path d="M80 130 v30 M80 145 q-20 10 -30 30 M80 150 q18 8 28 28 M80 160 q-6 14 -2 30" /></g>
      <g className={hot(h.startsWith("stem"))}><path d="M80 130 V60" stroke="#3f9a3a" strokeWidth="7" strokeLinecap="round" /></g>
      <g className={hot(h.startsWith("lea"))} fill="#5cc04f" stroke="#3f9a3a" strokeWidth="2"><path d="M80 105 q-34 -6 -44 -28 q30 -2 44 28" /><path d="M80 90 q34 -6 44 -28 q-30 -2 -44 28" /></g>
      <g className={hot(h.startsWith("flower") || h.startsWith("petal"))}>{[0, 60, 120, 180, 240, 300].map((a) => <ellipse key={a} cx="80" cy="30" rx="10" ry="18" fill="#ff8fb4" stroke="#e0507f" strokeWidth="2" transform={`rotate(${a} 80 46)`} />)}<circle cx="80" cy="46" r="11" fill="#ffd166" stroke="#e8a500" strokeWidth="2" /></g>
    </svg>
  );
}

function Body({ p }: { p: PropSpec }) {
  const h = (p.highlight ?? "").toLowerCase();
  return (
    <svg viewBox="0 0 140 220">
      <g fill="#ffe0c7" stroke="#c98d6b" strokeWidth="3"><circle cx="70" cy="30" r="24" /><rect x="40" y="56" width="60" height="90" rx="22" /><rect x="14" y="62" width="20" height="78" rx="10" /><rect x="106" y="62" width="20" height="78" rx="10" /><rect x="44" y="136" width="22" height="78" rx="10" /><rect x="74" y="136" width="22" height="78" rx="10" /></g>
      <g className={hot(h.startsWith("brain"))}><path d="M54 24 q0 -14 16 -14 q16 0 16 14 q0 10 -16 10 q-16 0 -16 -10z" fill="#ffb3c6" stroke="#d6708c" strokeWidth="2" /></g>
      <g className={hot(h.startsWith("lung"))} fill="#ff9f9f" stroke="#d65f5f" strokeWidth="2"><ellipse cx="57" cy="84" rx="10" ry="18" /><ellipse cx="83" cy="84" rx="10" ry="18" /></g>
      <g className={hot(h.startsWith("heart"))}><path d="M70 98 l-9 -9 a5.5 5.5 0 0 1 9 -6 a5.5 5.5 0 0 1 9 6z" fill="#e63946" className={h.startsWith("heart") ? "prop-beat" : ""} /></g>
      <g className={hot(h.startsWith("stomach"))}><path d="M64 110 q18 -6 18 10 q0 14 -16 12 q-8 -2 -6 -10z" fill="#ffc285" stroke="#d68a3d" strokeWidth="2" /></g>
      <g className={hot(h.startsWith("bone") || h.startsWith("skeleton"))} stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity={h.startsWith("bone") || h.startsWith("skeleton") ? 1 : 0}><path d="M24 70 v60 M116 70 v60 M55 145 v62 M85 145 v62" /></g>
      <g className={hot(h.startsWith("muscle"))} fill="#ff7b7b" opacity={h.startsWith("muscle") ? 0.8 : 0}><ellipse cx="24" cy="84" rx="7" ry="14" /><ellipse cx="116" cy="84" rx="7" ry="14" /></g>
    </svg>
  );
}

function Globe() {
  return (
    <svg viewBox="0 0 160 160">
      <defs><clipPath id="prop-globe"><circle cx="80" cy="80" r="66" /></clipPath></defs>
      <circle cx="80" cy="80" r="66" fill="#5ab4f0" />
      <g clipPath="url(#prop-globe)"><g className="prop-spin-x">{[0, 200].map((o) => <g key={o} transform={`translate(${o} 0)`} fill="#6cc46a"><path d="M20 50 q20 -24 46 -10 q10 18 -6 30 q-20 10 -30 -4z" /><path d="M70 92 q18 -10 30 6 q6 24 -12 34 q-16 -6 -18 -40z" /><path d="M120 40 q30 -10 50 10 q10 20 -14 30 q-28 0 -36 -40z" /><path d="M150 110 q16 -6 24 8 q-4 14 -20 10z" /></g>)}</g></g>
      <circle cx="80" cy="80" r="66" fill="none" stroke="#1f6fa8" strokeWidth="4" />
      <ellipse cx="58" cy="52" rx="16" ry="9" fill="#fff" opacity="0.3" />
    </svg>
  );
}

function SunEarth({ p }: { p: PropSpec }) {
  const hour = p.value ?? 12;
  return (
    <svg viewBox="0 0 300 160">
      <circle cx="40" cy="80" r="34" fill="#ffd166" className="bd-glow" />
      <g stroke="#ffd166" strokeWidth="4" strokeLinecap="round" opacity="0.7"><path d="M84 80 h40 M80 56 l34 -12 M80 104 l34 12" /></g>
      <defs><clipPath id="prop-earth"><circle cx="210" cy="80" r="60" /></clipPath></defs>
      <g className="prop-turn" style={{ transform: `rotate(${(hour - 12) * 15}deg)`, transformOrigin: "210px 80px" }}>
        <circle cx="210" cy="80" r="60" fill="#5ab4f0" />
        <g fill="#6cc46a"><path d="M170 60 q20 -20 40 -6 q6 18 -10 26 q-20 4 -30 -20z" /><path d="M214 96 q24 -6 30 14 q-6 18 -24 14 q-10 -10 -6 -28z" /></g>
        <g transform="translate(150 80)"><path d="M0 -8 l8 -7 l8 7 v10 h-16z" fill="#fff" stroke="#333" strokeWidth="1.5" transform="rotate(-90)" /></g>
      </g>
      <path d="M210 20 A60 60 0 0 1 210 140 Z" fill="#0b1640" opacity="0.55" clipPath="url(#prop-earth)" />
      <circle cx="210" cy="80" r="60" fill="none" stroke="#1f6fa8" strokeWidth="3" />
    </svg>
  );
}

function RobotGrid({ p }: { p: PropSpec }) {
  const n = 5; const s = 36;
  const col = Math.min(n - 1, p.col ?? 0); const row = Math.min(n - 1, p.row ?? 0);
  const rot = { up: 0, right: 90, down: 180, left: 270 }[p.facing ?? "right"];
  return (
    <svg viewBox={`0 0 ${n * s + 8} ${n * s + 8}`}>
      {Array.from({ length: n * n }, (_, i) => <rect key={i} x={4 + (i % n) * s} y={4 + Math.floor(i / n) * s} width={s} height={s} fill={(i + Math.floor(i / n)) % 2 ? "#eef3ff" : "#fff"} stroke="#9aa7c7" strokeWidth="1.5" />)}
      <g transform={`translate(${4 + (n - 1) * s + s / 2} ${4 + (n - 1) * s + s / 2})`}><text textAnchor="middle" y="7" fontSize="20">⭐</text></g>
      <g className="prop-move" style={tx(4 + col * s + s / 2, 4 + row * s + s / 2)}>
        <g className="prop-turn" style={{ transform: `rotate(${rot}deg)` }}>
          <rect x="-13" y="-13" width="26" height="26" rx="6" fill="#c9d3ea" stroke="#6b7aa3" strokeWidth="2.5" />
          <circle cx="-5" cy="-2" r="3" fill="#1d2550" /><circle cx="5" cy="-2" r="3" fill="#1d2550" />
          <path d="M0 -20 l6 7 h-12z" fill="#ff6b6b" />
        </g>
      </g>
    </svg>
  );
}

function SortingBoxes({ p }: { p: PropSpec }) {
  const labels = p.labels?.length ? p.labels : ["Group 1", "Group 2"];
  const w = 300 / labels.length;
  const colours = ["#ffd6a5", "#a0c4ff", "#caffbf"];
  return (
    <svg viewBox="0 0 310 130">
      {labels.map((l, i) => (
        <g key={i}>
          <path d={`M${8 + i * w} 40 h${w - 12} l-8 84 h${-(w - 28)} z`} fill={colours[i % 3]} stroke={INK} strokeWidth="3" />
          <text x={8 + i * w + (w - 12) / 2} y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>{l}</text>
        </g>
      ))}
    </svg>
  );
}

function Venn({ p }: { p: PropSpec }) {
  const [a = "A", b = "B"] = p.labels ?? [];
  return (
    <svg viewBox="0 0 300 170">
      <circle cx="115" cy="95" r="70" fill="#ff8fb4" opacity="0.45" stroke="#e0507f" strokeWidth="3" />
      <circle cx="185" cy="95" r="70" fill="#7ab8ff" opacity="0.45" stroke="#2f7fd6" strokeWidth="3" />
      <text x="85" y="18" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>{a}</text>
      <text x="215" y="18" textAnchor="middle" fontSize="15" fontWeight="800" fill={INK}>{b}</text>
      <text x="150" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill={INK}>both</text>
    </svg>
  );
}

const DRAW: Record<PropSpec["kind"], (x: { p: PropSpec }) => React.JSX.Element> = {
  number_line: NumberLine, ten_frame: TenFrame, base_ten: BaseTen, fraction_pizza: Pizza, fraction_bar: FractionBar, clock: Clock,
  thermometer: Thermometer, balance: Balance, plant: Plant, body: Body, globe: Globe, sun_earth: SunEarth, robot_grid: RobotGrid,
  sorting_boxes: SortingBoxes, venn: Venn, coin: Coin,
};

/** Widths (in % of the stage) for sizes 1 to 3. Wide props get more room. */
const WIDE = new Set(["number_line", "ten_frame", "base_ten", "fraction_bar", "sun_earth", "sorting_boxes", "venn", "balance"]);
export function propWidth(kind: PropSpec["kind"], size: number): number {
  const base = kind === "base_ten" ? [0, 40, 46, 62] : WIDE.has(kind) ? [0, 34, 52, 72] : [0, 18, 28, 40];
  return base[size] ?? base[2]!;
}

export function Prop({ spec }: { spec: PropSpec }) {
  const Draw = DRAW[spec.kind];
  return <span className={`prop prop--${spec.kind}`}><Draw p={spec} /></span>;
}

/** Words for screen readers and narration-free previews. */
export function propReadout(p: PropSpec): string {
  switch (p.kind) {
    case "number_line": return `A number line from ${p.from ?? 0} to ${p.to ?? 10}, the frog is on ${p.value ?? p.from ?? 0}.`;
    case "ten_frame": return `A ten frame with ${p.value ?? 0} counters.`;
    case "base_ten": return `${p.tens ?? 0} tens and ${p.ones ?? 0} ones.`;
    case "fraction_pizza": case "fraction_bar": return `${p.shaded ?? 1} out of ${p.parts ?? 4} equal parts.`;
    case "clock": return `A clock showing ${(p.hour ?? 3) % 12 || 12}:${String(p.minute ?? 0).padStart(2, "0")}.`;
    case "thermometer": return `A thermometer showing ${p.value ?? 20} degrees.`;
    case "balance": return `A balance with ${p.left ?? 1} on the left and ${p.right ?? 1} on the right.`;
    case "coin": return `A coin: ${p.highlight ?? "1p"}.`;
    case "plant": return `A plant${p.highlight ? `, showing the ${p.highlight}` : ""}.`;
    case "body": return `A body${p.highlight ? `, showing the ${p.highlight}` : ""}.`;
    case "globe": return "A spinning globe.";
    case "sun_earth": return "The Sun shining on the Earth.";
    case "robot_grid": return `A robot on a grid, facing ${p.facing ?? "right"}.`;
    case "sorting_boxes": return `Sorting boxes: ${(p.labels ?? []).join(", ")}.`;
    case "venn": return `A Venn diagram: ${(p.labels ?? []).join(" and ")}.`;
  }
}
