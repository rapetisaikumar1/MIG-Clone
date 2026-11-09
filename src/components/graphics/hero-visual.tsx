import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * Home hero illustration: the platform we build, as an isometric stack of three layers.
 *   - Foundation (base): cloud & engineering, shown as compute blocks.
 *   - Data & AI (middle): a governed data store with connected sources and models.
 *   - Experience (top, lit): applications and digital experiences, shown as upright screens.
 * Light beams carry data upward from layer to layer, and a governance frame (corner rails with a checkpoint at
 * every layer) wraps the whole stack: AI and data governance applies across every layer.
 *
 * The SVG is decorative; the labels that name each layer are HTML links laid over it by the caller
 * (see `src/features/home/hero/capability-map.tsx`), positioned from `heroVisualAnchors` below.
 * Colors come from the site tokens. Motion (a slow float and rising pulses) lives in the caller's CSS module and
 * only runs when motion is allowed.
 */

export const HERO_VISUAL_WIDTH = 650;
export const HERO_VISUAL_HEIGHT = 584;
/** Width of the stack alone (the area left of the leader lines), for layouts that show the stack without labels. */
export const HERO_VISUAL_STACK_WIDTH = 362;

const CX = 180; // stack centre line
const A = 84; // half-depth of a plate: its top face is a rhombus 2·A tall and 2·√3·A wide
const K = A * Math.sqrt(3);
const T = 12; // plate thickness
const LEVEL = { experience: 204, data: 334, foundation: 464 } as const;
const FRAME = { top: 64, bottom: 488, half: 100 } as const; // governance frame: rail heights and half-depth
const FRAME_K = FRAME.half * Math.sqrt(3);
const LEADER_END = 372;

export type HeroLayerId = keyof typeof LEVEL | "governance";

/** Where each layer's leader line ends (viewBox units); the caller places that layer's label there. */
export const heroVisualAnchors: Record<HeroLayerId, { x: number; y: number }> = {
  governance: { x: LEADER_END, y: FRAME.top },
  experience: { x: LEADER_END, y: LEVEL.experience },
  data: { x: LEADER_END, y: LEVEL.data },
  foundation: { x: LEADER_END, y: LEVEL.foundation },
};

type Pt = readonly [number, number];
const f = (n: number) => n.toFixed(1);
const pts = (...ps: Pt[]) => ps.map(([x, y]) => `${f(x)},${f(y)}`).join(" ");
/** A point on a plate's top face: u runs to the front right, v to the front left, both in [-1, 1]. */
const at = (cy: number, u: number, v: number, lift = 0): Pt => [CX + ((u - v) * K) / 2, cy + ((u + v) * A) / 2 - lift];
const down = ([x, y]: Pt, d: number): Pt => [x, y + d];
const up = ([x, y]: Pt, d: number): Pt => [x, y - d];
const line = ([x1, y1]: Pt, [x2, y2]: Pt) => `M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`;

/** Where the beams rise between layers (left, front, right of each plate). */
const BEAMS = [
  { u: -0.6, v: 0.62, delay: 0 },
  { u: 0.66, v: 0.66, delay: 1.4 },
  { u: 0.62, v: -0.6, delay: 2.6 },
] as const;

type PulseStyle = CSSProperties & Record<"--rise" | "--delay", string>;

function Plate({ id, lit = false, children }: { id: keyof typeof LEVEL; lit?: boolean; children?: ReactNode }) {
  const cy = LEVEL[id];
  const t = at(cy, -1, -1);
  const r = at(cy, 1, -1);
  const b = at(cy, 1, 1);
  const l = at(cy, -1, 1);
  const grid = [-0.5, 0, 0.5];
  return (
    <g data-plate={id} data-lit={lit || undefined}>
      {/* Side faces, then the top face. */}
      <polygon points={pts(l, b, down(b, T), down(l, T))} className="fill-night-raised" />
      <polygon points={pts(l, b, down(b, T), down(l, T))} fill="url(#hv-side-left)" />
      <polygon points={pts(b, r, down(r, T), down(b, T))} className="fill-night" />
      <polygon points={pts(b, r, down(r, T), down(b, T))} fill="url(#hv-side-right)" />
      <polygon points={pts(t, r, b, l)} className="fill-night-raised" />
      <polygon points={pts(t, r, b, l)} fill={lit ? "url(#hv-top-lit)" : "url(#hv-top)"} />
      <path
        d={grid.map((g) => line(at(cy, g, -1), at(cy, g, 1)) + line(at(cy, -1, g), at(cy, 1, g))).join("")}
        fill="none"
        className="stroke-night-text/[0.07]"
        strokeWidth="1"
      />
      {/* Edges: a fine outline, a brighter front rim, and the plate's lower edge. */}
      <polygon points={pts(t, r, b, l)} fill="none" className="stroke-night-text/20" strokeWidth="1" />
      <path
        data-rim
        d={`M${pts(l, b, r)}`}
        fill="none"
        className={lit ? "stroke-logo-red/80" : "stroke-night-text/45"}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d={`M${pts(down(l, T), down(b, T), down(r, T))}`} fill="none" className="stroke-night-text/10" strokeWidth="1" />
      {children}
    </g>
  );
}

