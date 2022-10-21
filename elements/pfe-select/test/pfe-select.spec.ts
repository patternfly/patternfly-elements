import { expect, oneEvent, html } from '@open-wc/testing';
import { spy } from 'sinon';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeSelect } from '@patternfly/pfe-select';
import '@patternfly/pfe-tools/test/stub-logger.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const element = html`
  <pfe-select id="pfe-select-for-testing">
    <select id="example2">
      <option value="1">One</option>
      <option value="2">Two</option>
    </select>
  </pfe-select>
`;

describe('<pfe-select>', function() {
  it('should upgrade', async function() {
    const el = await createFixture(element);
    expect(el, 'pfe-select should be an instance of PfeSelect')
      .to.be.an.instanceOf(customElements.get('pfe-select'))
      .and
      .to.be.an.instanceOf(PfeSelect);
  });

  it('should log a warning if there are no children in the light DOM', async function() {
    const el = await createFixture<PfeSelect>(html`
      <pfe-select>
      </pfe-select>
    `);
    expect(el).to.exist;
    expect(Logger.warn, 'The first child in the light DOM must be a supported select tag')
      .to.have.been.calledWith('[pfe-select]');
  });

  it(`should log a warning if select tag is not the first child of pfe-select element`, async function() {
    await createFixture<PfeSelect>(html`
      <pfe-select>
        <div></div>
      </pfe-select>
    `);

    expect(Logger.warn, 'The first child needs to be a select element')
      .to.have.been.calledWith('[pfe-select]');
  });

  // Attribute test.
  it(`should set the aria-invalid to true if invalid attribute is set to true`, async function() {
    const pfeSelect = await createFixture<PfeSelect>(element);
    pfeSelect.setAttribute('invalid', 'true');
    await pfeSelect.updateComplete;

    expect(pfeSelect.getAttribute('invalid')).to.equal('true');
    expect(pfeSelect.children[0].hasAttribute('aria-invalid')).to.be.true;
    expect(pfeSelect.children[0].getAttribute('aria-invalid'))
      .to.equal(pfeSelect.getAttribute('invalid'));
  });

  // Event test.
  it('should fire a pfe-select:change event when one of the options is selected', async function() {
    // Create the component.
    const pfeSelect = await createFixture<PfeSelect>(element);

    // Add a listener for the `pfe-select:change` event.
    const listener = oneEvent(pfeSelect, 'pfe-select:change');

    const [option] = pfeSelect.children as HTMLCollectionOf<HTMLOptionElement>;

    // Change the select value.
    option.value = '2';
    option.dispatchEvent(new Event('change'));

    // After `pfe-select:change` fires make sure it equals the right select option value.
    const { detail } = await listener;
    expect(detail.value).to.equal('2');
  });

  it(`should log a warning if multiple options exist with selected field set as true`, async function() {
    const pfeSelect = await createFixture<PfeSelect>(html`
      <pfe-select>
        <select>
        </select>
      </pfe-select>
    `);

    // setting JS options using setter method.
    pfeSelect.pfeOptions = [
      { text: 'Please select an Option', value: '', selected: true },
      { text: 'One', value: '1', selected: true },
      { text: 'Two', value: '2', selected: false },
      { text: 'Three', value: '3', selected: false },
    ];

    expect(Logger.warn, `The first 'selected' option will take precedence over others in case of multiple 'selected' options`)
      .to.have.been.calledWith('[pfe-select]');
  });

  it('should add options to select through addOptions API', async function() {
    const pfeSelect = await createFixture<PfeSelect>(html`<pfe-select></pfe-select>`);

    const options = [
      { text: 'Please select an Option', value: '', selected: true },
      { text: 'One', value: '1', selected: false },
      { text: 'Two', value: '2', selected: false },
      { text: 'Three', value: '3', selected: false },
    ];

    // Set JS options using addOptions API.
    pfeSelect.addOptions(options);

    // Wait for the element to be done updating.
    await pfeSelect.updateComplete;

    // Make sure the options were applied to the select element.
    expect((pfeSelect.children[0] as HTMLSelectElement).options.length).to.equal(options.length);

    // Clean up our DOM since we didn't use a fixture.
    pfeSelect.remove();
  });

  // @TODO: don't test private properties
  // @TODO: test new options property interface
  it('should call _modifyDOM method if pfeOptions exist', async function() {
    const pfeSelect = await createFixture<PfeSelect>(element);

    // Listen for the `_modifyDOM` method to be called.
    // @ts-expect-error: shouldn't test private properties
    const spyModifyDOM = spy(pfeSelect, '_modifyDOM');

    pfeSelect.pfeOptions = [
      { text: 'Please select an Option', value: '', selected: true },
      { text: 'One', value: '1', selected: false },
      { text: 'Two', value: '2', selected: false },
      { text: 'Three', value: '3', selected: false },
    ];

    // Wait for the element to be done updating.
    await pfeSelect.updateComplete;

    expect(spyModifyDOM.called).to.be.true;
    expect((pfeSelect.children[0] as HTMLSelectElement).options.length)
      .to.equal(pfeSelect.pfeOptions.length);
    spyModifyDOM.restore();
  });

  it('should replace lightDOM select (if exists) with pfeOptions', async function() {
    const pfeSelect = await createFixture<PfeSelect>(html`
      <pfe-select>
        <select id="please-replace">
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
      </pfe-select>
    `);

    // @TODO: don't test private properties
    // Listen for the `_modifyDOM` method to be called.
    // @ts-expect-error: shouldn't test private properties
    const spyModifyDOM = spy(pfeSelect, '_modifyDOM');

    pfeSelect.pfeOptions = [
      { text: 'It worked', value: '', selected: true },
    ];

    // Wait for the element to be done updating.
    await pfeSelect.updateComplete;

    // The `_modifyDOM` method should have been called.
    expect(spyModifyDOM.called).to.be.true;

    // Make sure the lightDOM select got replaced with new select.
    expect(document.querySelector('#please-replace')).to.not.exist;

    // Make sure the select options are correct.
    expect((pfeSelect.children[0] as HTMLSelectElement).options.length)
      .to.equal(pfeSelect.pfeOptions.length);

    spyModifyDOM.restore();
  });
});
