import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfLabelGroup } from '@patternfly/elements/pf-label-group/pf-label-group.js';

describe('<pf-label-group>', function() {
  describe('simply instantiating', function() {
    let element: PfLabelGroup;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-label-group')).to.be.an.instanceof(PfLabelGroup);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfLabelGroup>(html`<pf-label-group></pf-label-group>`);
      const klass = customElements.get('pf-label-group');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfLabelGroup);
    });
  });
});
