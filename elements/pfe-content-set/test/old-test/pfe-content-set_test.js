suite('<pfe-content-set>', () => {
  test('it should have the proper attributes for tabs', () => {
    const pfeContentSet = document.querySelector("#default");
    const pfeTabs = pfeContentSet.shadowRoot.querySelector("pfe-tabs");
    const firstHeader = pfeTabs.querySelector("pfe-tab:nth-child(1)");
    const thirdHeader = pfeTabs.querySelector("pfe-tab:nth-child(5)");
    const panel = pfeTabs.querySelector("pfe-tab-panel");

    assert.isTrue(panel.hasAttribute("aria-labelledby"));
    assert.isTrue(firstHeader.hasAttribute("aria-controls"));
    assert.isTrue(firstHeader.hasAttribute('aria-controls'));
    assert.equal(firstHeader.getAttribute('tabindex'), '0');
    assert.equal(firstHeader.getAttribute('aria-selected'), 'true');
    assert.isTrue(thirdHeader.hasAttribute('aria-controls'));
    assert.equal(thirdHeader.getAttribute('tabindex'), '-1');
    assert.equal(thirdHeader.getAttribute('aria-selected'), 'false');
  });

  test('it should be a light accordion', () => {
    const pfeContentSet = document.querySelector("#wind");
    const pfeAccordion = pfeContentSet.shadowRoot.querySelector("pfe-accordion");
    const firstHeader = pfeAccordion.querySelector('pfe-accordion-header:nth-child(1)');
    const thirdHeader = pfeAccordion.querySelector('pfe-accordion-header:nth-child(5)');
    const firstPanel = pfeAccordion.querySelector("pfe-accordion-panel:nth-child(2)");
    const secondPanel = pfeAccordion.querySelector('pfe-accordion-panel:nth-child(4)');

    assert.isTrue(firstHeader.hasAttribute('aria-controls'));
    assert.isTrue(thirdHeader.hasAttribute('aria-controls'));
    assert.isTrue(firstPanel.hasAttribute('aria-labelledby'));
    assert.isTrue(secondPanel.hasAttribute('aria-labelledby'));
  });

  test('it should have dark tabs', () => {
    const pfeContentSet = document.querySelector("#earth");
    const pfeTabs = pfeContentSet.shadowRoot.querySelector("pfe-tabs");
    const firstHeader = pfeTabs.querySelector('pfe-tab:nth-child(1)');
    const secondHeader = pfeTabs.querySelector('pfe-tab:nth-child(3)');
    const fifthHeader = pfeTabs.querySelector('pfe-tab:nth-child(9)');

    assert.equal(pfeTabs.getAttribute('variant'), 'earth');
    assert.equal(firstHeader.getAttribute('tabindex'), '0');
    assert.equal(firstHeader.getAttribute('aria-selected'), 'true');
    assert.equal(secondHeader.getAttribute('aria-selected'), 'false');
    assert.isTrue(fifthHeader.hasAttribute('aria-controls'));
    assert.equal(fifthHeader.getAttribute('tabindex'), '-1');
  });

  test('it should have vertical tabs', () => {
    const pfeContentSet = document.querySelector("#earth-vertical");
    const pfeTabs = pfeContentSet.shadowRoot.querySelector("pfe-tabs");
    const firstHeader = pfeTabs.querySelector('pfe-tab:nth-child(1)');
    const secondHeader = pfeTabs.querySelector('pfe-tab:nth-child(3)');
    
    assert.isTrue(pfeTabs.hasAttribute('vertical'));
    assert.equal(pfeTabs.getAttribute('variant'), 'earth');
    assert.equal(firstHeader.getAttribute('tabindex'), '0');
    assert.equal(firstHeader.getAttribute('aria-selected'), 'true');
    assert.equal(secondHeader.getAttribute('aria-selected'), 'false');
  });

  test("it should properly initialize any dynamically added headers and panels", done => {
    const pfeContentSetTabs = document.querySelector("#dynamicTabs");
    const pfeContentSetAccordion = document.querySelector("#dynamicAccordion");
    const documentFragment = document.createDocumentFragment();

    var newHeader = document.createElement("h2");
    newHeader.setAttribute("pfe-content-set--header", true);
    newHeader.setAttribute("pfe-id", "newHeader");
    newHeader.textContent = "New Heading";

    var newPanel = document.createElement("div");
    newPanel.setAttribute("pfe-content-set--panel", true);
    newPanel.setAttribute("pfe-id", "newPanel");
    newPanel.textContent = "New Panel";

    documentFragment.appendChild(newHeader);
    documentFragment.appendChild(newPanel);

    const tabsDocumentFragment = documentFragment.cloneNode(true);
    const accordionDocumentFragment = documentFragment.cloneNode(true);

    pfeContentSetTabs.appendChild(tabsDocumentFragment);
    pfeContentSetAccordion.appendChild(accordionDocumentFragment);

    flush(() => {
      const pfeTabs = pfeContentSetTabs.shadowRoot.querySelector("pfe-tabs");
      const pfeAccordion = pfeContentSetAccordion.shadowRoot.querySelector("pfe-accordion");

      assert.isNotNull(pfeTabs.querySelector('[id="newHeader"]'));
      assert.isNotNull(pfeTabs.querySelector('[id="newPanel"]'));
      assert.isNotNull(pfeAccordion.querySelector('[pfe-id="newHeader"]'));
      assert.isNotNull(pfeAccordion.querySelector('[pfe-id="newPanel"]'));

      done();
    });
  });

  test("it should set pfe-tab-align on the tabs if the pfe-align attribute is present on pfe-content-set",
    () => {
      // @TODO: this test is flaky in React. It fails on the first run
      // but is successful on subsequent runs. 
      if (window.React) {
        return;
      }

      const pfeContentSet = document.querySelector("#align");
      const pfeTabs = pfeContentSet.shadowRoot.querySelector(":scope > pfe-tabs");
      const alignValue = pfeContentSet.getAttribute("pfe-align");
      const pfeTabAlignValue = pfeTabs.getAttribute("tab-align");

      assert.equal(alignValue, pfeTabAlignValue);
    });

  test(
    "it should put content into an accordion if the pfe-breakpoint attribute is present and greater than the width of pfe-content-set parent",
    () => {
      const pfeContentSet = document.querySelector("#accordionBreakpoint");
      const pfeAccordion = pfeContentSet.shadowRoot.querySelector("pfe-accordion");

      assert.isTrue(pfeContentSet.hasAttribute("pfe-breakpoint"));
      assert.isNotNull(pfeAccordion);
    });

  test(
    "it should put content into tabs if the pfe-breakpoint attribute is present and less than the width of pfe-content-set parent",
    () => {
      const pfeContentSet = document.querySelector("#tabsBreakpoint");
      const pfeTabs = pfeContentSet.shadowRoot.querySelector("pfe-tabs");

      assert.isTrue(pfeContentSet.hasAttribute("pfe-breakpoint"));
      assert.isNotNull(pfeTabs);

    });

  test(
    "it should upgrade successfully with nested accordions",
    () => {
      const pfeContentSet = document.querySelector("#nested-accordion");
      const firstChild = pfeContentSet.shadowRoot.querySelector(":scope > pfe-tabs");
      const pfeAccordion = firstChild.querySelector("pfe-tab-panel").children[0];

      assert.isNotNull(firstChild);
      assert.equal(firstChild.tagName, "PFE-TABS");
      assert.equal(pfeAccordion.tagName, "PFE-ACCORDION");
    });

  test(
    "it should upgrade successfully with nested tabs",
    () => {
      const pfeContentSet = document.querySelector("#nested-tabs");
      const firstChild = pfeContentSet.shadowRoot.querySelector(":scope > pfe-tabs");
      const pfeTabs = firstChild.querySelector("pfe-tab-panel").children[0];

      assert.isNotNull(firstChild);
      assert.equal(firstChild.tagName, "PFE-TABS");
      assert.equal(pfeTabs.tagName, "PFE-TABS");
    });

  test("it should set the correct \"on\" attribute from a parent component that has a pfe-color attribute",
    done => {
      const band = document.querySelector("#band");
      const contentSet = band.querySelector("pfe-content-set");
      const tabs = contentSet.shadowRoot.querySelector("pfe-tabs");
      const tab = tabs.querySelector("pfe-tab");
      const panel = tabs.querySelector("pfe-tab-panel");

      assert.equal(contentSet.getAttribute("on"), "dark");
      assert.equal(tabs.getAttribute("on"), "dark")
      assert.equal(tab.getAttribute("on"), "dark");
      assert.equal(panel.getAttribute("on"), "dark");

      const accordionBand = document.querySelector("#accordionBand");
      const accordionContentSet = accordionBand.querySelector("pfe-content-set");
      const accordion = accordionContentSet.shadowRoot.querySelector("pfe-accordion");
      const accordionHeader = accordion.querySelector("pfe-accordion-header");
      const accordionPanel = accordion.querySelector("pfe-accordion-panel");

      assert.equal(accordionContentSet.getAttribute("on"), "dark");
      assert.equal(accordion.getAttribute("on"), "dark");
      assert.equal(accordionHeader.getAttribute("on"), "dark");
      assert.equal(accordionPanel.getAttribute("on"), "dark");

      band.removeAttribute("pfe-color");
      accordionBand.removeAttribute("pfe-color");

      flush(() => {
        assert.equal(contentSet.getAttribute("on"), "light");
        assert.equal(tabs.getAttribute("on"), "light")
        assert.equal(tab.getAttribute("on"), "light");
        assert.equal(panel.getAttribute("on"), "light");

        assert.equal(accordionContentSet.getAttribute("on"), "light");
        assert.equal(accordion.getAttribute("on"), "light");
        assert.equal(accordionHeader.getAttribute("on"), "light");
        assert.equal(accordionPanel.getAttribute("on"), "light");

        done();
      });
    });
});

