import type { LitElement } from 'lit';

import { expect } from '@playwright/test';
import { test } from '@patternfly/pfe-tools/test/playwright/fixtures.js';

const tagName = 'pfe-modal';

test.describe(tagName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:8080/demo/${tagName}/`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(100);
    await page.evaluate(async x => customElements.whenDefined(x), tagName);
    await page.$eval(tagName, async (el: LitElement) => el.updateComplete);
  });

  test.beforeEach(async ({ page }) => {
    await page.$eval(`${tagName} button`, el => el.click());
    await page.$eval(tagName, async (el: LitElement) => el.updateComplete);
    await page.waitForTimeout(100);
  });

  test('snapshot', async ({ page }) => {
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(`${tagName}.png`);
  });
});
