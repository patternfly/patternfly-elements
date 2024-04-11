import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { getColor, hexToRgb } from '@patternfly/pfe-tools/test/hex-to-rgb.js';
import { PfBanner } from '@patternfly/elements/pf-banner/pf-banner.js';

describe('<pf-banner>', function() {
  describe('simply instantiating', function() {
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-banner')).to.be.an.instanceof(PfBanner);
    });

    it('should upgrade', async function() {
      const el = await createFixture<PfBanner>(html`
        <pf-banner>Default</pf-banner>
      `);
      const klass = customElements.get('pf-banner');
      expect(el)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfBanner);
    });

    describe('without variant attribute', function() {
      let element: PfBanner;
      beforeEach(async function() {
        element = await createFixture<PfBanner>(html`
          <pf-banner>Default</pf-banner>
        `);
        await element.updateComplete;
      });
      // TODO: remove assertions on shadow roots
      it('should display default variant', async function() {
        const container = element.shadowRoot!.querySelector('#container')!;
        expect(getColor(container, 'color')).to.deep.equal(hexToRgb('#ffffff'));
        expect(getColor(container, 'background-color')).to.deep.equal(hexToRgb('#4f5255'));
      });
    });

    describe('with variant="info" attribute', function() {
      let element: PfBanner;
      beforeEach(async function() {
        element = await createFixture<PfBanner>(html`
          <pf-banner variant="info">Info</pf-banner>
        `);
        await element.updateComplete;
      });
      // TODO: remove assertions on shadow roots
      it('should display info variant', async function() {
        const container = element.shadowRoot!.querySelector('#container')!;
        expect(getColor(container, 'color')).to.deep.equal(hexToRgb('#151515'));
        expect(getColor(container, 'background-color')).to.deep.equal(hexToRgb('#73bcf7'));
      });
    });

    describe('with variant="danger" attribute', function() {
      let element: PfBanner;
      beforeEach(async function() {
        element = await createFixture<PfBanner>(html`
          <pf-banner variant="danger">Info</pf-banner>
        `);
        await element.updateComplete;
      });
      // TODO: remove assertions on shadow roots
      it('should display danger variant', async function() {
        const container = element.shadowRoot!.querySelector('#container')!;
        expect(getColor(container, 'color')).to.deep.equal(hexToRgb('#ffffff'));
        expect(getColor(container, 'background-color')).to.deep.equal(hexToRgb('#c9190b'));
      });
    });

    describe('with valid icon attribute', function() {
      let element: PfBanner;
      beforeEach(async function() {
        element = await createFixture<PfBanner>(html`
          <pf-banner icon="info">Info</pf-banner>
        `);
        await element.updateComplete;
      });
      // TODO: remove assertions on shadow roots
      it('should render an icon', async function() {
        const icon = element.shadowRoot!.querySelector('pf-icon');
        expect(icon).to.exist;
      });
    });
  });
});
