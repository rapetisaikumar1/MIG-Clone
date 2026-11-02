import Link from "next/link";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container, Dot, Eyebrow, Section, SectionHeading } from "@/components/ui/layout";
import { MapleRecordGraphic } from "@/components/graphics/service-graphics";
import { CtaBand } from "@/features/contact/cta-band";
import { contactHref } from "@/features/contact/links";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "MapleRecord — Records Management Software",
  description:
    "MapleRecord is records management software for governments and municipalities, with dynamic record series and retention schedules, workflow automation and role-based access control.",
  path: "/maplerecord",
});

// Every feature below is described on the existing maverickinnogarage.com/maplerecord page.
const features = [
  {
    title: "Dynamic record series and retention schedules",
    body: "Organize records into series with retention schedules that automate retention processes, support compliance, and keep records management aligned with public-sector standards.",
  },
  {
    title: "Workflow automation",
    body: "Automate routine records workflows so government operations run more efficiently and consistently.",
  },
  {
    title: "Role-based access control",
    body: "Assign permissions by user role to simplify access management, support compliance, and protect records from unauthorized access.",
  },
  {
    title: "Workspace management",
    body: "A standalone module that helps government offices plan space, manage schedules and coordinate resources.",
  },
  {
    title: "One unified platform",
    body: "Records handling in a single system designed to fit into existing workflows rather than add another silo.",
  },
  {
    title: "Configured to your organization",
    body: "Set up around your own record series, workflows and roles.",
  },
];

export default function MapleRecordPage() {
  return (
    <>
      <section className="on-night bg-night pb-20 pt-10 text-night-text lg:pb-28 lg:pt-14">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-night-muted">
            <ol className="flex gap-2">
              <li>
                <Link href="/" className="hover:text-night-text hover:underline hover:underline-offset-4">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-night-text">
                MapleRecord
              </li>
            </ol>
          </nav>
          <div className="mt-12 grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow tone="night">MapleRecord · Records management software</Eyebrow>
              <h1 className="mt-6 text-h1">Efficient records. Effective governance.</h1>
              <p className="mt-6 max-w-[54ch] text-lead text-night-muted">
                MapleRecord is records management software from Maverick InnoGarage, designed for the needs of governments and
                municipalities. It brings retention, workflow and access control together in one platform.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={contactHref("data-management")} arrow>
                  Discuss MapleRecord
                </ButtonLink>
                <ButtonLink href="#features" variant="outline-night">
                  See the features
                </ButtonLink>
              </div>
            </div>
            <div className="rounded-2xl border border-night-line bg-night-raised p-6 sm:p-8 lg:col-span-6">
              <MapleRecordGraphic tone="night" />
            </div>
          </div>
        </Container>
      </section>

      <Section id="features" aria-labelledby="features-title">
        <Container>
          <SectionHeading
            id="features-title"
            eyebrow="Capabilities"
            title="Advanced management, built for public-sector security"
            intro="Simplify records and get more done. These are MapleRecord's core capabilities."
          />
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li key={f.title} className="border-t border-ink pt-6">
                <Dot />
                <h3 className="mt-5 text-h3">{f.title}</h3>
                <p className="mt-3 text-muted">{f.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="deep" aria-labelledby="fit-title">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              id="fit-title"
              eyebrow="Where it fits"
              title="Part of a governed information lifecycle"
              intro="Records are one stage of a wider data lifecycle. MapleRecord makes the retention and disposition stages consistent, and our Data Management practice helps with the record series, schedules and ownership that sit behind them."
            />
            <ArrowLink href="/data-management#records" className="mt-8">
              Records management services
            </ArrowLink>
          </div>
          <div className="lg:col-span-6">
            <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
              {[
                ["Who it's for", "Government bodies, municipalities and other public-sector organizations."],
                ["What it replaces", "Retention schedules that live in documents, ad hoc disposition, and access that is hard to control."],
                ["What it supports", "Consistent retention, documented decisions and appropriate access to records."],
              ].map(([term, text]) => (
                <li key={term} className="grid gap-2 p-6 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <p className="font-mono text-label uppercase text-muted">{term}</p>
                  <p className="text-ink-soft">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Embrace a better way to manage records."
        body="Tell us about your records program and the systems you use today. We'll walk you through how MapleRecord could fit."
        interest="data-management"
      />
    </>
  );
}
