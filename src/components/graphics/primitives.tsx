import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A surface "plane" with an offset shadow plate — the shared depth device for all diagrams. */
export function Plane({ x, y, w, h, tone = "surface" }: { x: number; y: number; w: number; h: number; tone?: "surface" | "night" }) {
  return (
    <g>
      <rect x={x + 8} y={y + 8} width={w} height={h} rx="12" className={tone === "night" ? "fill-black/40" : "fill-paper-deep"} />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="12"
        className={tone === "night" ? "fill-night-raised stroke-night-line" : "fill-surface stroke-ink"}
        strokeWidth="1.5"
      />
    </g>
  );
}

/*
 * Diagram text sizes, in viewBox units. A 520-unit diagram renders at ~280px on a 360px phone and again
 * in the narrow lg hero column (scale ≈ 0.55), but at full size or larger between sm and lg — so labels
 * are set larger outside that band to stay legible (~10px rendered) everywhere.
 */
export const svgLabelSize = "text-[18px] tracking-[0.02em] sm:max-lg:text-[14px] sm:max-lg:tracking-[0.04em]";
export const svgSmallLabelSize = "text-[16px] tracking-[0.02em] sm:max-lg:text-[12px] sm:max-lg:tracking-[0.06em]";

export function NodeLabel({
  x,
  y,
  children,
  anchor = "middle",
  fluid = false,
  className,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  /** Use the responsive `svgLabelSize` for diagrams that render in narrow columns; default is a fixed 14 units. */
  fluid?: boolean;
  className?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={cn("fill-ink-soft font-mono uppercase", fluid ? svgLabelSize : "text-[14px] tracking-[0.04em]", className)}
    >
      {children}
    </text>
  );
}
