import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HERO_VISUAL_HEIGHT, HERO_VISUAL_WIDTH, HeroVisual, heroVisualAnchors } from "@/components/graphics/hero-visual";
import { heroLayers } from "@/content/home";
import styles from "./capability-map.module.css";

type LabelStyle = CSSProperties & Record<"--x" | "--y", string>;

/**
 * The hero's capability map: the governed stack illustration (decorative) with four linked labels, one per core
 * area, in reading order (information, data, AI, MarTech). Wide containers lay the labels over the illustration
 * at the end of each leader line; narrow ones (phones) show the labels alone as a compact list of links.
 * Hovering or focusing a label lifts its layer in the illustration (CSS :has), so the link and the picture read
 * together.
 */
export function CapabilityMap({ className }: { className?: string }) {
  return (
    <div className={`${styles.host} ${className ?? ""}`}>
      <nav aria-label="Core expertise" className={styles.map}>
        <div className={styles.art}>
          <HeroVisual className={styles.svg} floatClassName={styles.float} pulseClassName={styles.pulse} />
        </div>
        <ul className={styles.labels}>
          {heroLayers.map((l) => {
            const a = heroVisualAnchors[l.id];
            const style: LabelStyle = {
              "--x": `${(a.x / HERO_VISUAL_WIDTH) * 100}%`,
              "--y": `${(a.y / HERO_VISUAL_HEIGHT) * 100}%`,
            };
            return (
              <li key={l.id} className={styles.label} style={style} data-layer={l.id}>
                <Link href={l.href} className={`group ${styles.link}`}>
                  <span className={styles.tag}>{l.layer}</span>
                  <span className={styles.title}>
                    {/* The last word and the arrow stay together, so the arrow never wraps alone. */}
                    {l.label.slice(0, l.label.lastIndexOf(" ") + 1)}
                    <span className={styles.nowrap}>
                      {l.label.slice(l.label.lastIndexOf(" ") + 1)}
                      <ArrowRight aria-hidden className={styles.arrow} />
                    </span>
                  </span>
                  <span className={styles.detail}>{l.detail}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
