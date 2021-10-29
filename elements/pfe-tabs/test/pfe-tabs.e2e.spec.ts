import { expect } from '@playwright/test';
import { test } from '@patternfly/pfe-tools/test/playwright/fixtures.js';

test.describe('pfe-tabs', () => {
  // Run tests in this file with portrait-like viewport.
  test.use({ viewport: { width: 1200, height: 1000 } });

  test('snapshot', async ({ page }) => {
    await page.goto('http://localhost:8080/demo/pfe-tabs/');
    await page.waitForLoadState('networkidle');
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('pfe-tabs.png');
  });
});
