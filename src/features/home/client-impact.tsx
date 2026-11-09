import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { clientImpact } from "@/content/client-impact";

/**
 * "Proven enterprise client impact" from the Capability Deck. Renders nothing while
 * `clientImpact.published` is false: the deck attributes these entries to Data Affect client testimonials,
 * and the relationship and permission to name the clients must be confirmed first (see src/content/client-impact.ts).
 */
export function ClientImpactSection() {
  if (!clientImpact.published) return null;
  return (
    <Section tone="surface" aria-labelledby="impact-title">
      <Container>
        <SectionHeading id="impact-title" eyebrow="Client impact" title="Proven enterprise client impact" className="reveal" />
        <ul className="mt-12 grid border-t border-ink sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
          {clientImpact.items.map((item) => (
            <li key={item.client} className="reveal border-b border-line py-8">
              <p className="text-h3 font-semibold">{item.client}</p>
              <p className="mt-3 text-muted">{item.impact}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">Source: {clientImpact.source}.</p>
      </Container>
    </Section>
  );
}
