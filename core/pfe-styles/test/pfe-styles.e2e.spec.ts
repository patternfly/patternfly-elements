import { expect } from '@playwright/test';
import { test } from '@patternfly/pfe-tools/test/playwright/fixtures.js';

test.describe('pfe-styles', () => {
  test('snapshot', async ({ page }) => {
    await page.goto('http://localhost:8080/demo/pfe-styles/');
    await page.waitForLoadState('networkidle');
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('pfe-styles.png');
  });
});
