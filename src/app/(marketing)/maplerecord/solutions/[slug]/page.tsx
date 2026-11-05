import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { MrCta, MrHero, MrSecuritySection, MrStatsSection } from "@/features/maplerecord/mr-sections";
import {
  SolutionChallenges,
  SolutionHeroChips,
  SolutionModules,
  SolutionRelated,
  SolutionUseCases,
  SolutionWorkflow,
} from "@/features/maplerecord/solution-sections";
import { getMrSolution, getMrSolutions } from "@/lib/content/maplerecord";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getMrSolutions().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/maplerecord/solutions/[slug]">): Promise<Metadata> {
  const s = getMrSolution((await params).slug);
  return s ? pageMetadata({ title: `${s.label} — MapleRecord`, description: s.metaDescription ?? s.description, path: `/maplerecord/solutions/${s.slug}` }) : {};
}

export default async function SolutionPage({ params }: PageProps<"/maplerecord/solutions/[slug]">) {
  const s = getMrSolution((await params).slug);
  if (!s) notFound();
  const industry = s.kind === "industry";
  const siblings = getMrSolutions(s.kind).filter((x) => x.slug !== s.slug);
  const crumbs = [{ label: "Home", href: "/" }, { label: "MapleRecord", href: "/maplerecord" }, { label: "Solutions", href: "/maplerecord/solutions" }, { label: s.label }];
  // Industries explain the modules; departments walk through a request end to end.
  const howId = s.modules ? "modules" : s.workflow ? "workflow" : null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, `/maplerecord/solutions/${s.slug}`)} />
      <MrHero
        crumbs={crumbs}
        eyebrow={industry ? "Industry solutions" : "Department solutions"}
        title={s.title}
        description={s.description}
        image={s.image}
        imageLabel={s.label}
        imageFit={industry ? "top" : "contain"}
        imageAspect="square"
        officialUrl={s.officialUrl}
        meta={<SolutionHeroChips solution={s} />}
      >
        {howId ? (
          <ButtonLink href={`#${howId}`} variant="outline-night">
            See how it works
          </ButtonLink>
        ) : null}
      </MrHero>

      <SolutionChallenges {...s.challenges} />
      {s.modules ? <SolutionModules label={s.label} {...s.modules} /> : null}
      {s.workflow ? <SolutionWorkflow {...s.workflow} /> : null}
      <MrStatsSection eyebrow="Business impact" heading={s.impact.heading} items={s.impact.items} />
      <SolutionUseCases {...s.useCases} />
      <MrSecuritySection {...s.security} />
      <SolutionRelated current={s} siblings={siblings} />
      <MrCta title={s.cta.title} body={s.cta.body} />
    </>
  );
}
