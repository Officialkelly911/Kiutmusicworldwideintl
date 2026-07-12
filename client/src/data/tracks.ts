/**
 * Kiut Music — Master Catalogue
 *
 * Single source of truth for all track and album data.
 * Every music-related component imports from here — never hardcode URLs or
 * metadata in individual pages.
 *
 * ─── Adding a new track ────────────────────────────────────────────────────────
 * 1. Append a new entry to ALL_TRACKS below.
 * 2. If it belongs to a new release, add an AlbumMeta entry to ALBUMS.
 * 3. Set url to null until the audio file is available.
 *
 * ─── Audio file convention ─────────────────────────────────────────────────────
 * Files live in client/public/audio/ and are served at /audio/<filename>.
 * Use clean, URL-safe slugs: makosa.mp3  |  praya-request.mp3  |  tgif.mp3
 * Drop the file with the matching name → the player picks it up automatically.
 * Set url: null when no file exists — the UI shows streaming links instead.
 */

import {
  SPOTIFY_ARTIST_URL,
  APPLE_MUSIC_ARTIST_URL,
  AUDIOMACK_URL,
  GOOD_LIFE_EP_LINK,
  SOFA_EP_LINK,
  ANNOUNCE_LINK,
  ELIGIBLE_EP_LINK,
  LINKTREE_URL,
} from "./social";

// ─── Streaming link map ────────────────────────────────────────────────────────
export interface StreamingLinks {
  spotify?:   string;
  apple?:     string;
  audiomack?: string;
  youtube?:   string;
  boomplay?:  string;
}

// ─── Single track ──────────────────────────────────────────────────────────────
export interface Track {
  id:         number;
  /** Display artist credit, e.g. "Kiut" or "Kiut ft. De Sol" */
  title:      string;
  artist:     string;
  /** Featured artists as a structured list, e.g. ["De Sol"] */
  featuring?: string[];
  /** Display name of the parent release */
  album:      string;
  /** URL-safe slug matching an AlbumMeta.id */
  albumId:    string;
  albumArt:   string;
  albumType:  "album" | "ep" | "project" | "single" | "deluxe";
  /** Human-readable release date: "Oct 30, 2025" */
  released:   string;
  /** ISO date for sorting: "2025-10-30" */
  releasedAt: string;
  /** Duration string: "3:35" */
  duration:   string;
  /**
   * Local audio path, e.g. "/audio/makosa.mp3".
   * Drop the file into client/public/audio/ using this exact filename.
   * null = no file yet — player gracefully opens streaming link instead.
   */
  url:        string | null;
  /** Per-track streaming URLs; falls back to album-level via getTrackStreamingUrl() */
  streaming:  StreamingLinks;
  /** YouTube music video / visualizer ID for cross-linking with the Videos page */
  youtubeVideoId?: string;
  lyrics?:    string;
  genre?:     string;
  isExplicit?: boolean;
  /** Marks the newest release for hero/featured highlighting */
  isLatest?:  boolean;
}

// ─── Album / EP / Project metadata ────────────────────────────────────────────
export interface AlbumMeta {
  /** URL-safe slug. Must be unique across ALBUMS, e.g. "good-life-ep" */
  id:              string;
  title:           string;
  type:            "album" | "ep" | "project" | "single" | "deluxe";
  image:           string;
  /** Human-readable: "Oct 30, 2025" */
  released:        string;
  /** ISO for sorting: "2025-10-30" */
  releasedAt:      string;
  /** Full display year string (matches Music.tsx album grid): "Oct 30, 2025" */
  year:            string;
  /** Short year for compact display: "2025" */
  yearShort:       string;
  genre:           string;
  /** Primary smartlink / Linktree for this release */
  link:            string;
  /** Album-level streaming URLs (used as fallback for tracks without per-track links) */
  streaming:       StreamingLinks;
  /** Platform keys to show as badges on the album card */
  platforms:       Array<keyof StreamingLinks>;
  /**
   * Official track count for this release.
   * May exceed ALL_TRACKS entries while the catalogue is being populated.
   */
  trackCount:      number;
  /**
   * ID of the track used for hover preview on AlbumCard.
   * Resolved via getAlbumPreviewAudio() — automatically uses that track's url field.
   */
  previewTrackId?: number;
}

