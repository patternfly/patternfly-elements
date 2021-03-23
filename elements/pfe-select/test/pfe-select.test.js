import { assert, expect, oneEvent } from '@open-wc/testing';
// import {spy} from 'sinon';

import '../dist/pfe-select';

import { createFixture } from './create-fixture';

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

  it('it should upgrade', async () => {
    const el = await createFixture(element);
    assert.instanceOf(el, customElements.get("pfe-select", 'pfe-select should be an instance of pfeSelect'));
  });

  // Attribute test.
  it('it should set the aria-invalid to true if pfe-invalid attribute is set to true', async () => {
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

    // This does not work because of an error in pfe-select.
  // Error: Uncaught TypeError: Cannot read property 'removeEventListener' of undefined (http://localhost:8000/elements/pfe-select/dist/pfe-select.js:149
  // test.only("it should log a warning if there are no children in the light DOM", async () => {
  //   const spyConsole = spy(console, 'warn');
  //   const el = await fixture(html`
  //     <pfe-select id="pfe-select-success">
  //     </pfe-select>
  //   `);
  //   expect(el).to.exist;
  //   spyConsole.calledWith('[pfe-select]: The first child in the light DOM must be a supported select tag');
  //   spyConsole.restore();
  // });
});
