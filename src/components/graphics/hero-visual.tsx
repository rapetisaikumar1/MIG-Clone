import { cn } from "@/lib/utils";

/**
 * Signature illustration: how Maverick InnoGarage delivers, as a closed loop.
 * A closed-loop delivery diagram (outcome at the hub, contributing elements around it, an open enabling
 * ring at the edge): the specializations as three overlapping circles (data management at the base) with
 * customer and business outcomes where they meet, and the four delivery stages —
 * assess, design, implement, improve — as a continuous ring. Conceptual only: no metrics or simulated results.
 *
 * Labels adapt to the rendered size, not the viewport: the caller wraps the SVG in an `@container`, and
 * below ~31rem the diagram swaps to larger, shorter labels so nothing renders below a legible size.
 */

const C = 280; // centre
const RING = 226; // delivery-loop radius
const LOBE_OFFSET = 66; // distance from centre to each specialization circle's centre
const LOBE_R = 92; // specialization circle radius
const HUB_R = 44;
const HUB_R_COMPACT = 56;

const lobes = [
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

/** Mono label metrics (Geist Mono advance ≈ 0.6em, plus 0.08em tracking) → pill width. */
const pillWidth = (label: string, size: number, pad: number) => label.length * size * 0.68 + pad * 2;

// Container-size label switches (see the header comment).
const FULL = "@max-[31rem]:hidden";
const COMPACT = "@min-[31rem]:hidden";

export function HeroVisual({ className }: { className?: string }) {
  // The ring is drawn as four arcs with small gaps on the diagonals. Each arc ends in an arrowhead
  // pointing into the next gap, so the direction of travel reads assess → design → implement → improve.
  const gaps = [-45, 45, 135, 225];
  const arcs = gaps.map((g, i) => {
    const end = (gaps[(i + 1) % gaps.length] ?? 0) + (i === gaps.length - 1 ? 360 : 0) - 5;
    return { d: arc(g + 5, end), end };
  });
  const loopPath = `M${C} ${C - RING} A${RING} ${RING} 0 1 1 ${C - 0.01} ${C - RING}`;

  return (
    <svg
      viewBox="-12 -12 584 584"
      role="img"
      aria-labelledby="hero-visual-title hero-visual-desc"
      className={cn("isolate h-auto w-full overflow-visible", className)}
    >
      <title id="hero-visual-title">
        How we deliver: connected specializations around your outcomes, in a
        continuous loop
      </title>
      <desc id="hero-visual-desc">
        A closed-loop model. At the center are customer and business outcomes.
        Around them sit connected specializations, drawn as three overlapping circles:
        data management at the base, with AI governance and Adobe services above
        it. An outer ring shows the four delivery stages in a continuous cycle:
        assess, design, implement and improve, then back to assess.
      </desc>

      <defs>
        {/* A soft lit disc behind the model lifts it off the background grid (gradient only, no filter). */}
        <radialGradient id="hero-visual-stage" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f1efe9" stopOpacity="0.07" />
          <stop offset="62%" stopColor="#f1efe9" stopOpacity="0.035" />
          <stop offset="100%" stopColor="#f1efe9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={C} cy={C} r={RING + 40} fill="url(#hero-visual-stage)" />

      {/* Outer ring: delivery loop */}
      <g fill="none" className="stroke-night-text/85" strokeLinecap="round">
        {arcs.map(({ d }) => (
          <path key={d} d={d} pathLength={1} className="draw-in [stroke-width:1.5] @max-[31rem]:[stroke-width:2]" />
        ))}
      </g>
      {/* Arrowheads at the end of each arc, fading in once the ring has drawn (larger when compact) */}
      <g
        fill="none"
        className="stroke-night-text/85 motion-safe:animate-[fade-in_600ms_ease-out_1.35s_both]"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {arcs.map(({ end }) => {
          const tip = end + 1.6;
          const [x, y] = onCircle(RING, tip);
          const at = `translate(${f(x)} ${f(y)}) rotate(${f(tip + 90)})`;
          return (
            <g key={end} transform={at}>
              <path d="M-7.5 -6 L0 0 L-7.5 6" strokeWidth="1.6" className={FULL} />
              <path d="M-11 -9 L0 0 L-11 9" strokeWidth="2.4" className={COMPACT} />
            </g>
          );
        })}
      </g>

      {/* Inner hairline: where the specializations meet. Turns very slowly, like the loop around it. */}
      <circle
        cx={C}
        cy={C}
        r={182}
        fill="none"
        className="stroke-night-text/30 [transform-box:fill-box] [transform-origin:center] motion-safe:animate-[spin_160s_linear_infinite]"
        strokeWidth="1"
        strokeDasharray="2 7"
      />

      {/* Specializations: three overlapping circles (screen blend lightens where they overlap on the dark stage) */}
      <g style={{ mixBlendMode: "screen" }}>
        {lobes.map((p) => {
          const [cx, cy] = onCircle(LOBE_OFFSET, p.angle);
          return (
            <circle
              key={p.id}
              cx={f(cx)}
              cy={f(cy)}
              r={LOBE_R}
              className={p.id === "data" ? "fill-night-text/[0.1]" : "fill-night-text/[0.07]"}
            />
          );
        })}
      </g>
      <g fill="none" className="stroke-night-text/70" strokeWidth="1.25">
        {lobes.map((p) => {
          const [cx, cy] = onCircle(LOBE_OFFSET, p.angle);
          return <circle key={p.id} cx={f(cx)} cy={f(cy)} r={LOBE_R} />;
        })}
      </g>
      {lobes.map((p) => {
        const [tx, ty] = onCircle(LOBE_OFFSET + 46, p.angle);
        return (
          <g key={p.id}>
            <g className={FULL}>
              {p.lines.map((line, i) => (
                <text
                  key={line}
                  x={f(tx)}
                  y={f(ty - 4 + i * 19)}
                  textAnchor="middle"
                  className="fill-night-text text-[15.5px] font-semibold tracking-[-0.01em]"
                >
                  {line}
                </text>
              ))}
            </g>
            <text
              x={f(tx)}
              y={f(ty + 9)}
              textAnchor="middle"
              className={cn("fill-night-text text-[27px] font-semibold tracking-[-0.015em]", COMPACT)}
            >
              {p.short}
            </text>
          </g>
        );
      })}

      {/* Hub: outcomes */}
      <g className={FULL}>
        <circle cx={C} cy={C} r={HUB_R + 7} className="fill-night/80" />
        <circle cx={C} cy={C} r={HUB_R} className="fill-night-text" />
        <circle cx={C} cy={C - 18} r={4.5} className="fill-logo-red" />
        <g className="fill-night font-mono text-[11.5px] uppercase tracking-[0.06em]">
          <text x={C} y={C + 4} textAnchor="middle">
            Customer
          </text>
          <text x={C} y={C + 18} textAnchor="middle">
            outcomes
          </text>
        </g>
      </g>
      {/* Compact hub: a little larger, with a one-word label, so the centre never reads as an unlabelled dot */}
      <g className={COMPACT}>
        <circle cx={C} cy={C} r={HUB_R_COMPACT + 7} className="fill-night/80" />
        <circle cx={C} cy={C} r={HUB_R_COMPACT} className="fill-night-text" />
        <circle cx={C} cy={C - 22} r={5.5} className="fill-logo-red" />
        <text
          x={C}
          y={C + 15}
          textAnchor="middle"
          className="fill-night text-[19px] font-semibold tracking-[-0.01em]"
        >
          Outcomes
        </text>
      </g>

      {/* Travelling signal around the loop, drawn before the stage pills so it passes beneath them.
          Hidden when reduced motion is requested. */}
      <g className="motion-reduce:hidden">
        <circle r="11" className="fill-logo-red" opacity="0.14" />
        <circle r="5.5" className="fill-logo-red" />
        <animateMotion dur="14s" repeatCount="indefinite" path={loopPath} />
      </g>

      {/* Stage labels sit on the ring */}
      {stages.map((s) => {
        const [x, y] = onCircle(RING, s.angle);
        const w = pillWidth(s.label, 12.5, 15);
        const cw = pillWidth(s.label, 19, 15);
        return (
          <g key={s.label}>
            <g className={FULL}>
              <rect
                x={f(x - w / 2)}
                y={f(y - 15.5)}
                width={f(w)}
                height="31"
                rx="15.5"
                className="fill-night-raised stroke-night-text/70"
                strokeWidth="1.25"
              />
              <text
                x={f(x)}
                y={f(y + 4.5)}
                textAnchor="middle"
                className="fill-night-text font-mono text-[12.5px] uppercase tracking-[0.08em]"
              >
                {s.label}
              </text>
            </g>
            <g className={COMPACT}>
              <rect
                x={f(x - cw / 2)}
                y={f(y - 20)}
                width={f(cw)}
                height="40"
                rx="20"
                className="fill-night-raised stroke-night-text/70"
                strokeWidth="1.75"
              />
              <text
                x={f(x)}
                y={f(y + 6.5)}
                textAnchor="middle"
                className="fill-night-text font-mono text-[19px] uppercase tracking-[0.08em]"
              >
                {s.label}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
