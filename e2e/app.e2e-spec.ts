import { ExpenseManagerPage } from './app.po';

describe('expense-manager App', () => {
  let page: ExpenseManagerPage;

  beforeEach(() => {
    page = new ExpenseManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
