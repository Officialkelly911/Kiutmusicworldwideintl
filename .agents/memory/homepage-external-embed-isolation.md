---
name: Homepage external embed isolation
description: Resilience rules for the external DreamPlanet experience embedded below the homepage’s primary content.
---

Third-party homepage iframes must be created only near the reserved section, never during the critical initial render. Keep a stable reserved container, preserve the existing experience when it loads, and switch to a KIUT-styled fallback after a bounded timeout or iframe error. Remove the failed iframe instead of leaving a broken external document mounted.

**Why:** External Framer/DreamPlanet resources can fail or emit warnings outside KIUT’s control; they must not block, collapse, crash, or indefinitely load the parent homepage.

**How to apply:** Keep the boundary local to the homepage embed wrapper, use browser-level failure tests, and do not suppress global console warnings or rewrite unrelated React architecture.