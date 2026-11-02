"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dialog } from "radix-ui";
import { Menu, X, ArrowRight } from "lucide-react";
import type { NavItem } from "@/config/navigation";
import { company, primaryPhone } from "@/config/site";
import { isActivePath } from "./nav-links";

/** Full-screen sheet built on Radix Dialog: focus trap, Escape to close, scroll lock, labelled. */
export function MobileNav({ items, cta }: { items: NavItem[]; cta: NavItem }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
          className="sheet-panel fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-paper shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Dialog.Title className="font-mono text-label uppercase text-muted">Menu</Dialog.Title>
            <Dialog.Description className="sr-only">Site navigation for {company.name}</Dialog.Description>
            <Dialog.Close
              className="inline-flex size-11 items-center justify-center rounded-full border border-ink/15 hover:border-ink/40"
              aria-label="Close menu"
            >
              <X aria-hidden className="size-5" />
            </Dialog.Close>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
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
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="border-t border-line p-5">
            <Link
              href={cta.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 w-full items-center justify-center rounded-full bg-signal font-medium text-white hover:bg-signal-hover"
            >
              {cta.label}
            </Link>
            <p className="mt-4 text-center text-sm text-muted">
              Or call{" "}
              <a className="font-medium text-ink underline underline-offset-4" href={`tel:${primaryPhone.e164}`}>
                {primaryPhone.display}
              </a>
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
