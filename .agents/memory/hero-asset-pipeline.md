---
name: Hero asset pipeline
description: How to promote an approved visual into the shared responsive hero system
---

When an approved hero visual exists only inside an existing video, extract a representative still from that source and run the existing responsive hero-generation pipeline. Register its blur placeholder in `heroImages.ts` and keep the shared `HeroSection` as the only image-loading system.

**Why:** The universal hero expects responsive image variants, while extracting from the approved source preserves the intended artwork without introducing a second media architecture.

**How to apply:** Reuse the source media and existing generation script; do not hand-build a parallel loader or substitute an unrelated image.