import { BusinessTransformationGraphic } from "@/components/graphics/pillars/business-transformation";
import { ArrowLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { ServicePage } from "@/features/services/service-page";
import { getService } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";

const content = getService("business-transformation");

export const metadata = pageMetadata({ ...content.meta, path: "/business-transformation" });

/**
 * The deck's records items (ways three and four of "Four ways we modernize how enterprises run"), now delivered by the
 * Information Governance & Records practice (pillar 07, /information-governance): our two records management products.
 */
const recordsProducts = [
  {
    name: "MapleRecord",
    href: "/maplerecord",
    tagline: "Public sector and enterprise records management",
    body: "Records management software for government, municipalities and regulated organizations, with workflow automation, a seamless user experience and lifecycle governance.",
  },
  {
    name: "MOLI",
    href: "/moli",
    tagline: "AI-driven record management system",
    body: "AI-powered search and retrieval and cloud integration across AWS and Azure, with a user-centric design and controls designed to support GDPR, PDPA, PIPEDA and CCPA compliance.",
  },
];

/**
 * Sits after the capabilities list. No bottom padding: the delivery approach that follows is on the same paper
 * background and supplies its own top padding.
 */
function RecordsPointer() {
  return (
    <section className="bg-paper pt-16 sm:pt-20 lg:pt-24" aria-labelledby="records-pointer-title">
      <Container>
        <div className="reveal rounded-3xl border border-line-strong bg-surface p-5 sm:p-10 lg:p-14">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-7">
              <Eyebrow>Information Governance &amp; Records</Eyebrow>
              <h2 id="records-pointer-title" className="mt-5 text-h2">
                Governed records, run on our own products.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="max-w-[48ch] text-muted">
                For government and regulated industries, the change often reaches records: how they are captured,
                retained, found and disposed of. Our Information Governance &amp; Records practice delivers that work.
              </p>
              <ArrowLink href="/information-governance" className="mt-4">
                Explore Information Governance
              </ArrowLink>
            </div>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12">
            {recordsProducts.map((p) => (
              <li key={p.name} className="flex flex-col rounded-2xl border border-line bg-paper p-5 sm:p-8">
                <p className="font-mono text-label uppercase leading-relaxed text-muted">{p.tagline}</p>
                <h3 className="mt-4 text-h3">{p.name}</h3>
                <p className="mt-3 max-w-[56ch] text-[0.9375rem] text-muted">{p.body}</p>
                <div className="mt-auto pt-5">
                  <ArrowLink href={p.href}>{`Explore ${p.name}`}</ArrowLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default function BusinessTransformationPage() {
  // As on the other pillar pages, the benefits strip would restate the hero lead and the capabilities.
  return (
    <ServicePage
      content={content}
      graphic={<BusinessTransformationGraphic />}
      capabilityLinks={{ "Adobe Marketo Engage": "/adobe-services/marketo-engage" }}
      showBenefits={false}
      afterCapabilities={<RecordsPointer />}
    />
  );
}
