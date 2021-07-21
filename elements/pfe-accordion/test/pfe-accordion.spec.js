// Import testing helpers. For more information check out:
// https://open-wc.org/docs/testing/helpers/
import { assert, aTimeout, oneEvent } from '@open-wc/testing/index-no-side-effects.js';
// import { spy, assert as sinonAssert } from 'sinon';

// Import our custom fixture wrapper. This allows us to run tests
// in React and Vue as well as a normal fixture.
import { createFixture } from '../../../test/utils/create-fixture.js';

// Import the element we're testing.
import '../dist/pfe-accordion';

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const testElement = `
<pfe-accordion>
  <pfe-accordion-header id="header1">
    <h3>Consetetur sadipscing elitr?</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel id="panel1">
    <p><a href="#">Lorem ipsum dolor sit amet</a>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
  </pfe-accordion-panel>
  <pfe-accordion-header>
    <h3>Labore et dolore magna aliquyam erat?</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p><a href="#">Lorem ipsum dolor sit amet</a>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
  </pfe-accordion-panel>
</pfe-accordion>
   `;

describe("<pfe-accordion>", () => {
  it('should upgrade pfe-accordion', async () => {
    const pfeAccordion = await createFixture(testElement);
    assert.instanceOf(pfeAccordion, customElements.get("pfe-accordion"), 'pfe-accordion should be an instance of PfeAccordion');
  });

  it('should expand a panel when a header is selected', async () => {
    const pfeAccordion = await createFixture(testElement);
    const header = pfeAccordion.querySelector("pfe-accordion-header");
    const panel = pfeAccordion.querySelector("pfe-accordion-panel");

    header.click();

    assert.isTrue(header.button.getAttribute('aria-expanded') == "true");
    assert.equal(true, header.expanded);
    assert.isTrue(panel.hasAttribute('expanded'));
    assert.isTrue(panel.expanded);
  });

  it('should collapse a panel when an already expanded header is selected', async () => {
    const pfeAccordion = await createFixture(testElement);
    const header = pfeAccordion.querySelector("pfe-accordion-header");
    const panel = pfeAccordion.querySelector("pfe-accordion-panel");

    // expand the first panel
    header.click();

    // close it
    header.click();

    assert.isTrue(header.button.getAttribute('aria-expanded') == "false");
    assert.equal(false, header.expanded);
    assert.isFalse(panel.hasAttribute('expanded'));
    assert.isFalse(panel.expanded);
  });

  it('should randomly generate ids for aria use', async () => {
    const pfeAccordion = await createFixture(testElement);
    const header = pfeAccordion.querySelector("pfe-accordion-header:nth-of-type(2)");
    const panel = pfeAccordion.querySelector("pfe-accordion-panel:nth-of-type(2)");

    assert.match(header.id, /pfe-/);
    assert.match(panel.id, /pfe-/);
  });

  it('should use the ids that are provided instead of generating new ones', async () => {
    const pfeAccordion = await createFixture(testElement);
    const header = pfeAccordion.querySelector("pfe-accordion-header");
    const panel = pfeAccordion.querySelector("pfe-accordion-panel");

    assert.equal(header.id, "header1");
    assert.equal(panel.id, "panel1");
  });

  /* API TESTS */
  it('should toggle a panel when toggle is called', async () => {
    const pfeAccordion = await createFixture(testElement);
    const secondHeader = pfeAccordion.querySelector("pfe-accordion-header:nth-of-type(2)");
    const secondPanel = pfeAccordion.querySelector("pfe-accordion-panel:nth-of-type(2)");

    pfeAccordion.toggle(1);

    assert.isTrue(secondHeader.button.getAttribute('aria-expanded') == "true");
    assert.equal(true, secondHeader.expanded);
    assert.isTrue(secondPanel.hasAttribute('expanded'));
    assert.isTrue(secondPanel.expanded);

    pfeAccordion.toggle(1);

    assert.isTrue(secondHeader.button.getAttribute('aria-expanded') == "false");
    assert.equal(false, secondHeader.expanded);
    assert.isFalse(secondPanel.hasAttribute('expanded'));
    assert.isFalse(secondPanel.expanded);
  });

  it('should expand a panel when expand is called', async () => {
    const pfeAccordion = await createFixture(testElement);
    const secondHeader = pfeAccordion.querySelector('pfe-accordion-header:nth-of-type(2)');
    const secondPanel = pfeAccordion.querySelector('pfe-accordion-panel:nth-of-type(2)');

    pfeAccordion.expand(1);

    assert.isTrue(secondHeader.button.getAttribute('aria-expanded') == "true");
    assert.equal(true, secondHeader.expanded);
    assert.isTrue(secondPanel.hasAttribute('expanded'));
    assert.isTrue(secondPanel.expanded);
  });

  it('should collapse a panel when collapse is called', async () => {
    const pfeAccordion = await createFixture(testElement);
    const secondHeader = pfeAccordion.querySelector('pfe-accordion-header:nth-of-type(2)');
    const secondPanel = pfeAccordion.querySelector('pfe-accordion-panel:nth-of-type(2)');

    pfeAccordion.expand(1);
    pfeAccordion.collapse(1);

    assert.isTrue(secondHeader.button.getAttribute('aria-expanded') == "false");
    assert.equal(false, secondHeader.expanded);
    assert.isFalse(secondPanel.hasAttribute('expanded'));
    assert.isFalse(secondPanel.expanded);
  });

  it('should expand all panels when expandAll is called', async () => {
    const pfeAccordion = await createFixture(testElement);
    const headers = [...pfeAccordion.querySelectorAll('pfe-accordion-header')];
    const panels = [...pfeAccordion.querySelectorAll('pfe-accordion-panel')];

    pfeAccordion.expandAll();

    headers.forEach(header => {
      assert.isTrue(header.button.getAttribute('aria-expanded') == "true");
      assert.equal(true, header.expanded);
    });

    panels.forEach(panel => {
      assert.isTrue(panel.hasAttribute('expanded'));
      assert.isTrue(panel.expanded);
    });
  });

  it('should collapse all panels when collapseAll is called', async () => {
    const pfeAccordion = await createFixture(testElement);
    const headers = [...pfeAccordion.querySelectorAll('pfe-accordion-header')];
    const panels = [...pfeAccordion.querySelectorAll('pfe-accordion-panel')];

    pfeAccordion.expandAll();
    pfeAccordion.collapseAll();

    headers.forEach(header => {
      assert.isTrue(header.button.getAttribute('aria-expanded') == "false");
      assert.equal(false, header.expanded);
    });

    panels.forEach(panel => {
      assert.isFalse(panel.hasAttribute('expanded'));
      assert.isFalse(panel.expanded);
    });
  });

  /* EVENT TESTS */
  it('should fire a pfe-accordion:change event when a header is clicked', async () => {
    const pfeAccordion = await createFixture(testElement);
    const header = pfeAccordion.querySelector('pfe-accordion-header');
    const panel = pfeAccordion.querySelector('pfe-accordion-panel');
    
    setTimeout(() => header.click(), 100);

    const { detail } = await oneEvent(pfeAccordion, "pfe-accordion:change");

    assert.deepEqual(detail, {
      expanded: true,
      toggle: header,
      panel: panel
    });
  });

  /* CONSOLE VALIDATION */
  // it.skip('should add a warning in the console if a pfe-accordion-header lightdom is not a heading level tag', async () => {
  //   const spy = spy(console, 'warn');
  //   const pfeAccordion = await createFixture(`
  //   <pfe-accordion id="badHeader">
  //     <pfe-accordion-header id="bad-header-element">
  //       Bad Header
  //     </pfe-accordion-header>
  //     <pfe-accordion-panel>
  //       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  //     </pfe-accordion-panel>
  //   </pfe-accordion>`);

  //   sinonAssert.calledWith(spy, '[pfe-accordion-header#bad-header-element]", "The first child in the light DOM must be a Header level tag (h1, h2, h3, h4, h5, or h6)');

  //   // We need to restore the session spy session to prevent infinite loop issue introduced in this PR
  //   // https://github.com/patternfly/patternfly-elements/pull/1475
  //   spy.restore();
  // });

  /* ATTRIBUTE TESTS */
  it('should open the items listed in the expanded-index attribute', async () => {
    const pfeAccordion = await createFixture(`
    <pfe-accordion expanded-index="2, 3">
      <pfe-accordion-header id="header1">
        <h3>Consetetur sadipscing elitr?</h3>
      </pfe-accordion-header>
      <pfe-accordion-panel id="panel1">
        <p><a href="#">Lorem ipsum dolor sit amet</a>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
      </pfe-accordion-panel>
      <pfe-accordion-header id="header2">
        <h3>Labore et dolore magna aliquyam erat?</h3>
      </pfe-accordion-header>
      <pfe-accordion-panel id="panel2">
        <p><a href="#">Lorem ipsum dolor sit amet</a>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
      </pfe-accordion-panel>
      <pfe-accordion-header id="header3">
        <h3>Velit esse velit deserunt nisi aute?</h3>
      </pfe-accordion-header>
      <pfe-accordion-panel id="panel3">
        <p>Incididunt id nulla adipisicing in cupidatat irure sint laboris. Quis ex aute proident eiusmod aliquip veniam. Minim ad ullamco magna do nostrud anim in velit esse duis do ea. Mollit consectetur consectetur cillum aute officia fugiat.</p>
      </pfe-accordion-panel>
    </pfe-accordion>`);
    
    [2, 3].forEach((idx) => {
      const header = pfeAccordion.querySelector(`pfe-accordion-header:nth-of-type(${idx})`);
      const panel = pfeAccordion.querySelector(`pfe-accordion-panel:nth-of-type(${idx})`);

      assert.isTrue(header.expanded);
      assert.isTrue(header.hasAttribute("expanded"));
      assert.isTrue(panel.expanded);
      assert.isTrue(panel.hasAttribute("expanded"));
      assert.equal(header.id, `header${idx}`);
      assert.equal(panel.id, `panel${idx}`);
    });
  });

  /* DISCLOSURE TESTS */
  it('should render as disclosure if there is only one header in an accordion', async () => {
    const pfeAccordion = await createFixture(`
  <pfe-accordion>
    <pfe-accordion-header>
      <h2>Header</h2>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      Panel
    </pfe-accordion-panel>
  </pfe-accordion>`);

    const headers = [...pfeAccordion.querySelectorAll('pfe-accordion-header')];
    const panels = [...pfeAccordion.querySelectorAll('pfe-accordion-panel')];

    assert.equal(headers.length, 1);
    assert.equal(panels.length, 1);
    
    await aTimeout(20);

    assert.equal(headers[0].getAttribute('disclosure'), 'true');
    assert.equal(panels[0].getAttribute('disclosure'), 'true');
  });

  // it("should not render as a disclosure if the disclosure attribute is set to false and there is only one header", async () => {
  //   const pfeAccordion = await createFixture(`
  //   <pfe-accordion disclosure="false">
  //     <pfe-accordion-header>
  //       <h2>Header</h2>
  //     </pfe-accordion-header>
  //     <pfe-accordion-panel>
  //       Panel
  //     </pfe-accordion-panel>
  //   </pfe-accordion>`);

  //   const header = pfeAccordion.querySelector("pfe-accordion-header");
  //   const panel = pfeAccordion.querySelector("pfe-accordion-panel");

  //   setTimeout(() => {
  //     assert.equal(header.getAttribute("disclosure"), "false");
  //     assert.equal(panel.getAttribute("disclosure"), "false");
  //   }, 100);
  // });

  // it("should switch from an accordion to a disclosure if the disclosure attribute switches from false to true", async () => {
  //   const pfeAccordion = await createFixture(testElement);
  //   pfeAccordion.setAttribute("disclosure", "false");
    
  //   const header = pfeAccordion.querySelector("pfe-accordion-header");
  //   const panel = pfeAccordion.querySelector("pfe-accordion-panel");

  //   pfeAccordion.setAttribute("disclosure", "true");

  //   assert.equal(header.getAttribute("disclosure"), "true");
  //   assert.equal(panel.getAttribute("disclosure"), "true");
  // });

  // it("should switch to a disclosure if an accordion loses children and only one header is left", async () => {
  //   const pfeAccordion = await createFixture(testElement);

  //   const elementsToRemove = [...pfeAccordion.querySelectorAll("pfe-accordion-header:not(:first-of-type), pfe-accordion-panel:not(:first-of-type)")];
  //   elementsToRemove.forEach(element => pfeAccordion.removeChild(element));

  //   const header = pfeAccordion.querySelector("pfe-accordion-header");
  //   const panel = pfeAccordion.querySelector("pfe-accordion-panel");

  //   assert.equal(pfeAccordion.getAttribute("disclosure"), "true");
  //   assert.equal(header.getAttribute("disclosure"), "true");
  //   assert.equal(panel.getAttribute("disclosure"), "true");
  // });

  // it("should switch to an accordion from a disclosure if the accordion gains more than one header", async () => {
  //   const pfeAccordion = await createFixture(`
  // <pfe-accordion>
  //   <pfe-accordion-header>
  //     <h2>Header</h2>
  //   </pfe-accordion-header>
  //   <pfe-accordion-panel>Panel</pfe-accordion-panel>
  // </pfe-accordion>`);
  //   const fragment = document.createDocumentFragment();

  //   assert.equal(pfeAccordion.getAttribute("disclosure"), "true");

  //   const newHeader = document.createElement("pfe-accordion-header");
  //   newHeader.innerHTML = `<h2>New Header</h2>`;

  //   const newPanel = document.createElement("pfe-accordion-panel");
  //   newPanel.innerHTML = `New Panel`;

  //   fragment.appendChild(newHeader);
  //   fragment.appendChild(newPanel);

  //   pfeAccordion.appendChild(fragment);

  //   assert.isTrue(pfeAccordion.getAttribute("disclosure") == "false");
  // });

  // it('should properly initialize any dynamically added headers and panels', async () => {
  //   const pfeAccordion = await createFixture(testElement);
  //   const documentFragment = document.createDocumentFragment();

  //   const newHeader = document.createElement("pfe-accordion-header");
  //   newHeader.id = "newHeader";
  //   newHeader.innerHTML = `<h2>New Header</h2>`;

  //   const newPanel = document.createElement("pfe-accordion-panel");
  //   newPanel.id = "newPanel";
  //   newPanel.innerHTML = `New Panel`;

  //   documentFragment.appendChild(newHeader);
  //   documentFragment.appendChild(newPanel);

  //   pfeAccordion.appendChild(documentFragment);

  //   const newHeaderElement = document.querySelector("#newHeader");
  //   const newPanelElement = document.querySelector("#newPanel");

  //   assert.isTrue(newHeaderElement.hasAttribute("id"));
  //   assert.isTrue(newHeaderElement.hasAttribute("aria-controls"));
  //   assert.equal(newHeaderElement.getAttribute("aria-controls"), newPanelElement.getAttribute("id"));

  //   assert.equal(newPanelElement.getAttribute("role"), "region");
  //   assert.isTrue(newPanelElement.hasAttribute("id"));
  //   assert.isTrue(newPanelElement.hasAttribute("aria-labelledby"));
  //   assert.equal(newPanelElement.getAttribute("aria-labelledby"), newHeaderElement.getAttribute("id"));
  // });

  // @TODO: Write the following tests

  // Validate that the is-navigation attribute triggers spacebar events to open the accordion
  // Validate that the is-navigation attribute turns off the up/down arrow functionality
  // Validate that the is-direct-link attribute on an accordion header acts like a link on click
  // Validate that the is-direct-link attribute throws a warning if it doesn't contain a link
  // -> pfe-accordion-header: This component expects to find a link in the light DOM due to the "is-direct-link" attribute
});

