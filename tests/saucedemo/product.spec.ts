import { expect, test } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';

test.describe('Sauce Demo Product Details', () => {
  test('TC-06: Verify user can open a product details page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productPage = new ProductPage(page);

    await test.step('Login with valid standard user', async () => {
      await loginPage.open();
      await loginPage.login('standard_user', 'secret_sauce');
    });

    await test.step('Verify inventory page is open', async () => {
      await inventoryPage.expectInventoryPage();
    });

    await test.step('Open Sauce Labs Backpack details', async () => {
      await productPage.page.goto('/inventory-item.html?id=4');
    });

    await test.step('Verify product details page is displayed', async () => {
      await expect(productPage.page).toHaveURL(/inventory-item\.html\?id=4/);
      await expect(productPage.productTitle).toBeVisible();
    });
  });

  test('TC-07: Verify product details', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productPage = new ProductPage(page);

    await test.step('Login and open Sauce Labs Backpack details', async () => {
      await loginPage.open();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.expectInventoryPage();
      await productPage.page.goto('/inventory-item.html?id=4');
    });

    await test.step('Verify product title', async () => {
      await expect(productPage.getProductTitle()).resolves.toBe('Sauce Labs Backpack');
    });

    await test.step('Verify product price', async () => {
      await expect(productPage.getProductPrice()).resolves.toBe('$29.99');
    });

    await test.step('Verify product description', async () => {
      await expect(productPage.getProductDescription()).resolves.toContain(
        'carry.allTheThings() with the sleek, streamlined Sly Pack'
      );
    });

    await test.step('Verify product image is visible', async () => {
      await expect(productPage.productImage).toBeVisible();
    });
  });

  test('TC-08: Verify Add to Cart from ProductPage', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productPage = new ProductPage(page);

    await test.step('Login and open Sauce Labs Backpack details', async () => {
      await loginPage.open();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.expectInventoryPage();
      await productPage.page.goto('/inventory-item.html?id=4');
    });

    await test.step('Add product to cart', async () => {
      await productPage.addToCart();
    });

    await test.step('Verify product was added to cart', async () => {
      await expect(productPage.addToCartButton).toBeHidden();
    });
  });
});
