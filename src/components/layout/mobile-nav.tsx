"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Dialog } from "radix-ui";
import { Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";
import type { AdobeNav, MapleRecordNav, NavItem, ServicesNav } from "@/config/navigation";
import { company, primaryPhone } from "@/config/site";
import { cn } from "@/lib/utils";
import { isActivePath, isServicesActive } from "./nav-links";

/** Child links of a top-level item: two columns on a tinted, captioned block, so they read as that item's pages. */
const subListClass = "grid grid-cols-2 gap-x-3";
const subLinkClass =
  "flex min-h-11 items-center gap-2 rounded-lg text-[0.9375rem] leading-snug text-ink-soft transition-colors hover:text-ink focus-visible:outline-offset-0";

function SubList({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <div className="-mt-1 mb-4 rounded-xl bg-paper-deep/70 px-4 pt-3 pb-1.5">
      {/* Each list keeps its own accessible name; this caption is its visible equivalent. */}
      <p aria-hidden className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">
        {caption}
      </p>
      {children}
    </div>
  );
}

/** A child link; the current page gets a red marker (in place of `lead`, e.g. a pillar number). */
function SubLink({
  href,
  label,
  pathname,
  onNavigate,
  lead,
  exact = false,
}: {
  href: string;
  label: string;
  pathname: string;
  onNavigate: () => void;
  lead?: ReactNode;
  exact?: boolean;
}) {
  const current = exact ? pathname === href : isActivePath(pathname, href);
  return (
    <Link href={href} onClick={onNavigate} aria-current={current ? "page" : undefined} className={cn(subLinkClass, current && "font-medium text-ink")}>
      {lead}
      {current && !lead ? <span aria-hidden className="size-1.5 rounded-full bg-logo-red" /> : null}
      <span>{label}</span>
      {current && lead ? <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-logo-red" /> : null}
    </Link>
  );
}

/** Full-screen sheet built on Radix Dialog: focus trap, Escape to close, scroll lock, labelled. */
export function MobileNav({
  items,
  cta,
  services,
  adobe,
  mapleRecord,
}: {
  items: NavItem[];
  cta: NavItem;
  services?: ServicesNav;
  adobe?: AdobeNav;
  mapleRecord?: MapleRecordNav;
}) {
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
              className="inline-flex size-11 items-center justify-center rounded-full border border-ink/15 transition-colors hover:border-ink/40 hover:bg-ink/[0.03]"
              aria-label="Close menu"
            >
              <X aria-hidden className="size-5" />
            </Dialog.Close>
          </div>
          <nav aria-label="Mobile" className="flex-1 px-5 pt-2 pb-6">
            <ul className="divide-y divide-line border-b border-line">
              {items.map((item) => {
                const isServices = services !== undefined && item.href === services.overview.href;
                const active = isServices ? isServicesActive(pathname, services, items) : isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className="group flex min-h-14 items-center justify-between py-3 text-xl font-medium tracking-tight"
                    >
                      <span className="flex items-center gap-3">
                        {active ? <span aria-hidden className="size-2 rounded-full bg-logo-red" /> : null}
                        {item.label}
                      </span>
                      <ArrowRight aria-hidden className="size-4 text-muted transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                    {isServices ? (
                      <SubList caption="Core expertise">
                        {/* One column, like the pillars below, so each core area keeps its full name on one line. */}
                        <ul aria-label="Core expertise" className="grid">
                          {services.core.map((sub) => (
                            <li key={sub.href}>
                              <SubLink href={sub.href} label={sub.label} pathname={pathname} onNavigate={() => setOpen(false)} />
                            </li>
                          ))}
                        </ul>
                        <p aria-hidden className="mt-1 border-t border-line pt-3 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">
                          Practice pillars
                        </p>
                        <ul aria-label="Practice pillars" className="grid">
                          {services.pillars.map((pillar) => (
                            <li key={pillar.href}>
                              <SubLink
                                href={pillar.href}
                                label={pillar.label}
                                pathname={pathname}
                                onNavigate={() => setOpen(false)}
                                lead={
                                  <span aria-hidden className="w-6 shrink-0 font-mono text-[0.75rem] tabular-nums text-signal">
                                    {pillar.number}
                                  </span>
                                }
                              />
                              {/* Pillar 07 is delivered with our two products, listed under it. */}
                              {pillar.links?.length ? (
                                <ul aria-label={`${pillar.label} products`} className="-mt-1 ml-8 flex flex-wrap gap-x-6">
                                  {pillar.links.map((sub) => (
                                    <li key={sub.href}>
                                      <SubLink href={sub.href} label={sub.label} pathname={pathname} onNavigate={() => setOpen(false)} />
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                        <ul aria-label="More services" className="mt-1 border-t border-line pt-1">
                          <li>
                            <SubLink href={services.overview.href} label={services.overview.label} pathname={pathname} onNavigate={() => setOpen(false)} exact />
                          </li>
                        </ul>
                      </SubList>
                    ) : null}
                    {adobe && item.href === adobe.overview.href ? (
                      <SubList caption="Adobe Experience Cloud">
                        <ul aria-label="Adobe Experience Cloud applications" className={subListClass}>
                          {adobe.products.map((sub) => {
                            const current = pathname === sub.href;
                            return (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  onClick={() => setOpen(false)}
                                  aria-current={current ? "page" : undefined}
                                  className={cn(subLinkClass, current && "font-medium text-ink")}
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
                        {/* The assessment is a service, not an application: its own row, like "More services" above. */}
                        <ul aria-label="Adobe platform assessment" className="mt-1 border-t border-line pt-1">
                          <li>
                            <SubLink
                              href={adobe.assessment.href}
                              label={adobe.assessment.label}
                              pathname={pathname}
                              onNavigate={() => setOpen(false)}
                              exact
                            />
                          </li>
                        </ul>
                      </SubList>
                    ) : null}
                    {mapleRecord && item.href === mapleRecord.overview.href ? (
                      <SubList caption="Product pages">
                        <ul aria-label="MapleRecord pages" className={subListClass}>
                          {mapleRecord.sections.slice(1).map((sub) => {
                            const current = isActivePath(pathname, sub.href);
                            return (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  onClick={() => setOpen(false)}
                                  aria-current={current ? "page" : undefined}
                                  className={cn(subLinkClass, current && "font-medium text-ink")}
                                >
                                  {current ? <span aria-hidden className="size-1.5 rounded-full bg-logo-red" /> : null}
                                  {sub.label}
                                </Link>
                              </li>
                            );
                          })}
                          <li>
                            <a
                              href={mapleRecord.demo.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(subLinkClass, "text-signal hover:text-signal-hover")}
                            >
                              {mapleRecord.demo.label}
                              <ArrowUpRight aria-hidden className="size-4 shrink-0" />
                              <span className="sr-only"> (opens maplerecord.com in a new tab)</span>
                            </a>
                          </li>
                        </ul>
                      </SubList>
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
              className="flex min-h-12 w-full items-center justify-center rounded-full bg-signal font-medium text-white transition-[background-color,translate] duration-200 hover:bg-signal-hover active:translate-y-px"
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
