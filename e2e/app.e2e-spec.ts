import { DjinnPage } from './app.po';

describe('djinn App', function() {
  let page: DjinnPage;

  beforeEach(() => {
    page = new DjinnPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
