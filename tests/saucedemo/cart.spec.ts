import { expect, test } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';

test.describe('Sauce Demo Cart', () => {
  test('TC-06:Verify user can open the Cart page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await test.step('Login with valid standard user', async () => {
      await loginPage.open();
      await loginPage.login('standard_user', 'secret_sauce');
    });

    await test.step('Verify inventory page is open', async () => {
      await inventoryPage.expectInventoryPage();
    });

    await test.step('Add Sauce Labs Backpack to the cart', async () => {
      await productPage.page.goto('/inventory-item.html?id=4');
      await productPage.addToCart();
    });

    await test.step('Open the Cart page', async () => {
      await cartPage.page.goto('/cart.html');
    });

    await test.step('Verify Cart page is displayed', async () => {
      await expect(cartPage.getCartPage()).toBeVisible();
    });
  });

  test('TC-07: Verify product details in Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await test.step('Login and add Sauce Labs Backpack to the cart', async () => {
      await loginPage.open();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.expectInventoryPage();
      await productPage.page.goto('/inventory-item.html?id=4');
      await productPage.addToCart();
    });

    await test.step('Open the Cart page', async () => {
      await cartPage.page.goto('/cart.html');
    });

    await test.step('Verify product name', async () => {
      await expect(cartPage.getCartItemName()).resolves.toBe('Sauce Labs Backpack');
    });

    await test.step('Verify product price', async () => {
      await expect(cartPage.getCartItemPrice()).resolves.toBe('$29.99');
    });

    await test.step('Verify product quantity', async () => {
      await expect(cartPage.getCartItemQuantity()).resolves.toBe('1');
    });
  });

  test('TC-08: Verify Remove Product from Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await test.step('Login and add a product to the cart', async () => {
      await loginPage.open();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.expectInventoryPage();
      await productPage.page.goto('/inventory-item.html?id=4');
      await productPage.addToCart();
    });

    await test.step('Open the Cart page', async () => {
      await cartPage.page.goto('/cart.html');
    });

    await test.step('Remove the product from the cart', async () => {
      await cartPage.removeItem();
    });

    await test.step('Verify the product is no longer displayed', async () => {
      await expect(cartPage.cartItem).toHaveCount(0);
    });
  });

  test('TC-09: Verify Continue Shopping', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await test.step('Login and add a product to the cart', async () => {
      await loginPage.open();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.expectInventoryPage();
      await productPage.page.goto('/inventory-item.html?id=4');
      await productPage.addToCart();
    });

    await test.step('Open the Cart page', async () => {
      await cartPage.page.goto('/cart.html');
    });

    await test.step('Continue shopping', async () => {
      await cartPage.continueShopping();
    });

    await test.step('Verify inventory page is displayed', async () => {
      await inventoryPage.expectInventoryPage();
    });
  });

  test('TC-10: Verify Checkout navigation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await test.step('Login and add a product to the cart', async () => {
      await loginPage.open();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.expectInventoryPage();
      await productPage.page.goto('/inventory-item.html?id=4');
      await productPage.addToCart();
    });

    await test.step('Open the Cart page', async () => {
      await cartPage.page.goto('/cart.html');
    });

    await test.step('Proceed to checkout', async () => {
      await cartPage.proceedToCheckout();
    });

    await test.step('Verify Checkout page is opened', async () => {
      await expect(cartPage.page).toHaveURL(/checkout-step-one\.html/);
    });
  });
});
