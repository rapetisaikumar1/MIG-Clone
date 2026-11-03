import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "@/components/ui/external-link";
import { Container, Eyebrow } from "@/components/ui/layout";
import { formatDate } from "@/features/insights/format";
import { MrCta } from "@/features/maplerecord/mr-sections";
import { Breadcrumbs } from "@/features/services/sections";
import { getMrArticle, getMrArticleExcerpt, getMrArticles } from "@/lib/content/maplerecord";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getMrArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/maplerecord/resources/[slug]">): Promise<Metadata> {
  const a = getMrArticle((await params).slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: getMrArticleExcerpt(a).slice(0, 155) || a.title, path: `/maplerecord/resources/${a.slug}`, type: "article" });
}

export default async function MrArticlePage({ params }: PageProps<"/maplerecord/resources/[slug]">) {
  const a = getMrArticle((await params).slug);
  if (!a) notFound();
  const others = getMrArticles().filter((x) => x.slug !== a.slug);

  return (
    <>
      <article>
        <header className="border-b border-line pb-12 pt-10 lg:pt-12">
          <Container>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "MapleRecord", href: "/maplerecord" }, { label: "Resources", href: "/maplerecord/resources" }, { label: a.category }]} />
            <div className="mt-10 max-w-4xl">
              <Eyebrow>{a.category}</Eyebrow>
              <h1 className="mt-6 text-h1">{a.title}</h1>
              <p className="mt-6 font-mono text-label uppercase text-muted">
                <time dateTime={a.published}>{formatDate(a.published)}</time> · MapleRecord blog
              </p>
            </div>
            <div className="mt-10 overflow-hidden rounded-3xl border border-line">
              <Image src={a.image.src} alt={a.image.alt} width={a.image.width} height={a.image.height} preload sizes="(min-width: 1280px) 76rem, 100vw" className="aspect-[21/9] h-auto w-full object-cover" />
            </div>
          </Container>
        </header>
        <Container className="grid gap-14 py-14 lg:grid-cols-12 lg:py-20">
          <div className="prose-mig lg:col-span-8">
            {a.blocks.map((b, i) =>
              b.type === "list" ? (
                <ul key={i}>
                  {b.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : b.type === "heading" ? (
                <h2 key={i}>{b.text}</h2>
              ) : (
                <p key={i}>{b.text.startsWith("Outcome:") || b.text.startsWith("ROI Impact:") ? <Lead text={b.text} /> : b.text}</p>
              ),
            )}
          </div>
          <aside className="lg:col-span-4" aria-label="About this article">
            <div className="rounded-2xl bg-paper-deep p-7 lg:sticky lg:top-40">
              <p className="font-mono text-label uppercase text-muted">Published by MapleRecord</p>
              <p className="mt-3 text-[0.9375rem] text-ink-soft">This article is reproduced from the official MapleRecord blog.</p>
              <ExternalLink href={a.officialUrl} className="mt-3">
                Read on maplerecord.com
              </ExternalLink>
            </div>
          </aside>
        </Container>
      </article>
      <section className="border-t border-line py-14" aria-labelledby="more-articles">
        <Container>
          <h2 id="more-articles" className="font-mono text-label uppercase text-muted">
            More from the MapleRecord blog
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/maplerecord/resources/${o.slug}`} className="block h-full rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-ink">
                  <span className="block font-mono text-label uppercase text-muted">{o.category}</span>
                  <span className="mt-2 block text-lg font-semibold leading-snug tracking-tight">{o.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <MrCta title="See MapleRecord in action" body="Schedule a personalized demo with the MapleRecord team." />
    </>
  );
}

function Lead({ text }: { text: string }) {
  const [label, ...rest] = text.split(":");
  return (
    <>
      <strong>{label}:</strong>
      {rest.join(":")}
    </>
  );
}
