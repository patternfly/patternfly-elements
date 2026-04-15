import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { setViewport, sendKeys } from '@web/test-runner-commands';

import { allUpdates } from '@patternfly/pfe-tools/test/utils.js';

import { PfBackToTop } from '../pf-back-to-top.js';
import { type A11yTreeSnapshot, a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

const takeProps = (props: string[]) => (obj: object) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => props.includes(k)));

describe('<pf-back-to-top>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-back-to-top')).to.be.an.instanceof(PfBackToTop);
  });

  describe('simply instantiating', function() {
    let element: PfBackToTop;

    beforeEach(async function() {
      element = await createFixture<PfBackToTop>(html`<pf-back-to-top></pf-back-to-top>`);
    });

    it('should upgrade', function() {
      const klass = customElements.get('pf-back-to-top');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfBackToTop);
    });
  });

  describe('when rendered in a viewport with a height smaller then content length', function() {
    let element: PfBackToTop;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      await setViewport({ width: 320, height: 640 });
      window.scrollTo({ top: 0, behavior: 'instant' });
      await nextFrame();
      const container = await createFixture<PfBackToTop>(html`
        <div id="top">
          <div style="height: 2000px;"></div>
          <pf-back-to-top href="#top">Back to top</pf-back-to-top>
        </div>
      `);
      element = container.querySelector('pf-back-to-top')!;
      snapshot = await a11ySnapshot();

      await allUpdates(element);
    });

    it('should be hidden on init', function() {
      const { children } = snapshot;
      expect(children).to.be.undefined;
    });

    it('should not be accessible', function() {
      expect(snapshot.children).to.be.undefined;
    });

    describe('when scrolled 401px', function() {
      beforeEach(async function() {
        window.scrollTo({ top: 401, behavior: 'instant' });
        await nextFrame();
        await allUpdates(element);
        snapshot = await a11ySnapshot();
      });

      it('should be visible', function() {
        expect(snapshot.children?.map(takeProps(['name', 'role']))).to.deep.equal([{ role: 'link', name: 'Back to top' }]);
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

    describe('when the always visible property is true', function() {
      beforeEach(async function() {
        window.scrollTo({ top: 0, behavior: 'instant' });
        await nextFrame();
        element.alwaysVisible = true;
        await allUpdates(element);
        snapshot = await a11ySnapshot();
      });

      it('should be visible', function() {
        expect(snapshot.children?.map(takeProps(['name', 'role']))).to.deep.equal([{ role: 'link', name: 'Back to top' }]);
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

    describe('when the scroll distance is set to 1000', function() {
      beforeEach(async function() {
        element.scrollDistance = 1000;
        await allUpdates(element);
        snapshot = await a11ySnapshot();
      });

      it('should be hidden', function() {
        const { children } = snapshot;
        expect(children).to.be.undefined;
      });

      describe('when scrolled 1001px', function() {
        beforeEach(async function() {
          window.scrollTo({ top: 1001, behavior: 'instant' });
          await nextFrame();
          await allUpdates(element);
          snapshot = await a11ySnapshot();
        });

        it('should be visible', function() {
          expect(snapshot.children?.map(takeProps(['name', 'role']))).to.deep.equal([{ role: 'link', name: 'Back to top' }]);
        });
      });
    });
  });

  describe('when rendered in an element with an overflowed height', function() {
    let element: PfBackToTop;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      window.scrollTo({ top: 0, behavior: 'instant' });
      await nextFrame();
      const container = await createFixture<PfBackToTop>(html`
        <div id="top" style="height: 500px; overflow-y: scroll;">
          <div style="height: 2000px;"></div>
          <pf-back-to-top href="#top" scrollable-selector="#top">Back to top</pf-back-to-top>
        </div>
      `);
      element = container.querySelector('pf-back-to-top')!;
      await allUpdates(element);

      snapshot = await a11ySnapshot({ selector: 'pf-back-to-top' });
    });

    it('should be hidden on init', function() {
      const { children } = snapshot;
      expect(children).to.be.undefined;
    });

    describe('when scrolled 401px', function() {
      beforeEach(async function() {
        const scrollableElement = document.querySelector('#top')!;
        scrollableElement.scrollTo({ top: 401, behavior: 'instant' });
        scrollableElement.dispatchEvent(new Event('scroll'));
        await nextFrame();
        await allUpdates(element);
        snapshot = await a11ySnapshot();
      });

      it('should be visible', function() {
        expect(snapshot.children?.at(0)?.children?.map(takeProps(['name', 'role']))).to.deep.equal([{ role: 'link', name: 'Back to top' }]);
      });
    });
  });

  describe('when no text is provided', function() {
    let element: PfBackToTop;
    let snapshot: A11yTreeSnapshot;

    describe('as a link', function() {
      beforeEach(async function() {
        await setViewport({ width: 320, height: 640 });
        window.scrollTo({ top: 0, behavior: 'instant' });
        await nextFrame();
        const container = await createFixture<PfBackToTop>(html`
          <div id="top">
            <div style="height: 2000px;"></div>
            <pf-back-to-top href="#top"></pf-back-to-top>
          </div>
        `);
        element = container.querySelector('pf-back-to-top')!;
        await allUpdates(element);
      });

      describe('when scrolled', function() {
        beforeEach(async function() {
          window.scrollTo({ top: 401, behavior: 'instant' });
          await nextFrame();
          await allUpdates(element);
          snapshot = await a11ySnapshot();
        });

        it('should have a label of "Back to top"', function() {
          expect(snapshot.children?.map(takeProps(['name', 'role']))).to.deep.equal([{ role: 'link', name: 'Back to top' }]);
        });
      });
    });

    describe('as a button', function() {
      beforeEach(async function() {
        await setViewport({ width: 320, height: 640 });
        window.scrollTo({ top: 0, behavior: 'instant' });
        await nextFrame();
        const container = await createFixture<PfBackToTop>(html`
          <div id="top">
            <div style="height: 2000px;"></div>
            <pf-back-to-top></pf-back-to-top>
          </div>
        `);
        element = container.querySelector('pf-back-to-top')!;
        await allUpdates(element);
      });

      describe('when scrolled', function() {
        beforeEach(async function() {
          window.scrollTo({ top: 401, behavior: 'instant' });
          await nextFrame();
          await allUpdates(element);
          snapshot = await a11ySnapshot();
        });

        it('should have a label of "Back to top"', function() {
          expect(snapshot.children?.map(takeProps(['name', 'role']))).to.deep.equal([{ role: 'button', name: 'Back to top' }]);
        });
      });
    });
  });

  describe('when a label is provided', function() {
    let element: PfBackToTop;
    let snapshot: A11yTreeSnapshot;

    describe('as a link', function() {
      beforeEach(async function() {
        await setViewport({ width: 320, height: 640 });
        window.scrollTo({ top: 0, behavior: 'instant' });
        await nextFrame();
        const container = await createFixture<PfBackToTop>(html`
          <div id="top">
            <div style="height: 2000px;"></div>
            <pf-back-to-top href="#top" label="Return to top"></pf-back-to-top>
          </div>
        `);
        element = container.querySelector('pf-back-to-top')!;
        await allUpdates(element);
      });

      describe('when scrolled', function() {
        beforeEach(async function() {
          window.scrollTo({ top: 401, behavior: 'instant' });
          await nextFrame();
          await allUpdates(element);
          snapshot = await a11ySnapshot();
        });

        it('should have a label of "Return to top"', function() {
          expect(snapshot.children?.map(takeProps(['name', 'role']))).to.deep.equal([{ role: 'link', name: 'Return to top' }]);
        });
      });
    });

    describe('as a button', function() {
      beforeEach(async function() {
        await setViewport({ width: 320, height: 640 });
        window.scrollTo({ top: 0, behavior: 'instant' });
        await nextFrame();
        const container = await createFixture<PfBackToTop>(html`
          <div id="top">
            <div style="height: 2000px;"></div>
            <pf-back-to-top label="Return to top"></pf-back-to-top>
          </div>
        `);
        element = container.querySelector('pf-back-to-top')!;
        await allUpdates(element);
      });

      describe('when scrolled', function() {
        beforeEach(async function() {
          window.scrollTo({ top: 401, behavior: 'instant' });
          await nextFrame();
          await allUpdates(element);
          snapshot = await a11ySnapshot();
        });

        it('should have a label of "Return to top"', function() {
          expect(snapshot.children?.map(takeProps(['name', 'role']))).to.deep.equal([{ role: 'button', name: 'Return to top' }]);
        });
      });
    });
  });
});
