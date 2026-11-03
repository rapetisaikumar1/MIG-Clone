import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/ui/button";
import { Container, Section, SectionHeading, Tag } from "@/components/ui/layout";
import { MrCardGrid, MrChecklist, MrCta, MrHero, MrProblemSection, MrSecuritySection, MrStatsSection, MrSteps } from "@/features/maplerecord/mr-sections";
import { getMrModuleName, getMrSolution, getMrSolutions } from "@/lib/content/maplerecord";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getMrSolutions().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/maplerecord/solutions/[slug]">): Promise<Metadata> {
  const s = getMrSolution((await params).slug);
  return s ? pageMetadata({ title: `${s.label} — MapleRecord`, description: s.description, path: `/maplerecord/solutions/${s.slug}` }) : {};
}

export default async function SolutionPage({ params }: PageProps<"/maplerecord/solutions/[slug]">) {
  const s = getMrSolution((await params).slug);
  if (!s) notFound();
  const kindLabel = s.kind === "industry" ? "Industry solutions" : "Department solutions";
  const siblings = getMrSolutions(s.kind).filter((x) => x.slug !== s.slug);

  return (
    <>
      <MrHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "MapleRecord", href: "/maplerecord" },
          { label: "Solutions", href: "/maplerecord/solutions" },
          { label: s.label },
        ]}
        eyebrow={kindLabel}
        title={s.title}
        description={s.description}
        image={s.image}
        officialUrl={s.officialUrl}
        meta={<Tag>{s.tagline}</Tag>}
      />

      <MrProblemSection eyebrow="Challenges" heading={s.challenges.heading} intro={s.challenges.intro} items={s.challenges.items} />

      {s.modules ? (
        <Section tone="surface" aria-labelledby="serves-title">
          <Container>
            <SectionHeading id="serves-title" eyebrow="MapleRecord solutions" title={s.modules.heading} />
            <ul className="mt-12 grid gap-6 lg:grid-cols-3">
              {s.modules.items.map((m) => (
                <li key={m.title} className="flex flex-col rounded-2xl border border-line bg-paper p-7">
                  <p className="font-mono text-label uppercase text-muted">{getMrModuleName(m.module)}</p>
                  <h3 className="mt-3 text-h3">{m.title}</h3>
                  <p className="mt-3 text-muted">{m.body}</p>
                  <div className="mt-6 text-[0.9375rem]">
                    <MrChecklist items={m.bullets} />
                  </div>
                  <ArrowLink href={`/maplerecord/platform/${m.module}`} className="mt-auto pt-8">
                    Learn more about {getMrModuleName(m.module)}
                  </ArrowLink>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {s.workflow ? (
        <Section tone="surface" aria-labelledby="flow-title">
          <Container className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading id="flow-title" eyebrow="Workflow" title={s.workflow.heading} />
            </div>
            <div className="lg:col-span-7">
              <MrSteps steps={s.workflow.steps} />
            </div>
          </Container>
        </Section>
      ) : null}

      <MrStatsSection eyebrow="Business impact" heading={s.impact.heading} items={s.impact.items} />

      <Section aria-labelledby="uc-title">
        <Container>
          <SectionHeading id="uc-title" eyebrow="Use cases" title={s.useCases.heading} />
          <div className="mt-12">
            <MrCardGrid items={s.useCases.items} />
          </div>
        </Container>
      </Section>

      <MrSecuritySection heading={s.security.heading} intro={s.security.intro} items={s.security.items} />

      <Section className="py-16 sm:py-20" aria-labelledby="more-title">
        <Container>
          <h2 id="more-title" className="font-mono text-label uppercase text-muted">
            More {s.kind === "industry" ? "industry" : "department"} solutions
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {siblings.map((x) => (
              <li key={x.slug}>
                <Link href={`/maplerecord/solutions/${x.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm font-medium hover:border-ink">
                  {x.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <MrCta title={s.cta.title} body={s.cta.body} />
    </>
  );
}
