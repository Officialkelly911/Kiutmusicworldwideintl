---
name: Phase 10D production hardening
description: What was already built vs. genuinely missing when auditing KIUT Music against a "production hardening / launch readiness" spec.
---

When a production-hardening/launch-readiness spec arrives, audit the
codebase (via an explore subagent) against every checklist item BEFORE
writing any code — this codebase iterates fast and most "standard hardening"
items are usually already done by an earlier phase.

Confirmed-present infrastructure (check these still exist before re-building
them): rate limiting (`express-rate-limit` in `server/routes.ts`), contact +
newsletter honeypots, `helmet()` + `Permissions-Policy`, gzip/brotli
compression (prod-only), startup env-var validation with warnings,
multi-provider analytics architecture (GA4/GTM/Meta/TikTok, IDs never
hardcoded, read from `window.__KIUT_ANALYTICS__`), Vite `manualChunks`
vendor splitting, per-route `React.lazy` splitting, sitemap.xml/robots.txt,
and a `useSEO()` hook (`client/src/lib/useSEO.ts`) for per-page
title/description/canonical/OG/JSON-LD.

**Why:** a generic external audit prompt (or a subagent not given the right
context) will often claim things like "manualChunks missing" or "no rate
limiting" when they already exist — always verify claims with a direct grep
before trusting a gap-analysis and duplicating work.

**How to apply:** when asked for a similar hardening pass again, diff against
this list first; only implement genuinely absent items (e.g. previously: no
dedicated `/api/*` 404 handler, error handler leaked `err.message` verbatim
on 5xx, two pages still used a hand-rolled meta-tag effect instead of
`useSEO()`, a dead unused shadcn/Radix toast stack was still mounted in
`App.tsx` alongside the real inline success/error components).
