# Sauce Demo Authentication Test Plan

## Application Overview

Authentication coverage for Sauce Demo using the existing Playwright TypeScript project. The repository currently contains starter tests and a broader Sauce Demo core functionality plan; this plan documents the authentication scenarios without implementing automation code, page objects, locators, fixtures, or utilities.

## Test Scenarios

### 1. Sauce Demo Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. standard_user can log in and log out

**File:** `tests/saucedemo/authentication.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    - expect: The Swag Labs login form is visible with Username, Password, and Login controls.
  2. Enter username standard_user, enter password secret_sauce, and submit the login form.
    - expect: The browser navigates to /inventory.html.
    - expect: The Products inventory page is visible.
  3. Open the inventory navigation menu and select Logout.
    - expect: The browser returns to https://www.saucedemo.com/.
    - expect: The login form is visible.
    - expect: The inventory page is no longer displayed.

#### 1.2. locked_out_user remains on the login page

**File:** `tests/saucedemo/authentication.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    - expect: The Swag Labs login form is visible.
  2. Enter username locked_out_user, enter password secret_sauce, and submit the login form.
    - expect: The browser remains on https://www.saucedemo.com/.
    - expect: The login form remains visible.
    - expect: An alert displays: Epic sadface: Sorry, this user has been locked out.
