import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, Mail, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/layout";
import { mrContact, mrOfficial } from "@/content/maplerecord/overview";
import { contactHref } from "@/features/contact/links";
import { Breadcrumbs } from "@/features/services/sections";
import type { MrImage } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

/**
 * Product screenshot. MapleRecord's images come in many shapes (square, portrait, landscape)
 * and most are white cards with their own borders, so each one is shown as a rounded card,
 * centered on a tinted panel of fixed proportions. Photos (`photo`) fill the frame instead.
 */
export function MrFigure({
  image,
  className,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  preload,
  photo,
  peek,
  alt = image.alt,
}: {
  image: MrImage;
  className?: string;
  sizes?: string;
  preload?: boolean;
  photo?: boolean;
  /** Show the top of the screenshot at full width, cropped by the panel's bottom edge (for small cards). */
  peek?: boolean;
  /** Pass "" when the figure sits inside a link whose text already names it. */
  alt?: string;
}) {
  if (photo) {
    return (
      <div className={cn("overflow-hidden rounded-3xl", className)}>
        <Image src={image.src} alt={alt} width={image.width} height={image.height} sizes={sizes} preload={preload} className="h-auto w-full" />
      </div>
    );
  }
  return (
    <div className={cn("mr-panel relative aspect-square overflow-hidden rounded-3xl ring-1 ring-inset ring-line/80 sm:aspect-[5/4]", className)}>
      <div className={peek ? "absolute inset-x-[12%] top-[10%]" : "absolute inset-[7%] flex items-center justify-center"}>
        <Image
          src={image.src}
          alt={alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          preload={preload}
          className={cn(
            "rounded-xl shadow-[0_1px_2px_rgb(17_17_17/0.06),0_12px_32px_-12px_rgb(17_17_17/0.18)] ring-1 ring-black/5",
            peek ? "h-auto w-full" : "h-auto max-h-full w-auto max-w-full",
          )}
        />
      </div>
    </div>
  );
}

export function MrHero({
  crumbs,
  eyebrow,
  title,
  description,
  image,
  meta,
  officialUrl,
  photo,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  description: string;
  image?: MrImage;
  meta?: ReactNode;
  officialUrl?: string;
  photo?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper pb-14 pt-8 sm:pb-20 lg:pt-10">
      <Container>
        <Breadcrumbs items={crumbs} />
        <div className={cn("mt-8 grid items-center gap-10 lg:mt-10", image && "lg:grid-cols-12 lg:gap-14")}>
          <div className={image ? "lg:col-span-6" : "max-w-4xl"}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-6 text-h1">{title}</h1>
            <p className="mt-6 max-w-[58ch] text-lead text-muted">{description}</p>
            {meta ? <div className="mt-6">{meta}</div> : null}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ExternalLink href={mrOfficial.demo} variant="primary">
                Request a demo
              </ExternalLink>
              {children}
            </div>
            {officialUrl ? (
              <p className="mt-6 text-sm text-muted">
                Source:{" "}
                <a href={officialUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">
                  {officialUrl.replace("https://", "")}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            ) : null}
          </div>
          {image ? (
            <div className="lg:col-span-6">
              <MrFigure image={image} photo={photo} preload sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export function MrStats({ items, tone = "light" }: { items: { value?: string; label: string; body: string }[]; tone?: "light" | "night" }) {
  const night = tone === "night";
  return (
    <ul
      className={cn(
        "grid gap-px overflow-hidden rounded-2xl border",
        items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
        items.length === 4 && "lg:grid-cols-4",
        items.length === 5 && "lg:grid-cols-5",
        night ? "border-night-line bg-night-line" : "border-line bg-line",
      )}
    >
      {items.map((s, i) => (
        <li key={s.label} className={cn("flex flex-col p-6 sm:p-7", night ? "bg-night-raised" : "bg-surface", items.length % 2 === 1 && items.length > 3 && i === items.length - 1 && "sm:col-span-2 lg:col-span-1")}>
          <p className={cn("text-[2.25rem] font-semibold leading-none tracking-tight", !s.value && "flex items-center")}>
            {s.value === "✓" || !s.value ? <Check aria-hidden className="size-9 text-signal" /> : s.value}
          </p>
          <p className="mt-4 font-semibold tracking-tight">{s.label}</p>
          <p className={cn("mt-1.5 text-[0.9375rem]", night ? "text-night-muted" : "text-muted")}>{s.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function MrStatsSection({ heading, items, eyebrow = "Measurable impact" }: { heading: string; items: { value?: string; label: string; body: string }[]; eyebrow?: string }) {
  return (
    <Section tone="night" aria-labelledby="impact-title">
      <Container>
        <SectionHeading tone="night" id="impact-title" eyebrow={eyebrow} title={heading} />
        <div className="mt-12">
          <MrStats items={items} tone="night" />
        </div>
        <p className="mt-6 text-sm text-night-muted">Figures as published by MapleRecord.</p>
      </Container>
    </Section>
  );
}

export function MrProblemSection({ eyebrow, heading, intro, items }: { eyebrow: string; heading: string; intro?: string; items: { title: string; body: string }[] }) {
  return (
    <Section aria-labelledby="problems-title">
      <Container>
        <SectionHeading id="problems-title" eyebrow={eyebrow} title={heading} intro={intro} />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((p, i) => (
            <li key={p.title} className="rounded-2xl border border-line bg-surface p-7">
              <span className="font-mono text-label text-signal">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-h3">{p.title}</h3>
              <p className="mt-3 text-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function MrSteps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="space-y-px overflow-hidden rounded-2xl border border-line bg-line">
      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-5 bg-surface p-6 sm:p-7">
          <span className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-full font-mono text-sm", i === 0 ? "bg-signal text-white" : "bg-paper ring-1 ring-line-strong")}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-1.5 text-muted">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function MrCardGrid({ items, columns = 3 }: { items: { title: string; body: string; href?: string }[]; columns?: 2 | 3 }) {
  return (
    <ul className={cn("grid gap-x-10 gap-y-10 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
      {items.map((u) => (
        <li key={u.title} className="border-t border-ink pt-6">
          <h3 className="text-h3">
            {u.href ? (
              <Link href={u.href} className="hover:underline hover:decoration-1 hover:underline-offset-4">
                {u.title}
              </Link>
            ) : (
              u.title
            )}
          </h3>
          <p className="mt-3 text-muted">{u.body}</p>
        </li>
      ))}
    </ul>
  );
}

/** Title + description rows; reads cleanly at any item count (no orphaned grid cells). */
export function MrRowList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="border-b border-line">
      {items.map((u) => (
        <li key={u.title} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8">
          <h3 className="text-lg font-semibold tracking-tight">{u.title}</h3>
          <p className="text-muted">{u.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function MrChecklist({ items, tone = "light" }: { items: string[]; tone?: "light" | "night" }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check aria-hidden className={cn("mt-1 size-4 shrink-0", tone === "night" ? "text-night-text" : "text-signal")} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function MrSecuritySection({ heading, intro, items }: { heading: string; intro: string; items: string[] }) {
  return (
    <Section tone="deep" aria-labelledby="security-title">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="security-title" eyebrow="Security & compliance" title={heading} intro={intro} />
        </div>
        <div className="rounded-2xl border border-line bg-surface p-7 sm:p-9 lg:col-span-7">
          <MrChecklist items={items} />
        </div>
      </Container>
    </Section>
  );
}

/** Closing call to action used on every MapleRecord page. */
export function MrCta({ title, body }: { title: string; body: string }) {
  return (
    <section className="on-night bg-night py-20 text-night-text sm:py-24" aria-labelledby="mr-cta-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-7">
          <Eyebrow tone="night">MapleRecord</Eyebrow>
          <h2 id="mr-cta-title" className="mt-6 text-h2">
            {title}
          </h2>
          <p className="mt-5 max-w-[56ch] text-lead text-night-muted">{body}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ExternalLink href={mrOfficial.demo} variant="primary">
              Request a demo
            </ExternalLink>
            <ButtonLink href="/maplerecord/contact" variant="outline-night">
              Contact MapleRecord
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-2xl border border-night-line bg-night-raised p-6 text-[0.9375rem] sm:p-7 lg:col-span-5">
          <p className="mb-3 font-mono text-label uppercase text-night-muted">Contact MapleRecord</p>
          <a href={`mailto:${mrContact.email}`} className="flex min-h-11 items-center gap-3 hover:underline hover:underline-offset-4">
            <Mail aria-hidden className="size-4 text-night-muted" />
            {mrContact.email}
          </a>
          <a href={`tel:${mrContact.phone.e164}`} className="flex min-h-11 items-center gap-3 hover:underline hover:underline-offset-4">
            <Phone aria-hidden className="size-4 text-night-muted" />
            {mrContact.phone.display}
          </a>
          <Link href={contactHref("data-management")} className="mt-2 flex min-h-11 items-center gap-3 border-t border-night-line pt-3 text-night-muted hover:text-night-text hover:underline hover:underline-offset-4">
            <ArrowRight aria-hidden className="size-4" />
            Or talk to Maverick InnoGarage about records management
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function MrOffices() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {mrContact.offices.map((o) => (
        <li key={o.label} className="rounded-2xl border border-line bg-surface p-7">
          <p className="flex items-center gap-2 font-mono text-label uppercase text-muted">
            <MapPin aria-hidden className="size-4" />
            {o.label}
          </p>
          <address className="mt-4 not-italic leading-relaxed">
            {o.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
        </li>
      ))}
    </ul>
  );
}
