/**
 * Newsletter form validation utilities.
 *
 * Pure functions — no side effects, no provider logic.
 * Designed for reuse across form components and server-side validation.
 */

// RFC-5322 simplified — catches obvious invalid formats
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type NewsletterFieldErrors = {
  firstName?: string;
  email?: string;
  consent?: string;
};

/** Validate the first name field. Returns an error string or null. */
export function validateFirstName(value: string): string | null {
  const v = value.trim();
  if (!v) return "First name is required.";
  if (v.length < 2) return "First name must be at least 2 characters.";
  if (v.length > 80) return "First name is too long (80 characters max).";
  return null;
}

/** Validate an email address. Returns an error string or null. */
export function validateEmail(value: string): string | null {
  const v = value.trim().toLowerCase();
  if (!v) return "Email address is required.";
  if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
  if (v.length > 254) return "Email address is too long.";
  return null;
}

/** Validate the full newsletter form. Returns an errors object (empty = valid). */
export function validateNewsletterForm(data: {
  firstName: string;
  email: string;
  consent: boolean;
}): NewsletterFieldErrors {
  const errors: NewsletterFieldErrors = {};
  const fnErr = validateFirstName(data.firstName);
  if (fnErr) errors.firstName = fnErr;
  const emailErr = validateEmail(data.email);
  if (emailErr) errors.email = emailErr;
  if (!data.consent)
    errors.consent = "Please accept the privacy policy before subscribing.";
  return errors;
}

/** Returns true if an error map has at least one entry. */
export function hasErrors(errors: NewsletterFieldErrors): boolean {
  return Object.values(errors).some((v) => v !== undefined);
}

/** Lowercase + trim an email for storage or comparison. */
export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

// ── Session-level deduplication (browser-only) ────────────────────────────────
const SESSION_KEY = "kiut_nl_submitted";

function getSessionEmails(): string[] {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/** True if this email was already submitted during the current browser session. */
export function isSessionDuplicate(email: string): boolean {
  return getSessionEmails().includes(normalizeEmail(email));
}

/** Persist an email as submitted for the current browser session. */
export function markSessionSubmitted(email: string): void {
  try {
    const emails = getSessionEmails();
    const norm = normalizeEmail(email);
    if (!emails.includes(norm)) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify([...emails, norm]));
    }
  } catch {
    /* sessionStorage unavailable — silently skip */
  }
}
