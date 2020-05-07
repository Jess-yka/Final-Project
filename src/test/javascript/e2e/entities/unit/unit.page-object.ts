import { element, by, ElementFinder } from 'protractor';

export class UnitComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-unit div table .btn-danger'));
  title = element.all(by.css('jhi-unit div h2#page-heading span')).first();
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

export class UnitUpdatePage {
  pageTitle = element(by.id('jhi-unit-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  unitenumSelect = element(by.id('field_unitenum'));
  nameInput = element(by.id('field_name'));
  textInput = element(by.id('field_text'));
  commentsInput = element(by.id('field_comments'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setUnitenumSelect(unitenum: string): Promise<void> {
    await this.unitenumSelect.sendKeys(unitenum);
  }

  async getUnitenumSelect(): Promise<string> {
    return await this.unitenumSelect.element(by.css('option:checked')).getText();
  }

  async unitenumSelectLastOption(): Promise<void> {
    await this.unitenumSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setTextInput(text: string): Promise<void> {
    await this.textInput.sendKeys(text);
  }

  async getTextInput(): Promise<string> {
    return await this.textInput.getAttribute('value');
  }

  async setCommentsInput(comments: string): Promise<void> {
    await this.commentsInput.sendKeys(comments);
  }

  async getCommentsInput(): Promise<string> {
    return await this.commentsInput.getAttribute('value');
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

export class UnitDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-unit-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-unit'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
