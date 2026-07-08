import express, { type Express, type Request, type Response } from "express";
import fs from "fs";
import path from "path";

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

  // Images, fonts, audio, WebP — long but not immutable
  if (/\.(webp|png|jpe?g|gif|svg|ico|woff2?|ttf|otf|mp3|m4a|ogg|mp4|webm)$/.test(url)) {
    res.setHeader("Cache-Control", "public, max-age=604800"); // 7 days
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

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Apply cache headers before the static middleware intercepts the request
  app.use(setStaticCacheHeaders);

  app.use(
    express.static(distPath, {
      // Disable Express's built-in etag/maxAge in favour of our explicit headers
      etag: true,
      lastModified: true,
      // Don't set max-age here — handled by setStaticCacheHeaders above
      maxAge: 0,
    }),
  );

  // SPA catch-all — send index.html for any unmatched route
  app.use("*", (_req: Request, res: Response) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
