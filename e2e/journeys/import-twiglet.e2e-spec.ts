import { browser } from 'protractor';
import { TwigPage } from '../PageObjects/app.po';
import {
  createDefaultJsonImportedTwiglet,
  deleteDefaultJsonImportedTwiglet,
  twigletName
} from '../utils';
import { escape } from 'querystring';

describe('Twiglet Lifecycle', () => {
  let page: TwigPage;

  beforeAll(() => {
    page = new TwigPage();
    createDefaultJsonImportedTwiglet(page);
  });

  afterAll(() => {
    deleteDefaultJsonImportedTwiglet(page);
  });

  it('name and json file are enough to make the form valid', () => {
    expect(page.modalForm.checkIfButtonEnabled('Save Changes')).toBeTruthy();
  });

  it('should close the modal when the submit button is pressed', () => {
    page.modalForm.clickButton('Save Changes');
    expect(page.modalForm.isModalOpen).toBeFalsy();
  });

  it('should redirect to the twiglet page', () => {
    expect(browser.getCurrentUrl()).toEndWith(`/twiglet/${escape(twigletName)}`);
  });
});

