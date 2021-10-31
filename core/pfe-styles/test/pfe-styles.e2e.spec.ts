import { test } from '@playwright/test';
import { PfeDemoPage } from '@patternfly/pfe-tools/test/playwright/PfeDemoPage.js';

test.describe('pfe-styles', () => {
  test('snapshot', async ({ page }) => {
    const componentPage = new PfeDemoPage(page);
    await componentPage.navigate('/core/styles/demo/pfe-styles.html');
    await componentPage.updateComplete('pfe-card');
    await componentPage.snapshot('pfe-styles');
  });
});
