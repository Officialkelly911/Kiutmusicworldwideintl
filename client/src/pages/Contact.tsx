import React from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  SPOTIFY_ARTIST_URL, APPLE_MUSIC_ARTIST_URL, AUDIOMACK_URL, BOOMPLAY_URL,
  INSTAGRAM_URL, YOUTUBE_URL, LINKTREE_URL, DREAMPLANET_URL,
  TIKTOK_URL, FACEBOOK_URL, SOUNDCLOUD_URL, X_URL, THREADS_URL,
} from "@/data/social";
import {
  CONTACT_CHANNELS, BOOKING_CATEGORIES, LOCATION_INFO, LOCATION_MAP_QUERY, CONTACT_FAQ,
} from "@/data/contact";
import { CONTACT_ENQUIRY_TYPES } from "@shared/schema";
import {
  Mail, Send, MessageSquare, Mic2, Newspaper, Briefcase, Handshake, FileSignature,
  ArrowRight, CheckCircle2, Globe, Users, Heart, ChevronRight, Copy, Check,
  MapPin, Clock, Share2, Phone, HelpCircle,
} from "lucide-react";
import {
  SiSpotify, SiApplemusic, SiAudiomack,
  SiInstagram, SiYoutube, SiLinktree,
  SiTiktok, SiFacebook, SiSoundcloud, SiX, SiThreads,
} from "react-icons/si";
import type { IconType } from "react-icons";

// react-icons/si has no Boomplay glyph — reuse the same minimal inline mark
// already established in Music.tsx rather than a mismatched substitute.
const SiBoomplay: IconType = ({ size = "1em", ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0-7a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
  </svg>
);

const SiDreamPlanet: IconType = ({ size = "1em", className, ...props }: any) => (
  <img
    src="/assets/images/dreamplanet-icon.svg"
    alt=""
    aria-hidden="true"
    width={size}
    height={size}
    className={`object-contain ${className ?? ""}`}
    {...props}
  />
);
import { useState, useRef, useEffect } from "react";
import { COUNTRIES } from "@/lib/countries";
import { track } from "@/lib/analytics";
import SiteFooter from "../components/SiteFooter";
import { PremiumCTAButton } from "@/components/PremiumCTAButton";
import KiutWatermark from "@/components/KiutWatermark";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SocialIconGroup } from "@/components/SocialIconGroup";
import { useSEO } from "@/lib/useSEO";
import { ROUTE_SEO } from "@shared/seo";

// ─── Enquiry types ────────────────────────────────────────────────────────────
const ENQUIRY_META: Record<(typeof CONTACT_ENQUIRY_TYPES)[number], { icon: typeof Mic2; label: string; desc: string; placeholder: string }> = {
  booking: {
    icon: Mic2,
    label: "Booking",
    desc: "Live performances, concerts, festivals",
    placeholder: "Tell us about the event — date, venue, audience size, and any specific requirements.",
  },
  press: {
    icon: Newspaper,
    label: "Press",
    desc: "Interviews, editorial features, press kits",
    placeholder: "Describe your publication or media outlet and what you'd like to cover.",
  },
  collaboration: {
    icon: Handshake,
    label: "Collaboration",
    desc: "Artist features, remixes, creative projects",
    placeholder: "Share a link to your work and describe the collaboration you have in mind.",
  },
  licensing: {
    icon: FileSignature,
    label: "Licensing",
    desc: "Sync licensing for film, TV & advertising",
    placeholder: "Describe the project, territory, and intended use for the music.",
  },
  business: {
    icon: Briefcase,
    label: "Business",
    desc: "Partnerships, brand deals, label enquiries",
    placeholder: "Outline the nature of the business opportunity and how you see collaboration working.",
  },
  general: {
    icon: MessageSquare,
    label: "General",
    desc: "Anything else — fan messages welcome",
    placeholder: "Send your message — every word is read.",
  },
};
const enquiryTypes = CONTACT_ENQUIRY_TYPES.map((id) => ({ id, ...ENQUIRY_META[id] }));

