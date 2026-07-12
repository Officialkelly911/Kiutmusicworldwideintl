/**
 * Lightweight analytics helper for Kiut Music.
 *
 * Fires a custom DOM event (`kiut:analytics`) that any analytics provider
 * can listen to. Swap in GA4 / Posthog / Mixpanel by adding the provider
 * call below — no other files need to change.
 *
 * Usage:
 *   import { track } from "@/lib/analytics";
 *   track("contact_submission", { enquiryType: "booking" });
 */

export type AnalyticsEvent =
  | "newsletter_signup"
  | "booking_request"
  | "contact_submission"
  | "business_inquiry"
  | "press_inquiry"
  | "collaboration_inquiry"
  | "licensing_inquiry"
  | "cta_click"
  | "form_error";

export interface TrackProperties {
  label?: string;
  enquiryType?: string;
  country?: string;
  platform?: string;
  [key: string]: unknown;
}

/**
 * Track a user interaction or conversion event.
 * Safe to call in any environment — never throws.
 */
export function track(
  event: AnalyticsEvent,
  properties?: TrackProperties,
): void {
  try {
    // Dev-mode visibility
    if ((import.meta as Record<string, any>).env?.DEV) {
      console.debug("[analytics]", event, properties ?? "");
    }

    // Custom DOM event — wire your provider to this listener in main.tsx or App.tsx
    window.dispatchEvent(
      new CustomEvent("kiut:analytics", {
        detail: { event, properties: properties ?? {}, timestamp: Date.now() },
      }),
    );

    // ── Add your provider here ─────────────────────────────────────────────
    // GA4:     gtag?.("event", event, properties);
    // Posthog: posthog?.capture(event, properties);
    // Plausible: window.plausible?.(event, { props: properties });
  } catch {
    // Never let analytics break the form
  }
}
