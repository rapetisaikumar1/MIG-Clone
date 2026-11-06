export function formatDate(iso?: string) {
  if (!iso) return "Unpublished draft";
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(iso));
}

/** "Dec 6, 2024": the compact form used in card meta rows. */
export function formatShortDate(iso?: string) {
  if (!iso) return "Draft";
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(iso));
}

/** "Why data governance matters" -> "why-data-governance-matters". Shared by the article H2 ids and the article contents list. */
export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
