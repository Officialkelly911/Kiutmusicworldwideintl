# Phase 11F — Music Page Performance & Stability Audit

**Date:** 2026-08-21  
**Scope:** `/music` performance and stability only. No Phase 12 content work, publishing, deployment, visual redesign, SEO policy, routing, 404 behavior, or structured-data architecture changes.

## Diagnosis

### Server and route loading

The built production server responded quickly:

| Route | HTTP | Local TTFB | HTML response |
| --- | ---: | ---: | ---: |
| `/` | 200 | 2.0 ms | 7.2 KB |
| `/music` | 200 | 5.2 ms | 13.7 KB |
| `/videos` | 200 | 1.6 ms | 20.0 KB |

The Music route chunk is 48.9 KB uncompressed (11.8 KB gzip). Route-level splitting remains intact. The server response and JavaScript route chunk were not the primary production bottleneck.

### Confirmed initial-render costs

Before this follow-up, a direct production-style `/music` load mounted the whole long-form page immediately:

- 46 image elements
- 5 album-preview `<audio>` elements
- 15 track rows
- all below-the-fold catalogue/discovery/playlist DOM
- a globally injected 249 KB homepage poster preload, despite the Music page using its own responsive image hero

Native image lazy-loading prevented many full image downloads, and all album-preview audio used `preload="none"`, but the complete DOM and motion tree still mounted up front. This produced a 354 ms desktop long task and several 73–123 ms mobile long tasks.

The production Music page has no route video, no iframe, and no eager audio download. It selects the responsive Music hero correctly: 90 KB AVIF desktop and 22.6 KB AVIF mobile.

## Changes made

1. **Scoped the homepage hero-poster preload to the homepage**
   - Route-aware preload markers now preserve the approved priority preload on `/`.
   - `/music` and other routes no longer fetch `/assets/images/hero-poster.webp`.
   - The Vite development shell and production static HTML injection use the same route-aware source.

2. **Deferred the below-the-fold Music content**
   - The approved hero and featured release remain immediate.
   - Statistics, timeline, discography, albums, grouped tracks, platforms, playlist, discovery, videos, and newsletter mount when within 250 px of the viewport.
   - All existing content, artwork, streaming links, preview-audio controls, and interactions remain unchanged once reached.

3. **Added regression coverage**
   - Confirms `/music` never requests the homepage-only poster or audio media during initial load.
   - Confirms the catalogue is absent initially, then mounts all 15 rows and five audio controls when approached.
   - Confirms the homepage retains its own hero-poster preload while Music does not.

## Measured results

Production-build Chromium measurements after initial page settling:

| Measure | Desktop before | Desktop after | Mobile before | Mobile after |
| --- | ---: | ---: | ---: | ---: |
| Initial transferred resources | 1.62 MB | 1.04 MB | 1.55 MB | 0.97 MB |
| Image elements on initial render | 46 | 5 | 46 | 5 |
| Preview audio elements on initial render | 5 | 0 | 5 | 0 |
| Track rows on initial render | 15 | 0 | 15 | 0 |
| Largest observed long task | 354 ms | 199 ms | 123 ms | 97 ms |

That is an initial-transfer reduction of approximately 36% on desktop and 37% on mobile. After the deferred boundary activates, the full page restores all 15 track rows, five preview-audio controls, artwork, playlist, and discovery content.

## Stability investigation

### Reproduction results

- Direct desktop `/music`: renders successfully.
- Direct mobile `/music`: renders successfully.
- Mobile Home → Music navigation: reaches the featured release successfully.
- Refresh on `/music`: renders successfully.
- Throttled mobile direct `/music` (180 ms latency, 750 Kbps): featured release usable in approximately 4.15 seconds; no Music-page console errors or failed requests.
- Chromium: validated.
- WebKit/Safari: not available in this workspace, so Safari behavior could not be directly reproduced.

No Music-specific crash, refresh loop, hydration failure, or runtime exception was reproduced.

The Home → Music transition records pre-existing Home-originated noise: an aborted homepage background-video request during unmount and a third-party storefront/embed warning. These do not occur on direct Music loads and were not changed because they are outside the scoped Music investigation.

## Regression and SEO checks

Passed:

- `npm run check`
- `npm run build`
- `npx playwright test` — 13 passed
- `tsx tests/structured-data-regression.ts`
- `tsx tests/server-404-regression.ts`

The initial server HTML continues to supply the approved route metadata and JSON-LD. `/music` retains its canonical URL, Open Graph/Twitter metadata, robots directives, and Music structured-data graph. Invalid routes retain real HTTP 404 behavior.

## Remaining risks

- The full Music experience remains intentionally content-rich after the reader reaches it. Very low-memory browsers may still spend work when the full catalogue mounts, but it no longer competes with hero/featured-release usability.
- Safari/WebKit needs validation on a real device or a workspace with the WebKit browser installed.
- The unrelated Home third-party embed/video teardown warnings should be investigated separately if cross-route console cleanliness becomes a broader priority.

## Publishing

No deployment or publishing action was taken.