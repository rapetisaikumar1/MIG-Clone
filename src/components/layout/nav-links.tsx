"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AdobeNav, NavItem } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { AdobeMenu } from "./adobe-menu";

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function linkClassName(active: boolean, withMenu: boolean) {
  return cn(
    "relative inline-flex min-h-11 items-center whitespace-nowrap rounded-full text-[0.9375rem] text-ink-soft transition-colors hover:text-ink",
    "after:absolute after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100",
    withMenu
      ? "pl-2.5 pr-1 after:left-2.5 after:right-1 2xl:pl-3 2xl:after:left-3"
      : "px-2.5 after:inset-x-2.5 2xl:px-3 2xl:after:inset-x-3",
    active && "text-ink after:scale-x-100 after:bg-signal",
  );
}

/**
 * Desktop primary links. `adobe` (built server-side by `getAdobeNav`) attaches the Adobe
 * applications disclosure to the item whose href matches its overview link.
 */
export function NavLinks({ items, adobe }: { items: NavItem[]; adobe?: AdobeNav }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-0.5 2xl:gap-1">
      {items.map((item) => {
        const active = isActivePath(pathname, item.href);
        if (adobe && item.href === adobe.overview.href) {
          return <AdobeMenu key={item.href} item={item} menu={adobe} active={active} linkClassName={linkClassName(active, true)} />;
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
