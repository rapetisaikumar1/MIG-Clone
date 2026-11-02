import { Container, Eyebrow } from "@/components/ui/layout";
import { company } from "@/config/site";
import { ContactForm } from "@/features/contact/contact-form";
import { OfficeList } from "@/features/contact/office-list";
import { isContactInterest } from "@/features/contact/schema";
import { pageMetadata } from "@/lib/metadata";
import { isContactDeliveryConfigured } from "@/server/env";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to Maverick InnoGarage about AI governance, Adobe services or data management. Offices in Delaware, Texas and Ontario.",
  path: "/contact",
});

// Rendered per request: the selected area of interest comes from the query string
// (e.g. /contact?interest=ai-governance) and delivery status from server configuration.
export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { interest } = await searchParams;
  const defaultInterest = isContactInterest(interest) ? interest : undefined;

  return (
    <>
      <section className="border-b border-line pb-14 pt-14 sm:pt-20">
        <Container>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-h1">Talk to an expert.</h1>
          <p className="mt-6 max-w-[58ch] text-lead text-muted">
            Tell us what you&apos;re working on, whether that&apos;s AI oversight, an Adobe platform, or the data underneath both.
            A member of our team will reply by email.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20" aria-label="Inquiry form and contact details">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div id="inquiry" className="lg:col-span-7">
            <h2 className="text-h3">Send us a message</h2>
            <div className="mt-8">
              <ContactForm key={defaultInterest ?? "none"} defaultInterest={defaultInterest} deliveryConfigured={isContactDeliveryConfigured()} />
            </div>
          </div>
          <aside className="lg:col-span-5" aria-labelledby="next-title">
            <div className="rounded-2xl bg-paper-deep p-7 sm:p-9">
              <h2 id="next-title" className="font-mono text-label uppercase text-muted">
                What happens next
              </h2>
              <ol className="mt-6 space-y-5">
                {[
                  ["We read your message", "A member of the relevant team reviews your inquiry."],
                  ["We reply by email", "We may ask a few questions or suggest a short call."],
                  ["We agree a first step", "Often an assessment or a scoped conversation, never a hard sell."],
                ].map(([title, body], i) => (
                  <li key={title} className="flex gap-4">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-surface font-mono text-xs ring-1 ring-line-strong">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-medium">{title}</span>
                      <span className="mt-0.5 block text-[0.9375rem] text-muted">{body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-10">
              <h2 className="font-mono text-label uppercase text-muted">Follow us</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {company.social.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm hover:border-ink"
                    >
                      {s.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-16 sm:py-20" aria-labelledby="offices-title">
        <Container>
          <h2 id="offices-title" className="text-h2">
            Our offices
          </h2>
          <OfficeList className="mt-10" />
        </Container>
      </section>
    </>
  );
}
