// Import testing helpers. For more information check out:
// https://open-wc.org/docs/testing/helpers/
import { assert, oneEvent, elementUpdated } from "@open-wc/testing/index-no-side-effects.js";
import { spy, assert as sinonAssert } from 'sinon';

// Import our custom fixture wrapper. This allows us to run tests
// in React and Vue as well as a normal fixture.
import { createFixture } from "../../../test/utils/create-fixture.js";

// Import the element we're testing.
import "../dist/pfe-collapse";

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const testElement = `
<pfe-collapse>
  <pfe-collapse-toggle>Toggle</pfe-collapse-toggle>
  <pfe-collapse-panel>Panel</pfe-collapse-panel>
</pfe-collapse>`;

describe("<pfe-collapse>", () => {
  it("should upgrade", async () => {
    const el = await createFixture(testElement);

    assert.instanceOf(el, customElements.get(
      "pfe-collapse",
      "pfe-collapse should be an instance of PfeCollapse"
    ));
  });

  it("should initialize with the correct attributes", async () => {
    const collapse = await createFixture(testElement);

    const toggle = collapse.querySelector("pfe-collapse-toggle");
    const panel = collapse.querySelector("pfe-collapse-panel");

    // await elementUpdated(collapse);
    await elementUpdated(toggle);

    assert.equal(toggle.button.getAttribute("aria-expanded"), "false");
    assert.equal(toggle.button.getAttribute("role"), "button");
    assert.equal(toggle.button.getAttribute("tabindex"), "0");

    assert.equal(toggle.getAttribute("aria-controls"), panel.id);

    await elementUpdated(panel);
    assert.isNotTrue(panel.hasAttribute("expanded"));
  });

  it("should toggle the corresponding panel inside pfe-collapse on click", async () => {
    const collapse = await createFixture(testElement);
    const toggle = collapse.querySelector("pfe-collapse-toggle");
    const panel = collapse.querySelector("pfe-collapse-panel");

    assert.equal(toggle.button.getAttribute("aria-expanded"), "false");
    assert.isNotTrue(panel.hasAttribute("expanded"));

    toggle.click();

    assert.equal(toggle.button.getAttribute("aria-expanded"), "true");
    assert.isTrue(panel.hasAttribute("expanded"));

    toggle.click();

    assert.equal(toggle.button.getAttribute("aria-expanded"), "false");
    assert.isNotTrue(panel.hasAttribute("expanded"));
  });

  it("should toggle a panel inside pfe-collapse when the toggle method is called on pfe-collapse", async () => {
    const collapse = await createFixture(testElement);
    const toggle = collapse.querySelector("pfe-collapse-toggle");
    const panel = collapse.querySelector("pfe-collapse-panel");

    collapse.toggle();
    
    assert.equal(toggle.getAttribute("aria-expanded"), "true");
    assert.isTrue(panel.hasAttribute("expanded"));

    collapse.toggle();

    assert.equal(toggle.getAttribute("aria-expanded"), "false");
    assert.isNotTrue(panel.hasAttribute("expanded"));
  });

  // @TODO why is this test failing Zack?!
  it("should fire a pfe-collapse:change event when the element is expanded or collapsed", async () => {
    const collapse = await createFixture(testElement);
    const toggle = collapse.querySelector("pfe-collapse-toggle");
    const panel = collapse.querySelector("pfe-collapse-panel");
    
    setTimeout(() => toggle.click());
    
    // After the event fires make sure it returns the right details
    const { detail } = await oneEvent(collapse, "pfe-collapse:change");

    assert.deepEqual(detail, {
      expanded: true,
      toggle: toggle,
      panel: panel
    });
  });

  it("should add an animation attribute to a pfe-collapse-panel when the attribute is added to pfe-collapse", async () => {
    const collapse = await createFixture(testElement);
    const panel = collapse.querySelector("pfe-collapse-panel");

    collapse.setAttribute("animation", "false");
    assert.equal(panel.getAttribute("animation"), "false");
  });

  it("should log a warning if a pfe-collapse-toggle doesn't have an associated pfe-collapse-panel", async () => {
    const spyConsole = spy(console, "warn");
    const toggle = await createFixture(`<pfe-collapse-toggle id="toggle-element">Toggle</pfe-collapse-toggle>`);

    toggle.click();

    sinonAssert.calledWith(
      spyConsole,
      "[pfe-collapse-toggle#toggle-element]",
      "This toggle doesn't have a panel associated with it."
    );

    spyConsole.restore();
  });

  it("should not open the panel if the toggle has been disabled", async () => {
    const collapse = await createFixture(testElement);
    const toggle = collapse.querySelector("pfe-collapse-toggle");
    const panel = collapse.querySelector("pfe-collapse-panel");

    toggle.setAttribute("disabled", "disabled");

    await elementUpdated(toggle);

    toggle.click();

    assert.equal(toggle.button.getAttribute("aria-expanded"), "false");
    assert.isTrue(!panel.hasAttribute("expanded"));
  });

  it("should still be able to open a panel that is added to the DOM after the toggle has been added", async () => {
    const collapseContainer = await createFixture(`
    <div id="latePanel">
      <pfe-collapse-toggle aria-controls="latePanel1">Toggle</pfe-collapse-toggle>
    </div>`);

    const toggle = collapseContainer.querySelector("pfe-collapse-toggle");
    const panel = document.createElement("pfe-collapse-panel");

    panel.id = "latePanel1";
    panel.innerText = "Panel";

    collapseContainer.appendChild(panel);
    toggle.click();

    assert.equal(toggle.getAttribute("aria-expanded"), "true");
    assert.isTrue(panel.hasAttribute("expanded"));
  });
});

