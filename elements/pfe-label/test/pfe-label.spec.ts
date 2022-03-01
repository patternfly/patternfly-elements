import { expect, html, aTimeout, oneEvent } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeLabel } from '@patternfly/pfe-label';

const example = html`
  <pfe-label></pfe-label>
`;

const exampleWithColorAttribute = html`
  <pfe-label color="red"></pfe-label>
`;

const exampleWithOutColorAttribute = html`
  <pfe-label color=""></pfe-label>
`;

const exampleWithOutlineAttribute = html`
  <pfe-label outline></pfe-label>
`;

const exampleWithIconAttribute = html`
  <pfe-label icon="rh-icon-virtual-storage-stack"></pfe-label>
`;

const exampleWithIconAttributeEmpty = html`
  <pfe-label icon=""></pfe-label>
`;

/*
* rgba2hex
* https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
* @author Erick Petrucelli
*/
const rgba2hex = (rgba: string) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)?.slice(1).map((n: string, i: number) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`;

describe('<pfe-label>', function() {
  it('should upgrade', async function() {
    const el = await createFixture<PfeLabel>(example);
    const klass = customElements.get('pfe-label');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfeLabel);
  });

  it('should display default variant', async function() {
    const el = await createFixture<PfeLabel>(example);
    await el.updateComplete;
    const shadowDom = el.shadowRoot!.querySelector('.pfe-label')!;
    const style = getComputedStyle(shadowDom);
    expect(rgba2hex(style.getPropertyValue('color'))).to.equal('#151515');
    expect(rgba2hex(style.getPropertyValue('background-color'))).to.equal('#f0f0f0');
    expect(rgba2hex(style.getPropertyValue('border-color'))).to.equal('#f0f0f0');
  });

  it('should display color variant if color attribute is present', async function() {
    const el = await createFixture<PfeLabel>(exampleWithColorAttribute);
    await el.updateComplete;
    const shadowDom = el.shadowRoot!.querySelector('.pfe-label')!;
    const style = getComputedStyle(shadowDom);
    expect(rgba2hex(style.getPropertyValue('color'))).to.equal('#7d1007');
    expect(rgba2hex(style.getPropertyValue('background-color'))).to.equal('#faeae8');
    expect(rgba2hex(style.getPropertyValue('border-color'))).to.equal('#faeae8');
  });

  it('should display default variant if color attribute is present but empty', async function() {
    const el = await createFixture<PfeLabel>(exampleWithOutColorAttribute);
    await el.updateComplete;
    const shadowDom = el.shadowRoot!.querySelector('.pfe-label')!;
    const style = getComputedStyle(shadowDom);
    expect(rgba2hex(style.getPropertyValue('color'))).to.equal('#151515');
    expect(rgba2hex(style.getPropertyValue('background-color'))).to.equal('#f0f0f0');
    expect(rgba2hex(style.getPropertyValue('border-color'))).to.equal('#f0f0f0');
  });

  it('should display outline variant if the attribute outline is present', async function() {
    const el = await createFixture<PfeLabel>(exampleWithOutlineAttribute);
    await el.updateComplete;
    const shadowDom = el.shadowRoot!.querySelector('.pfe-label')!;
    const style = getComputedStyle(shadowDom);
    expect(rgba2hex(style.getPropertyValue('color'))).to.equal('#151515');
    expect(rgba2hex(style.getPropertyValue('background-color'))).to.equal('#ffffff');
    expect(rgba2hex(style.getPropertyValue('border-color'))).to.equal('#d2d2d2');
  });

  it('should render a pfe-icon if the icon attribute is present and valid', async function() {
    const el = await createFixture<PfeLabel>(exampleWithIconAttribute);
    await el.updateComplete;
    const icon = el.shadowRoot!.querySelector('pfe-icon')!;
    const image = icon.shadowRoot!.querySelector('svg image')!;
    setTimeout(() => icon.setAttribute('icon', 'rh-bike'));
    await oneEvent(image, 'load');
  });

  it('should not render a pfe-icon if the icon attribute is present but empty', async function() {
    const el = await createFixture<PfeLabel>(exampleWithIconAttributeEmpty);
    await el.updateComplete;
    const icon = el.shadowRoot!.querySelector('pfe-icon')!;
    expect(icon).to.be.equal(null);
  });
});
