import { expect, html, aTimeout } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot, findAccessibilityNode } from '@web/test-runner-commands';
import '@patternfly/pfe-tools/test/stub-logger.js';

import { PfeCard } from '@patternfly/pfe-card';


const TEMPLATES = {

  card1: html`
    <pfe-card id="card1">
      <h2 slot="header">Card 1</h2>
      <p>This is pfe-card.</p>
      <div slot="footer">Text in footer</div>
    </pfe-card>`,
};

const dynamicHeaderFooter = html`
  <pfe-card id="dynamicHeaderFooter">
    This is the card
  </pfe-card>`;

describe('<pfe-card>', function() {
  it('should upgrade', async function() {
    expect(await createFixture<PfeCard>(TEMPLATES.card1))
      .to.be.an.instanceof(customElements.get('pfe-card'))
      .and
      .to.be.an.instanceof(PfeCard);
  });

  it(`should render a header and footer when content for those slots are added dynamically`, async function() {
    const element = await createFixture<PfeCard>(dynamicHeaderFooter);

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

  describe('size', () => {
    describe('is unset', () => {
      it('should have default sizing for card parts', async function() {
        const element = await createFixture<PfeCard>(TEMPLATES.card1);
        const cardHeader = element.shadowRoot!.querySelector<HTMLSlotElement>('[part="header"]')!;
        const cardFooter = element.shadowRoot!.querySelector<HTMLSlotElement>('[part="footer"]')!;
        const cardBody = element.shadowRoot!.querySelector<HTMLSlotElement>('[part="body"]')!;

        expect(getComputedStyle(cardBody).getPropertyValue('font-size')).to.equal('16px');
        expect(getComputedStyle(cardFooter).getPropertyValue('font-size')).to.equal('16px');
        expect(getComputedStyle(cardHeader).getPropertyValue('padding-top')).to.equal('24px');
        expect(getComputedStyle(cardHeader).getPropertyValue('padding-left')).to.equal('24px');
        expect(getComputedStyle(cardHeader).getPropertyValue('padding-right')).to.equal('24px');
        expect(getComputedStyle(cardHeader).getPropertyValue('padding-bottom')).to.equal('16px');
      });
    });

    describe('is set to `compact`', () => {
      it('should have smaller font sizes for body, footer, less padding for header', async function() {
        const element = await createFixture<PfeCard>(TEMPLATES.card1);
        element.setAttribute('size', 'compact');
        await element.updateComplete;

        const cardHeader = element.shadowRoot!.querySelector<HTMLSlotElement>('[part="header"]')!;
        const cardFooter = element.shadowRoot!.querySelector<HTMLSlotElement>('[part="footer"]')!;
        const cardBody = element.shadowRoot!.querySelector<HTMLSlotElement>('[part="body"]')!;

        expect(getComputedStyle(cardBody).getPropertyValue('font-size')).to.equal('14px');
        expect(getComputedStyle(cardFooter).getPropertyValue('font-size')).to.equal('16px');
        expect(getComputedStyle(cardHeader).getPropertyValue('padding-top')).to.equal('24px');
        expect(getComputedStyle(cardHeader).getPropertyValue('padding-left')).to.equal('16px');
        expect(getComputedStyle(cardHeader).getPropertyValue('padding-right')).to.equal('16px');
        expect(getComputedStyle(cardHeader).getPropertyValue('padding-bottom')).to.equal('8px');
      });
    });

    describe('is set ot `large`', () => {
      it('should have larger font sizes for body, footer, more padding for header', async function() {
        const element = await createFixture<PfeCard>(TEMPLATES.card1);
        element.setAttribute('size', 'large');
        await element.updateComplete;

        const cardHeader = element.shadowRoot!.querySelector<HTMLSlotElement>('[part="header"]')!;
        const cardFooter = element.shadowRoot!.querySelector<HTMLSlotElement>('[part="footer"]')!;
        const cardBody = element.shadowRoot!.querySelector<HTMLSlotElement>('[part="body"]')!;

        expect(getComputedStyle(cardBody).getPropertyValue('font-size')).to.equal('16px');
        expect(getComputedStyle(cardFooter).getPropertyValue('font-size')).to.equal('16px');
        expect(getComputedStyle(cardHeader).getPropertyValue('padding-top')).to.equal('32px');
        expect(getComputedStyle(cardHeader).getPropertyValue('padding-left')).to.equal('32px');
        expect(getComputedStyle(cardHeader).getPropertyValue('padding-right')).to.equal('32px');
        expect(getComputedStyle(cardHeader).getPropertyValue('padding-bottom')).to.equal('24px');
      });
    });
  });

  describe('rounded', () => {
    describe('is not set', () => {
      it('should have default border radius', async function() {
        const element = await createFixture<PfeCard>(TEMPLATES.card1);

        expect(getComputedStyle(element).getPropertyValue('border-radius')).to.equal('0px');
      });
    });

    describe('is set', () => {
      it('should have 3px border radius', async function() {
        const element = await createFixture<PfeCard>(TEMPLATES.card1);
        element.setAttribute('rounded', '');
        await element.updateComplete;

        expect(getComputedStyle(element).getPropertyValue('border-radius')).to.equal('3px');
      });
    });
  });

  describe('flat', () => {
    describe('is not set', () => {
      it('should have default box shadow and border (none)', async function() {
        const element = await createFixture<PfeCard>(TEMPLATES.card1);

        expect(getComputedStyle(element).getPropertyValue('box-shadow')).not.to.equal('none');
        expect(getComputedStyle(element).getPropertyValue('border')).to.equal('0px none rgb(0, 0, 0)');
      });
    });

    describe('is set', () => {
      it('should not have a box shadow and should have an added border', async function() {
        const element = await createFixture<PfeCard>(TEMPLATES.card1);
        element.setAttribute('flat', '');
        await element.updateComplete;

        expect(getComputedStyle(element).getPropertyValue('box-shadow')).to.equal('none');
        expect(getComputedStyle(element).getPropertyValue('border')).not.to.equal('none');
      });
    });
  });

  describe('fullHeight', () => {
    describe('is not set', () => {
      it('should have the default flex on card body (0 1 auto)', async function() {
        const element = await createFixture<PfeCard>(TEMPLATES.card1);
        const cardBody = element.shadowRoot!.querySelector<HTMLSlotElement>('[part="body"]')!;

        expect(getComputedStyle(cardBody).getPropertyValue('flex')).to.equal('0 1 auto');
      });
    });

    describe('is set', () => {
      it('should have an updated flex on body (1 1 auto)', async function() {
        const element = await createFixture<PfeCard>(TEMPLATES.card1);
        const cardBody = element.shadowRoot!.querySelector<HTMLSlotElement>('[part="body"]')!;
        element.setAttribute('full-height', '');
        await element.updateComplete;

        expect(getComputedStyle(cardBody).getPropertyValue('flex')).to.equal('1 1 auto');
      });
    });
  });

  describe('plain', () => {
    describe('is not set', () => {
      it('should have the default box shadow and background-color', async function() {
        const element = await createFixture<PfeCard>(TEMPLATES.card1);

        expect(getComputedStyle(element).getPropertyValue('box-shadow')).not.to.be.undefined;
        expect(getComputedStyle(element).getPropertyValue('background-color')).to.equal('rgb(255, 255, 255)');
      });
    });
    describe('is set', () => {
      it('should have transparent background color and no box shadow', async function() {
        const element = await createFixture<PfeCard>(TEMPLATES.card1);
        element.setAttribute('plain', '');

        expect(getComputedStyle(element).getPropertyValue('box-shadow')).to.equal('none');
        expect(getComputedStyle(element).getPropertyValue('background-color')).to.equal('rgba(0, 0, 0, 0)');
      });
    });
  });

  describe('accessible', () => {
    it('should be accessible in both the light and shadow dom', async () => {
      const element = await createFixture<PfeCard>(TEMPLATES.card1);

      expect(element).to.be.accessible();
    });

    it('should have an article element wrapper in the shadow dom', async () => {
      const element = await createFixture<PfeCard>(TEMPLATES.card1);
      const role = 'WebArea';

      // @ts-ignore
      const snapshot = await a11ySnapshot(element);

      const foundNode = findAccessibilityNode(
        // @ts-ignore
        snapshot,
        // @ts-ignore
        node => node.role === role
      );

      expect(foundNode, 'A node with the supplied name has been found.').to.not.be.null;
    });
  });
});
