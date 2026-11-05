"use client";

import { Tabs as RadixTabs } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Accessible tabs (arrow keys, Home/End, roving focus) on Radix. Every panel is force-mounted so all
 * content is in the server-rendered HTML; inactive panels are hidden with CSS.
 */
export function Tabs({
  label,
  items,
  className,
  listClassName,
}: {
  label: string;
  items: { value: string; label: string; content: ReactNode }[];
  className?: string;
  listClassName?: string;
}) {
  return (
    <RadixTabs.Root defaultValue={items[0]?.value} className={className}>
      {/* The negative margin + padding gives the focus ring room inside the scroll container, which
          would otherwise clip it (overflow-x: auto also clips vertically). */}
      <RadixTabs.List
        aria-label={label}
        className={cn("-m-1.5 flex gap-2 overflow-x-auto p-1.5 [scrollbar-width:thin]", listClassName)}
      >
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center rounded-full border px-4.5 text-sm font-medium transition-colors",
              "border-line-strong text-ink-soft hover:border-ink hover:text-ink",
              "data-[state=active]:border-ink data-[state=active]:bg-ink data-[state=active]:text-paper",
            )}
          >
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {items.map((item) => (
        <RadixTabs.Content key={item.value} value={item.value} forceMount
          className="mt-8 rounded-sm focus-visible:outline-offset-4 data-[state=inactive]:hidden"
        >
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}
