import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { PfV6Spinner } from '@patternfly/elements/pf-v6-spinner/pf-v6-spinner.js';

describe('<pf-v6-spinner>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-spinner')).to.be.an.instanceof(PfV6Spinner);
  });

  it('should upgrade', async function() {
    const element = await createFixture<PfV6Spinner>(html`<pf-v6-spinner>Loading...</pf-v6-spinner>`);
    expect(element, 'pf-v6-spinner should be an instance of PfV6Spinner')
        .to.be.an.instanceOf(customElements.get('pf-v6-spinner'))
        .and
        .to.be.an.instanceOf(PfV6Spinner);
  });

  describe('default state', function() {
    let element: PfV6Spinner;
    beforeEach(async function() {
      element = await createFixture<PfV6Spinner>(html`<pf-v6-spinner>Loading...</pf-v6-spinner>`);
    });

    it('does not sprout a size attribute by default', function() {
      expect(element.hasAttribute('size')).to.be.false;
    });

    it('renders at xl size by default', function() {
      const { fontSize } = getComputedStyle(document.documentElement);
      const expected = 3.5 * parseFloat(fontSize);
      expect(element.offsetWidth).to.equal(expected);
    });

    it('defaults inline to false', function() {
      expect(element.inline).to.equal(false);
    });

    it('is accessible', async function() {
      await expect(element).to.be.accessible();
    });

    it('has progressbar role in a11y tree', async function() {
      const snapshot = await a11ySnapshot();
      const spinnerNode = snapshot.children?.find(
        (child: { role: string }) => child.role === 'progressbar'
      );
      expect(spinnerNode).to.exist;
      expect(spinnerNode?.valuetext).to.equal('Loading...');
    });
  });

  describe('accessible-label attribute', function() {
    let element: PfV6Spinner;
    beforeEach(async function() {
      element = await createFixture<PfV6Spinner>(html`
        <pf-v6-spinner accessible-label="Loading results">Loading...</pf-v6-spinner>
      `);
    });

    it('is accessible', async function() {
      await expect(element).to.be.accessible();
    });

    it('sets aria-label in a11y tree', async function() {
      const snapshot = await a11ySnapshot();
      const spinnerNode = snapshot.children?.find(
        (child: { role: string }) => child.role === 'progressbar'
      );
      expect(spinnerNode).to.exist;
      expect(spinnerNode?.name).to.equal('Loading results');
    });
  });

  describe('value-text attribute', function() {
    let element: PfV6Spinner;
    beforeEach(async function() {
      element = await createFixture<PfV6Spinner>(html`
        <pf-v6-spinner value-text="50% complete">Loading...</pf-v6-spinner>
      `);
    });

    it('is accessible', async function() {
      await expect(element).to.be.accessible();
    });

    it('sets aria-valuetext in a11y tree', async function() {
      const snapshot = await a11ySnapshot();
      const spinnerNode = snapshot.children?.find(
        (child: { role: string }) => child.role === 'progressbar'
      );
      expect(spinnerNode).to.exist;
      expect(spinnerNode?.valuetext).to.equal('50% complete');
    });
  });

  describe('size attribute', function() {
    let element: PfV6Spinner;

    function convertRemToPixels(rem: `${number}rem`) {
      const { fontSize } = getComputedStyle(document.documentElement);
      return parseFloat(rem) * parseFloat(fontSize);
    }

    beforeEach(async function() {
      element = await createFixture<PfV6Spinner>(html`
        <pf-v6-spinner>Loading...</pf-v6-spinner>
      `);
    });

    for (const [size, expected] of [
      ['xs', '0.75rem'],
      ['sm', '0.875rem'],
      ['md', '1rem'],
      ['lg', '1.5rem'],
      ['xl', '3.5rem'],
    ] as const) {
      it(size, async function() {
        element.size = size;
        await element.updateComplete;
        expect(element.offsetWidth).to.equal(convertRemToPixels(expected));
      });
    }
  });

  describe('custom diameter via CSS custom property', function() {
    it('sets the element diameter', async function() {
      const customDiameterValue = 80;
      const element = await createFixture<PfV6Spinner>(html`
        <pf-v6-spinner style="--pf-v6-c-spinner--diameter: ${customDiameterValue}px">Loading...</pf-v6-spinner>
      `);
      expect(element.offsetWidth).to.equal(customDiameterValue);
    });
  });

  describe('inline attribute', function() {
    let container: HTMLParagraphElement;
    let element: PfV6Spinner;
    beforeEach(async function() {
      container = await createFixture<HTMLParagraphElement>(html`
        <p style="font-size: 32px;">
          Text
          <pf-v6-spinner inline accessible-label="Inline spinner">Loading...</pf-v6-spinner>
        </p>
      `);
      element = container.querySelector('pf-v6-spinner')!;
      await element.updateComplete;
    });

    it('inherits font size from surrounding content', function() {
      expect(element.offsetWidth).to.equal(32);
    });
  });
});
