import type { PlaywrightTestConfig } from '@playwright/test';

import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'test',
  testMatch: '*.e2e.spec.js',

  globalSetup: require.resolve('@patternfly/pfe-tools/test/playwright/global-setup'),
  globalTeardown: require.resolve('@patternfly/pfe-tools/test/playwright/global-teardown'),

  webServer: {
    command: 'npm run build && npx http-server _site',
    port: 8080,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    headless: false,
    viewport: { width: 1920, height: 1080 },
  },

  timeout: 6000,

  projects: [
    // -- BrowserStack Projects --
    // name should be of the format browser@browser_version:os os_version@browserstack

    // Windows 10 Chrome
    {
      name: 'chrome@latest:Windows 10@browserstack',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },

    // macOS Firefox
    {
      name: 'playwright-firefox@latest:OSX Catalina@browserstack',
      use: {
        browserName: 'firefox',
        ignoreHTTPSErrors: true,
      },
    },

    // macOS Safari
    {
      name: 'playwright-webkit@latest:OSX Big Sur@browserstack',
      use: {
        browserName: 'webkit',
      },
    },

    // iPhone
    // {
    //   name: 'playwright-webkit@latest:OSX Big Sur@browserstack',
    //   use: {
    //     browserName: 'webkit',
    //     ...devices['iPhone 12']
    //   },
    // },

  ],
};
export default config;
