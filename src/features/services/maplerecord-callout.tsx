import Image from "next/image";
import { ArrowLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { mrSampleDataNote } from "@/content/maplerecord/overview";
import { mrScreens } from "@/content/maplerecord/screens";

/** The MR Records retention schedule: the screen that matches the retention and access work described on this page. */
const screen = mrScreens.recordsRetention;

/** The callout's closing sentence on /data-management; other pages pass their own `context`. */
const defaultContext = "It puts the retention schedules and access rules described above into daily use.";

/**
 * Sits directly after the capabilities list on /data-management and /software-development. It has no bottom padding
 * because the next section (the delivery approach) is on the same paper background and supplies its own top padding.
 */
export function MapleRecordCallout({
  context = defaultContext,
}: {
  /** The last sentence, which ties MapleRecord to the page it sits on. */
  context?: string;
}) {
  return (
    <section className="bg-paper pt-16 sm:pt-20 lg:pt-24" aria-labelledby="maplerecord-callout-title">
      <Container>
        <div className="reveal grid items-center gap-10 overflow-hidden rounded-3xl border border-line-strong bg-surface p-7 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
          <div>
            <Eyebrow>Our product · MapleRecord</Eyebrow>
            <h2 id="maplerecord-callout-title" className="mt-5 text-h2">
              AI-first hybrid records management.
            </h2>
            <p className="mt-6 max-w-[54ch] text-muted">
              MapleRecord, designed and built by Maverick InnoGarage, manages electronic and physical records in one system,
              with smart retention, full audit trails and role-based access. Its five modules, MR Records, MR Requests, MR
              Workflows, MR Forms and MR Admin, cover records, information requests, workflows, forms and administration on
              one platform. {context}
            </p>
            <ArrowLink href="/maplerecord" className="mt-8">
              Explore MapleRecord
            </ArrowLink>
          </div>
          <div>
            {/*
              A product window cropped to the schedule itself, so the screen reads better at card size: the image is
              widened so the sidebar falls off the left edge, and lifted by the app's top bar (about 5% of the screen's
              height) so no clipped workspace switcher shows at the top-left.
            */}
            <figure className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_28px_56px_-32px_rgb(17_17_17/0.35)]">
              <figcaption className="flex items-center gap-3 border-b border-line bg-paper px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-muted">
                <span aria-hidden className="flex gap-1.5">
                  <span className="size-2 rounded-full bg-line-strong" />
                  <span className="size-2 rounded-full bg-line-strong" />
                  <span className="size-2 rounded-full bg-line-strong" />
                </span>
                <span className="truncate">{screen.label}</span>
              </figcaption>
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={screen.src}
                  width={screen.width}
                  height={screen.height}
                  alt={screen.alt}
                  sizes="(min-width: 1280px) 720px, (min-width: 1024px) 60vw, 130vw"
                  className="absolute right-0 top-0 h-auto w-[122%] max-w-none -translate-y-[5.2%]"
                />
              </div>
            </figure>
            <p className="mt-4 text-sm text-muted">{mrSampleDataNote}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
