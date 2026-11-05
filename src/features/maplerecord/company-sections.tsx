import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarCheck,
  Check,
  Compass,
  Factory,
  GraduationCap,
  Handshake,
  HeartPulse,
  Layers,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  Umbrella,
} from "lucide-react";
import { ArrowLink } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { mrAbout, type MrAboutIndustryIcon, type MrAboutValueIcon } from "@/content/maplerecord/about";
import { mrContact } from "@/content/maplerecord/contact";
import { mrOfficial } from "@/content/maplerecord/official";
import { contactHref } from "@/features/contact/links";
import { MrBadge, MrCrumbs, MrFeatureCard, MrIconTile, MrStage, MrWindow, mrHalfSizes } from "@/features/maplerecord/mr-ui";
import { getMrModules } from "@/lib/content/maplerecord";

/*
 * Page sections for the MapleRecord company pages (/maplerecord/about and /maplerecord/contact).
 * They build on the shared MapleRecord design system in mr-ui.tsx and mr-sections.tsx.
 */

type Icon = ComponentType<{ className?: string }>;

const valueIcons: Record<MrAboutValueIcon, Icon> = { shield: ShieldCheck, compliance: BadgeCheck, scale: Layers, ai: Sparkles };

const industryIcons: Record<MrAboutIndustryIcon, Icon> = {
  finance: Banknote,
  health: HeartPulse,
  education: GraduationCap,
  insurance: Umbrella,
  manufacturing: Factory,
  government: Building2,
};

/* ------------------------------------------------------------------------------------------------
 * About
 * ---------------------------------------------------------------------------------------------- */

