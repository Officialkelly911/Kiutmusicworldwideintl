/**
 * Kiut Music — Centralized Analytics Module
 *
 * Architecture:
 *   1. Every event fires the `kiut:analytics` custom DOM event.
 *   2. Provider adapters (GTM, Meta Pixel, TikTok Pixel, GA4) listen to that
 *      event and forward it to their own APIs.
 *   3. Providers are initialized once via `initAnalytics()` in main.tsx.
 *   4. Tracking IDs are NEVER hardcoded — they are read from the window
 *      config object populated by the environment at build time.
 *
 * Adding a new provider:
 *   - Add its initialization inside `initAnalytics()`.
 *   - Add a listener inside `wireProviders()`.
 *   - No other files need to change.
 *
 * Usage:
 *   import { track } from "@/lib/analytics";
 *   track("music_play", { title: "Makosa", album: "Good Life EP" });
 */

// ── Event catalog ─────────────────────────────────────────────────────────────

export type AnalyticsEvent =
  // Navigation
  | "page_view"
  // Music
  | "music_play"
  | "streaming_click"
  // Video
  | "video_play"
  // Commerce
  | "store_click"
  // Live
  | "tour_booking"
  // Forms
  | "newsletter_signup"
  | "contact_submission"
  | "booking_request"
  | "business_inquiry"
  | "press_inquiry"
  | "collaboration_inquiry"
  | "licensing_inquiry"
  | "form_error"
  // General
  | "cta_click";

export interface TrackProperties {
  // Navigation
  path?: string;
  // Music / Video
  title?: string;
  album?: string;
  platform?: string;
  videoId?: string;
  videoType?: string;
  // Form
  enquiryType?: string;
  country?: string;
  // CTA
  label?: string;
  destination?: string;
  // Catchall
  [key: string]: unknown;
}

// ── Core dispatch ─────────────────────────────────────────────────────────────

/**
 * Track a user interaction or conversion event.
 * Safe to call anywhere — never throws, never blocks rendering.
 */
export function track(
  event: AnalyticsEvent,
  properties?: TrackProperties,
): void {
  try {
    if ((import.meta as Record<string, any>).env?.DEV) {
      console.debug("[analytics]", event, properties ?? "");
    }

    const payload = { event, properties: properties ?? {}, timestamp: Date.now() };

    // Broadcast to all registered provider adapters
    window.dispatchEvent(new CustomEvent("kiut:analytics", { detail: payload }));
  } catch {
    // Never let analytics break the UI
  }
}

// ── Provider initialization ───────────────────────────────────────────────────

declare global {
  interface Window {
    /** Runtime analytics configuration injected by the environment */
    __KIUT_ANALYTICS__?: {
      gtmId?: string;          // e.g. "GTM-XXXXXXX"
      metaPixelId?: string;    // e.g. "1234567890"
      tiktokPixelId?: string;  // e.g. "CXXXXXXXXXXXXXXXXXX"
      ga4Id?: string;          // e.g. "G-XXXXXXXXXX"
    };
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, data?: unknown) => void; load: (id: string) => void; page: () => void };
    gtag?: (...args: unknown[]) => void;
  }
}

/** Map our internal event names to platform-specific equivalents */
const META_EVENT_MAP: Partial<Record<AnalyticsEvent, string>> = {
  page_view:          "PageView",
  newsletter_signup:  "Subscribe",
  contact_submission: "Contact",
  booking_request:    "Lead",
  store_click:        "InitiateCheckout",
  music_play:         "ViewContent",
  video_play:         "ViewContent",
  streaming_click:    "ViewContent",
  cta_click:          "Lead",
};

const TIKTOK_EVENT_MAP: Partial<Record<AnalyticsEvent, string>> = {
  page_view:          "ViewContent",
  newsletter_signup:  "Subscribe",
  contact_submission: "Contact",
  booking_request:    "SubmitForm",
  store_click:        "AddToCart",
  music_play:         "ViewContent",
  video_play:         "ViewContent",
};

/**
 * Wire all provider listeners to the `kiut:analytics` DOM event.
 * Called once from `initAnalytics()`.
 */
