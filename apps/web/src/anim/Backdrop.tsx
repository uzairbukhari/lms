import type { Backdrop as BackdropName } from "@lms/schema";

// Drawn scenery for stages. Each is a few layered shapes in a 500 x 300 box that is cropped to fill the stage; the far
// layer drifts slowly (clouds, birds, stars, bubbles) and everything else stays still so it never competes with the
// thing being taught. Colours are soft so emoji and drawn props stand out on top.

const W = 500;
const H = 300;

const Clouds = ({ y = 50, fill = "#fff" }: { y?: number; fill?: string }) => (
  <g className="bd-drift" opacity="0.9">
    <g fill={fill}><ellipse cx="80" cy={y} rx="38" ry="14" /><ellipse cx="104" cy={y - 10} rx="24" ry="14" /><ellipse cx="300" cy={y + 18} rx="44" ry="14" /><ellipse cx="324" cy={y + 6} rx="26" ry="15" /><ellipse cx="450" cy={y - 6} rx="30" ry="11" /></g>
  </g>
);
const Birds = () => (
  <g className="bd-drift-fast" stroke="#55607a" strokeWidth="2" fill="none" strokeLinecap="round">
    <path d="M140 70 q6 -6 12 0 q6 -6 12 0" /><path d="M176 58 q5 -5 10 0 q5 -5 10 0" />
  </g>
);
const Sky = ({ top = "#bfe6ff", bottom = "#eaf7ff" }: { top?: string; bottom?: string }) => {
  const id = `bd-sky-${top}-${bottom}`.replace(/#/g, "");
  return (
    <>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top} /><stop offset="1" stopColor={bottom} /></linearGradient></defs>
      <rect width={W} height={H} fill={`url(#${id})`} />
    </>
  );
};
const Sun = ({ x = 430, y = 54 }: { x?: number; y?: number }) => <circle className="bd-glow" cx={x} cy={y} r="24" fill="#ffe08a" />;
const Tree = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><rect x="-5" y="-6" width="10" height="34" fill="#8b5e3c" /><circle cx="0" cy="-22" r="24" fill="#5cb85c" /><circle cx="-14" cy="-10" r="16" fill="#4caa4c" /><circle cx="14" cy="-12" r="16" fill="#66c266" /></g>
);
const Pine = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><rect x="-4" y="0" width="8" height="18" fill="#7a5233" /><path d="M0 -60 L26 0 L-26 0 Z" fill="#2f8a4e" /><path d="M0 -76 L20 -30 L-20 -30 Z" fill="#3a9d5b" /></g>
);

