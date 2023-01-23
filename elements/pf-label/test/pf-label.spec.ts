import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pf-tools/test/create-fixture.js';
import { getColor, hexToRgb } from '@patternfly/pf-tools/test/hex-to-rgb.js';
import '@patternfly/pf-tools/test/stub-logger.js';
import { PfLabel } from '@patternfly/elements/pf-label/pf-label.js';
import { PfIcon } from '@patternfly/elements/pf-icon/pf-icon.js';

const example = html`
  <pf-label>Default</pf-label>
`;

const exampleWithColorAttribute = html`
  <pf-label color="red">Red</pf-label>
`;

const exampleWithColorAttributeEmpty = html`
  <pf-label color="">Default</pf-label>
`;

const exampleWithOutlineAttribute = html`
  <pf-label variant="outline">Default Outline</pf-label>
`;

const exampleWithIconAttribute = html`
  <pf-label icon="rh-icon-virtual-storage-stack">Default Icon</pf-label>
`;

const exampleWithIconAttributeEmpty = html`
  <pf-label icon="">Default</pf-label>
`;

const exampleWithCompactAttribute = html`
  <pf-label compact>Default Compact</pf-label>
`;


describe('<pf-label>', function() {
  before(function() {
    // replace the default built-in icon set resolveIconName function
    // with one that loads local icons.  we don't want tests dependent on
    // prod servers.
    PfIcon.addIconSet('rh', function(name: string) {
      return new URL(`/elements/pf-icon/test/${name.replace('rh', 'rh-icon')}.svg`);
    });
  });

  it('should upgrade', async function() {
    const el = await createFixture<PfLabel>(example);
    const klass = customElements.get('pf-label');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfLabel);
  });

  it('should display default variant', async function() {
    const el = await createFixture<PfLabel>(example);
    await el.updateComplete;
    const container = el.shadowRoot!.querySelector('#container')!;
    const beforeStyles = getComputedStyle(container, '::before');

    expect(getColor(container, 'color')).to.deep.equal(hexToRgb('#151515'));
    expect(getColor(container, 'background-color')).to.deep.equal(hexToRgb('#f5f5f5'));
    expect(beforeStyles.getPropertyValue('border-color')).to.equal('rgb(210, 210, 210)');
  });

  it('should display color variant if color attribute is present', async function() {
    const el = await createFixture<PfLabel>(exampleWithColorAttribute);
    await el.updateComplete;
    const container = el.shadowRoot!.querySelector('#container')!;
    const beforeStyles = getComputedStyle(container, '::before');

    expect(getColor(container, 'color')).to.deep.equal(hexToRgb('#7d1007'));
    expect(getColor(container, 'background-color')).to.deep.equal(hexToRgb('#faeae8'));
    expect(beforeStyles.getPropertyValue('border-color')).to.equal('rgb(201, 25, 11)');
  });

  it('should display default variant if color attribute is present but empty', async function() {
    const el = await createFixture<PfLabel>( exampleWithColorAttributeEmpty);
    await el.updateComplete;
    const container = el.shadowRoot!.querySelector('#container')!;
    const beforeStyles = getComputedStyle(container, '::before');

    expect(getColor(container, 'color')).to.deep.equal(hexToRgb('#151515'));
    expect(getColor(container, 'background-color')).to.deep.equal(hexToRgb('#f5f5f5'));
    expect(beforeStyles.getPropertyValue('border-color')).to.equal('rgb(210, 210, 210)');
  });

  it('should display outline variant if the attribute outline is present', async function() {
    const el = await createFixture<PfLabel>(exampleWithOutlineAttribute);
    await el.updateComplete;
    const container = el.shadowRoot!.querySelector('#container')!;
    const beforeStyles = getComputedStyle(container, '::before');

    expect(getColor(container, 'color')).to.deep.equal(hexToRgb('#151515'));
    expect(getColor(container, 'background-color')).to.deep.equal(hexToRgb('#ffffff'));
    expect(beforeStyles.getPropertyValue('border-color')).to.equal('rgb(210, 210, 210)');
  });

  it('should render a pf-icon if the icon attribute is present and valid', async function() {
    const el = await createFixture<PfLabel>(exampleWithIconAttribute);
    await el.updateComplete;
    const icon = el.shadowRoot!.querySelector('pf-icon')!;
    expect(icon.icon).to.equal(el.icon);
  });

  it('should not render a pf-icon if the icon attribute is present but empty', async function() {
    const el = await createFixture<PfLabel>(exampleWithIconAttributeEmpty);
    await el.updateComplete;
    const icon = el.shadowRoot!.querySelector('pf-icon')!;
    expect(icon).to.be.equal(null);
  });

  it('should display compact version if the attribute is-compact is present', async function() {
    const el = await createFixture<PfLabel>(exampleWithCompactAttribute);
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
