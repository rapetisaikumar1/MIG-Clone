import { contactCta, getAdobeNav, getMapleRecordNav, getServicesNav, mobileNav, primaryNav } from "@/config/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { AdobePartnerBadge } from "./adobe-partner-badge";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { MobileNav } from "./mobile-nav";

/**
 * Sticky site header. The bar is near-opaque paper (a light blur only softens what scrolls beneath),
 * so it keeps its paper tone over the night sections instead of turning a muddy grey; `site-header`
 * adds a soft shadow under it once the page has scrolled (CSS scroll timeline, see globals.css).
 */
export function SiteHeader() {
  // Built here (server) so only labels and hrefs, not product content, reach the client menus.
  const services = getServicesNav();
  const adobe = getAdobeNav();
  const mapleRecord = getMapleRecordNav();
  return (
    <header className="site-header sticky top-0 z-40 border-b border-line/80 bg-paper/[0.97] backdrop-blur-md">
      <Container className="flex h-[4.75rem] items-center justify-between gap-4 xl:gap-3">
        <div className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-5 xl:gap-3.5">
          {/* A little smaller on phones, so the partner badge beside it can be drawn large enough to read "Bronze". */}
          <Logo preload width={112} imageClassName="w-24 sm:w-28" />
          <AdobePartnerBadge />
        </div>
        <nav aria-label="Primary" className="hidden xl:block">
          <NavLinks items={primaryNav} services={services} adobe={adobe} mapleRecord={mapleRecord} />
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <ButtonLink href={contactCta.href} size="sm" className="hidden whitespace-nowrap sm:inline-flex xl:px-4">
            {contactCta.label}
          </ButtonLink>
          {/* Below xl the sheet carries the whole menu, with Services, Adobe and MapleRecord expanded into their pages. */}
          <MobileNav items={mobileNav} cta={contactCta} services={services} adobe={adobe} mapleRecord={mapleRecord} />
        </div>
      </Container>
    </header>
  );
}

/**
 * Visually hidden until focused (`not-focus:sr-only`, so focusing it never goes through the padding-less
 * `not-sr-only` reset), then slid down into view with its full padding, above the header.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed left-4 top-3 z-[70] inline-flex not-focus:sr-only min-h-11 -translate-y-[calc(100%+1rem)] items-center rounded-full bg-ink px-5 text-sm font-medium text-paper focus:translate-y-0 focus:shadow-[0_8px_24px_-8px_rgb(17_17_17/0.45)] focus-visible:outline-offset-2 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out-quint"
    >
      Skip to content
    </a>
  );
}
