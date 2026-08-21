---
name: Route-scoped document preloads
description: Shared document-head preloads must be injected per route to avoid unrelated pages fetching hero media.
---

Document-head preloads for a page-specific asset must be route-scoped through the shared build/server HTML marker system, not left in the static shell.

**Why:** A global homepage hero-poster preload was fetched on the Music route even though Music has its own responsive hero, adding avoidable initial transfer.

**How to apply:** When adding a priority preload, preserve a marker through Vite's index transform and the production static document injection. Assert both the intended route presence and non-target-route absence in server-rendered HTML tests.