---
name: Phase 10 form/service architecture
description: Service layer, analytics, countries list, booking metadata pattern, and import.meta.env quirk introduced in Phase 10.
---

## Service layer
- `server/contactService.ts` — exposes `submit(data, meta)` (auto-dispatches on `data.enquiryType`), plus named methods `submitBooking/General/Business/Press/Collaboration/Licensing`. All email side-effects fire with `Promise.allSettled` (never blocks the HTTP response).
- `server/newsletterService.ts` — exposes `subscribe()`, `unsubscribe()`, `checkDuplicate()`, `syncProvider()`. Side-effects (Mailchimp + welcome email) fire in the background; `unsubscribe()` calls `storage.deleteNewsletterSubscriber()`.
- `server/routes.ts` — delegates 100% to service layers; honeypot field (`website`) checked on both POST endpoints before any processing.

## Booking metadata
- `shared/schema.ts` adds `metadata text` (nullable JSON) to `contactSubmissions`.
- Frontend serializes booking-specific fields (company, eventType, eventDate, venue, estimatedAudience, budgetRange) into `metadata` only when `activeType === "booking"`.
- `server/email.ts` renders metadata with `renderMetadata()` helper — parses JSON, displays a gold-tinted block in the notification email.

## Contact form validation changes (Phase 10A)
- `lastName`: now required (was optional)
- `country`: now required + dropdown select (was optional free-text)
- Booking inquiry type reveals 6 extra fields inside an animated gold panel
- Both Contact and Newsletter forms have a hidden honeypot input (`website`/`nl-website`) positioned off-screen

## Analytics
- `client/src/lib/analytics.ts` — `track(event, properties)` fires a `kiut:analytics` CustomEvent on `window`; logs to console in dev. Add provider (GA4/Posthog/Plausible) inline at the marked comment. Events: `newsletter_signup`, `booking_request`, `contact_submission`, `business_inquiry`, `press_inquiry`, `collaboration_inquiry`, `licensing_inquiry`, `cta_click`, `form_error`.

## Reusable newsletter components (Phase 10B)
- `client/src/components/newsletter/` barrel — NewsletterForm, NewsletterSuccess, NewsletterError, NewsletterConsent, NewsletterSpinner, NewsletterBenefitsCard
- `client/src/lib/newsletterValidation.ts` — validateFirstName, validateEmail, validateNewsletterForm, hasErrors, normalizeEmail, isSessionDuplicate, markSessionSubmitted
- `NewsletterBenefitsCard` has variant `"hero"` (horizontal, stagger animate) and `"grid"` (compact whileInView) — drives both hero column and perks section
- `NewsletterSuccess` shows personalized greeting + 5-bullet benefits list (non-duplicate) or "already subscribed" variant (isDuplicate=true)
- Session dedup key: `kiut_nl_submitted` in sessionStorage (JSON array of normalized emails)
- Routes returns `{ duplicate: true }` alongside the message for frontend to distinguish duplicates from errors

## Countries
- `client/src/lib/countries.ts` — 87-entry array, Kiut key territories first (Nigeria, US, UK, CA, Ghana, Jamaica, France…), then alphabetical by region.

## SEO meta per-page
- Both Contact.tsx and Newsletter.tsx set `document.title`, `meta[name="description"]`, `meta[property="og:title"]`, `meta[property="og:description"]` on mount and restore originals on unmount.

## favoriteGenre field
- Added `favorite_genre text` column to `newsletter_subscribers` table (schema + DB push done)
- Zod schema extended with `favoriteGenre: z.string().trim().max(80).optional()`
- `newsletterService.preparePayload()` normalizes it alongside other optional fields

## import.meta.env quirk
- Project has no `vite-env.d.ts` so `import.meta.env` is untyped in tsconfig strict mode.
- **Fix**: cast as `(import.meta as Record<string, any>).env?.DEV`.

**Why:** No `/// <reference types="vite/client" />` is present and the tsconfig doesn't include Vite's type augmentation.
