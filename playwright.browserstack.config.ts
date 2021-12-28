import type { PlaywrightTestConfig } from '@playwright/test';

import baseConfig from './playwright.config';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  ...baseConfig,
  globalSetup: require.resolve('@patternfly/pfe-tools/test/playwright/global-setup'),
  globalTeardown: require.resolve('@patternfly/pfe-tools/test/playwright/global-teardown'),
  webServer: undefined,
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
