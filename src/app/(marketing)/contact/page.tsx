import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { ArrowLink } from "@/components/ui/button";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/layout";
import { ContactForm } from "@/features/contact/contact-form";
import { OfficeList, PhoneLinks } from "@/features/contact/office-list";
import { contactTopics, isContactTopic } from "@/features/contact/links";
import { isAdobeApplication, isContactInterest, MAX_ADOBE_APPLICATIONS } from "@/features/contact/schema";
import { Breadcrumbs } from "@/features/services/sections";
import { adobeAssessmentPath } from "@/lib/content/adobe";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { isContactDeliveryConfigured } from "@/server/env";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to Maverick InnoGarage about data, cloud and engineering, Adobe Experience Cloud, experience design, digital products, CRM, MapleRecord or MOLI. Offices across the US and Canada.",
  path: "/contact",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "Contact" }];

/** "What happens next" steps. Without online delivery the form can't send, so the steps start with a call instead. */
const nextSteps = {
  online: [
    ["We read your message", "A member of the relevant team reviews your inquiry."],
    ["We reply by email", "We may ask a few questions or suggest a short call."],
    ["We agree on a first step", "Often an assessment or a scoped first project, never a hard sell."],
  ],
  phone: [
    ["Call the office nearest you", "The numbers are at the top of the form and in the office list below."],
    ["We talk it through", "We may ask a few questions about your goals, systems and timeline."],
    ["We agree on a first step", "Often an assessment or a scoped first project, never a hard sell."],
  ],
} as const;

// Rendered per request: the selected area of interest comes from the query string
// (e.g. /contact?interest=ai-governance) and delivery status from server configuration.
// Adobe product pages add ?product=<slug> to pre-tick that application; unknown slugs are dropped.
export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { interest, product, topic } = await searchParams;
  const contactTopic = isContactTopic(topic) ? contactTopics[topic] : undefined;
  const products = (Array.isArray(product) ? product : product ? [product] : []).filter(isAdobeApplication);
  const defaultAdobeApplications = [...new Set(products)].slice(0, MAX_ADOBE_APPLICATIONS);
  const defaultInterest = isContactInterest(interest)
    ? interest
    : contactTopic
      ? contactTopic.interest
      : defaultAdobeApplications.length > 0
        ? "adobe-services"
        : undefined;
  const deliveryConfigured = isContactDeliveryConfigured();

  return (
    <>
      <section className="border-b border-line pb-14 pt-10 lg:pt-14">
        <Container>
          <JsonLd data={breadcrumbJsonLd(crumbs, "/contact")} />
          <Breadcrumbs items={crumbs} />
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-6 max-w-4xl text-h1">Talk to an expert.</h1>
            <p className="mt-6 max-w-[58ch] text-lead text-muted">
              Tell us what you&apos;re working on, whether that&apos;s your data, a cloud platform, an Adobe implementation, a
              digital product or a records program.{" "}
              {/* Don't promise an email reply while the form can't deliver. */}
              {deliveryConfigured ? "A member of our team will reply by email." : "The quickest way to reach us right now is by phone."}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20" aria-label="Inquiry form and contact details">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div id="inquiry" className="lg:col-span-7">
            <h2 className="text-h3">Send us a message</h2>
            <div className="mt-8">
              <ContactForm
                key={`${defaultInterest ?? "none"}:${defaultAdobeApplications.join(",")}:${isContactTopic(topic) ? topic : ""}`}
                defaultInterest={defaultInterest}
                defaultMessage={contactTopic?.message}
                defaultAdobeApplications={defaultAdobeApplications}
                deliveryConfigured={deliveryConfigured}
              />
            </div>
          </div>
          {/* Two columns on tablets so the panels don't stack into a long column under the form; one sticky column
              beside the form on desktop, only where the whole panel fits in the viewport. */}
          <aside
            className="grid gap-5 self-start md:grid-cols-2 lg:col-span-5 lg:grid-cols-1 [@media(min-width:64rem)_and_(min-height:50rem)]:sticky [@media(min-width:64rem)_and_(min-height:50rem)]:top-24"
            aria-labelledby="next-title"
          >
            <div className={cn("rounded-2xl bg-paper-deep p-7 sm:p-8", deliveryConfigured && "md:col-span-2 lg:col-span-1")}>
              <h2 id="next-title" className="font-mono text-label uppercase text-muted">
                What happens next
              </h2>
              <ol className="mt-6 space-y-5">
                {nextSteps[deliveryConfigured ? "online" : "phone"].map(([title, body], i) => (
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
            {/* The numbers people need, next to the form. While the form can't deliver, its notice lists them instead. */}
            {deliveryConfigured ? (
              <div className="rounded-2xl border border-line-strong p-7 sm:p-8">
                <h2 className="text-lg font-semibold">Prefer to call?</h2>
                <PhoneLinks className="mt-4" />
              </div>
            ) : null}
            <div className="rounded-2xl border border-line-strong p-7 sm:p-8">
              <h2 className="text-lg font-semibold">Starting with Adobe?</h2>
              <p className="mt-2 text-[0.9375rem] text-muted">
                A platform assessment reviews how your Adobe applications are configured and used, and where the gaps are.
              </p>
              <ArrowLink href={adobeAssessmentPath} className="mt-3">
                About the platform assessment
              </ArrowLink>
            </div>
          </aside>
        </Container>
      </section>

      <section id="offices" className="border-t border-line bg-surface py-16 sm:py-20" aria-labelledby="offices-title">
        <Container>
          <SectionHeading id="offices-title" eyebrow="Where we are" title="Our offices" />
          <OfficeList className="mt-10" messages={deliveryConfigured} />
        </Container>
      </section>
    </>
  );
}
