---
name: Carousel CLS audit constraint
description: Automatic mobile hero slides shift layout; changes require explicit design approval.
---

Do not change the homepage carousel’s approved choreography merely to lower synthetic cumulative layout shift without explicit design approval.

**Why:** A mobile performance trace measured material layout shift after automatic transitions between slides with intentionally different artwork and text compositions. Attempts to reserve layout space did not fully remove it and would alter the approved visual choreography.

**How to apply:** Treat carousel layout stability as an approval-gated visual/performance follow-up. Keep media, SEO, and measurement changes separate from carousel animation changes unless the user explicitly approves a redesigned stable layout.