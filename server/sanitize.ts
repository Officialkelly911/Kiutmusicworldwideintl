/**
 * sanitize — minimal defense-in-depth text scrubbing for user-submitted
 * free-text fields (contact message/subject, newsletter name fields).
 *
 * Zod schemas already enforce type/length/format; this adds a second layer
 * that strips HTML tags and control characters so stored/emailed values can
 * never carry markup, scripts, or terminal-escape payloads — even if a future
 * caller bypasses validation or an admin view renders the raw value.
 *
 * Not a substitute for output encoding: templates that render this content
 * as HTML must still escape it (React does this by default; email templates
 * must too).
 */

/** Strip HTML tags, null bytes, and control characters from a plain-text field. */
export function sanitizeText(value: string | undefined | null): string {
  if (!value) return "";
  return value
    .replace(/<[^>]*>/g, "")           // strip HTML/XML tags (incl. <script>...)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "") // control chars, keep \t\n\r
    .trim();
}

/** Sanitize every string value of an object's own keys, leaving other types untouched. */
export function sanitizeFields<T extends Record<string, unknown>>(obj: T, keys: (keyof T)[]): T {
  const result = { ...obj };
  for (const key of keys) {
    const val = result[key];
    if (typeof val === "string") {
      (result as Record<string, unknown>)[key as string] = sanitizeText(val);
    }
  }
  return result;
}
