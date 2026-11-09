import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container, Dot, Eyebrow, Section, SectionHeading } from "@/components/ui/layout";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { aiGovernanceNav, servicesPath } from "@/config/navigation";
import { company, siteUrl } from "@/config/site";
import { deliveryApproach } from "@/content/home";
import { industries } from "@/content/industries";
import { CtaBand } from "@/features/contact/cta-band";
import { contactHref } from "@/features/contact/links";
import { AiGovernanceFeature } from "@/features/services/hub/ai-governance-feature";
import { CapabilityMatrix } from "@/features/services/hub/capability-matrix";
import { getCapabilityMatrix, matrixIntro } from "@/features/services/hub/matrix";
import { ApproachSteps } from "@/features/services/sections";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Seven practice pillars and AI governance: data and analytics, cloud engineering, Adobe MarTech, experience design, product, CRM and records management.",
  path: servicesPath,
});

const crumbs = [{ label: "Home", href: "/" }, { label: "Services" }];

const aiGovernanceId = "ai-governance";

const rowArrow =
  "size-4 shrink-0 text-muted transition-colors duration-200 group-hover:text-signal motion-safe:transition-[color,transform] motion-safe:group-hover:translate-x-0.5";

const jumpArrow =
  "size-4 shrink-0 text-muted group-hover:text-signal motion-safe:transition-transform motion-safe:group-hover:translate-y-0.5";

export default function ServicesPage() {
  const pillars = getCapabilityMatrix();

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Maverick InnoGarage capability matrix",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: pillars.length,
    itemListElement: pillars.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: p.label,
        url: `${siteUrl}${p.href}`,
        description: p.capabilities.map((c) => c.label).join(", "),
        provider: { "@type": "Organization", name: company.name, url: siteUrl },
      },
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs, servicesPath), itemList]} />

      {/* Hero: the deck's matrix headline, with a jump list to each pillar and AI Governance on desktop. */}
      <section className="border-b border-line pb-14 pt-10 sm:pb-16 lg:pb-20 lg:pt-14">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Eyebrow>Services</Eyebrow>
              <h1 className="mt-6 text-h1 text-balance">{matrixIntro.title}</h1>
              <p className="mt-7 max-w-[60ch] text-lead text-muted">{matrixIntro.lead}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={contactHref()} arrow>
                  Talk to an Expert
                </ButtonLink>
                <ButtonLink href="#matrix" variant="outline">
                  View the capability matrix
                </ButtonLink>
              </div>
            </div>
            <nav aria-label="On this page" className="hidden lg:col-span-4 lg:col-start-9 lg:block lg:pt-2">
              <p className="font-mono text-label uppercase text-muted">Practice pillars</p>
              <ol className="mt-3 border-t border-line">
                {pillars.map((p) => (
                  <li key={p.id} className="border-b border-line">
                    <Link
                      href={`#${p.id}`}
                      className="group flex min-h-11 items-center gap-4 py-2 text-[0.9375rem] leading-snug text-ink-soft underline-offset-4 hover:text-ink hover:underline"
                    >
                      <span aria-hidden className="w-6 font-mono text-xs text-muted group-hover:text-signal">
                        {p.number}
                      </span>
                      <span className="flex-1">{p.label}</span>
                      <ArrowDown aria-hidden className={jumpArrow} />
                    </Link>
                  </li>
                ))}
              </ol>
              <p className="mt-7 font-mono text-label uppercase text-muted">Responsible AI</p>
              <ul className="mt-3 border-t border-line">
                <li className="border-b border-line">
                  <Link
                    href={`#${aiGovernanceId}`}
                    className="group flex min-h-11 items-center gap-4 py-2 text-[0.9375rem] leading-snug text-ink-soft underline-offset-4 hover:text-ink hover:underline"
                  >
                    <span aria-hidden className="flex w-6 items-center">
                      <Dot />
                    </span>
                    <span className="flex-1">{aiGovernanceNav.label}</span>
                    <ArrowDown aria-hidden className={jumpArrow} />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </Container>
      </section>

      {/* The capability matrix */}
      <Section id="matrix" aria-labelledby="matrix-title">
        <Container>
          <div className="reveal grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <Eyebrow>Capability matrix</Eyebrow>
              <h2 id="matrix-title" className="mt-5 text-h2">
                End-to-end, from data to delivery
              </h2>
            </div>
            <p className="max-w-[52ch] text-muted lg:col-span-5">
              Each pillar stands on its own or combines with the others in one engagement. Choose a pillar for the full scope
              of work, platforms and delivery approach.
            </p>
          </div>
          <CapabilityMatrix pillars={pillars} />

        </Container>
      </Section>

      {/* AI Governance: core expertise beside the seven pillars (it builds on pillars 01 and 02). */}
      <AiGovernanceFeature id={aiGovernanceId} />

      {/* From vision to victory: the deck's delivery approach */}
      <Section tone="night" aria-labelledby="approach-title">
        <Container>
          <SectionHeading
            id="approach-title"
            tone="night"
            eyebrow="How we deliver"
            title="From vision to victory"
            intro="Whichever pillars you combine, every engagement moves through the same stages, each ending in something you own and can act on."
            className="reveal"
          />
          <ApproachSteps stages={deliveryApproach} tone="night" />
        </Container>
      </Section>

      {/* Industries strip */}
      <Section spacing="compact" aria-labelledby="industries-title">
        <Container>
          <div className="reveal grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <SectionHeading
              id="industries-title"
              eyebrow="Industries"
              title={`${industries.length} core industries`}
              className="lg:col-span-7"
            />
            <div className="lg:col-span-5">
              <p className="max-w-[52ch] text-muted">
                Regulations, customers and systems differ by sector. See how the pillars apply in each.
              </p>
              <ArrowLink href="/industries" className="mt-3">
                Explore industries
              </ArrowLink>
            </div>
          </div>
          <ul className="mt-10 grid border-t border-ink sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
            {industries.map((industry) => (
              <li key={industry.id} className="reveal border-b border-line">
                <Link
                  href={`/industries#${industry.id}`}
                  className="group flex min-h-16 items-center justify-between gap-4 py-3 font-medium"
                >
                  <span className="flex-1 decoration-1 underline-offset-4 group-hover:underline">{industry.name}</span>
                  <ArrowRight aria-hidden className={rowArrow} />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title="Not sure which pillar fits?"
        body="Tell us what you need to build, connect or improve. We'll map it to the right capabilities and scope a practical first step."
      />
    </>
  );
}
