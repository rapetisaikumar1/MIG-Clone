import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader, SkipLink } from "@/components/layout/site-header";
import { expertiseNav } from "@/config/navigation";

export default function NotFound() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <section className="py-24 sm:py-32">
          <Container>
            <Eyebrow>404 · Page not found</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-h1">We couldn&apos;t find that page.</h1>
            <p className="mt-6 max-w-[56ch] text-lead text-muted">
              Our website has been reorganized around three specializations. The page you&apos;re after may have moved to one of these:
            </p>
            <ul className="mt-10 flex flex-col gap-3 sm:flex-row">
              {expertiseNav.map((item) => (
                <li key={item.href}>
                  <ButtonLink href={item.href} variant="outline">
                    {item.label}
                  </ButtonLink>
                </li>
              ))}
            </ul>
            <ButtonLink href="/" variant="ink" className="mt-8" arrow>
              Go to the homepage
            </ButtonLink>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
