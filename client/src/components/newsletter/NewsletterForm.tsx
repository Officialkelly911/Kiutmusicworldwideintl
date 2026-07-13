import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Lock, Check } from "lucide-react";
import { PremiumCTAButton } from "@/components/PremiumCTAButton";
import { COUNTRIES } from "@/lib/countries";
import { track } from "@/lib/analytics";
import {
  validateFirstName,
  validateEmail,
  validateNewsletterForm,
  hasErrors,
  isSessionDuplicate,
  markSessionSubmitted,
  normalizeEmail,
  type NewsletterFieldErrors,
} from "@/lib/newsletterValidation";
import { NewsletterConsent } from "./NewsletterConsent";
import { NewsletterError } from "./NewsletterError";
import { NewsletterSpinner } from "./NewsletterSpinner";

// ── Static option lists ────────────────────────────────────────────────────────

const PREFERENCE_OPTIONS = [
  { id: "releases", label: "New Releases" },
  { id: "tour",     label: "Tour & Show Announcements" },
  { id: "merch",    label: "Merch & Drops" },
  { id: "bts",      label: "Behind-the-Scenes Content" },
];

const PLATFORM_OPTIONS = [
  "Spotify",
  "Apple Music",
  "Audiomack",
  "YouTube Music",
  "Boomplay",
  "Other",
];

const GENRE_OPTIONS = [
  "Afrobeats",
  "Afropop",
  "Amapiano",
  "Hip-Hop / Rap",
  "R&B / Soul",
  "Gospel",
  "Pop",
  "Dancehall",
  "Electronic / Dance",
  "Other",
];

// ── Component ──────────────────────────────────────────────────────────────────

export interface NewsletterFormProps {
  /** Called on successful subscription with the subscriber's first name and email. */
  onSuccess: (firstName: string, email: string) => void;
  /** Called when a duplicate submission is detected (session or backend). */
  onDuplicate: (email: string) => void;
}

/**
 * Reusable newsletter subscription form.
 *
 * Handles:
 * - Real-time per-field validation (on blur, then live while typing)
 * - Full form validation on submit
 * - Session-level duplicate detection via sessionStorage
 * - Backend submission with duplicate / error responses
 * - Honeypot spam protection
 * - Analytics events via `track()`
 *
 * Provider logic lives exclusively in newsletterService.ts — this component
 * is provider-agnostic and will work with any future backend integration.
 */
