import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfBackToTop } from '@patternfly/elements/pf-back-to-top/pf-back-to-top.js';

describe('<pf-back-to-top>', function() {
  describe('simply instantiating', function() {
    let element: PfBackToTop;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-back-to-top')).to.be.an.instanceof(PfBackToTop);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfBackToTop>(html`<pf-back-to-top></pf-back-to-top>`);
      const klass = customElements.get('pf-back-to-top');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfBackToTop);
    });
  });
});
