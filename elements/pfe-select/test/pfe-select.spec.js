import { assert, expect, oneEvent, elementUpdated } from '@open-wc/testing/index-no-side-effects.js';
import { spy } from 'sinon';

import '../dist/pfe-select';

import { createFixture } from '../../../test/utils/create-fixture.js';

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const element =
  `<pfe-select id="pfe-select-for-testing">
    <select id="example2">
      <option value="1">One</option>
      <option value="2">Two</option>
    </select>
  </pfe-select>
`;

describe('<pfe-select>', () => {

  it('should upgrade', async () => {
    const el = await createFixture(element);
    expect(el).to.be.an.instanceOf(customElements.get("pfe-select"), 'pfe-select should be an instance of pfeSelect');
  });

  it("should log a warning if there are no children in the light DOM", async () => {
    const spyConsole = spy(console, "warn");
    const el = await createFixture(`
      <pfe-select>
      </pfe-select>
    `);
    expect(el).to.exist;
    expect(spyConsole.calledWith("[pfe-select]", "The first child in the light DOM must be a supported select tag")).to.be.true;
    spyConsole.restore();
  });

  it("should log a warning if select tag is not the first child of pfe-select element", async () => {
    const spyConsole = spy(console, "warn");
    await createFixture(`
      <pfe-select>
        <div></div>
      </pfe-select>
    `);

    expect(spyConsole.calledWith("[pfe-select]", "The first child needs to be a select element")).to.be.true;
    spyConsole.restore();
  });

  // Attribute test.
  it('should set the aria-invalid to true if pfe-invalid attribute is set to true', async () => {
    const pfeSelect = await createFixture(element);
    pfeSelect.setAttribute("pfe-invalid", 'true');

    assert.equal(pfeSelect.getAttribute("pfe-invalid"), 'true');
    assert.isTrue(pfeSelect.children[0].hasAttribute("aria-invalid"));
    assert.equal(pfeSelect.children[0].getAttribute("aria-invalid"), pfeSelect.getAttribute("pfe-invalid"));
  });

  // Event test.
  it('it should fire a pfe-select:change event when one of the options is selected', async () => {
    // Create the component.
    const pfeSelect = await createFixture(element);

    // Add a listener for the `pfe-select:change` event.
    const listener = oneEvent(pfeSelect, 'pfe-select:change');

    // Change the select value.
    pfeSelect.children[0].value = "2";

    // Manually call the input change method to trigger the event.
    pfeSelect._inputChanged();

    // After `pfe-select:change` fires make sure it equals the right select option value.
    const { detail } = await listener;
    expect(detail.value).to.equal('2');
  });

  it("should log a warning if multiple options exist with selected field set as true", async () => {
    const spyConsole = spy(console, "warn");
    const pfeSelect = await createFixture(`
      <pfe-select>
        <select>
        </select>
      </pfe-select>
    `);

    // setting JS options using setter method.
    pfeSelect.pfeOptions = [
      { text: "Please select an Option", value: "", selected: true },
      { text: 'One', value: '1', selected: true },
      { text: 'Two', value: '2', selected: false },
      { text: 'Three', value: '3', selected: false}
    ];

    expect(
      spyConsole
        .calledWith("[pfe-select]", "The first 'selected' option will take precedence over others in case of multiple 'selected' options")
      ).to.be.true;

    spyConsole.restore();
  });

  it("should add options to select through addOptions API", async () => {
    const pfeSelect = document.createElement("pfe-select");

    document.body.appendChild(pfeSelect);

    const options = [
      { text: "Please select an Option", value: "", selected: true },
      { text: 'One', value: '1', selected: false },
      { text: 'Two', value: '2', selected: false },
      { text: 'Three', value: '3', selected: false}
    ];

    // Set JS options using addOptions API.
    pfeSelect.addOptions(options);

    // Wait for the element to be done updating.
    await elementUpdated(pfeSelect);

    // Make sure the options were applied to the select element.
    expect(pfeSelect.children[0].options.length).to.equal(options.length);

    // Clean up our DOM since we didn't use a fixture.
    pfeSelect.remove();
  });

  it("should call _modifyDOM method if pfeOptions exist", async () => {
    const pfeSelect = await createFixture(element);

    // Listen for the `_modifyDOM` method to be called.
    const spyModifyDOM = spy(pfeSelect, "_modifyDOM");

    pfeSelect.pfeOptions = [
      { text: "Please select an Option", value: "", selected: true },
      { text: 'One', value: '1', selected: false },
      { text: 'Two', value: '2', selected: false },
      { text: 'Three', value: '3', selected: false}
    ];

    // Wait for the element to be done updating.
    await elementUpdated(pfeSelect);

    expect(spyModifyDOM.called).to.be.true;
    expect(pfeSelect.children[0].options.length, pfeSelect.pfeOptions.length);
    spyModifyDOM.restore();
  });

  it("it should replace lightDOM select (if exists) with pfeOptions", async () => {
    const pfeSelect = await createFixture(`
      <pfe-select>
        <select id="please-replace">
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
      </pfe-select>
    `);

    // Listen for the `_modifyDOM` method to be called.
    const spyModifyDOM = spy(pfeSelect, "_modifyDOM");

    pfeSelect.pfeOptions = [
      { text: "It worked", value: "", selected: true }
    ];

    // Wait for the element to be done updating.
    await elementUpdated(pfeSelect);

    // The `_modifyDOM` method should have been called.
    expect(spyModifyDOM.called).to.be.true;

    // Make sure the lightDOM select got replaced with new select.
    expect(document.querySelector("#please-replace")).to.not.exist;

    // Make sure the select options are correct.
    expect(pfeSelect.children[0].options.length).to.equal(pfeSelect.pfeOptions.length);

    spyModifyDOM.restore();
  });
});
