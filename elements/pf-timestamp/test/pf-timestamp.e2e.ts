import { test } from '@playwright/test';
import { PfeDemoPage } from '@patternfly/pfe-tools/test/playwright/PfeDemoPage.js';
import { SSRPage } from '@patternfly/pfe-tools/test/playwright/SSRPage.js';

const tagName = 'pf-timestamp';

test.describe(tagName, () => {
  test('snapshot', async ({ page }) => {
    const componentPage = new PfeDemoPage(page, tagName);
    await componentPage.navigate();
    await page.$eval('#realtime', el => el.closest('section')?.remove());
    await componentPage.snapshot();
  });

  test('ssr', async ({ browser }) => {
    const fixture = new SSRPage({
      tagName,
      browser,
      demoDir: new URL('../demo/', import.meta.url),
      importSpecifiers: [
        `@patternfly/elements/${tagName}/${tagName}.js`,
      ],
    });
    await fixture.snapshots();
  });
});
