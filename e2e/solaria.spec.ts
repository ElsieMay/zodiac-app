import { test, expect } from "@playwright/test";

test.describe("Solaria Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/solaria-map");
  });

  test("should display player class selection heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /select your player class/i }),
    ).toBeVisible();
  });

  test("should display carousel container", async ({ page }) => {
    await expect(page.getByTestId("carousel-container")).toBeVisible();
  });

  test("should have a back button", async ({ page }) => {
    const backButton = page.getByRole("button", { name: /go back to home/i });
    await expect(backButton).toBeVisible();
  });

  test("should navigate back to home when back button is clicked", async ({
    page,
  }) => {
    // Solaria page
    await page.goto("/");
    await page.getByRole("button", { name: /enter solaria/i }).click();
    await expect(page).toHaveURL("/solaria-map");

    // Back to home page
    await page.getByRole("button", { name: /go back to home/i }).click();
    await expect(page).toHaveURL("/");
  });

  test("should render Three.js canvas", async ({ page }) => {
    const canvas = page.getByTestId("carousel-canvas").locator("canvas");
    await expect(canvas).toBeVisible();
  });

  test("should render background canvas", async ({ page }) => {
    const backgroundCanvas = page
      .getByTestId("background-canvas")
      .locator("canvas");
    await expect(backgroundCanvas).toBeVisible();
  });
});
