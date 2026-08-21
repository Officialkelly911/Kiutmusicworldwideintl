/**
 * Newsletter — "Featured Updates" content.
 * Pulls from each domain's own single source of truth (ALBUMS, upcomingShows,
 * videos, MERCH_HIGHLIGHTS) instead of hardcoding duplicate facts here — this
 * file only assembles the summary cards shown on the Newsletter page.
 */
import { ALBUMS } from "./tracks";
import { upcomingShows } from "./tour";
import { videos } from "./videos";
import { MERCH_HIGHLIGHTS } from "./merch";

export interface FeaturedUpdate {
  id: string;
  kind: "release" | "tour" | "video" | "member" | "merch" | "event";
  label: string;
  title: string;
  description: string;
  image?: string;
  href?: string;
  meta?: string;
}

const latestAlbum = ALBUMS[0];
const nextShow = upcomingShows.find((s) => s.status === "announced") ?? upcomingShows[0];
const latestVideo = videos[0];
const featuredMerch = MERCH_HIGHLIGHTS[0];

export const FEATURED_UPDATES: FeaturedUpdate[] = [
  {
    id: "release",
    kind: "release",
    label: "Latest Release",
    title: latestAlbum.title,
    description: `${latestAlbum.genre} — out now on all platforms.`,
    image: latestAlbum.image,
    href: latestAlbum.link,
    meta: latestAlbum.released,
  },
  {
    id: "tour",
    kind: "tour",
    label: "Upcoming Tour",
    title: `${nextShow.city}, ${nextShow.country}`,
    description: nextShow.description,
    href: "/tour",
    meta: `${nextShow.date} · ${nextShow.venue}`,
  },
  {
    id: "video",
    kind: "video",
    label: "Newest Video",
    title: latestVideo.title,
    description: latestVideo.description,
    image: latestVideo.thumbnail,
    href: `https://www.youtube.com/watch?v=${latestVideo.youtubeId}`,
    meta: latestVideo.type,
  },
  {
    id: "member",
    kind: "member",
    label: "Exclusive Member Update",
    title: "Inner Circle Perks",
    description: "New member-only drops and early access opportunities roll out regularly — members hear first.",
    href: "/newsletter",
    meta: "Members Only",
  },
  {
    id: "merch",
    kind: "merch",
    label: "Featured Merch",
    title: featuredMerch.name,
    description: featuredMerch.desc,
    image: featuredMerch.img,
    href: "/",
    meta: featuredMerch.badge,
  },
  {
    id: "event",
    kind: "event",
    label: "Upcoming Event",
    title: `${nextShow.venue}`,
    description: `Live in ${nextShow.city} — ${nextShow.description}`,
    href: "/tour",
    meta: `${nextShow.date} · ${nextShow.time}`,
  },
];
