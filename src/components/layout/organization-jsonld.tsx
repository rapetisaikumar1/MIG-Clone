import { company, siteUrl } from "@/config/site";

/** Organization structured data built only from verified fields in config/site.ts. */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    alternateName: company.shortName,
    description: company.descriptor,
    // The four specializations and MapleRecord's domain (owner directive 2026-11-07); topics, not credentials.
    knowsAbout: [
      "AI governance",
      "Responsible AI",
      "AI risk management",
      "Adobe Experience Cloud",
      "Data management",
      "Data governance",
      "Software development",
      "Enterprise software",
      "Records management",
    ],
    url: siteUrl,
    logo: `${siteUrl}/brand/mig-logo.svg`,
    sameAs: company.social.map((s) => s.href),
    // Confirmed by Maverick InnoGarage (2026-11-06): MapleRecord is its own product.
    brand: { "@type": "Brand", name: "MapleRecord", url: `${siteUrl}/maplerecord` },
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
