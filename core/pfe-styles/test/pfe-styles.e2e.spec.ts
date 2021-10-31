import { test } from '@playwright/test';
import { PfeDemoPage } from '@patternfly/pfe-tools/test/playwright/PfeDemoPage.js';

test.describe('pfe-styles', () => {
  test('snapshot', async ({ page }) => {
    const componentPage = new PfeDemoPage(page, 'pfe-styles', 'core');
    await componentPage.navigate(null);
    await componentPage.updateComplete('pfe-card');
    await componentPage.snapshot();
  });
});
