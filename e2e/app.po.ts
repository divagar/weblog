export class WeblogPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('weblog-app h1')).getText();
  }
}
