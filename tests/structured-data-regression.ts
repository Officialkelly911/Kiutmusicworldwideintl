import assert from "node:assert/strict";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { NOT_FOUND_SEO, PUBLIC_ROUTES } from "../shared/seo";

const port = Number(process.env.KIUT_STRUCTURED_DATA_TEST_PORT ?? 5138);
const baseUrl = `http://127.0.0.1:${port}`;
let server: ChildProcessWithoutNullStreams | undefined;
let serverOutput = "";

type JsonLdNode = Record<string, unknown>;

async function fetchDocument(pathname: string) {
  const response = await fetch(`${baseUrl}${pathname}`, { redirect: "manual" });
  return { response, html: await response.text() };
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
  server = spawn(process.execPath, ["dist/index.cjs"], {
    env: { ...process.env, NODE_ENV: "production", PORT: String(port) },
    stdio: "pipe",
  });
  server.stdout.on("data", (chunk) => { serverOutput += chunk.toString(); });
  server.stderr.on("data", (chunk) => { serverOutput += chunk.toString(); });

  await waitForServer();

  for (const route of PUBLIC_ROUTES) {
    const { response, html } = await fetchDocument(route);
    assert.equal(response.status, 200, `${route} should return HTTP 200`);
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