// ─── Social platform links ────────────────────────────────────────────────────
const socialLinks = [
  {
    label: "Instagram",
    sub: "@kiut_rababag",
    icon: SiInstagram,
    href: INSTAGRAM_URL,
    color: "from-pink-500/10 to-rose-600/10",
    border: "hover:border-pink-500/30",
    iconColor: "group-hover:text-pink-400",
  },
  {
    label: "YouTube",
    sub: "@kiutrabatv",
    icon: SiYoutube,
    href: YOUTUBE_URL,
    color: "from-red-500/10 to-red-700/10",
    border: "hover:border-red-500/30",
    iconColor: "group-hover:text-red-400",
  },
  {
    label: "Spotify",
    sub: "Kiut Music",
    icon: SiSpotify,
    href: SPOTIFY_ARTIST_URL,
    color: "from-green-500/10 to-emerald-700/10",
    border: "hover:border-green-500/30",
    iconColor: "group-hover:text-green-400",
  },
  {
    label: "Apple Music",
    sub: "Kiut",
    icon: SiApplemusic,
    href: APPLE_MUSIC_ARTIST_URL,
    color: "from-rose-400/10 to-pink-600/10",
    border: "hover:border-rose-400/30",
    iconColor: "group-hover:text-rose-300",
  },
  {
    label: "Audiomack",
    sub: "@kiutraba",
    icon: SiAudiomack,
    href: AUDIOMACK_URL,
    color: "from-orange-500/10 to-amber-600/10",
    border: "hover:border-orange-500/30",
    iconColor: "group-hover:text-orange-400",
  },
  {
    label: "Boomplay",
    sub: "Kiut",
    icon: SiBoomplay,
    href: BOOMPLAY_URL,
    color: "from-purple-500/10 to-indigo-600/10",
    border: "hover:border-purple-500/30",
    iconColor: "group-hover:text-purple-300",
  },
  {
    label: "Linktree",
    sub: "@kiutmusic",
    icon: SiLinktree,
    href: LINKTREE_URL,
    color: "from-green-400/10 to-lime-600/10",
    border: "hover:border-green-400/30",
    iconColor: "group-hover:text-green-300",
  },
  {
    label: "DreamPlanet",
    sub: "Kiut_Rababag",
    icon: SiDreamPlanet,
    href: DREAMPLANET_URL,
    color: "from-gold/10 to-amber-500/10",
    border: "hover:border-gold/30",
    iconColor: "group-hover:text-gold",
  },
  {
    label: "TikTok",
    sub: "Kiut Rababag",
    icon: SiTiktok,
    href: TIKTOK_URL,
    color: "from-white/5 to-slate-700/10",
    border: "hover:border-white/20",
    iconColor: "group-hover:text-white",
  },
  {
    label: "Facebook",
    sub: "Kiut Rababag",
    icon: SiFacebook,
    href: FACEBOOK_URL,
    color: "from-blue-600/10 to-blue-800/10",
    border: "hover:border-blue-500/30",
    iconColor: "group-hover:text-blue-400",
  },
  {
    label: "SoundCloud",
    sub: "Kiut",
    icon: SiSoundcloud,
    href: SOUNDCLOUD_URL,
    color: "from-orange-500/10 to-orange-700/10",
    border: "hover:border-orange-500/30",
    iconColor: "group-hover:text-orange-400",
  },
  {
    label: "X",
    sub: "@Kiutraba",
    icon: SiX,
    href: X_URL,
    color: "from-white/5 to-slate-700/10",
    border: "hover:border-white/20",
    iconColor: "group-hover:text-white",
  },
  {
    label: "Threads",
    sub: "Kiut Rababag",
    icon: SiThreads,
    href: THREADS_URL,
    color: "from-white/5 to-slate-700/10",
    border: "hover:border-white/20",
    iconColor: "group-hover:text-white",
  },
];

// ─── Community stats ──────────────────────────────────────────────────────────
const communityStats = [
  { label: "Countries Listening", value: "20+" },
  { label: "Newsletter Subscribers", value: "50K+" },
  { label: "Years Creating Music", value: "20+" },
];

// ─── Floating-label input ──────────────────────────────────────────────────────
interface FieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string | null;
  maxLength?: number;
  autoComplete?: string;
}
function FloatingField({ id, label, type = "text", value, onChange, onBlur, required, error, maxLength, autoComplete }: FieldProps) {
  return (
    <div className="relative group">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        placeholder=" "
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`block w-full px-5 pb-3 pt-6 text-white text-sm bg-white/[0.04] border rounded-xl appearance-none focus:outline-none focus:bg-white/[0.06] focus:shadow-glow-gold transition-all duration-normal peer placeholder-transparent ${
          error ? "border-red-500/50 focus:border-red-500/60" : "border-white/[0.08] focus:border-gold/50"
        }`}
      />
      <label
        htmlFor={id}
        className="absolute text-white/35 duration-normal transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-gold/70 pointer-events-none text-sm"
      >
        {label}{required && " *"}
      </label>
      <div className="absolute bottom-0 left-3 right-3 h-[1px] w-0 bg-gradient-to-r from-gold/60 to-gold/30 rounded-b-xl group-focus-within:w-[calc(100%-24px)] transition-all duration-slow" />
      {error && (
        <p id={`${id}-error`} className="text-red-400/80 text-xs mt-1.5 px-1">{error}</p>
      )}
    </div>
  );
}