/** Mission and vision as two large statements: the lead clause in ink, the rest in muted ink. */
export function MrPurposeSection() {
  const statements = [
    { label: "Our mission", icon: Target, ...mrAbout.mission },
    { label: "Our vision", icon: Compass, ...mrAbout.vision },
  ];
  return (
    <Section aria-labelledby="purpose-title">
      <Container>
        <SectionHeading id="purpose-title" eyebrow={mrAbout.purpose.eyebrow} title={mrAbout.purpose.title} />
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-line ring-1 ring-line lg:mt-14 md:grid-cols-2">
          {statements.map((s, i) => (
            <article key={s.label} className="flex flex-col bg-surface p-7 sm:p-10 lg:p-14">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <MrIconTile icon={s.icon} />
                  <h3 className="font-mono text-label uppercase text-muted">{s.label}</h3>
                </div>
                <span aria-hidden className="font-mono text-label text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-8 text-[clamp(1.375rem,1.15rem+0.8vw,1.875rem)] font-medium leading-[1.28] tracking-[-0.022em] lg:mt-10">
                <span className="text-ink">{s.lead}</span> <span className="text-muted">{s.rest}</span>
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Company story beside the platform it describes, with links to the four modules. */
export function MrStorySection() {
  const modules = getMrModules();
  return (
    <Section tone="surface" aria-labelledby="story-title">
      <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <SectionHeading id="story-title" eyebrow="Our story" title={mrAbout.storyTitle} />
          <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-ink-soft">
            {mrAbout.story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-10 border-t border-line pt-8">
            <h3 className="font-mono text-label uppercase text-muted">One platform, four modules</h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {modules.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/maplerecord/platform/${m.slug}`}
                    className="group flex min-h-12 items-center justify-between gap-3 rounded-xl bg-paper px-4 text-[0.9375rem] font-medium ring-1 ring-line transition-shadow hover:ring-ink"
                  >
                    {m.name}
                    <ArrowRight aria-hidden className="size-4 text-muted transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-signal" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:sticky lg:top-40 lg:col-span-6">
          <MrStage>
            <MrWindow image={mrAbout.images.platform} label="MR Records" aspect="square" sizes={mrHalfSizes} />
          </MrStage>
        </div>
      </Container>
    </Section>
  );
}

export function MrValuesSection() {
  return (
    <Section aria-labelledby="values-title">
      <Container>
        <SectionHeading id="values-title" eyebrow="Our values" title={mrAbout.valuesTitle} intro={mrAbout.valuesIntro} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {mrAbout.values.map((v) => (
            <li key={v.title}>
              <MrFeatureCard icon={valueIcons[v.icon]} title={v.title} body={v.body} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/** Industries as cards; the industry name is the link and the whole card is its click target. */
export function MrIndustriesSection() {
  return (
    <Section tone="deep" aria-labelledby="industries-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="industries-title" eyebrow="Industries we serve" title={mrAbout.industriesTitle} />
          <ArrowLink href="/maplerecord/solutions">All solutions</ArrowLink>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {mrAbout.industries.map((industry) => (
            <li
              key={industry.solution}
              className="group relative flex h-full gap-5 rounded-2xl bg-surface p-6 ring-1 ring-line transition-shadow hover:ring-ink has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-signal sm:p-7"
            >
              <MrIconTile icon={industryIcons[industry.icon]} />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold leading-snug tracking-tight">
                  <Link href={`/maplerecord/solutions/${industry.solution}`} className="inline-flex min-h-6 items-center after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
                    {industry.name}
                  </Link>
                </h3>
                <p className="mt-1.5 text-[0.9375rem] text-muted">{industry.body}</p>
              </div>
              <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-muted transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-signal" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Contact
 * ---------------------------------------------------------------------------------------------- */

/** Compact dark hero: headline and lead side by side at lg, with room below for the contact hub to overlap. */
export function MrContactHero({ crumbs }: { crumbs: { label: string; href?: string }[] }) {
  return (
    <section className="on-night mr-stage-dark relative overflow-hidden border-b border-night-line text-night-text" aria-labelledby="contact-hero-title">
      <Container className="relative pb-28 pt-8 sm:pb-32 lg:pb-36 lg:pt-10">
        <MrCrumbs items={crumbs} tone="dark" />
        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <MrBadge tone="dark">{mrContact.eyebrow}</MrBadge>
            <h1 id="contact-hero-title" className="mt-6 text-h2 font-semibold">
              {mrContact.title}
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pb-1">
            <p className="max-w-[48ch] text-lead text-night-muted">{mrContact.body}</p>
            <p className="mt-5 text-sm text-night-muted">
              Source:{" "}
              <a
                href={mrOfficial.contact}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-6 items-center underline decoration-night-line underline-offset-4 hover:text-night-text"
              >
                maplerecord.com/contact-us
                <span className="sr-only"> (opens maplerecord.com in a new tab)</span>
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({ href, icon, label, value }: { href: string; icon: Icon; label: string; value: string }) {
  return (
    <a
      href={href}
      className="group flex min-h-16 items-center gap-4 rounded-2xl bg-paper px-4 py-3 ring-1 ring-line transition-shadow hover:ring-ink"
    >
      <MrIconTile icon={icon} className="bg-surface" />
      <span className="min-w-0">
        <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">{label}</span>
        <span className="block text-[1.0625rem] font-semibold tracking-tight [overflow-wrap:anywhere]">{value}</span>
      </span>
    </a>
  );
}

/** Demo request (primary) and direct sales contact, pulled up over the hero's lower edge. */
export function MrContactHub() {
  const { demo, direct } = mrContact;
  return (
    <section className="relative flow-root bg-paper pb-16 sm:pb-20 lg:pb-24" aria-labelledby="hub-title">
      <h2 id="hub-title" className="sr-only">
        Ways to reach MapleRecord
      </h2>
      <Container className="relative -mt-16 grid gap-5 sm:-mt-20 lg:grid-cols-12 lg:gap-6">
        <article className="flex min-w-0 flex-col rounded-3xl bg-surface p-6 shadow-[0_1px_2px_rgb(17_17_17/0.05),0_24px_56px_-28px_rgb(17_17_17/0.35)] ring-1 ring-ink/10 sm:p-10 lg:col-span-7">
          <MrIconTile icon={CalendarCheck} className="bg-signal text-white ring-0" />
          <h3 className="mt-6 text-h3">{demo.title}</h3>
          <p className="mt-3 max-w-[56ch] text-muted">{demo.body}</p>
          <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {demo.fields.map((field) => (
              <li key={field} className="flex items-center gap-2.5 text-[0.9375rem] sm:gap-3">
                <Check aria-hidden className="size-4 shrink-0 text-signal" />
                {field}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-9 sm:flex-row sm:items-center sm:gap-5">
            <ExternalLink href={mrOfficial.demo} variant="primary">
              {demo.action}
            </ExternalLink>
            <p className="text-sm text-muted">{demo.note}</p>
          </div>
        </article>

        <article className="flex min-w-0 flex-col rounded-3xl bg-surface p-6 shadow-[0_1px_2px_rgb(17_17_17/0.05),0_24px_56px_-28px_rgb(17_17_17/0.35)] ring-1 ring-ink/10 sm:p-10 lg:col-span-5">
          <h3 className="text-h3">{direct.title}</h3>
          <p className="mt-3 text-muted">{direct.body}</p>
          <div className="mt-7 space-y-3">
            <ContactRow href={`mailto:${mrContact.email}`} icon={Mail} label="Email" value={mrContact.email} />
            <ContactRow href={`tel:${mrContact.phone.e164}`} icon={Phone} label="Phone" value={mrContact.phone.display} />
          </div>
          <div className="mt-auto pt-7">
            <p className="flex items-start gap-2.5 border-t border-line pt-5 text-sm text-muted">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0" />
              <span>
                Offices in {mrContact.offices.map((o) => o.city).join(" and ")}.{" "}
                <a href="#offices-title" className="inline-flex min-h-6 items-center font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-signal">
                  See addresses
                </a>
              </span>
            </p>
          </div>
        </article>
      </Container>
    </section>
  );
}

/** Office addresses, the Maverick InnoGarage route, and MapleRecord's legal pages. */
export function MrContactOffices() {
  const { partner } = mrContact;
  return (
    <Section tone="surface" spacing="compact" aria-labelledby="offices-title">
      <Container>
        <SectionHeading id="offices-title" eyebrow="Offices" title="Where to find MapleRecord" />
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {mrContact.offices.map((office) => (
            <li key={office.label} className="flex flex-col rounded-2xl bg-paper p-6 ring-1 ring-line sm:p-7">
              <MrIconTile icon={MapPin} className="bg-surface" />
              <p className="mt-5 font-mono text-label uppercase text-muted">{office.label}</p>
              <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{office.city}</h3>
              <address className="mt-3 not-italic leading-relaxed text-ink-soft">
                {office.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </li>
          ))}
          <li className="flex flex-col rounded-2xl bg-paper-deep p-6 ring-1 ring-line sm:p-7 md:col-span-2 lg:col-span-1">
            <MrIconTile icon={Handshake} className="bg-surface" />
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{partner.title}</h3>
            <p className="mt-2 text-[0.9375rem] text-muted">{partner.body}</p>
            <div className="mt-auto pt-4">
              <ArrowLink href={contactHref("data-management")}>{partner.action}</ArrowLink>
            </div>
          </li>
        </ul>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
          <p className="text-sm text-muted">MapleRecord’s legal terms are published on maplerecord.com:</p>
          <ul className="flex flex-wrap gap-x-6">
            <li>
              <ExternalLink href={mrOfficial.terms} className="text-sm">
                Terms of Service
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={mrOfficial.privacy} className="text-sm">
                Privacy Policy
              </ExternalLink>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
