import { Container, Dot, Eyebrow, Section, SectionHeading } from "@/components/ui/layout";
import { company } from "@/config/site";
import { CtaBand } from "@/features/contact/cta-band";
import { OfficeList } from "@/features/contact/office-list";
import { ApproachSteps, Breadcrumbs } from "@/features/services/sections";
import { deliveryApproach } from "@/content/home";
import { pageMetadata } from "@/lib/metadata";
import { ArrowLink } from "@/components/ui/button";
import { contactHref } from "@/features/contact/links";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Maverick InnoGarage is a technology consultancy focused on AI governance, Adobe services and data management, with offices in Delaware, Texas and Ontario.",
  path: "/about",
});

const principles = [
  { title: "Start from the outcome", body: "We begin with the decision, experience or obligation you care about, and work back to the data and controls it needs." },
  { title: "Keep controls proportionate", body: "Governance should fit the risk. Light where it can be, rigorous where it must be." },
  { title: "Build your capability", body: "Documentation, training and handover are part of the work, so your teams can run what we deliver." },
  { title: "Write it down plainly", body: "Policies, designs and runbooks written for the people who will use them." },
  { title: "Scope honestly", body: "If something isn't a good fit for us, or doesn't need doing yet, we'll say so." },
];

// Values carried over from the existing About page.
const culture = [
  { title: "Innovation", body: "We encourage new ideas and stay close to emerging technology so our advice remains current." },
  { title: "Collaboration", body: "The best solutions come from working across disciplines, and alongside our clients' teams." },
  { title: "Continuous learning", body: "Ongoing training and development keep our skills aligned with the platforms and practices we support." },
  { title: "Inclusion", body: "We value different backgrounds and perspectives, and want everyone to be able to contribute their best work." },
  { title: "Community", body: "We encourage our people to take part in the causes and communities they care about." },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line pb-16 pt-10 lg:pb-24 lg:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <div className="mt-12 max-w-5xl">
            <Eyebrow>About Maverick InnoGarage</Eyebrow>
            <h1 className="mt-6 text-h1">A focused consultancy for responsible AI, Adobe platforms and enterprise data.</h1>
            <p className="mt-7 max-w-[62ch] text-lead text-muted">{company.positioning}</p>
          </div>
        </Container>
      </section>

      <Section aria-labelledby="belief-title">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="belief-title" eyebrow="What we believe" title={company.thesis} />
          </div>
          <div className="space-y-5 text-[1.0625rem] text-ink-soft lg:col-span-7 lg:pt-12">
            <p>
              AI systems inherit the quality, gaps and biases of the data behind them. Personalized digital experiences are only
              as good as the customer profiles that drive them. And neither can be trusted without clear ownership and oversight.
            </p>
            <p>
              That&apos;s why we work across three connected specializations rather than one. Data management gives
              organizations reliable, well-governed information. AI governance makes sure that information is used responsibly.
              Adobe services turn it into customer experiences people value.
            </p>
            <p>
              We are named Maverick InnoGarage, or MiG, for the habit of questioning default answers and building practical
              solutions in the workshop rather than the slide deck.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="surface" id="approach" aria-labelledby="approach-title">
        <Container>
          <SectionHeading id="approach-title" eyebrow="How we work" title="Our delivery approach" intro="Every engagement follows the same four stages, and each stage ends with something tangible." />
          <ApproachSteps stages={deliveryApproach} />
          <ul className="mt-20 grid gap-x-10 gap-y-10 border-t border-ink pt-12 sm:grid-cols-2 lg:grid-cols-5">
            {principles.map((p) => (
              <li key={p.title}>
                <Dot />
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="culture-title">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="culture-title" eyebrow="Culture" title="How we work together" />
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-8">
            {culture.map((c) => (
              <li key={c.title} className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
                <p className="text-muted">{c.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="deep" aria-labelledby="where-title">
        <Container>
          <SectionHeading id="where-title" eyebrow="Where we are" title="Offices in the United States and Canada" />
          <OfficeList className="mt-12" />
          <div className="mt-16 rounded-2xl border border-line bg-surface p-7 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-9">
            <div>
              <h3 className="text-h3">Interested in joining us?</h3>
              <p className="mt-2 max-w-[56ch] text-muted">We&apos;re always glad to hear from people who care about data, AI and digital experience.</p>
            </div>
            <ArrowLink href={contactHref("general")} className="mt-4 shrink-0 sm:mt-0">
              Get in touch
            </ArrowLink>
          </div>
        </Container>
      </Section>

      <CtaBand title="Let's talk about what you're building." body="Whether you're starting with AI oversight, an Adobe platform or your data foundation, we'll help you find a practical first step." />
    </>
  );
}
