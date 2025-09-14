import {test, expect} from "@playwright/test";
import PomManager from "../../pages/PomManager.js";

let pm;

test.describe("Login test", () => {
  test.beforeEach(async ({page}) => {
    pm = new PomManager(page);
  });

  test("Login with valid credentials", async ({page}) => {
    await pm.loginPage.navigateToLogin();
    await pm.loginPage.login("tomsmith", "SuperSecretPassword!");

    await expect(page.getByRole("heading", {name: " Secure Area", exact: true})).toBeVisible();

    await expect(pm.securePage.successMassage).toBeVisible();
    await pm.securePage.assertLoggedInMessage("You logged into a secure area!");

    const message = await pm.securePage.getSuccessMassage();
    expect(message).toContain("You logged into");
  });

  test("Login with Invalid credentials", async (page) => {
    await pm.loginPage.navigateToLogin();
    await pm.loginPage.login("invalidUser", "SuperSecretPassword!");
    await expect(pm.securePage.successMassage).toBeVisible();
    await pm.securePage.assertLoggedInMessage("Your username is invalid!");

    const message = await pm.securePage.getSuccessMassage();
    expect(message).toContain("username is invalid");

    await pm.loginPage.assertErrorMessage("Your username is invalid!");

    await pm.clickOn(pm.loginPage.loginButtonSelector);
    await pm.loginPage.loginButton.click();
  });

  test("Check/Uncheck checkboxes", async () => {
    await pm.checkBoxesPage.navigateToCheckBoxes();
    await pm.checkBoxesPage.checkCheckBox(1);
    await expect(pm.checkBoxesPage.checkBox1).toBeChecked();
    await expect(pm.checkBoxesPage.checkBox2).toBeChecked();

    await pm.checkBoxesPage.checkCheckBox(2);
    await expect(pm.checkBoxesPage.checkBox2).not.toBeChecked();

    await expect(pm.checkBoxesPage.checkBox1).toBeChecked();
    await pm.checkBoxesPage.checkCheckBox(1);
    await expect(pm.checkBoxesPage.checkBox1).not.toBeChecked();
  });
});
