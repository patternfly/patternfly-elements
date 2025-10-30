import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfDescriptionList } from '@patternfly/elements/pf-description-list/pf-description-list.js';

describe('<pf-description-list>', function() {
  describe('simply instantiating', function() {
    let element: PfDescriptionList;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-description-list')).to.be.an.instanceof(PfDescriptionList);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfDescriptionList>(html`<pf-description-list></pf-description-list>`);
      const klass = customElements.get('pf-description-list');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfDescriptionList);
    });
  });
});
