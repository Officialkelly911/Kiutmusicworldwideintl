import { expect, test } from "@playwright/test";

test.describe("server-level 404 experience", () => {
  test("keeps the branded client-side 404 screen while the document response is 404", async ({
    page,
  }) => {
    const response = await page.goto("/this-page-does-not-exist");

    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "404 Page Not Found" }),
    ).toBeVisible();
    await expect(
      page.getByText("The page you’re looking for doesn’t exist or may have moved."),
    ).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://kiutmusic.com/404",
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, follow",
    );
  });
});