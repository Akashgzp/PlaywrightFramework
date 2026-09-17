# Sauce Demo Core Functionality Test Plan

## Application Overview

Functional test plan for https://www.saucedemo.com/ (Swag Labs), covering authentication, product discovery, cart management, checkout and order completion, and application navigation/state controls. Each scenario assumes a fresh browser state and uses the documented Sauce Demo credentials where required.

## Test Scenarios

### 1. Sauce Demo Core User Journeys

**Seed:** `tests/seed.spec.ts`

#### 1.1. Authenticate with valid and locked-out accounts, then log out

**File:** `tests/saucedemo/authentication.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open https://www.saucedemo.com/.
    - expect: The Swag Labs login page is displayed with Username, Password, and Login controls.
  2. Enter username `standard_user`, enter password `secret_sauce`, and click Login.
    - expect: The user is authenticated and redirected to `/inventory.html`.
    - expect: The Products catalog is visible and the cart is empty.
  3. Open the navigation menu and click Logout.
    - expect: The user is returned to the login page.
    - expect: No authenticated catalog page is displayed.
  4. Enter username `locked_out_user`, enter password `secret_sauce`, and click Login.
    - expect: The user remains on the login page.
    - expect: An alert states `Epic sadface: Sorry, this user has been locked out.`

#### 1.2. Browse the product catalog, sort products, and view product details

**File:** `tests/saucedemo/catalog.spec.ts`

**Steps:**
  1. Start from a fresh browser context, open https://www.saucedemo.com/, and log in as `standard_user` with password `secret_sauce`.
    - expect: The user is redirected to `/inventory.html`.
    - expect: Six products are displayed with names, descriptions, prices, and Add to cart controls.
  2. Open the Sort products control and select `Price (low to high)`.
    - expect: The catalog order changes to ascending price order.
    - expect: Sauce Labs Onesie at $7.99 is first and Sauce Labs Fleece Jacket at $49.99 is last.
  3. Select the Sauce Labs Backpack product to open its details.
    - expect: The product detail page displays the Sauce Labs Backpack name, description, price `$29.99`, image, and Add to cart control.
  4. Use the Back to products control.
    - expect: The user returns to the inventory catalog.
    - expect: The selected sort order remains applied or the catalog returns to a valid product listing without errors.

#### 1.3. Add, review, remove, and continue shopping from the cart

**File:** `tests/saucedemo/cart-management.spec.ts`

**Steps:**
  1. Start from a fresh browser context, open https://www.saucedemo.com/, and log in as `standard_user` with password `secret_sauce`.
    - expect: The inventory page is displayed and the cart badge is empty.
  2. Add Sauce Labs Backpack and Sauce Labs Bike Light to the cart.
    - expect: Both Add to cart controls change to Remove controls.
    - expect: The cart badge shows 2 items.
  3. Open the shopping cart.
    - expect: The cart page lists exactly the Backpack and Bike Light with quantity, descriptions, and prices.
    - expect: Checkout and Continue Shopping controls are available.
  4. Remove Sauce Labs Bike Light.
    - expect: Only the Backpack remains in the cart.
    - expect: The cart badge updates to 1 item.
  5. Click Continue Shopping, then open the cart again.
    - expect: The user returns to the inventory page and can reopen the cart.
    - expect: The Backpack remains in the cart and the cart state is preserved.

#### 1.4. Validate checkout information and complete an order

**File:** `tests/saucedemo/checkout.spec.ts`

**Steps:**
  1. Start from a fresh browser context, open https://www.saucedemo.com/, log in as `standard_user` with password `secret_sauce`, add Sauce Labs Backpack, and open the cart.
    - expect: The cart contains the Backpack at $29.99.
  2. Click Checkout and then click Continue without entering checkout information.
    - expect: The user remains on the checkout information page.
    - expect: An alert states `Error: First Name is required`.
  3. Enter first name `Ada`, last name `Lovelace`, postal code `12345`, and click Continue.
    - expect: The user reaches Checkout: Overview.
    - expect: The overview shows the Backpack, SauceCard payment information, free shipping, item total `$29.99`, tax `$2.40`, and total `$32.39`.
  4. Click Finish.
    - expect: The user reaches Checkout: Complete!.
    - expect: A `Thank you for your order!` confirmation is displayed.
    - expect: The cart is empty.

#### 1.5. Use navigation and reset application state

**File:** `tests/saucedemo/navigation-and-state.spec.ts`

**Steps:**
  1. Start from a fresh browser context, open https://www.saucedemo.com/, and log in as `standard_user` with password `secret_sauce`.
    - expect: The inventory page is displayed.
  2. Add Sauce Labs Backpack, open the navigation menu, and inspect the available menu entries.
    - expect: The menu includes All Items, Dynamic Catalog, About, Logout, and Reset App State.
  3. Click Reset App State.
    - expect: The cart badge is cleared.
    - expect: The Backpack is no longer represented as an item in the cart and its inventory action is reset to Add to cart.
  4. Open the navigation menu and click All Items.
    - expect: The user is on `/inventory.html` and the product catalog is displayed.
  5. Open the navigation menu and click Logout.
    - expect: The user is returned to the login page.
    - expect: The authenticated session is no longer active.
