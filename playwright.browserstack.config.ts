import type { PlaywrightTestConfig } from '@playwright/test';

import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('@patternfly/pfe-tools/test/playwright/global-setup'),
  globalTeardown: require.resolve('@patternfly/pfe-tools/test/playwright/global-teardown'),

  testDir: 'elements',
  testMatch: '*.e2e.spec.js',

  timeout: 120 * 1000,

  webServer: {
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

  projects: [
    {
      name: 'chrome@latest:Windows 10@browserstack',
      use: {
        browserName: 'chromium',
        channel: 'chrome'
      },
    },
    {
      name: 'chrome@latest:OSX@browserstack',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
    {
      name: 'playwright-firefox@latest:OSX@browserstack',
      use: {
        browserName: 'firefox',
      },
    },
    {
      name: 'playwright-webkit@latest:OSX@browserstack',
      use: {
        browserName: 'webkit',
      },
    },
    {
      name: 'playwright-webkit@latest:OSX@browserstack',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 12 Pro Max'],
      },
    },
  ],
};

export default config;
