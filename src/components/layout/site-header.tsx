import { contactCta, primaryNav } from "@/config/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75">
      <Container className="flex h-[4.75rem] items-center justify-between gap-6">
        <Logo preload width={112} />
        <nav aria-label="Primary" className="hidden lg:block">
          <NavLinks items={primaryNav} />
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href={contactCta.href} size="sm" className="hidden sm:inline-flex">
            {contactCta.label}
          </ButtonLink>
          <MobileNav items={primaryNav} cta={contactCta} />
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
