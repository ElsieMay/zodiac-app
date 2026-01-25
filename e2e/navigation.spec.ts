import { test, expect } from "@playwright/test";

test.describe("Navigation Flow", () => {
  test("should have correct page titles", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/zodiac/i);
  });

  test("should navigate through complete flow: home -> solaria -> home", async ({
    page,
  }) => {
    // Home page
    await page.goto("/");
    const button = page.getByRole("button", { name: /enter solaria/i });
    await expect(button).toBeVisible();
    await expect(page).toHaveURL("/");
    await button.click();

    // Solaria page
    await expect(page).toHaveURL("/solaria-map");
    await expect(
      page.getByRole("heading", { name: /select your player class/i }),
    ).toBeVisible();

    // Navigate back to Home
    await page.getByRole("button", { name: /go back to home/i }).click();
    await expect(page).toHaveURL("/");
    await expect(button).toBeVisible();
  });

  test("should handle direct navigation to /solaria-map", async ({ page }) => {
    await page.goto("/solaria-map");
    await expect(
      page.getByRole("heading", { name: /select your player class/i }),
    ).toBeVisible();
  });

  test("should handle browser back button", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /enter solaria/i }).click();
    await page.goBack();
    await expect(page).toHaveURL("/");
  });

  test("should handle browser forward button", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /enter solaria/i }).click();
    await page.goBack();
    await page.goForward();
    await expect(page).toHaveURL("/solaria-map");
  });
});
