import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { setViewport, sendKeys } from '@web/test-runner-commands';

import { allUpdates } from '@patternfly/pfe-tools/test/utils.js';

import { PfV6BackToTop } from '../pf-v6-back-to-top.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

describe('<pf-v6-back-to-top>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-back-to-top')).to.be.an.instanceof(PfV6BackToTop);
  });

  describe('simply instantiating', function() {
    let element: PfV6BackToTop;

    beforeEach(async function() {
      element = await createFixture<PfV6BackToTop>(html`<pf-v6-back-to-top></pf-v6-back-to-top>`);
    });

    it('should upgrade', function() {
      const klass = customElements.get('pf-v6-back-to-top');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfV6BackToTop);
    });
  });

  describe('with href (link mode)', function() {
    let element: PfV6BackToTop;

    beforeEach(async function() {
      await setViewport({ width: 320, height: 640 });
      window.scrollTo({ top: 0, behavior: 'instant' });
      await nextFrame();
      const container = await createFixture<PfV6BackToTop>(html`
        <div id="top">
          <div style="height: 2000px;"></div>
          <pf-v6-back-to-top href="#top">Back to top</pf-v6-back-to-top>
        </div>
      `);
      element = container.querySelector('pf-v6-back-to-top')!;
      await allUpdates(element);
    });

    it('should be hidden on init', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.not.axContainRole('link');
    });

    it('should not be accessible when hidden', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.not.axContainName('Back to top');
    });

    describe('when scrolled 401px', function() {
      beforeEach(async function() {
        window.scrollTo({ top: 401, behavior: 'instant' });
        await nextFrame();
        await allUpdates(element);
      });

      it('should be visible as a link', async function() {
        expect(await a11ySnapshot())
            .to.axContainQuery({ role: 'link', name: 'Back to top' });
      });

      it('should be accessible', async function() {
        await expect(element).to.be.accessible();
      });

      describe('pressing the tab key', function() {
        beforeEach(async function() {
          await sendKeys({ press: 'Tab' });
          await allUpdates(element);
          await nextFrame();
        });

        it('should focus the component', function() {
          expect(document.activeElement).to.equal(element);
        });
      });
    });

    describe('when always-visible is true', function() {
      beforeEach(async function() {
        window.scrollTo({ top: 0, behavior: 'instant' });
        await nextFrame();
        element.alwaysVisible = true;
        await allUpdates(element);
      });

      it('should be visible', async function() {
        expect(await a11ySnapshot())
            .to.axContainQuery({ role: 'link', name: 'Back to top' });
      });

      it('should be accessible', async function() {
        await expect(element).to.be.accessible();
      });

      describe('pressing the tab key', function() {
        beforeEach(async function() {
          await sendKeys({ press: 'Tab' });
          await allUpdates(element);
          await nextFrame();
        });
        it('should focus the component', function() {
          expect(document.activeElement).to.equal(element);
        });
      });
    });
  });

  describe('without href (button mode)', function() {
    let element: PfV6BackToTop;

    beforeEach(async function() {
      await setViewport({ width: 320, height: 640 });
      window.scrollTo({ top: 0, behavior: 'instant' });
      await nextFrame();
      const container = await createFixture<PfV6BackToTop>(html`
        <div id="top">
          <div style="height: 2000px;"></div>
          <pf-v6-back-to-top>Back to top</pf-v6-back-to-top>
        </div>
      `);
      element = container.querySelector('pf-v6-back-to-top')!;
      await allUpdates(element);
    });

    it('should be hidden on init', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.not.axContainRole('button');
    });

    describe('when scrolled 401px', function() {
      beforeEach(async function() {
        window.scrollTo({ top: 401, behavior: 'instant' });
        await nextFrame();
        await allUpdates(element);
      });

      it('should be visible as a button', async function() {
        expect(await a11ySnapshot())
            .to.axContainQuery({ role: 'button', name: 'Back to top' });
      });

      it('should be accessible', async function() {
        await expect(element).to.be.accessible();
      });
    });
  });

  describe('in an overflowed container with scrollable-selector', function() {
    let element: PfV6BackToTop;

    beforeEach(async function() {
      window.scrollTo({ top: 0, behavior: 'instant' });
      await nextFrame();
      const container = await createFixture<PfV6BackToTop>(html`
        <div id="top" style="height: 500px; overflow-y: scroll;">
          <div style="height: 2000px;"></div>
          <pf-v6-back-to-top href="#top" scrollable-selector="#top">Back to top</pf-v6-back-to-top>
        </div>
      `);
      element = container.querySelector('pf-v6-back-to-top')!;
      await allUpdates(element);
    });

    it('should be hidden on init', async function() {
      const snapshot = await a11ySnapshot({ selector: 'pf-v6-back-to-top' });
      expect(snapshot?.children).to.not.be.ok;
    });

    describe('when scrolled 401px', function() {
      beforeEach(async function() {
        const scrollableElement = document.querySelector('#top')!;
        scrollableElement.scrollTo({ top: 401, behavior: 'instant' });
        scrollableElement.dispatchEvent(new Event('scroll'));
        await nextFrame();
        await allUpdates(element);
      });

      it('should be visible', async function() {
        expect(await a11ySnapshot())
            .to.axContainQuery({ role: 'link', name: 'Back to top' });
      });
    });
  });

  describe('when no text is provided', function() {
    describe('as a link', function() {
      let element: PfV6BackToTop;

      beforeEach(async function() {
        await setViewport({ width: 320, height: 640 });
        window.scrollTo({ top: 0, behavior: 'instant' });
        await nextFrame();
        const container = await createFixture<PfV6BackToTop>(html`
          <div id="top">
            <div style="height: 2000px;"></div>
            <pf-v6-back-to-top href="#top"></pf-v6-back-to-top>
          </div>
        `);
        element = container.querySelector('pf-v6-back-to-top')!;
        await allUpdates(element);
      });

      describe('when scrolled', function() {
        beforeEach(async function() {
          window.scrollTo({ top: 401, behavior: 'instant' });
          await nextFrame();
          await allUpdates(element);
        });

        it('should have a default accessible label of "Back to top"', async function() {
          expect(await a11ySnapshot())
              .to.axContainQuery({ role: 'link', name: 'Back to top' });
        });
      });
    });

    describe('as a button', function() {
      let element: PfV6BackToTop;

      beforeEach(async function() {
        await setViewport({ width: 320, height: 640 });
        window.scrollTo({ top: 0, behavior: 'instant' });
        await nextFrame();
        const container = await createFixture<PfV6BackToTop>(html`
          <div id="top">
            <div style="height: 2000px;"></div>
            <pf-v6-back-to-top></pf-v6-back-to-top>
          </div>
        `);
        element = container.querySelector('pf-v6-back-to-top')!;
        await allUpdates(element);
      });

      describe('when scrolled', function() {
        beforeEach(async function() {
          window.scrollTo({ top: 401, behavior: 'instant' });
          await nextFrame();
          await allUpdates(element);
        });

        it('should have a default accessible label of "Back to top"', async function() {
          expect(await a11ySnapshot())
              .to.axContainQuery({ role: 'button', name: 'Back to top' });
        });
      });
    });
  });

  describe('when accessible-label is provided', function() {
    describe('as a link', function() {
      let element: PfV6BackToTop;

      beforeEach(async function() {
        await setViewport({ width: 320, height: 640 });
        window.scrollTo({ top: 0, behavior: 'instant' });
        await nextFrame();
        const container = await createFixture<PfV6BackToTop>(html`
          <div id="top">
            <div style="height: 2000px;"></div>
            <pf-v6-back-to-top href="#top" accessible-label="Return to top"></pf-v6-back-to-top>
          </div>
        `);
        element = container.querySelector('pf-v6-back-to-top')!;
        await allUpdates(element);
      });

      describe('when scrolled', function() {
        beforeEach(async function() {
          window.scrollTo({ top: 401, behavior: 'instant' });
          await nextFrame();
          await allUpdates(element);
        });

        it('should have the custom label', async function() {
          expect(await a11ySnapshot())
              .to.axContainQuery({ role: 'link', name: 'Return to top' });
        });
      });
    });

    describe('as a button', function() {
      let element: PfV6BackToTop;

      beforeEach(async function() {
        await setViewport({ width: 320, height: 640 });
        window.scrollTo({ top: 0, behavior: 'instant' });
        await nextFrame();
        const container = await createFixture<PfV6BackToTop>(html`
          <div id="top">
            <div style="height: 2000px;"></div>
            <pf-v6-back-to-top accessible-label="Return to top"></pf-v6-back-to-top>
          </div>
        `);
        element = container.querySelector('pf-v6-back-to-top')!;
        await allUpdates(element);
      });

      describe('when scrolled', function() {
        beforeEach(async function() {
          window.scrollTo({ top: 401, behavior: 'instant' });
          await nextFrame();
          await allUpdates(element);
        });

        it('should have the custom label', async function() {
          expect(await a11ySnapshot())
              .to.axContainQuery({ role: 'button', name: 'Return to top' });
        });
      });
    });
  });
});
