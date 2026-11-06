import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { MrCta } from "@/features/maplerecord/mr-sections";
import { SolutionDirectory, SolutionPlatformBand, SolutionsIndexHero } from "@/features/maplerecord/solution-sections";
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
      <SolutionsIndexHero
        crumbs={crumbs}
        title="MapleRecord solutions by industry and department"
        description="See how MapleRecord, our records management platform, meets the challenges of each sector and each team with five modules for records, requests, workflows, forms and administration."
        industries={industries}
        departments={departments}
      />
      <SolutionDirectory
        id="industries"
        tone="paper"
        eyebrow="Industries"
        title="Built for regulated industries"
        intro="Secure information management, with controls that support regulatory requirements, for sectors where every record, request and audit has to stand up to scrutiny."
        items={industries}
      />
      <SolutionDirectory
        id="departments"
        tone="surface"
        variant="rows"
        eyebrow="Departments"
        title="Built for the teams that run on records"
        intro="Records, requests and workflows for the departments that depend on them every day."
        items={departments}
      />
      <SolutionPlatformBand />
      <MrCta title="Not sure which solution fits?" body="Tell us about your organization. We'll show how MapleRecord fits your records, requests and workflows, and scope the configuration and implementation with you." />
    </>
  );
}
