"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type FocusEvent, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/config/navigation";
import { Container } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

const HOVER_OPEN_DELAY = 120;
const HOVER_CLOSE_DELAY = 220;

/**
 * Desktop primary-nav entry with a panel (Services, Adobe Services, MapleRecord): a normal link plus a
 * disclosure button that reveals a panel of links. Not an ARIA menu: it's a button (aria-expanded)
 * controlling a region of links. Opens on click/Enter/Space (and on hover with a delay, as an
 * enhancement); closes on Escape, outside click, focus leaving, and route change.
 * `children` is the panel's content; following any link inside it closes the panel.
 */
export function NavMenu({
  item,
  active,
  linkClassName,
  panelClassName,
  children,
}: {
  item: NavItem;
  active: boolean;
  linkClassName: string;
  /** Extra classes for the floating card (it already spans the page container). */
  panelClassName?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  // The menu is open only for the path it was opened on, so any navigation closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  // Drop a stale value during render so returning to that path later doesn't reopen it.
  if (openOn !== null && openOn !== pathname) setOpenOn(null);
  const open = openOn === pathname;
  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // A click right after a hover-open should keep the panel open, not toggle it shut.
  const hoverOpened = useRef(false);
  const panelId = useId();

  const clearTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const close = useCallback(
    (returnFocus = false) => {
      clearTimer();
      hoverOpened.current = false;
      setOpenOn(null);
      if (returnFocus) buttonRef.current?.focus();
    },
    [clearTimer],
  );

  useEffect(() => clearTimer, [clearTimer]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) close();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const focusInside = rootRef.current?.contains(document.activeElement) ?? false;
      close(focusInside);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  function schedule(next: boolean, delay: number) {
    clearTimer();
    timer.current = setTimeout(() => {
      hoverOpened.current = next;
      setOpenOn(next ? pathname : null);
    }, delay);
  }

  function onPointerEnter(event: ReactPointerEvent) {
    if (event.pointerType !== "mouse") return;
    if (open) clearTimer();
    else schedule(true, HOVER_OPEN_DELAY);
  }

  function onPointerLeave(event: ReactPointerEvent) {
    if (event.pointerType !== "mouse") return;
    // Keep it open while a keyboard user is working inside the panel.
    if (panelRef.current?.contains(document.activeElement)) return;
    if (open) schedule(false, HOVER_CLOSE_DELAY);
    else clearTimer();
  }

  function onBlur(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (next && !rootRef.current?.contains(next)) close();
  }

  return (
    <li ref={rootRef} className="flex items-center" onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onBlur={onBlur}>
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        onClick={() => close()}
        className={linkClassName}
      >
        {item.label}
      </Link>
      <button
        ref={buttonRef}
        type="button"
        aria-label={`${item.label} menu`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          clearTimer();
          const keepOpen = open && hoverOpened.current;
          hoverOpened.current = false;
          setOpenOn(open && !keepOpen ? null : pathname);
        }}
        className="group/chevron inline-flex h-11 w-6 items-center justify-center text-ink-soft outline-none hover:text-ink"
      >
        {/* Circle and focus ring are drawn inside a 44px-tall hit area, so the target stays large without a tall pill. */}
        <span
          aria-hidden
          className={cn(
            "inline-flex size-6 items-center justify-center rounded-full transition-colors group-hover/chevron:bg-paper-deep",
            "group-focus-visible/chevron:outline-2 group-focus-visible/chevron:outline-offset-2 group-focus-visible/chevron:outline-signal",
            open && "bg-paper-deep text-ink",
          )}
        >
          <ChevronDown className={cn("size-4 transition-transform duration-200", open && "rotate-180")} />
        </span>
      </button>

      {/*
       * Positioned against the sticky header, so the panel sits flush beneath it, and spans the page
       * container so every panel lines up with the header's edges. `hidden` still decides whether it is
       * shown; where motion is allowed it eases in (@starting-style) and, on close, fades out before the
       * hidden attribute's display:none lands (transition-behavior: allow-discrete).
       */}
      <div
        id={panelId}
        ref={panelRef}
        hidden={!open}
        className={cn(
          "pointer-events-none absolute inset-x-0 top-full pt-2",
          "motion-safe:transition-[opacity,translate,display] motion-safe:transition-discrete motion-safe:duration-200 motion-safe:ease-out-quint",
          "motion-safe:starting:-translate-y-1.5 motion-safe:starting:opacity-0",
          "[&[hidden]]:-translate-y-1 [&[hidden]]:opacity-0 motion-safe:[&[hidden]]:duration-150",
        )}
      >
        <Container>
          {/* Any link followed inside the panel closes it (clicks bubble up from the links). */}
          <div
            onClick={(event) => {
              if ((event.target as Element).closest("a")) close();
            }}
            className={cn(
              "pointer-events-auto max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface shadow-[0_24px_48px_-28px_rgb(17_17_17/0.4),0_2px_6px_-2px_rgb(17_17_17/0.06)]",
              // A closing panel no longer takes clicks meant for the page beneath it.
              "in-[[hidden]]:pointer-events-none",
              panelClassName,
            )}
          >
            {children}
          </div>
        </Container>
      </div>
    </li>
  );
}
