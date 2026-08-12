import { expect, test } from "@playwright/test";
import { ALL_TRACKS } from "../client/src/data/tracks";
import { ROMANTIC_LOVE_STREAMING_URL } from "../client/src/data/social";

const CANONICAL_STREAMING_URL = "https://bit.ly/m/Romanticlove";

test.describe("Romantic Love streaming destination", () => {
  test("keeps the centralized release data canonical", () => {
    const release = ALL_TRACKS.find((track) => track.title === "Romantic Love");

    expect(release, "Romantic Love must remain in the master catalogue").toBeDefined();
    expect(release?.url, "Romantic Love must use the internal uploaded audio file").toBe(
      "/audio/romantic-love.mp3",
    );
    expect(ROMANTIC_LOVE_STREAMING_URL).toBe(CANONICAL_STREAMING_URL);
    expect(release?.streamingUrl).toBe(CANONICAL_STREAMING_URL);
  });

  test.beforeEach(async ({ page }) => {
    // Skip the optional cinematic intro so the test can exercise the actual
    // first hero slide without waiting on an unrelated presentation overlay.
    await page.addInitScript(() => {
      window.sessionStorage.setItem("kiut_intro_seen", "true");
    });
  });

  test("homepage starts on Romantic Love and exposes the canonical streaming CTA", async ({
    page,
  }) => {
    await page.goto("/");

    const romanticLoveSlide = page.getByTestId("hero-slide-romantic-love");
    await expect(romanticLoveSlide).toBeVisible();
    await expect(romanticLoveSlide.getByRole("heading", { name: "Romantic Love" })).toBeVisible();

    const cta = page.getByTestId("hero-romantic-love-streaming-cta");
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", CANONICAL_STREAMING_URL);
    await expect(cta).toHaveAttribute("target", "_blank");
  });

  test("music page separates the internal player from the streaming CTA", async ({ page }) => {
    await page.goto("/music");

    const release = page.getByTestId("featured-release-romantic-love");
    await expect(release).toBeVisible();
    await expect(release.getByRole("heading", { name: "Romantic Love" })).toBeVisible();

    // The external streaming CTA is a link with an explicit accessible label.
    // The internal player remains a button and is intentionally not compared
    // to the external URL.
    const streamingCta = release.getByRole("link", {
      name: "Listen to Romantic Love on streaming platforms",
    });
    await expect(streamingCta).toBeVisible();
    await expect(streamingCta).toHaveAttribute("href", CANONICAL_STREAMING_URL);
    await expect(release.getByRole("button", { name: "Listen Now" })).toBeVisible();
  });
});