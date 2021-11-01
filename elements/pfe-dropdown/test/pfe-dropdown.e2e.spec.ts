import { test } from '@playwright/test';
import { PfeDemoPage } from '@patternfly/pfe-tools/test/playwright/PfeDemoPage.js';

const tagName = 'pfe-dropdown';

test.describe(tagName, () => {
  test('snapshot', async ({ page }) => {
    const componentPage = new PfeDemoPage(page, tagName);
    await componentPage.navigate();
    await componentPage.snapshot();
  });

  test('with dropdown open', async ({ page }) => {
    const componentPage = new PfeDemoPage(page, tagName);
    await componentPage.navigate();

    await componentPage.focus();
    await page.waitForTimeout(100);

    await page.keyboard.press('ArrowDown');
    await componentPage.updateComplete();
    await page.waitForTimeout(100);

    await componentPage.snapshot('with-dropdown');
  });
});
