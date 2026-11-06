import { cn } from "@/lib/utils";

/**
 * Signature illustration: the Maverick InnoGarage operating model as a closed loop.
 * Modelled on consulting operating-model wheels (outcome at the hub, contributing elements around it,
 * an open enabling ring at the edge): the three practices as overlapping circles (data management at
 * the base) with customer and business outcomes where they meet, and the four delivery stages —
 * assess, design, implement, improve — as a continuous ring. Conceptual only: no metrics or simulated results.
 * Below `sm`, SVG text is hidden and the caller renders an HTML legend instead.
 */

const C = 280; // centre
const RING = 226; // delivery-loop radius
const LOBE_OFFSET = 66; // distance from centre to each practice circle's centre
const LOBE_R = 92; // practice circle radius

const practices = [
  { id: "data", short: "Data", lines: ["Data", "Management"], angle: 90 }, // foundation: at the base
  { id: "ai", short: "AI", lines: ["AI", "Governance"], angle: 210 },
  { id: "adobe", short: "Adobe", lines: ["Adobe", "Services"], angle: 330 },
] as const;

const stages = [
  { label: "Assess", angle: -90 },
  { label: "Design", angle: 0 },
  { label: "Implement", angle: 90 },
  { label: "Improve", angle: 180 },
] as const;

const rad = (deg: number) => (deg * Math.PI) / 180;
const onCircle = (r: number, deg: number) =>
  [C + r * Math.cos(rad(deg)), C + r * Math.sin(rad(deg))] as const;
const f = (n: number) => n.toFixed(2);

/** Ring arc from a to b degrees (clockwise in screen space). */
function arc(a: number, b: number) {
  const [x1, y1] = onCircle(RING, a);
  const [x2, y2] = onCircle(RING, b);
  return `M${f(x1)} ${f(y1)} A${RING} ${RING} 0 0 1 ${f(x2)} ${f(y2)}`;
}

export function HeroVisual({ className }: { className?: string }) {
  // The ring is drawn as four arcs with small gaps on the diagonals; an arrowhead after each gap
  // shows the direction of travel (assess → design → implement → improve → assess).
  const gaps = [-45, 45, 135, 225];
  const arcs = gaps.map((g, i) =>
    arc(
      g + 5,
      (gaps[(i + 1) % gaps.length] ?? 0) +
        (i === gaps.length - 1 ? 360 : 0) -
        5,
    ),
  );
  const loopPath = `M${C} ${C - RING} A${RING} ${RING} 0 1 1 ${C - 0.01} ${C - RING}`;

  return (
    <svg
      viewBox="-12 -12 584 584"
      role="img"
      aria-labelledby="hero-visual-title hero-visual-desc"
      className={cn("h-auto w-full", className)}
    >
      <title id="hero-visual-title">
        Our operating model: three connected practices, delivered in a
        continuous loop
      </title>
      <desc id="hero-visual-desc">
        A closed-loop model. At the centre are customer and business outcomes.
        Around them sit three connected practices, drawn as overlapping circles:
        data management at the base, with AI governance and Adobe services above
        it. An outer ring shows the four delivery stages in a continuous cycle:
        assess, design, implement and improve, then back to assess.
      </desc>

      {/* Outer ring: delivery loop */}
      <g
        fill="none"
        className="stroke-ink"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        {arcs.map((d) => (
          <path key={d} d={d} className="draw-in" pathLength={1} />
        ))}
      </g>
      {/* Direction arrows just after each gap */}
      <g
        fill="none"
        className="stroke-ink"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {gaps.map((g) => {
          const [x, y] = onCircle(RING, g + 6);
          return (
            <path
              key={g}
              d="M-7 -6.5 L1 0 L-7 6.5"
              transform={`translate(${f(x)} ${f(y)}) rotate(${g + 6 + 90})`}
            />
          );
        })}
      </g>

      {/* Inner hairline: where the practices meet */}
      <circle
        cx={C}
        cy={C}
        r={182}
        fill="none"
        className="stroke-line"
        strokeWidth="1"
        strokeDasharray="2 6"
      />

      {/* Practices: three overlapping circles (multiply blend darkens where they overlap) */}
      <g style={{ mixBlendMode: "multiply" }}>
        {practices.map((p) => {
          const [cx, cy] = onCircle(LOBE_OFFSET, p.angle);
          return (
            <circle
              key={p.id}
              cx={f(cx)}
              cy={f(cy)}
              r={LOBE_R}
              className={p.id === "data" ? "fill-paper-deep" : "fill-[#f1eee7]"}
            />
          );
        })}
      </g>
      <g fill="none" className="stroke-ink" strokeWidth="1.25">
        {practices.map((p) => {
          const [cx, cy] = onCircle(LOBE_OFFSET, p.angle);
          return <circle key={p.id} cx={f(cx)} cy={f(cy)} r={LOBE_R} />;
        })}
      </g>
      {practices.map((p) => {
        const [tx, ty] = onCircle(LOBE_OFFSET + 46, p.angle);
        return (
          <g key={p.id}>
            <g className="max-sm:hidden">
              {p.lines.map((line, i) => (
                <text
                  key={line}
                  x={f(tx)}
                  y={f(ty - 4 + i * 18)}
                  textAnchor="middle"
                  className="fill-ink text-[14.5px] font-semibold tracking-[-0.01em]"
                >
                  {line}
                </text>
              ))}
            </g>
            <text
              x={f(tx)}
              y={f(ty + 9)}
              textAnchor="middle"
              className="fill-ink text-[26px] font-semibold tracking-[-0.01em] sm:hidden"
            >
              {p.short}
            </text>
          </g>
        );
      })}

      {/* Hub: outcomes */}
      <circle cx={C} cy={C} r={38} className="fill-ink" />
      <circle cx={C} cy={C - 15} r={4.5} className="fill-logo-red" />
      <g className="max-sm:hidden">
        <text
          x={C}
          y={C + 5}
          textAnchor="middle"
          className="fill-night-text font-mono text-[9.5px] uppercase tracking-[0.08em]"
        >
          Customer
        </text>
        <text
          x={C}
          y={C + 17}
          textAnchor="middle"
          className="fill-night-text font-mono text-[9.5px] uppercase tracking-[0.08em]"
        >
          outcomes
        </text>
      </g>

      {/* Stage labels sit on the ring */}
      {stages.map((s) => {
        const [x, y] = onCircle(RING, s.angle);
        const w = s.label.length * 8.6 + 30;
        return (
          <g key={s.label}>
            <circle cx={f(x)} cy={f(y)} r="9" className="fill-paper stroke-ink sm:hidden" strokeWidth="2" />
            <g className="max-sm:hidden">
              <rect
                x={f(x - w / 2)}
                y={f(y - 15)}
                width={f(w)}
                height="30"
                rx="15"
                className="fill-paper stroke-ink"
                strokeWidth="1.25"
              />
              <text
                x={f(x)}
                y={f(y + 4.5)}
                textAnchor="middle"
                className="fill-ink font-mono text-[12px] uppercase tracking-[0.08em]"
              >
                {s.label}
              </text>
            </g>
          </g>
        );
      })}

      {/* Travelling signal around the loop — hidden when reduced motion is requested */}
      <g className="motion-reduce:hidden">
        <circle r="5.5" className="fill-logo-red">
          <animateMotion dur="14s" repeatCount="indefinite" path={loopPath} />
        </circle>
      </g>
    </svg>
  );
}

/** Labels for the HTML legend shown under the diagram on small screens. */
export const heroVisualLegend = {
  practices: practices.map((p) => p.lines.join(" ")),
  stages: stages.map((s) => s.label),
};
