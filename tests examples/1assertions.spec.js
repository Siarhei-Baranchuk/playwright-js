import {test, expect} from "@playwright/test";

test.describe.only("Assertions, Verify test page behavior", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("https://the-internet.herokuapp.com/");
  });

  test("URL and Title assertions @smoke", async ({page}) => {
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/");
    await expect(page).toHaveTitle("The Internet");
  });

  //
  test("Visibile and anable assertions @regression", async ({page}) => {
    await expect(page.locator("h1.heading")).toBeVisible();
    await expect(page.locator("h1.heading")).toBeEnabled();

    await expect(page.locator("h1.heading")).toBeVisible();
    await expect(page.locator("h2:has-text('Available Examples')")).toBeEnabled();
  });

  test("Assertions", async ({page}) => {
    // text assertions
    await expect(page.locator("h1.heading")).toContainText("Welcome");
    await expect(page.locator("h1.heading")).toContainText("internet");
    await expect(page.locator("h1.heading")).toHaveText("Welcome to the-internet");
  });

  test("Visibile and anable assertions", async ({page}) => {
    // count assertion
    await expect(page.locator("a")).toHaveCount(46);
  });

  test("Other assertions", async ({page}) => {
    // to be checked assertion
    await page.goto("https://the-internet.herokuapp.com/checkboxes");

    await page.getByRole("checkbox").nth(0).check();
    await page.getByRole("checkbox").nth(1).uncheck();

    await expect(page.getByRole("checkbox").nth(0)).toBeChecked();
    await expect(page.getByRole("checkbox").nth(1)).not.toBeChecked();

    // have value assertion
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.locator("#username").fill("tomsmith");
    await page.locator("#password").fill("SuperSecretPassword!");

    await expect(page.locator("#username")).toHaveValue("tomsmith");
    await expect(page.locator("#password")).toHaveValue("SuperSecretPassword!");

    await expect(page.getByRole("button", {name: " Login"})).toBeEnabled();
    await expect(page.getByRole("button", {name: " Login"})).toBeVisible();

    // verify test store in variable
    await page.goto("https://the-internet.herokuapp.com/");
    const headerText = await page.locator("h1").textContent();
    expect(headerText).toBe("Welcome to the-internet");
  });
});
