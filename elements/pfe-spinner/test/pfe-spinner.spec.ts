import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeSpinner } from '@patternfly/elements/pfe-spinner/pfe-spinner.js';

describe('<pfe-spinner>', function() {
  it('should upgrade', async function() {
    const element = await createFixture<PfeSpinner>(html`<pfe-spinner>Loading...</pfe-spinner>`);
    expect(element, 'pfe-spinner should be an instance of PfeSpinner')
      .to.be.an.instanceOf(customElements.get('pfe-spinner'))
      .and
      .to.be.an.instanceOf(PfeSpinner);
  });

  it('should properly initialize the component', async function() {
    const element = await createFixture<PfeSpinner>(html`
      <pfe-spinner>Loading...</pfe-spinner>
    `);

    expect(element.getAttribute('size')).to.equal('xl');
  });

  describe('size attribute', function() {
    let element: PfeSpinner;

    function convertRemToPixels(rem: `${number}rem`) {
      const { fontSize } = getComputedStyle(document.documentElement);
      return parseFloat(rem) * parseFloat(fontSize);
    }

    beforeEach(async function() {
      element = await createFixture<PfeSpinner>(html`
        <pfe-spinner>Loading...</pfe-spinner>
      `);
    });

    for (const [size, expected] of [
      ['sm', '0.625rem'],
      ['md', '1.125rem'],
      ['lg', '1.5rem'],
      ['xl', '3.375rem'],
    ] as const) {
      it(size, async function() {
        element.size = size;
        await element.updateComplete;
        expect(element.offsetWidth).to.equal(convertRemToPixels(expected));
      });
    }
  });

  describe('diameter attribute', function() {
    it('sets the element diameter', async function() {
      const customDiameterValue = 80;
      const element = await createFixture<PfeSpinner>(html`
        <pfe-spinner diameter="${customDiameterValue}px">Loading...</pfe-spinner>
      `);

      expect(element.offsetWidth).to.equal(customDiameterValue);
    });
  });
});
