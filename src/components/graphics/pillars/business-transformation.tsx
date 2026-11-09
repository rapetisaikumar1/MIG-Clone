import { cn } from "@/lib/utils";
import { NodeLabel, Plane, svgSmallLabelSize } from "@/components/graphics/primitives";

type GraphicProps = { className?: string };

function Step({ x, y, label, dark }: { x: number; y: number; label: string; dark?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width="120" height="40" rx="8" className={dark ? "fill-ink" : "fill-surface stroke-ink"} strokeWidth="1.5" />
      <NodeLabel fluid x={x + 60} y={y + 26} className={dark ? "fill-night-text" : undefined}>
        {label}
      </NodeLabel>
    </g>
  );
}

function Head({ x, y, dir }: { x: number; y: number; dir: "right" | "left" | "down" }) {
  const d = {
    right: `M${x - 7} ${y - 4} L${x} ${y} L${x - 7} ${y + 4}`,
    left: `M${x + 7} ${y - 4} L${x} ${y} L${x + 7} ${y + 4}`,
    down: `M${x - 4} ${y - 7} L${x} ${y} L${x + 4} ${y - 7}`,
  }[dir];
  return <path d={d} fill="none" className="stroke-ink" strokeWidth="1.5" strokeLinejoin="round" />;
}

/**
 * Business Transformation & CRM: a redesigned process running across sales and service lanes, recorded in one CRM
 * (sales, service and marketing on a shared customer record), with roles, training and adoption underneath.
 * Abstract only: no product names or logos.
 */
export function BusinessTransformationGraphic({ className }: GraphicProps) {
  // The flow a customer takes through the redesigned process: across sales, down into service, back across.
  const flow = "M220 62 H400 V138 H220";
  const crm = [
    { label: "Sales", x: 60 },
    { label: "Service", x: 196 },
    { label: "Marketing", x: 332 },
  ];
  return (
    <svg viewBox="0 0 520 420" role="img" aria-labelledby="bt-title bt-desc" className={cn("h-auto w-full", className)}>
      <title id="bt-title">A redesigned process supported by one CRM and enabled teams</title>
      <desc id="bt-desc">
        Two swimlanes, sales and service, show a redesigned process: qualify and propose in sales, then onboard and
        support in service. The process runs on one CRM where sales, service and marketing share a customer record.
        Beneath it, roles, training and adoption keep the new way of working in place.
      </desc>

      {/* Swimlanes: the redesigned process */}
      <rect x="40" y="24" width="440" height="152" rx="12" className="fill-surface stroke-ink" strokeWidth="1.5" />
      <path d="M40 100 H480" className="stroke-line-strong" strokeWidth="1.25" strokeDasharray="3 5" />
      <path d="M144 24 V176" className="stroke-line" strokeWidth="1.25" />
      <text x="58" y="67" className={cn("fill-muted font-mono uppercase", svgSmallLabelSize)}>
        Sales
      </text>
      <text x="58" y="143" className={cn("fill-muted font-mono uppercase", svgSmallLabelSize)}>
        Service
      </text>
      <g fill="none" className="stroke-ink" strokeWidth="1.5">
        <path d="M280 62 H336" />
        <path d="M400 82 V114" />
        <path d="M340 138 H284" />
      </g>
      <Head x={336} y={62} dir="right" />
      <Head x={400} y={114} dir="down" />
      <Head x={284} y={138} dir="left" />
      <Step x={160} y={42} label="Qualify" />
      <Step x={340} y={42} label="Propose" />
      <Step x={340} y={118} label="Onboard" />
      <Step x={160} y={118} label="Support" />
      {/* A customer moves through the process (hidden for reduced motion). */}
      <g className="motion-reduce:hidden">
        <circle r="5" className="fill-logo-red">
          <animateMotion dur="7s" repeatCount="indefinite" path={flow} />
        </circle>
      </g>

      {/* The process is recorded in one CRM */}
      <g className="stroke-ink" strokeWidth="1.5">
        <path d="M260 176 V206" strokeDasharray="3 4" />
      </g>
      <circle cx="260" cy="176" r="4" className="fill-surface stroke-ink" strokeWidth="1.5" />
      <Plane x={40} y={210} w={440} h={122} />
      <rect x="60" y="226" width="400" height="38" rx="8" className="fill-ink" />
      <circle cx="444" cy="239" r="4" className="fill-logo-red" />
      <NodeLabel fluid x={260} y={251} className="fill-night-text">
        Customer record
      </NodeLabel>
      {crm.map((c) => (
        <g key={c.label}>
          <path d={`M${c.x + 64} 264 V274`} className="stroke-line-strong" strokeWidth="1.25" />
          <rect x={c.x} y={274} width="128" height="42" rx="8" className="fill-paper stroke-line-strong" strokeWidth="1.25" />
          <NodeLabel fluid x={c.x + 64} y={301}>
            {c.label}
          </NodeLabel>
        </g>
      ))}

      {/* People: roles, training and adoption hold the change in place */}
      <rect x="40" y="356" width="440" height="44" rx="8" fill="none" className="stroke-line-strong" strokeWidth="1.5" strokeDasharray="4 5" />
      {[66, 454].map((x) => (
        <g key={x} fill="none" className="stroke-ink" strokeWidth="1.5">
          <circle cx={x} cy={371} r="5" />
          <path d={`M${x - 9} 390 C${x - 9} 381 ${x + 9} 381 ${x + 9} 390`} strokeLinecap="round" />
        </g>
      ))}
      <NodeLabel fluid x={260} y={384}>
        Roles · training · adoption
      </NodeLabel>
    </svg>
  );
}
