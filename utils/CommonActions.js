export default class CommonActions {
  constructor(page) {
    this.page = page;
  }

  async navigateToURL(url) {
    // await this.page.pause()
    await this.page.goto(url);
  }

  async clickOn(selector) {
    await this.page.click(selector);
  }

  async fillInToText(selector, text) {
    await this.page.fill(selector, text);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async isChecked(selector) {
    return await this.page.isChecked(selector);
  }
}
