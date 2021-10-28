import type { LitElement } from 'lit';

import { expect } from '@playwright/test';
import { test } from '@patternfly/pfe-tools/test/playwright/fixtures.js';

const tagName = 'pfe-collapse';

test.describe(tagName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:8080/demo/${tagName}/`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(100);
    await page.evaluate(async x => customElements.whenDefined(x), tagName);
    await page.$eval(tagName, async (el: LitElement) => el.updateComplete);
  });

  test('snapshot', async ({ page }) => {
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(`${tagName}.png`);
  });

  test.describe('with collapse toggled open', () => {
    test.beforeEach(async ({ page }) => {
      await page.$eval(tagName, el => el.toggle());
      await page.$eval(tagName, async (el: LitElement) => el.updateComplete);
      await page.waitForTimeout(1000);
    });

    test('snapshot', async ({ page }) => {
      expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(`${tagName}-open.png`);
    });
  });
});
