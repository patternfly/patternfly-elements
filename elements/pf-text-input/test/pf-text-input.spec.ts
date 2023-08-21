import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfTextInput } from '@patternfly/elements/pf-text-input/pf-text-input.js';

describe('<pf-text-input>', function() {
  describe('simply instantiating', function() {
    let element: PfTextInput;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-text-input')).to.be.an.instanceof(PfTextInput);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfTextInput>(html`<pf-text-input></pf-text-input>`);
      const klass = customElements.get('pf-text-input');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfTextInput);
    });
  });
});
