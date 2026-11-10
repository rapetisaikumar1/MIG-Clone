import { Container, Dot, Eyebrow, Section, SectionHeading, Tag } from "@/components/ui/layout";
import { company } from "@/config/site";
import { AdobePartnerPanel } from "@/features/adobe/partner-panel";
import { CtaBand } from "@/features/contact/cta-band";
import { OfficeList } from "@/features/contact/office-list";
import { ApproachSteps } from "@/features/services/sections";
import { deliveryApproach } from "@/content/home";
import { pageMetadata } from "@/lib/metadata";
import { isContactDeliveryConfigured } from "@/server/env";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { ArrowLink } from "@/components/ui/button";
import { contactHref } from "@/features/contact/links";
import { aiGovernanceNav, coreExpertiseNav, moliPath, mapleRecordPath, pillarsNav } from "@/config/navigation";
import { adobeServicesPath } from "@/lib/content/adobe";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Maverick InnoGarage delivers information, data and AI governance and MarTech on Adobe Experience Cloud for enterprises and the public sector, with 12+ years of delivery.",
  path: "/about",
});

/** "Who we are" facts. Every figure comes from the Capability Matrix (October 2026) or config/site.ts. */
const facts = [
  { value: "12+", label: "years of digital transformation and service delivery" },
  { value: "7", label: "practice pillars, one accountable partner" },
  { value: "2", label: "products of our own: MapleRecord and MOLI" },
  { value: String(company.offices.length), label: "offices across the United States and Canada" },
];

/**
 * The four core areas we lead with (owner direction, 2026-11-10), in coreExpertiseNav's order. Information Governance
 * (pillar 07) is shown first with its two products; the other three are peers in one row.
 */
const informationGovernance = coreExpertiseNav.find((a) => a.href === "/information-governance")!;
const otherCoreAreas = coreExpertiseNav.filter((a) => a !== informationGovernance);

/** Where each core area sits in the Capability Matrix, so the supporting pillars below read as the rest of the seven. */
const coreAreaPillars: Record<string, string> = {
  "/information-governance": "Pillar 07",
  "/data-management": "Pillar 01",
  [aiGovernanceNav.href]: "Pillars 01 and 02",
  [adobeServicesPath]: "Pillar 03",
};

/** Card copy for the other three core areas, restating the Capability Matrix and the existing service pages. */
const coreAreaBodies: Record<string, string> = {
  "/data-management":
    "Data ownership, quality, security and regulatory compliance, with analytics built on top. We turn fragmented enterprise data into governed, AI-ready assets on AWS and Azure.",
  [aiGovernanceNav.href]:
    "Responsible AI and AI risk management: an inventory of where AI is used, risk tiers, a named owner for each use and review matched to the risk.",
  [adobeServicesPath]:
    "Customer data, content, personalization, analytics, marketing automation and commerce, designed, implemented and optimized on Adobe Experience Cloud.",
};

/** The remaining Capability Matrix pillars, which support the core areas and are also delivered on their own. */
const supportingPillars = pillarsNav.filter((p) => !["01", "03", "07"].includes(p.number));

/** Information Governance's products (pillar 07). Summaries restate the Capability Matrix; compliance is "designed to support", never certified. */
const products = [
  {
    title: "MapleRecord",
    href: mapleRecordPath,
    body: "Public sector and enterprise records management, designed and built by Maverick InnoGarage, with workflow automation and lifecycle governance.",
    /** MapleRecord's five modules, in the guide's order (owner-confirmed 2026-11-06). */
    tagsLabel: "MapleRecord modules",
    tags: ["MR Records", "MR Requests", "MR Workflows", "MR Forms", "MR Admin"],
  },
  {
    title: "MOLI",
    href: moliPath,
    body: "Our AI-driven record management system: advanced search and retrieval, cloud integration across AWS and Azure, and designed to support GDPR, PDPA, PIPEDA and CCPA compliance.",
    tagsLabel: "MOLI highlights",
    tags: ["AI-driven search and retrieval", "AWS and Azure", "Privacy compliance support"],
  },
];

const principles = [
  { title: "Start from the outcome", body: "We begin with the decision, experience or obligation you care about, and work back to the data, platforms and software it needs." },
  { title: "Keep it proportionate", body: "Architecture, process and governance should fit the risk and the scale: light where they can be, rigorous where they must be." },
  { title: "Leave you able to run it", body: "Plain-language documentation, training and handover are part of the work, not an extra at the end." },
  { title: "Scope honestly", body: "If something isn't a good fit for us, or doesn't need doing yet, we'll say so." },
];

