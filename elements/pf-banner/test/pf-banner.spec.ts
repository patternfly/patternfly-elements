import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { getColor, hexToRgb } from '@patternfly/pfe-tools/test/hex-to-rgb.js';
import { PfBanner } from '@patternfly/elements/pf-banner/pf-banner.js';

const example = html`
  <pf-banner>Default</pf-banner>
`;

const infoVariantExample = html`
  <pf-banner variant="info">Info</pf-banner>
`;

const dangerVariantExample = html`
  <pf-banner variant="danger">Danger</pf-banner>
`;

const iconExample = html`
  <pf-banner icon="info">Info</pf-banner>
`;

describe('<pf-banner>', function() {
  describe('simply instantiating', function() {
    let el: PfBanner;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-banner')).to.be.an.instanceof(PfBanner);
    });

    it('should upgrade', async function() {
      const el = await createFixture<PfBanner>(example);
      const klass = customElements.get('pf-banner');
      expect(el)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfBanner);
    });

    it('should display default variant', async function() {
      const el = await createFixture<PfBanner>(example);
      await el.updateComplete;
      const container = el.shadowRoot!.querySelector('#container')!;

      expect(getColor(container, 'color')).to.deep.equal(hexToRgb('#ffffff'));
      expect(getColor(container, 'background-color')).to.deep.equal(hexToRgb('#4f5255'));
    });

    it('should display info variant if attribute is set to info', async function() {
      const el = await createFixture<PfBanner>(infoVariantExample);
      await el.updateComplete;
      const container = el.shadowRoot!.querySelector('#container')!;

      expect(getColor(container, 'color')).to.deep.equal(hexToRgb('#151515'));
      expect(getColor(container, 'background-color')).to.deep.equal(hexToRgb('#73bcf7'));
    });

    it('should display danger variant if attribute is set to danger', async function() {
      const el = await createFixture<PfBanner>(dangerVariantExample);
      await el.updateComplete;
      const container = el.shadowRoot!.querySelector('#container')!;

      expect(getColor(container, 'color')).to.deep.equal(hexToRgb('#ffffff'));
      expect(getColor(container, 'background-color')).to.deep.equal(hexToRgb('#c9190b'));
    });

    it('should render a pf-icon if the icon attribute is present and valid', async function() {
      const el = await createFixture<PfBanner>(iconExample);
      await el.updateComplete;
      const icon = el.shadowRoot!.querySelector('pf-icon');
      expect(icon).to.exist;
    });
  });
});
