---
name: PremiumCTAButton component
description: The reusable premium pill CTA component (gold sweep border) — which buttons use it vs. stay excluded, and the polymorphic pattern behind it.
---

`client/src/components/PremiumCTAButton.tsx` is the single component for every major conversion CTA (hero "Listen Now", "Join Newsletter", "Book Kiut", "Shop Merchandise", "Watch on YouTube", "Become a Member", "Send Message", etc). Styles live in `client/src/index.css` under `.premium-cta` (full pill, 2px Royal Gold border, `--midnight-black` satin interior, soft gold glow, animated gold sweep masked to the border ring via the `mask-composite: exclude` ring trick, ~5s loop).

**Scope decision — what got converted vs. excluded:**
- Converted: essentially every element previously styled with `btn-base btn-primary` across Home/Music/Tour/Videos/About/Contact/Newsletter — including Newsletter's bespoke gradient-shimmer submit button (replaced for consistency, per explicit user ask for one shared CTA component).
- Excluded (left unchanged): buttons embedded inside input fields (Home hero newsletter "Subscribe", SiteFooter "Join") — converting these to a full pill would break their compact, edge-glued-to-input layout. Also excluded: the Navigation.tsx small nav-bar "Newsletter" pill (a nav item, not a page/section CTA) and the unused `Buttons.tsx` design-system definitions (not an actual call site).
- Secondary/outline buttons (`.btn-secondary`) were left untouched everywhere, including the non-premium tier branch in Tour.tsx's pricing cards (conditional: only `tier.isPremium` gets `PremiumCTAButton`).

**Component pattern — why not fully dynamic polymorphism:**
`PremiumCTAButton` supports only `as="button" | "a" | "link"` (not an arbitrary `as` prop), each mapped to a *statically defined* motion component (`motion.button`, `motion.a`, or a module-scope `motion.create(Link)` for wouter). This avoids the anti-pattern of calling `motion.create(x)` fresh every render (which would remount the component and lose animation state) while still covering 100% of the site's real CTA call sites (buttons, external anchors, internal routes).

**Why:** the user wanted one visually/behaviorally identical component everywhere, but the button system's actual usage patterns (embedded input-adjacent buttons, nav pills, secondary/outline buttons) don't fit the "always a full premium pill" rule — those needed a conscious, documented exception rather than blanket conversion.
