import type { LitElement } from 'lit';

import { expect } from '@playwright/test';
import { test } from '@patternfly/pfe-tools/test/playwright/fixtures.js';

const tagName = 'pfe-autocomplete';

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

  test.describe('focusing element', () => {
    test.beforeEach(async ({ page }) => {
      await page.$eval(tagName, el => el.focus());
      await page.$eval(tagName, async el => el.updateComplete);
      await page.press(tagName, 'i');
      await page.waitForTimeout(1000);
      await page.press(tagName, 'ArrowDown');
      await page.waitForTimeout(1000);
    });

    test('with dropdown open and "i" in search', async ({ page }) => {
      expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(`${tagName}.with-dropdown-i.png`);
    });
  });
});
