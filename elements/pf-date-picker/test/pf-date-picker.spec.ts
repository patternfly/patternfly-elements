import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfDatePicker } from '@patternfly/elements/pf-date-picker/pf-date-picker.js';

describe('<pf-date-picker>', function() {
  describe('simply instantiating', function() {
    let element: PfDatePicker;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-date-picker')).to.be.an.instanceof(PfDatePicker);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfDatePicker>(html`<pf-date-picker></pf-date-picker>`);
      const klass = customElements.get('pf-date-picker');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfDatePicker);
    });
  });
});
