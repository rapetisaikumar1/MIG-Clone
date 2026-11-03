import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading, Tag } from "@/components/ui/layout";
import { MrChecklist, MrRowList, MrCta, MrFigure, MrHero, MrProblemSection, MrStatsSection, MrSteps } from "@/features/maplerecord/mr-sections";
import { getMrModule, getMrModules } from "@/lib/content/maplerecord";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getMrModules().map((m) => ({ module: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/maplerecord/platform/[module]">): Promise<Metadata> {
  const m = getMrModule((await params).module);
  return m ? pageMetadata({ title: `${m.name} — MapleRecord`, description: m.hero.description, path: `/maplerecord/platform/${m.slug}` }) : {};
}

export default async function ModulePage({ params }: PageProps<"/maplerecord/platform/[module]">) {
  const m = getMrModule((await params).module);
  if (!m) notFound();
  const others = getMrModules().filter((x) => x.slug !== m.slug);

  return (
    <>
      <MrHero
        crumbs={[{ label: "Home", href: "/" }, { label: "MapleRecord", href: "/maplerecord" }, { label: "Platform", href: "/maplerecord/platform" }, { label: m.name }]}
        eyebrow={m.name}
        title={m.hero.title}
        description={m.hero.description}
        image={m.hero.image}
        officialUrl={m.officialUrl}
        meta={
          <ul className="flex flex-wrap gap-2" aria-label="Highlights">
            {m.hero.trust.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        }
      >
        <ButtonLink href="#capabilities" variant="outline">
          Explore capabilities
        </ButtonLink>
      </MrHero>

      <MrProblemSection eyebrow={`Why ${m.name}?`} heading={m.why.heading} items={m.why.problems} />

      <Section tone="surface" aria-labelledby="how-title">
        <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHeading id="how-title" eyebrow="How it operates" title={m.how.heading} />
            <div className="mt-10">
              <MrSteps steps={m.how.steps} />
            </div>
          </div>
          <div className="lg:sticky lg:top-40 lg:col-span-6">
            <MrFigure image={m.how.image} className="sm:aspect-[4/5]" sizes="(min-width: 1024px) 34rem, 100vw" />
          </div>
        </Container>
      </Section>

      <MrStatsSection heading="Benefits you can measure" items={m.impact} />

      <Section id="capabilities" className="scroll-mt-36" aria-labelledby="caps-title">
        <Container>
          <SectionHeading id="caps-title" eyebrow="Features" title="Key capabilities" />
          <ul className={cn("mt-12 grid gap-6 sm:grid-cols-2", m.capabilities.length !== 4 && "lg:grid-cols-3")}>
            {m.capabilities.map((c) => (
              <li key={c.title} className="rounded-2xl border border-line bg-surface p-7">
                <h3 className="text-h3">{c.title}</h3>
                <div className="mt-5 text-[0.9375rem] text-ink-soft">
                  <MrChecklist items={c.items} />
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="deep" aria-labelledby="who-title">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="who-title" eyebrow="Use cases" title="Who it helps" intro={m.audience.intro.replace(/:$/, ".")} className="lg:sticky lg:top-40" />
          </div>
          <div className="lg:col-span-8">
            <MrRowList items={m.audience.teams} />
          </div>
        </Container>
      </Section>

      <Section className="py-16 sm:py-20" aria-labelledby="other-title">
        <Container>
          <h2 id="other-title" className="font-mono text-label uppercase text-muted">
            Other MapleRecord modules
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/maplerecord/platform/${o.slug}`} className="block h-full rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-ink">
                  <span className="block text-lg font-semibold tracking-tight">{o.name}</span>
                  <span className="mt-1 block text-[0.9375rem] text-muted">{o.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <MrCta title={m.cta.title} body={m.cta.body} />
    </>
  );
}
