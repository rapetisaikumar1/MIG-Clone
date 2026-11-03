import Link from "next/link";
import { ArrowLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/layout";
import { mrPlatformIntro } from "@/content/maplerecord/overview";
import { MrChecklist, MrCta, MrFigure, MrHero } from "@/features/maplerecord/mr-sections";
import { getMrModules } from "@/lib/content/maplerecord";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "MapleRecord Platform",
  description: "One unified platform with four integrated modules: MR Records, MR Requests, MR Workflows and MR Forms.",
  path: "/maplerecord/platform",
});

export default function PlatformPage() {
  const modules = getMrModules();
  return (
    <>
      <MrHero
        crumbs={[{ label: "Home", href: "/" }, { label: "MapleRecord", href: "/maplerecord" }, { label: "Platform" }]}
        eyebrow="Platform"
        title={mrPlatformIntro.title}
        description={mrPlatformIntro.body}
      />
      <Section aria-label="Modules">
        <Container>
          <ul className="grid gap-8 md:grid-cols-2">
            {modules.map((m) => (
              <li key={m.slug} className="flex flex-col overflow-hidden rounded-3xl border border-line bg-surface">
                <MrFigure image={m.tabImage} className="aspect-[4/3] rounded-none ring-0 sm:aspect-[4/3]" sizes="(min-width: 768px) 36vw, 90vw" />
                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <h2 className="text-h2">
                    <Link href={`/maplerecord/platform/${m.slug}`} className="hover:underline hover:decoration-2 hover:underline-offset-8">
                      {m.name}
                    </Link>
                  </h2>
                  <p className="mt-3 text-muted">{m.summary}</p>
                  <div className="mt-5">
                    <MrChecklist items={m.highlights} />
                  </div>
                  <ArrowLink href={`/maplerecord/platform/${m.slug}`} className="mt-auto pt-8">
                    Explore {m.name}
                  </ArrowLink>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <MrCta title="See the platform in action" body="Schedule a personalized demo with the MapleRecord team and discover how MapleRecord can transform your records management." />
    </>
  );
}
