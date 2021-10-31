import type { LitElement } from 'lit';

import { expect } from '@playwright/test';
import { test } from '@patternfly/pfe-tools/test/playwright/fixtures.js';

const tagName = 'pfe-jump-links';

test.describe(tagName, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:8080/demo/${tagName}/`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(100);
    await page.evaluate(async () => customElements.whenDefined('pfe-jump-links-nav'));
    await page.$eval('pfe-jump-links-nav', async (el: LitElement) => el.updateComplete);
  });

  test('snapshot', async ({ page }) => {
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(`${tagName}.png`);
  });
});
