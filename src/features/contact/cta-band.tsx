import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { primaryPhone } from "@/config/site";
import type { ContactInterest } from "./schema";
import { contactHref } from "./links";
import { OfficeList } from "./office-list";

export function CtaBand({
  title,
  body,
  interest,
  showOffices = false,
}: {
  title: string;
  body: string;
  interest?: ContactInterest;
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
          <ButtonLink href={contactHref(interest)} arrow>
            Talk to an Expert
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
