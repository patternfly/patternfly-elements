import { test } from '@playwright/test';
import { PfeDemoPage } from '@patternfly/pfe-tools/test/playwright/PfeDemoPage.js';

const tagName = 'pfe-autocomplete';

test.describe(tagName, () => {
  test('snapshot', async ({ page }) => {
    const componentPage = new PfeDemoPage(page, tagName);
    await componentPage.navigate();
    await componentPage.snapshot();
  });

  test('with dropdown open and "i" in search', async ({ page }) => {
    const componentPage = new PfeDemoPage(page, tagName);
    await componentPage.navigate();
    await componentPage.focus();
    await componentPage.page.press(tagName, 'i');
    await componentPage.page.waitForTimeout(1000);
    await componentPage.page.press(tagName, 'ArrowDown');
    await componentPage.page.waitForTimeout(1000);
    await componentPage.snapshot('with-dropdown-i');
  });
});
