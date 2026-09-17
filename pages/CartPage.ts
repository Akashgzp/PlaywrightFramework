import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartPage: Locator;
  readonly cartItem: Locator;
  readonly cartItemName: Locator;
  readonly cartItemPrice: Locator;
  readonly cartItemQuantity: Locator;
  readonly removeButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartPage = page.getByTestId('cart-list');
    this.cartItem = page.getByTestId('inventory-item');
    this.cartItemName = this.cartItem.getByTestId('inventory-item-name');
    this.cartItemPrice = this.cartItem.getByTestId('inventory-item-price');
    this.cartItemQuantity = this.cartItem.getByTestId('item-quantity');
    this.removeButton = this.cartItem.getByRole('button', { name: /^Remove/ });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  getCartPage(): Locator {
    return this.cartPage;
  }

  async getCartItemName(): Promise<string> {
    return (await this.cartItemName.first().textContent()) ?? '';
  }

  async getCartItemPrice(): Promise<string> {
    return (await this.cartItemPrice.first().textContent()) ?? '';
  }

  async getCartItemQuantity(): Promise<string> {
    return (await this.cartItemQuantity.first().textContent()) ?? '';
  }

  async removeItem(): Promise<void> {
    await this.removeButton.first().click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
