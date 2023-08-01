import { expect, html, aTimeout } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import '@patternfly/pfe-tools/test/stub-logger.js';

import { PfCard } from '@patternfly/elements/pf-card/pf-card.js';

describe('<pf-card>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-card')).to.be.an.instanceof(PfCard);
  });

  it('should upgrade', async function() {
    expect(await createFixture<PfCard>(html`<pf-card></pf-card>`))
      .to.be.an.instanceof(customElements.get('pf-card'))
      .and
      .to.be.an.instanceof(PfCard);
  });

  describe('with header and footer content', function() {
    let element: PfCard;
    let origHeight: number;

    beforeEach(async function() {
      element = await createFixture<PfCard>(html`
        <pf-card id="card1">
          <h2 slot="header">Card 1</h2>
          <p>This is pf-card.</p>
          <span slot="footer">Text in footer</span>
        </pf-card>`);
    });

    beforeEach(function() {
      const { height } = element.getBoundingClientRect();
      origHeight = height;
    });

    describe('size', function() {
      describe('unset', function() {
        it('should have default sizing for card parts', function() {
          expect(getComputedStyle(element.querySelector('p')!, 'body font-size').getPropertyValue('font-size')).to.equal('16px');
          expect(getComputedStyle(element.querySelector('[slot=footer]')!, 'footer font-size').getPropertyValue('font-size')).to.equal('16px');
        });
      });

      describe('compact', function() {
        beforeEach(async function() {
          element.setAttribute('size', 'compact');
        });
        it('should be smaller', function() {
          const { height } = element.getBoundingClientRect();
          expect(origHeight, 'height').to.be.greaterThan(height);
        });
      });

      describe('large', function() {
        beforeEach(async function() {
          element.setAttribute('size', 'large');
        });
        it('should have larger font sizes for body, footer, more padding for header', function() {
          const { height } = element.getBoundingClientRect();
          expect(origHeight, 'height').to.be.lessThan(height);
          expect(getComputedStyle(element.querySelector('p')!, 'body font-size').getPropertyValue('font-size'))
            .to.equal('16px');
          expect(getComputedStyle(element.querySelector('[slot=footer]')!, 'footer font-size').getPropertyValue('font-size'))
            .to.equal('16px');
        });
      });
    });

    describe('rounded', function() {
      describe('unset', function() {
        it('should have default border radius', function() {
          expect(getComputedStyle(element).getPropertyValue('border-radius')).to.equal('0px');
        });
      });

      describe('is set', function() {
        it('should have 3px border radius', async function() {
          element.setAttribute('rounded', '');
          await element.updateComplete;
          expect(getComputedStyle(element).getPropertyValue('border-radius')).to.equal('3px');
        });
      });
    });

    describe('flat', function() {
      describe('unset', function() {
        it('should have default box shadow and border (none)', function() {
          expect(getComputedStyle(element).getPropertyValue('box-shadow')).not.to.equal('none');
          expect(getComputedStyle(element).getPropertyValue('border')).to.equal('0px none rgb(0, 0, 0)');
        });
      });

      describe('is set', function() {
        it('should not have a box shadow and should have an added border', async function() {
          element.setAttribute('flat', '');
          await element.updateComplete;

          expect(getComputedStyle(element).getPropertyValue('box-shadow')).to.equal('none');
          expect(getComputedStyle(element).getPropertyValue('border')).not.to.equal('none');
        });
      });
    });

    describe('full-height', function() {
      describe('is not set', function() {
        it('should not be taller', async function() {
          const { height } = element.getBoundingClientRect();
          expect(height).to.equal(origHeight);
        });
      });

      describe('is set', function() {
        beforeEach(async function() {
          element.toggleAttribute('full-height', true);
          await element.updateComplete;
        });

        it('should be taller', async function() {
          const { height } = element.getBoundingClientRect();
          expect(height).to.be.greaterThan(origHeight);
        });
      });
    });

    describe('plain', function() {
      describe('unset', function() {
        it('should have the default box shadow and background-color', function() {
          expect(getComputedStyle(element).getPropertyValue('box-shadow')).not.to.be.undefined;
          expect(getComputedStyle(element).getPropertyValue('background-color')).to.equal('rgb(255, 255, 255)');
        });
      });
      describe('is set', function() {
        it('should have transparent background color and no box shadow', async function() {
          element.setAttribute('plain', '');
          expect(getComputedStyle(element).getPropertyValue('box-shadow')).to.equal('none');
          expect(getComputedStyle(element).getPropertyValue('background-color')).to.equal('rgba(0, 0, 0, 0)');
        });
      });
    });

    describe('accessible', function() {
      it('should be accessible in both the light and shadow dom', async function() {
        await expect(element).to.be.accessible();
      });
      // TODO: this has been flaky. revisit later
      // it('should have an article element wrapper in the shadow dom', async function() {
      //   const snapshot = await a11ySnapshot();
      //   const foundNode = findAccessibilityNode(snapshot, node => node.role === 'WebArea');
      //   expect(foundNode, 'A node with the supplied name has been found.').to.not.be.null;
      // });
    });
  });

  it(`should render a header and footer when content for those slots are added dynamically`, async function() {
    const element = await createFixture<PfCard>(html`
      <pf-card id="dynamicHeaderFooter">
        This is the card
      </pf-card>`);

    const header = document.createElement('h2');
    header.setAttribute('slot', 'header');
    header.textContent = 'Card Header';

    const footer = document.createElement('div');
    footer.setAttribute('slot', 'footer');
    footer.textContent = 'This is the footer';

    element.prepend(header);
    element.appendChild(footer);

    await aTimeout(50);

    const cardHeaderSlot =
      element.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="header"]')!;
    const cardFooterSlot =
      element.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="footer"]')!;

    await aTimeout(50);

    expect(cardHeaderSlot.assignedNodes().length).to.equal(1);
    expect(cardFooterSlot.assignedNodes().length).to.equal(1);
  });
});
