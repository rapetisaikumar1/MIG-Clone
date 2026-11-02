import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { CtaBand } from "@/features/contact/cta-band";
import { ArticleCard } from "@/features/insights/article-card";
import { DraftBanner } from "@/features/insights/draft-banner";
import { formatDate } from "@/features/insights/format";
import { Breadcrumbs } from "@/features/services/sections";
import { getInsight, getInsights, getPublishedSlugs, loadInsightBody } from "@/lib/content/insights";
import { pageMetadata } from "@/lib/metadata";
import type { InsightTheme } from "@/content/insights";
import type { ContactInterest } from "@/features/contact/schema";

// Published articles are pre-rendered at build time. Drafts are rendered on request in Draft Mode only.
export function generateStaticParams() {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

const themeService: Record<InsightTheme, { href: string; label: string; interest: ContactInterest }> = {
  "AI Governance": { href: "/ai-governance", label: "AI Governance services", interest: "ai-governance" },
  Adobe: { href: "/adobe-services", label: "Adobe Services", interest: "adobe-services" },
  "Data Management": { href: "/data-management", label: "Data Management services", interest: "data-management" },
  "Customer Experience": { href: "/adobe-services", label: "Adobe Services", interest: "adobe-services" },
};

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const article = await getInsight(slug, { includeDrafts: isEnabled });
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${slug}`,
    type: "article",
    noindex: article.status === "draft",
  });
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const article = await getInsight(slug, { includeDrafts: isEnabled });
  if (!article) notFound();

  const Body = await loadInsightBody(slug);
  const related = (await getInsights({ includeDrafts: isEnabled })).filter((a) => a.slug !== slug && a.theme === article.theme).slice(0, 2);
  const service = themeService[article.theme];

  return (
    <>
      {isEnabled ? <DraftBanner /> : null}
      <article>
        <header className="border-b border-line pb-14 pt-10 lg:pt-14">
          <Container>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: article.theme }]} />
            <div className="mt-12 max-w-4xl">
              <Eyebrow>{article.theme}</Eyebrow>
              <h1 className="mt-6 text-h1">{article.title}</h1>
              <p className="mt-6 max-w-[60ch] text-lead text-muted">{article.description}</p>
              <p className="mt-8 flex flex-wrap gap-x-4 gap-y-1 font-mono text-label uppercase text-muted">
                <span>{article.status === "draft" ? "Draft — not published" : <time dateTime={article.published}>{formatDate(article.published)}</time>}</span>
                <span aria-hidden>·</span>
                <span>{article.readingMinutes} min read</span>
                <span aria-hidden>·</span>
                <span>Maverick InnoGarage</span>
              </p>
            </div>
          </Container>
        </header>
        <Container className="grid gap-14 py-16 lg:grid-cols-12 lg:py-20">
          <div className="prose-mig lg:col-span-8">
            <Body />
          </div>
          <aside className="lg:col-span-4" aria-label="Related">
            <div className="rounded-2xl bg-paper-deep p-7 lg:sticky lg:top-28">
              <p className="font-mono text-label uppercase text-muted">Related expertise</p>
              <p className="mt-3 text-lg font-semibold tracking-tight">{service.label}</p>
              <ArrowLink href={service.href} className="mt-2">
                See what&apos;s included
              </ArrowLink>
            </div>
          </aside>
        </Container>
      </article>
      {related.length > 0 ? (
        <section className="border-t border-line py-16" aria-labelledby="more-title">
          <Container>
            <h2 id="more-title" className="font-mono text-label uppercase text-muted">
              More on {article.theme}
            </h2>
            <ul className="mt-8 grid gap-10 md:grid-cols-2">
              {related.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
      <CtaBand title="Want to apply this in your organization?" body="Tell us about your goals and constraints. We'll suggest a practical first step." interest={service.interest} />
    </>
  );
}
