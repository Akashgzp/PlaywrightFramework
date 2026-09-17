import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Sauce Demo Authentication', () => {

  test('TC-01:Authenticate with valid account and then log out', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await test.step('Open Sauce Demo login page', async () => {
      await loginPage.open();
    });

    await test.step('Login with valid standard user', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
    });

    await test.step('Verify successful login', async () => {
      await inventoryPage.expectInventoryPage();
    });

    await test.step('Logout from the application', async () => {
      await inventoryPage.logout();
    });

    await test.step('Verify user is returned to login page', async () => {
      await expect(page).toHaveURL(/\/$/);
      await loginPage.expectLoginPage();
    });
  });

  test('TC-02:Verify locked-out user cannot authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open Sauce Demo login page', async () => {
      await loginPage.open();
    });

    await test.step('Login with locked-out user', async () => {
      await loginPage.login('locked_out_user', 'secret_sauce');
    });

    await test.step('Verify locked-out error message', async () => {
      await loginPage.expectLoginPage();

      await loginPage.expectLoginError(
        'Epic sadface: Sorry, this user has been locked out.'
      );
    });
  });
});