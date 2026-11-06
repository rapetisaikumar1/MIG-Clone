import type { CSSProperties } from "react";
import { HeroDataField } from "./hero-data-field";
import { HeroPointerLight } from "./hero-pointer-light";
import styles from "./hero.module.css";

const GRID = 56; // px, matches background-size in hero.module.css

/** Where the travelling highlights run: horizontal rows (n·56px from the top) and vertical columns (centre ± n·56px). */
// Kept clear of the headline and lead: one row below the actions, two columns on the diagram side (lg up only; see hero.module.css).
const pulses: { axis: "x" | "y"; at: number; duration: number; delay: number }[] = [
  { axis: "x", at: 13, duration: 18, delay: 2 },
  { axis: "y", at: 4, duration: 22, delay: 7 },
  { axis: "y", at: 10, duration: 20, delay: 13 },
];

type PulseStyle = CSSProperties & Record<"--pulse-duration" | "--pulse-delay", string>;

/** Grid intersections (column offset from centre, row from top, in grid steps) where a signal node glows in turn. */
const nodes: { col: number; row: number; delay: number }[] = [
  { col: 4, row: 3, delay: 0 },
  { col: 10, row: 5, delay: 1.8 },
  { col: 7, row: 11, delay: 3.5 },
  { col: 12, row: 9, delay: 5.2 },
];

function pulseStyle(p: (typeof pulses)[number]): PulseStyle {
  return {
    ...(p.axis === "x" ? { top: p.at * GRID } : { left: `calc(50% + ${p.at * GRID}px)` }),
    "--pulse-duration": `${p.duration}s`,
    "--pulse-delay": `${p.delay}s`,
  };
}

/**
 * Decorative dark hero backdrop: a soft light behind the diagram, a drifting red aurora and warm glow,
 * a "data city" field of streaming red data points converging on the diagram (see HeroDataField),
 * a fine grid that fades towards the edges, red highlights travelling along grid lines, signal nodes
 * that glow in turn, and (fine pointers only) a soft light that follows the cursor. Static under
 * prefers-reduced-motion; fully rendered without JavaScript.
 */
export function HeroBackground() {
  return (
    <div aria-hidden className={styles.backdrop}>
      <div className={styles.light} />
      <div className={styles.ember} />
      <div className={styles.glow} />
      <HeroDataField className={styles.field} />
      <div className={styles.gridMask}>
        <div className={styles.grid} />
        {pulses.map((p) => (
          <span
            key={`${p.axis}${p.at}`}
            className={p.axis === "x" ? styles.pulseX : styles.pulseY}
            style={pulseStyle(p)}
          />
        ))}
        {nodes.map((n) => (
          <span
            key={`${n.col}-${n.row}`}
            className={styles.node}
            style={{ left: `calc(50% + ${GRID / 2 + n.col * GRID}px)`, top: n.row * GRID, ["--node-delay" as string]: `${n.delay}s` }}
          />
        ))}
        <HeroPointerLight className={styles.spot} gridClassName={styles.spotGrid} grid={GRID} />
      </div>
      <div className={styles.foot} />
    </div>
  );
}
