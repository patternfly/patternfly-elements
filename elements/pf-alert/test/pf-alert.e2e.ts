import { test, expect } from '@playwright/test';

test.describe('pf-alert E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(`
      <pf-alert variant="info" onClose>
        <span slot="title">Alert Title</span>
        <span>Alert description</span>
      </pf-alert>
    `);
  });

  test('should render title and description', async ({ page }) => {
    const title = page.locator('pf-alert >>> #title-area slot[name="title"]');
    const desc = page.locator('pf-alert >>> #description slot');
    await expect(title).toHaveText('Alert Title');
    await expect(desc).toHaveText('Alert description');
  });

  test('close button removes alert', async ({ page }) => {
    await page.locator('pf-alert >>> #close-button').click();
    const alert = page.locator('pf-alert');
    await expect(alert).toHaveCount(0);
  });

  test('toggle button expands/collapses content', async ({ page }) => {
    await page.setContent(`
      <pf-alert isExpandable>
        <span slot="isExpandable">Extra content</span>
      </pf-alert>
    `);
    const toggle = page.locator('pf-alert >>> #toggle-button');
    await toggle.click();
    const expandedContent = page.locator('pf-alert >>> #expandable-description');
    await expect(expandedContent).toBeVisible();
  });

  test('keyboard navigation works', async ({ page }) => {
    const btn = page.locator('pf-alert >>> #close-button');
    await btn.focus();
    await page.keyboard.press('Enter');
    const alert = page.locator('pf-alert');
    await expect(alert).toHaveCount(0);
  });

  test('accessibility checks', async ({ page }) => {
    const container = page.locator('pf-alert >>> #container');
    await expect(container).toHaveAttribute('role', 'alert'); // אם הוספת role
  });
});