/** Foundation: compute blocks, back to front. */
function Blocks() {
  const cy = LEVEL.foundation;
  const c = 0.17;
  const cells: [number, number, number][] = [
    [-0.55, -0.55, 18],
    [-0.05, -0.55, 26],
    [0.45, -0.6, 14],
    [-0.55, -0.05, 22],
    [-0.05, -0.05, 14],
    [0.3, 0.12, 20],
    [-0.15, 0.4, 12],
  ];
  return (
    <g>
      {cells
        .sort((p, q) => p[0] + p[1] - (q[0] + q[1]))
        .map(([u, v, h]) => {
          const tb = at(cy, u - c, v - c, h);
          const tr = at(cy, u + c, v - c, h);
          const tf = at(cy, u + c, v + c, h);
          const tl = at(cy, u - c, v + c, h);
          const bf = at(cy, u + c, v + c);
          const bl = at(cy, u - c, v + c);
          const br = at(cy, u + c, v - c);
          return (
            <g key={`${u}${v}`}>
              <polygon points={pts(tl, tf, bf, bl)} className="fill-night-raised" />
              <polygon points={pts(tl, tf, bf, bl)} className="fill-night-text/[0.06]" />
              <polygon points={pts(tf, tr, br, bf)} className="fill-night" />
              <polygon points={pts(tb, tr, tf, tl)} className="fill-night-raised stroke-night-text/35" strokeWidth="0.9" />
              <polygon points={pts(tb, tr, tf, tl)} className="fill-night-text/[0.1]" />
              <path d={line(tf, bf)} className="stroke-night-text/25" strokeWidth="0.9" />
            </g>
          );
        })}
    </g>
  );
}

/** Data & AI: a data store at the centre, linked to sources and models on the plate. */
function DataStore() {
  const cy = LEVEL.data;
  const [x, y] = at(cy, 0, 0);
  const rx = 27;
  const ry = 15.5;
  const h = 30;
  const nodes: [number, number, boolean][] = [
    [-0.62, -0.3, false],
    [-0.25, -0.7, true],
    [0.55, -0.12, false],
    [0.2, 0.62, true],
    [-0.62, 0.32, false],
  ];
  return (
    <g>
      <path
        d={nodes.map(([u, v]) => line(at(cy, u, v), [x, y])).join("")}
        fill="none"
        className="stroke-night-text/30"
        strokeWidth="0.9"
        strokeDasharray="2 3"
      />
      {nodes.map(([u, v, ai]) => {
        const [nx, ny] = at(cy, u, v);
        return (
          <g key={`${u}${v}`}>
            <ellipse cx={nx} cy={ny} rx="7.5" ry="4.3" className={ai ? "fill-logo-red/20" : "fill-night-text/10"} />
            <ellipse cx={nx} cy={ny} rx="3.4" ry="2" className={ai ? "fill-logo-red" : "fill-night-text/80"} />
          </g>
        );
      })}
      {/* Cylinder: body, lower rim, top face with two ring lines. */}
      <path
        d={`M${f(x - rx)} ${f(y)}V${f(y - h)}A${rx} ${ry} 0 0 0 ${f(x + rx)} ${f(y - h)}V${f(y)}A${rx} ${ry} 0 0 1 ${f(x - rx)} ${f(y)}Z`}
        className="fill-night-raised"
      />
      <path
        d={`M${f(x - rx)} ${f(y)}V${f(y - h)}A${rx} ${ry} 0 0 0 ${f(x + rx)} ${f(y - h)}V${f(y)}A${rx} ${ry} 0 0 1 ${f(x - rx)} ${f(y)}Z`}
        fill="url(#hv-cylinder)"
        className="stroke-night-text/35"
        strokeWidth="0.9"
      />
      <path d={`M${f(x - rx)} ${f(y - h / 2)}A${rx} ${ry} 0 0 0 ${f(x + rx)} ${f(y - h / 2)}`} fill="none" className="stroke-night-text/25" strokeWidth="0.9" />
      <ellipse cx={x} cy={y - h} rx={rx} ry={ry} className="fill-night-raised stroke-night-text/50" strokeWidth="0.9" />
      <ellipse cx={x} cy={y - h} rx={rx * 0.55} ry={ry * 0.55} className="fill-logo-red/25 stroke-logo-red/70" strokeWidth="0.9" />
    </g>
  );
}

