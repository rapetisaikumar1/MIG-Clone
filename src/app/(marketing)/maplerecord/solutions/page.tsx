import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { MrCta, MrHero } from "@/features/maplerecord/mr-sections";
import { SolutionDirectory, SolutionJumpLinks, SolutionPlatformBand } from "@/features/maplerecord/solution-sections";
import { getMrSolutions } from "@/lib/content/maplerecord";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "MapleRecord Solutions",
  description: "MapleRecord solutions for financial services, insurance, healthcare, education, manufacturing, state and local government, and for every department.",
  path: "/maplerecord/solutions",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "MapleRecord", href: "/maplerecord" }, { label: "Solutions" }];

export default function SolutionsPage() {
  const industries = getMrSolutions("industry");
  const departments = getMrSolutions("department");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, "/maplerecord/solutions")} />
      <MrHero
        crumbs={crumbs}
        eyebrow="Solutions"
        title="MapleRecord solutions by industry and department"
        description="See how MapleRecord's records, requests and workflow modules address the challenges of each sector and each team."
        meta={
          <SolutionJumpLinks
            groups={[
              { id: "industries", label: "Industries", count: industries.length },
              { id: "departments", label: "Departments", count: departments.length },
            ]}
          />
        }
      />
      <SolutionDirectory
        id="industries"
        tone="paper"
        eyebrow="Industries"
        title="Built for regulated industries"
        intro="Secure, compliant information management for sectors where every record, request and audit has to stand up to scrutiny."
        items={industries}
      />
      <SolutionDirectory
        id="departments"
        tone="surface"
        eyebrow="Departments"
        title="Built for the teams that run on records"
        intro="Records, requests and workflows for the departments that depend on them every day."
        items={departments}
      />
      <SolutionPlatformBand />
      <MrCta title="Ready to transform your operations?" body="Tell MapleRecord about your organization and see how the platform fits your records, requests and workflows." />
    </>
  );
}
