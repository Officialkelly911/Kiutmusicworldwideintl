import assert from "node:assert/strict";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import {
  NOT_FOUND_SEO,
  PUBLIC_ROUTES,
  ROUTE_SEO,
  SEO_ROBOTS,
  type RouteSEOMeta,
} from "../shared/seo";

const port = Number(process.env.KIUT_TEST_PORT ?? 5137);
const baseUrl = `http://127.0.0.1:${port}`;
let server: ChildProcessWithoutNullStreams | undefined;
let serverOutput = "";

function assertDocumentMeta(
  html: string,
  expected: RouteSEOMeta,
  robots: string,
) {
  const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
  const title = escapeHtml(expected.title);
  const description = escapeHtml(expected.description);
  const canonical = escapeHtml(expected.canonical);

  assert.ok(html.includes(`<title>${title}</title>`), "title should match");
  assert.ok(
    html.includes(`<meta name="description" content="${description}" />`),
    "description should match",
  );
  assert.ok(
    html.includes(`<link rel="canonical" href="${canonical}" />`),
    "canonical should match",
  );
  assert.ok(
    html.includes(`<meta name="robots" content="${robots}" />`),
    "robots directive should match",
  );
  assert.ok(
    html.includes(`<meta property="og:url" content="${canonical}" />`),
    "Open Graph URL should match the canonical",
  );
}

async function fetchDocument(pathname: string) {
  const response = await fetch(`${baseUrl}${pathname}`, { redirect: "manual" });
  return { response, html: await response.text() };
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/`, { redirect: "manual" });
      if (response.ok) return;
    } catch {
      // The production process is still starting.
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
    assertDocumentMeta(html, ROUTE_SEO[route], SEO_ROBOTS);
  }

  for (const [route, expectedRoute] of [
    ["/music/", "/music"],
    ["/tour/?utm_source=newsletter", "/tour"],
    ["/newsletter?campaign=summer", "/newsletter"],
  ] as const) {
    const { response, html } = await fetchDocument(route);
    assert.equal(response.status, 200, `${route} should return HTTP 200`);
    assertDocumentMeta(html, ROUTE_SEO[expectedRoute], SEO_ROBOTS);
  }

  for (const route of [
    "/this-page-does-not-exist",
    "/music/unreleased",
    "/missing-page?utm_source=test",
  ]) {
    const { response, html } = await fetchDocument(route);
    assert.equal(response.status, 404, `${route} should return HTTP 404`);
    assertDocumentMeta(html, NOT_FOUND_SEO, NOT_FOUND_SEO.robots);
    assert.ok(
      !html.includes(`<link rel="canonical" href="${ROUTE_SEO["/"].canonical}" />`),
      `${route} must not inherit the homepage canonical`,
    );
  }

  const apiResponse = await fetch(`${baseUrl}/api/does-not-exist`, { redirect: "manual" });
  assert.equal(apiResponse.status, 404, "unknown API routes should remain JSON 404s");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(stopServer);