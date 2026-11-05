import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { mrResourceHubs } from "@/content/maplerecord/resources";
import { MrArticleGrid, MrFeaturedArticle, MrHubCard } from "@/features/maplerecord/resource-sections";
import { MrCta, MrHero } from "@/features/maplerecord/mr-sections";
import { getMrArticles } from "@/lib/content/maplerecord";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "MapleRecord Resources",
  description: "MapleRecord blog articles on records management, compliance and workflow automation, plus videos, webinars, events and press.",
  path: "/maplerecord/resources",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "MapleRecord", href: "/maplerecord" }, { label: "Resources" }];

export default function ResourcesPage() {
  const [featured, ...rest] = getMrArticles();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, "/maplerecord/resources")} />
      <MrHero
        crumbs={crumbs}
        eyebrow="Resources"
        title="MapleRecord blog"
        description="Insights, best practices, and thought leadership on records management, compliance, and workflow automation."
      >
        <ButtonLink href="#resource-hubs" variant="outline-night">
          Videos, webinars &amp; events
        </ButtonLink>
      </MrHero>

      <Section spacing="compact" aria-labelledby="articles-title">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <h2 id="articles-title" className="text-h3">
              Latest articles
            </h2>
            <p className="font-mono text-label uppercase text-muted">From the MapleRecord blog</p>
          </div>
          <div className="mt-8 lg:mt-10">{featured ? <MrFeaturedArticle article={featured} /> : null}</div>
          {rest.length ? (
            <div className="mt-6 lg:mt-8">
              <MrArticleGrid articles={rest} />
            </div>
          ) : null}
        </Container>
      </Section>

      <Section id="resource-hubs" tone="surface" aria-labelledby="hubs-title" className="border-t border-line">
        <Container>
          <SectionHeading
            id="hubs-title"
            eyebrow="More from MapleRecord"
            title="Videos, webinars, events and press"
            intro="Published and kept up to date on maplerecord.com. Each link opens in a new tab."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {mrResourceHubs.map((h) => (
              <li key={h.kind}>
                <MrHubCard hub={h} className="bg-paper" />
              </li>
            ))}
          </ul>
          <ArrowLink href="/insights" className="mt-10">
            Maverick InnoGarage insights on data and records
          </ArrowLink>
        </Container>
      </Section>

      <MrCta title="Ready to transform your records management?" body="Discover how MapleRecord can help your organization streamline workflows, ensure compliance, and unlock the value in your documents." />
    </>
  );
}
