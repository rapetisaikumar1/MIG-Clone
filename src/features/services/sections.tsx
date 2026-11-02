import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Dot, Eyebrow, IllustrativeLabel, Section, SectionHeading, Tag } from "@/components/ui/layout";
import type { AdobePlatform, ApproachStage, Capability, ServiceContent, UseCase } from "@/lib/content/types";
import { contactHref } from "@/features/contact/links";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden>/</span> : null}
            {item.href ? (
              <Link href={item.href} className="underline-offset-4 hover:text-ink hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ServiceHero({ content, graphic }: { content: ServiceContent; graphic: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper pb-16 pt-10 sm:pb-20 lg:pb-24 lg:pt-14">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: content.name }]} />
        <div className="mt-10 grid items-center gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>{content.hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 text-h1">{content.hero.title}</h1>
            <p className="mt-7 max-w-[60ch] text-lead text-muted">{content.hero.lead}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={contactHref(content.interest)} arrow>
                Talk to an Expert
              </ButtonLink>
              <ButtonLink href="#capabilities" variant="outline">
                What&apos;s included
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-line bg-surface/70 p-5 sm:p-8">{graphic}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ProblemSection({ content }: { content: ServiceContent }) {
  return (
    <Section aria-labelledby="problem-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>The challenge</Eyebrow>
            <h2 id="problem-title" className="mt-5 text-h2">
              {content.problem.title}
            </h2>
            <div className="mt-8 space-y-5 text-[1.0625rem] text-ink-soft">
              {content.problem.body.map((p) => (
                <p key={p.slice(0, 24)} className="max-w-[62ch]">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <aside className="self-start rounded-2xl bg-paper-deep p-7 sm:p-9 lg:col-span-5" aria-labelledby="signals-title">
            <h3 id="signals-title" className="font-mono text-label uppercase text-muted">
              Signs you may recognize
            </h3>
            <ul className="mt-6 space-y-4">
              {content.problem.signals.map((s) => (
                <li key={s} className="flex gap-3.5 text-[1rem] leading-snug">
                  <Dot className="mt-[0.45rem]" />
                  {s}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="mt-20 border-t border-ink pt-10" aria-labelledby="audience-title">
          <h3 id="audience-title" className="font-mono text-label uppercase text-muted">
            Who this is for
          </h3>
          <ul className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.audience.map((a) => (
              <li key={a.role}>
                <p className="text-h3 font-semibold">{a.role}</p>
                <p className="mt-2 text-muted">{a.need}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

function CapabilityItem({ capability, index }: { capability: Capability; index: number }) {
  return (
    <li id={capability.id} className="flex flex-col border-t border-line-strong pt-6">
      <span className="font-mono text-label text-muted">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-4 text-h3">{capability.title}</h3>
      <p className="mt-3 text-muted">{capability.summary}</p>
      <ul className="mt-5 space-y-2 text-[0.9375rem] text-ink-soft">
        {capability.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden className="mt-[0.7rem] h-px w-3 shrink-0 bg-ink" />
            {item}
          </li>
        ))}
      </ul>
      {capability.platforms ? (
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {capability.platforms.map((p) => (
            <Tag key={p}>{p}</Tag>
          ))}
        </div>
      ) : null}
    </li>
  );
}

export function CapabilitiesSection({ content }: { content: ServiceContent }) {
  return (
    <Section tone="surface" id="capabilities" aria-labelledby="capabilities-title">
      <Container>
        <SectionHeading id="capabilities-title" eyebrow="What an engagement includes" title="Services and capabilities" intro={content.capabilitiesIntro} />
        <ol className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {content.capabilities.map((c, i) => (
            <CapabilityItem key={c.id} capability={c} index={i} />
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export function PlatformMatrix({ platforms }: { platforms: AdobePlatform[] }) {
  return (
    <Section tone="night" aria-labelledby="platforms-title">
      <Container>
        <SectionHeading
          tone="night"
          id="platforms-title"
          eyebrow="Adobe applications"
          title="The platforms we implement and optimize"
          intro="What each application does, and the services we provide for it."
        />
        <ul className="mt-14 divide-y divide-night-line border-y border-night-line">
          {platforms.map((p) => (
            <li key={p.id} id={p.id} className="grid gap-5 py-9 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <p className="font-mono text-label uppercase text-night-muted">{p.area}</p>
                <h3 className="mt-3 text-h3">{p.name}</h3>
              </div>
              <p className="text-night-muted lg:col-span-4">{p.description}</p>
              <ul className="flex flex-wrap content-start gap-2 lg:col-span-4" aria-label={`Services for ${p.name}`}>
                {p.services.map((s) => (
                  <li key={s} className="rounded-full border border-night-line px-3 py-1.5 text-sm text-night-text">
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-sm text-night-muted">
          Adobe, Adobe Experience Platform, Experience Manager, Marketo Engage and the other product names above are
          trademarks of Adobe Inc. Maverick InnoGarage is an independent consultancy.
        </p>
      </Container>
    </Section>
  );
}

export function ApproachSteps({ stages, tone = "light" }: { stages: ApproachStage[]; tone?: "light" | "night" }) {
  const night = tone === "night";
  return (
    <ol className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      <span aria-hidden className={cn("absolute left-0 right-0 top-[1.375rem] hidden h-px lg:block", night ? "bg-night-line" : "bg-line-strong")} />
      {stages.map((s, i) => (
        <li key={s.stage} className="relative">
          <span
            className={cn(
              "relative z-10 inline-flex size-11 items-center justify-center rounded-full font-mono text-sm",
              i === 0 ? "bg-signal text-white" : night ? "bg-night-raised text-night-text ring-1 ring-night-line" : "bg-surface text-ink ring-1 ring-line-strong",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-6 text-h3">{s.stage}</h3>
          <p className={cn("mt-3", night ? "text-night-muted" : "text-muted")}>{s.activities}</p>
          <div className={cn("mt-6 border-t pt-4", night ? "border-night-line" : "border-line")}>
            <p className={cn("font-mono text-label uppercase", night ? "text-night-muted" : "text-muted")}>Deliverable</p>
            <p className="mt-2 font-medium leading-snug">{s.deliverable}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ApproachSection({ content }: { content: ServiceContent }) {
  return (
    <Section aria-labelledby="approach-title">
      <Container>
        <SectionHeading
          id="approach-title"
          eyebrow="Delivery approach"
          title="Assess, design, implement, improve"
          intro="Each stage ends with something tangible you can review, use, and build on."
        />
        <ApproachSteps stages={content.approach} />
      </Container>
    </Section>
  );
}

export function DeliverablesSection({ content }: { content: ServiceContent }) {
  return (
    <Section tone="deep" aria-labelledby="deliverables-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="deliverables-title" eyebrow="Deliverables" title="What you receive" intro="Practical outputs written for the people who will use them." />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {content.deliverables.map((d) => (
              <li key={d.title} className="group relative rounded-xl border border-line bg-surface p-6 pr-12">
                <svg aria-hidden viewBox="0 0 20 24" className="absolute right-5 top-6 h-6 w-5 text-line-strong">
                  <path d="M1 1 H13 L19 7 V23 H1 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M13 1 V7 H19" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <h3 className="text-lg font-semibold tracking-tight">{d.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{d.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  const rows: [string, string][] = [
    ["Situation", useCase.context],
    ["Approach", useCase.approach],
    ["Intended outcome", useCase.outcome],
  ];
  return (
    <li className="flex flex-col rounded-2xl border border-line bg-surface p-7">
      <IllustrativeLabel className="self-start" />
      <h3 className="mt-6 text-h3">{useCase.title}</h3>
      <dl className="mt-6 space-y-5">
        {rows.map(([term, text]) => (
          <div key={term}>
            <dt className="font-mono text-label uppercase text-muted">{term}</dt>
            <dd className="mt-1.5 text-[0.9375rem] text-ink-soft">{text}</dd>
          </div>
        ))}
      </dl>
    </li>
  );
}

export function UseCasesSection({ content }: { content: ServiceContent }) {
  return (
    <Section aria-labelledby="usecases-title">
      <Container>
        <SectionHeading
          id="usecases-title"
          eyebrow="Practical applications"
          title="How this work applies in practice"
          intro="These are illustrative scenarios that show typical situations and approaches. They are not descriptions of specific client engagements."
        />
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {content.useCases.map((u) => (
            <UseCaseCard key={u.title} useCase={u} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function BenefitsSection({ content }: { content: ServiceContent }) {
  return (
    <Section tone="surface" className="py-16 sm:py-20 lg:py-24" aria-labelledby="benefits-title">
      <Container>
        <h2 id="benefits-title" className="font-mono text-label uppercase text-muted">
          Intended benefits
        </h2>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {content.benefits.map((b) => (
            <li key={b.title} className="bg-surface p-7">
              <Dot />
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{b.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function FaqSection({ faqs, title = "Frequently asked questions" }: { faqs: ServiceContent["faqs"]; title?: string }) {
  return (
    <Section aria-labelledby="faq-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="faq-title" eyebrow="FAQ" title={title} />
          </div>
          <div className="lg:col-span-8">
            <ul className="border-t border-ink">
              {faqs.map((f) => (
                <li key={f.question} className="border-b border-line">
                  <details className="group">
                    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium tracking-tight marker:hidden [&::-webkit-details-marker]:hidden">
                      {f.question}
                      <span
                        aria-hidden
                        className="relative inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:border-ink"
                      >
                        <span className="absolute h-px w-3 bg-ink" />
                        <span className="absolute h-3 w-px bg-ink transition-transform duration-200 group-open:scale-y-0" />
                      </span>
                    </summary>
                    <p className="max-w-[64ch] pb-6 pr-12 text-ink-soft">{f.answer}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function RelatedServices({ current }: { current: ServiceContent["slug"] }) {
  const all = [
    { slug: "ai-governance", name: "AI Governance", line: "Oversight, accountability and review for AI use." },
    { slug: "adobe-services", name: "Adobe Services", line: "Implementation and optimization of Adobe platforms." },
    { slug: "data-management", name: "Data Management", line: "Governance, integration, quality and lifecycle." },
  ] as const;
  return (
    <Section tone="deep" className="py-16 sm:py-20" aria-labelledby="related-title">
      <Container>
        <h2 id="related-title" className="font-mono text-label uppercase text-muted">
          Connected expertise
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {all
            .filter((s) => s.slug !== current)
            .map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}`}
                  className="group flex items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-ink"
                >
                  <span>
                    <span className="block text-h3 font-semibold">{s.name}</span>
                    <span className="mt-1 block text-muted">{s.line}</span>
                  </span>
                  <span
                    aria-hidden
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-white"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </Container>
    </Section>
  );
}
