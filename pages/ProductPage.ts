import { Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly productImage: Locator;
  readonly addToCartButton: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productTitle = page.getByTestId('inventory-item-name');
    this.productPrice = page.getByTestId('inventory-item-price');
    this.productDescription = page.getByTestId('inventory-item-desc');
    this.productImage = page.getByRole('img', { name: 'Sauce Labs Backpack' });
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.backToProductsButton = page.getByRole('button', { name: 'Back to products' });
  }

  async getProductTitle(): Promise<string> {
    return (await this.productTitle.textContent()) ?? '';
  }

  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent()) ?? '';
  }

  async getProductDescription(): Promise<string> {
    return (await this.productDescription.textContent()) ?? '';
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
}