"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dialog } from "radix-ui";
import { Menu, X, ArrowRight } from "lucide-react";
import type { AdobeNav, NavItem } from "@/config/navigation";
import { company, primaryPhone } from "@/config/site";
import { cn } from "@/lib/utils";
import { isActivePath } from "./nav-links";

/** Full-screen sheet built on Radix Dialog: focus trap, Escape to close, scroll lock, labelled. */
export function MobileNav({ items, cta, adobe }: { items: NavItem[]; cta: NavItem; adobe?: AdobeNav }) {
  const pathname = usePathname();
  // Open only for the path it was opened on, so any navigation (including Back) closes the sheet.
  const [openOn, setOpenOn] = useState<string | null>(null);
  // Drop a stale value during render so returning to that path later doesn't reopen it.
  if (openOn !== null && openOn !== pathname) setOpenOn(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/40 xl:hidden"
        aria-label="Open menu"
      >
        <Menu aria-hidden className="size-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay fixed inset-0 z-50 bg-ink/30" />
        <Dialog.Content
          className="sheet-panel fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-y-auto overscroll-contain bg-paper shadow-2xl"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-paper px-5 py-4">
            <Dialog.Title className="font-mono text-label uppercase text-muted">Menu</Dialog.Title>
            <Dialog.Description className="sr-only">Site navigation for {company.name}</Dialog.Description>
            <Dialog.Close
              className="inline-flex size-11 items-center justify-center rounded-full border border-ink/15 hover:border-ink/40"
              aria-label="Close menu"
            >
              <X aria-hidden className="size-5" />
            </Dialog.Close>
          </div>
          <nav aria-label="Mobile" className="flex-1 px-5 py-6">
            <ul className="divide-y divide-line border-y border-line">
              {[...items, { label: "MapleRecord", href: "/maplerecord" }].map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className="flex min-h-14 items-center justify-between py-3 text-xl font-medium tracking-tight"
                    >
                      <span className="flex items-center gap-3">
                        {active ? <span aria-hidden className="size-2 rounded-full bg-logo-red" /> : null}
                        {item.label}
                      </span>
                      <ArrowRight aria-hidden className="size-4 text-muted" />
                    </Link>
                    {adobe && item.href === adobe.overview.href ? (
                      <ul aria-label="Adobe applications" className="-mt-1 mb-3 ml-1 border-l border-line pl-4">
                        {[
                          ...adobe.products.map((p) => ({ href: p.href, label: p.label })),
                          { href: adobe.assessment.href, label: "Platform assessment" },
                        ].map((sub) => {
                          const current = pathname === sub.href;
                          return (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                onClick={() => setOpen(false)}
                                aria-current={current ? "page" : undefined}
                                className={cn(
                                  "flex min-h-11 items-center gap-2 text-base text-ink-soft hover:text-ink",
                                  current && "font-medium text-ink",
                                )}
                              >
                                {current ? <span aria-hidden className="size-1.5 rounded-full bg-logo-red" /> : null}
                                <span>
                                  <span className="sr-only">Adobe </span>
                                  {sub.label}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>
          {/* Pinned on tall screens; on short ones (phones in landscape) it scrolls with the links. */}
          <div className="bottom-0 border-t border-line bg-paper p-5 [@media(min-height:560px)]:sticky">
            <Link
              href={cta.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 w-full items-center justify-center rounded-full bg-signal font-medium text-white hover:bg-signal-hover"
            >
              {cta.label}
            </Link>
            <p className="mt-2 flex flex-wrap items-center justify-center gap-x-1.5 text-sm text-muted">
              Or call
              <a className="inline-flex min-h-11 items-center font-medium text-ink underline underline-offset-4" href={`tel:${primaryPhone.e164}`}>
                {primaryPhone.display}
              </a>
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
