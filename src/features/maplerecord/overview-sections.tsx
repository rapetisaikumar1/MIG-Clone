"use client";

import { Tabs as RadixTabs } from "radix-ui";
import { useEffect, useRef, useState, useSyncExternalStore, type FocusEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./overview-sections.module.css";

/*
 * Tab explorers for the MapleRecord overview. All build on Radix Tabs (arrow keys, Home/End, roving
 * focus) and force-mount every panel so all content is in the server-rendered HTML. Panels share one
 * grid cell and inactive ones are only made invisible (hidden from the accessibility tree and from
 * focus), so the explorer is always as tall as its tallest panel and nothing below it moves when the
 * tab changes. Panel content is rendered on the server and passed in as `content`; wrap a decorative
 * product screen in an element with `data-shot` to let it ease in on a tab change.
 *   - MrModuleExplorer      segmented control: 3 + 2 tiles on phones, five tiles (icon over label) from
 *                           md, one row from lg
 *   - MrDepartmentExplorer  swipeable chip row below lg (horizontal tabs; the picked chip scrolls fully into
 *                           view); a vertical rail with a sliding marker from lg (vertical tabs)
 *   - MrTourExplorer        the same on a dark stage, each tab naming its module and screen
 * Tab accessible names are exactly `label` (icons are aria-hidden); tour tabs read "<module> <label>".
 */

export type MrExplorerItem = { value: string; label: string; icon: ReactNode; content: ReactNode };
export type MrTourItem = { value: string; module: string; label: string; content: ReactNode };

/** Selected tab, whether the visitor has switched tabs yet, and the last input type (for the focus ring). */
function useExplorer(initial: string | undefined) {
  const [value, setValue] = useState(initial);
  const [touched, setTouched] = useState(false);
  const [input, setInput] = useState<"pointer" | "keyboard">("keyboard");
  return {
    value,
    touched,
    rootProps: {
      value,
      onValueChange: (v: string) => {
        setValue(v);
        setTouched(true);
      },
      "data-touched": touched ? "" : undefined,
      "data-input": input,
      onPointerDown: () => setInput("pointer"),
      onKeyDown: () => setInput("keyboard"),
      // Focus leaving the explorer resets to keyboard, so tabbing back in always shows the ring.
      onBlur: (e: FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setInput("keyboard");
      },
    },
  };
}

/*
 * Rail layout from lg (64rem). Below it the rail is a horizontal chip row, so the tab list switches to
 * horizontal orientation there (Left/Right arrows). The server render assumes the rail ("vertical").
 */
const railQuery = "(min-width: 64rem)";
function subscribeRail(onChange: () => void) {
  const mql = window.matchMedia(railQuery);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
function useRailOrientation() {
  const isRail = useSyncExternalStore(
    subscribeRail,
    () => window.matchMedia(railQuery).matches,
    () => true,
  );
  return isRail ? "vertical" : "horizontal";
}

/*
 * Chip row (below lg): after the selected tab changes, scroll the row (never the page) so the active
 * chip is fully visible, clear of the scroll padding on the left and the 2rem fade on the right. It
 * lands on the chip's own snap position, so scroll snapping does not pull it back.
 */
function useActiveChipInView(value: string | undefined, touched: boolean) {
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const list = listRef.current;
    if (!touched || !list || window.matchMedia(railQuery).matches) return;
    const chip = list.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
    if (!chip) return;
    const padStart = parseFloat(getComputedStyle(list).scrollPaddingLeft) || 0;
    const fade = 32;
    const l = list.getBoundingClientRect();
    const c = chip.getBoundingClientRect();
    if (c.left >= l.left + padStart - 1 && c.right <= l.right - fade + 1) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: list.scrollLeft + (c.left - l.left) - padStart, behavior: reduced ? "auto" : "smooth" });
  }, [value, touched]);
  return listRef;
}

