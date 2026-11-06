"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { AdobeNav, NavItem } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { NavMenu } from "./nav-menu";

/** Desktop "Adobe Services" entry: the shared NavMenu disclosure with the Adobe applications panel. */
export function AdobeMenu({
  item,
  menu,
  active,
  linkClassName,
}: {
  item: NavItem;
  menu: AdobeNav;
  active: boolean;
  linkClassName: string;
}) {
  const pathname = usePathname();
  return (
    <NavMenu item={item} active={active} linkClassName={linkClassName} >
      <div className="grid grid-cols-[1fr_17rem] gap-10 p-7">
        <div>
          <p className="px-3 font-mono text-label uppercase text-muted">Adobe applications</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1">
            {menu.products.map((product) => {
              const current = pathname === product.href;
              return (
                <li key={product.href}>
                  <Link
                    href={product.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "relative flex min-h-11 flex-col justify-center rounded-xl px-3 py-2.5 transition-colors hover:bg-paper",
                      current && "bg-paper",
                    )}
                  >
                    {/* The marker sits in the corner so the current item's label stays aligned with the rest. */}
                    {current ? <span aria-hidden className="absolute right-3 top-4 size-1.5 rounded-full bg-logo-red" /> : null}
                    <span className="pr-4 text-[0.9375rem] font-medium leading-snug text-ink">
                      <span className="sr-only">Adobe </span>
                      {product.label}
                    </span>
                    <span className="mt-0.5 text-sm leading-snug text-pretty text-muted">{product.summary ?? product.area}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col rounded-xl border border-line bg-paper p-5">
            <p className="flex items-center gap-2 font-mono text-label uppercase text-signal">
              <span aria-hidden className="size-1.5 rounded-full bg-logo-red" />
              Start here
            </p>
            <p className="mt-3 font-medium leading-snug text-ink">{menu.assessment.label}</p>
            {menu.assessment.description ? (
              <p className="mt-2 text-sm leading-relaxed text-muted">{menu.assessment.description}</p>
            ) : null}
            <Link
              href={menu.assessment.href}
              aria-current={pathname === menu.assessment.href ? "page" : undefined}
              className="group mt-2 inline-flex min-h-11 items-center gap-2 self-start text-[0.9375rem] font-medium text-signal underline-offset-4 hover:text-signal-hover hover:underline"
            >
              Explore the assessment
              <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
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
