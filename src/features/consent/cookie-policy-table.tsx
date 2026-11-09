import { consentCategories } from "./config";

/** Every cookie listed in config.ts, flattened with its category label. */
export function getPolicyCookies() {
  return consentCategories.flatMap((category) =>
    category.cookies.map((cookie) => ({ ...cookie, category: category.label, displayName: cookie.prefix ? `${cookie.name}*` : cookie.name })),
  );
}

const headers = ["Cookie", "Category", "Provider", "Purpose", "Duration"] as const;

/**
 * The cookie list on /cookies, generated from config.ts so it can't drift from what the site sets.
 * A real table from md up; stacked cards on phones, where five columns don't fit.
 * Meant to sit inside `.prose-mig`, so the list overrides its bullet styles.
 */
export function CookiePolicyTable() {
  const cookies = getPolicyCookies();
  return (
    <div>
      <table className="hidden w-full border-collapse text-left text-sm md:table">
        <caption className="sr-only">Cookies this website can set</caption>
        <thead>
          <tr className="border-b border-line-strong">
            {headers.map((h) => (
              <th key={h} scope="col" className="py-3 pr-4 align-bottom font-mono text-label font-normal uppercase text-muted last:pr-0">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="leading-6">
          {cookies.map((c) => (
            <tr key={c.name} className="border-b border-line">
              <th scope="row" className="py-4 pr-4 align-top font-mono text-[0.8125rem] font-normal leading-6 text-ink">
                {c.displayName}
              </th>
              <td className="py-4 pr-4 align-top">{c.category}</td>
              <td className="whitespace-nowrap py-4 pr-4 align-top">{c.provider}</td>
              <td className="text-pretty py-4 pr-4 align-top">{c.purpose}</td>
              <td className="whitespace-nowrap py-4 align-top">{c.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="space-y-3 pl-0 md:hidden" aria-label="Cookies this website can set">
        {cookies.map((c) => (
          <li key={c.name} className="rounded-xl border border-line bg-surface p-5 pl-5 before:hidden">
            <p className="break-words font-mono text-[0.875rem] text-ink">{c.displayName}</p>
            <dl className="mt-4 grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-2.5 text-sm">
              <dt className="font-mono text-label uppercase leading-5 text-muted">Category</dt>
              <dd>{c.category}</dd>
              <dt className="font-mono text-label uppercase leading-5 text-muted">Provider</dt>
              <dd>{c.provider}</dd>
              <dt className="font-mono text-label uppercase leading-5 text-muted">Purpose</dt>
              <dd className="leading-relaxed">{c.purpose}</dd>
              <dt className="font-mono text-label uppercase leading-5 text-muted">Duration</dt>
              <dd>{c.duration}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
