import { AiGovernanceGraphic } from "@/components/graphics/service-graphics";
import { ArrowLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { pillarsNav } from "@/config/navigation";
import { ServicePage } from "@/features/services/service-page";
import { getService } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";

const content = getService("ai-governance");

export const metadata = pageMetadata({ ...content.meta, path: "/ai-governance" });

/**
 * The two Capability Matrix pillars this work extends, with the deck items it builds on. Labels and links come from
 * the pillar navigation so they follow any rename.
 */
const foundations = [
  { number: "01", basis: ["Data governance and data management", "Regulatory compliance, data quality and security"] },
  { number: "02", basis: ["AI/ML enablement"] },
].flatMap(({ number, basis }) => {
  const pillar = pillarsNav.find((p) => p.number === number);
  return pillar ? [{ ...pillar, basis }] : [];
});

/** Sits between the hero and the problem section: places AI governance inside the pillars it extends. */
function Foundations() {
  return (
    <section className="border-b border-line bg-surface py-12 sm:py-14" aria-labelledby="foundations-title">
      <Container className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>Where this fits</Eyebrow>
          <h2 id="foundations-title" className="mt-5 text-h3 text-balance">
            An extension of our data governance and AI/ML enablement delivery.
          </h2>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
          {foundations.map((p) => (
            <li key={p.href} className="reveal flex flex-col border-t border-ink pt-5">
              <p className="font-mono text-label uppercase text-muted">Pillar {p.number}</p>
              <p className="mt-2 text-lg font-semibold tracking-tight">{p.label}</p>
              <ul className="mt-2 space-y-1 text-[0.9375rem] text-muted">
                {p.basis.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <ArrowLink href={p.href} className="mt-auto pt-3">
                {`Explore ${p.label}`}
              </ArrowLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default function AiGovernancePage() {
  // The benefits strip restated the hero lead and capabilities, so this page leaves it out.
  return (
    <ServicePage
      content={content}
      graphic={<AiGovernanceGraphic />}
      showBenefits={false}
      afterHero={<Foundations />}
      capabilityLinks={{ "Data & Analytics": "/data-management", "Engineering & Technology": "/software-development" }}
    />
  );
}
