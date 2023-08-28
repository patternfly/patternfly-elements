import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfAlert } from '@patternfly/elements/pf-alert/pf-alert.js';

describe('<pf-alert>', function() {
  describe('simply instantiating', function() {
    let element: PfAlert;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-alert')).to.be.an.instanceof(PfAlert);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfAlert>(html`<pf-alert></pf-alert>`);
      const klass = customElements.get('pf-alert');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfAlert);
    });
  });
});