// ─── Track group (for Music page list rendering) ───────────────────────────────
export interface TrackGroup {
  album:  AlbumMeta;
  /** Convenience alias: album.title */
  label:  string;
  /** Convenience alias: album.year */
  year:   string;
  /** Convenience alias: album.image */
  image:  string;
  tracks: Track[];
}

// ─── Artwork paths ─────────────────────────────────────────────────────────────
// Import these in any component that needs artwork paths — never hardcode them.
// A single rename here propagates everywhere automatically.
export const GOOD_LIFE_EP_ART    = "/assets/images/Good_Life_EP_1767961904057.webp";
export const SOFA_EP_ART         = "/assets/images/SOFA_EP_1767961904056.webp";
export const ANNOUNCE_ART        = "/assets/images/announce-cover.webp";
export const ELIGIBLE_EP_ART     = "/assets/images/KIUT_ELIGIBLE_EP_1767961904056.webp";
export const CONFAM_BOY_ART      = "/assets/images/confam-boy-cover.webp";
export const PRAYA_REQUEST_ART   = "/assets/images/praya-request-cover.webp";
export const CHIKITO_ART         = "/assets/images/chikito-cover.webp";
export const GOOD_LIFE_COVER_ALT = "/assets/images/Good_Life_EP_cover_1783591396949.webp";

