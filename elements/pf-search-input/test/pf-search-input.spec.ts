import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfSearchInput } from '@patternfly/elements/pf-search-input/pf-search-input.js';

describe('<pf-search-input>', function() {
  describe('simply instantiating', function() {
    let element: PfSearchInput;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-search-input')).to.be.an.instanceof(PfSearchInput);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfSearchInput>(html`<pf-search-input></pf-search-input>`);
      const klass = customElements.get('pf-search-input');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfSearchInput);
    });
  });
});
