import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { mrResourceHubs } from "@/content/maplerecord/overview";
import { formatDate } from "@/features/insights/format";
import { MrCta, MrHero } from "@/features/maplerecord/mr-sections";
import { getMrArticleExcerpt, getMrArticles } from "@/lib/content/maplerecord";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "MapleRecord Resources",
  description: "MapleRecord blog articles on records management, compliance and workflow automation, plus videos, webinars, events and press.",
  path: "/maplerecord/resources",
});

export default function ResourcesPage() {
  const [featured, ...rest] = getMrArticles();
  return (
    <>
      <MrHero
        crumbs={[{ label: "Home", href: "/" }, { label: "MapleRecord", href: "/maplerecord" }, { label: "Resources" }]}
        eyebrow="Resources"
        title="MapleRecord blog"
        description="Insights, best practices, and thought leadership on records management, compliance, and workflow automation."
      />

      <Section aria-labelledby="blog-title">
        <Container>
          <h2 id="blog-title" className="sr-only">
            Articles
          </h2>
          {featured ? (
            <Link href={`/maplerecord/resources/${featured.slug}`} className="group grid overflow-hidden rounded-3xl border border-line bg-surface transition-colors hover:border-ink lg:grid-cols-2">
              <Image src={featured.image.src} alt="" width={featured.image.width} height={featured.image.height} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[16/10] h-full w-full object-cover" />
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="font-mono text-label uppercase text-muted">
                  Latest · {featured.category} · <time dateTime={featured.published}>{formatDate(featured.published)}</time>
                </p>
                <p className="mt-4 text-[clamp(1.625rem,1.3rem+1.1vw,2.25rem)] font-semibold leading-[1.15] tracking-tight group-hover:underline group-hover:decoration-2 group-hover:underline-offset-8">{featured.title}</p>
                <p className="mt-4 text-muted">{getMrArticleExcerpt(featured)}</p>
              </div>
            </Link>
          ) : null}
          <ul className="mt-8 grid gap-8 md:grid-cols-2">
            {rest.map((a) => (
              <li key={a.slug}>
                <Link href={`/maplerecord/resources/${a.slug}`} className="group block h-full overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-ink">
                  <Image src={a.image.src} alt="" width={a.image.width} height={a.image.height} sizes="(min-width: 768px) 45vw, 100vw" className="aspect-[16/9] h-auto w-full object-cover" />
                  <div className="p-6">
                    <p className="font-mono text-label uppercase text-muted">
                      {a.category} · <time dateTime={a.published}>{formatDate(a.published)}</time>
                    </p>
                    <p className="mt-3 text-h3 font-semibold group-hover:underline group-hover:underline-offset-4">{a.title}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="hubs-title">
        <Container>
          <SectionHeading
            id="hubs-title"
            eyebrow="More from MapleRecord"
            title="Videos, webinars, events and press"
            intro="These resources are published and kept up to date on maplerecord.com."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mrResourceHubs.map((h) => (
              <li key={h.title} className="flex flex-col rounded-2xl border border-line bg-paper p-7">
                <h3 className="text-h3">{h.title}</h3>
                <p className="mt-3 flex-1 text-[0.9375rem] text-muted">{h.body}</p>
                <ExternalLink href={h.href} className="mt-6">
                  Visit {h.title.toLowerCase()}
                </ExternalLink>
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
