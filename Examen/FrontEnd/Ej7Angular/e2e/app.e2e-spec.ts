import { Ej7AngularPage } from './app.po';

describe('ej7-angular App', () => {
  let page: Ej7AngularPage;

  beforeEach(() => {
    page = new Ej7AngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