describe("<pfe-collapse-toggle>", () => {
  it("should be able to control a pfe-collapse-panel without being wrapped in a pfe-collapse tag", async () => {
    const outsidePfeCollapse = await createFixture(`
    <div>
      <pfe-collapse-toggle aria-controls="panel1">Toggle</pfe-collapse-toggle>
      <pfe-collapse-panel id="panel1">Panel</pfe-collapse-panel>
    </div>`);
    
    const toggle = outsidePfeCollapse.querySelector(
      "pfe-collapse-toggle"
    );
    const panel = outsidePfeCollapse.querySelector(
      "pfe-collapse-panel"
    );

    toggle.click();

    assert.equal(toggle.getAttribute("aria-expanded"), "true");
    assert.isTrue(panel.hasAttribute("expanded"));
  });
});

describe("<pfe-collapse-panel>", () => {
  it("should fire a pfe-collapse-panel:animation-start event when the panel is expanded or collapsed", async () => {
    const collapse = await createFixture(testElement);
    const toggle = collapse.querySelector("pfe-collapse-toggle");
    const panel = collapse.querySelector("pfe-collapse-panel");

    // Add a listener for the vent
    const listener = oneEvent(collapse, "pfe-collapse-panel:animation-start");

    toggle.click();

    const { detail } = await listener;
    assert.deepEqual(detail, {
      state: "opening",
      panel: panel
    });
  });

  it("should fire a pfe-collapse-panel:animation-end event when the panel has finished expanding or collapsing", async () => {
    const collapse = await createFixture(testElement);
    const toggle = collapse.querySelector("pfe-collapse-toggle");
    const panel = collapse.querySelector("pfe-collapse-panel");

    // Add a listener for the vent
    const listener = oneEvent(collapse, "pfe-collapse-panel:animation-end");

    toggle.click();

    const { detail } = await listener;
    assert.deepEqual(detail, {
      expanded: true,
      panel: panel
    });
  });

  it("should be able to be controlled without a pfe-collapse-toggle", async () => {
    const panel = await createFixture(`<pfe-collapse-panel>Panel</pfe-collapse-panel>`);
    panel.expanded = true;

    assert.isTrue(panel.hasAttribute("expanded"));
    panel.expanded = false;
    
    assert.isNotTrue(panel.hasAttribute("expanded"));
  });
});
