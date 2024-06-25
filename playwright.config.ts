import { defineConfig, type ReporterDescription } from '@playwright/test';

export default defineConfig({
  testMatch: 'elements/**/*.e2e.ts',
  timeout: 120 * 1000,

  workers: process.env.CI ? 2 : 8,

  webServer: process.env.CI ? undefined : {
    command: 'npx @web/dev-server --config ./docs/demo/web-dev-server.demo.config.js',
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