/** Experience: upright screens (applications and digital experiences), back to front. */
function Screens() {
  const cy = LEVEL.experience;
  const panels = [
    { v: -0.62, u0: -0.6, u1: 0.3, h: 50 },
    { v: -0.02, u0: -0.5, u1: 0.42, h: 58 },
    { v: 0.58, u0: -0.42, u1: 0.5, h: 46, accent: true },
  ];
  return (
    <g>
      {panels.map(({ v, u0, u1, h, accent }) => {
        const p0 = at(cy, u0, v);
        const p1 = at(cy, u1, v);
        const row = (from: number, to: number, lift: number) => line(at(cy, u0 + (u1 - u0) * from, v, lift), at(cy, u0 + (u1 - u0) * to, v, lift));
        return (
          <g key={v}>
            <polygon points={pts(p0, p1, up(p1, h), up(p0, h))} className="fill-night-raised" />
            <polygon points={pts(p0, p1, up(p1, h), up(p0, h))} className="fill-night-text/[0.07] stroke-night-text/40" strokeWidth="0.9" />
            {/* Title bar and content lines. */}
            <path d={row(0.08, 0.3, h - 8)} className={accent ? "stroke-logo-red" : "stroke-night-text/60"} strokeWidth="2.2" strokeLinecap="round" />
            <path d={row(0.08, 0.86, h - 19) + row(0.08, 0.64, h - 27) + row(0.08, 0.74, h - 35)} className="stroke-night-text/25" strokeWidth="1.6" strokeLinecap="round" />
            <path d={line(p0, p1)} className="stroke-night-text/40" strokeWidth="0.9" />
          </g>
        );
      })}
    </g>
  );
}

/** Small ring where a beam reaches the plate above. */
function Landing({ cy, u, v }: { cy: number; u: number; v: number }) {
  const [x, y] = at(cy, u, v);
  return (
    <g>
      <ellipse cx={x} cy={y} rx="9" ry="5.2" className="fill-logo-red/15 stroke-logo-red/50" strokeWidth="0.8" />
      <ellipse cx={x} cy={y} rx="2.6" ry="1.5" className="fill-logo-red" />
    </g>
  );
}

/** Beams between two plates, with a pulse rising along each (the pulse animates only when motion is allowed). */
function Beams({ from, to, pulseClassName }: { from: number; to: number; pulseClassName?: string }) {
  return (
    <g>
      {BEAMS.map(({ u, v, delay }) => {
        const [x, y0] = at(from, u, v);
        const [, y1] = at(to, u, v);
        return (
          <g key={`${u}${v}`}>
            {/* A thin rect, not a stroked line: a gradient needs a non-zero-width bounding box. */}
            <rect x={x - 0.75} y={y1} width="1.5" height={y0 - y1} fill="url(#hv-beam)" />
            <ellipse cx={x} cy={y0} rx="5" ry="2.9" className="fill-logo-red/30" />
            <circle
              cx={x}
              cy={y0}
              r="2.2"
              className={cn("fill-logo-red", pulseClassName)}
              style={{ "--rise": `${f(y1 - y0)}px`, "--delay": `${delay + (from === LEVEL.data ? 0.7 : 0)}s` } as PulseStyle}
            />
          </g>
        );
      })}
    </g>
  );
}

/** Governance frame: rails at the left, back and right corners, a faint top and bottom, and a checkpoint per layer. */
function GovernanceFrame({ front }: { front: boolean }) {
  const left = CX - FRAME_K;
  const right = CX + FRAME_K;
  if (!front) {
    // The back rail sits behind every plate.
    return <path d={`M${CX} ${FRAME.top - FRAME.half}V${FRAME.bottom - FRAME.half}`} className="stroke-night-text/15" strokeWidth="1" strokeDasharray="3 5" />;
  }
  return (
    <g data-frame>
      <path
        d={`M${f(left)} ${FRAME.top}V${FRAME.bottom}M${f(right)} ${FRAME.top}V${FRAME.bottom}`}
        className="stroke-night-text/30"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
      {/* Faint dotted outline of the frame's top and bottom, so the rails read as one enclosing box. */}
      <path
        d={[FRAME.top, FRAME.bottom]
          .map((y) => `M${f(left)} ${y}L${CX} ${y - FRAME.half}L${f(right)} ${y}L${CX} ${y + FRAME.half}Z`)
          .join("")}
        fill="none"
        className="stroke-night-text/[0.16]"
        strokeWidth="1"
        strokeDasharray="2 5"
      />
      {Object.values(LEVEL).flatMap((y) =>
        [left, right].map((x) => (
          <g key={`${x}${y}`}>
            <circle cx={x} cy={y} r="5.5" className="fill-night stroke-logo-red/60" strokeWidth="1" />
            <circle cx={x} cy={y} r="1.8" className="fill-logo-red" />
          </g>
        )),
      )}
    </g>
  );
}

