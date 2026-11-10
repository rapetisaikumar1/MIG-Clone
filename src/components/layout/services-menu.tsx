"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Archive, ArrowRight, Database, Megaphone, ShieldCheck, type LucideIcon } from "lucide-react";
import type { NavItem, PillarNavItem, ServicesNav } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { isActivePath } from "./nav-links";
import { NavMenu } from "./nav-menu";

/** Icons for the four core areas, keyed by the page that delivers each one. */
const coreIcons: Record<string, LucideIcon> = {
  "/information-governance": Archive,
  "/data-management": Database,
  "/ai-governance": ShieldCheck,
  "/adobe-services": Megaphone,
};

const itemClass = "relative flex min-h-11 rounded-xl px-3 transition-colors hover:bg-paper";

/** The current item's marker sits in the corner, so its label stays aligned with the rest. */
function CurrentDot() {
  return <span aria-hidden className="absolute right-3 top-4 size-1.5 rounded-full bg-logo-red" />;
}

/** One of the four core areas: icon, label and a one-line description. */
function CoreLink({ item, current }: { item: NavItem; current: boolean }) {
  const Icon = coreIcons[item.href];
  return (
    <Link href={item.href} aria-current={current ? "page" : undefined} className={cn(itemClass, "items-start gap-3 py-2.5", current && "bg-paper")}>
      {current ? <CurrentDot /> : null}
      <span aria-hidden className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-paper text-signal ring-1 ring-line">
        {Icon ? <Icon className="size-4" strokeWidth={1.75} /> : null}
      </span>
      <span className="flex flex-col pr-4">
        <span className="text-[0.9375rem] font-medium leading-snug text-ink">{item.label}</span>
        {item.description ? <span className="mt-0.5 text-sm leading-snug text-pretty text-muted">{item.description}</span> : null}
      </span>
    </Link>
  );
}

/** A numbered practice pillar, label only, so the seven fit in a compact list. */
function PillarLink({ pillar, current }: { pillar: PillarNavItem; current: boolean }) {
  return (
    <Link href={pillar.href} aria-current={current ? "page" : undefined} className={cn(itemClass, "items-center gap-3 py-2", current && "bg-paper")}>
      {current ? <CurrentDot /> : null}
      <span aria-hidden className="w-5 shrink-0 font-mono text-[0.75rem] leading-snug tabular-nums text-signal">
        {pillar.number}
      </span>
      <span className="pr-4 text-[0.9375rem] leading-snug text-ink-soft">{pillar.label}</span>
    </Link>
  );
}

/**
 * Desktop "Services" entry: the shared NavMenu disclosure. The four core areas lead (with descriptions),
 * then the seven Capability Matrix pillars as a compact numbered list (01–04 | 05–07); the side card holds
 * our two products, which deliver pillar 07, like the MarTech and MapleRecord panels' side cards.
 */
export function ServicesMenu({
  item,
  menu,
  active,
  linkClassName,
}: {
  item: NavItem;
  menu: ServicesNav;
  active: boolean;
  linkClassName: string;
}) {
  const pathname = usePathname();
  const products = menu.pillars.flatMap((p) => p.links ?? []);
  return (
    <NavMenu item={item} active={active} linkClassName={linkClassName}>
      <div className="grid grid-cols-[1fr_17rem] gap-10 p-7">
        <div>
          <p className="px-3 font-mono text-label uppercase text-muted">Core expertise</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1">
            {menu.core.map((core) => (
              <li key={core.href}>
                <CoreLink item={core} current={isActivePath(pathname, core.href)} />
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-line pt-5">
            <p className="px-3 font-mono text-label uppercase text-muted">Practice pillars</p>
            <ul className="mt-2 grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-6">
              {menu.pillars.map((pillar) => (
                <li key={pillar.href}>
                  <PillarLink pillar={pillar} current={isActivePath(pathname, pillar.href)} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {products.length ? (
            <div className="flex flex-col rounded-xl border border-line bg-paper p-5">
              <p className="flex items-center gap-2 font-mono text-label uppercase text-signal">
                <span aria-hidden className="size-1.5 rounded-full bg-logo-red" />
                Our products
              </p>
              <p className="mt-3 font-medium leading-snug text-ink">Records management, built in-house</p>
              <ul className="mt-2 divide-y divide-line">
                {products.map((product) => {
                  const current = isActivePath(pathname, product.href);
                  return (
                    <li key={product.href}>
                      <Link
                        href={product.href}
                        aria-current={current ? "page" : undefined}
                        className="group flex min-h-11 items-start justify-between gap-3 py-3"
                      >
                        <span className="flex flex-col">
                          <span className="flex items-center gap-2 text-[0.9375rem] font-medium leading-snug text-ink group-hover:underline group-hover:underline-offset-4">
                            {product.label}
                            {current ? <span aria-hidden className="size-1.5 rounded-full bg-logo-red" /> : null}
                          </span>
                          {product.description ? <span className="mt-0.5 text-sm leading-snug text-pretty text-muted">{product.description}</span> : null}
                        </span>
                        <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-signal transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
          <div className="border-t border-line pt-1">
            <Link
              href={menu.overview.href}
              aria-current={pathname === menu.overview.href ? "page" : undefined}
              className="group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-ink underline-offset-4 hover:underline"
            >
              {menu.overview.label}
              <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </NavMenu>
  );
}
