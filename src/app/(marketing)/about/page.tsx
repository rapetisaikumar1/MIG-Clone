import { Container, Dot, Eyebrow, Section, SectionHeading } from "@/components/ui/layout";
import { company } from "@/config/site";
import { AdobePartnerPanel } from "@/features/adobe/partner-panel";
import { CtaBand } from "@/features/contact/cta-band";
import { OfficeList } from "@/features/contact/office-list";
import { ApproachSteps, Breadcrumbs } from "@/features/services/sections";
import { deliveryApproach } from "@/content/home";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { ArrowLink } from "@/components/ui/button";
import { contactHref } from "@/features/contact/links";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Maverick InnoGarage is a consultancy for Adobe services, data management and AI governance, and the maker of MapleRecord. Offices in Delaware, Texas and Ontario.",
  path: "/about",
});

/** The three practices plus MapleRecord. Summaries restate the practice pages; no new services. */
const practices = [
  {
    label: "Practice",
    title: "AI Governance",
    href: "/ai-governance",
    body: "AI inventories, risk tiers, policies and human review, so teams can adopt AI with clear accountability.",
  },
  {
    label: "Practice",
    title: "Adobe Services",
    href: "/adobe-services",
    body: "Implementing, integrating and optimizing Adobe Experience Platform, Real-Time CDP, Experience Manager, Analytics, Target, Marketo Engage and Commerce.",
  },
  {
    label: "Practice",
    title: "Data Management",
    href: "/data-management",
    body: "Governance, integration, quality and lifecycle controls, so enterprise data has clear owners and holds up for analytics, AI and customer experiences.",
  },
  {
    label: "Product",
    title: "MapleRecord",
    href: "/maplerecord",
    body: "Our records management software for electronic and physical records, with retention schedules, request handling, workflows and role-based access.",
  },
] as const;

const principles = [
  { title: "Start from the outcome", body: "We begin with the decision, experience or obligation you care about, and work back to the data and controls it needs." },
  { title: "Keep controls proportionate", body: "Governance should fit the risk: light where it can be, rigorous where it must be." },
  { title: "Leave you able to run it", body: "Plain-language documentation, training and handover are part of the work, not an extra at the end." },
  { title: "Scope honestly", body: "If something isn't a good fit for us, or doesn't need doing yet, we'll say so." },
];

// Values carried over from the existing About page (docs/CONTENT-INVENTORY.md).
const values = [
  { title: "Innovation", body: "We encourage new ideas and stay close to emerging technology so our advice remains current." },
  { title: "Collaboration", body: "The best solutions come from working across disciplines, and alongside our clients' teams." },
  { title: "Continuous learning", body: "Ongoing training and development keep our skills aligned with the platforms and practices we support." },
  { title: "Work-life balance", body: "Sustainable pace supports careful work, for our people and for the clients who depend on them." },
  { title: "Inclusion", body: "We value different backgrounds and perspectives, and want everyone to be able to contribute their best work." },
  { title: "Community", body: "We encourage our people to take part in the causes and communities they care about." },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line pb-16 pt-10 lg:pb-24 lg:pt-14">
        <Container>
          <JsonLd data={breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "About" }], "/about")} />
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <div className="mt-12 max-w-5xl">
            <Eyebrow>About Maverick InnoGarage</Eyebrow>
            <h1 className="mt-6 text-h1">A focused consultancy for responsible AI, Adobe platforms and enterprise data.</h1>
            <p className="mt-7 max-w-[62ch] text-lead text-muted">
              {company.positioning} We also build MapleRecord, our records management software, and work from offices in
              Delaware, Texas and Ontario.
            </p>
          </div>
        </Container>
      </section>

      <Section aria-labelledby="what-title">
        <Container>
          <SectionHeading
            id="what-title"
            eyebrow="What we do"
            title="Three connected practices, and our own software"
            intro="Each practice stands on its own, and they are designed to work together."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {practices.map((p) => (
              <li key={p.title} className="flex flex-col rounded-2xl border border-line bg-surface p-7">
                <p className="flex items-center gap-2.5 font-mono text-label uppercase text-muted">
                  <Dot />
                  {p.label}
                </p>
                <h3 className="mt-5 text-h3">{p.title}</h3>
                <p className="mt-3 flex-1 text-[0.9375rem] text-muted">{p.body}</p>
                <ArrowLink href={p.href} className="mt-6 self-start">
                  Learn more<span className="sr-only"> about {p.title}</span>
                </ArrowLink>
              </li>
            ))}
          </ul>
          <AdobePartnerPanel className="mt-8" />
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="belief-title">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="belief-title" eyebrow="What we believe" title={company.thesis} />
          </div>
          <div className="max-w-[65ch] space-y-5 text-[1.0625rem] text-ink-soft lg:col-span-7 lg:pt-12">
            <p>
              AI systems inherit the quality, gaps and biases of the data behind them. Personalized digital experiences are only
              as good as the customer profiles that drive them. And neither can be trusted without clear ownership and oversight.
            </p>
            <p>
              That&apos;s why we work across all three areas. Data management gives organizations reliable, well-governed
              information. AI governance makes sure that information is used responsibly. Adobe services turn it into customer
              experiences people value. When one team understands all three, fewer problems fall between projects.
            </p>
          </div>
        </Container>
      </Section>

      <Section id="approach" aria-labelledby="approach-title">
        <Container>
          <SectionHeading
            id="approach-title"
            eyebrow="How we work"
            title="Our delivery approach"
            intro="Engagements follow four stages, and each stage ends with something tangible you keep."
          />
          <ApproachSteps stages={deliveryApproach} />
          <div className="mt-20 border-t border-ink pt-10">
            <h3 className="font-mono text-label uppercase text-muted">Principles we work by</h3>
            <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {principles.map((p) => (
                <li key={p.title}>
                  <Dot />
                  <h4 className="mt-4 text-lg font-semibold tracking-tight">{p.title}</h4>
                  <p className="mt-2 text-muted">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="culture-title">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="culture-title" eyebrow="Culture" title="What we value" />
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-8">
            {values.map((c) => (
              <li key={c.title} className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
                <p className="max-w-[60ch] text-muted">{c.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="deep" aria-labelledby="where-title">
        <Container>
          <SectionHeading id="where-title" eyebrow="Where we are" title="Offices in the United States and Canada" />
          <OfficeList className="mt-12" />
          <div className="mt-16 rounded-2xl border border-line bg-surface p-7 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-9">
            <div>
              <h3 className="text-h3">Interested in joining us?</h3>
              <p className="mt-2 max-w-[56ch] text-muted">We&apos;re always glad to hear from people who care about data, AI and digital experience.</p>
            </div>
            <ArrowLink href={contactHref("general")} className="mt-4 shrink-0 sm:mt-0">
              Get in touch
            </ArrowLink>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Let's talk about what you're building."
        body="Whether you're starting with AI oversight, an Adobe platform or your data foundation, we'll help you find a practical first step."
      />
    </>
  );
}
