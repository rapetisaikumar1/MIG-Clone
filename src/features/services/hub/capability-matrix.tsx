import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MatrixCapability, MatrixPillar, MatrixProduct } from "./matrix";

const arrow =
  "shrink-0 text-muted transition-colors duration-200 group-hover:text-signal motion-safe:transition-[color,transform] motion-safe:group-hover:translate-x-0.5";

function CapabilityTag({ capability }: { capability: MatrixCapability }) {
  const base = "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 py-1 text-sm leading-snug sm:min-h-10 sm:px-3.5 sm:py-1.5 sm:text-[0.9375rem]";
  if (!capability.href) {
    return <span className={`${base} border-line bg-surface text-ink-soft`}>{capability.label}</span>;
  }
  return (
    <Link
      href={capability.href}
      className={`group ${base} border-line-strong bg-surface text-ink transition-colors hover:border-ink`}
    >
      {capability.label}
      <ArrowRight aria-hidden className={`size-3.5 ${arrow}`} />
    </Link>
  );
}

function ProductCard({ product }: { product: MatrixProduct }) {
  return (
    <Link
      href={product.href}
      className="card-lift group flex h-full flex-col rounded-2xl border border-line-strong bg-surface p-5 transition-colors hover:border-ink sm:p-6"
    >
      <span className="flex items-center justify-between gap-4">
        <span className="text-h3 font-semibold decoration-1 underline-offset-4 group-hover:underline">{product.label}</span>
        <ArrowRight aria-hidden className={`size-5 ${arrow}`} />
      </span>
      <span className="mt-2 block font-mono text-label uppercase text-muted sm:min-h-[2lh]">{product.kind}</span>
      <span className="mt-4 block text-[0.9375rem] text-ink-soft">{product.summary}</span>
    </Link>
  );
}

function PillarRow({ pillar }: { pillar: MatrixPillar }) {
  const titleId = `${pillar.id}-title`;
  const count = pillar.products ? `${pillar.products.length} products` : `${pillar.capabilities.length} capabilities`;
  return (
    <li
      id={pillar.id}
      aria-labelledby={titleId}
      className="reveal grid gap-6 border-b border-line py-9 sm:py-11 lg:grid-cols-12 lg:gap-10 lg:py-12"
    >
      <div className="flex gap-4 sm:gap-6 lg:col-span-5">
        <span aria-hidden className="w-9 shrink-0 pt-[0.55rem] font-mono text-sm text-signal sm:w-10">
          {pillar.number}
        </span>
        <div className="min-w-0">
          <h3 id={titleId} className="text-[clamp(1.5rem,1.3rem+0.8vw,2.125rem)] leading-[1.12] tracking-[-0.028em] text-balance">
            {pillar.products ? (
              pillar.label
            ) : (
              <Link href={pillar.href} className="group decoration-2 underline-offset-[6px] hover:underline">
                {pillar.label}
                <ArrowRight aria-hidden className={`ml-2 inline-block size-[0.8em] align-[-0.06em] ${arrow}`} />
              </Link>
            )}
          </h3>
          <p className="mt-3 font-mono text-label uppercase text-muted">
            <span className="sr-only">Pillar {pillar.number}, </span>
            {count}
          </p>
        </div>
      </div>
      <div className="sm:pl-16 lg:col-span-7 lg:pl-0 lg:pt-1">
        {pillar.products ? (
          <ul aria-label={`${pillar.label} products`} className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {pillar.products.map((p) => (
              <li key={p.href}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        ) : (
          <ul aria-label={`${pillar.label} capabilities`} className="flex flex-wrap gap-1.5 sm:gap-2">
            {pillar.capabilities.map((c) => (
              <li key={c.label}>
                <CapabilityTag capability={c} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

/** The deck's "End-to-end capability matrix": one row per pillar, its capabilities and where to go next. */
export function CapabilityMatrix({ pillars }: { pillars: MatrixPillar[] }) {
  return (
    <ol className="mt-12 border-t border-ink lg:mt-16">
      {pillars.map((p) => (
        <PillarRow key={p.id} pillar={p} />
      ))}
    </ol>
  );
}
