import {test, expect} from "@playwright/test";
import {chromium} from "playwright";

// browser => context => page
let browser;
let context;
let page;

test.beforeAll(async () => {
  // launch chrome browser
  browser = await chromium.launch();
  console.log("Before All Hook Launched chrome browser");
});

test.beforeEach(async () => {
  // create context
  context = await browser.newContext();
  // crete new page
  page = await context.newPage();

  await page.goto("https://the-internet.herokuapp.com/");
  console.log("Before Each Hook Launched new page");
  await page.pause();
});

test.afterEach(async () => {
  // close page and context
  await page.close();
  await context.close();
  console.log("After Each Hook close page and context");
});

test.afterAll(async () => {
  // close browser
  await browser.close();
  console.log("After All Hook close browser");
});

test.describe("Describe block for hooks", () => {
  test("Validate A/B Testing", async () => {
    await page.getByRole("link", {name: "A/B Testing"}).click();
    await expect(page.locator("h3")).toContainText("A/B Test");
  });

  test("Validate checkboxes", async () => {
    await page.getByRole("link", {name: "Checkboxes"}).click();
    await expect(page.getByRole("checkbox").nth(0)).not.toBeChecked();

    const checkbox = await page.isChecked('input[type="checkbox"]:first-child');
    expect(checkbox).toBe(false);
  });

  test("Geolocation", async () => {
    context = await browser.newContext({
      permissions: ["geolocation"],
      geolocation: {latitude: 37.774929, longitude: -122.419416},
      viewport: {width: 1280, height: 720},
    });
    page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/geolocation");
    await page.getByRole("button", {name: "Where am I?"}).click();

    const lat = await page.textContent("#lat-value");
    const long = await page.textContent("#long-value");
    expect(parseFloat(lat)).toBeCloseTo(37.774929);
    expect(parseFloat(long)).toBeCloseTo(-122.419416);
  });
});