/** Leader lines from each layer to where its label sits. */
function Leaders() {
  const starts: Record<HeroLayerId, Pt> = {
    governance: [CX + FRAME_K, FRAME.top],
    experience: at(LEVEL.experience, 1, -1),
    data: at(LEVEL.data, 1, -1),
    foundation: at(LEVEL.foundation, 1, -1),
  };
  return (
    <g>
      {(Object.keys(starts) as HeroLayerId[]).map((id) => {
        const [x, y] = starts[id];
        const start = id === "governance" ? x + 8 : x + 4;
        return (
          <g key={id} data-leader={id}>
            <path d={`M${f(start)} ${f(y)}H${LEADER_END - 6}`} className="stroke-night-text/30" strokeWidth="1" />
            <circle cx={LEADER_END - 3} cy={y} r="2" className="fill-night-text/60" />
          </g>
        );
      })}
    </g>
  );
}

export function HeroVisual({
  className,
  floatClassName,
  pulseClassName,
}: {
  className?: string;
  /** Applied to the stack group (slow float when motion is allowed). */
  floatClassName?: string;
  /** Applied to each rising pulse. */
  pulseClassName?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${HERO_VISUAL_WIDTH} ${HERO_VISUAL_HEIGHT}`}
      aria-hidden
      focusable="false"
      className={cn("block h-auto w-full overflow-visible", className)}
    >
      <defs>
        <linearGradient id="hv-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--night-text)", stopOpacity: 0.09 }} />
          <stop offset="1" style={{ stopColor: "var(--night-text)", stopOpacity: 0.02 }} />
        </linearGradient>
        <linearGradient id="hv-top-lit" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" style={{ stopColor: "var(--night-text)", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "var(--logo-red)", stopOpacity: 0.16 }} />
        </linearGradient>
        <linearGradient id="hv-side-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--night-text)", stopOpacity: 0.08 }} />
          <stop offset="1" style={{ stopColor: "var(--night-text)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id="hv-side-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "#000", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "#000", stopOpacity: 0.3 }} />
        </linearGradient>
        <linearGradient id="hv-cylinder" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--night-text)", stopOpacity: 0.12 }} />
          <stop offset="0.6" style={{ stopColor: "var(--night-text)", stopOpacity: 0.03 }} />
          <stop offset="1" style={{ stopColor: "#000", stopOpacity: 0.2 }} />
        </linearGradient>
        <linearGradient id="hv-beam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" style={{ stopColor: "var(--logo-red)", stopOpacity: 0.7 }} />
          <stop offset="1" style={{ stopColor: "var(--logo-red)", stopOpacity: 0.1 }} />
        </linearGradient>
        <radialGradient id="hv-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0" style={{ stopColor: "var(--logo-red)", stopOpacity: 0.22 }} />
          <stop offset="0.55" style={{ stopColor: "var(--logo-red)", stopOpacity: 0.06 }} />
          <stop offset="1" style={{ stopColor: "var(--logo-red)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id="hv-floor" cx="50%" cy="50%" r="50%">
          <stop offset="0" style={{ stopColor: "#000", stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: "#000", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Soft red light behind the stack and a shadow under it. */}
      <ellipse cx={CX} cy={LEVEL.data - 20} rx="250" ry="210" fill="url(#hv-halo)" />
      <ellipse cx={CX} cy={LEVEL.foundation + A + 26} rx="190" ry="44" fill="url(#hv-floor)" />

      <g className={floatClassName}>
        <GovernanceFrame front={false} />
        <Plate id="foundation">
          <Blocks />
        </Plate>
        <Beams from={LEVEL.foundation} to={LEVEL.data} pulseClassName={pulseClassName} />
        <Plate id="data">
          {BEAMS.map(({ u, v }) => (
            <Landing key={`${u}${v}`} cy={LEVEL.data} u={u} v={v} />
          ))}
          <DataStore />
        </Plate>
        <Beams from={LEVEL.data} to={LEVEL.experience} pulseClassName={pulseClassName} />
        <Plate id="experience" lit>
          {BEAMS.map(({ u, v }) => (
            <Landing key={`${u}${v}`} cy={LEVEL.experience} u={u} v={v} />
          ))}
          <Screens />
        </Plate>
        <GovernanceFrame front />
        <Leaders />
      </g>
    </svg>
  );
}
