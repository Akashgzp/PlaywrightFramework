import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryTitle: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.inventoryTitle = page.getByText('Products', { exact: true });
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });

    // SauceDemo logout element
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async expectInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.inventoryTitle).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}