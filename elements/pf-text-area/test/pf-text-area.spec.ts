import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfTextArea } from '@patternfly/elements/pf-text-area/pf-text-area.js';

describe('<pf-text-area>', function() {
  describe('simply instantiating', function() {
    let element: PfTextArea;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-text-area')).to.be.an.instanceof(PfTextArea);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfTextArea>(html`<pf-text-area></pf-text-area>`);
      const klass = customElements.get('pf-text-area');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfTextArea);
    });
  });
});
