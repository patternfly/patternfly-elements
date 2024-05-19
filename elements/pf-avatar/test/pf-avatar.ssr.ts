import { SSRPage } from '@patternfly/pfe-tools/test/playwright/SSRPage.js';
import { test } from '@playwright/test';

const tagName = 'pf-avatar';

test.describe(tagName, () => {
  test('ssr', async ({ page }) => {
    const fixture = new SSRPage(tagName, page, {
      demoURL: new URL('../demo/ssr.html', import.meta.url),
      importSpecifiers: [
        '@patternfly/elements/pf-avatar/pf-avatar.js',
      ],
    });
    await fixture.snapshot();
  });
});