/*
 * Radix quirk: after a mouse click on a tab, its roving-focus group treats the next focus on the list
 * itself as a click, so tabbing back in left focus on the list (no visible ring) instead of the active
 * tab. Forward that focus to the active tab.
 */
function focusActiveTab(e: FocusEvent<HTMLDivElement>) {
  if (e.target === e.currentTarget) e.currentTarget.querySelector<HTMLElement>('[role="tab"][data-state="active"]')?.focus();
}

function Panels({ items, className, panelClassName }: { items: { value: string; content: ReactNode }[]; className?: string; panelClassName?: string }) {
  return (
    <div className={cn("grid min-w-0", className)}>
      {items.map((item) => (
        <RadixTabs.Content
          key={item.value}
          value={item.value}
          forceMount
          className={cn(styles.panel, "min-w-0 [grid-area:1/1] focus-visible:outline-offset-4 data-[state=inactive]:invisible", panelClassName)}
        >
          {item.content}
        </RadixTabs.Content>
      ))}
    </div>
  );
}

export function MrModuleExplorer({ label, items, className }: { label: string; items: MrExplorerItem[]; className?: string }) {
  const { rootProps } = useExplorer(items[0]?.value);
  const five = items.length === 5;
  return (
    <RadixTabs.Root {...rootProps} className={cn(styles.root, className)}>
      <RadixTabs.List
        aria-label={label}
        onFocus={focusActiveTab}
        className={cn(
          "grid gap-1.5 rounded-2xl bg-surface p-1.5 ring-1 ring-line",
          five ? "grid-cols-6 md:grid-cols-5" : "grid-cols-2 md:grid-cols-4",
        )}
      >
        {items.map((item, i) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "group flex min-h-[4.75rem] flex-col items-center justify-center gap-2 rounded-xl px-1.5 py-2.5 text-center text-[0.8125rem] font-medium leading-tight tracking-tight",
              "sm:text-[0.875rem] lg:min-h-14 lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:text-left lg:text-[0.9375rem] xl:px-4",
              // Phones: three tiles, then the last two centred under them.
              five && "col-span-2 md:col-span-1",
              five && i === 3 && "col-start-2 md:col-start-auto",
              "text-ink-soft transition-colors hover:bg-paper hover:text-ink",
              "data-[state=active]:bg-ink data-[state=active]:text-paper data-[state=active]:hover:bg-ink",
            )}
          >
            <span
              aria-hidden
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-paper text-signal ring-1 ring-line transition-colors group-data-[state=active]:bg-white/10 group-data-[state=active]:text-paper group-data-[state=active]:ring-white/15"
            >
              {item.icon}
            </span>
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      <Panels items={items} className="mt-5" panelClassName="rounded-3xl" />
    </RadixTabs.Root>
  );
}

/*
 * Rail geometry from lg: every tab has a fixed height so one marker can slide between them by index
 * (transform only). Keep in step with the trigger heights (lg:h-12 / lg:h-16) and the gap-1.5 gap.
 */
const railStep = { department: "3.375rem", tour: "4.375rem" } as const;

/** Chip row below lg (bleeds to the container edges and scrolls sideways), vertical rail from lg. */
const railList = cn(
  styles.scroller,
  "relative -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-2 overflow-x-auto px-5 pb-1 pr-10 sm:-mx-8 sm:scroll-px-8 sm:px-8 sm:pr-12",
  "lg:mx-0 lg:grid lg:snap-none lg:content-start lg:gap-1.5 lg:overflow-visible lg:p-0",
);

