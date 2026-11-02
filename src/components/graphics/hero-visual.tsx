import { cn } from "@/lib/utils";
import { Plane, NodeLabel } from "./primitives";

/**
 * Signature illustration: governed data moving upward through control points into
 * AI and digital experiences. Conceptual only — no metrics or simulated results.
 * Below `sm`, SVG text is hidden and an HTML legend (rendered by the caller) carries the labels.
 */
export function HeroVisual({ className }: { className?: string }) {
  const signalPath = "M410 440 V330 H280 V250 C280 222 431 222 431 192";
  return (
    <svg
      viewBox="0 0 580 620"
      role="img"
      aria-labelledby="hero-visual-title hero-visual-desc"
      className={cn("h-auto w-full", className)}
    >
      <title id="hero-visual-title">How trusted data supports responsible AI and digital experiences</title>
      <desc id="hero-visual-desc">
        Three layers. At the base, enterprise data sources such as CRM, ERP and records pass a quality check. In the
        middle, governance controls apply policy, review and clear ownership. At the top, the governed data supports
        AI models and digital experiences such as websites and customer journeys. A loop on the right shows
        monitoring feeding improvements back to the foundation.
      </desc>

      {/* Connectors: data → controls */}
      <g className="stroke-ink" strokeWidth="1.5" fill="none">
        {[150, 280, 410].map((x) => (
          <path key={x} d={`M${x} 440 V386`} className="draw-in" pathLength={1} />
        ))}
        {/* controls → experiences */}
        <path d="M280 250 C280 222 139 222 139 192" className="draw-in" pathLength={1} />
        <path d="M280 250 V192" className="draw-in" pathLength={1} />
        <path d="M280 250 C280 222 431 222 431 192" className="draw-in" pathLength={1} />
      </g>
      <g className="fill-ink">
        {[150, 280, 410].map((x) => (
          <path key={x} d={`M${x - 4} 389 L${x} 381 L${x + 4} 389 Z`} />
        ))}
      </g>

      {/* Feedback loop: monitor & improve */}
      <g className="max-sm:hidden">
        <path d="M534 112 C548 112 548 120 548 140 V500 C548 520 546 522 534 522" fill="none" className="stroke-line-strong" strokeWidth="1.5" strokeDasharray="4 5" />
        <path d="M538 517 L530 522 L538 527" fill="none" className="stroke-line-strong" strokeWidth="1.5" />
        <text x="0" y="0" transform="translate(564 330) rotate(90)" textAnchor="middle" className="fill-muted font-mono text-[11px] uppercase tracking-[0.1em]">
          Monitor &amp; improve
        </text>
      </g>

      {/* Top tier: AI & digital experiences */}
      <Plane x={40} y={40} w={480} h={150} />
      <text x="64" y="72" className="fill-muted font-mono text-[12px] uppercase tracking-[0.1em] max-sm:hidden">
        AI &amp; digital experiences
      </text>
      {/* Web experience tile */}
      <g>
        <rect x="64" y="92" width="150" height="78" rx="6" className="fill-paper stroke-ink" strokeWidth="1.25" />
        <path d="M64 106 H214" className="stroke-ink" strokeWidth="1.25" />
        {[73, 81, 89].map((cx) => (
          <circle key={cx} cx={cx} cy="99" r="2" className="fill-line-strong" />
        ))}
        <rect x="76" y="116" width="58" height="40" rx="3" className="fill-paper-deep" />
        <path d="M144 120 H200 M144 130 H192 M144 140 H198 M144 150 H178" className="stroke-line-strong" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* AI model tile */}
      <g>
        <rect x="230" y="92" width="120" height="78" rx="6" className="fill-ink" />
        <g className="stroke-night-muted" strokeWidth="1">
          <path d="M252 112 L290 131 L252 150 M290 131 L328 112 M290 131 L328 150 M252 112 V150 M328 112 V150" fill="none" />
        </g>
        {[
          [252, 112],
          [252, 150],
          [328, 112],
          [328, 150],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" className="fill-night-text" />
        ))}
        <circle cx="290" cy="131" r="6" className="fill-logo-red" />
      </g>
      {/* Customer journey tile */}
      <g>
        <rect x="366" y="92" width="130" height="78" rx="6" className="fill-paper stroke-ink" strokeWidth="1.25" />
        <path d="M382 150 C404 150 404 112 428 112 S452 150 480 150" fill="none" className="stroke-ink" strokeWidth="1.25" />
        {[
          [382, 150],
          [428, 112],
          [480, 150],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" className="fill-surface stroke-ink" strokeWidth="1.25" />
        ))}
      </g>

      {/* Middle tier: governance controls */}
      <Plane x={40} y={250} w={480} h={130} />
      <text x="64" y="282" className="fill-muted font-mono text-[12px] uppercase tracking-[0.1em] max-sm:hidden">
        Governance controls
      </text>
      <path d="M110 330 H450" className="stroke-line-strong" strokeWidth="1.5" />
      <circle cx="150" cy="330" r="13" className="fill-surface stroke-ink" strokeWidth="1.5" />
      <path d="M144 325 H156 M144 330 H156 M144 335 H152" className="stroke-ink" strokeWidth="1.25" />
      <rect x="266" y="316" width="28" height="28" rx="3" transform="rotate(45 280 330)" className="fill-ink" />
      <circle cx="280" cy="330" r="5" className="fill-logo-red" />
      <circle cx="410" cy="330" r="13" className="fill-surface stroke-ink" strokeWidth="1.5" />
      <circle cx="410" cy="326" r="4" className="fill-none stroke-ink" strokeWidth="1.25" />
      <path d="M402 338 C402 332 418 332 418 338" className="fill-none stroke-ink" strokeWidth="1.25" />
      <g className="max-sm:hidden">
        <NodeLabel x={150} y={366}>Policy</NodeLabel>
        <NodeLabel x={280} y={366}>Review</NodeLabel>
        <NodeLabel x={410} y={366}>Owner</NodeLabel>
      </g>

      {/* Bottom tier: data foundations */}
      <Plane x={40} y={440} w={480} h={150} />
      <text x="64" y="472" className="fill-muted font-mono text-[12px] uppercase tracking-[0.1em] max-sm:hidden">
        Data foundations
      </text>
      <path d="M100 526 H440" className="stroke-line-strong" strokeWidth="1.5" />
      {[
        { x: 110, label: "CRM" },
        { x: 210, label: "ERP" },
        { x: 310, label: "Records" },
      ].map(({ x, label }) => (
        <g key={label}>
          <path
            d={`M${x - 22} 506 V542 C${x - 22} 550 ${x + 22} 550 ${x + 22} 542 V506`}
            className="fill-surface stroke-ink"
            strokeWidth="1.5"
          />
          <ellipse cx={x} cy="506" rx="22" ry="7" className="fill-paper-deep stroke-ink" strokeWidth="1.5" />
          <path d={`M${x - 22} 524 C${x - 22} 532 ${x + 22} 532 ${x + 22} 524`} fill="none" className="stroke-ink" strokeWidth="1" />
          <NodeLabel x={x} y={572} className="max-sm:hidden">
            {label}
          </NodeLabel>
        </g>
      ))}
      <circle cx="430" cy="526" r="18" className="fill-ink" />
      <path d="M422 526 L428 532 L439 520" fill="none" className="stroke-night-text" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <NodeLabel x={430} y={572} className="max-sm:hidden">
        Quality
      </NodeLabel>

      {/* Travelling signal — hidden entirely when reduced motion is requested */}
      <g className="motion-reduce:hidden">
        <circle r="6" className="fill-logo-red">
          <animateMotion dur="5s" repeatCount="indefinite" path={signalPath} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="5s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}
