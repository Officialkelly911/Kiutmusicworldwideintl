import { expect, test, type Page } from "@playwright/test";

test.setTimeout(90_000);

const routeExpectations = [
  {
    path: "/",
    title: "Kiut Music Worldwide | Afro-Caribbean Sound. Global Energy.",
    canonical: "https://kiutmusic.com/",
  },
  {
    path: "/music",
    title: "Music | Kiut Music Worldwide",
    canonical: "https://kiutmusic.com/music",
  },
  {
    path: "/videos",
    title: "Videos | Kiut Music Worldwide",
    canonical: "https://kiutmusic.com/videos",
  },
] as const;

async function expectRouteSeo(
  page: Page,
  expected: (typeof routeExpectations)[number],
) {
  await expect(page.getByRole("status", { name: "Loading page" })).toBeHidden({
    timeout: 30_000,
  });
  await expect(page).toHaveTitle(expected.title, { timeout: 15_000 });
  await expect(page.locator("#kiut-structured-data")).toHaveCount(1, {
    timeout: 15_000,
  });

  const graph = await page.locator("#kiut-structured-data").evaluate((element) => {
    const document = JSON.parse(element.textContent ?? "") as {
      "@graph": Array<Record<string, unknown>>;
    };
    return document["@graph"];
  });
  const pageEntity = graph.find((entity) => entity["@type"] === "WebPage");
  expect(pageEntity?.url).toBe(expected.canonical);
}

test.describe("client-side SEO synchronization", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.sessionStorage.setItem("kiut_intro_seen", "true");
    });
  });

  test("keeps one current JSON-LD graph through route transitions", async ({ page }) => {
    await page.goto("/");
    await expectRouteSeo(page, routeExpectations[0]);

    await page.locator('a[href="/music"]').first().click();
    await expect(page).toHaveURL(/\/music$/);
    await expectRouteSeo(page, routeExpectations[1]);

    await page.locator('a[href="/videos"]').first().click();
    await expect(page).toHaveURL(/\/videos$/);
    await expectRouteSeo(page, routeExpectations[2]);

  });

  test("keeps the base and 404 graph isolated for invalid routes", async ({ page }) => {
    const response = await page.goto("/random-invalid-route");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "404 Page Not Found" })).toBeVisible();
    await expect(page.locator("#kiut-structured-data")).toHaveCount(1);

    const types = await page.locator("#kiut-structured-data").evaluate((element) => {
      const document = JSON.parse(element.textContent ?? "") as {
        "@graph": Array<Record<string, string>>;
      };
      return document["@graph"].map((entity) => entity["@type"]);
    });
    expect(types).toEqual(["MusicGroup", "WebSite", "WebPage"]);
  });
});