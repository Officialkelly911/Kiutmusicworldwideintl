import { ALBUMS, ALL_TRACKS } from "../client/src/data/tracks";
import { upcomingShows } from "../client/src/data/tour";
import { videos } from "../client/src/data/videos";
import { getPublicRoute, resolveRouteSEO } from "../shared/seo";
import {
  buildMusicStructuredData,
  buildStructuredData,
  buildTourStructuredData,
  buildVideosStructuredData,
  renderStructuredDataScript,
} from "../shared/structured-data";

/**
 * Route JSON-LD is generated from the same data modules that render the site.
 * This keeps the production HTML, Vite development HTML, and client fallback
 * aligned without inventing release, video, or tour facts.
 */
export function getRouteStructuredData(pathname = "/") {
  const meta = resolveRouteSEO(pathname);

  switch (getPublicRoute(pathname)) {
    case "/music":
      return buildMusicStructuredData(meta, ALBUMS, ALL_TRACKS);
    case "/videos":
      return buildVideosStructuredData(meta, videos);
    case "/tour":
      return buildTourStructuredData(meta, upcomingShows);
    default:
      return buildStructuredData(meta);
  }
}

export function renderRouteStructuredData(pathname = "/") {
  return renderStructuredDataScript(getRouteStructuredData(pathname));
}