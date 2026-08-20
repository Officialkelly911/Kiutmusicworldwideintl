---
name: Entity SEO structured data
description: Rules for fact-based, route-specific JSON-LD in KIUT's initial HTML and client navigation fallback.
---

Every document must contain exactly one JSON-LD `@graph` that always defines the stable artist, website, and route WebPage entities. Route-specific music, video, and event entities must reference those stable IDs rather than duplicate them.

**Why:** Search metadata has to stay consistent between first-load HTML and client-side navigation, while unsupported dates or tentative event details can make entity data misleading.

**How to apply:** Generate the graph from the same data modules that render pages in both server and Vite transforms; replace the same uniquely identified script on client navigation. Only emit albums/recordings with complete release dates (and recordings with valid durations), omit video upload dates when only a year is known, and serialize events only when date, time, venue, and announced status are complete. Invalid routes get only the base entities plus the 404 WebPage.