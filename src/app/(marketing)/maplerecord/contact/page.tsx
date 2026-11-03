import { Mail, Phone } from "lucide-react";
import { ArrowLink } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { mrContact, mrOfficial } from "@/content/maplerecord/overview";
import { contactHref } from "@/features/contact/links";
import { MrHero, MrOffices } from "@/features/maplerecord/mr-sections";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact MapleRecord",
  description: "Contact the MapleRecord sales team or request a demo. Offices in Cobourg, Ontario and Aubrey, Texas.",
  path: "/maplerecord/contact",
});

export default function MrContactPage() {
  return (
    <>
      <MrHero
        crumbs={[{ label: "Home", href: "/" }, { label: "MapleRecord", href: "/maplerecord" }, { label: "Contact" }]}
        eyebrow="Contact MapleRecord"
        title={mrContact.title}
        description={mrContact.body}
        officialUrl={mrOfficial.contact}
      />
      <Section aria-labelledby="reach-title">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="reach-title" eyebrow="Get in touch" title="Talk to the MapleRecord team" />
            <ul className="mt-8 space-y-2 text-lg">
              <li>
                <a href={`mailto:${mrContact.email}`} className="inline-flex min-h-11 items-center gap-3 font-medium underline decoration-line-strong underline-offset-4 hover:decoration-signal">
                  <Mail aria-hidden className="size-5 text-signal" />
                  {mrContact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${mrContact.phone.e164}`} className="inline-flex min-h-11 items-center gap-3 font-medium underline decoration-line-strong underline-offset-4 hover:decoration-signal">
                  <Phone aria-hidden className="size-5 text-signal" />
                  {mrContact.phone.display}
                </a>
              </li>
            </ul>
            <div className="mt-10 rounded-2xl bg-paper-deep p-7">
              <h3 className="text-lg font-semibold tracking-tight">Request a demo</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">
                Demo requests go through MapleRecord&apos;s own form, which asks for your name, business email, work phone, company, industry and a message.
              </p>
              <ExternalLink href={mrOfficial.demo} variant="primary" className="mt-6">
                Open the demo request form
              </ExternalLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <h3 className="font-mono text-label uppercase text-muted">Offices</h3>
            <div className="mt-4">
              <MrOffices />
            </div>
            <div className="mt-10 rounded-2xl border border-line bg-surface p-7">
              <h3 className="text-lg font-semibold tracking-tight">Working with Maverick InnoGarage</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">
                For records management programs, retention schedules and data governance around MapleRecord, you can also contact Maverick InnoGarage.
              </p>
              <ArrowLink href={contactHref("data-management")} className="mt-4">
                Talk to an expert
              </ArrowLink>
            </div>
            <p className="mt-8 text-sm text-muted">
              MapleRecord&apos;s{" "}
              <a href={mrOfficial.terms} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">
                Terms of Service<span className="sr-only"> (opens in a new tab)</span>
              </a>{" "}
              and{" "}
              <a href={mrOfficial.privacy} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">
                Privacy Policy<span className="sr-only"> (opens in a new tab)</span>
              </a>{" "}
              are published on maplerecord.com.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