// ─── Master Track Catalogue ────────────────────────────────────────────────────
// Replace placeholder entries with the official tracklist as files arrive.
// To add audio: drop the file into client/public/audio/ using the url path below.
// All components update automatically — no other code changes needed.
export const ALL_TRACKS: Track[] = [

  // ── Good Life EP — Oct 30, 2025 ─────────────────────────────────────────
  {
    id: 1, title: "Makosa", artist: "Kiut",
    album: "Good Life EP", albumId: "good-life-ep",
    albumArt: GOOD_LIFE_EP_ART, albumType: "ep",
    released: "Oct 30, 2025", releasedAt: "2025-10-30", duration: "3:35",
    url: "/audio/makosa.mp3",
    streaming: {},
    youtubeVideoId: "L7tLWSFrx98",
    isLatest: true,
  },
  {
    id: 2, title: "TGIF", artist: "Kiut ft. De Sol", featuring: ["De Sol"],
    album: "Good Life EP", albumId: "good-life-ep",
    albumArt: GOOD_LIFE_EP_ART, albumType: "ep",
    released: "Oct 30, 2025", releasedAt: "2025-10-30", duration: "3:15",
    url: "/audio/tgif.mp3",
    streaming: {},
    youtubeVideoId: "5StPjZaBIGc",
    isLatest: true,
  },
  {
    id: 3, title: "Chubaya", artist: "Kiut",
    album: "Good Life EP", albumId: "good-life-ep",
    albumArt: GOOD_LIFE_EP_ART, albumType: "ep",
    released: "Oct 30, 2025", releasedAt: "2025-10-30", duration: "3:20",
    url: null,
    streaming: {},
    isLatest: true,
  },

  // ── S.O.F.A EP — Nov 24, 2023 ───────────────────────────────────────────
  {
    id: 4, title: "AJE", artist: "Kiut",
    album: "S.O.F.A EP", albumId: "sofa-ep",
    albumArt: SOFA_EP_ART, albumType: "ep",
    released: "Nov 24, 2023", releasedAt: "2023-11-24", duration: "3:50",
    url: "/audio/aje.mp3",
    streaming: {},
    youtubeVideoId: "8fFn5Q4hGXQ",
  },
  {
    id: 14, title: "Strength in Bed", artist: "Kiut",
    album: "S.O.F.A EP", albumId: "sofa-ep",
    albumArt: SOFA_EP_ART, albumType: "ep",
    released: "Nov 24, 2023", releasedAt: "2023-11-24", duration: "3:18",
    url: "/audio/strength-in-bed.mp3",
    streaming: {},
  },

  // ── Announce — May 15, 2021 ──────────────────────────────────────────────
  {
    id: 5, title: "Amin", artist: "Kiut",
    album: "Announce", albumId: "announce",
    albumArt: ANNOUNCE_ART, albumType: "project",
    released: "May 15, 2021", releasedAt: "2021-05-15", duration: "3:42",
    url: "/audio/amin.mp3",
    streaming: {},
  },
  {
    id: 6, title: "Samsa", artist: "Kiut",
    album: "Announce", albumId: "announce",
    albumArt: ANNOUNCE_ART, albumType: "project",
    released: "May 15, 2021", releasedAt: "2021-05-15", duration: "3:28",
    // ✅ Audio file available: client/public/audio/samsa.mp3
    url: "/audio/samsa.mp3",
    streaming: {},
    youtubeVideoId: "iJSXNGDW-C8",
  },
  {
    id: 7, title: "Not Broke", artist: "Kiut",
    album: "Announce", albumId: "announce",
    albumArt: ANNOUNCE_ART, albumType: "project",
    released: "May 15, 2021", releasedAt: "2021-05-15", duration: "3:12",
    url: "/audio/not-broke.mp3",
    streaming: {},
  },

  // ── Eligible EP — May 20, 2022 ───────────────────────────────────────────
  {
    id: 8, title: "Daughter of Elijah", artist: "Kiut",
    album: "Eligible EP", albumId: "eligible-ep",
    albumArt: ELIGIBLE_EP_ART, albumType: "ep",
    released: "May 20, 2022", releasedAt: "2022-05-20", duration: "4:15",
    url: "/audio/daughter-of-elijah.mp3",
    streaming: {},
  },
  {
    id: 9, title: "Holy Thought", artist: "Kiut",
    album: "Eligible EP", albumId: "eligible-ep",
    albumArt: ELIGIBLE_EP_ART, albumType: "ep",
    released: "May 20, 2022", releasedAt: "2022-05-20", duration: "4:30",
    url: null,
    streaming: {},
  },

  // ── Singles ──────────────────────────────────────────────────────────────
  {
    id: 10, title: "Confam Boy", artist: "Kiut",
    album: "Single", albumId: "singles",
    albumArt: CONFAM_BOY_ART, albumType: "single",
    released: "Jul 21, 2023", releasedAt: "2023-07-21", duration: "3:48",
    url: "/audio/confam-boy.mp3",
    streaming: {},
    youtubeVideoId: "cd52pQaKmAs",
  },
  {
    id: 11, title: "Praya Request", artist: "Kiut",
    album: "Single", albumId: "singles",
    albumArt: PRAYA_REQUEST_ART, albumType: "single",
    released: "Feb 3, 2023", releasedAt: "2023-02-03", duration: "4:02",
    // ✅ Audio file available: client/public/audio/praya-request.mp3
    url: "/audio/praya-request.mp3",
    streaming: {},
    youtubeVideoId: "qjEOqcOutdc",
  },
  {
    id: 12, title: "Chikito", artist: "Kiut",
    album: "Single", albumId: "singles",
    albumArt: CHIKITO_ART, albumType: "single",
    released: "Nov 18, 2022", releasedAt: "2022-11-18", duration: "3:22",
    url: "/audio/chikito.mp3",
    streaming: {},
    youtubeVideoId: "XhDvtdMiT_E",
  },
  {
    id: 13, title: "Turn Up", artist: "Kiut",
    album: "Single", albumId: "singles",
    albumArt: CONFAM_BOY_ART, albumType: "single",
    released: "2024", releasedAt: "2024-01-01", duration: "3:30",
    // ✅ Audio file available: client/public/audio/turn-up.mp3
    url: "/audio/turn-up.mp3",
    streaming: {},
  },
];

