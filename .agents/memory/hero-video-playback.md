---
name: Hero video playback
description: Shared HeroSection video autoplay and framing behavior for responsive hero backgrounds.
---

Muted autoplay should be provided through native video attributes and explicit `defaultMuted`/`muted` properties before playback is requested. Avoid calling `video.load()` during mount because it can reset an already-started autoplay on WebKit; retry from `canplay`/`loadeddata` instead.

**Why:** The Music hero uses a 16:9 source inside a viewport-height section. `object-cover` crops that source by design, and a mount-time `load()` can interrupt autoplay in browsers that otherwise permit muted inline playback.

**How to apply:** Keep the Music hero video `object-contain` when the requirement is to preserve the full composition, and keep `autoplay`, `muted`, `loop`, and `playsInline` on the shared `<video>`. Use the poster/image fallback until `onPlaying` confirms playback.