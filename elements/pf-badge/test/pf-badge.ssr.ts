import { SSRPage } from '@patternfly/pfe-tools/test/playwright/SSRPage.js';
import { test } from '@playwright/test';

const tagName = 'pf-badge';

test.describe(tagName, () => {
  test('ssr', async ({ page }) => {
    const fixture = new SSRPage(tagName, page, {
      demoURL: new URL('../demo/ssr.html', import.meta.url),
      importSpecifiers: [
        '@patternfly/elements/pf-badge/pf-badge.js',
      ],
    });
    await fixture.snapshot();
  });
});
