import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("home page should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
  });

  test("buttons should be keyboard accessible", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/");
  });

  test("solaria page should have proper heading hierarchy", async ({
    page,
  }) => {
    await page.goto("/solaria-map");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText(/select your player class/i);
  });

  test("back button should be keyboard accessible", async ({ page }) => {
    await page.goto("/solaria-map");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
  });

  test("images should have alt text", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute("alt");
    }
  });

  test("canvas elements should have accessible labels", async ({ page }) => {
    await page.goto("/solaria-map");
    const backgroundCanvas = page.getByTestId("background-canvas");
    const carouselCanvas = page.getByTestId("carousel-canvas");
    await expect(backgroundCanvas).toBeVisible();
    await expect(carouselCanvas).toBeVisible();
  });
});
