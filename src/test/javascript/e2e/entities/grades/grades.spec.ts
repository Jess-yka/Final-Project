import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GradesComponentsPage, GradesDeleteDialog, GradesUpdatePage } from './grades.page-object';

const expect = chai.expect;

describe('Grades e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let gradesComponentsPage: GradesComponentsPage;
  let gradesUpdatePage: GradesUpdatePage;
  let gradesDeleteDialog: GradesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Grades', async () => {
    await navBarPage.goToEntity('grades');
    gradesComponentsPage = new GradesComponentsPage();
    await browser.wait(ec.visibilityOf(gradesComponentsPage.title), 5000);
    expect(await gradesComponentsPage.getTitle()).to.eq('Grades');
    await browser.wait(ec.or(ec.visibilityOf(gradesComponentsPage.entities), ec.visibilityOf(gradesComponentsPage.noResult)), 1000);
  });

  it('should load create Grades page', async () => {
    await gradesComponentsPage.clickOnCreateButton();
    gradesUpdatePage = new GradesUpdatePage();
    expect(await gradesUpdatePage.getPageTitle()).to.eq('Create or edit a Grades');
    await gradesUpdatePage.cancel();
  });

  it('should create and save Grades', async () => {
    const nbButtonsBeforeCreate = await gradesComponentsPage.countDeleteButtons();

    await gradesComponentsPage.clickOnCreateButton();

    await promise.all([gradesUpdatePage.gradesSelectLastOption(), gradesUpdatePage.unitSelectLastOption()]);

    await gradesUpdatePage.save();
    expect(await gradesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await gradesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Grades', async () => {
    const nbButtonsBeforeDelete = await gradesComponentsPage.countDeleteButtons();
    await gradesComponentsPage.clickOnLastDeleteButton();

    gradesDeleteDialog = new GradesDeleteDialog();
    expect(await gradesDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Grades?');
    await gradesDeleteDialog.clickOnConfirmButton();

    expect(await gradesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
