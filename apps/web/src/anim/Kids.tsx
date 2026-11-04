// The three children of the splash screen, drawn as original SVG puppets. Each has named parts (k-body, k-arm-l,
// k-arm-r, k-eyes, k-mouth) that splash.css animates. They are decorative only: aria-hidden, never carry information.

export type Kid = "curly" | "long" | "boy";

const SKIN: Record<Kid, string> = { curly: "#d9a07a", long: "#d9a07a", boy: "#e3ae88" };
const HAIR: Record<Kid, string> = { curly: "#3a2418", long: "#241714", boy: "#4a3020" };
const STRIPES = ["#f6c6d8", "#c9e4f7", "#d4f0c8", "#fbe6a8", "#e3d2f5"];
const DENIM = "#5f86b3";
const DENIM_DARK = "#46688f";

function Top({ y, h, x, w }: { y: number; h: number; x: number; w: number }) {
  const bands = Math.floor(h / 6);
  return (
    <g>
      {Array.from({ length: bands }, (_, i) => (
        <rect key={i} x={x} y={y + i * 6} width={w} height={6.2} fill={STRIPES[i % STRIPES.length]} />
      ))}
    </g>
  );
}

function Arm({ side, skin, kid }: { side: "l" | "r"; skin: string; kid: Kid }) {
  const left = side === "l";
  const sx = left ? 34 : 66;
  const dir = left ? -1 : 1;
  const len = kid === "boy" ? 22 : 26;
  return (
    <g className={`k-arm-${side}`} style={{ transformOrigin: `${sx}px 78px`, transformBox: "view-box" }}>
      <rect x={sx + (left ? -9 : -1)} y="76" width="10" height={len} rx="5" fill="#a9d3f2" stroke="#7fb0d6" strokeWidth="1.2" />
      <rect x={sx + (left ? -9 : -1)} y="76" width="10" height="10" rx="5" fill={STRIPES[0]} stroke="#e08fb0" strokeWidth="1.2" />
      <circle cx={sx + dir * 4 + (left ? 0 : 0)} cy={76 + len} r="6" fill={skin} />
    </g>
  );
}

