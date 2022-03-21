import { expect, html, oneEvent } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeLabel } from '@patternfly/pfe-label';
import { getColor, hexToRgb } from '@patternfly/pfe-tools/test/hex-to-rgb.js';
import { PfeIcon } from '@patternfly/pfe-icon';

const example = html`
  <pfe-label></pfe-label>
`;

const exampleWithColorAttribute = html`
  <pfe-label color="red"></pfe-label>
`;

const exampleWithColorAttributeEmpty = html`
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


describe('<pfe-label>', function() {
  before(function() {
    // replace the default built-in icon set resolveIconName function
    // with one that loads local icons.  we don't want tests dependent on
    // prod servers.
    PfeIcon.addIconSet('rh', '', function(name: string) {
      return `/elements/pfe-icon/test/${name.replace('rh', 'rh-icon')}.svg`;
    });
  });

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

    expect(getColor(shadowDom, 'color')).to.deep.equal(hexToRgb('#151515'));
    expect(getColor(shadowDom, 'background-color')).to.deep.equal(hexToRgb('#f0f0f0'));

    // border should be transparent
    expect(style.getPropertyValue('border-color')).to.equal('rgba(0, 0, 0, 0)');
  });

  it('should display color variant if color attribute is present', async function() {
    const el = await createFixture<PfeLabel>(exampleWithColorAttribute);
    await el.updateComplete;
    const shadowDom = el.shadowRoot!.querySelector('.pfe-label')!;
    const style = getComputedStyle(shadowDom);

    expect(getColor(shadowDom, 'color')).to.deep.equal(hexToRgb('#7d1007'));
    expect(getColor(shadowDom, 'background-color')).to.deep.equal(hexToRgb('#faeae8'));

    // border should be transparent
    expect(style.getPropertyValue('border-color')).to.equal('rgba(0, 0, 0, 0)');
  });

  it('should display default variant if color attribute is present but empty', async function() {
    const el = await createFixture<PfeLabel>( exampleWithColorAttributeEmpty);
    await el.updateComplete;
    const shadowDom = el.shadowRoot!.querySelector('.pfe-label')!;
    const style = getComputedStyle(shadowDom);

    expect(getColor(shadowDom, 'color')).to.deep.equal(hexToRgb('#151515'));
    expect(getColor(shadowDom, 'background-color')).to.deep.equal(hexToRgb('#f0f0f0'));

    // border should be transparent
    expect(style.getPropertyValue('border-color')).to.equal('rgba(0, 0, 0, 0)');
  });

  it('should display outline variant if the attribute outline is present', async function() {
    const el = await createFixture<PfeLabel>(exampleWithOutlineAttribute);
    await el.updateComplete;
    const shadowDom = el.shadowRoot!.querySelector('.pfe-label')!;

    expect(getColor(shadowDom, 'color')).to.deep.equal(hexToRgb('#151515'));
    expect(getColor(shadowDom, 'background-color')).to.deep.equal(hexToRgb('#ffffff'));
    expect(getColor(shadowDom, 'border-color')).to.deep.equal(hexToRgb('#d2d2d2'));
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
