import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display the awakening title", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: /you have been summoned for the awakening/i,
      }),
    ).toBeVisible();
  });

  test("should have Enter Solaria button", async ({ page }) => {
    await page.goto("/");

    const button = page.getByRole("button", { name: /enter solaria/i });
    await expect(button).toBeVisible();
  });

  test("should navigate to Zodiac selections when button is clicked", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /enter solaria/i }).click();

    await expect(page).toHaveURL("/solaria-map");
    await expect(
      page.getByRole("heading", { name: /select your player class/i }),
    ).toBeVisible();
  });
});
