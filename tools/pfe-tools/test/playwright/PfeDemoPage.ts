import type { LitElement } from 'lit';
import type { Page } from '@playwright/test';

import { expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

export class PfeDemoPage {
  private origin = process.env.VISUAL_REGRESSION_ORIGIN ?? 'http://localhost:8080';

  constructor(
    public readonly page: Page,
    public readonly tagName: string,
    public readonly workspace = 'components',
  ) {
  }

  async navigate(selectorOverride?: string|null) {
    const url = `${this.origin}/${this.workspace}/${this.tagName.replace('pfe-', '')}/demo`.replace(/\/\//g, '/');
    console.log(`NAVIGATING to ${url}`)
    await this.page.goto(url, { waitUntil: 'networkidle' });
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.$$eval('[pfelement]', async els =>
      await Promise.all(Array.from(els, x =>
        customElements.whenDefined(x.localName)
          .then(() =>
            (x as LitElement)?.updateComplete))));
    await this.updateComplete(selectorOverride);
    await this.page.waitForTimeout(100);
  }

  /** Focus the first instance of the element, or a given selector, then wait for the element's updateComplete */
  async focus(selector = this.tagName) {
    await this.page.$eval(selector, el => el.focus());
    await this.updateComplete(selector);
  }

  /** Click the first instance of the element, or a given selector, then wait for the element's updateComplete */
  async click(selector = this.tagName) {
    await this.page.$eval(selector, (el: HTMLElement) => el.click());
    await this.updateComplete(selector);
  }

  /** Wait for the element, or a given selector, to update */
  async updateComplete(selector: string|null = this.tagName) {
    if (selector) {
      await this.page.$eval(selector, async (el: LitElement) => el.updateComplete);
    }
  }

  /** Take a snapshot. When running in CI, send it to Percy, otherwise, save it to disk */
  async snapshot(name?: string) {
    const snapshotName = `${this.tagName}${name ? `-${name}` : ''}`;
    if (process.env.CI)
      await percySnapshot(this.page, snapshotName, { enableJavaScript: true });
    else
      expect(await this.page.screenshot({ fullPage: true })).toMatchSnapshot(`${snapshotName}.png`);
  }
}
