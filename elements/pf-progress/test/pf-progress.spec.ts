import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfProgress } from '@patternfly/elements/pf-progress/pf-progress.js';

describe('<pf-progress>', function() {
  describe('simply instantiating', function() {
    let element: PfProgress;
    it('should upgrade', async function() {
      element = await createFixture<PfProgress>(html`<pf-progress></pf-progress>`);
      const klass = customElements.get('pf-progress');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfProgress);
    });
  });
});
