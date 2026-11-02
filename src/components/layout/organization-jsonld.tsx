import { company, siteUrl } from "@/config/site";

/** Organization structured data built only from verified fields in config/site.ts. */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    alternateName: company.shortName,
    url: siteUrl,
    logo: `${siteUrl}/brand/mig-logo.svg`,
    sameAs: company.social.map((s) => s.href),
    address: company.offices.map((o) => ({
      "@type": "PostalAddress",
      streetAddress: o.streetLines.join(", "),
      addressLocality: o.locality,
      addressRegion: o.regionCode,
      postalCode: o.postalCode,
      addressCountry: o.country,
    })),
    contactPoint: company.offices.map((o) => ({
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
