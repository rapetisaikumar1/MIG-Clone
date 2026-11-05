const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => entities[c] ?? c);
}

/**
 * Header-safe single line: turns CR/LF and tabs into spaces so user input can't inject email headers, removes other
 * control characters, and drops bidirectional override/isolate marks that could disguise a subject line.
 */
export function singleLine(value: string) {
  return value
    .replace(/[\r\n\t]+/g, " ")
    .replace(/[\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]/g, "")
    .trim();
}
