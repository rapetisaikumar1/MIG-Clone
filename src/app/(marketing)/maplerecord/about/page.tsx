import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { mrAbout } from "@/content/maplerecord/overview";
import { MrCta, MrHero, MrStats } from "@/features/maplerecord/mr-sections";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About MapleRecord",
  description: mrAbout.tagline,
  path: "/maplerecord/about",
});

const valueIcons = { shield: ShieldCheck, award: Award, trend: TrendingUp, zap: Zap };

export default function MrAboutPage() {
  return (
    <>
      <MrHero
        crumbs={[{ label: "Home", href: "/" }, { label: "MapleRecord", href: "/maplerecord" }, { label: "About" }]}
        eyebrow="Company"
        title={mrAbout.title}
        description={mrAbout.tagline}
        image={mrAbout.images.hero}
        photo
        officialUrl="https://maplerecord.com/about-us/"
      />

      <Section aria-labelledby="mission-title">
        <Container>
          <h2 id="mission-title" className="sr-only">
            Mission and vision
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              ["Our mission", mrAbout.mission],
              ["Our vision", mrAbout.vision],
            ].map(([title, body]) => (
              <div key={title} className="rounded-3xl border border-line bg-surface p-8 sm:p-10">
                <h3 className="font-mono text-label uppercase text-muted">{title}</h3>
                <p className="mt-5 text-h3 font-medium">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="story-title">
        <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHeading id="story-title" eyebrow="Our story" title="Rethinking how organizations manage information" />
            <div className="mt-8 space-y-5 text-ink-soft">
              {mrAbout.story.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-3xl lg:sticky lg:top-40">
              <Image src={mrAbout.images.story.src} alt={mrAbout.images.story.alt} width={mrAbout.images.story.width} height={mrAbout.images.story.height} sizes="(min-width: 1024px) 45vw, 100vw" className="h-auto w-full" />
            </div>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="values-title">
        <Container>
          <SectionHeading id="values-title" eyebrow="Our values" title="What drives us" intro={mrAbout.valuesIntro} />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mrAbout.values.map((v) => {
              const Icon = valueIcons[v.icon as keyof typeof valueIcons];
              return (
                <li key={v.body} className="rounded-2xl border border-line bg-surface p-7">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-paper-deep">
                    <Icon aria-hidden className="size-5 text-ink" />
                  </span>
                  <p className="mt-5 text-ink-soft">{v.body}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section tone="night" aria-labelledby="numbers-title">
        <Container>
          <SectionHeading tone="night" id="numbers-title" eyebrow="MapleRecord by the numbers" title="Trusted by organizations to manage their critical documents and records" />
          <div className="mt-12">
            <MrStats items={mrAbout.numbers} tone="night" />
          </div>
          <p className="mt-6 text-sm text-night-muted">Figures as published by MapleRecord.</p>
        </Container>
      </Section>

      <Section aria-labelledby="industries-title">
        <Container>
          <SectionHeading id="industries-title" eyebrow="Industries we serve" title="Tailored solutions across diverse sectors" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mrAbout.industries.map((i) => (
              <li key={i.name}>
                <Link href={`/maplerecord/solutions/${i.solution}`} className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-ink">
                  <span>
                    <span className="block text-lg font-semibold tracking-tight">{i.name}</span>
                    <span className="mt-1 block text-[0.9375rem] text-muted">{i.body}</span>
                  </span>
                  <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-muted group-hover:text-signal" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <MrCta title="Join organizations transforming their records management" body="Discover how MapleRecord can help your organization streamline workflows, ensure compliance, and unlock the value in your documents." />
    </>
  );
}
