import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfBackgroundImage } from '@patternfly/elements/pf-background-image/pf-background-image.js';

describe('<pf-background-image>', function() {
  describe('simply instantiating', function() {
    let element: PfBackgroundImage;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-background-image')).to.be.an.instanceof(PfBackgroundImage);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfBackgroundImage>(html`<pf-background-image></pf-background-image>`);
      const klass = customElements.get('pf-background-image');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfBackgroundImage);
    });
  });
});
