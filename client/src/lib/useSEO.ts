/**
 * useSEO — per-page meta tag management for Kiut Music.
 *
 * Sets title, description, canonical URL, Open Graph tags, Twitter card tags,
 * and an optional JSON-LD script on mount. Restores the global defaults on
 * unmount so navigating away never leaves stale meta on the next page.
 *
 * Usage:
 *   useSEO({
 *     title: "Music | Kiut Music Worldwide",
 *     description: "Stream all albums and singles from Nigerian-American artist Kiut.",
 *     canonical: "https://kiutmusic.com/music",
 *     ogImage: "https://kiutmusic.com/og-image.png",
 *     jsonLd: { "@context": "https://schema.org", "@type": "MusicAlbum", ... },
 *   });
 */

import { useEffect } from "react";
import { ROUTE_SEO, SEO_ROBOTS } from "@shared/seo";
import { buildStructuredData } from "@shared/structured-data";

export interface SEOMeta {
  /** Full page title, e.g. "Music | Kiut Music Worldwide" */
  title: string;
  /** Meta description (max 160 chars recommended) */
  description: string;
  /** Absolute canonical URL for this page */
  canonical: string;
  /** Search indexing directive. Defaults to the public-route policy. */
  robots?: string;
  /**
   * Absolute URL for the Open Graph / Twitter preview image.
   * Defaults to the global og-image when omitted.
   */
  ogImage?: string;
  /**
   * og:type value. Defaults to "website".
   * Use "music.album" / "music.song" on music pages.
   */
  ogType?: string;
  /**
   * Optional JSON-LD structured data object.
   * Written as a <script type="application/ld+json"> tag in <head>.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonLd?: Record<string, any>;
}

const GLOBAL_DEFAULTS = ROUTE_SEO["/"];

function setMeta(name: string, content: string, attr = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const LD_SCRIPT_ID = "kiut-structured-data";
let activeSEOInstance: symbol | undefined;

function setJsonLd(data: Record<string, unknown>) {
  let script = document.getElementById(LD_SCRIPT_ID) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = LD_SCRIPT_ID;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

function removeJsonLd() {
  document.getElementById(LD_SCRIPT_ID)?.remove();
}

export function useSEO(meta: SEOMeta) {
  useEffect(() => {
    // Page exit animations can keep an outgoing route mounted after the next
    // route has applied its own document state. Only the active route may
    // restore or remove SEO nodes during cleanup.
    const seoInstance = Symbol("seo-instance");
    activeSEOInstance = seoInstance;

    const {
      title,
      description,
      canonical,
      robots = SEO_ROBOTS,
      ogImage = GLOBAL_DEFAULTS.ogImage,
      ogType = "website",
      jsonLd,
    } = meta;

    // ── Snapshot originals so we can restore on unmount ──────────────────────
    const origTitle       = document.title;
    const origCanonical   = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? GLOBAL_DEFAULTS.canonical;
    const snap = (n: string, a = "name") =>
      document.querySelector<HTMLMetaElement>(`meta[${a}="${n}"]`)?.content ?? "";
    const origDesc         = snap("description");
    const origRobots       = snap("robots");
    const origOgTitle      = snap("og:title", "property");
    const origOgDesc       = snap("og:description", "property");
    const origOgUrl        = snap("og:url", "property");
    const origOgType       = snap("og:type", "property");
    const origOgImage      = snap("og:image", "property");
    const origTwTitle      = snap("twitter:title");
    const origTwDesc       = snap("twitter:description");
    const origTwImage      = snap("twitter:image");

    // ── Apply page-specific meta ──────────────────────────────────────────────
    document.title = title;
    setLink("canonical", canonical);

    setMeta("description", description);
    setMeta("robots", robots);

    setMeta("og:title",       title,       "property");
    setMeta("og:description", description, "property");
    setMeta("og:url",         canonical,   "property");
    setMeta("og:type",        ogType,      "property");
    setMeta("og:image",       ogImage,     "property");

    setMeta("twitter:title",       title);
    setMeta("twitter:description", description);
    setMeta("twitter:image",       ogImage);
    setMeta("twitter:card",        "summary_large_image");

    // The initial HTML includes this same graph. Callers provide richer route
    // data when it exists; every other page keeps the stable artist, WebSite,
    // and WebPage entity relationships during client-side navigation.
    setJsonLd(jsonLd ?? buildStructuredData({
      title,
      description,
      canonical,
      ogImage,
      ogType: ogType as "website",
      robots,
    }));

    // ── Restore originals on unmount ─────────────────────────────────────────
    return () => {
      if (activeSEOInstance !== seoInstance) return;

      document.title = origTitle;
      setLink("canonical", origCanonical);

      setMeta("description", origDesc);
      setMeta("robots", origRobots);

      setMeta("og:title",       origOgTitle, "property");
      setMeta("og:description", origOgDesc,  "property");
      setMeta("og:url",         origOgUrl,   "property");
      setMeta("og:type",        origOgType,  "property");
      setMeta("og:image",       origOgImage, "property");

      setMeta("twitter:title",       origTwTitle);
      setMeta("twitter:description", origTwDesc);
      setMeta("twitter:image",       origTwImage);

      removeJsonLd();
      activeSEOInstance = undefined;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
