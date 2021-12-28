import type { LitElement } from 'lit';

import { expect } from '@playwright/test';
import { test } from '@patternfly/pfe-tools/test/playwright/fixtures.js';

const tagName = 'pfe-dropdown';

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

  test.describe("with dropdown open", () => {
    test.beforeEach(async ({ page }) => {
      await page.$eval(tagName, el => el.open());
      await page.$eval(tagName, async (el: LitElement) => el.updateComplete);
      await page.waitForTimeout(100);

      await page.$eval(tagName, el => el.shadowRoot?.querySelector('button').focus());
      await page.$eval(tagName, async (el: LitElement) => el.updateComplete);
      await page.waitForTimeout(100);

      await page.keyboard.press('ArrowDown');
      await page.$eval(tagName, async (el: LitElement) => el.updateComplete);
      await page.waitForTimeout(100);
    });

    test('snapshot', async ({ page }) => {
      expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(`${tagName}-with-dropdown.png`);
    });
  });
});
