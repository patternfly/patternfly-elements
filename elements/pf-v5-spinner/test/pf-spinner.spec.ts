import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfV5Spinner } from '@patternfly/elements/pf-v5-spinner/pf-v5-spinner.js';

describe('<pf-v5-spinner>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v5-spinner')).to.be.an.instanceof(PfV5Spinner);
  });

  it('should upgrade', async function() {
    const element = await createFixture<PfV5Spinner>(html`<pf-v5-spinner>Loading...</pf-v5-spinner>`);
    expect(element, 'pf-v5-spinner should be an instance of PfeSpinner')
        .to.be.an.instanceOf(customElements.get('pf-v5-spinner'))
        .and
        .to.be.an.instanceOf(PfV5Spinner);
  });

  it('should properly initialize the component', async function() {
    const element = await createFixture<PfV5Spinner>(html`
      <pf-v5-spinner>Loading...</pf-v5-spinner>
    `);
    expect(element.getAttribute('size')).to.equal('xl');
  });

  describe('basic usage', function() {
    let element: PfV5Spinner;
    beforeEach(async function() {
      element = await createFixture<PfV5Spinner>(html`<pf-v5-spinner>Loading...</pf-v5-spinner>`);
    });
    it('is accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('size attribute', function() {
    let element: PfV5Spinner;

    function convertRemToPixels(rem: `${number}rem`) {
      const { fontSize } = getComputedStyle(document.documentElement);
      return parseFloat(rem) * parseFloat(fontSize);
    }

    beforeEach(async function() {
      element = await createFixture<PfV5Spinner>(html`
        <pf-v5-spinner>Loading...</pf-v5-spinner>
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
      const element = await createFixture<PfV5Spinner>(html`
        <pf-v5-spinner diameter="${customDiameterValue}px">Loading...</pf-v5-spinner>
      `);

      expect(element.offsetWidth).to.equal(customDiameterValue);
    });
  });
});
