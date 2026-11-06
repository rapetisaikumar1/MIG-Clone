"use client";

import { useEffect, useRef } from "react";

/**
 * A soft light and a slightly stronger patch of grid that follow the cursor across the hero.
 * Only for fine pointers with hover and when motion is allowed; touch and reduced motion never attach
 * listeners, and the element stays fully transparent. Moves with transform; the inner grid's
 * background-position keeps its lines registered with the page grid.
 */
export function HeroPointerLight({ className, gridClassName, grid }: { className?: string; gridClassName?: string; grid: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const gridEl = gridRef.current;
    const host = el?.closest("section");
    if (!el || !gridEl || !host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const mod = (n: number) => ((n % grid) + grid) % grid;

    const paint = () => {
      frame = 0;
      const rect = host.getBoundingClientRect();
      const r = el.offsetWidth / 2;
      const tx = x - rect.left - r;
      const ty = y - rect.top - r;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      // Page grid: vertical lines at width/2 + n·grid, horizontal lines at n·grid.
      gridEl.style.backgroundPosition = `${mod(rect.width / 2 - tx)}px ${mod(-ty)}px`;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      el.dataset.active = "true";
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      el.dataset.active = "false";
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [grid]);

  return (
    <div ref={ref} className={className}>
      <div ref={gridRef} className={gridClassName} />
    </div>
  );
}
