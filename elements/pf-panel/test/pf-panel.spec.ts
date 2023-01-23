import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfPanel } from '@patternfly/elements/pf-panel/pf-panel.js';

describe('<pf-panel>', function() {
  describe('simply instantiating', function() {
    let element: PfPanel;
    beforeEach(async function() {
      element = await createFixture <PfPanel>(html`<pf-panel></pf-panel>`);
    });
    it('should upgrade', function() {
      const klass = customElements.get('pf-panel');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfPanel);
    });
  });
});
