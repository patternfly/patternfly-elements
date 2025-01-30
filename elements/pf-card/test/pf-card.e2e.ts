import { test, expect } from '@playwright/test';
import { PfeDemoPage } from '@patternfly/pfe-tools/test/playwright/PfeDemoPage.js';
import { SSRPage } from '@patternfly/pfe-tools/test/playwright/SSRPage.js';

const tagName = 'pf-card';

test.describe(tagName, () => {
  test('snapshot', async ({ page }) => {
    const componentPage = new PfeDemoPage(page, tagName);
    await componentPage.navigate();
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

  test('ssr hints', async ({ browser }) => {
    const fixture = new SSRPage({
      tagName,
      browser,
      importSpecifiers: [`@patternfly/elements/${tagName}/${tagName}.js`],
      demoContent: /* html */ `
        <pf-card ssr-hint-has-default-slotted ssr-hint-has-slotted="header,footer">
          <h2 slot="header">Header</h2>
          <span>Body</span>
          <span slot="footer">Footer</span>
        </pf-card>
      `,
    });
    await fixture.updateCompleteFor('pf-card');
    await expect(fixture.page.locator('pf-card #title')).toHaveAttribute('hidden');
    await expect(fixture.page.locator('pf-card #header')).not.toHaveAttribute('hidden');
  });
});
