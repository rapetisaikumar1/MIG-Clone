export function formatDate(iso?: string) {
  if (!iso) return "Unpublished draft";
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(iso));
}
