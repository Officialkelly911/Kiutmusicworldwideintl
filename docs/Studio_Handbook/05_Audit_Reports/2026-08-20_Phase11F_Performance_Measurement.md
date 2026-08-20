# Phase 11F — Technical SEO, Performance & Measurement Audit

**Date:** 2026-08-20  
**Status:** Complete — no publishing performed  
**Scope:** Technical SEO, performance measurement, media delivery, GA4 validation, and regression coverage. Phase 12 content/SEO expansion was not included.

---

## Executive summary

The public site is technically crawlable, route metadata is available in the initial server response, and GA4 is initialized once with SPA route-level page views. Two no-visible-change media optimizations were added:

1. The decorative homepage hero video no longer loads on mobile, reduced-motion, or data-saving contexts; the approved poster remains in place.
2. The Music hero now uses responsive AVIF/WebP variants of the existing approved artwork instead of always transferring the 2.35 MB PNG.

No routes, visible content, visual design, player behavior, or analytics event taxonomy were changed. Production deployment and DNS configuration were not modified.

---

## Production discovery baseline

### Crawlability and route health

- `https://kiutmusic.com` was live and publicly accessible during the audit.
- All eight public routes returned HTTP 200; an invalid browser route returned HTTP 404 with the branded not-found experience.
- `/robots.txt` and `/sitemap.xml` both returned HTTP 200 with appropriate text/XML content types.
- The site serves route-specific title, description, canonical, Open Graph, Twitter, robots, and JSON-LD information in raw HTML before client JavaScript runs.
- `robots.txt` allows crawling and declares the canonical `https://kiutmusic.com/sitemap.xml`.
- The sitemap contains the canonical public URLs only.

### Existing delivery protections confirmed

- Route-level lazy loading and vendor chunking are active.
- Production text responses use compression.
- Stable-name image and media assets use a safe seven-day cache period with stale-while-revalidate rather than an unsafe long immutable cache.
- Homepage image and video fallbacks are present; YouTube embeds use the privacy-enhanced host.
- The server preserves real HTTP 404 semantics and emits non-indexable 404 metadata.

### Mobile measurement sample

A representative 390 × 844 mobile browser sample with 150 ms latency and approximately 1.6 Mbps download throughput was collected on the live site. Response time was consistently below 60 ms for the sampled routes. The sample confirmed that image transfer was the principal opportunity on the Music page and that the initial hero media path was worth constraining on mobile.

The production homepage also has a decorative `hero-reel.mp4` asset (17.1 MB total, 1920 × 3408, 13.3 seconds). It is appropriate for desktop ambience but not necessary to preserve the mobile hero’s visual hierarchy because the poster is already the immediate visual fallback.

---

## Improvements delivered

### Responsive Music hero artwork

The existing 1353 × 1163 Music hero PNG is 2.35 MB. Responsive derivatives preserve the same artwork and crop:

| Viewport class | Preferred format | Asset size |
|---|---:|---:|
| Mobile | 640px AVIF | 22.6 KB |
| Tablet | 960px AVIF | 50.4 KB |
| Desktop | 1440px AVIF | 90.1 KB |
| Compatible fallback | Matching WebP | 45.9–176.0 KB |

Browser verification at 390px confirmed that the Music hero selects `music-640.avif`, not the original PNG. The original remains as the fallback source.

### Mobile hero-video policy

The homepage continues to display the approved poster immediately. The decorative video layer is now enabled only for desktop-capable contexts that do not request reduced motion or reduced data. Mobile browser verification waited through the video-backed carousel slide and confirmed:

- No request for `hero-reel.mp4`
- No hero-video DOM layer
- Poster artwork, copy, CTA, and controls remain usable and visually coherent

Desktop retains the hero-video experience.

### GA4 validation

The live audit found a runtime `gtag` function on all sampled public routes. Automated browser coverage now verifies:

- Exactly one Google tag script is inserted.
- Initialization uses `send_page_view: false`.
- The initial route receives one SPA page-view configuration.
- A subsequent in-app navigation receives exactly one additional route-level page-view configuration.

No new event names were introduced. Existing interaction instrumentation was not changed because duplicate conversion events were not confirmed through network evidence.

---

## Regression coverage added

- Mobile media policy: the decorative hero video is absent through the video-backed carousel slide, while the Music page selects the compact AVIF hero asset.
- GA4 initialization and SPA page-view invariants.
- Crawl asset regression: robots availability and type, canonical sitemap declaration, sitemap availability and type, exact public-route coverage, and canonical-domain integrity.

The existing suite continues to verify first-party resource failures, keyboard/mobile behavior, route metadata synchronization, JSON-LD graph isolation, and HTTP 404 behavior.

---

## Validation record

| Check | Result |
|---|---|
| TypeScript check | Passed |
| Production build | Passed |
| Browser regression suite | Passed — 11 tests |
| Structured data and crawl-asset regression | Passed |
| Server 404 regression | Passed |
| Mockup Sandbox typecheck/build | Passed |
| Independent desktop/mobile browser validation | Passed |
| Main and Mockup Sandbox workflows | Both running cleanly |

The preview shell can emit third-party Framer iframe hydration notices. These are outside the KIUT application tree; first-party route regression checks passed without app resource failures.

---

## Search Console assessment

Search Console performance, coverage, and index-status data could not be queried because no Search Console integration or verified account was available in this workspace. This audit therefore validates the site’s crawl inputs (raw metadata, robots, sitemap, canonical URLs, and HTTP semantics), not Search Console’s delayed ingestion data.

After the next normal release, review the verified property for index coverage, Core Web Vitals field data, sitemap processing, and any canonical or mobile-usability reports.

---

## Approval-gated follow-up

A synthetic mobile trace observed cumulative layout shift when the homepage carousel automatically transitions between slides with intentionally different card/text layouts. Fixing that metric requires changing the approved slide choreography or layout behavior, which is outside this phase’s “do not alter animations or design” constraint. No partial layout workaround was shipped.

If approved, a dedicated visual-design/performance task can evaluate a stable carousel layout without changing the established brand system.
