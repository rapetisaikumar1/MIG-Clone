import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * Home hero illustration: the four core areas as one governed stack, top to bottom, in the order information
 * flows through an organization.
 *   - Records & information (top, lit): records filed in a drawer, one carrying a retention tab.
 *   - Data: a governed data store with its connected sources.
 *   - AI & models: a model chip wired into the plate.
 *   - Customer experience (MarTech, base): performance bars rising toward the front.
 * Light beams carry governed information down from layer to layer, and a governance frame (corner rails with a
 * checkpoint at every layer) wraps the whole stack: governance applies across every layer.
 *
 * The SVG is decorative; the labels that name each layer are HTML links laid over it by the caller
 * (see `src/features/home/hero/capability-map.tsx`), positioned from `heroVisualAnchors` below.
 * Colors come from the site tokens. Motion (a slow float and falling pulses) lives in the caller's CSS module and
 * only runs when motion is allowed.
 */

export const HERO_VISUAL_WIDTH = 650;
export const HERO_VISUAL_HEIGHT = 628;

const CX = 163; // stack centre line
const A = 68; // half-depth of a plate: its top face is a rhombus 2·A tall and 2·√3·A wide
const K = A * Math.sqrt(3);
const T = 10; // plate thickness
const LEVEL = { information: 178, data: 293, ai: 408, martech: 523 } as const;
const FRAME = { top: 98, bottom: 533, half: 84 } as const; // governance frame: rail heights and half-depth
const FRAME_K = FRAME.half * Math.sqrt(3);
const LEADER_END = 352;

export type HeroLayerId = keyof typeof LEVEL;

/** Where each layer's leader line ends (viewBox units); the caller places that layer's label there. */
export const heroVisualAnchors: Record<HeroLayerId, { x: number; y: number }> = {
  information: { x: LEADER_END, y: LEVEL.information },
  data: { x: LEADER_END, y: LEVEL.data },
  ai: { x: LEADER_END, y: LEVEL.ai },
  martech: { x: LEADER_END, y: LEVEL.martech },
};

type Pt = readonly [number, number];
const f = (n: number) => n.toFixed(1);
const pts = (...ps: Pt[]) => ps.map(([x, y]) => `${f(x)},${f(y)}`).join(" ");
/** A point on a plate's top face: u runs to the front right, v to the front left, both in [-1, 1]. */
const at = (cy: number, u: number, v: number, lift = 0): Pt => [CX + ((u - v) * K) / 2, cy + ((u + v) * A) / 2 - lift];
const down = ([x, y]: Pt, d: number): Pt => [x, y + d];
const up = ([x, y]: Pt, d: number): Pt => [x, y - d];
const line = ([x1, y1]: Pt, [x2, y2]: Pt) => `M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`;

/** Where the beams fall between layers (left, front, right of each plate). */
const BEAMS = [
  { u: -0.62, v: 0.62, delay: 0 },
  { u: 0.66, v: 0.66, delay: 1.4 },
  { u: 0.62, v: -0.62, delay: 2.6 },
] as const;

type PulseStyle = CSSProperties & Record<"--fall" | "--delay", string>;