suite("<pfe-content-set> with history", () => {
  test(
    "it should add ids to pfe-tabs, pfe-tab, and pfe-tab-panel if pfe-id attributes are set on pfe-content-set, pfe-content-set--header, and pfe-content-set--panel",
    () => {
      const pfeContentSet = document.querySelector('#my-content-set');
      const header = pfeContentSet.querySelector("[pfe-content-set--header]");
      const content = pfeContentSet.querySelector("[pfe-content-set--panel]");

      const tabs = pfeContentSet.shadowRoot.querySelector("pfe-tabs");
      const tab1 = tabs.querySelector("pfe-tab");
      const panel1 = tabs.querySelector("pfe-tab-panel");

      assert.equal(pfeContentSet.id, tabs.id);
      assert.equal(header.id, tab1.id);
      assert.equal(content.id, panel1.id);
    });

  test(
    "if pfe-content-set displays as tabs, it should show the correct tab if there is a querystring parameter in the URL",
    done => {
      // the parameter should be equal to the id of the tabset
      // the value should be equal to the id of the tab you want opened
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set("fromQueryString", "fromQueryStringTab2");
      var newPath = window.location.pathname + '?' + searchParams.toString();
      history.pushState(null, '', newPath);

      const fragment = document.createRange().createContextualFragment(`
        <pfe-content-set id="fromQueryString">
          <h2 pfe-content-set--header id="tab1">Tab 1</h2>
          <p pfe-content-set--panel>Panel 1</p>
          <h2 pfe-content-set--header id="fromQueryStringTab2">Tab 2</h2>
          <p pfe-content-set--panel>Panel 2</p>
        </pfe-content-set>
      `);

      document.body.appendChild(fragment);

      flush(() => {
        const contentSet = document.querySelector('#fromQueryString');
        const tabs = contentSet.shadowRoot.querySelector('#fromQueryString');
        const tab2 = tabs.querySelector('#fromQueryStringTab2');
        assert.equal(tabs.selectedIndex, 1);
        assert.isTrue(tab2.hasAttribute("aria-selected"));

        document.body.removeChild(contentSet);
        done();
      });
    });

  test(
    "if pfe-content-set displays as tabs, it should open the first tab if the querystring in the URL doesn't match the id of any of the tabs",
    done => {
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set("fromQueryString", "iDontExist");
      var newPath = window.location.pathname + '?' + searchParams.toString();
      history.pushState(null, '', newPath);

      const fragment = document.createRange().createContextualFragment(`
        <pfe-content-set id="fromQueryString">
          <h2 pfe-content-set--header id="tab1">Tab 1</h2>
          <p pfe-content-set--panel>Panel 1</p>
          <h2 pfe-content-set--header id="fromQueryStringTab2">Tab 2</h2>
          <p pfe-content-set--panel>Panel 2</p>
        </pfe-content-set>
      `);

      document.body.appendChild(fragment);

      flush(() => {
        const contentSet = document.querySelector("#fromQueryString");
        const tabs = contentSet.shadowRoot.querySelector('#fromQueryString');
        const tab1 = tabs.querySelector('#tab1');
        assert.equal(tabs.selectedIndex, 0);
        assert.isTrue(tab1.hasAttribute("aria-selected"));

        document.body.removeChild(contentSet);
        done();
      });
    });

  test(
    "if pfe-content-set displays as tabs, it should update the URL on tab selection if the pfe-tab-history attribute is present",
    done => {
      const contentSet = document.querySelector('#my-content-set-history')
      const tabs = contentSet.shadowRoot.querySelector('#my-content-set-history');
      const tab2 = tabs.querySelector('#historyTab2');

      tab2.click();

      flush(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        assert.equal(urlSearchParams.get("my-content-set-history"), "historyTab2");
        assert.equal(tabs.selectedIndex, 1);
        assert.isTrue(tab2.hasAttribute("aria-selected"));
        done();
      });
    });
});