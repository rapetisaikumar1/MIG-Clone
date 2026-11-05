"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type FocusEvent, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { AdobeNav, NavItem } from "@/config/navigation";
import { Container } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

const HOVER_OPEN_DELAY = 120;
const HOVER_CLOSE_DELAY = 220;

/**
 * Desktop "Adobe Services" entry: a normal link plus a disclosure button that reveals the
 * application list. Not an ARIA menu — it's a button (aria-expanded) controlling a region of links.
 * Opens on click/Enter/Space (and on hover with a delay, as an enhancement); closes on Escape,
 * outside click, focus leaving, and route change.
 */
export function AdobeMenu({
  item,
  menu,
  active,
  linkClassName,
}: {
  item: NavItem;
  menu: AdobeNav;
  active: boolean;
  linkClassName: string;
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
        className="group/chevron inline-flex h-11 w-8 items-center justify-center text-ink-soft outline-none hover:text-ink"
      >
        {/* Circle and focus ring are drawn inside a 44px-tall hit area, so the target stays large without a tall pill. */}
        <span
          aria-hidden
          className={cn(
            "inline-flex size-7 items-center justify-center rounded-full transition-colors group-hover/chevron:bg-paper-deep",
            "group-focus-visible/chevron:outline-2 group-focus-visible/chevron:outline-offset-2 group-focus-visible/chevron:outline-signal",
            open && "bg-paper-deep text-ink",
          )}
        >
          <ChevronDown className={cn("size-4 transition-transform duration-200", open && "rotate-180")} />
        </span>
      </button>

      {/* Positioned against the sticky header, so the panel sits flush beneath it. */}
      <div id={panelId} ref={panelRef} hidden={!open} className="pointer-events-none absolute inset-x-0 top-full pt-2">
        <Container>
          <div className="pointer-events-auto mx-auto max-h-[calc(100dvh-6rem)] max-w-[60rem] overflow-y-auto rounded-2xl border border-line bg-surface shadow-[0_18px_40px_-24px_rgb(17_17_17/0.35)]">
            <div className="grid grid-cols-[1fr_16rem] gap-8 p-7">
              <div>
                <p className="px-3 font-mono text-label uppercase text-muted">Adobe applications</p>
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
                  {menu.products.map((product) => {
                    const current = pathname === product.href;
                    return (
                      <li key={product.href}>
                        <Link
                          href={product.href}
                          aria-current={current ? "page" : undefined}
                          onClick={() => close()}
                          className={cn(
                            "relative flex min-h-11 flex-col justify-center rounded-xl px-3 py-2.5 transition-colors hover:bg-paper",
                            current && "bg-paper",
                          )}
                        >
                          {/* The marker sits in the corner so the current item's label stays aligned with the rest. */}
                          {current ? <span aria-hidden className="absolute right-3 top-4 size-1.5 rounded-full bg-logo-red" /> : null}
                          <span className="pr-4 text-[0.9375rem] font-medium leading-snug text-ink">
                            <span className="sr-only">Adobe </span>
                            {product.label}
                          </span>
                          <span className="mt-0.5 text-sm leading-snug text-muted">{product.summary ?? product.area}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col rounded-xl border border-line bg-paper p-5">
                  <p className="flex items-center gap-2 font-mono text-label uppercase text-signal">
                    <span aria-hidden className="size-1.5 rounded-full bg-logo-red" />
                    Start here
                  </p>
                  <p className="mt-3 font-medium leading-snug text-ink">{menu.assessment.label}</p>
                  {menu.assessment.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted">{menu.assessment.description}</p>
                  ) : null}
                  <Link
                    href={menu.assessment.href}
                    aria-current={pathname === menu.assessment.href ? "page" : undefined}
                    onClick={() => close()}
                    className="mt-2 inline-flex min-h-11 items-center gap-2 self-start text-[0.9375rem] font-medium text-signal underline-offset-4 hover:text-signal-hover hover:underline"
                  >
                    Explore the assessment
                    <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </div>
                <div className="mt-auto border-t border-line pt-2">
                  <Link
                    href={menu.overview.href}
                    aria-current={pathname === menu.overview.href ? "page" : undefined}
                    onClick={() => close()}
                    className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-ink underline-offset-4 hover:underline"
                  >
                    {menu.overview.label}
                    <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </li>
  );
}
