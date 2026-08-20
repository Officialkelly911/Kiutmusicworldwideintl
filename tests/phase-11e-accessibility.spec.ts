import { expect, test, type Page } from "@playwright/test";

test.setTimeout(120_000);

const publicRoutes = [
  "/",
  "/music",
  "/videos",
  "/about",
  "/newsletter",
  "/tour",
  "/contact",
  "/legal",
] as const;

async function visit(page: Page, route: string) {
  const response = await page.goto(route, { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("status", { name: "Loading page" })).toBeHidden({
    timeout: 30_000,
  });
  return response;
}

test.beforeEach(async ({ page }) => {
  // Keep browser checks focused on the actual page rather than the optional
  // first-visit presentation overlay.
  await page.addInitScript(() => {
    window.sessionStorage.setItem("kiut_intro_seen", "true");
  });
});

test.describe("Phase 11E accessibility and reliability", () => {
  test("mobile navigation closes from its close control, Escape, and route navigation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await visit(page, "/about");

    const toggle = page.getByTestId("button-mobile-menu");
    const mobileMenu = page.getByRole("navigation", { name: "Mobile navigation menu" });

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(mobileMenu).toBeVisible();
    await expect(toggle).toHaveAccessibleName("Close navigation menu");

    await page.keyboard.press("Escape");
    await expect(mobileMenu).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();

    await toggle.click();
    await expect(mobileMenu).toBeVisible();
    await toggle.click();
    await expect(mobileMenu).toBeHidden();

    await toggle.click();
    await page.getByTestId("mobile-nav-music").click();
    await expect(page).toHaveURL(/\/music$/);
    await expect(mobileMenu).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("keeps meaningful headings, keyboard-accessible media controls, and private embeds", async ({
    page,
  }) => {
    for (const route of ["/", "/about"] as const) {
      await visit(page, route);
      const headings = page.getByRole("heading", { level: 1 });
      await expect(headings).toHaveCount(1, { timeout: 15_000 });
      await expect(headings).toBeVisible();
    }

    await visit(page, "/about");
    const featuredGalleryImage = page.getByRole("button", {
      name: "Open featured image — The Good Life Era",
    });
    await featuredGalleryImage.focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("dialog", { name: "Visual Archive photo gallery" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Close photo gallery" }).click();

    await visit(page, "/music");
    const release = page.getByTestId("featured-release-romantic-love");
    await release.getByRole("button", { name: "Listen Now" }).click();

    const seekControl = page.getByRole("slider", { name: /Seek Romantic Love/i });
    await expect(seekControl).toBeVisible();
    await expect(seekControl).toHaveAttribute("type", "range");
    await expect(seekControl).toBeEnabled();
    const initialSeekValue = await seekControl.inputValue();
    await seekControl.focus();
    await page.keyboard.press("ArrowRight");
    await expect(seekControl).not.toHaveValue(initialSeekValue);
    await expect(page.getByRole("button", { name: /Previous track/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Close player/i })).toBeVisible();

    await visit(page, "/videos");
    const videoEmbed = page.locator("iframe[title]").first();
    await expect(videoEmbed).toHaveAttribute(
      "src",
      /^https:\/\/www\.youtube-nocookie\.com\/embed\//,
      { timeout: 15_000 },
    );
    await expect(videoEmbed).toHaveAttribute("referrerpolicy", "strict-origin-when-cross-origin");

    await visit(page, "/tour");
    await page.getByRole("button", { name: "Watch Strength in Bed" }).click();
    const tourDialog = page.getByRole("dialog", { name: /Strength in Bed/ });
    await expect(tourDialog).toBeVisible();
    const tourEmbed = tourDialog.locator("iframe[title='Strength in Bed']");
    await expect(tourEmbed).toHaveAttribute(
      "src",
      /^https:\/\/www\.youtube-nocookie\.com\/embed\/S3TxotoehrI\?autoplay=1&rel=0$/,
      { timeout: 15_000 },
    );
    await expect(tourEmbed).toHaveAttribute(
      "referrerpolicy",
      "strict-origin-when-cross-origin",
    );
  });

  test("renders every public route without first-party resource failures or horizontal overflow", async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    const failedResources: string[] = [];

    page.on("pageerror", (error) => {
      // The Replit preview shell mounts a separate Framer runtime that can emit
      // its own hydration errors. Those are outside the KIUT app tree; retain
      // this assertion for all first-party page errors.
      if (!error.stack?.includes("framerusercontent.com")) {
        pageErrors.push(error.message);
      }
    });
    page.on("response", (response) => {
      const url = new URL(response.url());
      const request = response.request();
      const resourceTypes = new Set(["script", "stylesheet", "image", "media", "font"]);
      if (
        url.origin === "http://127.0.0.1:5000" &&
        resourceTypes.has(request.resourceType()) &&
        response.status() >= 400
      ) {
        failedResources.push(`${response.status()} ${url.pathname}`);
      }
    });

    for (const route of publicRoutes) {
      const response = await visit(page, route);
      expect(response?.status(), `route ${route}`).toBe(200);
      await expect(page.locator("main#main-content")).toBeVisible();

      const overflow = await page.evaluate(() => {
        const root = document.documentElement;
        return root.scrollWidth - root.clientWidth;
      });
      expect(overflow, `horizontal overflow on ${route}`).toBeLessThanOrEqual(1);
    }

    expect(pageErrors).toEqual([]);
    expect(failedResources).toEqual([]);
  });
});