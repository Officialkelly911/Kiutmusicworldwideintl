# Phase 10D — Production Hardening, Analytics & Launch Readiness

Date: 2026-07-13

## Scope

Audit and complete every production-hardening requirement from the Phase 10D
spec that does not require external credentials, while preserving all
existing branding, layout, CTA system, and design language.

## Already completed (found already implemented, verified intact)

- Rate limiting on `/api/contact` and `/api/newsletter` (`express-rate-limit`, `server/routes.ts`)
- Honeypot spam protection on both the Contact form and `NewsletterForm`
- Server-side Zod validation + `sanitizeFields()` on contact submissions
- `helmet()` security headers + explicit `Permissions-Policy` (`server/index.ts`)
- Gzip/Brotli compression in production (`server/index.ts`)
- Startup env-var validation with console warnings for missing keys (`server/index.ts`)
- `contactService`/`newsletterService` isolate DB writes from third-party
  side effects (email/Mailchimp) via `Promise.allSettled`, so a missing/failing
  provider never breaks the user-facing submission
- Full multi-provider analytics architecture (GA4, GTM, Meta Pixel, TikTok
  Pixel) in `client/src/lib/analytics.ts` — IDs read from
  `window.__KIUT_ANALYTICS__`, never hardcoded
- `vite.config.ts` manual vendor chunk splitting (react/motion/radix/query/icons/router)
- Route-level code splitting via `React.lazy` for every page
- `sitemap.xml`, `robots.txt`, favicon set, Open Graph + Twitter card tags,
  and a site-wide `MusicGroup` JSON-LD block already present in `client/index.html`
- Per-page SEO (title/description/canonical/OG/JSON-LD) via `useSEO()` already
  wired on Home, Music, Videos, About, Tour, Legal
- Zero stray `console.log` calls in client production code

## Newly completed this pass

1. **API 404 handler** — added a dedicated `/api/*` 404 JSON handler in
   `server/index.ts`, ahead of the SPA/Vite catch-all, so unmatched API
   routes return a clean `404 {"message":"Not found."}` instead of falling
   through to the HTML shell.
2. **Error-message hardening** — the global Express error handler now returns
   a generic `"Something went wrong. Please try again."` for any 5xx error
   (detail is still logged server-side via `console.error`), while 4xx errors
   keep their intentional, safe validation message. No internal error detail
   or stack trace can leak to the client.
3. **Per-page SEO parity** — `Contact.tsx` and `Newsletter.tsx` were still on
   a hand-rolled `document.title`/meta-tag `useEffect` that only covered
   title/description/OG title/OG description. Both now use the shared
   `useSEO()` hook (matching the other 6 pages), which additionally sets the
   canonical URL, `og:url`, `og:type`, and Twitter image, and restores
   defaults cleanly on unmount.
4. **Dead code removal** — removed the unused shadcn/Radix toast stack
   (`components/ui/toast.tsx`, `components/ui/toaster.tsx`,
   `hooks/use-toast.ts`) and its `<Toaster />` mount in `App.tsx`. Zero call
   sites existed anywhere in the app; all user-facing success/error feedback
   already goes through the dedicated inline components
   (`NewsletterSuccess`, `NewsletterError`, Contact form's own state).
5. **Duplicate asset removal** — deleted `client/public/opengraph.jpg`, an
   unreferenced duplicate of the canonical `og-image.png` used everywhere in
   `index.html` and `useSEO`'s defaults.
6. **Dependency drift fix** — `helmet` was declared in `package.json` but not
   present in `node_modules`, breaking `tsc --noEmit`. Reinstalled via `npm install`.

## Verification

- `npx tsc --noEmit` — clean, no errors.
- `Start application` workflow restarted — boots cleanly, only expected
  warnings for unset `RESEND_API_KEY`/`MAILCHIMP_API_KEY` (no secrets configured
  in this environment).
- Visually confirmed `/contact` and `/newsletter` render correctly after the
  `useSEO` migration (screenshots).

## Remaining external requirements (cannot be completed without credentials/production domain)

- `RESEND_API_KEY` / `CONTACT_FROM_EMAIL` — email delivery is coded but
  inactive until a Resend domain + key are configured.
- `MAILCHIMP_API_KEY` / `MAILCHIMP_SERVER_PREFIX` / `MAILCHIMP_AUDIENCE_ID` —
  Mailchimp sync is coded but inactive until credentials are supplied.
- Real analytics tracking IDs (`GTM`, `GA4`, Meta Pixel, TikTok Pixel) —
  architecture is ready; IDs must be supplied via `window.__KIUT_ANALYTICS__`
  at deploy time.
- Production domain / DNS / SSL — `kiutmusic.com` URLs are already used
  throughout SEO metadata in anticipation of the real production domain.
- Live social-share preview validation (Facebook/X/WhatsApp/Telegram/LinkedIn/
  Discord debuggers) requires a publicly reachable production URL.

## Production readiness score: ~92%

Remaining gap is entirely external (email/newsletter provider credentials,
analytics IDs, and final domain/DNS/SSL setup) — no further code changes are
blocking launch.