function Plate({ id, lit = false, children }: { id: HeroLayerId; lit?: boolean; children?: ReactNode }) {
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

/** Records & information: record cards filed upright in a drawer, back to front; the front one carries a red retention tab. */
function Records() {
  const cy = LEVEL.information;
  const u0 = -0.5;
  const u1 = 0.46;
  const h = 38;
  const cards = [
    { v: -0.5, tab: 0.58 },
    { v: -0.14, tab: 0.32 },
    { v: 0.22, tab: 0.06, accent: true },
  ];
  const along = (v: number, s: number, lift: number) => at(cy, u0 + (u1 - u0) * s, v, lift);
  return (
    <g>
      {cards.map(({ v, tab, accent }) => {
        const p0 = at(cy, u0, v);
        const p1 = at(cy, u1, v);
        const tab0 = along(v, tab, h);
        const tab1 = along(v, tab + 0.26, h);
        const row = (from: number, to: number, lift: number) => line(along(v, from, lift), along(v, to, lift));
        return (
          <g key={v}>
            {/* Tab on the top edge, then the card. */}
            <polygon
              points={pts(tab0, tab1, up(tab1, 7), up(tab0, 7))}
              className={accent ? "fill-logo-red stroke-logo-red" : "fill-night-raised stroke-night-text/40"}
              strokeWidth="0.9"
            />
            <polygon points={pts(p0, p1, up(p1, h), up(p0, h))} className="fill-night-raised" />
            <polygon
              points={pts(p0, p1, up(p1, h), up(p0, h))}
              className={accent ? "fill-night-text/[0.1] stroke-night-text/55" : "fill-night-text/[0.06] stroke-night-text/35"}
              strokeWidth="0.9"
            />
            {accent ? (
              <path d={row(0.1, 0.78, h - 11) + row(0.1, 0.56, h - 19) + row(0.1, 0.68, h - 27)} className="stroke-night-text/30" strokeWidth="1.6" strokeLinecap="round" />
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

/** Data: a data store at the centre, linked to its sources on the plate. */
function DataStore() {
  const cy = LEVEL.data;
  const [x, y] = at(cy, 0, 0);
  const rx = 23;
  const ry = 13.3;
  const h = 18;
  const nodes: [number, number, boolean][] = [
    [-0.62, -0.25, false],
    [0.55, -0.15, false],
    [0.22, 0.62, true],
    [-0.6, 0.38, false],
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
      {nodes.map(([u, v, accent]) => {
        const [nx, ny] = at(cy, u, v);
        return (
          <g key={`${u}${v}`}>
            <ellipse cx={nx} cy={ny} rx="7" ry="4" className={accent ? "fill-logo-red/20" : "fill-night-text/10"} />
            <ellipse cx={nx} cy={ny} rx="3.2" ry="1.9" className={accent ? "fill-logo-red" : "fill-night-text/80"} />
          </g>
        );
      })}
      {/* Cylinder: body, a ring line, the top face. */}
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

/** AI & models: a model chip with pins on every side, wired to two nodes on the plate. */
function ModelChip() {
  const cy = LEVEL.ai;
  const s = 0.27; // half-size of the chip in plate units
  const lift = 7;
  const pins = [-0.14, 0, 0.14];
  const pinPaths = pins
    .map(
      (p) =>
        line(at(cy, p, -s - 0.13), at(cy, p, -s)) +
        line(at(cy, p, s), at(cy, p, s + 0.13)) +
        line(at(cy, -s - 0.13, p), at(cy, -s, p)) +
        line(at(cy, s, p), at(cy, s + 0.13, p)),
    )
    .join("");
  const traces: [Pt, Pt, Pt][] = [
    [at(cy, 0.14, s + 0.13), at(cy, 0.14, 0.62), at(cy, -0.3, 0.62)],
    [at(cy, s + 0.13, -0.14), at(cy, 0.64, -0.14), at(cy, 0.64, 0.3)],
  ];
  const tb = at(cy, -s, -s, lift);
  const tr = at(cy, s, -s, lift);
  const tf = at(cy, s, s, lift);
  const tl = at(cy, -s, s, lift);
  const c = 0.12;
  return (
    <g>
      <path d={pinPaths} className="stroke-night-text/45" strokeWidth="1.2" strokeLinecap="round" />
      <path d={traces.map(([a, b, e]) => `M${pts(a, b, e)}`).join("")} fill="none" className="stroke-night-text/30" strokeWidth="0.9" strokeDasharray="2 3" />
      {traces.map(([, , [x, y]], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="7" ry="4" className={i === 0 ? "fill-logo-red/20" : "fill-night-text/10"} />
          <ellipse cx={x} cy={y} rx="3.2" ry="1.9" className={i === 0 ? "fill-logo-red" : "fill-night-text/80"} />
        </g>
      ))}
      {/* Chip body: front faces, then the top with its core. */}
      <polygon points={pts(tl, tf, down(tf, lift), down(tl, lift))} className="fill-night-raised" />
      <polygon points={pts(tl, tf, down(tf, lift), down(tl, lift))} className="fill-night-text/[0.08]" />
      <polygon points={pts(tf, tr, down(tr, lift), down(tf, lift))} className="fill-night" />
      <polygon points={pts(tb, tr, tf, tl)} className="fill-night-raised stroke-night-text/45" strokeWidth="0.9" />
      <polygon points={pts(tb, tr, tf, tl)} className="fill-night-text/[0.08]" />
      <polygon
        points={pts(at(cy, -c, -c, lift), at(cy, c, -c, lift), at(cy, c, c, lift), at(cy, -c, c, lift))}
        className="fill-logo-red/25 stroke-logo-red/80"
        strokeWidth="0.9"
      />
    </g>
  );
}

/** Customer experience (MarTech): performance bars rising toward the front right, the tallest one lit, with a trend line. */
function PerformanceBars() {
  const cy = LEVEL.martech;
  const c = 0.14;
  const bars: [number, number, number][] = [
    [-0.54, 0.1, 12],
    [-0.18, 0.1, 21],
    [0.18, 0.1, 30],
    [0.54, 0.1, 40],
  ];
  return (
    <g>
      {bars.map(([u, v, h], i) => {
        const lit = i === bars.length - 1;
        const tb = at(cy, u - c, v - c, h);
        const tr = at(cy, u + c, v - c, h);
        const tf = at(cy, u + c, v + c, h);
        const tl = at(cy, u - c, v + c, h);
        const bf = at(cy, u + c, v + c);
        const bl = at(cy, u - c, v + c);
        const br = at(cy, u + c, v - c);
        return (
          <g key={u}>
            <polygon points={pts(tl, tf, bf, bl)} className="fill-night-raised" />
            <polygon
              points={pts(tl, tf, bf, bl)}
              className={lit ? "fill-logo-red/45 stroke-logo-red/70" : "fill-night-text/[0.14] stroke-night-text/30"}
              strokeWidth="0.8"
            />
            <polygon points={pts(tf, tr, br, bf)} className="fill-night" />
            <polygon
              points={pts(tf, tr, br, bf)}
              className={lit ? "fill-logo-red/25 stroke-logo-red/60" : "fill-night-text/[0.04] stroke-night-text/25"}
              strokeWidth="0.8"
            />
            <polygon
              points={pts(tb, tr, tf, tl)}
              className={lit ? "fill-logo-red stroke-logo-red" : "fill-night-raised stroke-night-text/45"}
              strokeWidth="0.9"
            />
            {lit ? null : <polygon points={pts(tb, tr, tf, tl)} className="fill-night-text/[0.16]" />}
          </g>
        );
      })}
      {/* Trend line across the bar tops. */}
      <path
        d={`M${pts(...bars.map(([u, v, h]) => at(cy, u, v, h + 9)))}`}
        fill="none"
        className="stroke-logo-red/70"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      {bars.map(([u, v, h]) => {
        const [x, y] = at(cy, u, v, h + 9);
        return <circle key={u} cx={x} cy={y} r="2" className="fill-logo-red" />;
      })}
    </g>
  );
}

/** Small ring where a beam leaves a plate for the one below. */
function Outlet({ cy, u, v }: { cy: number; u: number; v: number }) {
  const [x, y] = at(cy, u, v);
  return (
    <g>
      <ellipse cx={x} cy={y} rx="8" ry="4.6" className="fill-logo-red/15 stroke-logo-red/50" strokeWidth="0.8" />
      <ellipse cx={x} cy={y} rx="2.4" ry="1.4" className="fill-logo-red" />
    </g>
  );
}

/**
 * Beams from a plate down to the plate below, with a pulse falling along each (animated only when motion is
 * allowed). Drawn before the upper plate, which covers the beam's start.
 */
function Beams({ from, to, pulseClassName }: { from: number; to: number; pulseClassName?: string }) {
  return (
    <g>
      {BEAMS.map(({ u, v, delay }) => {
        const [x, y0] = at(from, u, v);
        const [, y1] = at(to, u, v);
        return (
          <g key={`${u}${v}`}>
            {/* A thin rect, not a stroked line: a gradient needs a non-zero-width bounding box. */}
            <rect x={x - 0.75} y={y0} width="1.5" height={y1 - y0} fill="url(#hv-beam)" />
            <ellipse cx={x} cy={y1} rx="5" ry="2.9" className="fill-logo-red/30" />
            <circle
              cx={x}
              cy={y0 + T}
              r="2.2"
              className={cn("fill-logo-red", pulseClassName)}
              style={{ "--fall": `${f(y1 - y0 - T)}px`, "--delay": `${delay + (from - LEVEL.information) / 165}s` } as PulseStyle}
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
            <circle cx={x} cy={y} r="5" className="fill-night stroke-logo-red/60" strokeWidth="1" />
            <circle cx={x} cy={y} r="1.7" className="fill-logo-red" />
          </g>
        )),
      )}
    </g>
  );
}

/** Leader lines from each layer, past the frame's checkpoint, to where its label sits. */
function Leaders() {
  return (
    <g>
      {(Object.keys(LEVEL) as HeroLayerId[]).map((id) => {
        const y = LEVEL[id];
        return (
          <g key={id} data-leader={id}>
            <path d={`M${f(CX + FRAME_K + 8)} ${y}H${LEADER_END - 6}`} className="stroke-night-text/30" strokeWidth="1" />
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
  /** Applied to each falling pulse. */
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
        <linearGradient id="hv-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--logo-red)", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "var(--logo-red)", stopOpacity: 0.7 }} />
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
      <ellipse cx={CX} cy={(LEVEL.data + LEVEL.ai) / 2} rx="240" ry="250" fill="url(#hv-halo)" />
      <ellipse cx={CX} cy={LEVEL.martech + A + 24} rx="180" ry="40" fill="url(#hv-floor)" />

      <g className={floatClassName}>
        <GovernanceFrame front={false} />
        <Plate id="martech">
          <PerformanceBars />
        </Plate>
        <Beams from={LEVEL.ai} to={LEVEL.martech} pulseClassName={pulseClassName} />
        <Plate id="ai">
          {BEAMS.map(({ u, v }) => (
            <Outlet key={`${u}${v}`} cy={LEVEL.ai} u={u} v={v} />
          ))}
          <ModelChip />
        </Plate>
        <Beams from={LEVEL.data} to={LEVEL.ai} pulseClassName={pulseClassName} />
        <Plate id="data">
          {BEAMS.map(({ u, v }) => (
            <Outlet key={`${u}${v}`} cy={LEVEL.data} u={u} v={v} />
          ))}
          <DataStore />
        </Plate>
        <Beams from={LEVEL.information} to={LEVEL.data} pulseClassName={pulseClassName} />
        <Plate id="information" lit>
          {BEAMS.map(({ u, v }) => (
            <Outlet key={`${u}${v}`} cy={LEVEL.information} u={u} v={v} />
          ))}
          <Records />
        </Plate>
        <GovernanceFrame front />
        <Leaders />
      </g>
    </svg>
  );
}
