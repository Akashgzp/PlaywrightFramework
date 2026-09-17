import { defineConfig, devices } from '@playwright/test';

declare const process: { env: { CI?: string } };

export default defineConfig({
  testDir: './tests',

  /* Run tests in parallel */
  fullyParallel: true,

  /* Fail the build on CI if test.only is accidentally left */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests on CI */
  retries: process.env.CI ? 2 : 0,

  /* Workers */
  workers: process.env.CI ? 1 : undefined,

  /* HTML Report */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports', open: 'never' }]
  ],

  /* Shared settings */
  use: {
    /* SauceDemo base URL */
    baseURL: 'https://www.saucedemo.com',

    /* SauceDemo uses data-test attributes */
    testIdAttribute: 'data-test',

    /* Trace on first retry */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video on failure */
    video: 'retain-on-failure'
  },

  /* Browser projects */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari']
      },
    },
  ],
});