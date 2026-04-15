import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { getColor, hexToRgb } from '@patternfly/pfe-tools/test/hex-to-rgb.js';
import { PfV5Banner } from '@patternfly/elements/pf-v5-banner/pf-v5-banner.js';

describe('<pf-v5-banner>', function() {
  describe('simply instantiating', function() {
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-v5-banner')).to.be.an.instanceof(PfV5Banner);
    });

    it('should upgrade', async function() {
      const el = await createFixture<PfV5Banner>(html`
        <pf-v5-banner>Default</pf-v5-banner>
      `);
      const klass = customElements.get('pf-v5-banner');
      expect(el)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfV5Banner);
    });

    describe('without variant attribute', function() {
      let element: PfV5Banner;
      beforeEach(async function() {
        element = await createFixture<PfV5Banner>(html`
          <pf-v5-banner>Default</pf-v5-banner>
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
      let element: PfV5Banner;
      beforeEach(async function() {
        element = await createFixture<PfV5Banner>(html`
          <pf-v5-banner variant="info">Info</pf-v5-banner>
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
      let element: PfV5Banner;
      beforeEach(async function() {
        element = await createFixture<PfV5Banner>(html`
          <pf-v5-banner variant="danger">Info</pf-v5-banner>
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
      let element: PfV5Banner;
      beforeEach(async function() {
        element = await createFixture<PfV5Banner>(html`
          <pf-v5-banner icon="info">Info</pf-v5-banner>
        `);
        await element.updateComplete;
      });
      // TODO: remove assertions on shadow roots
      it('should render an icon', async function() {
        const icon = element.shadowRoot!.querySelector('pf-v5-icon');
        expect(icon).to.exist;
      });
    });
  });
});
