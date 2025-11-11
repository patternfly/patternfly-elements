import { test, expect } from '@playwright/test';
import { PfeDemoPage } from '@patternfly/pfe-tools/test/playwright/PfeDemoPage.js';
import { SSRPage } from '@patternfly/pfe-tools/test/playwright/SSRPage.js';

const tagName = 'pf-alert';

test.describe(tagName, () => {
  test.beforeEach(async ({ page }) => {
    const componentPage = new PfeDemoPage(page, tagName);
    await componentPage.navigate();
  });
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

  test('keyboard navigation works correctly', async ({ page }) => {
    const componentPage = new PfeDemoPage(page, tagName);
    await componentPage.navigate();

    // Start with focus on body
    await page.focus('body');

    // Tab should move focus to first interactive element
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();

    // If alert has actions, they should be focusable
    const hasActions = await page.$('pf-alert [slot="actions"]');
    if (hasActions) {
      await page.keyboard.press('Tab');
      const actionFocused = await page.evaluate(() =>
        document.activeElement?.closest('[slot="actions"]') !== null
      );
      expect(actionFocused).toBeTruthy();
    }
  });

  test('WAI-ARIA compliance', async ({ page }) => {
    const componentPage = new PfeDemoPage(page, tagName);
    await componentPage.navigate();

    // Test inline alert role
    const inlineAlert = await page.$('pf-alert[variant="inline"]');
    if (inlineAlert) {
      const role = await inlineAlert.getAttribute('role');
      expect(role).toBe('alert');
    }

    // Test toast alert role
    const toastAlert = await page.$('pf-alert[variant="toast"]');
    if (toastAlert) {
      const role = await toastAlert.getAttribute('role');
      expect(role).toBe('status');
    }

    // Check dismissable alerts have proper close button
    const dismissableAlert = await page.$('pf-alert[dismissable]');
    if (dismissableAlert) {
      const closeButton = await dismissableAlert.$('#close-button');
      expect(await closeButton?.getAttribute('role')).toBe('button');
      expect(await closeButton?.getAttribute('tabindex')).toBe('0');
      expect(await closeButton?.getAttribute('aria-label')).toBe('Close');
    }
  });

  test('accessibility - roles and attributes', async ({ page }) => {
    // Test inline alert role
    const inlineAlert = await page.locator('pf-alert[variant="inline"]').first();
    if (await inlineAlert.count() > 0) {
      expect(await inlineAlert.getAttribute('role')).toBe('alert');
    }

    // Test toast alert role
    const toastAlert = await page.locator('pf-alert[variant="toast"]').first();
    if (await toastAlert.count() > 0) {
      expect(await toastAlert.getAttribute('role')).toBe('status');
    }

    // Verify aria attributes
    const alert = await page.locator('pf-alert').first();
    expect(await alert.getAttribute('aria-hidden')).not.toBe('true');
  });

  test('screen reader content structure', async ({ page }) => {
    // Test header content is properly structured
    const alertWithHeader = await page.locator('pf-alert:has([slot="header"])').first();
    if (await alertWithHeader.count() > 0) {
      const header = await alertWithHeader.locator('[slot="header"]');
      expect(await header.count()).toBe(1);
    }

    // Test main content area
    const alertWithContent = await page.locator('pf-alert:has(p)').first();
    if (await alertWithContent.count() > 0) {
      const content = await alertWithContent.locator('p');
      expect(await content.count()).toBeGreaterThan(0);
    }
  });


  test('visual statuses  and variants', async ({ page }) => {
    // Test each status  renders
    for (const status of ['success', 'warning', 'danger', 'info']) {
      const alert = await page.locator(`pf-alert[status ="${status}"]`).first();
      if (await alert.count() > 0) {
        // Verify icon exists for status
        const icon = await alert.locator('#icon');
        expect(await icon.count()).toBe(1);
      }
    }

    // Test variants render
    for (const variant of ['inline', 'toast']) {
      const alert = await page.locator(`pf-alert[variant="${variant}"]`).first();
      if (await alert.count() > 0) {
        // Verify basic structure
        const container = await alert.locator('#container');
        expect(await container.count()).toBe(1);
      }
    }
  });
});
