import assert from "node:assert/strict";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { readFile } from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";
import {
  NOT_FOUND_SEO,
  PUBLIC_ROUTES,
  ROUTE_SEO,
  SEO_SITE_NAME,
} from "../shared/seo";

const port = Number(process.env.KIUT_STRUCTURED_DATA_TEST_PORT ?? 5138);
const baseUrl = `http://127.0.0.1:${port}`;
let server: ChildProcessWithoutNullStreams | undefined;
let serverOutput = "";

type JsonLdNode = Record<string, unknown>;

async function fetchDocument(pathname: string) {
  const response = await fetch(`${baseUrl}${pathname}`, { redirect: "manual" });
  return { response, html: await response.text() };
}

async function assertCrawlAssets() {
  const robotsResponse = await fetch(`${baseUrl}/robots.txt`, { redirect: "manual" });
  assert.equal(robotsResponse.status, 200, "robots.txt should be publicly available");
  assert.match(
    robotsResponse.headers.get("content-type") ?? "",
    /^text\/plain/i,
    "robots.txt should be plain text",
  );
  const robots = await robotsResponse.text();
  assert.match(robots, /^User-agent:\s*\*/im, "robots.txt should define a crawler policy");
  assert.match(
    robots,
    /^Sitemap:\s*https:\/\/kiutmusic\.com\/sitemap\.xml\s*$/im,
    "robots.txt should reference the canonical sitemap URL",
  );

  const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`, { redirect: "manual" });
  assert.equal(sitemapResponse.status, 200, "sitemap.xml should be publicly available");
  assert.match(
    sitemapResponse.headers.get("content-type") ?? "",
    /^(application|text)\/xml/i,
    "sitemap.xml should be XML",
  );
  const sitemap = await sitemapResponse.text();
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expectedUrls = PUBLIC_ROUTES.map(
    (route) => `https://kiutmusic.com${route === "/" ? "/" : route}`,
  );

  assert.deepEqual(
    [...new Set(sitemapUrls)].sort(),
    [...expectedUrls].sort(),
    "sitemap should contain each canonical public route exactly once",
  );
  for (const url of sitemapUrls) {
    assert.equal(new URL(url).origin, "https://kiutmusic.com", "sitemap URLs must use the canonical domain");
  }
}

function parseGraph(html: string): JsonLdNode[] {
  const scripts = [...html.matchAll(
    /<script id="kiut-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )];
  assert.equal(scripts.length, 1, "each response must contain exactly one structured-data script");

  const document = JSON.parse(scripts[0][1]) as { "@context"?: string; "@graph"?: JsonLdNode[] };
  assert.equal(document["@context"], "https://schema.org", "JSON-LD context should be schema.org");
  assert.ok(Array.isArray(document["@graph"]), "JSON-LD must provide one @graph");

  const ids = document["@graph"]
    .map((node) => node["@id"])
    .filter((id): id is string => typeof id === "string");
  assert.equal(new Set(ids).size, ids.length, "JSON-LD @id values must not be duplicated");

  const emittedIds = new Set(ids);
  const assertReferences = (value: unknown) => {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) {
      value.forEach(assertReferences);
      return;
    }
    for (const [key, nestedValue] of Object.entries(value)) {
      if (key === "@id" && typeof nestedValue === "string" && nestedValue.startsWith("https://kiutmusic.com/")) {
        assert.ok(emittedIds.has(nestedValue), `JSON-LD reference should resolve: ${nestedValue}`);
      }
      assertReferences(nestedValue);
    }
  };
  assertReferences(document["@graph"]);

  return document["@graph"];
}

function entitiesOfType(graph: JsonLdNode[], type: string) {
  return graph.filter((node) => node["@type"] === type);
}

function assertBaseEntities(graph: JsonLdNode[], expectedPageUrl: string) {
  assert.equal(entitiesOfType(graph, "MusicGroup").length, 1, "one artist entity is required");
  assert.equal(entitiesOfType(graph, "WebSite").length, 1, "one WebSite entity is required");

  const pages = entitiesOfType(graph, "WebPage");
  assert.equal(pages.length, 1, "one route WebPage entity is required");
  assert.equal(pages[0].url, expectedPageUrl, "WebPage URL should use the approved canonical");
  assert.deepEqual(pages[0].about, { "@id": "https://kiutmusic.com/#artist" });
}

function assertInitialMetadata(html: string, expected: typeof ROUTE_SEO["/"]) {
  assert.ok(html.includes(`<title>${expected.title}</title>`), "title should match");
  assert.ok(
    html.includes(`<meta name="description" content="${expected.description}" />`),
    "description should match",
  );
  assert.ok(
    html.includes(`<link rel="canonical" href="${expected.canonical}" />`),
    "canonical should match",
  );
  assert.ok(html.includes('<meta name="robots" content="index, follow" />'), "robots should match");
  assert.ok(
    html.includes(`<meta property="og:type" content="${expected.ogType}" />`),
    "Open Graph type should match",
  );
  assert.ok(
    html.includes(`<meta property="og:title" content="${expected.title}" />`),
    "Open Graph title should match",
  );
  assert.ok(
    html.includes(`<meta property="og:description" content="${expected.description}" />`),
    "Open Graph description should match",
  );
  assert.ok(
    html.includes(`<meta property="og:url" content="${expected.canonical}" />`),
    "Open Graph URL should match",
  );
  assert.ok(
    html.includes(`<meta property="og:image" content="${expected.ogImage}" />`),
    "Open Graph image should match",
  );
  assert.ok(
    html.includes('<meta property="og:image:type" content="image/png" />'),
    "Open Graph image type should be declared",
  );
  assert.ok(html.includes('<meta property="og:image:width" content="1200" />'));
  assert.ok(html.includes('<meta property="og:image:height" content="630" />'));
  assert.ok(
    html.includes(`<meta property="og:site_name" content="${SEO_SITE_NAME}" />`),
    "Open Graph site name should match",
  );
  assert.ok(html.includes('<meta name="twitter:card" content="summary_large_image" />'));
  assert.ok(
    html.includes(`<meta name="twitter:title" content="${expected.title}" />`),
    "Twitter title should match",
  );
  assert.ok(
    html.includes(`<meta name="twitter:description" content="${expected.description}" />`),
    "Twitter description should match",
  );
  assert.ok(
    html.includes(`<meta name="twitter:image" content="${expected.ogImage}" />`),
    "Twitter image should match",
  );
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      if ((await fetch(`${baseUrl}/`, { redirect: "manual" })).ok) return;
    } catch {
      // The production server is still starting.
    }
    await sleep(150);
  }
  throw new Error(`Production server did not start:\n${serverOutput}`);
}

