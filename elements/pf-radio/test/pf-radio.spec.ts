import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfRadio } from '@patternfly/elements/pf-radio/pf-radio.js';

describe('<pf-radio>', function() {
  describe('simply instantiating', function() {
    let element: PfRadio;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-radio')).to.be.an.instanceof(PfRadio);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfRadio>(html`<pf-radio></pf-radio>`);
      const klass = customElements.get('pf-radio');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfRadio);
    });
  });
});