export function MrDepartmentExplorer({ label, items, className }: { label: string; items: MrExplorerItem[]; className?: string }) {
  const { value, touched, rootProps } = useExplorer(items[0]?.value);
  const index = Math.max(0, items.findIndex((item) => item.value === value));
  const orientation = useRailOrientation();
  const listRef = useActiveChipInView(value, touched);
  return (
    <RadixTabs.Root {...rootProps} orientation={orientation} className={cn(styles.root, "grid gap-6 lg:grid-cols-12 lg:gap-8", className)}>
      <RadixTabs.List ref={listRef} aria-label={label} onFocus={focusActiveTab} className={cn(railList, "lg:col-span-4 xl:col-span-3")}>
        {/* Active marker (lg): one pill with a signal-red edge that slides to the selected tab. */}
        <span
          aria-hidden
          className={cn(styles.marker, "pointer-events-none absolute inset-x-0 top-0 hidden h-12 rounded-xl bg-paper ring-1 ring-line lg:block")}
          style={{ transform: `translateY(calc(${index} * ${railStep.department}))` }}
        >
          <span className="absolute inset-y-2.5 left-0 w-0.5 rounded-full bg-signal" />
        </span>
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "group relative flex min-h-11 shrink-0 snap-start items-center gap-2.5 whitespace-nowrap rounded-full py-2 pl-3 pr-4 text-left text-[0.9375rem] font-medium tracking-tight",
              "text-ink-soft ring-1 ring-line transition-colors hover:bg-paper hover:text-ink",
              "data-[state=active]:bg-ink data-[state=active]:text-paper data-[state=active]:ring-ink",
              "lg:h-12 lg:rounded-xl lg:px-3.5 lg:ring-transparent lg:data-[state=active]:bg-transparent lg:data-[state=active]:text-ink lg:data-[state=active]:ring-transparent",
            )}
          >
            <span
              aria-hidden
              className="inline-flex size-6 shrink-0 items-center justify-center text-muted transition-colors group-data-[state=active]:text-paper lg:size-7 lg:group-data-[state=active]:text-signal"
            >
              {item.icon}
            </span>
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      <Panels items={items} className="lg:col-span-8 xl:col-span-9" panelClassName="rounded-3xl" />
    </RadixTabs.Root>
  );
}

/** Product tour on a dark stage. Tab accessible names are "<module> <label>", e.g. "MR Records Search". */
export function MrTourExplorer({ label, items, className }: { label: string; items: MrTourItem[]; className?: string }) {
  const { value, touched, rootProps } = useExplorer(items[0]?.value);
  const index = Math.max(0, items.findIndex((item) => item.value === value));
  const orientation = useRailOrientation();
  const listRef = useActiveChipInView(value, touched);
  return (
    <RadixTabs.Root {...rootProps} orientation={orientation} className={cn(styles.root, "grid gap-6 lg:grid-cols-12 lg:gap-10", className)}>
      <RadixTabs.List ref={listRef} aria-label={label} onFocus={focusActiveTab} className={cn(railList, "lg:col-span-4 xl:col-span-3")}>
        <span
          aria-hidden
          className={cn(styles.marker, "pointer-events-none absolute inset-x-0 top-0 hidden h-16 rounded-xl bg-white/[0.07] ring-1 ring-white/15 lg:block")}
          style={{ transform: `translateY(calc(${index} * ${railStep.tour}))` }}
        >
          <span className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-logo-red" />
        </span>
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "group relative flex min-h-14 shrink-0 snap-start flex-col items-start justify-center whitespace-nowrap rounded-xl px-4 py-2 text-left",
              "text-night-muted ring-1 ring-white/12 transition-colors hover:bg-white/[0.04] hover:text-night-text",
              "data-[state=active]:bg-white/[0.09] data-[state=active]:text-night-text data-[state=active]:ring-white/25",
              "lg:h-16 lg:ring-transparent lg:data-[state=active]:bg-transparent lg:data-[state=active]:ring-transparent",
              "focus-visible:outline-night-text",
            )}
          >
            <span className="font-mono text-[0.6875rem] uppercase leading-tight tracking-[0.08em]">{item.module}</span>
            <span className="mt-1 text-[0.9375rem] font-medium leading-snug tracking-tight">{item.label}</span>
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      <Panels items={items} className="lg:col-span-8 xl:col-span-9" panelClassName="rounded-2xl focus-visible:outline-night-text" />
    </RadixTabs.Root>
  );
}
