import express, { type Express, type Request, type Response } from "express";
import fs from "fs";
import path from "path";
import {
  ROUTE_PRELOAD_END_MARKER,
  ROUTE_PRELOAD_START_MARKER,
  ROUTE_SEO_END_MARKER,
  ROUTE_SEO_START_MARKER,
  isPublicRoute,
  renderRoutePreloadTags,
  renderRouteSEOTags,
  resolveRouteSEO,
} from "../shared/seo";
import {
  STRUCTURED_DATA_END_MARKER,
  STRUCTURED_DATA_START_MARKER,
} from "../shared/structured-data";
import { renderRouteStructuredData } from "./structured-data";

/**
 * Cache-Control strategy for production static assets.
 *
 * ┌─────────────────────────────┬───────────────────────────────────────────┐
 * │ Asset type                  │ Cache policy                              │
 * ├─────────────────────────────┼───────────────────────────────────────────┤
 * │ JS / CSS  (hashed filename) │ 1 year, immutable                         │
 * │ Images / fonts / audio/webp │ 7 days, public                            │
 * │ index.html                  │ no-cache (always revalidate)              │
 * │ site.webmanifest            │ no-cache                                  │
 * └─────────────────────────────┴───────────────────────────────────────────┘
 *
 * Vite produces hashed filenames for all JS/CSS chunks (e.g.
 * assets/vendor-react-Bq3a1Xop.js), so a 1-year immutable TTL is safe —
 * any content change produces a new hash and thus a new URL.
 */
function setStaticCacheHeaders(req: Request, res: Response, next: () => void) {
  const url = req.path;

  // Hashed JS and CSS — content-addressed, safe to cache forever
  if (/\.(js|css)$/.test(url) && /[a-f0-9]{8,}/.test(url)) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return next();
  }

  // Images, fonts, audio, WebP
  // Many asset filenames are stable (hero-poster.webp, merch-hoodie.webp), so we use 7 days
  // rather than a long immutable cache — safe if assets are ever swapped in-place.
  if (/\.(webp|png|jpe?g|gif|svg|ico|woff2?|ttf|otf|mp3|m4a|ogg|mp4|webm)$/.test(url)) {
    res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=86400"); // 7 days + swr
    return next();
  }

  // HTML and manifests — always revalidate so new deployments are picked up
  if (/\.(html|webmanifest|json)$/.test(url) || url === "/") {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    return next();
  }

  next();
}

function injectRouteSEO(indexHtml: string, pathname: string): string {
  const start = indexHtml.indexOf(ROUTE_SEO_START_MARKER);
  const end = indexHtml.indexOf(ROUTE_SEO_END_MARKER, start);

  if (start === -1 || end === -1) {
    throw new Error("Could not find the route SEO markers in the built index.html");
  }

  const endOffset = end + ROUTE_SEO_END_MARKER.length;
  return [
    indexHtml.slice(0, start),
    renderRouteSEOTags(resolveRouteSEO(pathname)),
    indexHtml.slice(endOffset),
  ].join("");
}

function injectRouteStructuredData(indexHtml: string, pathname: string): string {
  const start = indexHtml.indexOf(STRUCTURED_DATA_START_MARKER);
  const end = indexHtml.indexOf(STRUCTURED_DATA_END_MARKER, start);

  if (start === -1 || end === -1) {
    throw new Error("Could not find the structured data markers in the built index.html");
  }

  const endOffset = end + STRUCTURED_DATA_END_MARKER.length;
  return [
    indexHtml.slice(0, start),
    renderRouteStructuredData(pathname),
    indexHtml.slice(endOffset),
  ].join("");
}

function injectRoutePreloads(indexHtml: string, pathname: string): string {
  const start = indexHtml.indexOf(ROUTE_PRELOAD_START_MARKER);
  const end = indexHtml.indexOf(ROUTE_PRELOAD_END_MARKER, start);

  if (start === -1 || end === -1) {
    throw new Error("Could not find the route preload markers in the built index.html");
  }

  const endOffset = end + ROUTE_PRELOAD_END_MARKER.length;
  return [
    indexHtml.slice(0, start),
    [
      ROUTE_PRELOAD_START_MARKER,
      renderRoutePreloadTags(pathname),
      ROUTE_PRELOAD_END_MARKER,
    ].filter(Boolean).join("\n"),
    indexHtml.slice(endOffset),
  ].join("");
}

function injectRouteDocument(indexHtml: string, pathname: string): string {
  return injectRouteStructuredData(
    injectRouteSEO(injectRoutePreloads(indexHtml, pathname), pathname),
    pathname,
  );
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }
  const indexPath = path.resolve(distPath, "index.html");
  const indexHtml = fs.readFileSync(indexPath, "utf-8");

  // Fail at startup rather than serving a generic shell if the build transform
  // ever stops emitting the route metadata markers.
  injectRouteDocument(indexHtml, "/");

  // Apply cache headers before the static middleware intercepts the request
  app.use(setStaticCacheHeaders);

  app.use(
    express.static(distPath, {
      // Disable Express's built-in etag/maxAge in favour of our explicit headers
      etag: true,
      lastModified: true,
      index: false,
      // Don't set max-age here — handled by setStaticCacheHeaders above
      maxAge: 0,
    }),
  );

  // SPA document fallback — valid client routes receive the normal shell while
  // invalid browser paths receive that same branded client shell with real 404
  // semantics and non-indexable 404 metadata.
  app.use("*", (req: Request, res: Response) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    const status = isPublicRoute(req.originalUrl) ? 200 : 404;
    res.status(status).type("html").send(injectRouteDocument(indexHtml, req.originalUrl));
  });
}
