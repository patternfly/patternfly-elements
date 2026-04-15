import { expect, html, nextFrame, aTimeout } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { setViewport } from '@web/test-runner-commands';
import { allUpdates } from '@patternfly/pfe-tools/test/utils.js';
import { LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { ScrollSpyController } from '@patternfly/pfe-core/controllers/scroll-spy-controller.js';

// Minimal host element to test ScrollSpyController in isolation
@customElement('test-scroll-spy')
class TestScrollSpy extends LitElement {
  #spy = new ScrollSpyController(this, {
    rootMargin: '0px 0px 0px 0px',
    tagNames: ['test-scroll-spy-link'],
    onIntersection: () => {
      this.lastIntersection = Date.now();
    },
  });

  lastIntersection = 0;

  override createRenderRoot() {
    return this;
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }

  setActive(link: Element) {
    this.#spy.setActive(link);
  }
}

@customElement('test-scroll-spy-link')
class TestScrollSpyLink extends LitElement {
  @property({ reflect: true }) href?: string;
  @property({ type: Boolean, reflect: true }) active = false;

  override createRenderRoot() {
    return this;
  }

  render(): TemplateResult {
    return html`<a href="${this.href}"><slot></slot></a>`;
  }
}

/**
 * Generate a content section with enough height to require scrolling
 * @param id section element id
 * @param title section heading text
 * @param height section height in pixels
 */
function section(id: string, title: string, height = 1000): string {
  return `<h2 id="${id}">${title}</h2><div style="height:${height}px"></div>`;
}

/**
 * Wait for a scrollend event or timeout
 * @param timeout max wait in ms
 */
async function waitForScrollEnd(timeout = 2000): Promise<void> {
  await new Promise<void>(resolve => {
    const timer = setTimeout(resolve, timeout);
    addEventListener('scrollend', () => {
      clearTimeout(timer);
      resolve();
    }, { once: true });
  });
}

/**
 * Get the currently active link text
 * @param host the test scroll spy element
 */
function getActiveLink(host: TestScrollSpy): string | null {
  const active = host.querySelector('test-scroll-spy-link[active]');
  return active?.textContent?.trim() ?? null;
}

