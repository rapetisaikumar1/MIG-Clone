"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { mrOfficial } from "@/content/maplerecord/overview";
import { cn } from "@/lib/utils";

export const mrNav = [
  { label: "Overview", href: "/maplerecord", exact: true },
  { label: "Platform", href: "/maplerecord/platform" },
  { label: "Solutions", href: "/maplerecord/solutions" },
  { label: "Resources", href: "/maplerecord/resources" },
  { label: "About", href: "/maplerecord/about" },
  { label: "Contact", href: "/maplerecord/contact" },
];

/** Secondary navigation for the MapleRecord section; sits under the site header and stays visible. */
export function MrSubnav() {
  const pathname = usePathname();
  return (
    <div className="sticky top-[4.75rem] z-30 border-b border-line bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[78rem] items-center gap-4 px-5 sm:px-8 lg:px-12">
        <Link href="/maplerecord" className="hidden shrink-0 py-3 md:block" aria-label="MapleRecord overview">
          <Image src="/maplerecord/maplerecord-logo.svg" alt="MapleRecord" width={457} height={68} className="h-6 w-auto" />
        </Link>
        <nav
          aria-label="MapleRecord"
          className="-mx-1 min-w-0 flex-1 overflow-x-auto [mask-image:linear-gradient(to_right,black_85%,transparent)] [scrollbar-width:none] md:mx-0 md:flex md:justify-center md:[mask-image:none]"
        >
          <ul className="flex items-center gap-1 py-2 pl-1 pr-12 md:pr-1">
            {mrNav.map((item) => {
              const active = item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-medium transition-colors",
                      active ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-deep hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <a
          href={mrOfficial.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-10 shrink-0 items-center gap-1.5 rounded-full border border-ink/25 px-4 text-sm font-medium hover:border-ink lg:inline-flex"
        >
          Request a demo
          <ArrowUpRight aria-hidden className="size-4" />
          <span className="sr-only"> (opens maplerecord.com in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
