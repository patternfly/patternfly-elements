import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: 'elements/**/*.e2e.ts',
  timeout: 120 * 1000,

  // Parallel workers deadlock on page.screenshot() in headless Chromium
  // when multiple pages capture concurrently (compositor stops producing
  // frames). Reproduced in the mcr.microsoft.com/playwright container
  // used by CI. See microsoft/playwright#33330.
  workers: process.env.CI ? 1 : 8,

  webServer: process.env.CI ? undefined : {
    command: 'npx cem serve --port 8080 --rendering=chromeless',
    port: 8080,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    viewport: { width: 1920, height: 1080 },
  },

  expect: {
    toMatchSnapshot: { threshold: 0.2 },
  },

  reporter: [
    [
      'html',
      {
        open: 'never',
        outputFolder: 'test-report',
      },
    ],
    process.env.CI ? ['github'] : ['dot'],
  ],
});