function Hair({ kid }: { kid: Kid }) {
  const c = HAIR[kid];
  if (kid === "curly") {
    const puffs: Array<[number, number, number]> = [
      [27, 40, 11], [36, 28, 12], [50, 24, 13], [64, 28, 12], [73, 40, 11], [24, 54, 9], [76, 54, 9], [32, 62, 8], [68, 62, 8],
    ];
    return <g fill={c}>{puffs.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>;
  }
  if (kid === "long") {
    return (
      <g fill={c}>
        <path d="M24 56 C20 30 36 18 50 18 C66 18 80 30 76 56 L80 98 C80 104 72 104 70 98 L68 66 L32 66 L30 98 C28 104 20 104 20 98 Z" />
      </g>
    );
  }
  // boy: short hair showing under a cap
  return <path d="M28 48 C28 36 38 30 50 30 C62 30 72 36 72 48 L72 52 L28 52 Z" fill={c} />;
}

function Cap() {
  return (
    <g>
      <path d="M27 46 C27 28 38 22 50 22 C62 22 73 28 73 46 Z" fill="#e8cca6" stroke="#c9a876" strokeWidth="1.5" />
      <path d="M50 22 L50 46" stroke="#c9a876" strokeWidth="1.2" />
      <path d="M26 46 L8 50 C6 51 7 54 10 54 L40 50 Z" fill="#d9b98c" stroke="#c9a876" strokeWidth="1.2" />
      <circle cx="50" cy="21" r="2.4" fill="#c9a876" />
    </g>
  );
}

function Glasses() {
  return (
    <g fill="none" stroke="#2a2420" strokeWidth="2.2">
      <circle cx="39" cy="52" r="8.5" fill="#ffffff" fillOpacity="0.35" />
      <circle cx="61" cy="52" r="8.5" fill="#ffffff" fillOpacity="0.35" />
      <path d="M47.5 52 L52.5 52" />
      <path d="M30.5 51 L26 49" /><path d="M69.5 51 L74 49" />
    </g>
  );
}

function Face({ kid }: { kid: Kid }) {
  return (
    <g>
      <g className="k-eyes">
        <circle cx="39" cy="53" r="3.4" fill="#2a1d18" /><circle cx="61" cy="53" r="3.4" fill="#2a1d18" />
        <circle cx="40.2" cy="51.8" r="1.1" fill="#fff" /><circle cx="62.2" cy="51.8" r="1.1" fill="#fff" />
      </g>
      <circle cx="32" cy="64" r="4.6" fill="#f08a8a" opacity="0.45" /><circle cx="68" cy="64" r="4.6" fill="#f08a8a" opacity="0.45" />
      <g className="k-mouth" style={{ transformOrigin: "50px 68px" }}>
        {kid === "boy" ? (
          <path d="M44 67 Q50 74 56 67 Q50 70 44 67 Z" fill="#8c3b3b" stroke="#8c3b3b" strokeWidth="1.6" strokeLinejoin="round" />
        ) : (
          <path d="M42 66 Q50 78 58 66 Z" fill="#8c3b3b" stroke="#8c3b3b" strokeWidth="1.6" strokeLinejoin="round" />
        )}
      </g>
    </g>
  );
}

export function KidPuppet({ kid, className = "" }: { kid: Kid; className?: string }) {
  const skin = SKIN[kid];
  return (
    <svg viewBox="0 0 100 170" className={`kid kid-${kid} ${className}`} aria-hidden="true">
      <ellipse cx="50" cy="165" rx="26" ry="4" fill="#000" opacity="0.16" className="k-shadow" />
      <g className="k-body">
        {/* legs and shoes */}
        <g className="k-legs">
          <rect x="36" y="118" width="12" height={38} rx="5" fill={DENIM} />
          <rect x="52" y="118" width="12" height={38} rx="5" fill={DENIM} />
          <rect x="33" y={154} width="17" height="9" rx="4.5" fill={kid === "boy" ? "#c98f3c" : kid === "long" ? "#e87a5a" : "#f4f1ea"} stroke="#7a5a3a" strokeWidth="1" />
          <rect x="50" y={154} width="17" height="9" rx="4.5" fill={kid === "boy" ? "#c98f3c" : kid === "long" ? "#e87a5a" : "#f4f1ea"} stroke="#7a5a3a" strokeWidth="1" />
        </g>
        {/* striped top, then the dungaree bib over it */}
        <rect x="32" y="74" width="36" height="46" rx="10" fill="#fff" />
        <Top x={32} y={74} w={36} h={42} />
        <path d="M34 98 L66 98 L68 128 C68 132 64 134 60 134 L40 134 C36 134 32 132 32 128 Z" fill={DENIM} stroke={DENIM_DARK} strokeWidth="1.5" />
        <rect x="40" y="94" width="20" height="14" rx="3" fill={DENIM_DARK} opacity="0.5" />
        <rect x="38" y="76" width="5" height="22" rx="2" fill={DENIM} /><rect x="57" y="76" width="5" height="22" rx="2" fill={DENIM} />
        <circle cx="40.5" cy="98" r="2" fill="#e8c86a" /><circle cx="59.5" cy="98" r="2" fill="#e8c86a" />
        <Arm side="l" skin={skin} kid={kid} />
        <Arm side="r" skin={skin} kid={kid} />
        {/* head */}
        <g className="k-head">
          {kid !== "boy" && <Hair kid={kid} />}
          <rect x="44" y="68" width="12" height="9" rx="4" fill={skin} />
          <ellipse cx="50" cy="52" rx="24" ry="24" fill={skin} />
          {kid === "boy" && <Hair kid={kid} />}
          {kid === "curly" && <path d="M30 40 C34 30 44 28 50 30 C58 28 68 32 70 40 C62 36 54 36 50 38 C44 36 36 36 30 40 Z" fill={HAIR.curly} />}
          {kid === "long" && <path d="M27 50 C28 34 38 28 50 28 C62 28 72 34 73 50 C66 40 58 38 50 38 C42 38 34 40 27 50 Z" fill={HAIR.long} />}
          <ellipse cx="26.5" cy="55" rx="3" ry="4.5" fill={skin} /><ellipse cx="73.5" cy="55" rx="3" ry="4.5" fill={skin} />
          <Face kid={kid} />
          {kid !== "boy" && <Glasses />}
          {kid === "boy" && <Cap />}
        </g>
      </g>
    </svg>
  );
}
