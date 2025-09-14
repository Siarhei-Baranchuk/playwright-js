import {expect} from "@playwright/test";
import CommonActions from "../utils/commonActions.js";

export default class SecurePage extends CommonActions {
  constructor(page) {
    super(page);
    this.successMassageSelector = "#flash";
    this.successMassage = page.locator("#flash");
  }

  async getSuccessMassage() {
    return await this.getText(this.successMassageSelector);
  }

  async assertLoggedInMessage(passedMessage) {
    const message = await this.getSuccessMassage();
    expect(message).toContain(passedMessage);
  }
}
