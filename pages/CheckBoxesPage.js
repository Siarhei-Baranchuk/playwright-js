import {expect} from "@playwright/test";
import CommonActions from "../utils/commonActions.js";

export default class CheckBoxesPage extends CommonActions {
  constructor(page) {
    super(page);
    this.checkBox1 = page.getByRole("checkbox").nth(0);
    this.checkBox2 = page.getByRole("checkbox").nth(1);
  }

  async navigateToCheckBoxes() {
    await this.navigateToURL("https://the-internet.herokuapp.com/checkboxes");
  }

  async checkCheckBox(index) {
    await this.clickOn(`input[type="checkbox"]:nth-of-type(${index})`);
  }
}