export function NewsletterForm({ onSuccess, onDuplicate }: NewsletterFormProps) {
  // ── Field state ──────────────────────────────────────────────────────────────
  const [firstName,       setFirstName]       = useState("");
  const [lastName,        setLastName]        = useState("");
  const [email,           setEmail]           = useState("");
  const [country,         setCountry]         = useState("");
  const [favoritePlatform,setFavoritePlatform]= useState("");
  const [favoriteGenre,   setFavoriteGenre]   = useState("");
  const [preferences,     setPreferences]     = useState<string[]>([]);
  const [consent,         setConsent]         = useState(false);
  const [nlWebsite,       setNlWebsite]       = useState(""); // honeypot

  // ── Validation state ─────────────────────────────────────────────────────────
  const [touched,      setTouched]      = useState<Record<string, boolean>>({});
  const [fieldErrors,  setFieldErrors]  = useState<NewsletterFieldErrors>({});

  // ── Submission state ─────────────────────────────────────────────────────────
  const [submitting,   setSubmitting]   = useState(false);
  const [submitError,  setSubmitError]  = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  // ── Validation helpers ───────────────────────────────────────────────────────

  function touchField(field: string) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  function revalidateField(field: "firstName" | "email", value: string) {
    if (field === "firstName") {
      const err = validateFirstName(value);
      setFieldErrors((e) => ({ ...e, firstName: err ?? undefined }));
    }
    if (field === "email") {
      const err = validateEmail(value);
      setFieldErrors((e) => ({ ...e, email: err ?? undefined }));
    }
  }

  function handleFirstNameChange(v: string) {
    setFirstName(v);
    if (touched.firstName) revalidateField("firstName", v);
  }

  function handleEmailChange(v: string) {
    setEmail(v);
    if (touched.email) revalidateField("email", v);
  }

  function togglePreference(id: string) {
    setPreferences((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  }

  // ── Submit ───────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    // Honeypot — bot filled invisible field; silently fake success
    if (nlWebsite) {
      onSuccess(firstName.trim(), email);
      return;
    }

    // Mark required fields as touched so inline errors become visible
    setTouched({ firstName: true, email: true });

    const errors = validateNewsletterForm({ firstName, email, consent });
    setFieldErrors(errors);
    if (hasErrors(errors)) return;

    // Client-side session duplicate check (no network needed)
    if (isSessionDuplicate(email)) {
      onDuplicate(email);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizeEmail(email),
          firstName:       firstName.trim()       || undefined,
          lastName:        lastName.trim()        || undefined,
          country:         country                || undefined,
          favoritePlatform:favoritePlatform       || undefined,
          favoriteGenre:   favoriteGenre          || undefined,
          preferences:     preferences.length ? preferences : undefined,
          consent,
          source: "Newsletter Page",
        }),
      });

      const data: { message?: string; duplicate?: boolean } =
        await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message ?? "Something went wrong. Please try again.",
        );
      }

      if (data.duplicate) {
        onDuplicate(email);
        return;
      }

      markSessionSubmitted(email);
      track("newsletter_signup", {
        country:  country           || undefined,
        platform: favoritePlatform  || undefined,
      });
      onSuccess(firstName.trim(), email);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setSubmitError(msg);
      track("form_error", { label: "newsletter" });
    } finally {
      setSubmitting(false);
    }
  }

  // ── Shared style strings ─────────────────────────────────────────────────────

  const inputBase =
    "block w-full px-5 pb-3 pt-6 text-white bg-white/5 border rounded-xl appearance-none focus:outline-none focus:ring-0 focus:bg-white/[0.07] focus:shadow-glow-gold transition-all duration-normal peer placeholder-transparent";
  const inputNormal   = `${inputBase} border-white/10 focus:border-gold`;
  const inputError    = `${inputBase} border-red-500/60 focus:border-red-400`;
  const floatLabel    =
    "absolute text-white/40 duration-normal transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-gold pointer-events-none";
  const bottomBar     =
    "absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold to-purple-500 rounded-b-xl group-focus-within:w-full transition-all duration-slow";
  const selectBase    =
    "block w-full px-5 py-4 text-sm bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-gold focus:bg-white/[0.07] focus:shadow-glow-gold transition-all duration-normal text-white/70 focus:text-white";

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <h2 className="font-display text-2xl font-bold mb-7 uppercase tracking-wide text-center">
        Unlock <span className="text-gold">Access</span>
      </h2>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
        aria-label="Newsletter subscription form"
      >

        {/* ── First + Last name ────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* First name */}
          <div>
            <div className="relative group">
              <input
                type="text"
                id="nl-firstName"
                value={firstName}
                onChange={(e) => handleFirstNameChange(e.target.value)}
                onBlur={() => {
                  touchField("firstName");
                  revalidateField("firstName", firstName);
                }}
                autoComplete="given-name"
                maxLength={80}
                aria-required="true"
                aria-invalid={touched.firstName && !!fieldErrors.firstName}
                aria-describedby={
                  touched.firstName && fieldErrors.firstName
                    ? "nl-firstName-error"
                    : undefined
                }
                className={
                  touched.firstName && fieldErrors.firstName
                    ? inputError
                    : inputNormal
                }
                placeholder=" "
              />
              <label htmlFor="nl-firstName" className={floatLabel}>
                First Name *
              </label>
              <div className={bottomBar} />
            </div>
            {touched.firstName && fieldErrors.firstName && (
              <p
                id="nl-firstName-error"
                role="alert"
                className="text-red-400 text-xs mt-1.5 pl-1"
              >
                {fieldErrors.firstName}
              </p>
            )}
          </div>

          {/* Last name */}
          <div className="relative group">
            <input
              type="text"
              id="nl-lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
              maxLength={80}
              className={inputNormal}
              placeholder=" "
            />
            <label htmlFor="nl-lastName" className={floatLabel}>
              Last Name
            </label>
            <div className={bottomBar} />
          </div>
        </div>

        {/* ── Email ────────────────────────────────────────────────── */}
        <div>
          <div className="relative group">
            <input
              type="email"
              id="nl-email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={() => {
                touchField("email");
                revalidateField("email", email);
              }}
              autoComplete="email"
              aria-required="true"
              aria-invalid={touched.email && !!fieldErrors.email}
              aria-describedby={
                touched.email && fieldErrors.email
                  ? "nl-email-error"
                  : undefined
              }
              className={
                touched.email && fieldErrors.email ? inputError : inputNormal
              }
              placeholder=" "
            />
            <label htmlFor="nl-email" className={floatLabel}>
              Email Address *
            </label>
            <div className={bottomBar} />
          </div>
          {touched.email && fieldErrors.email && (
            <p
              id="nl-email-error"
              role="alert"
              className="text-red-400 text-xs mt-1.5 pl-1"
            >
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* ── Country + Platform ───────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <select
            id="nl-country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            aria-label="Country"
            className={selectBase}
          >
            <option value="" className="bg-midnight text-white/70">Country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c} className="bg-midnight text-white">
                {c}
              </option>
            ))}
          </select>

          <select
            id="nl-platform"
            value={favoritePlatform}
            onChange={(e) => setFavoritePlatform(e.target.value)}
            aria-label="Favorite music platform"
            className={selectBase}
          >
            <option value="" className="bg-midnight text-white/70">Favorite Platform</option>
            {PLATFORM_OPTIONS.map((p) => (
              <option key={p} value={p} className="bg-midnight text-white">
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* ── Favorite genre ───────────────────────────────────────── */}
        <select
          id="nl-genre"
          value={favoriteGenre}
          onChange={(e) => setFavoriteGenre(e.target.value)}
          aria-label="Favorite music genre"
          className={selectBase}
        >
          <option value="" className="bg-midnight text-white/70">Favorite Genre</option>
          {GENRE_OPTIONS.map((g) => (
            <option key={g} value={g} className="bg-midnight text-white">
              {g}
            </option>
          ))}
        </select>

        {/* ── Preferences ──────────────────────────────────────────── */}
        <fieldset>
          <legend className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">
            What would you like to hear about?
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PREFERENCE_OPTIONS.map((opt) => {
              const checked = preferences.includes(opt.id);
              return (
                <label
                  key={opt.id}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border text-xs cursor-pointer transition-colors duration-fast ${
                    checked
                      ? "border-gold/40 bg-gold/[0.08] text-gold"
                      : "border-white/10 bg-white/[0.02] text-white/55 hover:border-white/20"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => togglePreference(opt.id)}
                    className="w-3.5 h-3.5 rounded border-white/20 bg-white/[0.04] text-gold accent-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                  />
                  {opt.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* ── Honeypot — invisible to real users ───────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          <label htmlFor="nl-website">Website</label>
          <input
            type="text"
            id="nl-website"
            name="website"
            value={nlWebsite}
            onChange={(e) => setNlWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* ── Consent ──────────────────────────────────────────────── */}
        <NewsletterConsent
          checked={consent}
          onChange={(v) => {
            setConsent(v);
            if (v) setFieldErrors((e) => ({ ...e, consent: undefined }));
          }}
          error={fieldErrors.consent}
        />

        {/* ── Submit error ─────────────────────────────────────────── */}
        {submitError && <NewsletterError message={submitError} />}

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <div className="pt-2">
          <PremiumCTAButton
            as="button"
            type="submit"
            disabled={submitting}
            className="w-full"
            iconPosition="right"
            icon={
              submitting ? (
                <NewsletterSpinner size={18} className="text-current" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )
            }
          >
            {submitting ? "Joining..." : "Join the Rhythm"}
          </PremiumCTAButton>
          <p className="text-center text-white/30 text-xs uppercase tracking-widest mt-3 font-medium">
            Limited access&nbsp;•&nbsp;Inner circle only
          </p>
        </div>
      </form>

      {/* ── Trust row ────────────────────────────────────────────────── */}
      <div className="mt-7 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-white/35 uppercase tracking-wider font-medium">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-gold" aria-hidden="true" /> No spam
        </div>
        <span className="hidden sm:inline text-white/15" aria-hidden="true">•</span>
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-gold" aria-hidden="true" /> Private list
        </div>
        <span className="hidden sm:inline text-white/15" aria-hidden="true">•</span>
        <div className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-gold" aria-hidden="true" /> Unsubscribe anytime
        </div>
      </div>
    </motion.div>
  );
}
