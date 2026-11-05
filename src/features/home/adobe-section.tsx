import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
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

/** Home page showcase of the Adobe practice: applications by area, the partner statement and the assessment entry point. */
export function AdobeSection() {
  const groups = groupByArea(getAdobeProducts());

  return (
    <Section id="adobe" tone="deep" aria-labelledby="adobe-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                id="adobe-title"
                eyebrow="Adobe Services"
                title="Adobe Experience Cloud, implemented and connected"
                intro="We implement, integrate and optimize the Adobe applications below, and connect them to each other and to your enterprise systems so profiles, content and measurement work from the same data."
              />
              <p className="mt-8 max-w-[48ch] text-[0.9375rem] text-muted">
                Not sure where to start? An Adobe platform assessment reviews how your applications are configured and used,
                and ends with prioritized opportunities.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={adobeAssessmentPath} arrow className="py-3 text-center leading-snug">
                  Request an assessment
                </ButtonLink>
                <ButtonLink href={adobeServicesPath} variant="outline">
                  Explore Adobe Services
                </ButtonLink>
              </div>
            </div>
          </div>

          <ul className="border-t border-ink lg:col-span-7">
            {groups.map((group) => (
              <li key={group.area} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[11rem_1fr] sm:gap-8 sm:py-5">
                <h3 className="pt-2 font-mono text-label uppercase text-muted sm:pt-3">{group.area}</h3>
                <ul>
                  {group.products.map((product) => (
                    <li key={product.slug}>
                      <Link
                        href={adobeProductPath(product.slug)}
                        className="group flex min-h-12 items-start justify-between gap-6 py-2"
                      >
                        <span>
                          <span className="block font-semibold tracking-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                            {product.name}
                          </span>
                          <span className="mt-1 block text-[0.9375rem] text-muted">{product.summary}</span>
                        </span>
                        <ArrowRight
                          aria-hidden
                          className="mt-1 size-4 shrink-0 text-muted transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-signal"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <AdobePartnerPanel className="mt-14 lg:mt-16" />
      </Container>
    </Section>
  );
}
