import { cn } from "@/lib/utils";
import { NodeLabel, Plane, svgSmallLabelSize } from "../primitives";

type GraphicProps = { className?: string };

/* Local copies of the service-graphics box and arrow, so this pillar graphic stays self-contained. */
function Box({ x, y, w = 128, h = 52, label, dark }: { x: number; y: number; w?: number; h?: number; label: string; dark?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" className={dark ? "fill-ink" : "fill-surface stroke-ink"} strokeWidth="1.5" />
      <NodeLabel fluid x={x + w / 2} y={y + h / 2 + 6} className={dark ? "fill-night-text" : undefined}>
        {label}
      </NodeLabel>
    </g>
  );
}

function ArrowRight({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g fill="none" className="stroke-ink" strokeWidth="1.5" strokeLinejoin="round">
      <path d={`M${x1} ${y} H${x2}`} />
      <path d={`M${x2 - 7} ${y - 4} L${x2} ${y} L${x2 - 7} ${y + 4}`} />
    </g>
  );
}

/**
 * Engineering & Technology: an automated build → test → deploy pipeline (CI/CD, with quality checks) that releases
 * applications, mobile apps and AI/ML services onto cloud platforms on AWS and Azure, integrated with the data,
 * Adobe and on-premises systems already in place. Abstract only: no tools or logos beyond the two named clouds.
 */
export function EngineeringGraphic({ className }: GraphicProps) {
  const loop = "M416 48 V30 H104 V44";
  const workloads = [
    { label: "Apps", x: 60 },
    { label: "Mobile", x: 196 },
    { label: "AI / ML", x: 332 },
  ];
  const systems = [
    { label: "Data", x: 40 },
    { label: "Adobe", x: 192 },
    { label: "On-prem", x: 344 },
  ];
  return (
    <svg viewBox="0 0 520 420" role="img" aria-labelledby="eng-title eng-desc" className={cn("h-auto w-full", className)}>
      <title id="eng-title">Engineering pipeline from build to cloud</title>
      <desc id="eng-desc">
        An automated pipeline builds, tests and deploys software, and a monitoring loop feeds improvements back into the
        build. Every release passes quality checks. The pipeline deploys applications, mobile apps and AI and machine
        learning services to cloud platforms on AWS and Azure, which connect to data, Adobe and on-premises systems.
      </desc>
      {/* Monitoring loop: from deploy back to build */}
      <g fill="none" className="stroke-line-strong" strokeWidth="1.5">
        <path d={loop} strokeDasharray="4 5" />
        <path d="M100 37 L104 44 L108 37" strokeLinejoin="round" />
      </g>
      <text x="260" y="19" textAnchor="middle" className={cn("fill-muted font-mono", svgSmallLabelSize)}>
        CI/CD · MONITOR
      </text>
      <g className="motion-reduce:hidden">
        <circle r="5" className="fill-logo-red">
          <animateMotion dur="7s" repeatCount="indefinite" path={loop} />
        </circle>
      </g>
      <Box x={40} y={48} label="Build" />
      <ArrowRight x1={168} x2={192} y={74} />
      <Box x={196} y={48} label="Test" dark />
      {/* Quality gate: every release passes its checks */}
      <circle cx="310" cy="62" r="8" className="fill-surface" />
      <path d="M306 62 L309 65 L314.5 59" fill="none" className="stroke-signal" strokeWidth="1.75" strokeLinecap="round" />
      <ArrowRight x1={324} x2={348} y={74} />
      <Box x={352} y={48} label="Deploy" />
      <g fill="none" className="stroke-ink" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M416 100 V140" />
        <path d="M412 133 L416 140 L420 133" />
      </g>
      {/* The cloud platform: workloads on a shared AWS and Azure foundation */}
      <Plane x={40} y={144} w={440} h={150} />
      {workloads.map((w) => (
        <g key={w.label}>
          <rect x={w.x} y={166} width="128" height="52" rx="8" className="fill-paper stroke-line-strong" strokeWidth="1.25" />
          <NodeLabel fluid x={w.x + 64} y={197}>
            {w.label}
          </NodeLabel>
        </g>
      ))}
      <rect x="60" y="234" width="400" height="40" rx="8" className="fill-ink" />
      <circle cx="444" cy="248" r="4" className="fill-logo-red" />
      <NodeLabel fluid x={260} y={260} className="fill-night-text">
        Cloud · AWS · Azure
      </NodeLabel>
      {/* Integrations to the systems already in place */}
      <g className="stroke-ink" strokeWidth="1.5">
        {systems.map((sys) => (
          <path key={sys.label} d={`M${sys.x + 68} 302 V346`} strokeDasharray="3 4" />
        ))}
      </g>
      {systems.map((sys) => (
        <g key={sys.label}>
          <circle cx={sys.x + 68} cy={302} r="4" className="fill-surface stroke-ink" strokeWidth="1.5" />
          <Box x={sys.x} y={350} w={136} label={sys.label} />
        </g>
      ))}
    </svg>
  );
}
