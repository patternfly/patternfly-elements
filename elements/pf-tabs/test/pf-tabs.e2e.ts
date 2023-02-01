import { test } from '@playwright/test';
import { PfeDemoPage } from '@patternfly/pfe-tools/test/playwright/PfeDemoPage.js';

const tagName = 'pf-tabs';

test.describe(tagName, () => {
  // Run tests in this file with portrait-like viewport.
  test.use({ viewport: { width: 1200, height: 1000 } });
  test('snapshot', async ({ page }) => {
    const componentPage = new PfeDemoPage(page, tagName);
    await componentPage.navigate();
    await componentPage.snapshot();
  });
});
