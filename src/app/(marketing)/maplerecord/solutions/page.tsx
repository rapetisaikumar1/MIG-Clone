import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { MrCta, MrFigure, MrHero } from "@/features/maplerecord/mr-sections";
import { getMrSolutions } from "@/lib/content/maplerecord";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "MapleRecord Solutions",
  description: "MapleRecord solutions for financial services, insurance, healthcare, education, manufacturing, state and local government, and for every department.",
  path: "/maplerecord/solutions",
});

export default function SolutionsPage() {
  const groups = [
    { id: "industries", heading: "Industries", intro: "Secure, compliant information management for regulated sectors.", items: getMrSolutions("industry") },
    { id: "departments", heading: "Departments", intro: "Records, requests and workflows for the teams that depend on them.", items: getMrSolutions("department") },
  ];
  return (
    <>
      <MrHero
        crumbs={[{ label: "Home", href: "/" }, { label: "MapleRecord", href: "/maplerecord" }, { label: "Solutions" }]}
        eyebrow="Solutions"
        title="MapleRecord solutions by industry and department"
        description="See how MapleRecord's records, requests and workflow modules address the challenges of each sector and each team."
      />
      {groups.map((g, gi) => (
        <Section key={g.id} id={g.id} tone={gi ? "surface" : "paper"} className="scroll-mt-36" aria-labelledby={`${g.id}-title`}>
          <Container>
            <SectionHeading id={`${g.id}-title`} eyebrow={g.heading} title={g.intro} />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((s) => (
                <li key={s.slug}>
                  <Link href={`/maplerecord/solutions/${s.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-ink">
                    <MrFigure image={s.image} alt="" peek className="aspect-[4/3] rounded-none ring-0 sm:aspect-[4/3]" sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 90vw" />
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="text-h3 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{s.label}</h2>
                      <p className="mt-2 text-[0.9375rem] text-muted">{s.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ))}
      <MrCta title="Ready to transform your operations?" body="Tell MapleRecord about your organization and see how the platform fits your records, requests and workflows." />
    </>
  );
}
