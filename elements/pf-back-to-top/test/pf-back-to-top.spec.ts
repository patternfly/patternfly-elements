import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { setViewport } from '@web/test-runner-commands';

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

    it('should upgrade', async function() {
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

    it('should be hidden on init', async function() {
      const { children } = snapshot;
      expect(children).to.be.undefined;
    });

    it('should be visible after scrolling 401px', async function() {
      window.scrollTo({ top: 401, behavior: 'instant' });
      await nextFrame();
      await allUpdates(element);
      snapshot = await a11ySnapshot();
      expect(snapshot.children?.map(takeProps(['name', 'role']))).to.deep.equal([{ role: 'link', name: 'Back to top' }]);
    });

    describe('when the always visible property is true', function() {
      beforeEach(async function() {
        window.scrollTo({ top: 0, behavior: 'instant' });
        await nextFrame();
        element.alwaysVisible = true;
        await allUpdates(element);
        snapshot = await a11ySnapshot();
      });

      it('should always be visible', async function() {
        expect(snapshot.children?.map(takeProps(['name', 'role']))).to.deep.equal([{ role: 'link', name: 'Back to top' }]);
      });
    });

    describe('when the scroll distance is set to 1000', function() {
      beforeEach(async function() {
        element.scrollDistance = 1000;
        await allUpdates(element);
        snapshot = await a11ySnapshot();
      });

      it('should be hidden', async function() {
        const { children } = snapshot;
        expect(children).to.be.undefined;
      });

      it('should be visible after scrolling 1001px', async function() {
        window.scrollTo({ top: 1001, behavior: 'instant' });
        await nextFrame();
        await allUpdates(element);
        snapshot = await a11ySnapshot();
        expect(snapshot.children?.map(takeProps(['name', 'role']))).to.deep.equal([{ role: 'link', name: 'Back to top' }]);
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
      snapshot = await a11ySnapshot();

      await allUpdates(element);
    });

    it('should be hidden on init', async function() {
      const { children } = snapshot;
      expect(children).to.be.undefined;
    });

    it('should be visible after scrolling 401px', async function() {
      const scrollableElement = document.querySelector('#top')!;
      scrollableElement.scrollTo({ top: 401, behavior: 'instant' });
      await nextFrame();
      await allUpdates(element);
      snapshot = await a11ySnapshot();
      expect(snapshot.children?.map(takeProps(['name', 'role']))).to.deep.equal([{ role: 'link', name: 'Back to top' }]);
    });
  });

  describe('when no text is provided in slot or title attribute', function() {
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

      it('should have a label of "Back to top"', async function() {
        window.scrollTo({ top: 401, behavior: 'instant' });
        await nextFrame();
        await allUpdates(element);
        snapshot = await a11ySnapshot();
        expect(snapshot.children?.map(takeProps(['name', 'role']))).to.deep.equal([{ role: 'link', name: 'Back to top' }]);
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

      it('should have a label of "Back to top"', async function() {
        window.scrollTo({ top: 401, behavior: 'instant' });
        await nextFrame();
        await allUpdates(element);
        snapshot = await a11ySnapshot();
        expect(snapshot.children?.map(takeProps(['name', 'role']))).to.deep.equal([{ role: 'button', name: 'Back to top' }]);
      });
    });
  });
});
