import { expect, html, nextFrame, fixture } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { setViewport } from '@web/test-runner-commands';

import { allUpdates } from '@patternfly/pfe-tools/test/utils.js';

import { PfBackToTop } from '../pf-back-to-top.js';

describe('<pf-back-to-top>', function() {
  let element: PfBackToTop;
  let link: HTMLAnchorElement;

  beforeEach(async function() {
    await setViewport({ width: 320, height: 640 });
    window.scrollTo({ top: 0, behavior: 'instant' });
    await nextFrame();
  });

  describe('default a tag implementation', function() {
    beforeEach(async function() {
      await fixture<HTMLElement>(html`<div style="height: 2000px;"></div>`);
      element = await createFixture<PfBackToTop>(html`<pf-back-to-top href="#top">Back to Top</pf-back-to-top>`);
      await allUpdates(element);
      link = element.shadowRoot!.querySelector('a')!;
    });

    it('imperatively instantiates', function() {
      expect(document.createElement('pf-back-to-top')).to.be.an.instanceof(PfBackToTop);
    });

    it('should upgrade', async function() {
      const klass = customElements.get('pf-back-to-top');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfBackToTop);
    });

    it('should be visible after 400px scroll', async function() {
      expect(link).to.have.class('visually-hidden');
      window.scrollTo({ top: 401, behavior: 'instant' });
      await allUpdates(element);
      await nextFrame();
      expect(link).to.not.have.class('visually-hidden');
    });

    it('should be visible after 100px if scroll-distance is set to 100', async function() {
      element.scrollDistance = 100;
      await allUpdates(element);
      expect(link).to.have.class('visually-hidden');
      window.scrollTo({ top: 101, behavior: 'instant' });
      await allUpdates(element);
      await nextFrame();
      expect(link).to.not.have.class('visually-hidden');
    });
  });

  describe('pf-button implementation', function() {
    beforeEach(async function() {
      await fixture<HTMLElement>(html`<div style="height: 2000px;"></div>`);
      element = await createFixture<PfBackToTop>(html`<pf-back-to-top >Back to Top</pf-back-to-top>`);
      await allUpdates(element);
    });

    it('should contain a pf-button if an href is not set', async function() {
      expect(element.shadowRoot!.querySelector('pf-button')).to.exist;
    });
  });
});