// describe("<pfe-accordion-header>", () => {
//   it('should upgrade pfe-accordion-header', async () => {
//     const pfeAccordion = await createFixture(testElement);
//     const header = pfeAccordion.querySelector("pfe-accordion-header");
//     assert.instanceOf(header, customElements.get("pfe-accordion-header"), 'pfe-accordion-header should be an instance of PfeAccordionHeader');
//   });

//   it('should add the proper attributes to the headers', async () => {
//     const pfeAccordion = await createFixture(testElement);
//     const header = pfeAccordion.querySelector("pfe-accordion-header");
//     const panel = pfeAccordion.querySelector("pfe-accordion-panel");

//     assert.isTrue(header.hasAttribute('aria-controls'));
//     assert.equal(header.id, panel.getAttribute('aria-labelledby'));
//   });
// });

// describe("<pfe-accordion-panel>", () => {
//   it('should upgrade pfe-accordion-panel', async () => {
//     const pfeAccordion = await createFixture(testElement);
//     const panel = pfeAccordion.querySelector("pfe-accordion-panel");

//     assert.instanceOf(panel, customElements.get("pfe-accordion-panel"), 'pfe-accordion-panel should be an instance of PfeAccordionPanel');
//   });

//   it('should add the proper attributes to the panels', async () => {
//     const pfeAccordion = await createFixture(testElement);
//     const header = pfeAccordion.querySelector("pfe-accordion-header");
//     const panel = pfeAccordion.querySelector("pfe-accordion-panel");

//     assert.isTrue(panel.hasAttribute('aria-labelledby'));
//     assert.equal(panel.getAttribute('role'), 'region');
//     assert.equal(panel.id, header.getAttribute('aria-controls'));
//   });
// });
