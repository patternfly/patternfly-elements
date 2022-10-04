import type { SinonSpy } from 'sinon';
import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeSwitch } from '@patternfly/pfe-switch';
import { spy } from 'sinon';

declare global {
  interface Window {
      React: object;
  }
}

const element = html`
  <pfe-switch label="Message when on" label-off="Message when off">
    <input type="checkbox">
  </pfe-switch>
`;

const checkElement = html`
  <pfe-switch checked>
    <input type="checkbox">
  </pfe-switch>
`;

const checkElementWithMessage = html`
  <pfe-switch label="Message when on" label-off="Message when off" has-check-icon checked>
    <input type="checkbox">
  </pfe-switch>
`;

const disabledSwitchElement = html`
  <pfe-switch disabled>
    <input type="checkbox">
  </pfe-switch>
`;

const disabledInputElement = html`
  <pfe-switch>
    <input type="checkbox" disabled>
  </pfe-switch>
`;

const checkedElement = html`
  <pfe-switch checked>
    <input type="checkbox">
  </pfe-switch>
`;

const checkedInputElement = html`
  <pfe-switch>
    <input type="checkbox" checked>
  </pfe-switch>
`;

const noInput = html`
  <pfe-switch></pfe-switch>
`;

const multipleInputs = html`
  <pfe-switch>
    <input type="checkbox">
    <input type="checkbox">
  </pfe-switch>
`;

const badInputType = html`
  <pfe-switch>
    <input type="text">
  </pfe-switch>
`;

describe('<pfe-switch>', function() {
  beforeEach(function() {
    spy(console, 'warn');
  });

  afterEach(function() {
    (console.warn as SinonSpy).restore(); // eslint-disable-line no-console
  });

  it('should upgrade', async function() {
    const el = await createFixture <PfeSwitch>(element);
    const klass = customElements.get('pfe-switch');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfeSwitch);
  });

  it('should show the label message when pfe-switch is checked', async function() {
    const el = await createFixture <PfeSwitch>(element);
    await el.click();

    const labelSpan = el.shadowRoot?.querySelector('#label');
    expect(labelSpan?.textContent).to.equal('Message when on');
  });

  it('should show the labelOff message when pfe-switch is not checked', async function() {
    const el = await createFixture <PfeSwitch>(element);
    const labelSpan = el.shadowRoot?.querySelector('#label');
    expect(labelSpan?.textContent).to.equal('Message when off');
  });

  it('should have a check icon when checked and no label has been provided', async function() {
    const el = await createFixture <PfeSwitch>(checkElement);
    const toggleIcon = el.shadowRoot?.querySelectorAll('#toggle-icon');
    expect(toggleIcon?.length).to.equal(1);
  });

  it('should have a check icon with the message if the has-check-icon attribute is present', async function() {
    const el = await createFixture <PfeSwitch>(checkElementWithMessage);
    const toggleIcon = el.shadowRoot?.querySelectorAll('#toggle-icon');
    expect(toggleIcon?.length).to.equal(1);
  });

  it('should add a disabled attribute to the input if disabled is true on pfe-switch', async function() {
    const el = await createFixture <PfeSwitch>(disabledSwitchElement);
    const input = el.querySelector('input');
    expect(input?.disabled).to.be.true;
  });

  it('should add a disabled attribute to pfe-switch if a disabled attribute is present on the input', async function() {
    const el = await createFixture <PfeSwitch>(disabledInputElement);
    expect(el.disabled).to.be.true;
  });

  it('should add a checked attribute to the input if checked is true on pfe-switch', async function() {
    const el = await createFixture <PfeSwitch>(checkedElement);
    const input = el.querySelector('input');
    expect(input?.checked).to.be.true;
  });

  it('should add a checked attribute to pfe-switch if a checked attribute is present on the input', async function() {
    // React wants defaultChecked on the input
    if (window.React) {
      return;
    }

    const el = await createFixture <PfeSwitch>(checkedInputElement);
    expect(el.hasAttribute('checked')).to.be.true;
  });

  it('should log a warning if an input is not provided in the light dom', async function() {
    await createFixture <PfeSwitch>(noInput);
    expect(console.warn) // eslint-disable-line no-console
      .to.have.been.calledOnceWith('[pfe-switch]', 'You must have an input in the light DOM');
  });

  it('should log a warning if there are multiple inputs in the light DOM', async function() {
    await createFixture <PfeSwitch>(multipleInputs);
    expect(console.warn) // eslint-disable-line no-console
      .to.have.been.calledOnceWith('[pfe-switch]', 'Only one input child is allowed');
  });

  it('should log a warning if the input does not have a type of checkbox', async function() {
    await createFixture <PfeSwitch>(badInputType);
    expect(console.warn) // eslint-disable-line no-console
      .to.have.been.calledOnceWith('[pfe-switch]', 'The input must have a type of checkbox');
  });
});
