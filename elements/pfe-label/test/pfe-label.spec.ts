import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeLabel } from '@patternfly/pfe-label';
import { getColor, hexToRgb } from '@patternfly/pfe-tools/test/hex-to-rgb.js';
import { PfeIcon } from '@patternfly/pfe-icon';
import '@patternfly/pfe-tools/test/stub-logger.js';

const example = html`
  <pfe-label>Default</pfe-label>
`;

const exampleWithColorAttribute = html`
  <pfe-label color="red">Red</pfe-label>
`;

const exampleWithColorAttributeEmpty = html`
  <pfe-label color="">Default</pfe-label>
`;

const exampleWithOutlineAttribute = html`
  <pfe-label variant="outline">Default Outline</pfe-label>
`;

const exampleWithIconAttribute = html`
  <pfe-label icon="rh-icon-virtual-storage-stack">Default Icon</pfe-label>
`;

const exampleWithIconAttributeEmpty = html`
  <pfe-label icon="">Default</pfe-label>
`;

const exampleWithCompactAttribute = html`
  <pfe-label compact>Default Compact</pfe-label>
`;


describe('<pfe-label>', function() {
  before(function() {
    // replace the default built-in icon set resolveIconName function
    // with one that loads local icons.  we don't want tests dependent on
    // prod servers.
    PfeIcon.addIconSet('rh', function(name: string) {
      return new URL(`/elements/pfe-icon/test/${name.replace('rh', 'rh-icon')}.svg`);
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
    const container = el.shadowRoot!.querySelector('#container')!;
    const beforeStyles = getComputedStyle(container, '::before');

    expect(getColor(container, 'color')).to.deep.equal(hexToRgb('#151515'));
    expect(getColor(container, 'background-color')).to.deep.equal(hexToRgb('#f5f5f5'));
    expect(beforeStyles.getPropertyValue('border-color')).to.equal('rgb(210, 210, 210)');
  });

  it('should display color variant if color attribute is present', async function() {
    const el = await createFixture<PfeLabel>(exampleWithColorAttribute);
    await el.updateComplete;
    const container = el.shadowRoot!.querySelector('#container')!;
    const beforeStyles = getComputedStyle(container, '::before');

    expect(getColor(container, 'color')).to.deep.equal(hexToRgb('#7d1007'));
    expect(getColor(container, 'background-color')).to.deep.equal(hexToRgb('#faeae8'));
    expect(beforeStyles.getPropertyValue('border-color')).to.equal('rgb(201, 25, 11)');
  });

  it('should display default variant if color attribute is present but empty', async function() {
    const el = await createFixture<PfeLabel>( exampleWithColorAttributeEmpty);
    await el.updateComplete;
    const container = el.shadowRoot!.querySelector('#container')!;
    const beforeStyles = getComputedStyle(container, '::before');

    expect(getColor(container, 'color')).to.deep.equal(hexToRgb('#151515'));
    expect(getColor(container, 'background-color')).to.deep.equal(hexToRgb('#f5f5f5'));
    expect(beforeStyles.getPropertyValue('border-color')).to.equal('rgb(210, 210, 210)');
  });

  it('should display outline variant if the attribute outline is present', async function() {
    const el = await createFixture<PfeLabel>(exampleWithOutlineAttribute);
    await el.updateComplete;
    const container = el.shadowRoot!.querySelector('#container')!;
    const beforeStyles = getComputedStyle(container, '::before');

    expect(getColor(container, 'color')).to.deep.equal(hexToRgb('#151515'));
    expect(getColor(container, 'background-color')).to.deep.equal(hexToRgb('#ffffff'));
    expect(beforeStyles.getPropertyValue('border-color')).to.equal('rgb(210, 210, 210)');
  });

  it('should render a pfe-icon if the icon attribute is present and valid', async function() {
    const el = await createFixture<PfeLabel>(exampleWithIconAttribute);
    await el.updateComplete;
    const icon = el.shadowRoot!.querySelector('pfe-icon')!;
    expect(icon.icon).to.equal(el.icon);
  });

  it('should not render a pfe-icon if the icon attribute is present but empty', async function() {
    const el = await createFixture<PfeLabel>(exampleWithIconAttributeEmpty);
    await el.updateComplete;
    const icon = el.shadowRoot!.querySelector('pfe-icon')!;
    expect(icon).to.be.equal(null);
  });

  it('should display compact version if the attribute is-compact is present', async function() {
    const el = await createFixture<PfeLabel>(exampleWithCompactAttribute);
    await el.updateComplete;
    const container = el.shadowRoot!.querySelector('#container')!;
    const beforeStyles = getComputedStyle(container, '::before');
    const containerStyles = getComputedStyle(container);

    expect(getColor(container, 'color')).to.deep.equal(hexToRgb('#151515'));
    expect(getColor(container, 'background-color')).to.deep.equal(hexToRgb('#f5f5f5'));
    expect(beforeStyles.getPropertyValue('border-color')).to.equal('rgb(210, 210, 210)');

    expect(containerStyles.getPropertyValue('padding-top')).to.equal('0px');
    expect(containerStyles.getPropertyValue('padding-right')).to.equal('8px'); // 0.5rem = 8px @ 16px browser default
    expect(containerStyles.getPropertyValue('padding-bottom')).to.equal('0px');
    expect(containerStyles.getPropertyValue('padding-left')).to.equal('8px'); // 0.5rem = 8px @ 16px browser default
  });
});
