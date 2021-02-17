import PfeContentSet from "../src/pfe-content-set";

suite('<pfe-content-set>', () => {
  test('it should have the proper attributes for tabs', done => {
    const pfeContentSet = document.querySelector("#default");

    Promise.all([customElements.whenDefined(PfeContentSet.tag)]).then(() => {
      const pfeTabs = pfeContentSet.tabs; // shadowRoot.querySelector("pfe-tabs");

      const firstHeader = pfeTabs.querySelector("pfe-tab:nth-child(1)");
      assert.isTrue(firstHeader.hasAttribute("aria-controls"));
      assert.isTrue(firstHeader.hasAttribute('aria-controls'));
      assert.equal(firstHeader.getAttribute('tabindex'), '0');
      assert.equal(firstHeader.getAttribute('aria-selected'), 'true');

      const thirdHeader = pfeTabs.querySelector("pfe-tab:nth-child(5)");
      assert.isTrue(thirdHeader.hasAttribute('aria-controls'));
      assert.equal(thirdHeader.getAttribute('tabindex'), '-1');
      assert.equal(thirdHeader.getAttribute('aria-selected'), 'false');

      const panel = pfeTabs.querySelector("pfe-tab-panel");
      assert.isTrue(panel.hasAttribute("aria-labelledby"));

      done();
    });
  });

  test('it should be an accordion', done => {
    const pfeContentSet = document.querySelector('#wind');

    Promise.all([customElements.whenDefined(PfeContentSet.tag)]).then(() => {
      const pfeAccordion = pfeContentSet.accordion;  // shadowRoot.querySelector("pfe-tabs");

      const firstHeader = pfeAccordion.querySelector('pfe-accordion-header:nth-of-type(1)');
      assert.isTrue(firstHeader.hasAttribute('aria-controls'));

      const thirdHeader = pfeAccordion.querySelector('pfe-accordion-header:nth-of-type(3)');
      assert.isTrue(thirdHeader.hasAttribute('aria-controls'));

      const firstPanel = pfeAccordion.querySelector("pfe-accordion-panel:nth-of-type(2)");
      assert.isTrue(firstPanel.hasAttribute('aria-labelledby'));

      const secondPanel = pfeAccordion.querySelector('pfe-accordion-panel:nth-of-type(2)');
      assert.isTrue(secondPanel.hasAttribute('aria-labelledby'));

      done();
    });
  });

  test('it should have tabs', done => {
    const pfeContentSet = document.querySelector('#earth');

    Promise.all([customElements.whenDefined(PfeContentSet.tag)]).then(() => {
      const pfeTabs = pfeContentSet.tabs;
      assert.equal(pfeTabs.getAttribute('variant'), 'earth');

      const firstHeader = pfeTabs.querySelector('pfe-tab:nth-of-type(1)');
      assert.equal(firstHeader.getAttribute('tabindex'), '0');
      assert.equal(firstHeader.getAttribute('aria-selected'), 'true');

      const secondHeader = pfeTabs.querySelector('pfe-tab:nth-of-type(2)');
      assert.equal(secondHeader.getAttribute('aria-selected'), 'false');

      const fifthHeader = pfeTabs.querySelector('pfe-tab:nth-of-type(5)');
      assert.isTrue(fifthHeader.hasAttribute('aria-controls'));
      assert.equal(fifthHeader.getAttribute('tabindex'), '-1');

      done();
    });
  });

  test('it should have vertical tabs', done => {
    const pfeContentSet = document.querySelector('#earth-vertical');

    Promise.all([customElements.whenDefined(PfeContentSet.tag)]).then(() => {
      const pfeTabs = pfeContentSet.tabs;
      assert.isTrue(pfeTabs.hasAttribute('vertical'));
      assert.equal(pfeTabs.getAttribute('variant'), 'earth');

      const firstHeader = pfeTabs.querySelector('pfe-tab:nth-child(1)');
      assert.equal(firstHeader.getAttribute('tabindex'), '0');
      assert.equal(firstHeader.getAttribute('aria-selected'), 'true');

      const secondHeader = pfeTabs.querySelector('pfe-tab:nth-child(3)');
      assert.equal(secondHeader.getAttribute('aria-selected'), 'false');

      done();
    });
  });

  test("it should properly initialize any dynamically added headers and panels", done => {
    const pfeContentSetTabs = document.querySelector("#dynamicTabs");
    const pfeContentSetAccordion = document.querySelector("#dynamicAccordion");
    const documentFragment = document.createDocumentFragment();

    var newHeader = document.createElement("h2");
    newHeader.setAttribute("pfe-content-set--header", true);
    newHeader.id = "newHeader";
    newHeader.textContent = "New heading";

    var newPanel = document.createElement("div");
    newPanel.setAttribute("pfe-content-set--panel", true);
    newPanel.setAttribute("pfe-id", "newPanel");
    newPanel.textContent = "New panel";

    documentFragment.appendChild(newHeader);
    documentFragment.appendChild(newPanel);

    const tabsDocumentFragment = documentFragment.cloneNode(true);
    const accordionDocumentFragment = documentFragment.cloneNode(true);

    pfeContentSetTabs.appendChild(tabsDocumentFragment);
    pfeContentSetAccordion.appendChild(accordionDocumentFragment);

    flush(() => {
      Promise.all([customElements.whenDefined(PfeContentSet.tag)]).then(() => {
        const pfeTabs = pfeContentSetTabs.tabs;
        assert.isNotNull(pfeTabs.querySelector(`#newHeader`));
        assert.isNotNull(pfeTabs.querySelector(`#newPanel`));

        const pfeAccordion = pfeContentSetAccordion.accordion;
        assert.isNotNull(pfeAccordion.querySelector(`#newHeader`));
        assert.isNotNull(pfeAccordion.querySelector(`#newPanel`));

        done();
      });
    });
  });

  test("it should set tab-align on the tabs if the align attribute is present on pfe-content-set",
    done => {
      // @TODO: this test is flaky in React. It fails on the first run
      // but is successful on subsequent runs. 
      if (window.React) return;

      const pfeContentSet = document.querySelector("#align");
      const alignValue = pfeContentSet.getAttribute("align");

      Promise.all([customElements.whenDefined(PfeContentSet.tag)]).then(() => {
        const pfeTabs = pfeContentSet.tabs;
        const pfeTabAlignValue = pfeTabs.getAttribute("tab-align");

        assert.equal(alignValue, pfeTabAlignValue);
        done();
      });
    });

  test(
    "it should put content into an accordion if the breakpoint attribute is present and greater than the width of pfe-content-set parent",
    done => {
      const pfeContentSet = document.querySelector("#accordionBreakpoint");
      assert.isTrue(pfeContentSet.hasAttribute("breakpoint"));

      Promise.all([customElements.whenDefined(PfeContentSet.tag)]).then(() => {
        const pfeAccordion = pfeContentSet.accordion;
        assert.isNotNull(pfeAccordion);

        done();
      });
    });

  test(
    "it should put content into tabs if the breakpoint attribute is present and less than the width of pfe-content-set parent",
    done => {
      const pfeContentSet = document.querySelector("#tabsBreakpoint");
      assert.isTrue(pfeContentSet.hasAttribute("breakpoint"));

      Promise.all([customElements.whenDefined(PfeContentSet.tag)]).then(() => {
        const pfeTabs = pfeContentSet.tabs;
        assert.isNotNull(pfeTabs);

        done();
      });

    });

  test(
    "it should upgrade successfully with nested accordions",
    done => {
      const pfeContentSet = document.querySelector("#nested-accordion");

      Promise.all([customElements.whenDefined(PfeContentSet.tag)]).then(() => {
        const firstChild = pfeContentSet.tabs;
        assert.isNotNull(firstChild);
        assert.equal(firstChild.tagName, "PFE-TABS");

        const pfeAccordion = firstChild.querySelector("pfe-tab-panel").children[0];
        assert.equal(pfeAccordion.tagName, "PFE-ACCORDION");
        assert.isFalse(pfeAccordion.hasAttribute("hidden"));

        done();
      });
    });

  test(
    "it should upgrade successfully with nested tabs",
    done => {
      const pfeContentSet = document.querySelector("#nested-tabs");

      Promise.all([customElements.whenDefined(PfeContentSet.tag)]).then(() => {
        const firstChild = pfeContentSet.tabs;
        assert.isNotNull(firstChild);
        assert.equal(firstChild.tagName, "PFE-TABS");

        const pfeTabs = firstChild.querySelector("pfe-tab-panel").children[0];
        assert.equal(pfeTabs.tagName, "PFE-TABS");
        assert.isFalse(pfeTabs.hasAttribute("hidden"));

        done();
      });
    });

  test("it should set the correct \"on\" attribute from a parent component that has a color attribute",
    done => {
      const band = document.querySelector("#band");
      const contentSet = band.querySelector("pfe-content-set");
      assert.equal(contentSet.getAttribute("on"), "dark");

      const accordionBand = document.querySelector("#accordionBand");
      const accordionContentSet = accordionBand.querySelector("pfe-content-set");
      assert.equal(accordionContentSet.getAttribute("on"), "dark");

      Promise.all([customElements.whenDefined(PfeContentSet.tag)]).then(() => {
        const tabs = contentSet.tabs;
        const tab = tabs.querySelector("pfe-tab");
        const panel = tabs.querySelector("pfe-tab-panel");

        const accordion = accordionContentSet.accordion;
        const accordionHeader = accordion.querySelector("pfe-accordion-header");
        const accordionPanel = accordion.querySelector("pfe-accordion-panel");

        [contentSet, tabs, tab, panel, accordionContentSet, accordion, accordionHeader, accordionPanel].forEach(region => {
          assert.equal(region.getAttribute("on"), "dark");  
        });

        band.removeAttribute("color");
        accordionBand.removeAttribute("color");

        flush(() => {
          [contentSet, tabs, tab, panel, accordionContentSet, accordion, accordionHeader, accordionPanel].forEach(region => {
            assert.equal(region.getAttribute("on"), "light");  
          });
  
          done();
        });

      });
    });
});

