import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { AdobePartnerPanel } from "@/features/adobe/partner-panel";
import { adobeAssessmentPath, adobeProductPath, adobeServicesPath, getAdobeProducts } from "@/lib/content/adobe";
import type { AdobeProduct } from "@/lib/content/types";

/** Groups products by capability area, keeping the display order from src/content/adobe/products. */
function groupByArea(products: AdobeProduct[]) {
  const groups: { area: string; products: AdobeProduct[] }[] = [];
  for (const product of products) {
    const group = groups.find((g) => g.area === product.area);
    if (group) group.products.push(product);
    else groups.push({ area: product.area, products: [product] });
  }
  return groups;
}

/**
 * Home page showcase of the Adobe Services section: an application map by capability area, the assessment entry
 * point and the partner statement. Product descriptions are left to /adobe-services and the header menu,
 * so the home page shows names and areas only.
 */
export function AdobeSection() {
  const groups = groupByArea(getAdobeProducts());

  return (
    <Section id="adobe" aria-labelledby="adobe-title">
      <Container>
        <SectionHeading
          id="adobe-title"
          eyebrow="Adobe Services"
          title="The Adobe Experience Cloud applications we implement"
          intro="We implement, integrate and optimize these applications, and connect them to each other and to your enterprise systems so profiles, content and measurement work from the same data."
          className="reveal"
        />

        {/* Application map: one cell per capability area, hairline grid like the expertise columns. */}
        <ul className="mt-14 grid border-t border-ink sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <li
              key={group.area}
              className="reveal flex flex-col border-b border-line py-6 sm:px-6 sm:py-7 sm:max-lg:odd:pl-0 sm:max-lg:even:border-l lg:[&:not(:nth-child(3n+1))]:border-l lg:[&:nth-child(3n+1)]:pl-0"
            >
              <h3 className="font-mono text-label uppercase text-muted">{group.area}</h3>
              <ul className="mt-3">
                {group.products.map((product) => (
                  <li key={product.slug}>
                    <Link href={adobeProductPath(product.slug)} className="group flex min-h-11 items-center justify-between gap-4 py-1.5">
                      <span className="text-lg font-semibold leading-snug tracking-tight decoration-1 underline-offset-4 group-hover:underline">
                        {product.name}
                      </span>
                      <ArrowRight
                        aria-hidden
                        className="size-4 shrink-0 text-muted transition-colors duration-200 group-hover:text-signal motion-safe:transition-[color,transform] motion-safe:group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Assessment entry point: the two actions sit side by side from sm up. */}
        <div className="reveal mt-12 flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-[60ch]">
            <p className="text-lg font-semibold tracking-tight">Not sure where to start?</p>
            <p className="mt-2 text-[0.9375rem] text-muted">
              An Adobe platform assessment reviews how your applications are configured and used, and ends with prioritized
              opportunities. We then implement the priorities with you.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-x-8 gap-y-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href={adobeAssessmentPath} arrow className="py-3 text-center leading-snug">
              Request an assessment
            </ButtonLink>
            <ArrowLink href={adobeServicesPath} className="self-start sm:self-auto">
              Explore Adobe Services
            </ArrowLink>
          </div>
        </div>

        <AdobePartnerPanel className="mt-14 lg:mt-16" />
      </Container>
    </Section>
  );
}
