import type { LitElement } from 'lit';
import type { Page } from '@playwright/test';

import { URL } from 'url';
import { expect } from '@playwright/test';

interface NavigateOptions {
  selector: string;
}

export class PfeDemoPage {
  private origin = process.env.VISUAL_REGRESSION_ORIGIN ?? 'http://localhost:8080';

  constructor(
    public readonly page: Page,
    public readonly tagName = '',
    public readonly workspace = 'components',
  ) {
  }

  async navigate({ selector }?: NavigateOptions): Promise<void>
  async navigate(pathname?: string): Promise<void>
  async navigate(pathnameOrOptions?: string | NavigateOptions): Promise<void> {
    const selectorOverride = typeof pathnameOrOptions === 'string' ? undefined : pathnameOrOptions?.selector;
    const pathname = typeof pathnameOrOptions === 'string' ? pathnameOrOptions : `${this.workspace}/${this.tagName.replace('pf-', '')}/demo`;
    const url = new URL(pathname, this.origin).toString();
    console.log(`NAVIGATING to ${url}`);
    await this.page.goto(url, { waitUntil: 'networkidle' });
    while (await this.page.innerText('body') === 'Not Found') {
      await this.page.goto(url, { waitUntil: 'networkidle' });
    }
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.$$eval('*', async els =>
      await Promise.all(Array.from(els)
        .filter(x => x.localName.startsWith('pf-'))
        .map(x => customElements.whenDefined(x.localName)
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
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
    if (selector) {
      try {
        await this.page.$eval(selector, async (el: LitElement) => el.updateComplete);
      } catch {
        console.log(await this.page.innerHTML('body'));
      }
    }
  }

  /** Take a snapshot and save it to disk */
  async snapshot(name?: string) {
    const snapshotName = `${this.tagName}${name ? `-${name}` : ''}`;
    expect(await this.page.screenshot({ fullPage: true })).toMatchSnapshot(`${snapshotName}.png`);
  }
}
