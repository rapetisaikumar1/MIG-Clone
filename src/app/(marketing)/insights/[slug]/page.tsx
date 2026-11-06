import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Children, isValidElement, type ComponentProps, type ReactNode } from "react";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { ArrowLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { CtaBand } from "@/features/contact/cta-band";
import { ArticleCard } from "@/features/insights/article-card";
import { DraftBanner } from "@/features/insights/draft-banner";
import { formatDate, headingId } from "@/features/insights/format";
import progress from "@/features/insights/reading-progress.module.css";
import { Breadcrumbs } from "@/features/services/sections";
import { adobeProductPath, getAdobeProduct } from "@/lib/content/adobe";
import { getInsight, getInsightHeadings, getInsights, getPublishedSlugs, loadInsightBody } from "@/lib/content/insights";
import { pageMetadata } from "@/lib/metadata";
import { company, siteUrl } from "@/config/site";
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

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return Children.toArray(node).map(textOf).join("");
}

/** Article H2s get stable ids so the "In this article" list can link to them. */
function ArticleH2({ children, ...props }: ComponentProps<"h2">) {
  return (
    <h2 id={headingId(textOf(children))} {...props}>
      {children}
    </h2>
  );
}

/** Separator drawn before every meta item except the first, so a wrapped line never ends on a stray dot. */
const metaItem = "before:mr-4 before:text-line-strong before:content-['·'] first:before:hidden";

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const article = await getInsight(slug, { includeDrafts: isEnabled });
  if (!article) return {};
  return pageMetadata({
    title: article.metaTitle ?? article.title,
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
  const headings = await getInsightHeadings(slug);
  // Same-theme articles first, topped up with the latest others so no article ends without onward reading.
  const others = (await getInsights({ includeDrafts: isEnabled })).filter((a) => a.slug !== slug);
  const related = [...others.filter((a) => a.theme === article.theme), ...others.filter((a) => a.theme !== article.theme)].slice(0, 2);
  const relatedTitle = related.every((a) => a.theme === article.theme) ? `More on ${article.theme}` : "More insights";
  // Articles about one Adobe application link to that application's service page and pre-select it in the contact form.
  const product = article.adobeProduct ? getAdobeProduct(article.adobeProduct) : undefined;
  const service = product
    ? { href: adobeProductPath(product.slug), label: `Adobe ${product.shortName} services`, interest: "adobe-services" as const }
    : themeService[article.theme];
  const path = `/insights/${slug}`;
  // The visible crumb uses the short title so it fits on one line on phones; the H1 below carries the full title.
  // The JSON-LD crumbs use the same list, so structured data matches what is shown.
  const crumbs = [{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: article.metaTitle ?? article.title }];
  // Structured data only for published articles; drafts are noindex previews.
  const jsonLd =
    article.status === "published"
      ? [
          breadcrumbJsonLd(crumbs, path),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: article.title,
            description: article.description,
            datePublished: article.published,
            url: `${siteUrl}${path}`,
            mainEntityOfPage: `${siteUrl}${path}`,
            image: `${siteUrl}/opengraph-image`,
            articleSection: article.theme,
            inLanguage: "en-US",
            author: { "@type": "Organization", name: company.name, url: siteUrl },
            publisher: { "@type": "Organization", name: company.name, url: siteUrl },
          },
        ]
      : null;

  return (
    <>
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      {isEnabled ? <DraftBanner /> : null}
      <div aria-hidden className={progress.bar} />
      <article>
        <header className="border-b border-line pb-12 pt-10 lg:pb-14 lg:pt-14">
          <Container>
            <Breadcrumbs items={crumbs} />
            <div className="mt-12 max-w-4xl">
              <Eyebrow>{article.theme}</Eyebrow>
              <h1 className="mt-6 text-h1 text-balance">{article.title}</h1>
              <p className="mt-6 max-w-[60ch] text-lead text-muted">{article.description}</p>
              <p className="mt-8 flex flex-wrap gap-x-4 gap-y-1 font-mono text-label uppercase text-muted">
                <span className={metaItem}>
                  {article.status === "draft" ? "Draft — not published" : <time dateTime={article.published}>{formatDate(article.published)}</time>}
                </span>
                <span className={metaItem}>{article.readingMinutes} min read</span>
              </p>
            </div>
          </Container>
        </header>
        <Container className="grid gap-y-14 py-14 lg:grid-cols-[minmax(0,40rem)_minmax(0,1fr)] lg:py-20 lg:gap-x-12 xl:gap-x-28">
          <div className="prose-mig max-w-[40rem]">
            <Body components={{ h2: ArticleH2 }} />
          </div>
          {/* Desktop only: on smaller screens the inline service link in the article and the closing band cover the same ground. */}
          <div className="hidden lg:block">
            <div className="sticky top-28 space-y-10">
              {headings.length > 1 ? (
                <nav aria-labelledby="toc-title">
                  <p id="toc-title" className="font-mono text-label uppercase text-muted">
                    In this article
                  </p>
                  <ol className="mt-4 border-l border-line">
                    {headings.map((h) => (
                      <li key={h}>
                        <a
                          href={`#${headingId(h)}`}
                          className="-ml-px flex min-h-10 items-center border-l-2 border-transparent py-1.5 pl-4 text-[0.9375rem] leading-snug text-muted transition-colors hover:border-ink hover:text-ink"
                        >
                          {h}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}
              <aside aria-label="Related" className="rounded-2xl bg-paper-deep p-5 xl:p-7">
                <p className="font-mono text-label uppercase text-muted">Related expertise</p>
                <p className="mt-3 text-lg font-semibold tracking-tight">{service.label}</p>
                <ArrowLink href={service.href} className="mt-2">
                  See what&apos;s included
                </ArrowLink>
              </aside>
            </div>
          </div>
        </Container>
      </article>
      {related.length > 0 ? (
        <section className="border-t border-line py-14 sm:py-16" aria-labelledby="more-title">
          <Container>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <h2 id="more-title" className="font-mono text-label uppercase text-muted">
                {relatedTitle}
              </h2>
              <Link
                href="/insights"
                className="inline-flex min-h-11 items-center text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-signal"
              >
                All insights
              </Link>
            </div>
            <ul className="mt-8 grid gap-x-10 gap-y-12 md:grid-cols-2">
              {related.map((a) => (
                <li key={a.slug} className="reveal">
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
      <CtaBand title="Want to apply this in your organization?" body="Tell us about your goals and constraints. We'll scope a practical first step with you." interest={service.interest} product={product?.slug} />
    </>
  );
}
