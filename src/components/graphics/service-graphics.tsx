import { cn } from "@/lib/utils";
import { NodeLabel, Plane } from "./primitives";

type GraphicProps = { className?: string };

function Box({ x, y, w = 128, h = 52, lines, dark }: { x: number; y: number; w?: number; h?: number; lines: string[]; dark?: boolean }) {
  const cx = x + w / 2;
  const startY = y + h / 2 - (lines.length - 1) * 8 + 5;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" className={dark ? "fill-ink" : "fill-surface stroke-ink"} strokeWidth="1.5" />
      {lines.map((line, i) => (
        <NodeLabel key={line} x={cx} y={startY + i * 16} className={dark ? "fill-night-text" : undefined}>
          {line}
        </NodeLabel>
      ))}
    </g>
  );
}

function Arrow({ d, head }: { d: string; head: [number, number, "right" | "down" | "left" | "up"] }) {
  const [x, y, dir] = head;
  const heads = {
    right: `M${x - 7} ${y - 4} L${x} ${y} L${x - 7} ${y + 4}`,
    left: `M${x + 7} ${y - 4} L${x} ${y} L${x + 7} ${y + 4}`,
    down: `M${x - 4} ${y - 7} L${x} ${y} L${x + 4} ${y - 7}`,
    up: `M${x - 4} ${y + 7} L${x} ${y} L${x + 4} ${y + 7}`,
  };
  return (
    <g fill="none" className="stroke-ink" strokeWidth="1.5" strokeLinejoin="round">
      <path d={d} />
      <path d={heads[dir]} />
    </g>
  );
}

/** AI Governance: intake → risk decision → proportionate controls → accountable sign-off → monitoring. */
export function AiGovernanceGraphic({ className }: GraphicProps) {
  return (
    <svg viewBox="0 0 520 420" role="img" aria-labelledby="aig-title aig-desc" className={cn("h-auto w-full", className)}>
      <title id="aig-title">AI governance review flow</title>
      <desc id="aig-desc">
        A proposed AI use case enters intake and reaches a risk-tier decision. Lower-risk uses follow standard controls.
        Higher-risk uses go to human review and an accountable owner signs off. All approved uses are monitored,
        documented and periodically re-assessed.
      </desc>
      <Box x={40} y={56} lines={["Use case", "intake"]} />
      <Arrow d="M168 82 H226" head={[226, 82, "right"]} />
      <rect x="239" y="61" width="42" height="42" rx="4" transform="rotate(45 260 82)" className="fill-ink" />
      <circle cx="260" cy="82" r="6" className="fill-logo-red" />
      <NodeLabel x={260} y={38}>
        Risk tier?
      </NodeLabel>
      <Arrow d="M292 82 H348" head={[348, 82, "right"]} />
      <text x="320" y="72" textAnchor="middle" className="fill-muted font-mono text-[12px] tracking-[0.06em]">
        LOWER
      </text>
      <Box x={352} y={56} lines={["Standard", "controls"]} />
      <Arrow d="M260 114 V164" head={[260, 164, "down"]} />
      <text x="270" y="144" className="fill-muted font-mono text-[12px] tracking-[0.06em]">
        HIGHER
      </text>
      <Box x={196} y={168} lines={["Human", "review"]} />
      <Arrow d="M260 220 V248" head={[260, 248, "down"]} />
      <Box x={196} y={252} lines={["Owner", "sign-off"]} />
      <circle cx="312" cy="264" r="7" className="fill-surface stroke-ink" strokeWidth="1.25" />
      <path d="M308.5 264 L311 266.5 L315.5 261.5" fill="none" className="stroke-signal" strokeWidth="1.5" strokeLinecap="round" />
      <Arrow d="M260 304 V336" head={[260, 336, "down"]} />
      <Arrow d="M416 108 V336" head={[416, 336, "down"]} />
      <Box x={40} y={340} w={440} h={52} lines={["Monitor · document · re-assess"]} dark />
      <g fill="none" className="stroke-line-strong" strokeWidth="1.5" strokeDasharray="4 5">
        <path d="M40 366 H22 V82 H36" />
      </g>
      <path d="M30 78 L37 82 L30 86" fill="none" className="stroke-line-strong" strokeWidth="1.5" />
    </svg>
  );
}

