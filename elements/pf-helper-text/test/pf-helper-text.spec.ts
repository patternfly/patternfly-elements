import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfHelperText } from '@patternfly/elements/pf-helper-text/pf-helper-text.js';

describe('<pf-helper-text>', function() {
  describe('simply instantiating', function() {
    let element: PfHelperText;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-helper-text')).to.be.an.instanceof(PfHelperText);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfHelperText>(html`<pf-helper-text></pf-helper-text>`);
      const klass = customElements.get('pf-helper-text');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfHelperText);
    });
  });
});
