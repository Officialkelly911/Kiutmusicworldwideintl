import type { RouteSEOMeta } from "./seo";

export const KIUT_ARTIST_ID = "https://kiutmusic.com/#artist";
export const KIUT_WEBSITE_ID = "https://kiutmusic.com/#website";

const KIUT_ARTIST = {
  "@type": "MusicGroup",
  "@id": KIUT_ARTIST_ID,
  name: "Kiut",
  alternateName: "Kiut Music",
  description: "Nigerian-American Afro-Caribbean music artist blending Afrobeat, Dancehall, and R&B into a signature sound that crosses continents.",
  url: "https://kiutmusic.com",
  image: "https://kiutmusic.com/og-image.png",
  logo: "https://kiutmusic.com/brand/kiut-monogram.png",
  genre: ["Afrobeats", "Dancehall", "R&B", "Afro-Caribbean", "Afropop"],
  foundingLocation: { "@type": "Place", name: "United States" },
  sameAs: [
    "https://music.apple.com/us/artist/kiut/1484593132",
    "https://audiomack.com/kiutraba",
    "https://audiomack.com/kiutrabatv",
    "https://linktr.ee/kiutmusic",
    "https://dreamplanet.org/user/61",
  ],
} as const;

const KIUT_WEBSITE = {
  "@type": "WebSite",
  "@id": KIUT_WEBSITE_ID,
  url: "https://kiutmusic.com/",
  name: "Kiut Music Worldwide",
  publisher: { "@id": KIUT_ARTIST_ID },
} as const;

export interface StructuredAlbumInput {
  id: string;
  title: string;
  image: string;
  released: string;
  releasedAt: string;
  genre: string;
  link: string;
  trackCount: number;
}

export interface StructuredTrackInput {
  id: number;
  title: string;
  artist: string;
  album: string;
  albumId: string;
  albumArt: string;
  released?: string;
  releasedAt?: string;
  duration?: string;
}

export interface StructuredVideoInput {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  youtubeId: string;
  date?: string;
}

export interface StructuredEventInput {
  id: string;
  city: string;
  country: string;
  venue: string;
  date: string;
  time: string;
  status: string;
  description: string;
}

export interface StructuredDataOptions {
  albums?: readonly StructuredAlbumInput[];
  tracks?: readonly StructuredTrackInput[];
  videos?: readonly StructuredVideoInput[];
  events?: readonly StructuredEventInput[];
}

function absoluteUrl(pathOrUrl: string): string {
  return pathOrUrl.startsWith("http") ? pathOrUrl : `https://kiutmusic.com${pathOrUrl}`;
}

function isCompleteDate(date?: string, isoDate?: string): date is string {
  return Boolean(
    isExactDateLabel(date) &&
    isoDate &&
    /^\d{4}-\d{2}-\d{2}$/.test(isoDate),
  );
}

function isExactDateLabel(date?: string): date is string {
  return Boolean(date && /^[A-Z][a-z]{2} \d{1,2}, \d{4}$/.test(date));
}

function durationToIso(duration?: string): string | undefined {
  const match = duration?.match(/^(\d+):([0-5]\d)$/);
  if (!match) return undefined;
  return `PT${Number(match[1])}M${match[2]}S`;
}

function albumId(albumId: string): string {
  return `https://kiutmusic.com/music#album-${albumId}`;
}

function recordingId(trackId: number): string {
  return `https://kiutmusic.com/music#recording-${trackId}`;
}

function videoId(youtubeId: string): string {
  return `https://kiutmusic.com/videos#video-${youtubeId}`;
}

function eventId(showId: string): string {
  return `https://kiutmusic.com/tour#event-${showId}`;
}

function toAlbums(albums: readonly StructuredAlbumInput[], pageId: string) {
  return albums
    .filter((album) => isCompleteDate(album.released, album.releasedAt))
    .map((album) => ({
      "@type": "MusicAlbum",
      "@id": albumId(album.id),
      name: album.title,
      byArtist: { "@id": KIUT_ARTIST_ID },
      image: absoluteUrl(album.image),
      datePublished: album.releasedAt,
      genre: album.genre,
      numTracks: album.trackCount,
      sameAs: album.link,
      mainEntityOfPage: { "@id": pageId },
    }));
}

function toRecordings(
  tracks: readonly StructuredTrackInput[],
  albums: readonly StructuredAlbumInput[],
  pageId: string,
) {
  const emittedAlbumIds = new Set(
    albums
      .filter((album) => isCompleteDate(album.released, album.releasedAt))
      .map((album) => album.id),
  );

  return tracks
    .filter((track) => isCompleteDate(track.released, track.releasedAt) && durationToIso(track.duration))
    .map((track) => ({
      "@type": "MusicRecording",
      "@id": recordingId(track.id),
      name: track.title,
      byArtist: { "@id": KIUT_ARTIST_ID },
       ...(emittedAlbumIds.has(track.albumId) ? { inAlbum: { "@id": albumId(track.albumId) } } : {}),
      image: absoluteUrl(track.albumArt),
      datePublished: track.releasedAt,
      duration: durationToIso(track.duration),
      mainEntityOfPage: { "@id": pageId },
    }));
}