function wireProviders(cfg: NonNullable<Window["__KIUT_ANALYTICS__"]>) {
  window.addEventListener("kiut:analytics", (e: Event) => {
    const { event, properties } = (e as CustomEvent<{ event: AnalyticsEvent; properties: TrackProperties }>).detail;

    // ── Google Tag Manager (dataLayer push) ───────────────────────────────
    if (cfg.gtmId && window.dataLayer) {
      window.dataLayer.push({ event, ...properties });
    }

    // ── Google Analytics 4 ────────────────────────────────────────────────
    if (cfg.ga4Id && typeof window.gtag === "function") {
      if (event === "page_view") {
        window.gtag("config", cfg.ga4Id, { page_path: properties.path });
      } else {
        window.gtag("event", event, properties);
      }
    }

    // ── Meta (Facebook) Pixel ─────────────────────────────────────────────
    if (cfg.metaPixelId && typeof window.fbq === "function") {
      const metaEvent = META_EVENT_MAP[event];
      if (metaEvent) {
        window.fbq("track", metaEvent, properties);
      } else {
        window.fbq("trackCustom", event, properties);
      }
    }

    // ── TikTok Pixel ──────────────────────────────────────────────────────
    if (cfg.tiktokPixelId && window.ttq) {
      const ttEvent = TIKTOK_EVENT_MAP[event] ?? "ViewContent";
      window.ttq.track(ttEvent, { content_name: properties.title ?? event, ...properties });
    }
  });
}

function classifyClick(anchor: HTMLAnchorElement, label: string): AnalyticsEvent | null {
  const href = anchor.href.toLowerCase();
  if (/dreamplanet\.org\/store|shop|merch/.test(href)) return "store_click";
  if (/spotify|music\.apple|audiomack|boomplay|soundcloud|deezer|music\.youtube|youtube\.com|bit\.ly\/m\//.test(href)) {
    return "streaming_click";
  }
  if (/ticket|eventbrite|bandsintown|songkick|book/i.test(`${href} ${label}`)) return "tour_booking";
  return null;
}

/**
 * Track outbound links and high-intent buttons through event delegation. This
 * keeps analytics coverage complete without adding handlers that could change
 * the approved component markup or interaction behavior.
 */
function wireInteractionTracking() {
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const element = target?.closest("a,button") as HTMLAnchorElement | HTMLButtonElement | null;
    if (!element || element.dataset.analyticsIgnore === "true") return;

    const label = (element.textContent ?? element.getAttribute("aria-label") ?? "").trim().slice(0, 120);
    if (element instanceof HTMLAnchorElement) {
      const classified = classifyClick(element, label);
      if (classified) {
        track(classified, {
          label,
          destination: element.href,
          platform: classified === "streaming_click" ? new URL(element.href).hostname : undefined,
        });
        return;
      }
    }

    if (/\b(book|reserve|ticket|concert|tour)\b/i.test(label)) {
      track("tour_booking", { label, destination: element instanceof HTMLAnchorElement ? element.href : undefined });
    } else if (label) {
      track("cta_click", { label, destination: element instanceof HTMLAnchorElement ? element.href : undefined });
    }
  });
}

/**
 * Inject provider scripts and wire event listeners.
 *
 * Call once at app startup (main.tsx or App.tsx), AFTER the DOM is ready.
 * IDs are read from `window.__KIUT_ANALYTICS__` — set this object in your
 * deployment environment's index.html or via a server-rendered config endpoint.
 *
 * Example — in index.html before the app script:
 *   <script>
 *     window.__KIUT_ANALYTICS__ = {
 *       gtmId: "GTM-XXXXXXX",
 *       metaPixelId: "1234567890",
 *       tiktokPixelId: "CXXXXXXXXXXXXXXXXXX",
 *       ga4Id: "G-XXXXXXXXXX",
 *     };
 *   </script>
 *
 * When IDs are absent the corresponding provider is simply not initialized.
 */
export function initAnalytics(): void {
  try {
    const cfg = window.__KIUT_ANALYTICS__ ?? {};

    // ── Google Tag Manager ────────────────────────────────────────────────
    if (cfg.gtmId) {
      window.dataLayer = window.dataLayer ?? [];
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtm.js?id=${cfg.gtmId}`;
      document.head.appendChild(s);
    }

    // ── Google Analytics 4 (direct) ───────────────────────────────────────
    if (cfg.ga4Id && !cfg.gtmId) {
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${cfg.ga4Id}`;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer ?? [];
      window.gtag = function (...args: unknown[]) { window.dataLayer!.push(args); };
      window.gtag("js", new Date());
      window.gtag("config", cfg.ga4Id);
    }

    // ── Meta Pixel ────────────────────────────────────────────────────────
    if (cfg.metaPixelId) {
      /* eslint-disable */
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function() { n.callMethod ? n.callMethod(...arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n;
        n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
        t = b.createElement(e); t.async = true;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      /* eslint-enable */
      window.fbq!("init", cfg.metaPixelId);
      window.fbq!("track", "PageView");
    }

    // ── TikTok Pixel ─────────────────────────────────────────────────────
    if (cfg.tiktokPixelId) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://analytics.tiktok.com/i18n/pixel/events.js";
      document.head.appendChild(s);
      s.onload = () => {
        if (window.ttq) {
          window.ttq.load(cfg.tiktokPixelId!);
          window.ttq.page();
        }
      };
    }

    // Wire all provider listeners once IDs are known
    wireProviders(cfg);
    wireInteractionTracking();

  } catch {
    // Initialization errors must never break the app
  }
}
