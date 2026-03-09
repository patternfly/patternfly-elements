import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfCheckbox } from '@patternfly/elements/pf-checkbox/pf-checkbox.js';

describe('<pf-checkbox>', function() {
  describe('simply instantiating', function() {
    let element: PfCheckbox;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-checkbox')).to.be.an.instanceof(PfCheckbox);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfCheckbox>(html`<pf-checkbox></pf-checkbox>`);
      const klass = customElements.get('pf-checkbox');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfCheckbox);
    });
  });
});
