import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader, SkipLink } from "@/components/layout/site-header";
import { aiGovernanceNav, contactCta, pillarsNav, servicesPath, type NavItem } from "@/config/navigation";
import { contactHref } from "@/features/contact/links";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

// The service pillars, our two products (pillar 07), AI Governance, then the hub and company pages:
// twelve cards fill the two- and three-column grids evenly.
const destinations: NavItem[] = [
  ...pillarsNav.flatMap((p) => p.links ?? [{ label: p.label, href: p.href, description: p.description }]),
  aiGovernanceNav,
  { label: "All services", href: servicesPath, description: "The seven practice pillars in one place" },
  { label: "Insights", href: "/insights", description: "Articles on AI governance, Adobe, data and customer experience" },
  { label: "About", href: "/about", description: "Who we are and how we deliver" },
];

export default function NotFound() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <section className="py-20 sm:py-28">
          <Container>
            <Eyebrow>404 · Page not found</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-h1">We couldn&rsquo;t find that page.</h1>
            <p className="mt-6 max-w-[56ch] text-lead text-muted">
              The link may be out of date, or the page may have moved when we reorganized the site. Pick up from one of these
              sections, or tell us what you were looking for.
            </p>

            <nav aria-labelledby="not-found-links" className="mt-12">
              <h2 id="not-found-links" className="font-mono text-label uppercase text-muted">
                Popular sections
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {destinations.map((item) => (
                  <li key={item.href} className="flex">
                    <Link
                      href={item.href}
                      className="card-lift group flex min-h-24 w-full items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-ink/40 focus-visible:border-ink"
                    >
                      <span>
                        <span className="block font-medium text-ink">{item.label}</span>
                        {item.description ? <span className="mt-1 block text-sm leading-snug text-muted">{item.description}</span> : null}
                      </span>
                      <ArrowRight
                        aria-hidden
                        className="mt-1 size-4 shrink-0 text-signal transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {/* Straight to the form, like every other in-page "Talk to an Expert". */}
              <ButtonLink href={contactHref()} arrow>
                {contactCta.label}
              </ButtonLink>
              <ButtonLink href="/" variant="outline">
                Go to the homepage
              </ButtonLink>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
