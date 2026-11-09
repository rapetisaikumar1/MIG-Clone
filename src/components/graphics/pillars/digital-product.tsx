import { cn } from "@/lib/utils";
import { NodeLabel, Plane, svgSmallLabelSize } from "@/components/graphics/primitives";

/**
 * Digital & Product: a product roadmap. Each release (test, MVP, launch, grow) adds value on the way to the product
 * vision; what is learned from each release feeds the next; one product team (product, design, engineering) owns it.
 * Abstract only: no figures, technologies or products.
 */
export function DigitalProductGraphic({ className }: { className?: string }) {
  const baseline = 232;
  const releases = [
    { label: "Test", cx: 92, h: 36 },
    { label: "MVP", cx: 176, h: 64, shipped: true },
    { label: "Launch", cx: 260, h: 96 },
    { label: "Grow", cx: 344, h: 130 },
  ];
  const target = { x: 428, y: 92 };
  const tops = releases.map((r) => `${r.cx} ${baseline - r.h}`);
  const path = `M${tops.join(" L")} L${target.x - 22} ${target.y}`;
  // From the vision column back to the first test, centered under the plane and the team bar.
  const loop = `M${target.x} 284 V316 H92 V282`;
  return (
    <svg viewBox="0 0 520 420" role="img" aria-labelledby="dp-title dp-desc" className={cn("h-auto w-full", className)}>
      <title id="dp-title">Product roadmap from first test to the product vision</title>
      <desc id="dp-desc">
        A product roadmap: a tested prototype, a minimum viable product, a launch and growth releases each add value on
        the way to the product vision. What is measured and learned from each release feeds the next one, and a single
        product team of product, design and engineering owns the product throughout.
      </desc>
      <Plane x={40} y={40} w={440} h={232} />
      <text x="64" y="74" className={cn("fill-muted font-mono uppercase", svgSmallLabelSize)}>
        Roadmap
      </text>
      <path d={`M64 ${baseline} H456`} className="stroke-line-strong" strokeWidth="1.25" />
      {releases.map((r) => (
        <g key={r.label}>
          <rect
            x={r.cx - 20}
            y={baseline - r.h}
            width="40"
            height={r.h}
            rx="6"
            className={r.shipped ? "fill-ink" : "fill-paper stroke-line-strong"}
            strokeWidth="1.25"
          />
          <NodeLabel fluid x={r.cx} y={baseline + 26}>
            {r.label}
          </NodeLabel>
        </g>
      ))}
      {/* Value delivered release by release, rising toward the vision */}
      <path d={path} fill="none" className="stroke-ink" strokeWidth="1.75" strokeLinejoin="round" />
      {releases.map((r) => (
        <circle key={r.label} cx={r.cx} cy={baseline - r.h} r="5" className="fill-surface stroke-ink" strokeWidth="1.5" />
      ))}
      {/* The product vision: a target */}
      <circle cx={target.x} cy={target.y} r="22" className="fill-surface stroke-ink" strokeWidth="1.5" />
      <circle cx={target.x} cy={target.y} r="13" fill="none" className="stroke-ink" strokeWidth="1.25" />
      <circle cx={target.x} cy={target.y} r="5" className="fill-logo-red" />
      <NodeLabel fluid x={target.x} y={target.y + 46}>
        Vision
      </NodeLabel>
      <g className="motion-reduce:hidden">
        <circle r="5" className="fill-logo-red">
          <animateMotion dur="6s" repeatCount="indefinite" path={path} />
        </circle>
      </g>
      {/* Measure and learn: each release informs the next */}
      <g fill="none" className="stroke-line-strong" strokeWidth="1.5">
        <path d={loop} strokeDasharray="4 5" />
        <path d="M88 289 L92 282 L96 289" strokeLinejoin="round" />
      </g>
      <text x="260" y="340" textAnchor="middle" className={cn("fill-muted font-mono uppercase", svgSmallLabelSize)}>
        Measure · learn
      </text>
      {/* One product team owns the product end to end */}
      <rect x="40" y="356" width="440" height="44" rx="8" className="fill-ink" />
      <circle cx="462" cy="370" r="4" className="fill-logo-red" />
      <NodeLabel fluid x={260} y={384} className="fill-night-text">
        Product · design · engineering
      </NodeLabel>
    </svg>
  );
}
