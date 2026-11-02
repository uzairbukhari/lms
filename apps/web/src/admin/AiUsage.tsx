import { useState } from "react";
import { Badge, Card, ErrorNote, Skeleton, StatTile, Tabs, useLoad } from "./ui";

export type AiUsageData = {
  days: number;
  freeNeuronsPerDay: number;
  todayNeurons: number;
  totals: { requests: number; inputTokens: number; outputTokens: number; tokens: number; characters: number; neurons: number; grossUsd: number; billableUsd: number };
  daily: { date: string; requests: number; tokens: number; characters: number; neurons: number; billableUsd: number }[];
  byKind: { kind: string; requests: number; tokens: number; characters: number; neurons: number }[];
};

const KIND_LABEL: Record<string, string> = { hint: "Quiz hints", explain: "Why was I wrong?", narration: "Lesson narration (voice)" };
const num = new Intl.NumberFormat("en");
const compact = (n: number) => (n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e4 ? `${Math.round(n / 1e3)}k` : num.format(Math.round(n)));
const usd = (n: number) => (n === 0 ? "$0.00" : n < 0.01 ? "< $0.01" : `$${n.toFixed(2)}`);

/** Daily bars. `value` picks the measure; the dashed line is the free daily allowance when measuring neurons. */
function BarChart({ days, value, label, limit }: { days: AiUsageData["daily"]; value: (d: AiUsageData["daily"][number]) => number; label: string; limit?: number }) {
  const W = 640, H = 170, L = 40, B = 22, T = 8;
  const max = Math.max(1, limit ?? 0, ...days.map(value));
  const bw = (W - L) / days.length;
  const y = (v: number) => T + (H - T - B) * (1 - v / max);
  const every = Math.ceil(days.length / 6);
  const total = days.reduce((a, d) => a + value(d), 0);
  return (
    <svg className="a-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${label} per day for the last ${days.length} days, ${num.format(Math.round(total))} in total`} style={{ width: "100%", height: "auto" }}>
      {[0, 0.5, 1].map((f) => (
        <g key={f}>
          <line x1={L} x2={W} y1={y(max * f)} y2={y(max * f)} stroke="var(--a-border)" />
          <text x={L - 6} y={y(max * f) + 4} textAnchor="end">{compact(max * f)}</text>
        </g>
      ))}
      {days.map((d, i) => {
        const v = value(d);
        const h = Math.max(v > 0 ? 2 : 0, H - B - y(v));
        return (
          <g key={d.date}>
            <rect x={L + i * bw + bw * 0.15} y={H - B - h} width={bw * 0.7} height={h} rx={2} fill="var(--a-accent)">
              <title>{`${d.date}: ${num.format(Math.round(v))} ${label.toLowerCase()}`}</title>
            </rect>
            {i % every === 0 && <text x={L + i * bw + bw / 2} y={H - 6} textAnchor="middle">{d.date.slice(5)}</text>}
          </g>
        );
      })}
      {limit !== undefined && (
        <g>
          <line x1={L} x2={W} y1={y(limit)} y2={y(limit)} stroke="var(--a-amber)" strokeDasharray="4 3" />
          <text x={W} y={y(limit) - 4} textAnchor="end" style={{ fill: "var(--a-amber)" }}>Free daily allowance</text>
        </g>
      )}
    </svg>
  );
}

export function AiUsage() {
  const [range, setRange] = useState<"7" | "30" | "90">("30");
  const { data, error, loading } = useLoad<AiUsageData>(`/api/admin/ai-usage?days=${range}`);
  const [measure, setMeasure] = useState<"tokens" | "neurons" | "requests">("tokens");
  const used = data?.todayNeurons ?? 0;
  const free = data?.freeNeuronsPerDay ?? 10_000;
  const share = Math.min(100, (used / free) * 100);
  const tone = used > free ? "red" : share >= 80 ? "amber" : "green";

  return (
    <Card
      title="AI usage"
      actions={<Tabs tabs={[{ id: "7", label: "7 days" }, { id: "30", label: "30 days" }, { id: "90", label: "90 days" }]} value={range} onChange={setRange} />}
    >
      <ErrorNote error={error} />
      {loading && !data && <Skeleton rows={4} />}
      {data && (
        <div className="a-stack" style={{ display: "grid", gap: 16 }}>
          <div>
            <div className="a-row" style={{ justifyContent: "space-between" }}>
              <strong>Today's free allowance</strong>
              <Badge tone={tone}>{num.format(used)} of {num.format(free)} neurons ({Math.round(share)}%)</Badge>
            </div>
            <div className="a-progress" role="progressbar" aria-label="Neurons used today" aria-valuemin={0} aria-valuemax={free} aria-valuenow={Math.min(used, free)} style={{ marginTop: 8 }}>
              <div style={{ width: `${share}%`, background: `var(--a-${tone === "green" ? "accent" : tone === "amber" ? "amber" : "red-solid"})` }} />
            </div>
            <p className="a-faint" style={{ margin: "6px 0 0" }}>Cloudflare includes 10,000 neurons a day for free (resets at 00:00 UTC). Only usage above that is billed.</p>
          </div>

          <div className="a-grid cols-4">
            <StatTile label={`AI tokens, ${data.days} days`} value={compact(data.totals.tokens)} hint={`${compact(data.totals.inputTokens)} in · ${compact(data.totals.outputTokens)} out`} />
            <StatTile label="AI requests" value={num.format(data.totals.requests)} hint="Cached answers are free and not counted" />
            <StatTile label="Voice characters" value={compact(data.totals.characters)} hint="Lesson narration" />
            <StatTile label="Estimated cost" value={usd(data.totals.billableUsd)} hint={`${usd(data.totals.grossUsd)} before the free allowance`} />
          </div>

          <div>
            <div className="a-row" style={{ justifyContent: "space-between", marginBottom: 6 }}>
              <strong>Per day</strong>
              <Tabs tabs={[{ id: "tokens", label: "Tokens" }, { id: "requests", label: "Requests" }, { id: "neurons", label: "Neurons" }]} value={measure} onChange={setMeasure} />
            </div>
            {measure === "tokens" && <BarChart days={data.daily} value={(d) => d.tokens} label="Tokens" />}
            {measure === "requests" && <BarChart days={data.daily} value={(d) => d.requests} label="Requests" />}
            {measure === "neurons" && <BarChart days={data.daily} value={(d) => d.neurons} label="Neurons" limit={free} />}
            <p className="a-faint" style={{ margin: "4px 0 0" }}>Tokens cover quiz hints and explanations; lesson narration is billed by characters, so it shows under Requests and Neurons. Costs are estimates from Cloudflare's published rates.</p>
          </div>

          {data.byKind.length > 0 && (
            <div className="a-table-wrap">
              <table className="a-table">
                <thead><tr><th>What it was used for</th><th className="num">Requests</th><th className="num">Tokens</th><th className="num">Characters</th><th className="num">Neurons</th></tr></thead>
                <tbody>
                  {data.byKind.map((k) => (
                    <tr key={k.kind}><td>{KIND_LABEL[k.kind] ?? k.kind}</td><td className="num">{num.format(k.requests)}</td><td className="num">{k.tokens ? num.format(k.tokens) : "–"}</td><td className="num">{k.characters ? num.format(k.characters) : "–"}</td><td className="num">{num.format(k.neurons)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {data.totals.requests === 0 && <p className="a-faint" style={{ margin: 0 }}>No AI calls recorded yet. Usage appears here once the children use hints, explanations or lesson narration.</p>}
        </div>
      )}
    </Card>
  );
}
