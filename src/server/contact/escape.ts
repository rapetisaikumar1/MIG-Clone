const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => entities[c] ?? c);
}

/** Header-safe single line: strips CR/LF so user input can't inject email headers. */
export function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}
