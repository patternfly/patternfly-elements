import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfSpinner } from '@patternfly/elements/pf-spinner/pf-spinner.js';

describe('<pf-spinner>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-spinner')).to.be.an.instanceof(PfSpinner);
  });

  it('should upgrade', async function() {
    const element = await createFixture<PfSpinner>(html`<pf-spinner>Loading...</pf-spinner>`);
    expect(element, 'pf-spinner should be an instance of PfeSpinner')
        .to.be.an.instanceOf(customElements.get('pf-spinner'))
        .and
        .to.be.an.instanceOf(PfSpinner);
  });

  it('should properly initialize the component', async function() {
    const element = await createFixture<PfSpinner>(html`
      <pf-spinner>Loading...</pf-spinner>
    `);
    expect(element.getAttribute('size')).to.equal('xl');
  });

  describe('basic usage', function() {
    let element: PfSpinner;
    beforeEach(async function() {
      element = await createFixture<PfSpinner>(html`<pf-spinner>Loading...</pf-spinner>`);
    });
    it('is accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('size attribute', function() {
    let element: PfSpinner;

    function convertRemToPixels(rem: `${number}rem`) {
      const { fontSize } = getComputedStyle(document.documentElement);
      return parseFloat(rem) * parseFloat(fontSize);
    }

    beforeEach(async function() {
      element = await createFixture<PfSpinner>(html`
        <pf-spinner>Loading...</pf-spinner>
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
      const element = await createFixture<PfSpinner>(html`
        <pf-spinner diameter="${customDiameterValue}px">Loading...</pf-spinner>
      `);

      expect(element.offsetWidth).to.equal(customDiameterValue);
    });
  });
});
