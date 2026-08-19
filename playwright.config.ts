import { defineConfig } from '@playwright/test';

// Skip font-ready wait during screenshots to avoid hangs on CI
// with pages that have many declarative shadow roots (e.g. tooltip placement demo).
// See microsoft/playwright#33330.
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';

export default defineConfig({
  testMatch: 'elements/**/*.e2e.ts',
  timeout: 120 * 1000,

  workers: process.env.CI ? 2 : 8,

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
