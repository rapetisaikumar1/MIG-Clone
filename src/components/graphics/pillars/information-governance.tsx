import { cn } from "@/lib/utils";
import { NodeLabel, Plane, svgSmallLabelSize } from "@/components/graphics/primitives";

type GraphicProps = { className?: string };

/** The four lifecycle stages on the track; disposition (the last) is marked as a documented, approved decision. */
const stages = [
  { label: "Capture", x: 95 },
  { label: "Classify", x: 205 },
  { label: "Retain", x: 315 },
  { label: "Dispose", x: 425 },
];
const holdings = [
  { label: "Electronic", x: 60 },
  { label: "Physical", x: 196 },
  { label: "Requests", x: 332 },
];
const regulations = ["GDPR", "PDPA", "PIPEDA", "CCPA"];

/**
 * Information Governance & Records: a records lifecycle (capture → classify → retain → dispose) governing one system
 * that holds electronic and physical records and information requests, with access control and an audit trail
 * underneath, and a privacy layer naming the four regulations the work is designed to support. Abstract only: no
 * product screens or logos.
 */
export function InformationGovernanceGraphic({ className }: GraphicProps) {
  const track = "M60 52 H452";
  return (
    <svg viewBox="0 0 520 420" role="img" aria-labelledby="ig-title ig-desc" className={cn("h-auto w-full", className)}>
      <title id="ig-title">Records governed from capture to disposition</title>
      <desc id="ig-desc">
        A lifecycle track runs from capture to classification, retention and disposition, and the final disposition step
        is checked off as an approved decision. The lifecycle governs one records system that holds electronic records,
        physical records and information requests, with access control and an audit trail underneath. Below it, a
        privacy layer names GDPR, PDPA, PIPEDA and CCPA, the regulations the controls are designed to support.
      </desc>

      {/* Lifecycle track */}
      <text x="260" y="19" textAnchor="middle" className={cn("fill-muted font-mono uppercase", svgSmallLabelSize)}>
        Records lifecycle
      </text>
      <g fill="none" className="stroke-ink" strokeWidth="1.5" strokeLinejoin="round">
        <path d={track} />
        <path d="M453 48 L460 52 L453 56" />
      </g>
      {/* A record moves along the lifecycle (hidden for reduced motion). */}
      <g className="motion-reduce:hidden">
        <circle r="5" className="fill-logo-red">
          <animateMotion dur="7s" repeatCount="indefinite" path={track} />
        </circle>
      </g>
      {stages.map((s, i) => {
        const last = i === stages.length - 1;
        return (
          <g key={s.label}>
            <circle cx={s.x} cy={52} r={last ? 10 : 8} className={last ? "fill-ink" : "fill-surface stroke-ink"} strokeWidth="1.5" />
            {last ? (
              <path
                d={`M${s.x - 4} 52 L${s.x - 1} 55 L${s.x + 4.5} 49`}
                fill="none"
                className="stroke-night-text"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : null}
            <NodeLabel fluid x={s.x} y={90}>
              {s.label}
            </NodeLabel>
          </g>
        );
      })}

      {/* The lifecycle governs one records system */}
      <path d="M260 60 V122" className="stroke-line-strong" strokeWidth="1.25" strokeDasharray="3 4" />
      <Plane x={40} y={124} w={440} h={148} />
      {holdings.map((h) => (
        <g key={h.label}>
          <rect x={h.x} y={144} width="128" height="52" rx="8" className="fill-paper stroke-line-strong" strokeWidth="1.25" />
          <NodeLabel fluid x={h.x + 64} y={175}>
            {h.label}
          </NodeLabel>
        </g>
      ))}
      <rect x="60" y="212" width="400" height="40" rx="8" className="fill-ink" />
      <circle cx="444" cy="226" r="4" className="fill-logo-red" />
      <NodeLabel fluid x={260} y={238} className="fill-night-text">
        Access · Audit trail
      </NodeLabel>

      {/* Privacy layer: the regulations the controls are designed to support */}
      <g className="stroke-ink" strokeWidth="1.5">
        <path d="M260 272 V316" strokeDasharray="3 4" />
      </g>
      <circle cx="260" cy="272" r="4" className="fill-surface stroke-ink" strokeWidth="1.5" />
      <rect x="40" y="316" width="440" height="60" rx="30" fill="none" className="stroke-line-strong" strokeWidth="1.25" strokeDasharray="4 5" />
      {regulations.map((r, i) => {
        const x = 54 + i * 106;
        return (
          <g key={r}>
            <rect x={x} y="328" width="96" height="36" rx="18" className="fill-paper stroke-ink" strokeWidth="1.25" />
            <NodeLabel fluid x={x + 48} y={352}>
              {r}
            </NodeLabel>
          </g>
        );
      })}
      <text x="260" y="404" textAnchor="middle" className={cn("fill-muted font-mono uppercase", svgSmallLabelSize)}>
        Privacy · Designed to support
      </text>
    </svg>
  );
}
