import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfV5TextInput } from '@patternfly/elements/pf-v5-text-input/pf-v5-text-input.js';

describe('<pf-v5-text-input>', function() {
  describe('simply instantiating', function() {
    let element: PfV5TextInput;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-v5-text-input')).to.be.an.instanceof(PfV5TextInput);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfV5TextInput>(html`<pf-v5-text-input></pf-v5-text-input>`);
      const klass = customElements.get('pf-v5-text-input');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfV5TextInput);
    });
  });
});
