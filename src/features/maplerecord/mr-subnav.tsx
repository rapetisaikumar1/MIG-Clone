"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { mrOfficial } from "@/content/maplerecord/official";
import { cn } from "@/lib/utils";

export const mrNav = [
  { label: "Overview", href: "/maplerecord", exact: true },
  { label: "Platform", href: "/maplerecord/platform" },
  { label: "Solutions", href: "/maplerecord/solutions" },
  { label: "Resources", href: "/maplerecord/resources" },
  { label: "About", href: "/maplerecord/about" },
  { label: "Contact", href: "/maplerecord/contact" },
];

function isActive(item: (typeof mrNav)[number], pathname: string) {
  return item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

/**
 * Product sub-navigation for the MapleRecord section, sticky under the 4.75rem site header (3.5rem tall).
 *   - md and up: MapleRecord logo, the six sections as tabs (active one underlined in signal red), and
 *     "Request a demo" from lg.
 *   - Below md: one compact "MapleRecord / <section> ▾" disclosure that opens a panel listing every
 *     section, so nothing hides off-screen. Closes on navigation, Escape, outside click or tabbing out.
 * All six links live in one list inside the "MapleRecord" nav landmark at every width.
 */
export function MrSubnav() {
  const pathname = usePathname();
  // The panel remembers the page it was opened on, so any navigation (links, back/forward) closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const barRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const current = mrNav.find((item) => isActive(item, pathname));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenOn(null);
      buttonRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // If the tab row ever overflows (large text settings), keep the current section's tab in view.
  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const left = tab.offsetLeft - list.offsetLeft;
    if (left < list.scrollLeft || left + tab.offsetWidth > list.scrollLeft + list.clientWidth) {
      list.scrollLeft = Math.max(0, left - 24);
    }
  }, [pathname]);

  return (
    <div
      ref={barRef}
      data-mr-subnav=""
      onBlur={(e) => {
        // Tabbing out of the bar closes the panel; a null relatedTarget (click on nothing) is handled by pointerdown.
        if (open && e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)) setOpenOn(null);
      }}
      className="sticky top-[4.75rem] z-30 border-b border-line bg-surface/95 shadow-[0_1px_0_rgb(255_255_255/0.6)_inset] backdrop-blur-md supports-[backdrop-filter]:bg-surface/85"
    >
      <div className="relative mx-auto flex h-14 w-full max-w-[78rem] items-center gap-3 px-5 sm:px-8 lg:gap-5 lg:px-12">
        <Link
          href="/maplerecord"
          className="hidden h-11 shrink-0 items-center rounded-md focus-visible:outline-offset-2 md:flex"
          aria-label="MapleRecord overview"
        >
          <Image src="/maplerecord/maplerecord-logo.svg" alt="" width={457} height={68} className="h-[1.375rem] w-auto lg:h-6" />
        </Link>
        <span aria-hidden className="hidden h-6 w-px shrink-0 bg-line md:block" />

        {open ? (
          // Dims the page under the open panel (phones only); tapping it closes the panel. Absolute, not fixed:
          // the bar's backdrop-filter makes it the containing block for fixed children.
          <div
            aria-hidden
            onPointerDown={() => setOpenOn(null)}
            className="absolute inset-x-0 top-full h-dvh bg-ink/40 motion-safe:transition-opacity motion-safe:duration-200 motion-safe:starting:opacity-0 md:hidden"
          />
        ) : null}
        <nav aria-label="MapleRecord" className="flex h-full min-w-0 flex-1 items-center">
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls={listId}
            onClick={() => setOpenOn(open ? null : pathname)}
            className="-ml-2 flex h-11 min-w-0 items-center gap-2 rounded-lg px-2 text-[0.9375rem] hover:bg-paper md:hidden"
          >
            <Image aria-hidden src="/maplerecord/maplerecord-leaf.svg" alt="" width={76} height={68} className="h-[1.0625rem] w-auto shrink-0" />
            <span className="font-semibold tracking-tight text-ink">MapleRecord</span>
            {current ? (
              <>
                <span aria-hidden className="text-line-strong">
                  /
                </span>
                <span className="truncate text-muted">{current.label}</span>
              </>
            ) : null}
            <span className="sr-only"> sections</span>
            <ChevronDown aria-hidden className={cn("size-4 shrink-0 text-muted transition-transform duration-200", open && "rotate-180")} />
          </button>

          <ul
            ref={listRef}
            id={listId}
            className={cn(
              // Phones: a panel dropping from the bar.
              "absolute inset-x-0 top-full grid gap-0.5 border-b border-line bg-surface px-3 pb-4 pt-2 shadow-[0_24px_40px_-24px_rgb(17_17_17/0.35)] sm:px-6",
              "motion-safe:transition-[opacity,translate] motion-safe:duration-200 motion-safe:starting:-translate-y-1 motion-safe:starting:opacity-0",
              open ? "" : "hidden",
              // md+: inline tabs filling the bar's height.
              "md:static md:flex md:h-full md:min-w-0 md:items-stretch md:gap-0 md:overflow-x-auto md:border-0 md:bg-transparent md:p-0 md:shadow-none md:[scrollbar-width:none]",
            )}
          >
            {mrNav.map((item) => {
              const active = isActive(item, pathname);
              return (
                <li key={item.href} className="md:flex md:shrink-0">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpenOn(null)}
                    className={cn(
                      "relative flex min-h-12 items-center rounded-lg px-3 text-base font-medium transition-colors focus-visible:outline-offset-[-2px]",
                      "md:min-h-0 md:rounded-md md:px-2.5 md:text-sm lg:px-3.5",
                      // Active marker: a bar on the left in the panel, an underline on the bar's bottom edge from md.
                      "before:absolute before:rounded-full before:bg-signal before:content-['']",
                      "before:inset-y-3 before:left-0 before:w-0.5 md:before:inset-x-2.5 md:before:bottom-0 md:before:top-auto md:before:h-0.5 md:before:w-auto lg:before:inset-x-3.5",
                      active ? "bg-paper text-ink md:bg-transparent" : "text-ink-soft before:hidden hover:bg-paper hover:text-ink md:text-muted md:hover:bg-transparent",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-3 border-t border-line pt-4 sm:hidden">
              <a
                href={mrOfficial.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-[0.9375rem] font-medium text-paper hover:bg-ink-soft"
              >
                Request a demo
                <ArrowUpRight aria-hidden className="size-4" />
                <span className="sr-only"> (opens maplerecord.com in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <a
          href={mrOfficial.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-ink px-4.5 text-sm font-medium text-paper transition-colors hover:bg-ink-soft sm:inline-flex md:hidden lg:inline-flex"
        >
          Request a demo
          <ArrowUpRight aria-hidden className="size-4" />
          <span className="sr-only"> (opens maplerecord.com in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
