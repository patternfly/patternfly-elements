import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfListbox } from '@patternfly/elements/pf-listbox/pf-listbox.js';

describe('<pf-listbox>', function() {
  describe('simply instantiating', function() {
    let element: PfListbox;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-listbox')).to.be.an.instanceof(PfListbox);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfListbox>(html`<pf-listbox></pf-listbox>`);
      const klass = customElements.get('pf-listbox');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfListbox);
    });
  });
});
