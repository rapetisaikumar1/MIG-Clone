import { contactCta, getAdobeNav, primaryNav } from "@/config/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { AdobePartnerBadge } from "./adobe-partner-badge";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  // Built here (server) so only labels and hrefs, not product content, reach the client menus.
  const adobe = getAdobeNav();
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75">
      <Container className="flex h-[4.75rem] items-center justify-between gap-4 2xl:gap-6">
        <div className="flex shrink-0 items-center gap-2 min-[360px]:gap-3 sm:gap-5 xl:gap-4 2xl:gap-5">
          <Logo preload width={112} />
          <AdobePartnerBadge />
        </div>
        <nav aria-label="Primary" className="hidden xl:block">
          <NavLinks items={primaryNav} adobe={adobe} />
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <ButtonLink href={contactCta.href} size="sm" className="hidden whitespace-nowrap sm:inline-flex">
            {contactCta.label}
          </ButtonLink>
          <MobileNav items={primaryNav} cta={contactCta} adobe={adobe} />
        </div>
      </Container>
    </header>
  );
}

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-50 rounded-full bg-ink px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to content
    </a>
  );
}
