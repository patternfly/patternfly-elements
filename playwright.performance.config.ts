import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'test',
  testMatch: '*.spec.js',

  webServer: {
    command: 'echo "starting" && npm run docs:eleventy',
    port: 8080,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    viewport: { width: 1920, height: 1080 },
  },
};

export default config;
