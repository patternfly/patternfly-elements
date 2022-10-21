import { expect, html, aTimeout } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { hexToRgb, getColor } from '@patternfly/pfe-tools/test/hex-to-rgb.js';

import '@patternfly/pfe-tools/test/stub-logger.js';

import { PfeCard } from '@patternfly/pfe-card';

/** Returns the luminance value from RGB */
const luminance = (r: number, g: number, b: number): number => {
  return (0.2126 * r / 255 + 0.7152 * g / 255 + 0.0722 * b / 255);
};

const TEMPLATES = {

  card1: html`
    <pfe-card id="card1">
      <h2 slot="header">Card 1</h2>
      <p>This is pfe-card.</p>
      <div slot="footer">Text in footer</div>
    </pfe-card>`,

  card2: html`
    <pfe-card id="card2">
      <img src="https://placekitten.com/200/150" alt=""/>
    </pfe-card>`,

  card3: html`
    <pfe-card id="card3">
      <h2 slot="header">Card 3</h2>
      <img src="https://placekitten.com/1000/500" alt="" overflow="top right bottom left"/>
    </pfe-card>`,

  card4: html`
    <pfe-card id="card4">
      <h2 slot="header">Card 4</h2>
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

  it(`should render a header and footer when content for those deprecated slots are added dynamically`, async function() {
    const element = await createFixture<PfeCard>(dynamicHeaderFooter);

    const header = document.createElement('h2');
    header.setAttribute('slot', 'pfe-card--header');
    header.textContent = 'Card Header';

    const footer = document.createElement('div');
    footer.setAttribute('slot', 'pfe-card--footer');
    footer.textContent = 'This is the footer';

    element.prepend(header);
    element.appendChild(footer);

    await element.updateComplete;

    const cardHeaderSlot =
      element.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="pfe-card--header"]')!;
    const cardFooterSlot =
      element.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="pfe-card--footer"]')!;

    await element.updateComplete;

    expect(cardHeaderSlot.assignedNodes().length).to.equal(1);
    expect(cardFooterSlot.assignedNodes().length).to.equal(1);
  });

  // Iterate over the colors object to test expected background color results
  describe('color palettes', function() {
    // Themes and their expected hex values
    Object.entries({
      default: '#f0f0f0',
      darker: '#3c3f42',
      darkest: '#151515',
      accent: '#004080',
      complement: '#002952',
      lightest: '#ffffff',
    }).forEach(([colorName, colorValue]) => {
      it(`it should have a background color of ${colorValue} when color-palette is ${colorName}`, async function() {
        const element = await createFixture<PfeCard>(TEMPLATES.card1);
        // If this is not the default color, update the color attribute
        if (colorName !== 'default') {
          element.setAttribute('color-palette', colorName);
        }

        // Get the background color value
        const [r, g, b] = getColor(element, 'background-color');
        // Test that the color is rendering as expected
        expect([r, g, b]).to.deep.equal(hexToRgb(colorValue));
        // Test that the color is working
        if (['dark', 'darker', 'darkest', 'complement', 'accent'].includes(colorName)) {
          expect(luminance(r, g, b)).to.be.lessThan(0.5);
        } else {
          expect(luminance(r, g, b)).to.be.greaterThan(0.5);
        }
      });

      it(`it should have a background color of ${colorValue} when deprecated color attribute is ${colorName}`, async function() {
        const element = await createFixture<PfeCard>(TEMPLATES.card1);
        // If this is not the default color, update the color attribute
        if (colorName !== 'default') {
          element.setAttribute('color', colorName);
        }

        await element.updateComplete;

        // Get the background color value
        const [r, g, b] = getColor(element, 'background-color');
        // Test that the color is rendering as expected
        expect([r, g, b]).to.deep.equal(hexToRgb(colorValue));
        // Test that the color is working
        if (['dark', 'darker', 'darkest', 'complement', 'accent'].includes(colorName)) {
          expect(luminance(r, g, b)).to.be.lessThan(0.5);
        } else {
          expect(luminance(r, g, b)).to.be.greaterThan(0.5);
        }
      });
    });
  });

  it('should have standard padding when size is not set', async function() {
    const element = await createFixture<PfeCard>(TEMPLATES.card1);
    expect(getComputedStyle(element).getPropertyValue('padding')).to.equal('32px');
  });

  it('should have reduced padding when size is small', async function() {
    const element = await createFixture<PfeCard>(TEMPLATES.card1);
    element.setAttribute('size', 'small');
    expect(getComputedStyle(element).getPropertyValue('padding')).to.equal('16px');
    element.removeAttribute('size');
  });

  it('should have a standard border when border is set', async function() {
    const element = await createFixture<PfeCard>(TEMPLATES.card1);
    element.setAttribute('border', '');

    expect(getColor(element, 'border-left-color')).to.deep.equal(hexToRgb('#d2d2d2'));
    expect(Math.round(parseFloat(getComputedStyle(element).getPropertyValue('border-left-width'))))
      .to.equal(1);
  });

  // Iterate over the slots object to test expected results
  describe('slots', function() {
    Object.entries({
      header: {
        name: 'header',
        class: 'pfe-card__header',
        content: 'Card 1',
      },
      body: {
        name: undefined,
        class: 'pfe-card__body',
        content: 'This is pfe-card.',
      },
      footer: {
        name: 'footer',
        class: 'pfe-card__footer',
        content: 'Text in footer',
      },
    }).forEach(([title, config]) => {
      it(`${title} content is placed into correct slot`, async function() {
        const element = await createFixture<PfeCard>(TEMPLATES.card1);
        const selector = title !== 'body' ? `[slot=${config.name}]` : 'p';
        expect(element.querySelector(selector)!.assignedSlot)
          .to.equal(element.shadowRoot!.querySelector(`.${config.class} > *`) );

        const content = element.shadowRoot!.querySelector<HTMLSlotElement>(`.${config.class} > *`)!
          .assignedNodes()
          .map(n => n.textContent)
          .join('')
          .trim();
        expect(content).to.equal(config.content);
      });
    });
  });

  describe('deprecated slots', function() {
    let element: PfeCard|undefined;

    beforeEach(async function() {
      element = await createFixture<PfeCard>(html`
        <pfe-card id="deprecated-slots">
          <h2 slot="pfe-card--header">Deprecated header</h2>
          <p>This is pfe-card.</p>
          <div slot="pfe-card--footer">Deprecated footer</div>
        </pfe-card>`);
    });

    afterEach(function() {
      element = undefined;
    });

    Object.entries({
      header: {
        name: 'pfe-card--header',
        class: 'pfe-card__header',
        content: 'Deprecated header',
      },
      body: {
        name: undefined,
        class: 'pfe-card__body',
        content: 'This is pfe-card.',
      },
      footer: {
        name: 'pfe-card--footer',
        class: 'pfe-card__footer',
        content: 'Deprecated footer',
      },
    }).forEach(([title, config]) => {
      it(`${title} content is placed into correct slot`, async function() {
        const selector = title !== 'body' ? `[slot="${config.name}"]` : 'p';

        const slotSelector = config.name ? `.${config.class} > [name="${config.name}"]` : `.${config.class} > slot`;

        expect(element!.querySelector(selector)!.assignedSlot)
          .to.equal(element!.shadowRoot!.querySelector(slotSelector));

        const content = element!.shadowRoot!
          .querySelector<HTMLSlotElement>(slotSelector)!
          .assignedNodes()
          .map(n => n.textContent)
          .join('')
          .trim();

        expect(content).to.equal(config.content);
      });
    });
  });

  // Iterate over possibilities for images
  describe('overflow', function() {
    ['top', 'right', 'bottom', 'left'].forEach(direction => {
      it(`image should overflow to the ${direction}`, async function() {
        const element = await createFixture<PfeCard>(TEMPLATES.card2);
        const image = element.querySelector('img')!;
        image.setAttribute('overflow', direction);
        await aTimeout(50);
        const margin = direction !== 'bottom' ? '-32px' : '-35px';
        expect(getComputedStyle(image).getPropertyValue(`margin-${direction}`)).to.equal(margin);
      });
    });

    it('image should overflow all padding', async function() {
      const element = await createFixture<PfeCard>(TEMPLATES.card3);
      const image = element.querySelector('img')!;
      expect(image.getAttribute('overflow')).to.equal('top right bottom left');
      const style = getComputedStyle(image);
      await aTimeout(50);
      expect(style.getPropertyValue('margin-top'), 'margin-top').to.equal('-32px');
      expect(style.getPropertyValue('margin-right'), 'margin-right').to.equal('-32px');
      expect(style.getPropertyValue('margin-bottom'), 'margin-bottom').to.equal('-35px');
      expect(style.getPropertyValue('margin-left'), 'margin-left').to.equal('-32px');
    });
  });

  // Iterate over the custom properties to test overrides work
  describe('custom properties', function() {
    Object.values({
      paddingTop: {
        variable: '--pfe-card--PaddingTop',
        css: 'padding-top',
        default: '32px',
        custom: '28px',
      },
      paddingRight: {
        variable: '--pfe-card--PaddingRight',
        css: 'padding-right',
        default: '32px',
        custom: '28px',
      },
      paddingBottom: {
        variable: '--pfe-card--PaddingBottom',
        css: 'padding-bottom',
        default: '32px',
        custom: '28px',
      },
      paddingLeft: {
        variable: '--pfe-card--PaddingLeft',
        css: 'padding-left',
        default: '32px',
        custom: '28px',
      },
      padding: {
        variable: '--pfe-card--Padding',
        css: 'padding',
        default: '32px',
        custom: '20px 10px',
      },
      borderRadius: {
        variable: '--pfe-card--BorderRadius',
        css: 'border-radius',
        default: '3px',
        custom: '50%',
      },
      border: {
        variable: '--pfe-card--Border',
        css: 'border',
        default: '0px solid rgb(210, 210, 210)',
        custom: '1px solid #eee',
        customExpected: '1px solid rgb(238, 238, 238)',
      },
      backgroundColor: {
        variable: '--pfe-card--BackgroundColor',
        css: 'background-color',
        default: '#dfdfdf',
        defaultExpected: 'rgb(240, 240, 240)',
        custom: 'hotpink',
        customExpected: 'rgb(255, 105, 180)',
      },
    }).forEach(async property => {
      describe(`${property.variable}`, function() {
        let element: PfeCard;
        let style: CSSStyleDeclaration;
        beforeEach(async function() {
          element = await createFixture<PfeCard>(TEMPLATES.card1);
          style = getComputedStyle(element);
          await aTimeout(50);
        });

        it('Uses expected default', async function() {
          const actual = style.getPropertyValue(property.css);
          const expected = property.defaultExpected ?? property.default;
          expect(actual).to.equal(expected);
        });

        it('Allows user customization', async function() {
          // Update the variable
          element.style.setProperty(property.variable, property.custom);

          // Test the update worked
          await aTimeout(50);

          const actual = style.getPropertyValue(property.css);
          const expected = property.customExpected ?? property.custom;
          expect(actual).to.equal(expected);
        });
      });
    });
  });
});
