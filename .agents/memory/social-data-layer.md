---
name: Social & Music Data Layer
description: Architecture for canonical URLs, track catalogue, and music data — all components import from these two files.
---

## Rule
All platform URLs and social handles live in `client/src/data/social.ts`.
All music/track/album data lives in `client/src/data/tracks.ts`.
No component should hardcode any URL, handle, or Spotify/Apple/Audiomack ID.

## Canonical values
- Spotify artist ID: `7yc6EAIFaY5TO7G1JBWgng`
- Apple Music artist ID: `1484593132` (full URL: `https://music.apple.com/us/artist/kiut/1484593132`)
- Audiomack handle: `kiutraba` (NOT `kiutrabatv` — that was the old wrong one)
- YouTube channel: `@kiutrabatv` (this IS correct for YouTube)

**Why:** Two conflicting IDs/handles existed across files. The ones above were confirmed by the user.

## tracks.ts exports
- `ALL_TRACKS: Track[]` — master track catalogue (13 tracks + placeholders)
- `ALBUMS: AlbumMeta[]` — album/EP/project metadata with `trackCount`, `previewTrackId`, `streaming`, `platforms`
- `TRACK_GROUPS: TrackGroup[]` — derived: albums × tracks, used by Music page list
- `getAlbumPreviewAudio(albumId)` — resolves local audio URL for AlbumCard hover preview
- `getTrackStreamingUrl(track)` — best streaming URL for a track (per-track → album → null)
- Image path constants: `GOOD_LIFE_EP_ART`, `SOFA_EP_ART`, `ANNOUNCE_ART`, `ELIGIBLE_EP_ART`, etc.

## Track url field
`url: string | null` — set to `/audio/<filename>` when the file exists in `client/public/audio/`.
Set to `null` when no local file yet.

**How to apply:** Drop file into `client/public/audio/` with matching name, then set `url` in `ALL_TRACKS`.

## PlayerContext null-url handling
`playTrack(track)` checks `track.url === null` first and opens the streaming link in a new tab instead of trying to set `audio.src`. `onEnded` skips ahead to the next track with a non-null url.

## Audio files present
- `/audio/samsa.mp3` (track id 6)
- `/audio/praya-request.mp3` (track id 11)
- `/audio/turn-up.mp3` (track id 13)
All others: `url: null`.
