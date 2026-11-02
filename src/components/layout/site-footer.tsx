import Link from "next/link";
import { company, formatAddress } from "@/config/site";
import { footerNav, legalNav } from "@/config/navigation";
import { Container } from "@/components/ui/layout";
import { Logo } from "./logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-night bg-night text-night-text">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="white" width={132} />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-night-muted">{company.positioning}</p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Social media">
              {company.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded-full border border-night-line px-4 text-sm text-night-text transition-colors hover:border-night-muted"
                  >
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-4">
            {footerNav.map((group) => (
              <div key={group.heading}>
                <h2 className="font-mono text-label uppercase text-night-muted">{group.heading}</h2>
                <ul className="mt-4 space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="inline-flex min-h-10 items-center text-[0.9375rem] hover:text-white hover:underline hover:underline-offset-4">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-4">
            <h2 className="font-mono text-label uppercase text-night-muted">Offices</h2>
            <ul className="mt-4 grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
              {company.offices.map((office) => (
                <li key={office.id}>
                  <p className="font-medium">{office.label}</p>
                  <address className="mt-1 text-sm not-italic leading-relaxed text-night-muted">
                    {formatAddress(office).map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <a href={`tel:${office.phone.e164}`} className="mt-1 inline-block text-night-text hover:underline hover:underline-offset-4">
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
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-night-text hover:underline hover:underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
