import { cn } from "@/lib/utils";
import { NodeLabel, svgSmallLabelSize } from "@/components/graphics/primitives";

/**
 * Experience Design: a double diamond. Research with users diverges into many observations and converges on one
 * insight; design diverges into concepts and converges on the tested one, which launches. A measurement loop feeds
 * what customers do after launch back into research. Abstract only: no tools, products or logos.
 */
export function ExperienceDesignGraphic({ className }: { className?: string }) {
  const cy = 176;
  const start = 40;
  const pinch = 250;
  const end = 460;
  const half = 92;
  const leftMid = (start + pinch) / 2;
  const rightMid = (pinch + end) / 2;
  const fan = [-60, -30, 0, 30, 60];
  const diamond = (x0: number, x1: number, dx = 0, dy = 0) => {
    const mid = (x0 + x1) / 2;
    return `M${x0 + dx} ${cy + dy} L${mid + dx} ${cy - half + dy} L${x1 + dx} ${cy + dy} L${mid + dx} ${cy + half + dy} Z`;
  };
  const loop = `M40 352 H22 V${cy} H${start - 12}`;
  const phases = [
    { label: "Discover", x: start + 54 },
    { label: "Define", x: pinch - 50 },
    { label: "Develop", x: pinch + 54 },
    { label: "Deliver", x: end - 54 },
  ];
  return (
    <svg viewBox="0 0 520 404" role="img" aria-labelledby="xd-title xd-desc" className={cn("h-auto w-full", className)}>
      <title id="xd-title">Research-led experience design, from users to a launched product</title>
      <desc id="xd-desc">
        A double diamond. Research with users opens up many observations, which converge on one shared insight. Design
        then opens up several concepts, which converge on the tested one, and the product launches. After launch, the
        experience is measured and optimized, and what is learned feeds back into research with users.
      </desc>
      {phases.map((p) => (
        <NodeLabel fluid key={p.label} x={p.x} y={cy - half - 22}>
          {p.label}
        </NodeLabel>
      ))}
      {/* Shadow plates first, so neither diamond's plate falls on top of the other diamond. */}
      <path d={diamond(start, pinch, 8, 8)} className="fill-paper-deep" />
      <path d={diamond(pinch, end, 8, 8)} className="fill-paper-deep" />
      <path d={diamond(start, pinch)} className="fill-surface stroke-ink" strokeWidth="1.5" strokeLinejoin="round" />
      <path d={diamond(pinch, end)} className="fill-surface stroke-ink" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Diverge, then converge: research paths in the first diamond, concept paths in the second. */}
      <g fill="none" className="stroke-line-strong" strokeWidth="1.25" strokeDasharray="3 4">
        {fan.map((o) => (
          <path key={`l${o}`} d={`M${start} ${cy} L${leftMid} ${cy + o} L${pinch} ${cy}`} />
        ))}
        {fan.map((o) => (
          <path key={`r${o}`} d={`M${pinch} ${cy} L${rightMid} ${cy + o} L${end} ${cy}`} />
        ))}
      </g>
      {fan.map((o) => (
        <circle key={`o${o}`} cx={leftMid} cy={cy + o} r="5.5" className="fill-surface stroke-ink" strokeWidth="1.5" />
      ))}
      {fan.map((o) => (
        <rect
          key={`c${o}`}
          x={rightMid - 7}
          y={cy + o - 7}
          width="14"
          height="14"
          rx="3"
          className={o === 0 ? "fill-ink" : "fill-surface stroke-ink"}
          strokeWidth="1.5"
        />
      ))}
      {/* Users at the start; the shared insight at the pinch; the launched product at the end. */}
      <circle cx={start} cy={cy} r="11" className="fill-surface stroke-ink" strokeWidth="1.5" />
      <circle cx={start} cy={cy - 3.5} r="3.25" className="fill-ink" />
      <path d={`M${start - 6} ${cy + 7.5} A6 6 0 0 1 ${start + 6} ${cy + 7.5} Z`} className="fill-ink" />
      <rect x={pinch - 13} y={cy - 13} width="26" height="26" rx="3" transform={`rotate(45 ${pinch} ${cy})`} className="fill-ink" />
      <circle cx={pinch} cy={cy} r="4.5" className="fill-logo-red" />
      <text x={pinch} y={cy + 56} textAnchor="middle" className={cn("fill-muted font-mono uppercase", svgSmallLabelSize)}>
        Insight
      </text>
      <circle cx={end} cy={cy} r="12" className="fill-ink" />
      <path
        d={`M${end - 5} ${cy} L${end - 1} ${cy + 4} L${end + 5} ${cy - 3}`}
        fill="none"
        className="stroke-night-text"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Launch, then measure and optimize. */}
      <g fill="none" className="stroke-ink" strokeWidth="1.5" strokeLinejoin="round">
        <path d={`M${end} ${cy + 14} V322`} />
        <path d={`M${end - 4} 315 L${end} 322 L${end + 4} 315`} />
      </g>
      <text x={end - 10} y={cy + 92} textAnchor="end" className={cn("fill-muted font-mono uppercase", svgSmallLabelSize)}>
        Launch
      </text>
      <rect x="40" y="326" width="440" height="52" rx="8" className="fill-ink" />
      <NodeLabel fluid x={260} y={358} className="fill-night-text">
        Measure · optimize CX
      </NodeLabel>
      {/* What customers do after launch returns to research. */}
      <g fill="none" className="stroke-line-strong" strokeWidth="1.5">
        <path d={loop} strokeDasharray="4 5" />
        <path d={`M${start - 19} ${cy - 4} L${start - 12} ${cy} L${start - 19} ${cy + 4}`} strokeLinejoin="round" />
      </g>
      <g className="motion-reduce:hidden">
        <circle r="5" className="fill-logo-red">
          <animateMotion dur="8s" repeatCount="indefinite" path={loop} />
        </circle>
      </g>
    </svg>
  );
}