/** Adobe Services: a customer journey above the platform capabilities that power it. */
export function AdobeGraphic({ className }: GraphicProps) {
  const journey = "M80 120 C140 120 140 80 200 80 S260 130 320 130 S380 84 440 84";
  const stages = [
    { x: 80, y: 120, label: "Discover" },
    { x: 200, y: 80, label: "Engage" },
    { x: 320, y: 130, label: "Convert" },
    { x: 440, y: 84, label: "Retain" },
  ];
  const tiles = [
    { label: "Profile", x: 60, y: 262, hub: true },
    { label: "Content", x: 196, y: 262 },
    { label: "Analytics", x: 332, y: 262 },
    { label: "Testing", x: 60, y: 326 },
    { label: "Automation", x: 196, y: 326 },
    { label: "Commerce", x: 332, y: 326 },
  ];
  return (
    <svg viewBox="0 0 520 420" role="img" aria-labelledby="adobe-title adobe-desc" className={cn("h-auto w-full", className)}>
      <title id="adobe-title">Customer journey supported by connected platform capabilities</title>
      <desc id="adobe-desc">
        A customer journey moves through discover, engage, convert and retain. Beneath it, a connected platform layer
        provides customer profiles, content, analytics, testing, marketing automation and commerce.
      </desc>
      <g className="stroke-line-strong" strokeWidth="1.25" strokeDasharray="3 5">
        {stages.map((s) => (
          <path key={s.label} d={`M${s.x} ${s.y + 34} V230`} />
        ))}
      </g>
      <path d={journey} fill="none" className="stroke-ink" strokeWidth="2" />
      {stages.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={s.y} r="9" className="fill-surface stroke-ink" strokeWidth="1.75" />
          <NodeLabel x={s.x} y={s.y - 20}>
            {s.label}
          </NodeLabel>
        </g>
      ))}
      <g className="motion-reduce:hidden">
        <circle r="5" className="fill-logo-red">
          <animateMotion dur="6s" repeatCount="indefinite" path={journey} />
        </circle>
      </g>
      <Plane x={40} y={236} w={440} h={156} />
      {tiles.map((t) => (
        <g key={t.label}>
          <rect x={t.x} y={t.y} width="128" height="52" rx="8" className={t.hub ? "fill-ink" : "fill-paper stroke-line-strong"} strokeWidth="1.25" />
          <NodeLabel x={t.x + 64} y={t.y + 30} className={t.hub ? "fill-night-text" : undefined}>
            {t.label}
          </NodeLabel>
          {t.hub ? <circle cx={t.x + 114} cy={t.y + 14} r="4" className="fill-logo-red" /> : null}
        </g>
      ))}
    </svg>
  );
}

