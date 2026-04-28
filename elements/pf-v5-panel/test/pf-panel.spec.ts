import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfV5Panel } from '@patternfly/elements/pf-v5-panel/pf-v5-panel.js';

describe('<pf-v5-panel>', function() {
  describe('simply instantiating', function() {
    let element: PfV5Panel;
    beforeEach(async function() {
      element = await createFixture <PfV5Panel>(html`<pf-v5-panel></pf-v5-panel>`);
    });

    it('imperatively instantiates', function() {
      expect(document.createElement('pf-v5-panel')).to.be.an.instanceof(PfV5Panel);
    });

    it('should upgrade', function() {
      const klass = customElements.get('pf-v5-panel');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfV5Panel);
    });
  });
});