function Scene({ name }: { name: BackdropName }) {
  switch (name) {
    case "meadow":
      return (<><Sky /><Sun /><Clouds /><Birds /><path d="M0 200 Q120 160 250 190 T500 180 V300 H0Z" fill="#a8e08f" /><path d="M0 235 Q150 210 300 236 T500 228 V300 H0Z" fill="#8fd174" /><g fill="#ff8fb4"><circle cx="60" cy="262" r="4" /><circle cx="180" cy="250" r="4" /><circle cx="420" cy="258" r="4" /></g><g fill="#ffd166"><circle cx="110" cy="272" r="4" /><circle cx="330" cy="268" r="4" /></g></>);
    case "forest":
      return (<><Sky top="#c8ecd6" bottom="#eef9f1" /><Clouds y={40} /><Birds /><path d="M0 210 Q250 180 500 210 V300 H0Z" fill="#7fc97a" />{[30, 110, 400, 470].map((x, i) => <Pine key={x} x={x} y={206 - (i % 2) * 6} s={0.9 + (i % 2) * 0.2} />)}<Tree x={190} y={214} s={0.8} /><Tree x={330} y={212} s={0.9} /><path d="M0 250 Q250 230 500 252 V300 H0Z" fill="#6ab865" /></>);
    case "pond":
      return (<><Sky /><Sun /><Clouds /><path d="M0 170 Q250 150 500 170 V300 H0Z" fill="#9ad88a" /><ellipse cx="250" cy="236" rx="200" ry="52" fill="#6cc4e8" /><ellipse cx="250" cy="236" rx="170" ry="38" fill="#86d3f0" className="bd-shimmer" /><g fill="#4caa4c"><ellipse cx="150" cy="232" rx="16" ry="6" /><ellipse cx="350" cy="244" rx="14" ry="5" /></g><path d="M60 190 v-30 M66 190 v-36 M440 196 v-32" stroke="#3f9a3a" strokeWidth="3" /></>);
    case "sea":
      return (<><Sky top="#9fdcff" bottom="#d8f3ff" /><Sun /><Clouds /><rect y="150" width={W} height="150" fill="#3aa6dc" /><path className="bd-wave" d="M0 160 q25 -10 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 V300 H0Z" fill="#53b8e6" /><path d="M0 220 q40 -8 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 V300 H0Z" fill="#2f95cc" /><g className="bd-drift" fill="#fff" opacity="0.5"><circle cx="90" cy="250" r="3" /><circle cx="300" cy="270" r="4" /><circle cx="420" cy="240" r="3" /></g></>);
    case "desert":
      return (<><Sky top="#ffd9a0" bottom="#fff1d6" /><Sun x={400} y={60} /><path d="M0 200 Q140 150 260 196 T500 186 V300 H0Z" fill="#f4c27a" /><path d="M0 240 Q160 210 320 242 T500 236 V300 H0Z" fill="#eab063" /><g fill="#5ea35a"><rect x="80" y="196" width="10" height="44" rx="5" /><rect x="70" y="208" width="8" height="18" rx="4" /><rect x="92" y="202" width="8" height="16" rx="4" /></g></>);
    case "mountain":
      return (<><Sky /><Clouds y={60} /><Birds /><path d="M0 230 L110 90 L210 230 Z" fill="#9aa9c4" /><path d="M110 90 L135 122 L90 116 Z" fill="#fff" /><path d="M150 240 L300 60 L450 240 Z" fill="#7f90b0" /><path d="M300 60 L330 98 L272 96 Z" fill="#fff" /><path d="M0 240 Q250 210 500 240 V300 H0Z" fill="#8fd174" /></>);
    case "sky":
      return (<><Sky top="#8fd2ff" bottom="#e5f6ff" /><Sun x={90} y={70} /><Clouds y={110} /><g className="bd-drift-fast" fill="#fff" opacity="0.8"><ellipse cx="380" cy="210" rx="50" ry="16" /><ellipse cx="160" cy="250" rx="60" ry="18" /></g><Birds /></>);
    case "space":
      return (<><rect width={W} height={H} fill="#141a3d" /><g className="bd-twinkle" fill="#fff">{[[40, 40], [120, 90], [210, 30], [300, 110], [380, 50], [460, 140], [70, 200], [250, 220], [420, 250], [160, 260]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.2 : 1.4} />)}</g><circle cx="420" cy="70" r="26" fill="#ffcf6b" opacity="0.9" /><circle cx="80" cy="240" r="40" fill="#6b8cff" opacity="0.35" /><ellipse cx="80" cy="240" rx="62" ry="10" fill="none" stroke="#a9b8ff" strokeWidth="3" opacity="0.45" /></>);
    case "kitchen":
      return (<><rect width={W} height={H} fill="#fff4e6" /><rect y="0" width={W} height="40" fill="#ffe2bf" /><g fill="#fff" stroke="#f0c999" strokeWidth="2"><rect x="30" y="60" width="90" height="60" rx="6" /><rect x="380" y="60" width="90" height="60" rx="6" /></g><rect x="200" y="54" width="100" height="70" rx="6" fill="#cfeeff" stroke="#9cc9e6" strokeWidth="3" /><path d="M250 54 V124 M200 89 H300" stroke="#9cc9e6" strokeWidth="3" /><rect y="210" width={W} height="20" fill="#d9a066" /><rect y="230" width={W} height="70" fill="#f2c48d" /><g fill="#e3ad73">{[0, 1, 2, 3, 4].map((i) => <rect key={i} x={20 + i * 100} y="244" width="70" height="44" rx="4" />)}</g></>);
    case "classroom":
      return (<><rect width={W} height={H} fill="#fef7e8" /><rect x="90" y="40" width="320" height="130" rx="8" fill="#2f6b4f" stroke="#a87b4f" strokeWidth="10" /><path d="M120 80 h60 M120 104 h90 M300 90 l20 20 m0 -20 l-20 20" stroke="#fff" strokeWidth="3" opacity="0.5" strokeLinecap="round" /><rect y="230" width={W} height="70" fill="#e9c995" /><circle cx="460" cy="60" r="20" fill="#fff" stroke="#888" strokeWidth="3" /><path d="M460 60 V48 M460 60 h8" stroke="#555" strokeWidth="2.5" strokeLinecap="round" /></>);
    case "home":
      return (<><rect width={W} height={H} fill="#fdf1f4" /><rect x="40" y="50" width="120" height="90" rx="6" fill="#d4efff" stroke="#e6b8c7" strokeWidth="6" /><path d="M100 50 V140 M40 95 H160" stroke="#e6b8c7" strokeWidth="4" /><rect x="320" y="60" width="140" height="10" rx="4" fill="#c99a6b" /><g><rect x="330" y="40" width="16" height="20" fill="#7ab8ff" /><rect x="350" y="34" width="14" height="26" fill="#ff9f7a" /><rect x="368" y="42" width="18" height="18" fill="#9fdc8f" /></g><rect y="220" width={W} height="80" fill="#e7c9a5" /><ellipse cx="250" cy="262" rx="150" ry="22" fill="#d78aa6" opacity="0.6" /></>);
    case "town":
      return (<><Sky /><Clouds /><g>{[[20, 120, "#ffb4a2"], [100, 90, "#a0c4ff"], [190, 130, "#ffd6a5"], [270, 80, "#caffbf"], [360, 110, "#bdb2ff"], [430, 140, "#ffc6ff"]].map(([x, y, c], i) => <g key={i}><rect x={x as number} y={y as number} width="70" height={210 - (y as number)} fill={c as string} stroke="#9a8c98" strokeWidth="2" /><g fill="#fff">{[0, 1, 2].map((r) => <g key={r}><rect x={(x as number) + 12} y={(y as number) + 14 + r * 26} width="16" height="14" /><rect x={(x as number) + 42} y={(y as number) + 14 + r * 26} width="16" height="14" /></g>)}</g></g>)}</g><rect y="210" width={W} height="90" fill="#9a9aa8" /><path d="M0 255 H500" stroke="#fff" strokeWidth="5" strokeDasharray="26 18" /></>);
    case "farm":
      return (<><Sky /><Sun /><Clouds /><path d="M0 190 Q250 160 500 190 V300 H0Z" fill="#a8e08f" /><g transform="translate(330 120)"><rect width="110" height="80" fill="#d9534f" /><path d="M-8 0 L55 -40 L118 0 Z" fill="#b83b38" /><rect x="40" y="36" width="30" height="44" fill="#fff" /><path d="M40 36 l30 44 M70 36 l-30 44" stroke="#d9534f" strokeWidth="4" /></g><g stroke="#c99a6b" strokeWidth="5"><path d="M0 240 H300" /><path d="M20 226 v28 M80 226 v28 M140 226 v28 M200 226 v28 M260 226 v28" /></g><path d="M0 270 Q250 252 500 272 V300 H0Z" fill="#8fd174" /></>);
    case "map":
      return (<><rect width={W} height={H} fill="#cfe9f7" /><g className="bd-shimmer" fill="#bfe1f3"><circle cx="120" cy="70" r="40" /><circle cx="400" cy="230" r="50" /></g><path d="M70 120 q40 -50 110 -30 q40 20 30 70 q-20 50 -80 40 q-70 -10 -60 -80Z" fill="#b8dfa2" stroke="#8bbf74" strokeWidth="3" /><path d="M280 70 q70 -30 140 10 q40 40 0 90 q-50 40 -110 10 q-50 -40 -30 -110Z" fill="#c9e6a8" stroke="#8bbf74" strokeWidth="3" /><path d="M30 30 H470 V270 H30Z" fill="none" stroke="#a7c9de" strokeWidth="2" strokeDasharray="6 8" /><g transform="translate(450 50)"><circle r="18" fill="#fff" stroke="#7aa" /><path d="M0 -14 L5 0 L0 14 L-5 0Z" fill="#e05555" /></g></>);
    case "lab":
      return (<><rect width={W} height={H} fill="#eef3ff" /><g stroke="#c8d4f0" strokeWidth="2">{Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${i * 50} 0 V200`} />)}{Array.from({ length: 4 }, (_, i) => <path key={i} d={`M0 ${i * 50} H500`} />)}</g><rect y="200" width={W} height="24" fill="#8fa3d6" /><rect y="224" width={W} height="76" fill="#b9c7ea" /><g transform="translate(60 150)"><path d="M10 0 V20 L-6 50 H40 L24 20 V0Z" fill="#c4f1e4" stroke="#6aa" strokeWidth="2" /><circle className="bd-bubble" cx="18" cy="40" r="3" fill="#6aa" /></g><g transform="translate(420 130)"><rect width="50" height="70" rx="6" fill="#fff" stroke="#8fa3d6" strokeWidth="3" /><rect x="8" y="10" width="34" height="22" rx="3" fill="#93d8fb" /></g></>);
    default:
      // Light paper in every theme, so drawn props (which use dark ink) always read clearly.
      return (<><rect width={W} height={H} fill="#fbf7ee" /><g stroke="#efe6d2" strokeWidth="2">{Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${i * 50} 0 V300`} />)}{Array.from({ length: 6 }, (_, i) => <path key={i} d={`M0 ${i * 50} H500`} />)}</g></>);
  }
}

