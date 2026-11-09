"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AdobeNav, MapleRecordNav, NavItem, ServicesNav } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { AdobeMenu } from "./adobe-menu";
import { MapleRecordMenu } from "./maplerecord-menu";
import { ServicesMenu } from "./services-menu";

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Services is "you are here" on the hub and on every page its menu reaches, except pages that have
 * their own top-level item (Adobe Services, MapleRecord), so only one item is ever marked.
 */
export function isServicesActive(pathname: string, services: ServicesNav, items: NavItem[]) {
  if (isActivePath(pathname, services.overview.href)) return true;
  if (items.some((i) => i.href !== services.overview.href && isActivePath(pathname, i.href))) return false;
  const hrefs = [...services.pillars.flatMap((p) => [p.href, ...(p.links ?? []).map((l) => l.href)]), services.aiGovernance.href];
  return hrefs.some((href) => isActivePath(pathname, href));
}

function linkClassName(active: boolean, withMenu: boolean) {
  return cn(
    "relative inline-flex min-h-11 items-center whitespace-nowrap rounded-full text-[0.875rem] text-ink-soft transition-colors hover:text-ink",
    // The ring stays on the pill's edge (inside the 44px hit area) instead of spilling over the next item.
    "focus-visible:outline-offset-0",
    "after:absolute after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:rounded-full after:bg-ink after:transition-transform after:duration-300 after:ease-out-quint hover:after:scale-x-100",
    withMenu
      ? "pl-2 pr-0.5 after:left-2 after:right-0.5"
      : "px-2 after:inset-x-2",
    // "You are here" is a heavier red rule, not just a colour change from the 1px hover line.
    active && "text-ink after:h-0.5 after:scale-x-100 after:bg-signal",
  );
}

/**
 * Desktop primary links. `services`, `adobe` and `mapleRecord` (built server-side by `getServicesNav`,
 * `getAdobeNav` and `getMapleRecordNav`) attach their disclosure panels to the item whose href matches
 * their overview link.
 */
export function NavLinks({
  items,
  services,
  adobe,
  mapleRecord,
}: {
  items: NavItem[];
  services?: ServicesNav;
  adobe?: AdobeNav;
  mapleRecord?: MapleRecordNav;
}) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center">
      {items.map((item) => {
        if (services && item.href === services.overview.href) {
          const active = isServicesActive(pathname, services, items);
          return <ServicesMenu key={item.href} item={item} menu={services} active={active} linkClassName={linkClassName(active, true)} />;
        }
        const active = isActivePath(pathname, item.href);
        if (adobe && item.href === adobe.overview.href) {
          return <AdobeMenu key={item.href} item={item} menu={adobe} active={active} linkClassName={linkClassName(active, true)} />;
        }
        if (mapleRecord && item.href === mapleRecord.overview.href) {
          return <MapleRecordMenu key={item.href} item={item} menu={mapleRecord} active={active} linkClassName={linkClassName(active, true)} />;
        }
        return (
          <li key={item.href}>
            <Link href={item.href} aria-current={active ? "page" : undefined} className={linkClassName(active, false)}>
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
