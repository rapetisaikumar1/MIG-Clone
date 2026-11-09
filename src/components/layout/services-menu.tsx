"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { NavItem, ServicesNav } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { isActivePath } from "./nav-links";
import { NavMenu } from "./nav-menu";

const itemClass = "relative grid min-h-11 grid-cols-[2rem_1fr] rounded-xl px-3 py-2.5 transition-colors hover:bg-paper";

/** A numbered pillar (or the unnumbered AI Governance row) in the panel's main grid. */
function PillarLink({ number, item, current }: { number?: string; item: NavItem; current: boolean }) {
  return (
    <Link href={item.href} aria-current={current ? "page" : undefined} className={cn(itemClass, current && "bg-paper")}>
      {/* The marker sits in the corner so the current item's label stays aligned with the rest. */}
      {current ? <span aria-hidden className="absolute right-3 top-4 size-1.5 rounded-full bg-logo-red" /> : null}
      <span aria-hidden className="pt-[0.2rem] font-mono text-[0.75rem] leading-snug tabular-nums text-signal">
        {number ?? <ShieldCheck className="size-4 -translate-y-px" strokeWidth={1.75} />}
      </span>
      <span className="flex flex-col pr-4">
        <span className="text-[0.9375rem] font-medium leading-snug text-ink">{item.label}</span>
        {item.description ? <span className="mt-0.5 text-sm leading-snug text-pretty text-muted">{item.description}</span> : null}
      </span>
    </Link>
  );
}

/**
 * Desktop "Services" entry: the shared NavMenu disclosure with the seven Capability Matrix pillars.
 * Pillars 01–06 fill a two-column grid with AI Governance beneath them; pillar 07, which is delivered
 * through our two products, gets the side card, like the Adobe and MapleRecord panels.
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
  const services = menu.pillars.filter((p) => !p.links?.length);
  const products = menu.pillars.find((p) => p.links?.length);
  return (
    <NavMenu item={item} active={active} linkClassName={linkClassName}>
      <div className="grid grid-cols-[1fr_17rem] gap-10 p-7">
        <div>
          <p className="px-3 font-mono text-label uppercase text-muted">Practice pillars</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1">
            {services.map((pillar) => (
              <li key={pillar.href}>
                <PillarLink number={pillar.number} item={pillar} current={isActivePath(pathname, pillar.href)} />
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-line pt-3">
            <ul className="grid grid-cols-2 gap-x-6">
              <li>
                <PillarLink item={menu.aiGovernance} current={isActivePath(pathname, menu.aiGovernance.href)} />
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {products ? (
            <div className="flex flex-col rounded-xl border border-line bg-paper p-5">
              <p className="flex items-center gap-2 font-mono text-label uppercase text-signal">
                <span aria-hidden className="size-1.5 rounded-full bg-logo-red" />
                {products.number} · Our products
              </p>
              <p className="mt-3 font-medium leading-snug text-ink">{products.label}</p>
              <ul className="mt-2 divide-y divide-line">
                {products.links!.map((product) => {
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
