/**
 * Kiut Music — Contact page data.
 * Single source of truth for contact channels, booking categories, and the
 * Contact FAQ. Update here to reflect changes across the entire page.
 *
 * Note on contact channels: Kiut Music currently operates a single public
 * inbox (contact@kiutmusic.com, already used sitewide — see Legal.tsx).
 * Rather than invent separate department addresses that don't exist, every
 * department card routes to that same inbox with a pre-filled mailto subject
 * so messages can still be triaged by team. Swap in dedicated addresses here
 * the moment they exist — nothing else needs to change.
 */
import { LINKTREE_URL } from "./social";

export const CONTACT_EMAIL = "contact@kiutmusic.com";
export const CONTACT_LOCATION_ADDRESS = "5101 Santa Monica Blvd, Los Angeles, CA 90029, United States";

export interface ContactChannel {
  id: string;
  label: string;
  description: string;
  /** Value shown in the card and copied to the clipboard on click. */
  value: string;
  /** "email" | "tel" | "link" — determines the click action. */
  kind: "email" | "tel" | "link" | "text";
  href?: string;
  icon: "management" | "booking" | "mail" | "press" | "social" | "location" | "clock";
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "management",
    label: "Management",
    description: "Career, partnerships & general management enquiries.",
    value: CONTACT_EMAIL,
    kind: "email",
    href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Management Enquiry")}`,
    icon: "management",
  },
  {
    id: "booking",
    label: "Booking",
    description: "Shows, festivals & performance bookings.",
    value: CONTACT_EMAIL,
    kind: "email",
    href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Booking Enquiry")}`,
    icon: "booking",
  },
  {
    id: "business",
    label: "Business Email",
    description: "Licensing, brand partnerships & commercial deals.",
    value: CONTACT_EMAIL,
    kind: "email",
    href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Business Enquiry")}`,
    icon: "mail",
  },
  {
    id: "press",
    label: "Press",
    description: "Media, interviews & press accreditation.",
    value: CONTACT_EMAIL,
    kind: "email",
    href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Press Enquiry")}`,
    icon: "press",
  },
  {
    id: "social",
    label: "Social Media",
    description: "Every official Kiut Music profile in one place.",
    value: "@kiut_rababag",
    kind: "link",
    href: LINKTREE_URL,
    icon: "social",
  },
  {
    id: "location",
    label: "Location",
    description: "Based in Los Angeles, California — available worldwide.",
    value: CONTACT_LOCATION_ADDRESS,
    kind: "link",
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_LOCATION_ADDRESS)}`,
    icon: "location",
  },
  {
    id: "hours",
    label: "Operating Hours",
    description: "Response times for all enquiries.",
    value: "Mon–Fri · 9:00–18:00 WAT",
    kind: "text",
    icon: "clock",
  },
];

// ─── Booking categories ────────────────────────────────────────────────────────
export interface BookingCategory {
  id: string;
  label: string;
  description: string;
}

export const BOOKING_CATEGORIES: BookingCategory[] = [
  { id: "corporate",     label: "Corporate Events",       description: "Brand activations & corporate functions." },
  { id: "festivals",     label: "Festivals",              description: "Main stage & festival circuit slots." },
  { id: "private",       label: "Private Shows",          description: "Weddings, private parties & celebrations." },
  { id: "club",          label: "Club Performances",      description: "Nightlife sets & club appearances." },
  { id: "international", label: "International Tours",    description: "Multi-city touring across regions." },
  { id: "brand",         label: "Brand Partnerships",     description: "Sponsorships & long-term collaborations." },
  { id: "appearances",   label: "Appearances",            description: "Public appearances & guest spots." },
  { id: "licensing",     label: "Music Licensing",        description: "Sync licensing for media & advertising." },
  { id: "film",          label: "Film & TV",               description: "Original music & scoring for screen." },
  { id: "commercial",    label: "Commercial Campaigns",   description: "Ad campaigns & commercial features." },
];

// ─── Location / territory info ─────────────────────────────────────────────────
export interface LocationInfo {
  label: string;
  value: string;
}

export const LOCATION_INFO: LocationInfo[] = [
  { label: "Artist Region",              value: "Los Angeles, California, United States 🇺🇸" },
  { label: "Management Office",          value: "Los Angeles, California, United States 🇺🇸" },
  { label: "Primary Booking Territory",  value: "West Africa, Europe & North America" },
  { label: "International Availability", value: "Worldwide, by arrangement" },
];

export const LOCATION_MAP_QUERY = CONTACT_LOCATION_ADDRESS;

// ─── Contact FAQ ────────────────────────────────────────────────────────────────
export const CONTACT_FAQ = [
  { q: "How quickly will I get a response?", a: "We aim to respond to every enquiry within 48–72 hours. Booking and press enquiries with a clear date or deadline are prioritized." },
  { q: "What should I include in a booking enquiry?", a: "Event date, location, venue capacity, event type, and budget range help our team respond with accurate availability and pricing much faster." },
  { q: "Can I license Kiut's music for a project?", a: "Yes. Select 'Licensing' as your inquiry type and describe the project, territory, and intended use — our team will follow up with terms." },
  { q: "How do I request press or media access?", a: "Select 'Press' as your inquiry type and include your outlet, the story angle, and your deadline. We'll respond with accreditation or interview details." },
  { q: "Do you take collaboration requests from other artists?", a: "Yes — select 'Collaboration' and share a link to your work along with your idea. Our team reviews every submission." },
  { q: "Is Kiut available for international bookings?", a: "Yes. Kiut Music tours and performs internationally; all travel and logistics are coordinated through management once a booking is confirmed." },
];