// ─── Album / EP / Project Catalogue ──────────────────────────────────────────
// Consumed by the Music page discography grid, album cards, and timeline.
// Add new releases here — track entries belong in ALL_TRACKS above.
export const ALBUMS: AlbumMeta[] = [
  {
    id: "good-life-ep",
    title: "Good Life EP",
    type: "ep",
    image: GOOD_LIFE_EP_ART,
    released: "Oct 30, 2025", releasedAt: "2025-10-30",
    year: "Oct 30, 2025", yearShort: "2025",
    genre: "Afrobeats / Caribbean",
    link: GOOD_LIFE_EP_LINK,
    streaming: {
      spotify:   SPOTIFY_ARTIST_URL,
      apple:     APPLE_MUSIC_ARTIST_URL,
      audiomack: AUDIOMACK_URL,
      youtube:   "https://music.youtube.com/search?q=Kiut+Good+Life+EP",
      boomplay:  "https://www.boomplay.com/search/default/Kiut+Good+Life",
    },
    platforms: ["spotify", "apple", "audiomack", "youtube", "boomplay"],
    trackCount: 6,
    previewTrackId: 1,
  },
  {
    id: "sofa-ep",
    title: "S.O.F.A (Songs From Archive)",
    type: "ep",
    image: SOFA_EP_ART,
    released: "Nov 24, 2023", releasedAt: "2023-11-24",
    year: "Nov 24, 2023", yearShort: "2023",
    genre: "Afrobeats / R&B",
    link: SOFA_EP_LINK,
    streaming: {
      spotify:   SPOTIFY_ARTIST_URL,
      apple:     APPLE_MUSIC_ARTIST_URL,
      audiomack: AUDIOMACK_URL,
      youtube:   "https://music.youtube.com/search?q=Kiut+SOFA+EP",
    },
    platforms: ["spotify", "apple", "audiomack", "youtube"],
    trackCount: 7,
    previewTrackId: 4,
  },
  {
    id: "announce",
    title: "Announce",
    type: "project",
    image: ANNOUNCE_ART,
    released: "May 15, 2021", releasedAt: "2021-05-15",
    year: "May 15, 2021", yearShort: "2021",
    genre: "Afrobeats",
    link: ANNOUNCE_LINK,
    streaming: {
      spotify:   SPOTIFY_ARTIST_URL,
      apple:     APPLE_MUSIC_ARTIST_URL,
      audiomack: AUDIOMACK_URL,
    },
    platforms: ["spotify", "apple", "audiomack"],
    trackCount: 5,
    previewTrackId: 6,
  },
  {
    id: "eligible-ep",
    title: "Eligible EP",
    type: "ep",
    image: ELIGIBLE_EP_ART,
    released: "May 20, 2022", releasedAt: "2022-05-20",
    year: "May 20, 2022", yearShort: "2022",
    genre: "Afrobeats / Pop",
    link: ELIGIBLE_EP_LINK,
    streaming: {
      spotify:   SPOTIFY_ARTIST_URL,
      apple:     APPLE_MUSIC_ARTIST_URL,
      audiomack: AUDIOMACK_URL,
      youtube:   "https://music.youtube.com/search?q=Kiut+Eligible+EP",
    },
    platforms: ["spotify", "apple", "audiomack", "youtube"],
    trackCount: 6,
    previewTrackId: 8,
  },
  {
    id: "singles",
    title: "Singles",
    type: "single",
    image: CONFAM_BOY_ART,
    released: "2022–2024", releasedAt: "2022-01-01",
    year: "2022–2024", yearShort: "2022–2024",
    genre: "Afrobeats",
    link: LINKTREE_URL,
    streaming: {
      spotify:   SPOTIFY_ARTIST_URL,
      apple:     APPLE_MUSIC_ARTIST_URL,
      audiomack: AUDIOMACK_URL,
    },
    platforms: ["spotify", "apple", "audiomack"],
    trackCount: 4,
    previewTrackId: 11,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns the local audio URL for an album's preview track.
 * Used by AlbumCard for hover audio preview.
 * Returns null if the track has no local file yet.
 */
export function getAlbumPreviewAudio(albumId: string): string | null {
  const album = ALBUMS.find(a => a.id === albumId);
  if (!album?.previewTrackId) return null;
  return ALL_TRACKS.find(t => t.id === album.previewTrackId)?.url ?? null;
}

/**
 * Returns the best available streaming URL for a track.
 * Checks per-track links first, then falls back to the parent album's links.
 * Preference order: Spotify → Apple Music → Audiomack → YouTube → Boomplay.
 */
export function getTrackStreamingUrl(track: Track): string | null {
  const order: Array<keyof StreamingLinks> = ["spotify", "apple", "audiomack", "youtube", "boomplay"];
  for (const k of order) {
    if (track.streaming[k]) return track.streaming[k]!;
  }
  const parentAlbum = ALBUMS.find(a => a.id === track.albumId);
  if (parentAlbum) {
    for (const k of order) {
      if (parentAlbum.streaming[k]) return parentAlbum.streaming[k]!;
    }
  }
  return null;
}

// ─── Track groups (derived — do not edit directly) ────────────────────────────
// Automatically reflects any additions to ALL_TRACKS or ALBUMS above.
export const TRACK_GROUPS: TrackGroup[] = ALBUMS
  .map(album => ({
    album,
    label:  album.title,
    year:   album.year,
    image:  album.image,
    tracks: ALL_TRACKS.filter(t => t.albumId === album.id),
  }))
  .filter(g => g.tracks.length > 0);
