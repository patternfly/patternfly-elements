suite('<pfe-accordion>', () => {
  test('it should upgrade pfe-accordion', () => {
    assert.instanceOf(document.querySelector('pfe-accordion'), customElements.get("pfe-accordion"), 'pfe-accordion should be an instance of PfeAccordion');
  });

  test('it should upgrade pfe-accordion-header', () => {
    assert.instanceOf(document.querySelector('pfe-accordion-header'), customElements.get("pfe-accordion-header"), 'pfe-accordion-header should be an instance of PfeAccordionHeader');
  });

  test('it should upgrade pfe-accordion-panel', () => {
    assert.instanceOf(document.querySelector('pfe-accordion-panel'), customElements.get("pfe-accordion-panel"), 'pfe-accordion-panel should be an instance of PfeAccordionPanel');
  });

  test('it should add the proper attributes to the accordion, headers, and panels', () => {
    const pfeAccordion = document.querySelector('pfe-accordion');
    const header = pfeAccordion.querySelector('pfe-accordion-header');
    const panel = pfeAccordion.querySelector('pfe-accordion-panel');

    assert.isTrue(header.hasAttribute('aria-controls'));
    assert.isTrue(panel.hasAttribute('aria-labelledby'));
    assert.equal(panel.getAttribute('role'), 'region');
    assert.equal(header.id, panel.getAttribute('aria-labelledby'));
    assert.equal(panel.id, header.getAttribute('aria-controls'));
  });

  test('it should expand a panel when a header is selected', () => {
    const pfeAccordion = document.querySelector('pfe-accordion');
    const header = pfeAccordion.querySelector('pfe-accordion-header');
    const panel = pfeAccordion.querySelector('pfe-accordion-panel');

    header.click();

    assert.isTrue(header.getAttribute('aria-expanded') == "true");
    assert.equal(true, header.expanded);
    assert.isTrue(panel.hasAttribute('expanded'));
    assert.isTrue(panel.expanded);

    // reset
    header.click();
  });

  test('it should collapse a panel when an already expanded header is selected', () => {
    const pfeAccordion = document.querySelector('pfe-accordion');
    const header = pfeAccordion.querySelector('pfe-accordion-header');
    const panel = pfeAccordion.querySelector('pfe-accordion-panel');

    // expand the first panel
    header.click();

    // close it
    header.click();

    assert.isTrue(header.getAttribute('aria-expanded') == "false");
    assert.equal(false, header.expanded);
    assert.isFalse(panel.hasAttribute('expanded'));
    assert.isFalse(panel.expanded);
  });

  test('it should use the ids that are provided instead of generating new ones', () => {
    const pfeAccordion = document.querySelector('pfe-accordion');
    const firstHeader = pfeAccordion.querySelector('pfe-accordion-header');
    const firstPanel = pfeAccordion.querySelector('pfe-accordion-panel');

    assert.equal(firstHeader.id, "header1");
    assert.equal(firstPanel.id, "panel1");
  });

  test('it should toggle a panel when toggle is called', () => {
    const pfeAccordion = document.querySelector('pfe-accordion');
    const secondHeader = pfeAccordion.querySelector('pfe-accordion-header:nth-of-type(2)');
    const secondPanel = pfeAccordion.querySelector('pfe-accordion-panel:nth-of-type(2)');

    pfeAccordion.toggle(1);

    assert.isTrue(secondHeader.getAttribute('aria-expanded') == "true");
    assert.equal(true, secondHeader.expanded);
    assert.isTrue(secondPanel.hasAttribute('expanded'));
    assert.isTrue(secondPanel.expanded);

    pfeAccordion.toggle(1);

    assert.isTrue(secondHeader.getAttribute('aria-expanded') == "false");
    assert.equal(false, secondHeader.expanded);
    assert.isFalse(secondPanel.hasAttribute('expanded'));
    assert.isFalse(secondPanel.expanded);
  });

  test('it should expand a panel when expand is called', () => {
    const pfeAccordion = document.querySelector('pfe-accordion');
    const secondHeader = pfeAccordion.querySelector('pfe-accordion-header:nth-of-type(2)');
    const secondPanel = pfeAccordion.querySelector('pfe-accordion-panel:nth-of-type(2)');

    pfeAccordion.expand(1);
    pfeAccordion.collapse(1);

    assert.isTrue(secondHeader.getAttribute('aria-expanded') == "false");
    assert.equal(false, secondHeader.expanded);
    assert.isFalse(secondPanel.hasAttribute('expanded'));
    assert.isFalse(secondPanel.expanded);
  });

  test('it should collapse a panel when collapse is called', () => {
    const pfeAccordion = document.querySelector('pfe-accordion');
    const secondHeader = pfeAccordion.querySelector('pfe-accordion-header:nth-of-type(2)');
    const secondPanel = pfeAccordion.querySelector('pfe-accordion-panel:nth-of-type(2)');

    pfeAccordion.expand(1);


    assert.isTrue(secondHeader.getAttribute('aria-expanded') == "true");
    assert.equal(true, secondHeader.expanded);
    assert.isTrue(secondPanel.hasAttribute('expanded'));
    assert.isTrue(secondPanel.expanded);

    pfeAccordion.collapseAll();
  });

  test('it should expand all panels when expandAll is called', () => {
    const pfeAccordion = document.querySelector('pfe-accordion');
    const headers = [...pfeAccordion.querySelectorAll('pfe-accordion-header')];
    const panels = [...pfeAccordion.querySelectorAll('pfe-accordion-panel')];

    pfeAccordion.expandAll();

    headers.forEach(header => {
      assert.isTrue(header.getAttribute('aria-expanded') == "true");
      assert.equal(true, header.expanded);
    });

    panels.forEach(panel => {
      assert.isTrue(panel.hasAttribute('expanded'));
      assert.isTrue(panel.expanded);
    });

    pfeAccordion.collapseAll();
  });

  test('it should collapse all panels when collapseAll is called', () => {
    const pfeAccordion = document.querySelector('pfe-accordion');
    const headers = [...pfeAccordion.querySelectorAll('pfe-accordion-header')];
    const panels = [...pfeAccordion.querySelectorAll('pfe-accordion-panel')];

    pfeAccordion.expandAll();
    pfeAccordion.collapseAll();

    headers.forEach(header => {
      assert.isTrue(header.getAttribute('aria-expanded') == "false");
      assert.equal(false, header.expanded);
    });

    panels.forEach(panel => {
      assert.isFalse(panel.hasAttribute('expanded'));
      assert.isFalse(panel.expanded);
    });
  });

  test('it should fire a pfe-accordion-change event when a header is clicked', () => {
    const pfeAccordion = document.querySelector('pfe-accordion');
    const header = pfeAccordion.querySelector('pfe-accordion-header');
    const handlerSpy = sinon.spy();

    document.addEventListener('pfe-accordion:change', handlerSpy);

    header.click();

    const [event] = handlerSpy.getCall(0).args;

    sinon.assert.calledOnce(handlerSpy);
    assert.isTrue(event.detail.expanded);

    // reset
    document.removeEventListener('pfe-accordion:change', handlerSpy);
    header.click();
  });

  test.skip('it should add a warning in the console if a pfe-accordion-header lightdom is not a heading level tag', () => {
    const spy = sinon.spy(console, 'warn');

    document.body.innerHTML += `
      <pfe-accordion id="badHeader">
        <pfe-accordion-header id="bad-header-element">
          Bad Header
        </pfe-accordion-header>
        <pfe-accordion-panel>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </pfe-accordion-panel>
      </pfe-accordion>`;

    sinon.assert.calledWith(spy, '[pfe-accordion-header#bad-header-element]: The first child in the light DOM must be a Header level tag (h1, h2, h3, h4, h5, or h6)');
    // We need to restore the session spy session to prevent infinite loop issue introduced in this PR
    // https://github.com/patternfly/patternfly-elements/pull/1475
    spy.restore();
  });

  test('it should render as disclosure if there is only one header in an accordion', () => {
    const pfeAccordion = document.querySelector('#dynamic');
    const headers = [...pfeAccordion.querySelectorAll('pfe-accordion-header')];
    const panels = [...pfeAccordion.querySelectorAll('pfe-accordion-panel')];

    assert.isTrue(headers.length == 1);
    assert.isTrue(panels.length == 1);

    headers.forEach(header => {
      assert.equal(header.getAttribute('disclosure'), 'true');
    });

    panels.forEach(panel => {
      assert.equal(panel.getAttribute('disclosure'), 'true');
    });
  });

  test("it should not render as a disclosure if the disclosure attribute is set to false and there is only one header", () => {
    const pfeAccordion = document.querySelector("#dont-disclosure-me");
    const header = pfeAccordion.querySelector("pfe-accordion-header");
    const panel = pfeAccordion.querySelector("pfe-accordion-panel");

    assert.equal(header.getAttribute("disclosure"), "false");
    assert.equal(panel.getAttribute("disclosure"), "false");
  });

  test("it should switch from an accordion to a disclosure if the disclosure attribute switches from false to true", () => {
    const pfeAccordion = document.querySelector("#dont-disclosure-me");
    const header = pfeAccordion.querySelector("pfe-accordion-header");
    const panel = pfeAccordion.querySelector("pfe-accordion-panel");

    pfeAccordion.setAttribute("disclosure", "true");

    assert.equal(header.getAttribute("disclosure"), "true");
    assert.equal(panel.getAttribute("disclosure"), "true");
  });

  test("it should switch to a disclosure if an accordion loses children and only one header is left", done => {
    const pfeAccordion = document.querySelector("#should-become-a-disclosure");

    assert.isFalse(pfeAccordion.hasAttribute("disclosure"));

    const elementsToRemove = [...pfeAccordion.querySelectorAll("pfe-accordion-header:last-of-type, pfe-accordion-panel:last-of-type")];
    elementsToRemove.forEach(element => pfeAccordion.removeChild(element));

    flush(() => {
      const header = pfeAccordion.querySelector("pfe-accordion-header");
      const panel = pfeAccordion.querySelector("pfe-accordion-panel");

      assert.equal(pfeAccordion.getAttribute("disclosure"), "true");
      assert.equal(header.getAttribute("disclosure"), "true");
      assert.equal(panel.getAttribute("disclosure"), "true");
      done();
    });
  });

  test("it should switch to an accordion from a disclosure if the accordion gains more than one header", done => {
    const pfeAccordion = document.querySelector("#should-switch-to-accordion");
    const fragment = document.createDocumentFragment();

    assert.equal(pfeAccordion.getAttribute("disclosure"), "true");

    const newHeader = document.createElement("pfe-accordion-header");
    newHeader.innerHTML = `<h2>New Header</h2>`;

    const newPanel = document.createElement("pfe-accordion-panel");
    newPanel.innerHTML = `New Panel`;

    fragment.appendChild(newHeader);
    fragment.appendChild(newPanel);

    pfeAccordion.appendChild(fragment);

    flush(() => {
      assert.isTrue(pfeAccordion.getAttribute("disclosure") == "false");
      done();
    });
  });

  test('it should properly initialize any dynamically added headers and panels', done => {
    const pfeAccordion = document.querySelector('#dynamic');
    const documentFragment = document.createDocumentFragment();

    const newHeader = document.createElement("pfe-accordion-header");
    newHeader.id = "newHeader";
    newHeader.innerHTML = `<h2>New Header</h2>`;

    const newPanel = document.createElement("pfe-accordion-panel");
    newPanel.id = "newPanel";
    newPanel.innerHTML = `New Panel`;

    documentFragment.appendChild(newHeader);
    documentFragment.appendChild(newPanel);

    pfeAccordion.appendChild(documentFragment);

    flush(() => {
      const newHeaderElement = document.querySelector("#newHeader");
      const newPanelElement = document.querySelector("#newPanel");

      assert.isTrue(newHeaderElement.hasAttribute("id"));
      assert.isTrue(newHeaderElement.hasAttribute("aria-controls"));
      assert.equal(newHeaderElement.getAttribute("aria-controls"), newPanelElement.getAttribute("id"));

      assert.equal(newPanelElement.getAttribute("role"), "region");
      assert.isTrue(newPanelElement.hasAttribute("id"));
      assert.isTrue(newPanelElement.hasAttribute("aria-labelledby"));
      assert.equal(newPanelElement.getAttribute("aria-labelledby"), newHeaderElement.getAttribute("id"));

      done();
    });
  });
});