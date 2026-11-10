import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { mrResourceHubs } from "@/content/maplerecord/resources";
import { MrArticleGrid, MrFeaturedArticle, MrHubGrid } from "@/features/maplerecord/resource-sections";
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
        title="MapleRecord blog and resources"
        description="Articles on records management, compliance, and workflow automation, plus videos, webinars, events, and press from the MapleRecord team."
      >
        <ButtonLink href="#resource-hubs" variant="outline-night">
          Videos, webinars &amp; events
        </ButtonLink>
      </MrHero>

      <Section spacing="compact" aria-labelledby="articles-title">
        <Container>
          <SectionHeading id="articles-title" eyebrow="From the MapleRecord blog" title="Latest articles" />
          <div className="reveal mt-10 lg:mt-12">{featured ? <MrFeaturedArticle article={featured} /> : null}</div>
          {rest.length ? (
            <div className="mt-6 lg:mt-8">
              <MrArticleGrid articles={rest} />
            </div>
          ) : null}
        </Container>
      </Section>

      <Section id="resource-hubs" tone="surface" spacing="compact" aria-labelledby="hubs-title" className="border-t border-line">
        <Container>
          <SectionHeading
            id="hubs-title"
            eyebrow="More from MapleRecord"
            title="Videos, webinars, events and press"
            intro="Published and kept up to date on maplerecord.com. Each link opens in a new tab."
          />
          <div className="mt-10 lg:mt-12">
            <MrHubGrid hubs={mrResourceHubs} />
          </div>
          <ArrowLink href="/insights" className="mt-8">
            Maverick InnoGarage insights
          </ArrowLink>
        </Container>
      </Section>

      <MrCta title="Put these ideas into practice with MapleRecord" body="Discover how MapleRecord can help your organization streamline workflows, support compliance, and get more value from your documents." />
    </>
  );
}
