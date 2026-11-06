import Link from "next/link";
import { company, formatAddress } from "@/config/site";
import { getFooterNav, legalNav } from "@/config/navigation";
import { Container } from "@/components/ui/layout";
import { CookieSettingsButton } from "@/features/consent/cookie-settings-button";
import { Logo } from "./logo";

const legalLinkClass =
  "inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:text-night-text hover:underline sm:min-h-8";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const footerNav = getFooterNav();
  // In the two-column (phone) layout the longest list spans two rows, so the short lists stack beside it.
  const longest = Math.max(...footerNav.map((g) => g.items.length));
  return (
    // The hairline top edge separates the footer from a night-toned section (e.g. a CTA band) right above it.
    <footer className="on-night border-t border-night-line bg-night text-night-text">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <Logo variant="white" width={132} loading="eager" />
            <p className="mt-6 max-w-sm text-pretty text-[0.9375rem] leading-relaxed text-night-muted">{company.blurb}</p>
            {/* Two even columns where the column is narrow, so no pill is left alone on a second row. */}
            <ul className="mt-8 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:grid lg:max-w-xs" aria-label="Social media">
              {company.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-night-line px-4 text-sm text-night-text transition-colors hover:border-night-muted hover:bg-white/[0.04]"
                  >
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:col-span-8 xl:col-span-6">
            {footerNav.map((group) => (
              <div key={group.heading} className={group.items.length === longest ? "row-span-2 sm:row-span-1" : undefined}>
                <h2 className="font-mono text-label uppercase text-night-muted">{group.heading}</h2>
                <ul className="mt-4 space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="inline-flex min-h-10 items-center text-[0.9375rem] leading-snug underline-offset-4 transition-colors hover:text-white hover:underline">
                        <span>
                          {item.srPrefix ? <span className="sr-only">{item.srPrefix}</span> : null}
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-12 lg:border-t lg:border-night-line lg:pt-10 xl:col-span-3 xl:border-t-0 xl:pt-0">
            <h2 className="font-mono text-label uppercase text-night-muted">Offices</h2>
            <ul className="mt-4 grid gap-6 sm:grid-cols-3 xl:grid-cols-1">
              {company.offices.map((office) => (
                <li key={office.id}>
                  <p className="font-medium">{office.label}</p>
                  <address className="mt-1 text-sm not-italic leading-relaxed text-night-muted">
                    {formatAddress(office).map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <a href={`tel:${office.phone.e164}`} className="inline-flex min-h-11 items-center text-night-text underline-offset-4 hover:underline sm:min-h-8">
                      {office.phone.display}
                    </a>
                  </address>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-night-line pt-8 text-sm text-night-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={legalLinkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              {/* Reopens the cookie preferences panel; tests rely on this exact accessible name. */}
              <CookieSettingsButton className={`${legalLinkClass} cursor-pointer`}>Cookie settings</CookieSettingsButton>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
