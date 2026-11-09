import { ArrowLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { keepHyphenatedWords } from "@/features/adobe/keep-hyphenated";

/**
 * The Capability Deck presents Experience Design and Digital & Product on one slide ("Human-centric design. Products
 * that ship."), and the content and CX work lands in Adobe Experience Cloud. This band says how the three connect.
 * Like the MapleRecord callout it has no bottom padding: the delivery approach that follows is on the same paper
 * background and supplies its own top padding. Two equal columns, as in the MapleRecord callout.
 */
export function ConnectedPractices() {
  const links = [
    {
      href: "/digital-product",
      label: "Digital & Product",
      body: "Product vision and strategy, product development, go-to-market and agile transformation.",
    },
    {
      href: "/adobe-services",
      // A no-break space keeps "&" with "MarTech" when the name wraps, as in the footer.
      label: "Adobe Experience Cloud &\u00a0MarTech",
      body: "The journeys and content we design, implemented and optimized in Adobe Experience Manager, Target and Analytics.",
    },
  ];
  return (
    <section className="bg-paper pt-16 sm:pt-20 lg:pt-24" aria-labelledby="connected-practices-title">
      <Container>
        <div className="reveal grid items-center gap-10 rounded-3xl border border-line-strong bg-surface p-7 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
          <div>
            <Eyebrow>From design to delivery</Eyebrow>
            <h2 id="connected-practices-title" className="mt-5 text-h2">
              Research and design that carry through to launch.
            </h2>
            <p className="mt-6 max-w-[54ch] text-muted">
              Experience design works alongside our Digital &amp; Product and Adobe practices, so what we learn from users
              and what we design reaches the product your customers use.
            </p>
          </div>
          <ul className="grid gap-4">
            {links.map((l) => (
              <li key={l.href} className="rounded-2xl border border-line bg-paper p-5 sm:p-6">
                <ArrowLink href={l.href} className="text-h3">
                  {l.label}
                </ArrowLink>
                <p className="mt-1 max-w-[56ch] text-[0.9375rem] text-muted">{keepHyphenatedWords(l.body)}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