suite("<pfe-content-set> with history", () => {
  test(
    "it should add ids to pfe-tabs, pfe-tab, and pfe-tab-panel if pfe-id attributes are set on pfe-content-set, pfe-content-set--header, and pfe-content-set--panel",
    done => {
      const pfeContentSet = document.querySelector('#my-content-set');
      const header = pfeContentSet.querySelector("[pfe-content-set--header]");
      const content = pfeContentSet.querySelector("[pfe-content-set--panel]");

      Promise.all([customElements.whenDefined(PfeContentSet.tag)]).then(() => {
        const tabs = pfeContentSet.tabs;
        const tab1 = tabs.querySelector("pfe-tab");
        const panel1 = tabs.querySelector("pfe-tab-panel");

        assert.equal(pfeContentSet.id, tabs.id);
        assert.equal(header.id, tab1.id);
        assert.equal(content.id, panel1.id);

        done();
      });
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

        Promise.all([customElements.whenDefined(PfeContentSet.tag)]).then(() => {
          const tabs = contentSet.shadowRoot.querySelector(`#fromQueryString`);
          const tab2 = tabs.querySelector(`#fromQueryStringTab2`);
          assert.equal(tabs.selectedIndex, 1);
          assert.isTrue(tab2.hasAttribute("aria-selected"));

          document.body.removeChild(contentSet);
          done();
        });
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
        const tabs = contentSet.shadowRoot.querySelector(`#fromQueryString`);
        const tab1 = tabs.querySelector(`#tab1`);
        assert.equal(tabs.selectedIndex, 0);
        assert.isTrue(tab1.hasAttribute("aria-selected"));

        document.body.removeChild(contentSet);
        done();
      });
    });

  test(
    "if pfe-content-set displays as tabs, it should update the URL on tab selection if the tab-history attribute is present",
    done => {
      const contentSet = document.querySelector(`#my-content-set-history`);
      const tabs = contentSet.shadowRoot.querySelector(`#my-content-set-history`);
      const tab2 = tabs.querySelector(`#historyTab2`);

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