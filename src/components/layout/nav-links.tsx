"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AdobeNav, MapleRecordNav, NavItem } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { AdobeMenu } from "./adobe-menu";
import { MapleRecordMenu } from "./maplerecord-menu";

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
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
 * Desktop primary links. `adobe` and `mapleRecord` (built server-side by `getAdobeNav` and
 * `getMapleRecordNav`) attach their disclosure panels to the item whose href matches their overview link.
 */
export function NavLinks({ items, adobe, mapleRecord }: { items: NavItem[]; adobe?: AdobeNav; mapleRecord?: MapleRecordNav }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center">
      {items.map((item) => {
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
