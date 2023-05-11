import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfDropdown } from '@patternfly/elements/pf-dropdown/pf-dropdown.js';

describe('<pf-dropdown>', function() {
  describe('simply instantiating', function() {
    let element: PfDropdown;
    it('should upgrade', async function() {
      element = await createFixture<PfDropdown>(html`<pf-dropdown></pf-dropdown>`);
      const klass = customElements.get('pf-dropdown');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfDropdown);
    });
  });
});
