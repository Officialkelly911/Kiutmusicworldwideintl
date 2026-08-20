export const SEO_SITE_NAME = "Kiut Music Worldwide";
export const SEO_DEFAULT_IMAGE = "https://kiutmusic.com/og-image.png";
export const SEO_ROBOTS = "index, follow";
export const SEO_NOT_FOUND_ROBOTS = "noindex, follow";

export const PUBLIC_ROUTES = [
  "/",
  "/music",
  "/videos",
  "/about",
  "/tour",
  "/newsletter",
  "/contact",
  "/legal",
] as const;

export type PublicRoute = (typeof PUBLIC_ROUTES)[number];

export interface RouteSEOMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogType: "website";
  robots?: string;
}

export const ROUTE_SEO = {
  "/": {
    title: "Kiut Music Worldwide | Afro-Caribbean Sound. Global Energy.",
    description: "Stream music, watch videos, and follow the journey of Nigerian-American artist Kiut — Afro-Caribbean sound with global energy.",
    canonical: "https://kiutmusic.com/",
    ogImage: SEO_DEFAULT_IMAGE,
    ogType: "website",
  },
  "/music": {
    title: "Music | Kiut Music Worldwide",
    description: "Stream all albums and singles from Nigerian-American artist Kiut — Afro-Caribbean sound available on Spotify, Apple Music, Audiomack, and everywhere.",
    canonical: "https://kiutmusic.com/music",
    ogImage: SEO_DEFAULT_IMAGE,
    ogType: "website",
  },
  "/videos": {
    title: "Videos | Kiut Music Worldwide",
    description: "Watch official music videos, behind-the-scenes footage, and live performances from Nigerian-American artist Kiut.",
    canonical: "https://kiutmusic.com/videos",
    ogImage: SEO_DEFAULT_IMAGE,
    ogType: "website",
  },
  "/about": {
    title: "About | Kiut Music Worldwide",
    description: "Nigerian-American artist Kiut bridges Lagos and the world — discover his story, journey, and the sound behind Kiut Music Worldwide.",
    canonical: "https://kiutmusic.com/about",
    ogImage: SEO_DEFAULT_IMAGE,
    ogType: "website",
  },
  "/tour": {
    title: "Tour | Kiut Music Worldwide",
    description: "See upcoming tour dates and live shows from Nigerian-American artist Kiut, and book Kiut for your city, festival, or venue.",
    canonical: "https://kiutmusic.com/tour",
    ogImage: SEO_DEFAULT_IMAGE,
    ogType: "website",
  },
  "/newsletter": {
    title: "Join the Kiut Music Newsletter",
    description: "Receive exclusive releases, tour announcements, behind-the-scenes updates, and premium content from Kiut Music.",
    canonical: "https://kiutmusic.com/newsletter",
    ogImage: SEO_DEFAULT_IMAGE,
    ogType: "website",
  },
  "/contact": {
    title: "Contact Kiut Music",
    description: "Book Kiut, request interviews, business partnerships, or connect directly with the Kiut Music team.",
    canonical: "https://kiutmusic.com/contact",
    ogImage: SEO_DEFAULT_IMAGE,
    ogType: "website",
  },
  "/legal": {
    title: "Legal | Kiut Music Worldwide",
    description: "Privacy policy and terms of service for Kiut Music Worldwide.",
    canonical: "https://kiutmusic.com/legal",
    ogImage: SEO_DEFAULT_IMAGE,
    ogType: "website",
  },
} as const satisfies Record<PublicRoute, RouteSEOMeta>;

// Keep the server-delivered document metadata aligned with the existing branded
// client-side 404 page. The noindex directive prevents arbitrary invalid URLs
// from being treated as indexable homepage equivalents before React mounts.
export const NOT_FOUND_SEO = {
  title: "Page Not Found | Kiut Music Worldwide",
  description: "The Kiut Music page you're looking for could not be found.",
  canonical: "https://kiutmusic.com/404",
  ogImage: SEO_DEFAULT_IMAGE,
  ogType: "website",
  robots: SEO_NOT_FOUND_ROBOTS,
} as const satisfies RouteSEOMeta;

export const ROUTE_SEO_PLACEHOLDER = "<!-- KIUT_ROUTE_SEO -->";
export const ROUTE_SEO_START_MARKER = "<!-- KIUT_ROUTE_SEO_START -->";
export const ROUTE_SEO_END_MARKER = "<!-- KIUT_ROUTE_SEO_END -->";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

/**
 * Strip a request's query/hash components and normalize trailing slashes. This
 * intentionally does not alter case or internal slashes: those are distinct,
 * invalid URLs rather than aliases for public pages.
 */
export function normalizePublicRoute(pathname = "/"): string {
  const pathWithoutQuery = pathname.split(/[?#]/, 1)[0] || "/";
  return pathWithoutQuery === "/"
    ? "/"
    : pathWithoutQuery.replace(/\/+$/, "") || "/";
}

export function getPublicRoute(pathname = "/"): PublicRoute | undefined {
  const normalizedPath = normalizePublicRoute(pathname);

  if (Object.prototype.hasOwnProperty.call(ROUTE_SEO, normalizedPath)) {
    return normalizedPath as PublicRoute;
  }
}

export function isPublicRoute(pathname = "/"): boolean {
  return getPublicRoute(pathname) !== undefined;
}

export function resolveRouteSEO(pathname = "/"): RouteSEOMeta {
  const publicRoute = getPublicRoute(pathname);
  return publicRoute ? ROUTE_SEO[publicRoute] : NOT_FOUND_SEO;
}

export function renderRouteSEOTags(meta: RouteSEOMeta): string {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const canonical = escapeHtml(meta.canonical);
  const ogImage = escapeHtml(meta.ogImage);
  const ogType = escapeHtml(meta.ogType);
  const robots = escapeHtml(meta.robots ?? SEO_ROBOTS);

  return [
    ROUTE_SEO_START_MARKER,
    `    <title>${title}</title>`,
    `    <meta name="description" content="${description}" />`,
    `    <link rel="canonical" href="${canonical}" />`,
    `    <meta name="robots" content="${robots}" />`,
    `    <meta property="og:type" content="${ogType}" />`,
    `    <meta property="og:title" content="${title}" />`,
    `    <meta property="og:description" content="${description}" />`,
    `    <meta property="og:url" content="${canonical}" />`,
    `    <meta property="og:image" content="${ogImage}" />`,
    '    <meta property="og:image:width" content="1200" />',
    '    <meta property="og:image:height" content="630" />',
    `    <meta property="og:site_name" content="${SEO_SITE_NAME}" />`,
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:title" content="${title}" />`,
    `    <meta name="twitter:description" content="${description}" />`,
    `    <meta name="twitter:image" content="${ogImage}" />`,
    ROUTE_SEO_END_MARKER,
  ].join("\n");
}