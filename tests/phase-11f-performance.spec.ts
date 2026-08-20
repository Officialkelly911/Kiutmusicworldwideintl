import { expect, test } from "@playwright/test";

const GA4_ID = "G-EE9TF1XS08";

test.setTimeout(120_000);

async function skipIntro(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    sessionStorage.setItem("kiut_intro_seen", "true");
  });
}

test.describe("Phase 11F performance and measurement", () => {
  test("keeps the decorative homepage hero video off mobile", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await skipIntro(page);

    const heroVideoRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/assets/videos/hero-reel.mp4")) {
        heroVideoRequests.push(request.url());
      }
    });

    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 60_000 });
    // Cross into the only video-backed slide to ensure the mobile policy holds
    // across carousel transitions, not just on the initial slide.
    await page.waitForTimeout(7_000);
    expect(heroVideoRequests).toEqual([]);
    await expect(page.locator('video source[src*="hero-reel.mp4"]')).toHaveCount(0);

    await context.close();
  });

  test("serves the responsive music hero artwork on mobile", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await skipIntro(page);
    const musicHeroRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/images/hero/music/")) {
        musicHeroRequests.push(request.url());
      }
    });
    await page.goto("/music", { waitUntil: "domcontentloaded", timeout: 60_000 });
    await expect
      .poll(() => musicHeroRequests.length, { timeout: 30_000 })
      .toBeGreaterThan(0);
    expect(musicHeroRequests.some((url) => url.endsWith("music-640.avif"))).toBe(true);
    expect(musicHeroRequests.some((url) => url.endsWith("music-source.png"))).toBe(false);

    await context.close();
  });

  test("initializes GA4 once and emits one route-level page view per SPA navigation", async ({
    page,
  }) => {
    await skipIntro(page);
    await page.addInitScript((measurementId) => {
      window.__KIUT_ANALYTICS__ = { ga4Id: measurementId };
    }, GA4_ID);
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 60_000 });

    const ga4ConfigCalls = () =>
      page.evaluate((measurementId) => {
        return (window.dataLayer ?? []).filter(
          (entry) =>
            Array.isArray(entry) &&
            entry[0] === "config" &&
            entry[1] === measurementId,
        );
      }, GA4_ID);

    await expect
      .poll(
        () =>
        page.evaluate((measurementId) => {
          return document.querySelectorAll(
            `script[src*="gtag/js?id=${measurementId}"]`,
          ).length;
        }, GA4_ID),
        { timeout: 30_000 },
      )
      .toBe(1);
    await expect.poll(ga4ConfigCalls, { timeout: 30_000 }).toHaveLength(2);

    await page.getByRole("link", { name: "Music", exact: true }).first().click();
    await expect(page).toHaveURL(/\/music$/, { timeout: 30_000 });
    await expect.poll(ga4ConfigCalls, { timeout: 30_000 }).toHaveLength(3);

    const configCalls = await ga4ConfigCalls();
    expect(configCalls[0]).toEqual([
      "config",
      GA4_ID,
      { send_page_view: false },
    ]);
    expect(configCalls.at(-1)).toEqual([
      "config",
      GA4_ID,
      { page_path: "/music" },
    ]);
  });
});