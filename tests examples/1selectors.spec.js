import {test, expect} from "@playwright/test";

test.only("Selectors", async ({page}) => {
  await page.goto("http://127.0.0.1:5500/clickMe.html");

  // ID selector
  await page.locator("#clickButton").click();

  // Class selector
  await page.locator(".button-style").click();

  // Tag and Class
  await page.locator("button.button-style").click();

  // Attribute Value
  await page.locator('[data-action="increment"]').click();
  await page.locator('[id="clickButton"]').click();
  await page.locator('[class="button-style"]').click();

  // Partial attribute *
  await page.locator('[role*="but"]').click(); // button

  // Text content
  await page.locator("text=CLICK ME"); // exact text
  await page.locator("button:has-text('click')").click(); // partial text

  // page.getByRole() to locate by explicit and implicit accessibility attributes.
  // page.getByText() to locate by text content.
  // page.getByLabel() to locate a form control by associated label's text.
  // page.getByPlaceholder() to locate an input by placeholder.
  // page.getByAltText() to locate an element, usually image, by its text alternative.
  // page.getByTitle() to locate an element by its title attribute.
  // page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).

  //   await page.getByRole("heading", {name: "Sign up"}).click();
  //   await page.getByRole("checkbox", {name: "Subscribe"}).check();
  await page.getByRole("button", {name: /click/i}).click();

  await expect(page.locator("#counter")).toContainText("9");
});
