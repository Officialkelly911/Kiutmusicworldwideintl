---
name: Music mobile resilience
description: The Music route needs explicit recovery around lazy loading and media failures.
---

The Music route is already independently code-split at roughly 50 KB production transfer size, so mobile reliability work should target failure handling before introducing further decomposition.

**Why:** A lazy route rejection, stalled hero asset, or rejected audio play promise can look identical to an indefinite page load on mobile even when the route bundle is modest.

**How to apply:** Keep recovery scoped to Music, use user-initiated retry rather than automatic reload loops, let hero content render independently of media, and log media failures without exposing technical details.