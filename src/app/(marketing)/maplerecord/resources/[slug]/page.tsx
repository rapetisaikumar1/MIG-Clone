import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articleJsonLd, breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { ArrowLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { MrArticleGrid, MrArticleHero, MrArticleImage, MrArticleLayout } from "@/features/maplerecord/resource-sections";
import { MrCta } from "@/features/maplerecord/mr-sections";
import { getMrArticle, getMrArticleExcerpt, getMrArticles } from "@/lib/content/maplerecord";
import type { MrArticle } from "@/lib/content/types";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getMrArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/maplerecord/resources/[slug]">): Promise<Metadata> {
  const a = getMrArticle((await params).slug);
  if (!a) return {};
  return pageMetadata({ title: a.metaTitle ?? a.title, description: metaDescription(a), path: `/maplerecord/resources/${a.slug}`, type: "article" });
}

export default async function MrArticlePage({ params }: PageProps<"/maplerecord/resources/[slug]">) {
  const a = getMrArticle((await params).slug);
  if (!a) notFound();
  const others = getMrArticles().filter((x) => x.slug !== a.slug);
  const path = `/maplerecord/resources/${a.slug}`;
  const crumbs = [{ label: "Home", href: "/" }, { label: "MapleRecord", href: "/maplerecord" }, { label: "Resources", href: "/maplerecord/resources" }, { label: a.title }];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs, path),
          articleJsonLd({ headline: a.title, description: metaDescription(a), path, datePublished: a.published, image: a.image.src }),
        ]}
      />
      <article>
        <MrArticleHero article={a} crumbs={crumbs} />
        <MrArticleImage article={a} />
        <MrArticleLayout article={a} />
      </article>
      {others.length ? (
        <Section tone="deep" spacing="compact" aria-labelledby="more-articles">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <SectionHeading id="more-articles" eyebrow="Keep reading" title="More from the MapleRecord blog" />
              <ArrowLink href="/maplerecord/resources">All resources</ArrowLink>
            </div>
            <div className="mt-10 lg:mt-12">
              <MrArticleGrid articles={others} />
            </div>
          </Container>
        </Section>
      ) : null}
      <MrCta title="See MapleRecord in action" body="Schedule a personalized demo with the MapleRecord team." />
    </>
  );
}

/** First paragraph, cut at a word boundary to fit a meta description. */
function metaDescription(a: MrArticle) {
  const text = getMrArticleExcerpt(a);
  if (!text) return a.title;
  if (text.length <= 160) return text;
  const cut = text.slice(0, 157);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}