/** A stage's scenery, filling its parent (which must be positioned). */
export function Backdrop({ name }: { name: BackdropName }) {
  return (
    <svg className={`backdrop backdrop--${name}`} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <Scene name={name} />
      <rect width={W} height={H} className="backdrop-tint" />
    </svg>
  );
}

// --- Picking scenery from the words, for lessons written before backdrops existed ----------------------

const HINTS: [BackdropName, RegExp][] = [
  ["space", /🚀|🪐|🌌|🛰|👩‍🚀|🧑‍🚀|🌙|\b(space|planet|moon|star|astronaut|orbit|rocket|solar system)s?\b/iu],
  ["sea", /🐋|🐳|🐬|🦈|🐙|🦀|🌊|🐠|\b(sea|ocean|whale|shark|beach|wave|coral)s?\b/iu],
  ["pond", /🐸|🦆|🐟|\b(pond|river|lake|frog|duck)s?\b/iu],
  ["desert", /🐪|🏜|🌵|\b(desert|camel|cactus|sand dune)s?\b/iu],
  ["forest", /🌲|🌳|🦉|🐻|🦊|🍄|\b(forest|wood|woods|tree|owl|bear|fox)s?\b/iu],
  ["mountain", /⛰|🏔|🐐|\b(mountain|hill|peak|glacier)s?\b/iu],
  ["farm", /🐄|🐖|🐑|🐓|🚜|🌾|\b(farm|cow|sheep|hen|tractor|crop|wheat)s?\b/iu],
  ["sky", /☁|🌧|🌦|⛅|🌈|💧|🐦|🦅|\b(cloud|rain|weather|sky|evaporat|condens|bird)s?/iu],
  ["kitchen", /🍞|🥪|🍳|🥛|🍎|🍌|🥕|🍪|🍰|🍕|🥘|\b(food|kitchen|cook|recipe|sandwich|eat|fruit|vegetable)s?\b/iu],
  ["town", /🏫|🏥|🚒|🚌|🏪|🏘|🚦|\b(town|city|street|shop|road|bus|community|helper)s?\b/iu],
  ["map", /🗺|🌍|🌏|🌎|🧭|\b(map|country|countries|continent|world|compass|flag)s?\b/iu],
  ["lab", /🤖|💻|📊|📈|🧪|🔬|\b(robot|computer|data|chart|program|code|algorithm|experiment|AI)s?\b/u],
  ["home", /🏠|🛏|🧸|👪|\b(home|house|family|bedroom)s?\b/iu],
  ["meadow", /🌸|🌻|🌷|🐝|🦋|🐞|🌱|\b(plant|flower|seed|garden|insect|bee|butterfl)/iu],
];

const SUBJECT_DEFAULT: Record<string, BackdropName> = { maths: "classroom", science: "meadow", "data-ai": "lab", "general-knowledge": "map", english: "home" };

/** The best scenery for some words and emoji: the first hint that matches, else the subject's usual place. */
export function pickBackdrop(text: string, subject?: string): BackdropName {
  for (const [name, re] of HINTS) if (re.test(text)) return name;
  return (subject && SUBJECT_DEFAULT[subject]) || "plain";
}
