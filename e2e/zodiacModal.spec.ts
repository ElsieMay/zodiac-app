import { test, expect } from "@playwright/test";

test.describe("Zodiac Modal Interactions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/solaria-map");
    // make sure canvas and carousel load
    await page.waitForSelector('[data-testid="solaria-header"]');
    await page.waitForSelector('[data-testid="carousel-container"]');
  });

  test("should display carousel container", async ({ page }) => {
    const carousel = page.getByTestId("carousel-container");
    await expect(carousel).toBeVisible();
  });

  test("carousel should have canvas element", async ({ page }) => {
    const canvas = page.getByTestId("carousel-canvas");
    await expect(canvas).toBeVisible();
  });

  test("modal should not be visible initially", async ({ page }) => {
    const modal = page.getByTestId("carousel-modal");
    await expect(modal).toBeHidden();
  });
});
