---
name: Entity SEO structured data
description: Rules for fact-based, route-specific JSON-LD in KIUT's initial HTML and client navigation fallback.
---

Every document must contain exactly one JSON-LD `@graph` that always defines the stable artist, website, and route WebPage entities. Route-specific music, video, and event entities must reference those stable IDs rather than duplicate them.

**Why:** Search metadata has to stay consistent between first-load HTML and client-side navigation, while unsupported dates or tentative event details can make entity data misleading.

**How to apply:** Generate the graph from the same data modules that render pages in both server and Vite transforms; replace the same uniquely identified script on client navigation. Only emit albums/recordings with complete release dates (and recordings with valid durations), omit video upload dates when only a year is known, and serialize events only when date, time, venue, and announced status are complete. Invalid routes get only the base entities plus the 404 WebPage.

Vite's static build may transform `/index.html` without a request URL; interpret that build-only path as the homepage `/`, not as a browser route. During animated route exits, only the currently active SEO hook instance may clean up document metadata and JSON-LD, or a stale page can remove the incoming route's graph.

**Why:** A missing build request context otherwise produces a noindex 404 artifact, and overlapping page lifecycles can leave client navigations with stale metadata or no JSON-LD.

**How to apply:** Keep request-aware Vite transforms intact, but use `/` only when `originalUrl` is unavailable and the transform path is the build artifact. Keep one script ID and make cleanup ownership-aware; cover build artifact metadata, resolved internal `@id` references, and client route transitions in regression tests.