/**
 * Serializes structured data for a <script type="application/ld+json">
 * tag. Escapes "<" so a literal "</script>" inside any string value can't
 * break out of the script tag — defensive hardening even though every
 * current caller only ever serializes static, internally-authored data
 * (no user input reaches JSON-LD anywhere in this codebase).
 */
export function toJsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
