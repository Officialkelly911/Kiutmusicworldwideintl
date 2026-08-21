---
name: Preview runtime notices
description: How to distinguish app failures from browser-console messages injected by the Replit preview shell or third-party embeds.
---

Treat browser-console warnings as evidence to investigate, not as an automatic application regression. The preview surface can emit Framer/iframe hydration notices and third-party media embed messages that do not originate in the KIUT React tree.

**Why:** A screenshot/browser audit can expose errors from the surrounding preview context or embedded providers. Treating them as first-party failures leads to unnecessary changes to functioning application code.

**How to apply:** For runtime reliability checks, separately record `pageerror` events and same-origin failed script, stylesheet, image, media, or font responses. Explicitly identify third-party iframe and preview-shell console messages in audit results; only modify the app when a first-party failure is reproducible.