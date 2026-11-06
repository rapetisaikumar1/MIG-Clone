import { draftMode } from "next/headers";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { Container, Eyebrow } from "@/components/ui/layout";
import { insightThemes } from "@/content/insights";
import { CtaBand } from "@/features/contact/cta-band";
import { DraftBanner } from "@/features/insights/draft-banner";
import { InsightsFilter } from "@/features/insights/insights-filter";
import { Breadcrumbs } from "@/features/services/sections";
import { getInsights } from "@/lib/content/insights";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Articles on data governance, Adobe platforms and customer experience from Maverick InnoGarage.",
  path: "/insights",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "Insights" }];

export default async function InsightsPage() {
  const { isEnabled: drafts } = await draftMode();
  const articles = await getInsights({ includeDrafts: drafts });
  return (
    <>
      {drafts ? <DraftBanner /> : null}
      <section className="border-b border-line pb-14 pt-10 lg:pb-16 lg:pt-14">
        <Container>
          <JsonLd data={breadcrumbJsonLd(crumbs, "/insights")} />
          <Breadcrumbs items={crumbs} />
          <div className="mt-12">
            <Eyebrow>Insights</Eyebrow>
            <h1 className="mt-6 max-w-4xl text-h1 text-balance">Practical thinking on data and digital experience.</h1>
            <p className="mt-6 max-w-[58ch] text-lead text-muted">
              Articles from our team on data governance, Adobe platforms and customer experience, organized by theme.
            </p>
          </div>
        </Container>
      </section>
      <section className="py-14 sm:py-20" aria-label="Articles">
        <Container>
          <InsightsFilter
            themes={insightThemes}
            articles={articles.map(({ slug, title, description, theme, published, readingMinutes, status }) => ({
              slug,
              title,
              description,
              theme,
              published,
              readingMinutes,
              status,
            }))}
          />
        </Container>
      </section>
      <CtaBand
        title="Want to talk through your situation?"
        body="Tell us what you're working on and we'll scope a practical first step with you."
      />
    </>
  );
}
