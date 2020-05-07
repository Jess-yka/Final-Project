import { element, by, ElementFinder } from 'protractor';

export class GradesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-grades div table .btn-danger'));
  title = element.all(by.css('jhi-grades div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class GradesUpdatePage {
  pageTitle = element(by.id('jhi-grades-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  gradesSelect = element(by.id('field_grades'));

  unitSelect = element(by.id('field_unit'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setGradesSelect(grades: string): Promise<void> {
    await this.gradesSelect.sendKeys(grades);
  }

  async getGradesSelect(): Promise<string> {
    return await this.gradesSelect.element(by.css('option:checked')).getText();
  }

  async gradesSelectLastOption(): Promise<void> {
    await this.gradesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async unitSelectLastOption(): Promise<void> {
    await this.unitSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async unitSelectOption(option: string): Promise<void> {
    await this.unitSelect.sendKeys(option);
  }

  getUnitSelect(): ElementFinder {
    return this.unitSelect;
  }

  async getUnitSelectedOption(): Promise<string> {
    return await this.unitSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class GradesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-grades-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-grades'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