type FormErrors = Partial<Record<"firstName" | "lastName" | "email" | "country" | "subject" | "message" | "consent", string>>;

function validateField(field: keyof FormErrors, value: string | boolean): string | null {
  switch (field) {
    case "firstName":
      return (value as string).trim().length > 0 ? null : "Please enter your first name.";
    case "lastName":
      return (value as string).trim().length > 0 ? null : "Please enter your last name.";
    case "email": {
      const v = (value as string).trim();
      if (!v) return "Email address is required.";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Please enter a valid email address.";
    }
    case "country":
      return (value as string).trim().length > 0 ? null : "Please select your country.";
    case "subject":
      return (value as string).trim().length >= 2 ? null : "Subject is required.";
    case "message":
      return (value as string).trim().length >= 10 ? null : "Message must be at least 10 characters.";
    case "consent":
      return value === true ? null : "Please accept the privacy policy before submitting.";
    default:
      return null;
  }
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [activeType, setActiveType] = useState<(typeof CONTACT_ENQUIRY_TYPES)[number]>("general");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [country, setCountry]     = useState("");
  const [subject, setSubject]     = useState("");
  const [message, setMessage]     = useState("");
  const [consent, setConsent]     = useState(false);
  const [errors, setErrors]       = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [errorMsg, setErrorMsg]   = useState<string | null>(null);

  // ── Honeypot (spam protection — stays empty for real users) ──────────────────
  const [website, setWebsite] = useState("");
  // ── Booking-specific fields ──────────────────────────────────────────────────
  const [company,           setCompany]           = useState("");
  const [eventType,         setEventType]         = useState("");
  const [eventDate,         setEventDate]         = useState("");
  const [venue,             setVenue]             = useState("");
  const [estimatedAudience, setEstimatedAudience] = useState("");
  const [budgetRange,       setBudgetRange]       = useState("");

  const active = enquiryTypes.find(t => t.id === activeType)!;
  const Icon   = active.icon;

  function touch(field: keyof FormErrors, value: string | boolean) {
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) ?? undefined }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setErrorMsg(null);

    // Honeypot — bot filled the invisible field; fake success silently
    if (website) { setSubmitted(true); return; }

    const nextErrors: FormErrors = {
      firstName: validateField("firstName", firstName) ?? undefined,
      lastName:  validateField("lastName",  lastName)  ?? undefined,
      email:     validateField("email",     email)     ?? undefined,
      country:   validateField("country",   country)   ?? undefined,
      subject:   validateField("subject",   subject)   ?? undefined,
      message:   validateField("message",   message)   ?? undefined,
      consent:   validateField("consent",   consent)   ?? undefined,
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    // Serialize booking-specific fields into metadata JSON
    const metadata =
      activeType === "booking" &&
      (company || eventType || eventDate || venue || estimatedAudience || budgetRange)
        ? JSON.stringify({
            ...(company           ? { company:           company.trim()           } : {}),
            ...(eventType         ? { eventType                                   } : {}),
            ...(eventDate         ? { eventDate                                   } : {}),
            ...(venue             ? { venue:             venue.trim()             } : {}),
            ...(estimatedAudience ? { estimatedAudience                           } : {}),
            ...(budgetRange       ? { budgetRange                                 } : {}),
          })
        : undefined;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName:   firstName.trim(),
          lastName:    lastName.trim(),
          email:       email.trim(),
          phone:       phone.trim() || undefined,
          country,
          subject:     subject.trim() || active.label,
          enquiryType: activeType,
          message:     message.trim(),
          consent,
          ...(metadata ? { metadata } : {}),
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Something went wrong.");
      setSubmitted(true);
      track(
        activeType === "booking"  ? "booking_request"   :
        activeType === "press"    ? "press_inquiry"      :
        activeType === "business" ? "business_inquiry"   :
        "contact_submission",
        { enquiryType: activeType, country }
      );
    } catch (err: any) {
      setErrorMsg(err.message ?? "We couldn't send your message. Please try again shortly.");
      track("form_error", { label: "contact", enquiryType: activeType });
    } finally {
      setLoading(false);
    }
  };

  function resetForm() {
    setSubmitted(false);
    setFirstName(""); setLastName(""); setEmail(""); setPhone(""); setCountry("");
    setSubject(""); setMessage(""); setConsent(false);
    setActiveType("general"); setErrorMsg(null); setErrors({});
    // Booking fields
    setCompany(""); setEventType(""); setEventDate(""); setVenue("");
    setEstimatedAudience(""); setBudgetRange(""); setWebsite("");
  }

  return (
    <div className="rounded-xl border border-white/[0.07] overflow-hidden" style={{ background: "var(--color-midnight)" }}>
      {/* Top accent */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

      <div className="p-8 md:p-10">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Enquiry type selector */}
              <div className="mb-8">
                <p className="text-white/35 text-xs font-bold tracking-[0.35em] uppercase mb-4" id="enquiry-type-label">Inquiry Type</p>
                <div role="radiogroup" aria-labelledby="enquiry-type-label" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {enquiryTypes.map((type) => {
                    const TIcon = type.icon;
                    const isActive = activeType === type.id;
                    return (
                      <motion.button
                        key={type.id}
                        type="button"
                        role="radio"
                        aria-checked={isActive}
                        onClick={() => setActiveType(type.id)}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border text-center transition-all duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                          isActive
                            ? "border-gold/40 bg-gold/[0.08] text-gold shadow-glow-gold"
                            : "border-white/[0.06] bg-transparent text-white/35 hover:text-white/60 hover:border-white/12"
                        }`}
                      >
                        <TIcon size={16} />
                        <span className="text-xs font-bold uppercase tracking-wide leading-none">{type.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/28 text-xs mt-3 flex items-center gap-1.5"
                  >
                    <Icon size={10} className="text-gold/50" /> {active.desc}
                  </motion.p>
                </AnimatePresence>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* First + Last name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FloatingField id="firstName" label="First Name" value={firstName} onChange={setFirstName} onBlur={() => touch("firstName", firstName)} required error={errors.firstName} maxLength={80} autoComplete="given-name" />
                  <FloatingField id="lastName" label="Last Name" value={lastName} onChange={setLastName} onBlur={() => touch("lastName", lastName)} required error={errors.lastName} maxLength={80} autoComplete="family-name" />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FloatingField id="email" label="Email Address" type="email" value={email} onChange={setEmail} onBlur={() => touch("email", email)} required error={errors.email} autoComplete="email" />
                  <FloatingField id="phone" label="Phone (optional)" type="tel" value={phone} onChange={setPhone} maxLength={30} autoComplete="tel" />
                </div>

                {/* Country — dropdown */}
                <div className="relative">
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => { setCountry(e.target.value); touch("country", e.target.value); }}
                    onBlur={() => touch("country", country)}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.country}
                    aria-describedby={errors.country ? "country-error" : undefined}
                    className={`block w-full px-5 py-4 text-sm bg-white/[0.04] border rounded-xl appearance-none focus:outline-none focus:bg-white/[0.06] focus:shadow-glow-gold transition-all duration-normal ${
                      country ? "text-white" : "text-white/35"
                    } ${errors.country ? "border-red-500/50 focus:border-red-500/60" : "border-white/[0.08] focus:border-gold/50"}`}
                  >
                    <option value="" className="bg-midnight text-white/35">Country *</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c} className="bg-midnight text-white">{c}</option>
                    ))}
                  </select>
                  <ChevronRight size={13} className="absolute right-4 top-1/2 -translate-y-1/2 -rotate-90 text-white/30 pointer-events-none" aria-hidden="true" />
                  {errors.country && <p id="country-error" className="text-red-400/80 text-xs mt-1.5 px-1">{errors.country}</p>}
                </div>

                {/* Booking-specific details — shown only for booking inquiry type */}
                <AnimatePresence>
                  {activeType === "booking" && (
                    <motion.div
                      key="booking-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-5 p-5 rounded-xl border border-gold/[0.14] bg-gold/[0.025] mt-0">
                        <p className="text-gold text-[11px] font-bold tracking-[0.3em] uppercase flex items-center gap-1.5">
                          <Mic2 size={10} aria-hidden="true" /> Booking Details
                        </p>

                        {/* Company / Organization */}
                        <FloatingField id="bk-company" label="Company / Organization" value={company} onChange={setCompany} maxLength={150} />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {/* Event Type */}
                          <div className="relative">
                            <select
                              id="bk-eventType"
                              value={eventType}
                              onChange={(e) => setEventType(e.target.value)}
                              aria-label="Event Type"
                              className={`block w-full px-5 py-4 text-sm bg-white/[0.04] border border-white/[0.08] rounded-xl appearance-none focus:outline-none focus:border-gold/50 focus:bg-white/[0.06] transition-all duration-normal ${eventType ? "text-white" : "text-white/35"}`}
                            >
                              <option value="" className="bg-midnight">Event Type</option>
                              {["Concert / Festival", "Corporate Event", "Private Show", "Club Performance", "International Tour", "Brand Appearance", "Music Licensing", "Film & TV / Commercial", "Other"].map((t) => (
                                <option key={t} value={t} className="bg-midnight text-white">{t}</option>
                              ))}
                            </select>
                            <ChevronRight size={13} className="absolute right-4 top-1/2 -translate-y-1/2 -rotate-90 text-white/30 pointer-events-none" aria-hidden="true" />
                          </div>

                          {/* Event Date */}
                          <div className="relative group">
                            <input
                              type="date"
                              id="bk-eventDate"
                              value={eventDate}
                              onChange={(e) => setEventDate(e.target.value)}
                              aria-label="Event Date"
                              style={{ colorScheme: "dark" }}
                              className="block w-full px-5 pb-3 pt-6 text-white text-sm bg-white/[0.04] border border-white/[0.08] rounded-xl appearance-none focus:outline-none focus:bg-white/[0.06] focus:border-gold/50 focus:shadow-glow-gold transition-all duration-normal"
                            />
                            <label htmlFor="bk-eventDate" className="absolute text-white/35 text-xs top-2 left-5 pointer-events-none">
                              Event Date
                            </label>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {/* Venue */}
                          <FloatingField id="bk-venue" label="Venue" value={venue} onChange={setVenue} maxLength={200} />

                          {/* Estimated Audience */}
                          <div className="relative">
                            <select
                              id="bk-audience"
                              value={estimatedAudience}
                              onChange={(e) => setEstimatedAudience(e.target.value)}
                              aria-label="Estimated Audience"
                              className={`block w-full px-5 py-4 text-sm bg-white/[0.04] border border-white/[0.08] rounded-xl appearance-none focus:outline-none focus:border-gold/50 focus:bg-white/[0.06] transition-all duration-normal ${estimatedAudience ? "text-white" : "text-white/35"}`}
                            >
                              <option value="" className="bg-midnight">Estimated Audience</option>
                              {["Under 100", "100–500", "500–1,000", "1,000–5,000", "5,000–20,000", "20,000+"].map((a) => (
                                <option key={a} value={a} className="bg-midnight text-white">{a}</option>
                              ))}
                            </select>
                            <ChevronRight size={13} className="absolute right-4 top-1/2 -translate-y-1/2 -rotate-90 text-white/30 pointer-events-none" aria-hidden="true" />
                          </div>
                        </div>

                        {/* Budget Range */}
                        <div className="relative">
                          <select
                            id="bk-budget"
                            value={budgetRange}
                            onChange={(e) => setBudgetRange(e.target.value)}
                            aria-label="Budget Range"
                            className={`block w-full px-5 py-4 text-sm bg-white/[0.04] border border-white/[0.08] rounded-xl appearance-none focus:outline-none focus:border-gold/50 focus:bg-white/[0.06] transition-all duration-normal ${budgetRange ? "text-white" : "text-white/35"}`}
                          >
                            <option value="" className="bg-midnight">Budget Range</option>
                            {["Under $5,000", "$5,000–$15,000", "$15,000–$50,000", "$50,000–$100,000", "Over $100,000", "Open to Negotiation"].map((b) => (
                              <option key={b} value={b} className="bg-midnight text-white">{b}</option>
                            ))}
                          </select>
                          <ChevronRight size={13} className="absolute right-4 top-1/2 -translate-y-1/2 -rotate-90 text-white/30 pointer-events-none" aria-hidden="true" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Subject */}
                <FloatingField id="subject" label="Subject" value={subject} onChange={setSubject} onBlur={() => touch("subject", subject)} required error={errors.subject} maxLength={200} />

                {/* Message */}
                <div className="relative group">
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onBlur={() => touch("message", message)}
                    required
                    rows={5}
                    placeholder=" "
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`block w-full px-5 pb-3 pt-6 text-white text-sm bg-white/[0.04] border rounded-xl appearance-none focus:outline-none focus:bg-white/[0.06] focus:shadow-glow-gold transition-all duration-normal peer placeholder-transparent resize-none leading-relaxed ${
                      errors.message ? "border-red-500/50 focus:border-red-500/60" : "border-white/[0.08] focus:border-gold/50"
                    }`}
                  />
                  <label
                    htmlFor="message"
                    className="absolute text-white/35 duration-normal transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-gold/70 pointer-events-none text-sm"
                  >
                    Message *
                  </label>
                  <AnimatePresence>
                    {!message && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-4 left-5 right-5 text-white/18 text-xs leading-relaxed pointer-events-none peer-focus:opacity-0 transition-opacity"
                      >
                        {active.placeholder}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <div className="absolute bottom-0 left-3 right-3 h-[1px] w-0 bg-gradient-to-r from-gold/60 to-gold/30 rounded-b-xl group-focus-within:w-[calc(100%-24px)] transition-all duration-slow" />
                  {errors.message && <p id="message-error" className="text-red-400/80 text-xs mt-1.5 px-1">{errors.message}</p>}
                </div>

                {/* Honeypot — invisible to humans, filled by bots */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
                  <label htmlFor="cf-website">Website</label>
                  <input
                    type="text"
                    id="cf-website"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Consent */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => { setConsent(e.target.checked); touch("consent", e.target.checked); }}
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? "consent-error" : undefined}
                    className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/[0.04] text-gold accent-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                  />
                  <span className="text-white/45 text-xs leading-relaxed">
                    I agree to be contacted about my enquiry and consent to Kiut Music storing my information in line with the{" "}
                    <a href="/legal" className="text-gold/70 hover:text-gold underline underline-offset-2">Privacy Policy</a>. *
                  </span>
                </label>
                {errors.consent && <p id="consent-error" className="text-red-400/80 text-xs -mt-3 px-1">{errors.consent}</p>}

                {/* Error message */}
                {errorMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="text-red-400/80 text-xs text-center leading-relaxed px-2"
                  >
                    {errorMsg}
                  </motion.p>
                )}

                {/* Submit */}
                <PremiumCTAButton
                  as="button"
                  type="submit"
                  disabled={loading}
                  className="w-full"
                  iconPosition="right"
                  icon={
                    loading ? (
                      <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    ) : (
                      <Send size={13} />
                    )
                  }
                >
                  {loading ? "Sending…" : "Send Message"}
                </PremiumCTAButton>

                <p className="text-center text-white/20 text-xs tracking-[0.2em] uppercase">
                  Every message is read personally
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="py-14 flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, delay: 0.1 }}
                className="w-20 h-20 rounded-full border border-gold flex items-center justify-center mb-8 shadow-glow-gold-hover"
                style={{ background: "rgba(var(--gold-primary-rgb),0.10)" }}
              >
                <CheckCircle2 className="w-9 h-9 text-gold" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-gold mb-3">Message Sent</h3>
              <p className="text-white/45 text-sm leading-relaxed max-w-xs mb-8">
                Your message has been received. You'll hear back within 48–72 hours.
              </p>
              <button
                onClick={resetForm}
                className="text-white/30 hover:text-white/60 text-xs uppercase tracking-widest transition-colors duration-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold rounded"
              >
                Send Another Message
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Contact info card (click-to-copy / click-to-call / click-to-map) ─────────
const CHANNEL_ICONS = { management: Users, booking: Mic2, mail: Mail, press: Newspaper, social: Share2, location: MapPin, clock: Clock } as const;

function ContactInfoCard({ channel }: { channel: (typeof CONTACT_CHANNELS)[0] }) {
  const [copied, setCopied] = useState(false);
  const Icon = CHANNEL_ICONS[channel.icon];

  async function handleClick() {
    if (channel.kind === "text") return;
    if (channel.kind === "email") {
      try {
        await navigator.clipboard.writeText(channel.value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        // clipboard unavailable — mailto below still opens
      }
      if (channel.href) window.location.href = channel.href;
      return;
    }
    if (channel.href) window.open(channel.href, "_blank", "noopener,noreferrer");
  }

  const interactive = channel.kind !== "text";

  return (
    <motion.div
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? handleClick : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } } : undefined}
      whileHover={interactive ? { y: -3 } : undefined}
      className={`group flex items-start gap-4 p-5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-gold/22 hover:bg-gold/[0.03] transition-all duration-normal ${interactive ? "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold" : ""}`}
      aria-label={interactive ? `${channel.label}: ${channel.value} — click to ${channel.kind === "email" ? "copy" : "open"}` : undefined}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center border border-gold/18 flex-shrink-0 group-hover:border-gold/35 transition-colors duration-fast"
        style={{ background: "rgba(var(--gold-primary-rgb),0.06)" }}
      >
        <Icon size={16} className="text-gold" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-sm font-bold uppercase tracking-tight text-white mb-1 group-hover:text-gold transition-colors duration-fast">
          {channel.label}
        </h3>
        <p className="text-white/35 text-xs leading-relaxed mb-1">{channel.description}</p>
        <p className={`text-white/25 text-[11px] ${channel.id === "location" ? "break-words" : "truncate"}`}>
          {channel.value}
        </p>
      </div>
      {channel.kind === "email" && (
        <span className="flex-shrink-0 text-white/20 group-hover:text-gold/60 transition-colors duration-fast" aria-hidden="true">
          {copied ? <Check size={13} className="text-gold" /> : <Copy size={13} />}
        </span>
      )}
    </motion.div>
  );
}

// ─── Booking category card ─────────────────────────────────────────────────────
function BookingCategoryCard({ category, index }: { category: (typeof BOOKING_CATEGORIES)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.015 }}
      className="p-5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-gold/25 hover:bg-gold/[0.03] transition-all duration-normal"
    >
      <p className="font-display text-sm font-bold uppercase tracking-tight text-white mb-1.5">{category.label}</p>
      <p className="text-white/32 text-xs leading-relaxed">{category.description}</p>
    </motion.div>
  );
}

// ─── Social Card ──────────────────────────────────────────────────────────────
function SocialCard({ link, index }: { link: typeof socialLinks[0]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-20px" });
  const Icon = link.icon;

  return (
    <motion.a
      ref={ref}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${link.label} — ${link.sub}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`group relative flex items-center gap-4 p-5 rounded-xl border border-white/[0.07] bg-gradient-to-br ${link.color} ${link.border} hover:shadow-lg transition-all duration-normal`}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.07] text-white/45 ${link.iconColor} transition-colors duration-fast flex-shrink-0`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-white/75 text-sm font-semibold group-hover:text-white transition-colors duration-fast truncate">{link.label}</p>
        <p className="text-white/28 text-xs truncate">{link.sub}</p>
      </div>
      <ArrowRight size={13} className="ml-auto text-white/15 group-hover:text-white/40 transition-colors duration-fast flex-shrink-0" />
    </motion.a>
  );
}

// ─── Lazy-loaded location map ──────────────────────────────────────────────────
function LocationMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });
  const src = `https://www.google.com/maps?q=${encodeURIComponent(LOCATION_MAP_QUERY)}&output=embed`;

  return (
    <div ref={ref} className="relative w-full aspect-[16/10] sm:aspect-[16/8] rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
      {inView ? (
        <iframe
          title="Kiut Music — artist region map"
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full grayscale-[0.4] contrast-[1.05] opacity-90"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center gap-2 text-white/25 text-xs uppercase tracking-widest">
          <MapPin size={14} /> Loading map…
        </div>
      )}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/[0.06] rounded-xl" />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Contact() {
  useSEO(ROUTE_SEO["/contact"]);

  return (
    <div className="min-h-screen bg-midnight text-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-gold/[0.05] blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-gold/[0.03] blur-[100px] rounded-full" />
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(rgba(var(--gold-primary-rgb),0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--gold-primary-rgb),0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/25 bg-gold/[0.06] backdrop-blur-sm mb-7">
              <Mail size={11} className="text-gold" />
              <span className="text-gold text-xs font-bold tracking-[0.35em] uppercase">Contact & Community</span>
            </div>
            <h1 className="font-display text-[clamp(3rem,10vw,7rem)] font-bold uppercase tracking-tight leading-[0.92] text-white mb-6">
              Contact <span className="text-gold">Kiut Music</span>
            </h1>
            <p className="font-editorial italic text-white/45 text-lg font-light max-w-lg leading-relaxed">
              Book performances, request collaborations, connect with management, or simply get in touch.
            </p>
          </motion.div>

          {/* Community stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-white/[0.06]"
          >
            {communityStats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4">
                {i > 0 && <div className="w-px h-8 bg-white/[0.08] hidden sm:block" />}
                <div>
                  <p className="font-display text-2xl font-bold text-gold">{stat.value}</p>
                  <p className="text-white/30 text-xs uppercase tracking-widest font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT — Form + Sidebar ────────────────────────────────── */}
      <section className="py-12 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">

            {/* LEFT — Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-8">
                <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/50" /> Send a Message
                </p>
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white">
                  Get In <span className="text-gold">Touch</span>
                </h2>
              </div>
              <ContactForm />
            </motion.div>

            {/* RIGHT — Contact channels + Response info */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 lg:sticky lg:top-28"
            >
              {/* Contact channels */}
              <div>
                <p className="text-white/35 text-xs font-bold tracking-[0.4em] uppercase mb-4">Artist Contact Information</p>
                <div className="space-y-3">
                  {CONTACT_CHANNELS.map((channel) => (
                    <ContactInfoCard key={channel.id} channel={channel} />
                  ))}
                </div>
              </div>

              {/* Response time card */}
              <div className="p-6 rounded-xl border border-gold/15 bg-gold/[0.04]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                  </span>
                  <span className="text-gold text-xs font-bold tracking-[0.35em] uppercase">Response Time</span>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">
                  All messages are read personally. Expect a reply within{" "}
                  <span className="text-white/75 font-medium">48–72 hours</span> on business days.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BOOKING ──────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-3 flex items-center gap-2">
              <Mic2 size={11} className="text-gold" /> Book Kiut
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              Available <span className="text-gold">For</span>
            </h2>
            <p className="text-white/35 text-sm mt-3 max-w-lg leading-relaxed">
              From intimate private shows to international festival stages — every booking is coordinated directly through management.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {BOOKING_CATEGORIES.map((category, i) => (
              <BookingCategoryCard key={category.id} category={category} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ─────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-3 flex items-center gap-2">
                <MapPin size={11} className="text-gold" /> Location
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6">
                Where To <span className="text-gold">Find Kiut</span>
              </h2>
              <div className="space-y-4">
                {LOCATION_INFO.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4 py-3 border-b border-white/[0.06]">
                    <span className="text-white/35 text-xs uppercase tracking-widest font-medium flex-shrink-0">{item.label}</span>
                    <span className="min-w-0 text-white/70 text-sm text-right break-words">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <LocationMap />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL LINKS ─────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05] relative overflow-hidden" style={{ background: "var(--color-midnight)" }}>
        <KiutWatermark size={720} />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <div>
              <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-3 flex items-center gap-2">
                <Globe size={11} className="text-gold" /> Find Kiut
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
                Social <span className="text-gold">Platforms</span>
              </h2>
              <p className="text-white/35 text-sm mt-3 max-w-md leading-relaxed">
                Stream, follow, and stay up to date — all of Kiut's platforms in one place.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {socialLinks.map((link, i) => (
              <SocialCard key={link.label} link={link} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <p className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-3 flex items-center justify-center gap-2">
              <HelpCircle size={11} className="text-gold" /> FAQ
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              Common <span className="text-gold">Questions</span>
            </h2>
          </motion.div>
          <FAQAccordion items={CONTACT_FAQ} idPrefix="contact-faq" />
        </div>
      </section>

      {/* ── COMMUNITY CTA ────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Newsletter card */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-xl border border-gold/22 overflow-hidden p-10 flex flex-col"
              style={{ background: "linear-gradient(145deg, rgba(var(--gold-primary-rgb),0.07) 0%, var(--color-midnight) 60%)" }}
            >
              <div className="absolute top-0 left-0 w-[300px] h-[200px] bg-gold/[0.06] blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10 flex flex-col flex-1">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border border-gold/25 mb-6"
                  style={{ background: "rgba(var(--gold-primary-rgb),0.08)" }}
                >
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <p className="text-gold text-xs font-bold tracking-[0.35em] uppercase mb-3">Inner Circle</p>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-3 leading-snug">
                  Join the Newsletter
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8 flex-1">
                  New music, exclusive drops, tour announcements, and behind-the-scenes content — before anyone else.
                </p>
                <PremiumCTAButton as="link" href="/newsletter" className="self-start" icon={<ArrowRight size={13} />} iconPosition="right">
                  Subscribe Free
                </PremiumCTAButton>
              </div>
            </motion.div>

            {/* Fan community card */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-xl border border-white/[0.07] overflow-hidden p-10 flex flex-col"
              style={{ background: "var(--color-midnight)" }}
            >
              <div className="relative z-10 flex flex-col flex-1">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 mb-6"
                  style={{ background: "rgba(var(--white-rgb),0.04)" }}
                >
                  <Users className="w-5 h-5 text-white/50" />
                </div>
                <p className="text-white/30 text-xs font-bold tracking-[0.35em] uppercase mb-3">Community</p>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-3 leading-snug">
                  Follow the Journey
                </h3>
                <p className="text-white/38 text-sm leading-relaxed mb-8 flex-1">
                  From the studio to the stage — follow along on social media for the real-time story of Kiut's creative journey.
                </p>

                {/* Social icon row */}
                <div className="flex items-center gap-3 flex-wrap">
                  <SocialIconGroup />
                  <motion.a
                    href={LINKTREE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 2 }}
                    className="flex items-center gap-1.5 text-white/25 hover:text-white/50 text-xs font-medium uppercase tracking-widest transition-colors duration-fast ml-1"
                  >
                    All Platforms <ChevronRight size={11} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Heart sign-off ───────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/[0.04] text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-5 h-5 text-gold/40" fill="rgba(var(--gold-primary-rgb),0.4)" />
          </motion.div>
          <p className="text-white/18 text-xs uppercase tracking-[0.35em] font-medium">
            Made with love · Kiut Music Worldwide
          </p>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
