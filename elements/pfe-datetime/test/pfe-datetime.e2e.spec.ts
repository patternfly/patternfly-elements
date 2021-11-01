import type { LitElement } from 'lit';

import { expect } from '@playwright/test';
import { test } from '@patternfly/pfe-tools/test/playwright/fixtures.js';

const tagName = 'pfe-datetime';

test.describe(tagName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:8080/demo/${tagName}/`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(100);
    await page.evaluate(async x => customElements.whenDefined(x), tagName);
    await page.$eval(tagName, async (el: LitElement) => el.updateComplete);
  });

  /** Remove the real-time item from e2e snapshot */
  test.beforeEach(async ({ page }) => {
    await page.$eval('#realtime', el => el.closest('pfe-band')?.remove());
  });

  test('snapshot', async ({ page }) => {
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(`${tagName}.png`);
  });
});
