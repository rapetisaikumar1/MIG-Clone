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

export function NodeLabel({
  x,
  y,
  children,
  anchor = "middle",
  className,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  className?: string;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={cn("fill-ink-soft font-mono text-[14px] uppercase tracking-[0.04em]", className)}>
      {children}
    </text>
  );
}