/** Data Management: an owned, governed lifecycle from creation to disposition. */
export function DataGraphic({ className }: GraphicProps) {
  const cx = 260;
  const cy = 214;
  const r = 128;
  const nodes = [
    { label: "Create", angle: -90 },
    { label: "Integrate", angle: -30 },
    { label: "Validate", angle: 30 },
    { label: "Use", angle: 90 },
    { label: "Retain", angle: 150 },
    { label: "Dispose", angle: 210 },
  ].map((n) => {
    const rad = (n.angle * Math.PI) / 180;
    return { ...n, x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad), cos: Math.cos(rad), sin: Math.sin(rad) };
  });
  const ring = `M${cx} ${cy - r} A${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`;
  return (
    <svg viewBox="0 0 520 430" role="img" aria-labelledby="data-title data-desc" className={cn("h-auto w-full", className)}>
      <title id="data-title">Governed data lifecycle</title>
      <desc id="data-desc">
        A lifecycle ring: data is created, integrated, validated, used, retained and finally disposed of. At the centre,
        named owners and stewards are accountable for each stage.
      </desc>
      <circle cx={cx} cy={cy} r={r} fill="none" className="stroke-ink" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r - 34} fill="none" className="stroke-line" strokeWidth="1" strokeDasharray="2 6" />
      <g className="motion-reduce:hidden">
        <circle r="5" className="fill-logo-red">
          <animateMotion dur="9s" repeatCount="indefinite" path={ring} />
        </circle>
      </g>
      {nodes.map((n) => {
        const lx = cx + (r + 26) * n.cos;
        const ly = cy + (r + 26) * n.sin + 4;
        const anchor = Math.abs(n.cos) < 0.2 ? "middle" : n.cos > 0 ? "start" : "end";
        return (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="12" className={n.label === "Validate" ? "fill-ink" : "fill-surface stroke-ink"} strokeWidth="1.5" />
            {n.label === "Validate" ? (
              <path d={`M${n.x - 5} ${n.y} L${n.x - 1} ${n.y + 4} L${n.x + 5} ${n.y - 3}`} fill="none" className="stroke-night-text" strokeWidth="1.75" strokeLinecap="round" />
            ) : null}
            <NodeLabel x={lx} y={n.label === "Create" ? ly - 6 : n.label === "Use" ? ly + 8 : ly} anchor={anchor}>
              {n.label}
            </NodeLabel>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="58" className="fill-ink" />
      <circle cx={cx} cy={cy - 30} r="5" className="fill-logo-red" />
      <text x={cx} y={cy + 2} textAnchor="middle" className="fill-night-text font-mono text-[11px] uppercase tracking-[0.08em]">
        Owners &amp;
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle" className="fill-night-text font-mono text-[11px] uppercase tracking-[0.08em]">
        stewards
      </text>
    </svg>
  );
}

/** MapleRecord: record series governed by retention schedules and role-based access. */
export function MapleRecordGraphic({ className, tone = "light" }: GraphicProps & { tone?: "light" | "night" }) {
  const night = tone === "night";
  const series = ["Permits", "Minutes", "Contracts"];
  return (
    <svg viewBox="0 0 520 380" role="img" aria-labelledby="mr-title mr-desc" className={cn("h-auto w-full", className)}>
      <title id="mr-title">Records governed by retention schedules and role-based access</title>
      <desc id="mr-desc">
        Example record series such as permits, minutes and contracts are assigned retention schedules that move them
        from active to inactive to disposition, while role-based permissions control who can access them.
      </desc>
      {series.map((label, i) => {
        const x = 40 + i * 160;
        return (
          <g key={label}>
            <rect x={x + 10} y={30} width="120" height="84" rx="6" className={night ? "fill-night-line" : "fill-paper-deep"} />
            <rect x={x + 5} y={36} width="120" height="84" rx="6" className={night ? "fill-night-raised stroke-night-line" : "fill-surface stroke-line-strong"} strokeWidth="1.25" />
            <rect x={x} y={42} width="120" height="84" rx="6" className={night ? "fill-night-raised stroke-night-muted" : "fill-surface stroke-ink"} strokeWidth="1.5" />
            <path d={`M${x + 16} ${62} H${x + 76} M${x + 16} ${74} H${x + 100} M${x + 16} ${86} H${x + 88}`} className={night ? "stroke-night-line" : "stroke-line"} strokeWidth="3" strokeLinecap="round" />
            <NodeLabel x={x + 16} y={114} anchor="start" className={night ? "fill-night-text" : undefined}>
              {label}
            </NodeLabel>
            <path d={`M${x + 60} 130 V176`} className={night ? "stroke-night-muted" : "stroke-ink"} strokeWidth="1.25" strokeDasharray="3 4" />
          </g>
        );
      })}
      {/* retention schedule */}
      <rect x="40" y="184" width="440" height="40" rx="20" className={night ? "fill-night-raised stroke-night-line" : "fill-surface stroke-ink"} strokeWidth="1.5" />
      <rect x="40" y="184" width="200" height="40" rx="20" className={night ? "fill-night-text" : "fill-ink"} />
      <path d="M340 184 V224" className={night ? "stroke-night-line" : "stroke-line-strong"} strokeWidth="1.5" />
      <text x="140" y="209" textAnchor="middle" className={cn("font-mono text-[11px] uppercase tracking-[0.08em]", night ? "fill-night" : "fill-night-text")}>
        Active
      </text>
      <text x="290" y="209" textAnchor="middle" className={cn("font-mono text-[11px] uppercase tracking-[0.08em]", night ? "fill-night-text" : "fill-ink-soft")}>
        Inactive
      </text>
      <text x="410" y="209" textAnchor="middle" className={cn("font-mono text-[11px] uppercase tracking-[0.08em]", night ? "fill-night-text" : "fill-ink-soft")}>
        Disposition
      </text>
      <circle cx="240" cy="204" r="7" className="fill-logo-red" />
      <NodeLabel x={40} y={252} anchor="start" className={night ? "fill-night-muted" : "fill-muted"}>
        Retention schedule
      </NodeLabel>
      {/* role-based access */}
      {["Clerk", "Manager", "Auditor"].map((role, i) => {
        const x = 40 + i * 150;
        return (
          <g key={role}>
            <rect x={x} y={286} width="140" height="48" rx="24" className={night ? "fill-night-raised stroke-night-line" : "fill-surface stroke-ink"} strokeWidth="1.5" />
            <rect x={x + 18} y={306} width="14" height="11" rx="2" className={night ? "fill-night-text" : "fill-ink"} />
            <path d={`M${x + 20.5} 306 V302 a4.5 4.5 0 0 1 9 0 V306`} fill="none" className={night ? "stroke-night-text" : "stroke-ink"} strokeWidth="1.5" />
            <NodeLabel x={x + 42} y={315} anchor="start" className={night ? "fill-night-text" : undefined}>
              {role}
            </NodeLabel>
          </g>
        );
      })}
      <NodeLabel x={40} y={360} anchor="start" className={night ? "fill-night-muted" : "fill-muted"}>
        Role-based access
      </NodeLabel>
    </svg>
  );
}

/* Small glyphs for the homepage expertise summary — same line weight, scaled down. */
export function GovernanceGlyph({ className }: GraphicProps) {
  return (
    <svg viewBox="0 0 96 64" aria-hidden className={cn("h-16 w-24", className)}>
      <path d="M8 32 H34 M62 32 H88 M48 46 V60" className="stroke-ink" strokeWidth="1.5" />
      <rect x="37" y="21" width="22" height="22" rx="3" transform="rotate(45 48 32)" className="fill-ink" />
      <circle cx="48" cy="32" r="4" className="fill-logo-red" />
      <circle cx="8" cy="32" r="4" className="fill-surface stroke-ink" strokeWidth="1.5" />
      <circle cx="88" cy="32" r="4" className="fill-surface stroke-ink" strokeWidth="1.5" />
    </svg>
  );
}

export function JourneyGlyph({ className }: GraphicProps) {
  return (
    <svg viewBox="0 0 96 64" aria-hidden className={cn("h-16 w-24", className)}>
      <path d="M8 44 C24 44 24 18 40 18 S58 46 72 46 S84 22 90 22" fill="none" className="stroke-ink" strokeWidth="1.75" />
      {[
        [8, 44],
        [40, 18],
        [72, 46],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="4.5" className="fill-surface stroke-ink" strokeWidth="1.5" />
      ))}
      <circle cx="90" cy="22" r="5" className="fill-logo-red" />
    </svg>
  );
}

export function LifecycleGlyph({ className }: GraphicProps) {
  return (
    <svg viewBox="0 0 96 64" aria-hidden className={cn("h-16 w-24", className)}>
      <circle cx="48" cy="32" r="24" fill="none" className="stroke-ink" strokeWidth="1.5" />
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const rad = (a * Math.PI) / 180;
        return <circle key={a} cx={48 + 24 * Math.cos(rad)} cy={32 + 24 * Math.sin(rad)} r="4" className="fill-surface stroke-ink" strokeWidth="1.5" />;
      })}
      <circle cx="48" cy="32" r="9" className="fill-ink" />
      <circle cx="48" cy="32" r="3.5" className="fill-logo-red" />
    </svg>
  );
}
