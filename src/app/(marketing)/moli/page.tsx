import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { company, siteUrl } from "@/config/site";
import { moliCta, moliFaqs, moliMeta } from "@/content/moli";
import { CtaBand } from "@/features/contact/cta-band";
import { MoliHero, MoliPillars, MoliRegulations, MoliRelationship } from "@/features/moli/sections";
import { FaqSection } from "@/features/services/sections";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: moliMeta.title, description: moliMeta.description, path: moliMeta.path });

/** Breadcrumb trail for structured data only; visible breadcrumbs were removed site-wide. */
const crumbs = [{ label: "Home", href: "/" }, { label: "Information Governance & Records", href: "/information-governance" }, { label: "MOLI" }];

/*
 * Section rhythm: paper hero → white (four pillars) → paper-deep (privacy regulations) → white (MOLI and
 * MapleRecord) → paper (FAQ) → night CTA. No product screens: MOLI is shown with an abstract diagram only.
 */
export default function MoliPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs, moliMeta.path),
          // Only facts we can state: no operatingSystem, offers, ratings or version.
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "MOLI",
            applicationCategory: "BusinessApplication",
            description: moliMeta.schemaDescription,
            url: `${siteUrl}${moliMeta.path}`,
            publisher: { "@type": "Organization", name: company.name, url: siteUrl },
          },
        ]}
      />
      <MoliHero />
      <MoliPillars />
      <MoliRegulations />
      <MoliRelationship />
      <FaqSection faqs={[...moliFaqs]} />
      <CtaBand title={moliCta.title} body={moliCta.body} interest="records-management" />
    </>
  );
}
