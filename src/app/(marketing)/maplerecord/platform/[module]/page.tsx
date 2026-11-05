import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { MrCta, MrHero, MrStatsSection } from "@/features/maplerecord/mr-sections";
import {
  MrDarkChips,
  MrModuleAudience,
  MrModuleCapabilities,
  MrModuleHow,
  MrModuleProblems,
  MrOtherModules,
} from "@/features/maplerecord/platform-sections";
import { getMrModule, getMrModules } from "@/lib/content/maplerecord";
import { pageMetadata } from "@/lib/metadata";

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
  const crumbs = [{ label: "Home", href: "/" }, { label: "MapleRecord", href: "/maplerecord" }, { label: "Platform", href: "/maplerecord/platform" }, { label: m.name }];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, `/maplerecord/platform/${m.slug}`)} />
      <MrHero
        crumbs={crumbs}
        eyebrow={m.name}
        title={m.hero.title}
        description={m.hero.description}
        image={m.hero.image}
        imageAspect="square"
        officialUrl={m.officialUrl}
        meta={<MrDarkChips label="Highlights" items={m.hero.trust.map((t) => ({ label: t }))} />}
      >
        <ButtonLink href="#capabilities" variant="outline-night">
          Explore capabilities
        </ButtonLink>
      </MrHero>
      <MrModuleProblems module={m} />
      <MrModuleHow module={m} />
      <MrStatsSection heading="Benefits you can measure" items={m.impact} />
      <MrModuleCapabilities module={m} />
      <MrModuleAudience module={m} />
      <MrOtherModules modules={others} />
      <MrCta title={m.cta.title} body={m.cta.body} />
    </>
  );
}
