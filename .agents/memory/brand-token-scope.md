---
name: Brand token scope decisions
description: What counts as "the official brand palette" when asked to tokenize all colors, and how to consolidate near-black/near-white literals without flattening designed visual variety.
---

When asked to replace "every color" with a small named brand palette (e.g. Royal Gold, Champagne Gold, Dark Gold, Midnight Black, White, Neutral Gray), two categories of existing hardcoded colors are legitimately out of scope and should stay literal:

1. **Third-party platform brand colors** (Spotify green, Apple Music red, YouTube red, WhatsApp/Telegram/Facebook brand colors, SoundCloud orange, etc.) — these are external brand identities the site links to, not the site's own brand.
2. **Functional category/semantic colors** — e.g. color-coding used only to visually distinguish categories/tags (video type badges: music/visual/live/behind-the-scenes). Converting these to the brand's gold/gray palette would destroy their distinguishing purpose.

**Why:** Flattening either category to the brand palette breaks their functional meaning or misrepresents third-party marks; the instruction to "use the official brand palette" is about the site's own brand surfaces (buttons, icons, links, cards, backgrounds, dividers, borders, hover states), not every pixel on the page.

**How to apply:** When consolidating many bespoke near-black or near-white hex literals (e.g. dozens of unique `#0a0a0a`, `#0d0618`, `#110d1a` gradient stops used for section background atmosphere) into a single official "Midnight Black" / "White" token, don't flatten to one flat color and lose the designed gradient texture. Instead:
- Add RGB triplets for each named token (`--midnight-black-rgb: 8, 8, 8`) so gradients can vary via `rgba(var(--midnight-black-rgb), alpha)`.
- For warm/cool-tinted near-blacks that intentionally mix in a brand accent, use CSS `color-mix(in srgb, var(--midnight-black) 92%, var(--dark-gold) 8%)` to keep the tint while staying token-based.
This preserves visual richness while satisfying "every background must reference an official token."
