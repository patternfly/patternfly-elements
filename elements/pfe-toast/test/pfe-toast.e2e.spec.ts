import { test } from '@playwright/test';
import { PfeDemoPage } from '@patternfly/pfe-tools/test/playwright/PfeDemoPage.js';

const tagName = 'pfe-toast';

test.describe(tagName, () => {
  test('snapshot', async ({ page }) => {
    const componentPage = new PfeDemoPage(page, tagName);
    await componentPage.navigate();
    await page.click('[data-toast="toast2"]');
    await page.waitForTimeout(1000);
    await componentPage.snapshot();
  });
});