function toVideos(videos: readonly StructuredVideoInput[], pageId: string) {
  return videos.map((video) => ({
    "@type": "VideoObject",
    "@id": videoId(video.youtubeId),
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    creator: { "@id": KIUT_ARTIST_ID },
    mainEntityOfPage: { "@id": pageId },
  }));
}

function toEvents(events: readonly StructuredEventInput[], pageId: string) {
  return events
    .filter((event) =>
      event.status === "announced" &&
      isExactDateLabel(event.date) &&
      /^\d{1,2}:[0-5]\d [AP]M$/.test(event.time) &&
      event.venue !== "To Be Announced",
    )
    .map((event) => {
      const dateMatch = event.date.match(/^([A-Z][a-z]{2}) (\d{1,2}), (\d{4})$/);
      const timeMatch = event.time.match(/^(\d{1,2}):([0-5]\d) ([AP]M)$/);
      if (!dateMatch || !timeMatch) return null;
      const [, month, day, year] = dateMatch;
      const [, hour, minute, period] = timeMatch;
      const monthNumber = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month) + 1;
      let hourNumber = Number(hour);
      if (period === "PM" && hourNumber !== 12) hourNumber += 12;
      if (period === "AM" && hourNumber === 12) hourNumber = 0;

      return {
        "@type": "Event",
        "@id": eventId(event.id),
        name: `Kiut Music — ${event.city}`,
        description: event.description,
        startDate: `${year}-${String(monthNumber).padStart(2, "0")}-${day.padStart(2, "0")}T${String(hourNumber).padStart(2, "0")}:${minute}:00`,
        location: {
          "@type": "Place",
          name: event.venue,
          address: {
            "@type": "PostalAddress",
            addressLocality: event.city,
            addressCountry: event.country,
          },
        },
        performer: { "@id": KIUT_ARTIST_ID },
        organizer: { "@id": KIUT_ARTIST_ID },
        mainEntityOfPage: { "@id": pageId },
      };
    })
    .filter((event): event is NonNullable<typeof event> => event !== null);
}

export function buildStructuredData(
  meta: RouteSEOMeta,
  options: StructuredDataOptions = {},
): Record<string, unknown> {
  const pageId = `${meta.canonical}#webpage`;
  const graph: Record<string, unknown>[] = [
    KIUT_ARTIST,
    KIUT_WEBSITE,
    {
      "@type": "WebPage",
      "@id": pageId,
      url: meta.canonical,
      name: meta.title,
      description: meta.description,
      isPartOf: { "@id": KIUT_WEBSITE_ID },
      about: { "@id": KIUT_ARTIST_ID },
    },
  ];

  if (options.albums) graph.push(...toAlbums(options.albums, pageId));
  if (options.tracks && options.albums) graph.push(...toRecordings(options.tracks, options.albums, pageId));
  if (options.videos) graph.push(...toVideos(options.videos, pageId));
  if (options.events) graph.push(...toEvents(options.events, pageId));

  return { "@context": "https://schema.org", "@graph": graph };
}

export function buildMusicStructuredData(
  meta: RouteSEOMeta,
  albums: readonly StructuredAlbumInput[],
  tracks: readonly StructuredTrackInput[],
) {
  return buildStructuredData(meta, { albums, tracks });
}

export function buildVideosStructuredData(
  meta: RouteSEOMeta,
  videos: readonly StructuredVideoInput[],
) {
  return buildStructuredData(meta, { videos });
}

export function buildTourStructuredData(
  meta: RouteSEOMeta,
  events: readonly StructuredEventInput[],
) {
  return buildStructuredData(meta, { events });
}

export const STRUCTURED_DATA_PLACEHOLDER = "<!-- KIUT_STRUCTURED_DATA -->";
export const STRUCTURED_DATA_START_MARKER = "<!-- KIUT_STRUCTURED_DATA_START -->";
export const STRUCTURED_DATA_END_MARKER = "<!-- KIUT_STRUCTURED_DATA_END -->";

export function renderStructuredDataScript(data: Record<string, unknown>): string {
  return [
    STRUCTURED_DATA_START_MARKER,
    `    <script id="kiut-structured-data" type="application/ld+json">${JSON.stringify(data)}</script>`,
    STRUCTURED_DATA_END_MARKER,
  ].join("\n");
}