describe('ScrollSpyController', function() {
  // These tests involve real scrolling and IO, give them time
  // eslint-disable-next-line @typescript-eslint/no-invalid-this
  this.timeout(15000);

  beforeEach(async function() {
    await setViewport({ width: 1024, height: 768 });
    window.scrollTo({ top: 0, behavior: 'instant' });
    await nextFrame();
  });

  afterEach(async function() {
    window.scrollTo({ top: 0, behavior: 'instant' });
    await nextFrame();
  });

  describe('basic scroll tracking', function() {
    let host: TestScrollSpy;

    beforeEach(async function() {
      const container = await createFixture<HTMLDivElement>(html`
        <div>
          <test-scroll-spy>
            <test-scroll-spy-link href="#s1">Section 1</test-scroll-spy-link>
            <test-scroll-spy-link href="#s2">Section 2</test-scroll-spy-link>
            <test-scroll-spy-link href="#s3">Section 3</test-scroll-spy-link>
            <test-scroll-spy-link href="#s4">Section 4</test-scroll-spy-link>
            <test-scroll-spy-link href="#s5">Section 5</test-scroll-spy-link>
          </test-scroll-spy>
          <article>
            ${unsafeHTML(section('s1', 'Section 1'))}
            ${unsafeHTML(section('s2', 'Section 2'))}
            ${unsafeHTML(section('s3', 'Section 3'))}
            ${unsafeHTML(section('s4', 'Section 4'))}
            ${unsafeHTML(section('s5', 'Section 5'))}
          </article>
        </div>
      `);
      host = container.querySelector('test-scroll-spy')!;
      await allUpdates(host);
      await nextFrame();
      await nextFrame();
    });

    it('should activate first link on initial load', async function() {
      // IO needs a frame to fire
      await aTimeout(100);
      expect(getActiveLink(host)).to.equal('Section 1');
    });

    it('should update active link when scrolling down', async function() {
      const s3 = document.getElementById('s3')!;
      s3.scrollIntoView({ behavior: 'instant' });
      await waitForScrollEnd();
      await nextFrame();
      await aTimeout(100);
      expect(getActiveLink(host)).to.equal('Section 3');
    });

    it('should update active link when scrolling back up', async function() {
      // Scroll down first
      const s4 = document.getElementById('s4')!;
      s4.scrollIntoView({ behavior: 'instant' });
      await waitForScrollEnd();
      await nextFrame();
      await aTimeout(100);
      expect(getActiveLink(host)).to.equal('Section 4');

      // Scroll back up
      const s2 = document.getElementById('s2')!;
      s2.scrollIntoView({ behavior: 'instant' });
      await waitForScrollEnd();
      await nextFrame();
      await aTimeout(100);
      expect(getActiveLink(host)).to.equal('Section 2');
    });
  });

  describe('programmatic setActive (click simulation)', function() {
    let host: TestScrollSpy;
    let links: TestScrollSpyLink[];

    beforeEach(async function() {
      const container = await createFixture<HTMLDivElement>(html`
        <div>
          <test-scroll-spy>
            <test-scroll-spy-link href="#s1">Section 1</test-scroll-spy-link>
            <test-scroll-spy-link href="#s2">Section 2</test-scroll-spy-link>
            <test-scroll-spy-link href="#s3">Section 3</test-scroll-spy-link>
            <test-scroll-spy-link href="#s4">Section 4</test-scroll-spy-link>
            <test-scroll-spy-link href="#s5">Section 5</test-scroll-spy-link>
          </test-scroll-spy>
          <article>
            ${unsafeHTML(section('s1', 'Section 1'))}
            ${unsafeHTML(section('s2', 'Section 2'))}
            ${unsafeHTML(section('s3', 'Section 3'))}
            ${unsafeHTML(section('s4', 'Section 4'))}
            ${unsafeHTML(section('s5', 'Section 5'))}
          </article>
        </div>
      `);
      host = container.querySelector('test-scroll-spy')!;
      links = Array.from(host.querySelectorAll('test-scroll-spy-link'));
      await allUpdates(host);
      await nextFrame();
      await nextFrame();
    });

    // Reproduces #2425: clicking a link far down the list with smooth scroll
    // should not activate an intermediate section
    it('should maintain active state during smooth scroll to distant section', async function() {
      // Simulate clicking section 5 (far away)
      host.setActive(links[4]);
      expect(getActiveLink(host)).to.equal('Section 5');

      // Scroll to section 5 with smooth behavior (as browser would on anchor click)
      document.getElementById('s5')!.scrollIntoView({ behavior: 'smooth' });
      await waitForScrollEnd();
      await nextFrame();
      await aTimeout(100);

      // Active should still be section 5, NOT an intermediate section
      expect(getActiveLink(host)).to.equal('Section 5');
    });

    // Reproduces #2425: active state getting "one click behind"
    it('should not fall one click behind on rapid navigation', async function() {
      // Click section 3
      host.setActive(links[2]);
      document.getElementById('s3')!.scrollIntoView({ behavior: 'instant' });
      await waitForScrollEnd();
      await nextFrame();
      await aTimeout(100);
      expect(getActiveLink(host)).to.equal('Section 3');

      // Now click section 5
      host.setActive(links[4]);
      document.getElementById('s5')!.scrollIntoView({ behavior: 'instant' });
      await waitForScrollEnd();
      await nextFrame();
      await aTimeout(100);

      // Should be section 5, not section 3
      expect(getActiveLink(host)).to.equal('Section 5');
    });

    // Reproduces #2425: rapid clicks should cancel previous force state
    it('should handle rapid successive clicks correctly', async function() {
      // Click 2, then immediately click 4
      host.setActive(links[1]);
      document.getElementById('s2')!.scrollIntoView({ behavior: 'smooth' });
      await aTimeout(50);

      // Before scroll completes, click section 4
      host.setActive(links[3]);
      document.getElementById('s4')!.scrollIntoView({ behavior: 'smooth' });
      await waitForScrollEnd();
      await nextFrame();
      await aTimeout(100);

      expect(getActiveLink(host)).to.equal('Section 4');
    });
  });

  describe('non-contiguous content sections', function() {
    let host: TestScrollSpy;

    // Reproduces #2474: sections with non-tracked content between them
    beforeEach(async function() {
      const container = await createFixture<HTMLDivElement>(html`
        <div>
          <test-scroll-spy>
            <test-scroll-spy-link href="#s1">Section 1</test-scroll-spy-link>
            <test-scroll-spy-link href="#s2">Section 2</test-scroll-spy-link>
            <test-scroll-spy-link href="#s3">Section 3</test-scroll-spy-link>
          </test-scroll-spy>
          <article>
            <h2 id="s1">Section 1</h2>
            <div style="height:1000px">Section 1 content</div>

            <!-- Non-tracked content between sections -->
            <div style="height:400px; background: #eee;">
              <h3>Untracked sidebar content</h3>
              <p>This content is NOT tracked by jump links</p>
            </div>

            <h2 id="s2">Section 2</h2>
            <div style="height:1000px">Section 2 content</div>

            <!-- More non-tracked content -->
            <div style="height:300px; background: #ddd;">
              <h3>Another untracked area</h3>
            </div>

            <h2 id="s3">Section 3</h2>
            <div style="height:1000px">Section 3 content</div>
          </article>
        </div>
      `);
      host = container.querySelector('test-scroll-spy')!;
      await allUpdates(host);
      await nextFrame();
      await nextFrame();
    });

    it('should correctly track sections separated by untracked content', async function() {
      await aTimeout(100);
      expect(getActiveLink(host)).to.equal('Section 1');

      document.getElementById('s2')!.scrollIntoView({ behavior: 'instant' });
      await waitForScrollEnd();
      await nextFrame();
      await aTimeout(100);
      expect(getActiveLink(host)).to.equal('Section 2');

      document.getElementById('s3')!.scrollIntoView({ behavior: 'instant' });
      await waitForScrollEnd();
      await nextFrame();
      await aTimeout(100);
      expect(getActiveLink(host)).to.equal('Section 3');
    });

    it('should correctly track when scrolling back through non-contiguous sections', async function() {
      // Scroll all the way down
      document.getElementById('s3')!.scrollIntoView({ behavior: 'instant' });
      await waitForScrollEnd();
      await nextFrame();
      await aTimeout(100);
      expect(getActiveLink(host)).to.equal('Section 3');

      // Scroll back to section 1
      document.getElementById('s1')!.scrollIntoView({ behavior: 'instant' });
      await waitForScrollEnd();
      await nextFrame();
      await aTimeout(100);
      expect(getActiveLink(host)).to.equal('Section 1');
    });

    it('should maintain correct active link when navigating via hash to non-contiguous section', async function() {
      const links = Array.from(host.querySelectorAll('test-scroll-spy-link'));

      // Programmatically activate section 3 (simulating click)
      host.setActive(links[2]);
      document.getElementById('s3')!.scrollIntoView({ behavior: 'instant' });
      await waitForScrollEnd();
      await nextFrame();
      await aTimeout(100);
      expect(getActiveLink(host)).to.equal('Section 3');

      // Jump back to section 1
      host.setActive(links[0]);
      document.getElementById('s1')!.scrollIntoView({ behavior: 'instant' });
      await waitForScrollEnd();
      await nextFrame();
      await aTimeout(100);
      expect(getActiveLink(host)).to.equal('Section 1');
    });
  });
});
