import { setViewport } from '@web/test-runner-commands';
import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeClipboardCopy } from '@patternfly/pfe-clipboard-copy';

const element = html`
  <pfe-clipboard-copy value="copy me!"></pfe-clipboard-copy>
`;

describe('<pfe-clipboard-copy>', function() {
  it('should upgrade', async function() {
    const el = await createFixture <PfeClipboardCopy>(element);
    const klass = customElements.get('pfe-clipboard-copy');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfeClipboardCopy);
  });

  it('it should have a value property.', async function() {
    const el = await createFixture <PfeClipboardCopy>(element);
    el.setAttribute('value', 'another copy item!');
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('input')?.value).to.equal('another copy item!');
  });

  it('it should contain a readonly property', async function() {
    const el = await createFixture <PfeClipboardCopy>(element);
    el.setAttribute('readonly', '');
    await el.updateComplete;
    const input = el.shadowRoot?.querySelector('input') as HTMLElement;
    expect(input?.hasAttribute('disabled')).to.be.true;
    // it should be grayed out
    expect(getComputedStyle(input)?.getPropertyValue('background-color')).to.equal('rgb(240, 240, 240)');
  });

  it('it should be expandable', async function() {
    const el = await createFixture <PfeClipboardCopy>(element);
    el.setAttribute('variant', 'expansion');
    await el.updateComplete;
    // ensure the dropdown action button is present
    expect(el.shadowRoot?.querySelector('[part~="dropdown-button"]')).to.not.be.null;
    // ensure the dropdown is not present
    expect(el.shadowRoot?.querySelector('[part~="dropdown"]')).to.be.null;

    // check if the dropdown appears if you expand it.
    el.expanded = true;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('[part~="dropdown"]')).to.not.be.null;
  });
});
