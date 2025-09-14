import CommonActions from "../utils/commonActions.js";
import LoginPage from "./LoginPage.js";
import SecurePage from "./SecurePage.js";
import CheckBoxesPage from "./CheckBoxesPage.js";

export default class PomManager extends CommonActions {
  constructor(page) {
    super(page); // Must call super() to inherit from CommonActions
    this.loginPage = new LoginPage(page);
    this.securePage = new SecurePage(page);
    this.checkBoxesPage = new CheckBoxesPage(page);
  }
}
