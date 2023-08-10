import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfSimpleList } from '@patternfly/elements/pf-select/pf-select.js';

describe('<pf-select>', function() {
  describe('simply instantiating', function() {
    let element: PfSimpleList;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-select')).to.be.an.instanceof(PfSimpleList);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfSimpleList>(html`<pf-select></pf-select>`);
      const klass = customElements.get('pf-select');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfSimpleList);
    });
  });
});
