"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * "On this page" navigation for MapleRecord articles, progressively enhanced. Server-rendered links work
 * without JavaScript; with it, the link for the section being read gets aria-current="location" (styled by
 * the links themselves), a `[data-toc-marker]` rule slides to it (transform only), a `[data-toc-scroll]`
 * list keeps it in view, and a surrounding <details> closes once a link is chosen.
 */
export function MrTocNav({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = ref.current;
    if (!nav) return;
    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const sections = links
      .map((link) => ({ link, heading: document.getElementById(decodeURIComponent(link.hash.slice(1))) }))
      .filter((s): s is { link: HTMLAnchorElement; heading: HTMLElement } => s.heading !== null);
    const marker = nav.querySelector<HTMLElement>("[data-toc-marker]");
    const scroller = nav.querySelector<HTMLElement>("[data-toc-scroll]");
    const details = nav.closest("details");
    let active: HTMLAnchorElement | null = null;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!nav.offsetParent) return; // this copy of the list is hidden at the current breakpoint
      // The section being read: the last heading above a line a quarter of the way down the viewport.
      const line = Math.max(140, window.innerHeight * 0.25);
      let next: HTMLAnchorElement | null = null;
      for (const s of sections) {
        if (s.heading.getBoundingClientRect().top <= line) next = s.link;
        else break;
      }
      if (next === active) return;
      active?.removeAttribute("aria-current");
      next?.setAttribute("aria-current", "location");
      active = next;
      if (marker) {
        if (next) {
          marker.style.transform = `translateY(${next.offsetTop}px) scaleY(${next.offsetHeight})`;
          marker.style.opacity = "1";
        } else marker.style.opacity = "0";
      }
      if (next && scroller && scroller.scrollHeight > scroller.clientHeight) {
        const top = next.offsetTop;
        if (top < scroller.scrollTop || top + next.offsetHeight > scroller.scrollTop + scroller.clientHeight - 48) {
          scroller.scrollTo({ top: Math.max(0, top - scroller.clientHeight / 3) });
        }
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // After a reflow (resize, or the disclosure opening) measure again from scratch.
    const remeasure = () => {
      active?.removeAttribute("aria-current");
      active = null;
      schedule();
    };
    const onClick = (event: MouseEvent) => {
      if (details && (event.target as Element).closest("a")) details.open = false;
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    details?.addEventListener("toggle", remeasure);
    nav.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      details?.removeEventListener("toggle", remeasure);
      nav.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <nav ref={ref} aria-label="On this page" className={className}>
      {children}
    </nav>
  );
}
