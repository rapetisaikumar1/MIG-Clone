"use client";

import { Tabs as RadixTabs } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * Tab explorers for the MapleRecord overview. Both build on Radix Tabs (arrow keys, Home/End, roving
 * focus) and force-mount every panel so all content is in the server-rendered HTML; inactive panels
 * are hidden with CSS. Panel content is rendered on the server and passed in as `content`.
 *   - MrModuleExplorer      horizontal segmented control (two columns on phones, one row from lg; an odd
 *                           last tab spans both columns)
 *   - MrDepartmentExplorer  vertical rail beside the panel from lg (wrapping grid below)
 *   - MrTourExplorer        product tour on a dark stage: a rail of screens (module + screen name) beside
 *                           the panel from lg, a wrapping grid below
 * Tab accessible names are exactly `label` (icons are aria-hidden).
 */

export type MrExplorerItem = { value: string; label: string; icon: ReactNode; content: ReactNode };

export function MrModuleExplorer({ label, items, className }: { label: string; items: MrExplorerItem[]; className?: string }) {
  return (
    <RadixTabs.Root defaultValue={items[0]?.value} className={className}>
      <RadixTabs.List
        aria-label={label}
        className={cn("grid grid-cols-2 gap-1.5 rounded-2xl bg-surface p-1.5 ring-1 ring-line", items.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4")}
      >
        {items.map((item, i) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "group flex min-h-14 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[0.9375rem] font-medium tracking-tight sm:px-4 lg:px-3 xl:px-4",
              items.length % 2 === 1 && i === items.length - 1 && "col-span-2 lg:col-span-1",
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
      {items.map((item) => (
        <RadixTabs.Content key={item.value} value={item.value} forceMount className="mt-5 rounded-3xl focus-visible:outline-offset-4 data-[state=inactive]:hidden">
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}

export function MrDepartmentExplorer({ label, items, className }: { label: string; items: MrExplorerItem[]; className?: string }) {
  return (
    <RadixTabs.Root defaultValue={items[0]?.value} orientation="vertical" className={cn("grid gap-6 lg:grid-cols-12 lg:gap-8", className)}>
      <RadixTabs.List aria-label={label} className="grid content-start gap-1.5 sm:grid-cols-2 md:grid-cols-3 lg:col-span-4 lg:grid-cols-1 xl:col-span-3">
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "group relative flex min-h-12 items-center gap-3 rounded-xl px-3.5 py-2 text-left text-[0.9375rem] font-medium tracking-tight",
              "text-ink-soft ring-1 ring-line transition-colors hover:bg-paper hover:text-ink lg:ring-transparent",
              "data-[state=active]:bg-paper data-[state=active]:text-ink data-[state=active]:ring-line-strong lg:data-[state=active]:ring-line",
            )}
          >
            {/* Active marker: a signal-red bar on the rail's inner edge. */}
            <span aria-hidden className="absolute inset-y-2.5 left-0 w-0.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-signal" />
            <span aria-hidden className="inline-flex size-7 shrink-0 items-center justify-center text-muted transition-colors group-data-[state=active]:text-signal">
              {item.icon}
            </span>
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      <div className="lg:col-span-8 xl:col-span-9">
        {items.map((item) => (
          <RadixTabs.Content key={item.value} value={item.value} forceMount className="h-full rounded-3xl focus-visible:outline-offset-4 data-[state=inactive]:hidden">
            {item.content}
          </RadixTabs.Content>
        ))}
      </div>
    </RadixTabs.Root>
  );
}

export type MrTourItem = { value: string; module: string; label: string; content: ReactNode };

/** Product tour on a dark stage. Tab accessible names are "<module> <label>", e.g. "MR Records Search". */
export function MrTourExplorer({ label, items, className }: { label: string; items: MrTourItem[]; className?: string }) {
  return (
    <RadixTabs.Root defaultValue={items[0]?.value} orientation="vertical" className={cn("grid gap-6 lg:grid-cols-12 lg:gap-10", className)}>
      <RadixTabs.List aria-label={label} className="grid grid-cols-2 content-start gap-1.5 md:grid-cols-4 lg:col-span-4 lg:grid-cols-1 xl:col-span-3">
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "group relative flex min-h-14 min-w-0 flex-col items-start justify-center rounded-xl px-3 py-2 text-left sm:px-4",
              "text-night-muted ring-1 ring-white/10 transition-colors hover:bg-white/[0.04] hover:text-night-text lg:ring-transparent",
              "data-[state=active]:bg-white/[0.07] data-[state=active]:text-night-text data-[state=active]:ring-white/15",
              "focus-visible:outline-night-text",
            )}
          >
            <span aria-hidden className="absolute inset-y-2.5 left-0 w-0.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-logo-red" />
            <span className="font-mono text-[0.6875rem] uppercase leading-tight tracking-[0.08em]">{item.module}</span>
            <span className="mt-1 text-[0.9375rem] font-medium leading-snug tracking-tight">{item.label}</span>
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      <div className="min-w-0 lg:col-span-8 xl:col-span-9">
        {items.map((item) => (
          <RadixTabs.Content key={item.value} value={item.value} forceMount className="rounded-2xl focus-visible:outline-offset-4 focus-visible:outline-night-text data-[state=inactive]:hidden">
            {item.content}
          </RadixTabs.Content>
        ))}
      </div>
    </RadixTabs.Root>
  );
}
