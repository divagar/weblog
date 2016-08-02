import { WeblogPage } from './app.po';

describe('weblog App', function() {
  let page: WeblogPage;

  beforeEach(() => {
    page = new WeblogPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('weblog works!');
  });
});
