import { NodeLabel, Plane, svgSmallLabelSize } from "@/components/graphics/primitives";
import { cn } from "@/lib/utils";

const regulations = ["GDPR", "PDPA", "PIPEDA", "CCPA"];
const clouds = [
  { label: "AWS", x: 96 },
  { label: "Azure", x: 296 },
];

/* Records field: 8 × 3 abstract tiles inside the plane; one is "found" under the search lens. */
const COLS = 8;
const ROWS = 3;
const TILE = { w: 40, h: 30, gapX: 12, gapY: 14, x0: 58, y0: 150 };
const FOUND = { col: 5, row: 1 };

/**
 * Abstract concept diagram (not a product screen): a privacy layer of four regulations above a field of
 * records, a search lens resolving one record, and the two cloud platforms below. Tokens only.
 */
export function MoliGraphic({ className }: { className?: string }) {
  const found = { x: TILE.x0 + FOUND.col * (TILE.w + TILE.gapX), y: TILE.y0 + FOUND.row * (TILE.h + TILE.gapY) };
  const lens = { cx: found.x + TILE.w / 2, cy: found.y + TILE.h / 2 };
  return (
    <svg viewBox="0 0 520 410" role="img" aria-labelledby="moli-title moli-desc" className={cn("h-auto w-full", className)}>
      <title id="moli-title">MOLI concept: AI search over records, on AWS and Azure, with privacy compliance support</title>
      <desc id="moli-desc">
        An abstract illustration. A privacy layer naming GDPR, PDPA, PIPEDA and CCPA sits above a field of records. A
        search lens picks out one record. Beneath the records, two cloud platforms: AWS and Azure.
      </desc>

      {/* Privacy layer */}
      <rect x="40" y="22" width="440" height="60" rx="30" fill="none" className="stroke-line-strong" strokeWidth="1.25" strokeDasharray="4 5" />
      {regulations.map((r, i) => {
        const x = 54 + i * 106;
        return (
          <g key={r}>
            <rect x={x} y="34" width="96" height="36" rx="18" className="fill-paper stroke-ink" strokeWidth="1.25" />
            <NodeLabel fluid x={x + 48} y={58}>
              {r}
            </NodeLabel>
            <path d={`M${x + 48} 82 V100`} className="stroke-line-strong" strokeWidth="1.25" strokeDasharray="3 4" />
          </g>
        );
      })}

      {/* Records field */}
      <Plane x={40} y={100} w={440} h={190} />
      <text x="62" y="132" className={cn("fill-muted font-mono uppercase", svgSmallLabelSize)}>
        Records
      </text>
      {Array.from({ length: ROWS * COLS }, (_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const isFound = col === FOUND.col && row === FOUND.row;
        const x = TILE.x0 + col * (TILE.w + TILE.gapX);
        const y = TILE.y0 + row * (TILE.h + TILE.gapY);
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={TILE.w}
            height={TILE.h}
            rx="5"
            className={isFound ? "fill-ink" : "fill-paper-deep stroke-line-strong"}
            strokeWidth="1"
          />
        );
      })}
      <circle cx={lens.cx} cy={lens.cy} r="5" className="fill-logo-red" />
      {/* Search lens */}
      <circle cx={lens.cx} cy={lens.cy} r="36" className="fill-ink/[0.04] stroke-ink" strokeWidth="2" />
      <path d={`M${lens.cx + 26} ${lens.cy + 26} L${lens.cx + 46} ${lens.cy + 46}`} className="stroke-ink" strokeWidth="6" strokeLinecap="round" />
      <g className="motion-reduce:hidden">
        <circle cx={lens.cx} cy={lens.cy} r="5" fill="none" className="stroke-logo-red" strokeWidth="1.5">
          <animate attributeName="r" values="5;22" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0" dur="2.6s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Cloud platforms */}
      <text x="260" y="326" textAnchor="middle" className={cn("fill-muted font-mono uppercase", svgSmallLabelSize)}>
        Cloud
      </text>
      {clouds.map((c) => (
        <g key={c.label}>
          <path d={`M${c.x + 64} 298 V340`} className="stroke-ink" strokeWidth="1.5" />
          <rect x={c.x} y="340" width="128" height="52" rx="8" className="fill-surface stroke-ink" strokeWidth="1.5" />
          <NodeLabel fluid x={c.x + 64} y={372}>
            {c.label}
          </NodeLabel>
        </g>
      ))}
    </svg>
  );
}
