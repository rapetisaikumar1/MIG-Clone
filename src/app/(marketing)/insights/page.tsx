import { draftMode } from "next/headers";
import { Container, Eyebrow } from "@/components/ui/layout";
import { insightThemes } from "@/content/insights";
import { CtaBand } from "@/features/contact/cta-band";
import { DraftBanner } from "@/features/insights/draft-banner";
import { InsightsFilter } from "@/features/insights/insights-filter";
import { getInsights } from "@/lib/content/insights";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Articles on data governance, Adobe platforms and customer experience from Maverick InnoGarage.",
  path: "/insights",
});

export default async function InsightsPage() {
  const { isEnabled: drafts } = await draftMode();
  const articles = await getInsights({ includeDrafts: drafts });
  return (
    <>
      {drafts ? <DraftBanner /> : null}
      <section className="border-b border-line pb-16 pt-14 sm:pt-20 lg:pb-20">
        <Container>
          <Eyebrow>Insights</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-h1">Practical thinking on data and digital experience.</h1>
          <p className="mt-6 max-w-[58ch] text-lead text-muted">
            Articles from our team on data governance, Adobe platforms and customer experience, organized by theme.
          </p>
        </Container>
      </section>
      <section className="py-16 sm:py-20" aria-label="Articles">
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
      <CtaBand title="Have a question this didn't answer?" body="Talk to the people who wrote it. We're happy to discuss your situation." />
    </>
  );
}
