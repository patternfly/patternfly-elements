import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: '**/*.e2e.spec.ts',
  testIgnore: /node_modules|_site|create-element\/templates/,
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
};

export default config;
