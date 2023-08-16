import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfChip } from '@patternfly/elements/pf-chip/pf-chip.js';

describe('<pf-chip>', function() {
  describe('simply instantiating', function() {
    let element: PfChip;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-chip')).to.be.an.instanceof(PfChip);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfChip>(html`<pf-chip></pf-chip>`);
      const klass = customElements.get('pf-chip');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfChip);
    });
  });
});
