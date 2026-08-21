---
name: Phase 11C server 404 semantics
description: Rules for preserving the SPA 404 screen while making unknown URLs semantically correct for crawlers.
---

Unknown browser paths must still receive the application HTML shell so the established branded React 404 component renders, but the response status must be HTTP 404. Their initial document metadata must use the existing 404 title, description, `/404` canonical, and `noindex, follow` rather than homepage values.

**Why:** A generic 200 homepage shell for arbitrary URLs is a soft 404 that can cause crawlers to index invalid URLs as homepage equivalents. Serving a separate server error page would break the approved client experience.

**How to apply:** Keep public-route recognition, trailing-slash/query normalization, server status selection, server metadata selection, and client routing on the same shared classifier. Valid public aliases remain 200 and retain their approved canonical route; do not make case changes or internal path changes into aliases.