async function stopServer() {
  if (!server || server.exitCode !== null) return;
  server.kill("SIGTERM");
  await Promise.race([
    new Promise<void>((resolve) => server?.once("exit", () => resolve())),
    sleep(5_000),
  ]);
  if (server.exitCode === null) server.kill("SIGKILL");
}

async function main() {
  const buildHtml = await readFile(new URL("../dist/public/index.html", import.meta.url), "utf8");
  const buildGraph = parseGraph(buildHtml);
  assertBaseEntities(buildGraph, ROUTE_SEO["/"].canonical);
  assertInitialMetadata(buildHtml, ROUTE_SEO["/"]);

  server = spawn(process.execPath, ["dist/index.cjs"], {
    env: { ...process.env, NODE_ENV: "production", PORT: String(port) },
    stdio: "pipe",
  });
  server.stdout.on("data", (chunk) => { serverOutput += chunk.toString(); });
  server.stderr.on("data", (chunk) => { serverOutput += chunk.toString(); });

  await waitForServer();
  await assertCrawlAssets();

  for (const route of PUBLIC_ROUTES) {
    const { response, html } = await fetchDocument(route);
    assert.equal(response.status, 200, `${route} should return HTTP 200`);
    assertInitialMetadata(html, ROUTE_SEO[route]);
    assertBaseEntities(parseGraph(html), `https://kiutmusic.com${route === "/" ? "/" : route}`);
  }

  const { html: musicHtml } = await fetchDocument("/music");
  const musicGraph = parseGraph(musicHtml);
  const albums = entitiesOfType(musicGraph, "MusicAlbum");
  const recordings = entitiesOfType(musicGraph, "MusicRecording");
  assert.ok(albums.length > 0, "music route should expose complete album entities");
  assert.ok(recordings.length > 0, "music route should expose complete recording entities");
  for (const entity of [...albums, ...recordings]) {
    assert.match(String(entity.datePublished), /^\d{4}-\d{2}-\d{2}$/, "music dates must be complete ISO dates");
  }
  for (const recording of recordings) {
    assert.match(String(recording.duration), /^PT\d+M\d{2}S$/, "recording durations must be ISO 8601");
  }

  const { html: videosHtml } = await fetchDocument("/videos");
  const videos = entitiesOfType(parseGraph(videosHtml), "VideoObject");
  assert.ok(videos.length > 0, "video route should expose VideoObject entities");
  for (const video of videos) {
    assert.equal(video.uploadDate, undefined, "year-only video dates must not be serialized as uploadDate");
    assert.match(String(video.embedUrl), /^https:\/\/www\.youtube\.com\/embed\//);
  }

  const { html: tourHtml } = await fetchDocument("/tour");
  const events = entitiesOfType(parseGraph(tourHtml), "Event");
  assert.equal(events.length, 1, "only the fully announced tour event should be serialized");
  assert.equal(events[0].startDate, "2026-12-31T22:00:00");
  assert.deepEqual(events[0].location, {
    "@type": "Place",
    name: "Eko Convention Centre",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "Nigeria",
    },
  });

  const { response: missingResponse, html: missingHtml } = await fetchDocument("/music/unreleased");
  assert.equal(missingResponse.status, 404, "unknown route should retain HTTP 404 status");
  const missingGraph = parseGraph(missingHtml);
  assertBaseEntities(missingGraph, NOT_FOUND_SEO.canonical);
  for (const forbiddenType of ["MusicAlbum", "MusicRecording", "VideoObject", "Event"]) {
    assert.equal(
      entitiesOfType(missingGraph, forbiddenType).length,
      0,
      `404 route must not inherit ${forbiddenType} entities`,
    );
  }
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(stopServer);