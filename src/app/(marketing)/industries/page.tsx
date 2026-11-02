import Link from "next/link";
import { ArrowLink } from "@/components/ui/button";
import { Container, Dot, Eyebrow } from "@/components/ui/layout";
import { industries } from "@/content/industries";
import { CtaBand } from "@/features/contact/cta-band";
import { Breadcrumbs } from "@/features/services/sections";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "How AI governance, Adobe services and data management apply in healthcare, retail, manufacturing, telecommunications, government, media, financial services and software.",
  path: "/industries",
});

const areaHref = {
  "AI Governance": "/ai-governance",
  "Adobe Services": "/adobe-services",
  "Data Management": "/data-management",
} as const;

export default function IndustriesPage() {
  return (
    <>
      <section className="border-b border-line pb-14 pt-10 lg:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Eyebrow>Industries</Eyebrow>
              <h1 className="mt-6 text-h1">Different sectors, the same need for trusted data.</h1>
              <p className="mt-6 max-w-[60ch] text-lead text-muted">
                Every industry has its own regulations, customers and systems. Here is how our three specializations typically
                apply in each.
              </p>
            </div>
            <nav aria-label="Industries on this page" className="lg:col-span-4 lg:pt-4">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-[0.9375rem] lg:grid-cols-1">
                {industries.map((i) => (
                  <li key={i.id}>
                    <Link href={`#${i.id}`} className="inline-flex min-h-10 items-center text-ink-soft underline-offset-4 hover:text-ink hover:underline">
                      {i.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>

      <div className="py-8 sm:py-12">
        <Container>
          {industries.map((industry, index) => (
            <section key={industry.id} id={industry.id} aria-labelledby={`${industry.id}-title`} className="grid gap-8 border-b border-line py-14 last:border-b-0 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <p className="font-mono text-label text-muted">{String(index + 1).padStart(2, "0")}</p>
                <h2 id={`${industry.id}-title`} className="mt-3 text-h2">
                  {industry.name}
                </h2>
                <p className="mt-5 text-lg font-medium leading-snug">{industry.headline}</p>
                <p className="mt-4 text-muted">{industry.summary}</p>
              </div>
              <div className="lg:col-span-7">
                <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
                  {industry.applications.map((a) => (
                    <li key={a.area} className="grid gap-2 p-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
                      <Link href={areaHref[a.area]} className="flex items-center gap-2.5 self-start font-mono text-label uppercase text-ink hover:text-signal">
                        <Dot />
                        {a.area}
                      </Link>
                      <p className="text-ink-soft">{a.text}</p>
                    </li>
                  ))}
                </ul>
                {industry.maplerecord ? (
                  <ArrowLink href="/maplerecord" className="mt-5">
                    See MapleRecord for public-sector records
                  </ArrowLink>
                ) : null}
              </div>
            </section>
          ))}
        </Container>
      </div>

      <CtaBand title="Don't see your industry?" body="The underlying challenges are often the same. Tell us about your sector and what you're trying to achieve." />
    </>
  );
}