// Values carried over from the existing About page (docs/CONTENT-INVENTORY.md).
const values = [
  { title: "Innovation", body: "We encourage new ideas and stay close to emerging technology, so the software and solutions we deliver stay current." },
  { title: "Collaboration", body: "The best solutions come from working across disciplines, and alongside our clients' teams." },
  { title: "Continuous learning", body: "Ongoing training and development keep our skills current with the platforms we implement and the software we build." },
  { title: "Work-life balance", body: "Sustainable pace supports careful work, for our people and for the clients who depend on them." },
  { title: "Inclusion", body: "We value different backgrounds and perspectives, and want everyone to be able to contribute their best work." },
  { title: "Community", body: "We encourage our people to take part in the causes and communities they care about." },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line pb-16 pt-10 lg:pb-20 lg:pt-14">
        <Container>
          <JsonLd data={breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "About" }], "/about")} />
          <div className="max-w-5xl">
            <Eyebrow>Who we are</Eyebrow>
            <h1 className="mt-6 text-h1">
              Dedicated to driving transformative change for enterprises and public-sector organizations.
            </h1>
            <p className="mt-7 max-w-[62ch] text-lead text-muted">{company.descriptor}</p>
          </div>
          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink pt-8 lg:grid-cols-4 lg:gap-x-8">
            {facts.map((f) => (
              <div key={f.label} className="reveal flex flex-col-reverse justify-end gap-2">
                <dt className="max-w-[24ch] text-[0.9375rem] text-muted">{f.label}</dt>
                <dd className="text-[2.5rem] font-semibold leading-none tracking-tight sm:text-[3rem]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section aria-labelledby="what-title">
        <Container>
          <SectionHeading
            id="what-title"
            eyebrow="What we do"
            title="Governance and MarTech, delivered end to end."
            intro="Four core areas lead our work. Engineering, design, product and CRM work from our seven practice pillars supports all four."
            className="reveal"
          />

          <h3 className="mt-14 font-mono text-label uppercase text-muted">Core areas</h3>

          {/* Information Governance is delivered with our two products, so its card holds them rather than being one link. */}
          <div className="reveal mt-6 rounded-2xl border border-line bg-paper-deep p-7 sm:p-8">
            <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-10">
              <div className="lg:col-span-5">
                <p className="flex items-center gap-2.5 font-mono text-label uppercase text-muted">
                  <Dot />
                  {coreAreaPillars[informationGovernance.href]}
                </p>
                <h4 className="mt-5 text-h3">{informationGovernance.label}</h4>
              </div>
              <div className="mt-3 lg:col-span-7 lg:mt-1">
                <p className="max-w-[60ch] text-[0.9375rem] text-muted">
                  Records lifecycle, retention and privacy compliance support for government, municipalities and regulated
                  organizations, delivered with MapleRecord and MOLI, the records management software we design and build
                  ourselves.
                </p>
                <ArrowLink href={informationGovernance.href} className="mt-4">
                  Explore Information Governance
                </ArrowLink>
              </div>
            </div>
            <ul aria-label="Our products" className="mt-7 grid gap-5 md:grid-cols-2">
              {products.map((product) => (
                <li key={product.title} className="flex">
                  <div className="card-lift relative flex w-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-ink/40 has-focus-visible:border-ink sm:p-7">
                    <p className="font-mono text-label uppercase text-muted">Product</p>
                    <h5 className="mt-3 text-xl font-semibold tracking-tight">{product.title}</h5>
                    <p className="mt-2 flex-1 text-[0.9375rem] text-muted">{product.body}</p>
                    <ul aria-label={product.tagsLabel} className="mt-5 flex flex-wrap gap-2">
                      {product.tags.map((t) => (
                        <li key={t}>
                          <Tag className="whitespace-nowrap px-3 py-1 text-ink-soft">{t}</Tag>
                        </li>
                      ))}
                    </ul>
                    <ArrowLink href={product.href} className="mt-6 self-start after:absolute after:inset-0 after:rounded-xl">
                      Explore {product.title}
                    </ArrowLink>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ul aria-label="More core areas" className="mt-5 grid gap-5 md:grid-cols-3">
            {otherCoreAreas.map((area) => (
              // reveal (scroll) and card-lift (hover) both use transform, so they sit on separate elements.
              <li key={area.href} className="reveal flex">
                {/* The link's ::after covers the card, so the whole card is the click target. */}
                <div className="card-lift relative flex w-full flex-col rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-ink/40 has-focus-visible:border-ink sm:p-8 md:p-6 lg:p-8">
                  <p className="flex items-center gap-2.5 font-mono text-label uppercase text-muted">
                    <Dot />
                    {coreAreaPillars[area.href]}
                  </p>
                  <h4 className="mt-5 text-h3">{area.label}</h4>
                  <p className="mt-3 flex-1 text-[0.9375rem] text-muted">{coreAreaBodies[area.href] ?? area.description}</p>
                  <ArrowLink href={area.href} className="mt-6 self-start after:absolute after:inset-0 after:rounded-2xl">
                    Learn more<span className="sr-only"> about {area.label}</span>
                  </ArrowLink>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-16 border-t border-ink pt-10">
            <div className="lg:grid lg:grid-cols-12 lg:items-baseline lg:gap-10">
              <h3 className="font-mono text-label uppercase text-muted lg:col-span-4">Supporting capabilities</h3>
              <p className="mt-3 max-w-[60ch] text-[0.9375rem] text-muted lg:col-span-8 lg:mt-0">
                Practice pillars that the core areas build on, and that we also deliver on their own.
              </p>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {supportingPillars.map((p) => (
                <li key={p.href} className="reveal flex">
                  <div className="card-lift relative flex w-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-ink/40 has-focus-visible:border-ink">
                    <p className="font-mono text-label uppercase text-muted">Pillar {p.number}</p>
                    <h4 className="mt-4 text-lg font-semibold tracking-tight">{p.label}</h4>
                    <p className="mt-2 flex-1 text-[0.9375rem] text-muted">{p.description}</p>
                    <ArrowLink href={p.href} className="mt-5 self-start after:absolute after:inset-0 after:rounded-2xl">
                      Learn more<span className="sr-only"> about {p.label}</span>
                    </ArrowLink>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <AdobePartnerPanel className="mt-12" />
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="belief-title">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="belief-title" eyebrow="What we believe" title={company.thesis} className="reveal" />
          </div>
          <div className="max-w-[65ch] space-y-5 text-[1.0625rem] text-ink-soft lg:col-span-7 lg:pt-12">
            <p>
              Records, data, AI and marketing technology depend on each other. Personalization is only as good as the customer
              profiles behind it, and those profiles are only as good as the data quality and privacy rules that govern them. An
              AI model inherits the gaps in the data it learns from. A records program only works if people use it every day.
            </p>
            <p>
              That&apos;s why we lead with governance and build on it. We put records under lifecycle governance with MapleRecord
              and MOLI, turn enterprise data into governed, AI-ready assets, give every AI use a named owner and a review matched to
              its risk, and implement Adobe Experience Cloud on that foundation. Cloud engineering, experience design, digital
              product and CRM work support all four. When one team is accountable for all of it, fewer problems fall between
              projects.
            </p>
          </div>
        </Container>
      </Section>

      <Section id="approach" aria-labelledby="approach-title">
        <Container>
          <SectionHeading
            id="approach-title"
            eyebrow="How we deliver"
            title="From vision to victory"
            intro="Every engagement follows three stages, from discovery to continuous improvement, and each stage ends with something tangible you keep."
            className="reveal"
          />
          <ApproachSteps stages={deliveryApproach} />
          <div className="mt-20 border-t border-ink pt-10">
            <h3 className="font-mono text-label uppercase text-muted">Principles we work by</h3>
            <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {principles.map((p) => (
                <li key={p.title} className="reveal">
                  <h4 className="flex items-baseline gap-2.5 text-lg font-semibold tracking-tight">
                    <Dot className="-translate-y-0.5" />
                    {p.title}
                  </h4>
                  <p className="mt-2 text-muted">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="culture-title">
        <Container className="grid gap-12 lg:grid-cols-12">
          {/* Stays beside the six-row list while it scrolls past. */}
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <SectionHeading id="culture-title" eyebrow="Culture" title="What we value" className="reveal" />
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-8">
            {values.map((c) => (
              <li key={c.title} className="reveal grid gap-2 py-6 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
                <p className="max-w-[60ch] text-muted">{c.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="deep" aria-labelledby="where-title">
        <Container>
          <SectionHeading id="where-title" eyebrow="Where we are" title="Offices across the United States and Canada" className="reveal" />
          <OfficeList className="mt-12" messages={isContactDeliveryConfigured()} />
          <div className="mt-14 rounded-2xl border border-line bg-surface p-7 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-9">
            <div>
              <h3 className="text-h3">Interested in joining us?</h3>
              <p className="mt-2 max-w-[56ch] text-muted">We&apos;re always glad to hear from people who care about governance, data, MarTech, engineering and design.</p>
            </div>
            <ArrowLink href={contactHref("general", { topic: "careers" })} className="mt-4 shrink-0 sm:mt-0">
              Get in touch
            </ArrowLink>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Let's talk about what you're building."
        body="Whether you're starting with a records program, your data, the AI you already use or your MarTech stack, we'll scope a practical first step with you."
      />
    </>
  );
}
