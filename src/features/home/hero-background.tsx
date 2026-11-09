import type { CSSProperties } from "react";
import { HeroPointerLight } from "./hero-pointer-light";
import styles from "./hero.module.css";

const GRID = 56; // px, matches background-size in hero.module.css

/**
 * Where the travelling highlights run: horizontal rows (n·56px from the top) and vertical columns (centre ± n·56px).
 * Kept clear of the headline and lead: one row near the foot of the hero, two columns either side of the capability
 * map (lg up only; see hero.module.css).
 */
const pulses: { axis: "x" | "y"; at: number; duration: number; delay: number }[] = [
  { axis: "x", at: 13, duration: 22, delay: 3 },
  { axis: "y", at: 1, duration: 26, delay: 9 },
  { axis: "y", at: 11, duration: 24, delay: 16 },
];

type PulseStyle = CSSProperties & Record<"--pulse-duration" | "--pulse-delay", string>;

function pulseStyle(p: (typeof pulses)[number]): PulseStyle {
  return {
    ...(p.axis === "x" ? { top: p.at * GRID } : { left: `calc(50% + ${p.at * GRID}px)` }),
    "--pulse-duration": `${p.duration}s`,
    "--pulse-delay": `${p.delay}s`,
  };
}

/**
 * Decorative dark hero backdrop (CSS only, aria-hidden): a slow-drifting red aurora and warm light behind the
 * capability map, a fine grid that fades towards the edges, a few red highlights travelling along grid lines,
 * and (fine pointers only) a soft light that follows the cursor. Transforms and opacity only, no blur filters;
 * static under prefers-reduced-motion and fully rendered without JavaScript.
 */
export function HeroBackground() {
  return (
    <div aria-hidden className={styles.backdrop}>
      <div className={styles.light} />
      <div className={styles.ember} />
      <div className={styles.glow} />
      <div className={styles.gridMask}>
        <div className={styles.grid} />
        {pulses.map((p) => (
          <span
            key={`${p.axis}${p.at}`}
            className={p.axis === "x" ? styles.pulseX : styles.pulseY}
            style={pulseStyle(p)}
          />
        ))}
        <HeroPointerLight className={styles.spot} gridClassName={styles.spotGrid} grid={GRID} />
      </div>
      <div className={styles.foot} />
    </div>
  );
}
