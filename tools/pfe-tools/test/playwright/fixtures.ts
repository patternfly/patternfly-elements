/* eslint-env node */
/* eslint-disable camelcase */
import dotenv from 'dotenv';
dotenv.config();

import { test as playwrightTest } from '@playwright/test';
import cp from 'child_process';
import BrowserStackLocal from 'browserstack-local';

const [, clientPlaywrightVersion] = cp
  .execSync('npx playwright --version')
  .toString()
  .trim()
  .split(' ');

interface Capability {
  browser: string|'chrome';
  browser_version?: string;
  os: string|'osx';
  os_version: string|'catalina';
  name: string;
  build: string;
  'browserstack.username': string;
  'browserstack.accessKey': string;
  'browserstack.local': string|boolean;
  'client.playwrightVersion': string;
}

// BrowserStack Specific Capabilities.
const caps: Capability = {
  'browser': 'chrome',
  'os': 'osx',
  'os_version': 'catalina',
  'name': 'My first playwright test',
  'build': 'playwright-build-1',
  'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'YOUR_USERNAME',
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || 'YOUR_ACCESS_KEY',
  'browserstack.local': process.env.BROWSERSTACK_LOCAL || false,
  'client.playwrightVersion': clientPlaywrightVersion,
};

export const bsLocal = new BrowserStackLocal.Local();

// replace YOUR_ACCESS_KEY with your key. You can also set an environment variable - "BROWSERSTACK_ACCESS_KEY".
export const BS_LOCAL_ARGS = {
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'YOUR_ACCESS_KEY',
};

// Patching the capabilities dynamically according to the project name.
function patchCaps(name: string) {
  const [combination] = name.split(/@browserstack/);
  const [browerCaps, osCaps] = combination.split(/:/);
  const [browser, browser_version] = browerCaps.split(/@/);
  const osCapsSplit = osCaps.split(/ /);
  const os = osCapsSplit.shift();
  const os_version = osCapsSplit.join(' ');
  caps.browser = browser ? browser : 'chrome';
  caps.browser_version = browser_version ? browser_version : 'latest';
  caps.os = os ? os : 'osx';
  caps.os_version = os_version ? os_version : 'catalina';
  caps.name = name;
}

const isHash = (entity: unknown) =>
  Boolean(entity && typeof (entity) === 'object' && !Array.isArray(entity));

const nestedKeyValue = (hash: any, keys: string[]) =>
  keys.reduce((hash, key) =>
    (isHash(hash) ? hash[key] : undefined), hash);

export const test = playwrightTest.extend({
  browser: async ({ playwright, browser }, use, workerInfo) => {
    try {
      // Use BrowserStack Launched Browser according to capabilities for cross-browser testing.
      if (workerInfo.project.name.match(/browserstack/)) {
        patchCaps(workerInfo.project.name);
        const vBrowser = await playwright.chromium.connect({
          wsEndpoint:
            `wss://cdp.browserstack.com/playwright?caps=` +
            `${encodeURIComponent(JSON.stringify(caps))}`,
        });
        await use(vBrowser);
      } else {
        // Use Local Browser for testing.
        await use(browser);
      }
    } catch (error) {
      console.error(error);
    }
  },
  page: async ({ page, browser }, use, testInfo) => {
    // Overriding page function to mark the status on BrowserStack.
    if (testInfo.project.name.match(/browserstack/)) {
      const vPage = await browser.newPage();
      await use(vPage);
      const testResult = {
        action: 'setSessionStatus',
        arguments: {
          status: testInfo.status,
          reason: nestedKeyValue(testInfo, ['error', 'message']),
        },
      };
      await vPage.evaluate(() => { void 0; },
        `browserstack_executor: ${JSON.stringify(testResult)}`);
      await vPage.close();
    } else
      use(page);
  },
});
