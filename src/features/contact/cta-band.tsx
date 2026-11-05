import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { primaryPhone } from "@/config/site";
import type { ContactInterest } from "./schema";
import { contactHref, type ContactTopic } from "./links";
import { OfficeList } from "./office-list";

export function CtaBand({
  title,
  body,
  interest,
  product,
  topic,
  ctaLabel = "Talk to an Expert",
  showOffices = false,
}: {
  title: string;
  body: string;
  interest?: ContactInterest;
  /** Adobe product slug; pre-ticks that application in the contact form. */
  product?: string;
  /** Named entry point that prefills the message, e.g. "assessment". */
  topic?: ContactTopic;
  /** Primary button label; defaults to the site-wide "Talk to an Expert". */
  ctaLabel?: string;
  showOffices?: boolean;
}) {
  return (
    <section className="on-night relative overflow-hidden bg-night py-20 text-night-text sm:py-24 lg:py-32" aria-labelledby="cta-title">
      <svg aria-hidden viewBox="0 0 600 600" className="pointer-events-none absolute -right-40 -top-40 hidden w-[38rem] opacity-60 lg:block">
        <circle cx="300" cy="300" r="299" fill="none" stroke="var(--night-line)" />
        <circle cx="300" cy="300" r="210" fill="none" stroke="var(--night-line)" />
        <circle cx="300" cy="300" r="120" fill="none" stroke="var(--night-line)" />
        <circle cx="300" cy="90" r="7" fill="var(--logo-red)" />
      </svg>
      <Container className="relative">
        <Eyebrow tone="night">Start a conversation</Eyebrow>
        <h2 id="cta-title" className="mt-6 max-w-4xl text-h1">
          {title}
        </h2>
        <p className="mt-6 max-w-[56ch] text-lead text-night-muted">{body}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={contactHref(interest, { product, topic })} arrow>
            {ctaLabel}
          </ButtonLink>
          <ButtonLink href={`tel:${primaryPhone.e164}`} variant="outline-night">
            Call {primaryPhone.display}
          </ButtonLink>
        </div>
        {showOffices ? <OfficeList tone="night" className="mt-20" /> : null}
      </Container>
    </section>
  );
}
