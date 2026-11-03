import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Database, ShieldCheck, Sparkles, Users, Zap } from "lucide-react";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/layout";
import { Tabs } from "@/components/ui/tabs";
import { mrDepartments, mrFaqs, mrFeatures, mrHero, mrOfficial, mrPillars, mrPlatformIntro } from "@/content/maplerecord/overview";
import { MrChecklist, MrCta, MrFigure } from "@/features/maplerecord/mr-sections";
import { FaqSection } from "@/features/services/sections";
import { formatDate } from "@/features/insights/format";
import { getMrArticles, getMrModules, getMrSolutions } from "@/lib/content/maplerecord";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "MapleRecord — AI-First Hybrid Records Management",
  description:
    "MapleRecord is an AI-first hybrid records management system for electronic and physical records, with four integrated modules: MR Records, MR Requests, MR Workflows and MR Forms.",
  path: "/maplerecord",
});

const featureIcons = { sparkles: Sparkles, shield: ShieldCheck, zap: Zap, database: Database, users: Users, chart: BarChart3 };

export default function MapleRecordPage() {
  const modules = getMrModules();
  const industries = getMrSolutions("industry");
  const departments = getMrSolutions("department");
  const articles = getMrArticles();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <Container className="grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-14 lg:pb-20">
          <div className="lg:col-span-6">
            <Eyebrow>MapleRecord</Eyebrow>
            <h1 className="mt-6 text-display font-semibold">{mrHero.eyebrow}</h1>
            <p className="mt-6 max-w-[48ch] text-lead text-muted">{mrHero.title}</p>
            <p className="mt-4 font-medium text-ink-soft">{mrHero.tagline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ExternalLink href={mrOfficial.demo} variant="primary">
                Request a demo
              </ExternalLink>
              <ButtonLink href="#platform" variant="outline">
                Explore the platform
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-muted">
              Information on these pages comes from{" "}
              <a href={mrOfficial.site} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">
                maplerecord.com
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
          <div className="lg:col-span-6">
            <MrFigure image={mrHero.image} preload sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        </Container>
      </section>

      {/* Four modules */}
      <Section id="platform" className="scroll-mt-36" aria-labelledby="platform-title">
        <Container>
          <SectionHeading id="platform-title" eyebrow={mrPlatformIntro.eyebrow} title={mrPlatformIntro.title} intro={mrPlatformIntro.body} />
          <Tabs
            className="mt-12"
            label="MapleRecord modules"
            items={modules.map((m) => ({
              value: m.slug,
              label: m.name,
              content: (
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div>
                    <h3 className="text-h2">{m.name}</h3>
                    <p className="mt-4 text-lead text-muted">{m.summary}</p>
                    <div className="mt-6">
                      <MrChecklist items={m.highlights} />
                    </div>
                    <ArrowLink href={`/maplerecord/platform/${m.slug}`} className="mt-8">
                      Learn more about {m.name}
                    </ArrowLink>
                  </div>
                  <MrFigure image={m.tabImage} sizes="(min-width: 1024px) 34rem, 100vw" />
                </div>
              ),
            }))}
          />
        </Container>
      </Section>

      {/* How we help — by department */}
      <Section tone="surface" aria-labelledby="help-title">
        <Container>
          <SectionHeading id="help-title" eyebrow="How we help" title="How our records management system delivers impact across every department" />
          <Tabs
            className="mt-12"
            label="Departments"
            items={mrDepartments.map((d) => ({
              value: d.solution,
              label: d.name,
              content: (
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div>
                    <h3 className="text-h2">{d.name}</h3>
                    <div className="mt-6 text-[1.0625rem]">
                      <MrChecklist items={[...d.points]} />
                    </div>
                    <ArrowLink href={`/maplerecord/solutions/${d.solution}`} className="mt-8">
                      See the {d.name.toLowerCase()} solution
                    </ArrowLink>
                  </div>
                  <MrFigure image={d.image} sizes="(min-width: 1024px) 34rem, 100vw" />
                </div>
              ),
            }))}
          />
          <p className="mt-8 text-sm text-muted">Figures as published by MapleRecord.</p>
        </Container>
      </Section>

      {/* Four pillars */}
      <Section aria-labelledby="pillars-title">
        <Container>
          <h2 id="pillars-title" className="sr-only">
            Why MapleRecord
          </h2>
          <ul className="space-y-16 lg:space-y-24">
            {mrPillars.map((p, i) => (
              <li key={p.eyebrow} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <div className={i % 2 ? "lg:order-2 lg:col-span-6" : "lg:col-span-6"}>
                  <Eyebrow>{p.eyebrow}</Eyebrow>
                  <h3 className="mt-5 text-h2">{p.title}</h3>
                  <div className="mt-7 text-[1.0625rem]">
                    <MrChecklist items={[...p.points]} />
                  </div>
                  <ExternalLink href={mrOfficial.demo} className="mt-8">
                    Get started today
                  </ExternalLink>
                </div>
                <div className={i % 2 ? "lg:order-1 lg:col-span-6" : "lg:col-span-6"}>
                  <MrFigure image={p.image} sizes="(min-width: 1024px) 34rem, 100vw" />
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Features */}
      <Section tone="night" aria-labelledby="features-title">
        <Container>
          <SectionHeading tone="night" id="features-title" eyebrow={mrFeatures.eyebrow} title={mrFeatures.title} intro={mrFeatures.intro} />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-night-line bg-night-line sm:grid-cols-2 lg:grid-cols-3">
            {mrFeatures.items.map((f) => {
              const Icon = featureIcons[f.icon];
              return (
                <li key={f.title} className="bg-night-raised p-7">
                  <Icon aria-hidden className="size-6 text-logo-red" />
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-night-muted">{f.body}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Solutions */}
      <Section aria-labelledby="solutions-title">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="solutions-title" eyebrow="Solutions" title="Built for your industry and your department" />
            <ArrowLink href="/maplerecord/solutions">All solutions</ArrowLink>
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            {[
              { heading: "Industries", items: industries },
              { heading: "Departments", items: departments },
            ].map((group) => (
              <div key={group.heading}>
                <h3 className="font-mono text-label uppercase text-muted">{group.heading}</h3>
                <ul className="mt-4 border-t border-line">
                  {group.items.map((s) => (
                    <li key={s.slug} className="border-b border-line">
                      <Link href={`/maplerecord/solutions/${s.slug}`} className="group flex min-h-14 items-center justify-between gap-4 py-3 font-medium">
                        {s.label}
                        <ArrowRight aria-hidden className="size-4 shrink-0 text-muted transition-colors group-hover:text-signal" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Latest articles */}
      <Section tone="deep" aria-labelledby="articles-title">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="articles-title" eyebrow="Resources" title="From the MapleRecord blog" />
            <ArrowLink href="/maplerecord/resources">All resources</ArrowLink>
          </div>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link href={`/maplerecord/resources/${a.slug}`} className="group block h-full overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-ink">
                  <Image src={a.image.src} alt="" width={a.image.width} height={a.image.height} sizes="(min-width: 768px) 30vw, 100vw" className="aspect-[16/10] h-auto w-full object-cover" />
                  <div className="p-6">
                    <p className="font-mono text-label uppercase text-muted">
                      {a.category} · <time dateTime={a.published}>{formatDate(a.published)}</time>
                    </p>
                    <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight group-hover:underline group-hover:underline-offset-4">{a.title}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <FaqSection faqs={mrFaqs} title="Got questions? We've got answers" />

      <MrCta
        title="Ready to transform your record management?"
        body="Discover how MapleRecord can help your organization streamline workflows, ensure compliance, and unlock the value in your documents."
      />
    </>
  );
}
