import { test, expect } from '@playwright/test';
import { PfeDemoPage } from '@patternfly/pfe-tools/test/playwright/PfeDemoPage.js';
import { SSRPage } from '@patternfly/pfe-tools/test/playwright/SSRPage.js';

const tagName = 'pf-v6-card';

const html = String.raw;

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
      demoContent: html`
        <pf-v6-card id="hinted"
                    ssr-hint-has-slotted-default
                    ssr-hint-has-slotted="header,footer">
          <h2 slot="header">Header</h2>
          <p>Body</p>
          <span slot="footer">Footer</span>
        </pf-v6-card>
        <pf-v6-card id="titled"
                    ssr-hint-has-slotted-default
                    ssr-hint-has-slotted="title">
          <h2 slot="title">Title</h2>
          <p>Body</p>
        </pf-v6-card>
      `,
    });
    await fixture.updateCompleteFor(tagName);
    await expect(fixture.page.locator(`${tagName}#hinted #header`)).not.toHaveAttribute('hidden');
    await expect(fixture.page.locator(`${tagName}#hinted #footer`)).not.toHaveAttribute('hidden');
    await expect(fixture.page.locator(`${tagName}#hinted #title`)).toHaveAttribute('hidden');
    await expect(fixture.page.locator(`${tagName}#titled #title`)).not.toHaveAttribute('hidden');
    await expect(fixture.page.locator(`${tagName}#titled #footer`)).toHaveAttribute('hidden');
  });
});
