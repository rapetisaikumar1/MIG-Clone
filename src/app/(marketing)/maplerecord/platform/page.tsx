import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { mrHero, mrPlatformIntro } from "@/content/maplerecord/overview";
import { MrCta, MrHero } from "@/features/maplerecord/mr-sections";
import { MrDarkChips, MrModuleGrid, mrModuleIcons, MrPlatformFlow } from "@/features/maplerecord/platform-sections";
import { getMrModules } from "@/lib/content/maplerecord";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "MapleRecord Platform",
  description: "One unified platform with four integrated modules: MR Records, MR Requests, MR Workflows and MR Forms.",
  path: "/maplerecord/platform",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "MapleRecord", href: "/maplerecord" }, { label: "Platform" }];

export default function PlatformPage() {
  const modules = getMrModules();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, "/maplerecord/platform")} />
      <MrHero
        crumbs={crumbs}
        eyebrow="Platform"
        title={mrPlatformIntro.title}
        description={mrPlatformIntro.body}
        image={mrHero.image}
        imageLabel="Records dashboard"
        meta={
          <MrDarkChips
            label="Modules"
            items={modules.map((m) => ({ label: m.name, href: `/maplerecord/platform/${m.slug}`, icon: mrModuleIcons[m.slug] }))}
          />
        }
      >
        <ButtonLink href="#modules" variant="outline-night">
          Compare the modules
        </ButtonLink>
      </MrHero>
      <MrModuleGrid modules={modules} />
      <MrPlatformFlow />
      <MrCta
        title="See the platform in action"
        body="Schedule a personalized demo with the MapleRecord team to see how the four modules fit your records management."
      />
    </>
  );
}
