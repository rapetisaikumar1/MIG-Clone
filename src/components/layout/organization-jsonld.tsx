import { company, siteUrl } from "@/config/site";

/** Organization structured data built only from verified fields in config/site.ts. */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    alternateName: company.shortName,
    description: company.descriptor,
    // The four core areas first (owner direction, 2026-11-10), then the supporting Capability Matrix pillars
    // (October 2026); topics, not credentials.
    knowsAbout: [
      "Information governance",
      "Records management",
      "Data governance",
      "AI governance",
      "Marketing technology",
      "Adobe Experience Cloud",
      "Data strategy and analytics",
      "Data engineering",
      "Cloud engineering",
      "DevOps",
      "AI/ML enablement",
      "Experience design",
      "Digital product development",
      "Business transformation",
      "Microsoft Dynamics 365",
    ],
    url: siteUrl,
    logo: `${siteUrl}/brand/mig-logo.svg`,
    sameAs: company.social.map((s) => s.href),
    // Confirmed by Maverick InnoGarage (2026-11-06): MapleRecord is its own product.
    brand: [
      { "@type": "Brand", name: "MapleRecord", url: `${siteUrl}/maplerecord` },
      { "@type": "Brand", name: "MOLI", url: `${siteUrl}/moli` },
    ],
    address: company.offices.map((o) => ({
      "@type": "PostalAddress",
      streetAddress: o.streetLines.join(", "),
      addressLocality: o.locality,
      addressRegion: o.regionCode,
      postalCode: o.postalCode,
      addressCountry: o.country,
    })),
    // One entry per number: Delaware and Texas share +19409456180.
    contactPoint: company.offices
      .flatMap((o) => (o.phone ? [{ ...o, phone: o.phone }] : []))
      .filter((o, i, all) => all.findIndex((x) => x.phone.e164 === o.phone.e164) === i)
      .map((o) => ({
        "@type": "ContactPoint",
        telephone: o.phone.e164,
        contactType: "sales",
        areaServed: o.country,
      })),
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped cannot break out of the script element
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
