suite('<pfe-accordion>', () => {
  test('it should add the proper attributes to the accordion, headers, and panels', () => {
    const pfeAccordion = document.querySelector('pfe-accordion');
    const header = pfeAccordion.querySelector('pfe-accordion-header');
    const panel = pfeAccordion.querySelector('pfe-accordion-panel');

    assert.isTrue(header.hasAttribute('aria-controls'));
    assert.isTrue(panel.hasAttribute('aria-labelledby'));
    assert.equal(panel.getAttribute('role'), 'region');
    // assert.equal(header.pfeId, panel.getAttribute('aria-labelledby'));
    // assert.equal(panel.pfeId, header.getAttribute('aria-controls'));
  });

  test('it should expand a panel when a header is selected', () => {
    const pfeAccordion = document.querySelector('pfe-accordion');
    const header = pfeAccordion.querySelector('pfe-accordion-header');
    const panel = pfeAccordion.querySelector('pfe-accordion-panel');

    header.click();

    assert.equal('true', header.getAttribute('aria-expanded'));
    assert.isTrue(panel.hasAttribute('expanded'));
    assert.isTrue(header.expanded);
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

    assert.equal(header.getAttribute('aria-expanded'), "false");
    assert.isNotTrue(panel.hasAttribute('expanded'));
    assert.isNotTrue(header.expanded);
    assert.isNotTrue(panel.expanded);
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

    assert.isTrue(secondHeader.expanded);
    assert.isTrue(secondPanel.expanded);
    assert.equal('true', secondHeader.getAttribute('aria-expanded'));
    assert.isTrue(secondPanel.hasAttribute('expanded'));

    pfeAccordion.toggle(1);

    assert.isNotTrue(secondHeader.expanded);
    assert.isNotTrue(secondPanel.expanded);
    assert.equal('false', secondHeader.getAttribute('aria-expanded'));
    assert.isNotTrue(secondPanel.hasAttribute('expanded'));
  });

  test('it should expand a panel when expand is called', () => {
    const pfeAccordion = document.querySelector('pfe-accordion');
    const secondHeader = pfeAccordion.querySelector('pfe-accordion-header:nth-of-type(2)');
    const secondPanel = pfeAccordion.querySelector('pfe-accordion-panel:nth-of-type(2)');

    pfeAccordion.expand(1);
    pfeAccordion.collapse(1);

    assert.isNotTrue(secondHeader.expanded);
    assert.isNotTrue(secondPanel.expanded);
    assert.equal('false', secondHeader.getAttribute('aria-expanded'));
    assert.isNotTrue(secondPanel.hasAttribute('expanded'));
  });

  test('it should collapse a panel when collapse is called', () => {
    const pfeAccordion = document.querySelector('pfe-accordion');
    const secondHeader = pfeAccordion.querySelector('pfe-accordion-header:nth-of-type(2)');
    const secondPanel = pfeAccordion.querySelector('pfe-accordion-panel:nth-of-type(2)');

    pfeAccordion.expand(1);


    assert.isTrue(secondHeader.expanded);
    assert.isTrue(secondPanel.expanded);
    assert.equal('true', secondHeader.getAttribute('aria-expanded'));
    assert.isTrue(secondPanel.hasAttribute('expanded'));

    pfeAccordion.collapseAll();
  });

  test('it should expand all panels when expandAll is called', () => {
    const pfeAccordion = document.querySelector('pfe-accordion');
    const headers = [...pfeAccordion.querySelectorAll('pfe-accordion-header')];
    const panels = [...pfeAccordion.querySelectorAll('pfe-accordion-panel')];

    pfeAccordion.expandAll();

    headers.forEach(header => {
      assert.isTrue(header.expanded);
      assert.isTrue(header.hasAttribute('aria-expanded'));
    });

    panels.forEach(panel => {
      assert.isTrue(panel.expanded);
      assert.isTrue(panel.hasAttribute('expanded'));
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
      assert.isNotTrue(header.expanded);
      assert.equal('false', header.getAttribute('aria-expanded'));
    });

    panels.forEach(panel => {
      assert.isNotTrue(panel.expanded);
      assert.isNotTrue(panel.hasAttribute('expanded'));
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

  test("it should not render as a disclosure if the pfe-disclosure attribute is set to false and there is only one header", done => {
    const pfeAccordion = document.querySelector("#dont-disclosure-me");
    const header = pfeAccordion.querySelector("pfe-accordion-header");
    const panel = pfeAccordion.querySelector("pfe-accordion-panel");

    flush(() => {
      assert.equal(header.getAttribute("disclosure"), "false");
      assert.equal(panel.getAttribute("disclosure"), "false");
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

      assert.isTrue(newHeaderElement.hasAttribute("aria-controls"));
      assert.equal(newHeaderElement.getAttribute("aria-controls"), newPanelElement.id);

      assert.equal(newPanelElement.getAttribute("role"), "region");
      assert.isTrue(newPanelElement.hasAttribute("aria-labelledby"));
      assert.equal(newPanelElement.getAttribute("aria-labelledby"), newHeaderElement.id);

      done();
    });
  });
});