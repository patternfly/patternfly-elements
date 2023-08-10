import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfSimpleList } from '@patternfly/elements/pf-simple-list/pf-simple-list.js';

describe('<pf-simple-list>', function() {
  describe('simply instantiating', function() {
    let element: PfSimpleList;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-simple-list')).to.be.an.instanceof(PfSimpleList);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfSimpleList>(html`<pf-simple-list></pf-simple-list>`);
      const klass = customElements.get('pf-simple-list');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfSimpleList);
    });
  });
});
