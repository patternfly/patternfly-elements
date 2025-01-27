import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfRadioGroup } from '@patternfly/elements/pf-radio-group/pf-radio-group.js';

describe('<pf-radio-group>', function() {
  describe('simply instantiating', function() {
    let element: PfRadioGroup;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-radio-group')).to.be.an.instanceof(PfRadioGroup);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfRadioGroup>(html`<pf-radio-group></pf-radio-group>`);
      const klass = customElements.get('pf-radio-group');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfRadioGroup);
    });
  });
});
