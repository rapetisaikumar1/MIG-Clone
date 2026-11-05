import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLink } from "@/components/ui/button";
import { Container, Dot, Section, SectionHeading } from "@/components/ui/layout";
import { adobeHub } from "@/content/services/adobe-services";
import { contactHref } from "@/features/contact/links";
import { AdobePartnerPanel } from "@/features/adobe/partner-panel";
import { adobeAssessmentPath, adobeProductPath, getAdobeProducts } from "@/lib/content/adobe";
import { cn } from "@/lib/utils";

/*
 * Sections that only the /adobe-services hub renders, slotted into the shared ServicePage.
 * Copy lives in src/content/services/adobe-services.ts (`adobeHub`); product facts come from
 * src/content/adobe/products via getAdobeProducts().
 */

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The one place the hub lists Adobe applications: what each does (Adobe's product, neutral) and the
 * verified service types we provide for it. Each card is linked to its application page and carries
 * the product slug as its id, so /adobe-services#target and similar anchors keep working.
 */
export function AdobeApplicationsSection() {
  const { eyebrow, title, intro, servicesLabel, startTile } = adobeHub.applications;
  const products = getAdobeProducts();
  return (
    <Section tone="night" id="applications" aria-labelledby="applications-title">
      <Container>
        <SectionHeading tone="night" id="applications-title" eyebrow={eyebrow} title={title} intro={intro} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p) => (
            <li key={p.slug} id={p.slug}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-night-line bg-night-raised p-6 transition-colors hover:border-night-muted focus-within:border-night-text has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-night-text sm:p-7">
                <p className="font-mono text-label uppercase text-night-muted">{p.area}</p>
                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
                  <Link href={adobeProductPath(p.slug)} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
                    {p.name}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.9375rem] text-night-muted">{p.description}</p>
                <div className="mt-6 border-t border-night-line pt-4">
                  <p className="font-mono text-label uppercase text-night-muted">{servicesLabel}</p>
                  <ul className="mt-3 space-y-1.5 text-[0.9375rem] leading-snug" aria-label={`Services for ${p.name}`}>
                    {p.services.map((s) => (
                      <li key={s.title} className="flex gap-3">
                        <span aria-hidden className="mt-[0.6rem] h-px w-2.5 shrink-0 bg-night-muted" />
                        {s.title}
                      </li>
                    ))}
                  </ul>
                </div>
                <span aria-hidden className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium">
                  Explore
                  <ArrowRight className="size-4 text-signal transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </article>
            </li>
          ))}
          <li>
            <article className="group relative flex h-full flex-col rounded-2xl border border-dashed border-night-muted/60 p-6 transition-colors hover:border-night-text focus-within:border-night-text has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-night-text sm:p-7">
              <p className="font-mono text-label uppercase text-night-muted">{startTile.eyebrow}</p>
              <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
                <Link href={adobeAssessmentPath} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
                  {startTile.title}
                </Link>
              </h3>
              <p className="mt-2 text-[0.9375rem] text-night-muted">{startTile.body}</p>
              <span aria-hidden className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium">
                {startTile.label}
                <ArrowRight className="size-4 text-signal transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </article>
          </li>
        </ul>
        <AdobePartnerPanel tone="night" className="mt-10" />
      </Container>
    </Section>
  );
}

/** The MiG differentiator: consent, labels, quality and documentation designed into Adobe work. */
export function AdobeGovernanceSection() {
  const { eyebrow, title, intro, items, link } = adobeHub.governance;
  return (
    <Section aria-labelledby="adobe-governance-title">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="adobe-governance-title" eyebrow={eyebrow} title={title} intro={intro} />
            <ArrowLink href={link.href} className="mt-8">
              {link.label}
            </ArrowLink>
          </div>
          <ol className="grid content-start gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7 lg:pt-2">
            {items.map((item, i) => (
              <li key={item.title} className="border-t border-line-strong pt-6">
                <span className="flex items-center gap-2.5 font-mono text-label text-muted">
                  <Dot />
                  {pad(i + 1)}
                </span>
                <h3 className="mt-4 text-h3">{item.title}</h3>
                <p className="mt-3 text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

/** Four entry points, each grounded in a verified service type. */
export function AdobeEngagementSection() {
  const { eyebrow, title, intro, items } = adobeHub.engagements;
  return (
    <Section tone="deep" id="ways-to-engage" aria-labelledby="engage-title">
      <Container>
        <SectionHeading id="engage-title" eyebrow={eyebrow} title={title} intro={intro} />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((e, i) => {
            const href = e.action === "assessment" ? adobeAssessmentPath : contactHref("adobe-services");
            return (
              <li
                key={e.id}
                className={cn("flex flex-col rounded-2xl border bg-surface p-6 sm:p-7", i === 0 ? "border-ink" : "border-line")}
              >
                <span className="font-mono text-label text-muted">{pad(i + 1)}</span>
                <h3 className="mt-4 text-h3">{e.title}</h3>
                <p className="mt-3 text-[0.9375rem] text-muted">{e.description}</p>
                <div className="mt-6 border-t border-line pt-4">
                  <p className="font-mono text-label uppercase text-muted">Good when</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-snug text-ink-soft">{e.goodWhen}</p>
                </div>
                <div className="mt-auto pt-6">
                  <ArrowLink href={href}>
                    {e.actionLabel}
                  </ArrowLink>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
