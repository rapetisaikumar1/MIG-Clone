import { Container, Dot, Eyebrow, Section, SectionHeading, Tag } from "@/components/ui/layout";
import { cn } from "@/lib/utils";
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
    "A software development and professional services company for AI governance, Adobe solutions, data and enterprise software, and the maker of MapleRecord.",
  path: "/about",
});

/** The four specializations plus MapleRecord. Summaries restate the specialization pages; no new services. */
const offerings = [
  {
    label: "Specialization",
    title: "AI Governance",
    href: "/ai-governance",
    body: "AI inventories, risk tiers, policies and human review, so teams can adopt AI with clear accountability.",
  },
  {
    label: "Specialization",
    title: "Adobe Services",
    href: "/adobe-services",
    body: "Implementing, integrating and optimizing Adobe Experience Platform, Real-Time CDP, Experience Manager, Analytics, Target, Marketo Engage and Commerce.",
  },
  {
    label: "Specialization",
    title: "Data Management",
    href: "/data-management",
    body: "Governance, integration, quality and lifecycle controls, so enterprise data has clear owners and holds up for analytics, AI and customer experiences.",
  },
  {
    label: "Specialization",
    title: "Software Development",
    href: "/software-development",
    body: "Enterprise applications, workflow and forms automation, system integration and custom development on Adobe platforms.",
  },
  {
    label: "Product",
    title: "MapleRecord",
    href: "/maplerecord",
    body: "Our records management platform for electronic and physical records, designed and built by Maverick InnoGarage: five modules for records, requests, workflows, forms and administration.",
  },
] as const;

/** MapleRecord's five modules, in the guide's order (owner-confirmed 2026-11-06). */
const maplerecordModules = ["MR Records", "MR Requests", "MR Workflows", "MR Forms", "MR Admin"];

const principles = [
  { title: "Start from the outcome", body: "We begin with the decision, experience or obligation you care about, and work back to the data, controls and software it needs." },
  { title: "Keep controls proportionate", body: "Governance should fit the risk: light where it can be, rigorous where it must be." },
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
      <section className="border-b border-line pb-16 pt-10 lg:pb-24 lg:pt-14">
        <Container>
          <JsonLd data={breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "About" }], "/about")} />
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <div className="mt-12 max-w-5xl">
            <Eyebrow>About Maverick InnoGarage</Eyebrow>
            <h1 className="mt-6 text-h1">
              A software development and professional services company for responsible AI, Adobe, data and enterprise software.
            </h1>
            <p className="mt-7 max-w-[62ch] text-lead text-muted">
              {company.descriptor} We work from offices in Delaware, Texas and Ontario.
            </p>
          </div>
        </Container>
      </section>

      <Section aria-labelledby="what-title">
        <Container>
          <SectionHeading
            id="what-title"
            eyebrow="What we do"
            title="Four specializations, and our own software"
            intro="Each specialization stands on its own, and they are designed to work together."
            className="reveal"
          />
          {/* Two columns at every desktop width: titles align and body copy keeps a readable measure.
              The product card (MapleRecord, last) spans both columns beneath the four specializations. */}
          <ul className="mt-14 grid gap-5 sm:grid-cols-2">
            {offerings.map((p) => (
              // reveal (scroll) and card-lift (hover) both use transform, so they sit on separate elements.
              <li key={p.title} className={p.label === "Product" ? "reveal flex sm:col-span-2" : "reveal flex"}>
                {/* The link's ::after covers the card, so the whole card is the click target.
                    The full-width product card lists its five modules: below the body on smaller screens,
                    and in a second column from xl up so that half of the card isn't left empty. */}
                <div
                  className={cn(
                    "card-lift relative flex w-full flex-col rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-ink/40 has-focus-visible:border-ink sm:p-8",
                    p.label === "Product" && "xl:grid xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start xl:gap-x-12",
                  )}
                >
                  <div className={cn("flex flex-col", p.label !== "Product" && "flex-1")}>
                    <p className="flex items-center gap-2.5 font-mono text-label uppercase text-muted">
                      <Dot />
                      {p.label}
                    </p>
                    <h3 className="mt-5 text-h3">{p.title}</h3>
                    <p className="mt-3 max-w-[52ch] flex-1 text-[0.9375rem] text-muted">{p.body}</p>
                  </div>
                  {p.label === "Product" ? (
                    <ul
                      aria-label="MapleRecord modules"
                      className="mt-5 flex flex-wrap gap-2 xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:mt-0 xl:flex-nowrap xl:self-center"
                    >
                      {maplerecordModules.map((m) => (
                        <li key={m}>
                          <Tag className="whitespace-nowrap px-3.5 py-1.5 text-ink-soft">{m}</Tag>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <ArrowLink href={p.href} className="mt-6 self-start after:absolute after:inset-0 after:rounded-2xl">
                    Learn more<span className="sr-only"> about {p.title}</span>
                  </ArrowLink>
                </div>
              </li>
            ))}
          </ul>
          <AdobePartnerPanel className="mt-8" />
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="belief-title">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="belief-title" eyebrow="What we believe" title={company.thesis} className="reveal" />
          </div>
          <div className="max-w-[65ch] space-y-5 text-[1.0625rem] text-ink-soft lg:col-span-7 lg:pt-12">
            <p>
              AI systems inherit the quality, gaps and biases of the data behind them. Personalized digital experiences are only
              as good as the customer profiles that drive them. And neither can be trusted without clear ownership and oversight.
            </p>
            <p>
              That&apos;s why we work across all of these areas. Data management gives organizations reliable, well-governed
              information. AI governance makes sure that information is used responsibly. Adobe services turn it into customer
              experiences people value. Software development connects them where packaged tools fall short. When one team
              understands all of them, fewer problems fall between projects.
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
            intro="Every project follows four stages, and each stage ends with something tangible you keep."
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
          <SectionHeading id="where-title" eyebrow="Where we are" title="Offices in the United States and Canada" className="reveal" />
          <OfficeList className="mt-12" />
          <div className="mt-14 rounded-2xl border border-line bg-surface p-7 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-9">
            <div>
              <h3 className="text-h3">Interested in joining us?</h3>
              <p className="mt-2 max-w-[56ch] text-muted">We&apos;re always glad to hear from people who care about data, AI, software and digital experience.</p>
            </div>
            <ArrowLink href={contactHref("general", { topic: "careers" })} className="mt-4 shrink-0 sm:mt-0">
              Get in touch
            </ArrowLink>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Let's talk about what you're building."
        body="Whether you're starting with AI oversight, an Adobe platform, your data foundation or software you need built, we'll scope a practical first step with you."
      />
    </>
  );
}
