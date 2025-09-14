import {expect} from "@playwright/test";
import CommonActions from "../utils/commonActions.js";

export default class LoginPage extends CommonActions {
  constructor(page) {
    super(page);
    this.usenameSelector = "#username";
    this.passwordSelector = "#password";
    this.unSuccessMassageSelector = "#flash";
    this.loginButtonSelector = "button[type='submit']";
    this.loginButton = page.locator("button[type='submit']");
  }

  async navigateToLogin() {
    await this.navigateToURL("https://the-internet.herokuapp.com/login");
  }

  async login(username, password) {
    await this.fillInToText(this.usenameSelector, username);
    await this.fillInToText(this.passwordSelector, password);
    await this.clickOn(this.loginButtonSelector);
  }

  async getErrorMessage() {
    return await this.getText(this.unSuccessMassageSelector);
  }

  async assertErrorMessage(expectedMessage) {
    const actualMessage = await this.getErrorMessage();
    expect(actualMessage).toContain(expectedMessage);
  }
}
