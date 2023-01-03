import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfePanel } from '@patternfly/pfe-panel';

describe('<pfe-panel>', function() {
  describe('simply instantiating', function() {
    let element: PfePanel;
    beforeEach(async function() {
      element = await createFixture <PfePanel>(html`<pfe-panel></pfe-panel>`);
    });
    it('should upgrade', function() {
      const klass = customElements.get('pfe-panel');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfePanel);
    });
  });
});
