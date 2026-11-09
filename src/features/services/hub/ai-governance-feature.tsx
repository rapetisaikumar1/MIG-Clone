import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/layout";
import { aiGovernanceNav, pillarsNav } from "@/config/navigation";
import { contactHref } from "@/features/contact/links";
import { getService } from "@/lib/content/services";

/** The two pillars AI Governance builds on: data governance (01) and AI/ML enablement (02). */
const foundations = pillarsNav.filter((p) => p.number === "01" || p.number === "02");

const arrow =
  "size-4 shrink-0 text-muted transition-colors duration-200 group-hover:text-signal motion-safe:transition-[color,transform] motion-safe:group-hover:translate-x-0.5";

/**
 * AI Governance on /services. The owner treats it as core expertise, so it gets its own band right after the matrix,
 * with its lead and every capability (linking to its anchor) read from the AI Governance page content. It is not one of the deck's seven pillars, so it is
 * presented beside them (building on pillars 01 and 02) rather than numbered among them.
 */
export function AiGovernanceFeature({ id }: { id: string }) {
  const service = getService("ai-governance");
  const titleId = `${id}-title`;
  return (
    <Section tone="deep" id={id} aria-labelledby={titleId}>
      <Container>
        <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow>Core expertise · Responsible AI</Eyebrow>
            <h2 id={titleId} className="mt-5 text-h2">
              {aiGovernanceNav.label}
            </h2>
            {/* The AI Governance page's own lead, so the two pages never drift apart. */}
            <p className="mt-6 max-w-[60ch] text-lead text-muted">{service.hero.lead}</p>
          </div>
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
              <ButtonLink href={aiGovernanceNav.href} variant="ink" arrow>
                Explore AI Governance
              </ButtonLink>
              <ButtonLink href={contactHref("ai-governance")} variant="outline">
                Talk to an Expert
              </ButtonLink>
            </div>
          </div>
        </div>

        <ul
          aria-label={`${aiGovernanceNav.label} capabilities`}
          className="mt-12 grid border-t border-ink md:grid-cols-3 md:gap-x-8 lg:mt-14"
        >
          {service.capabilities.map((c) => (
            <li key={c.id} className="reveal border-b border-line-strong">
              <Link
                href={`${aiGovernanceNav.href}#${c.id}`}
                className="group flex min-h-16 items-center justify-between gap-4 py-3 font-medium"
              >
                <span className="flex-1 decoration-1 underline-offset-4 group-hover:underline">{c.title}</span>
                <ArrowRight aria-hidden className={arrow} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="reveal mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
          <p className="font-mono text-label uppercase text-muted">Builds on</p>
          {foundations.map((p) => (
            <ArrowLink key={p.number} href={p.href} className="min-h-10">
              {`${p.number} ${p.label}`}
            </ArrowLink>
          ))}
        </div>
      </Container>
    </Section>
  );
}
