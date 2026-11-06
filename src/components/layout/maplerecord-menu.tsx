"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import type { MapleRecordNav, NavItem } from "@/config/navigation";
import { mrModuleIcons } from "@/features/maplerecord/mr-ui";
import { cn } from "@/lib/utils";
import { isActivePath } from "./nav-links";
import { NavMenu } from "./nav-menu";

/**
 * Desktop "MapleRecord" entry: the shared NavMenu disclosure with the product's pages (overview first),
 * its five modules and the demo request. Replaces a separate MapleRecord sub-navigation bar, so the whole
 * site keeps one header.
 */
export function MapleRecordMenu({
  item,
  menu,
  active,
  linkClassName,
}: {
  item: NavItem;
  menu: MapleRecordNav;
  active: boolean;
  linkClassName: string;
}) {
  const pathname = usePathname();
  const isCurrent = (href: string) => (href === menu.overview.href ? pathname === href : isActivePath(pathname, href));
  return (
    <NavMenu item={item} active={active} linkClassName={linkClassName} >
      <div className="grid grid-cols-[1fr_1fr_17rem] gap-10 p-7">
        <div>
          <p className="px-3 font-mono text-label uppercase text-muted">MapleRecord</p>
          <ul className="mt-3 grid gap-y-1">
            {menu.sections.map((section) => {
              const current = isCurrent(section.href);
              return (
                <li key={section.href}>
                  <Link
                    href={section.href}
                    aria-current={current ? "page" : undefined}
                    className={cn("relative flex min-h-11 flex-col justify-center rounded-xl px-3 py-2 transition-colors hover:bg-paper", current && "bg-paper")}
                  >
                    {current ? <span aria-hidden className="absolute right-3 top-4 size-1.5 rounded-full bg-logo-red" /> : null}
                    <span className="pr-4 text-[0.9375rem] font-medium leading-snug text-ink">{section.label}</span>
                    {section.description ? <span className="mt-0.5 text-sm leading-snug text-muted">{section.description}</span> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="px-3 font-mono text-label uppercase text-muted">Modules</p>
          <ul className="mt-3 grid gap-y-1">
            {menu.modules.map((module) => {
              const current = pathname === module.href;
              const Icon = mrModuleIcons[module.slug];
              return (
                <li key={module.href}>
                  <Link
                    href={module.href}
                    aria-current={current ? "page" : undefined}
                    className={cn("relative flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-paper", current && "bg-paper")}
                  >
                    <span aria-hidden className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-paper text-signal ring-1 ring-line">
                      <Icon className="size-4" />
                    </span>
                    <span className="text-[0.9375rem] font-medium leading-snug text-ink">{module.label}</span>
                    {current ? <span aria-hidden className="ml-auto size-1.5 rounded-full bg-logo-red" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <div className="flex flex-col rounded-xl border border-line bg-paper p-5">
            <p className="flex items-center gap-2 font-mono text-label uppercase text-signal">
              <Image aria-hidden src="/maplerecord/maplerecord-leaf.svg" alt="" width={76} height={68} className="h-3 w-auto" />
              See it in action
            </p>
            <p className="mt-3 font-medium leading-snug text-ink">A guided walkthrough of MapleRecord</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">Records, requests, workflows, forms and administration on one platform.</p>
            <a
              href={menu.demo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 inline-flex min-h-11 items-center gap-2 self-start text-[0.9375rem] font-medium text-signal underline-offset-4 hover:text-signal-hover hover:underline"
            >
              {menu.demo.label}
              <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only"> (opens maplerecord.com in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </NavMenu>
  );
}
