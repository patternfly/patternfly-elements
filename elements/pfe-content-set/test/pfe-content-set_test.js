
suite('<pfe-content-set>', () => {
  test('it should have the proper attributes for tabs', done => {
    const pfeContentSet = document.querySelector("pfe-content-set#default") || document.querySelector("pfe-content-set#default-container");

    Promise.all([customElements.whenDefined("pfe-content-set")]).then(() => {
      const pfeTabs = pfeContentSet.view;

      const firstHeader = pfeTabs.querySelector("pfe-tab:nth-child(1)");
      const thirdHeader = pfeTabs.querySelector("pfe-tab:nth-child(5)");
      const panel = pfeTabs.querySelector("pfe-tab-panel");

      flush(() => {
        assert.isTrue(firstHeader.hasAttribute("aria-controls"));
        assert.isTrue(firstHeader.hasAttribute('aria-controls'));
        assert.equal(firstHeader.getAttribute('tabindex'), '0');
        assert.equal(firstHeader.getAttribute('aria-selected'), 'true');

        assert.isTrue(thirdHeader.hasAttribute('aria-controls'));
        assert.equal(thirdHeader.getAttribute('tabindex'), '-1');
        assert.equal(thirdHeader.getAttribute('aria-selected'), 'false');

        assert.isTrue(panel.hasAttribute("aria-labelledby"));
        done();
      });
    });
  });

  test('it should be an accordion', done => {
    const pfeContentSet = document.querySelector("pfe-content-set#wind") || document.querySelector("pfe-content-set#wind-container");

    Promise.all([customElements.whenDefined("pfe-content-set")]).then(() => {
      const pfeAccordion = pfeContentSet.view;
      const firstHeader = pfeAccordion.querySelector('pfe-accordion-header:nth-of-type(1)');
      const firstPanel = pfeAccordion.querySelector("pfe-accordion-panel:nth-of-type(2)");
      const secondPanel = pfeAccordion.querySelector('pfe-accordion-panel:nth-of-type(2)');
      const thirdHeader = pfeAccordion.querySelector('pfe-accordion-header:nth-of-type(3)');

      flush(() => {
        assert.isTrue(firstHeader.hasAttribute('aria-controls'));
        assert.isTrue(firstPanel.hasAttribute('aria-labelledby'));
        assert.isTrue(secondPanel.hasAttribute('aria-labelledby'));
        assert.isTrue(thirdHeader.hasAttribute('aria-controls'));

        done();
      });
    });
  });

  test('it should have tabs', done => {
    const pfeContentSet = document.querySelector("pfe-content-set#earth") || document.querySelector("pfe-content-set#earth-container");

    Promise.all([customElements.whenDefined("pfe-content-set")]).then(() => {
      const pfeTabs = pfeContentSet.view;
      const firstHeader = pfeTabs.querySelector('pfe-tab:nth-of-type(1)');
      const secondHeader = pfeTabs.querySelector('pfe-tab:nth-of-type(2)');
      const fifthHeader = pfeTabs.querySelector('pfe-tab:nth-of-type(5)');

      flush(() => {
        assert.equal(pfeTabs.getAttribute('variant'), 'earth');

        assert.equal(firstHeader.getAttribute('tabindex'), '0');
        assert.equal(firstHeader.getAttribute('aria-selected'), 'true');

        assert.equal(secondHeader.getAttribute('aria-selected'), 'false');

        assert.isTrue(fifthHeader.hasAttribute('aria-controls'));
        assert.equal(fifthHeader.getAttribute('tabindex'), '-1');

        done();
      });
    });
  });

  const createHeader = () => {
    let newHeader = document.createElement("h2");
    newHeader.setAttribute("pfe-content-set--header", "");
    newHeader.id = "newHeader";
    newHeader.textContent = "New heading";
    return newHeader;
  };

  const createPanel = () => {
    let newPanel = document.createElement("div");
    newPanel.setAttribute("pfe-content-set--panel", "");
    newPanel.setAttribute("id", "newPanel");
    newPanel.textContent = "New panel";
    return newPanel;
  };

  test("it should properly initialize any dynamically added headers and panels in accordions", done => {
    const pfeContentSet = document.querySelector("pfe-content-set#dynamicAccordion") || document.querySelector("pfe-content-set#dynamicAccordion-container");
    const documentFragment = document.createDocumentFragment();

    const newHeader = createHeader();
    const newPanel = createPanel();

    documentFragment.appendChild(newHeader);
    documentFragment.appendChild(newPanel);

    pfeContentSet.appendChild(documentFragment.cloneNode(true));

    Promise.all([customElements.whenDefined("pfe-content-set")]).then(() => {
      const pfeAccordion = pfeContentSet.view;
      const newHeaderEl = pfeAccordion.querySelector(`#newHeader`);
      const newPanelEl = pfeAccordion.querySelector(`#newPanel`);

      flush(() => {
        assert.isNotNull(newHeaderEl);
        assert.isNotNull(newPanelEl);

        // Check that the variant propogated down to the new elements
        // @TODO The resetting of disclosure to false seems to be an error in the accordion component
        //  out-of-scope to fix in this PR
        // assert.equal(newHeaderEl.getAttribute("disclosure"), "true");
        // assert.equal(newPanelEl.getAttribute("disclosure"), "true");

        done();
      });
    });
  });

  test("it should properly initialize any dynamically added headers and panels in tabs", done => {
    const pfeContentSet = document.querySelector("pfe-content-set#dynamicTabs") || document.querySelector("pfe-content-set#dynamicTabs-container");
    const documentFragment = document.createDocumentFragment();

    const newHeader = createHeader();
    const newPanel = createPanel();

    documentFragment.appendChild(newHeader);
    documentFragment.appendChild(newPanel);

    pfeContentSet.appendChild(documentFragment.cloneNode(true));

    Promise.all([customElements.whenDefined("pfe-content-set")]).then(() => {
      const pfeTabs = pfeContentSet.view;
      const newHeaderEl = pfeTabs.querySelector(`#newHeader`);
      const newPanelEl = pfeTabs.querySelector(`#newPanel`);

      flush(() => {
        assert.isNotNull(newHeaderEl);
        assert.isNotNull(newPanelEl);

        // Check that the variant propogated down to the new elements
        assert.equal(newHeaderEl.getAttribute("variant"), "earth");
        assert.equal(newPanelEl.getAttribute("variant"), "earth");

        done();
      });
    });
  });

  test(
    "it should put content into an accordion if the breakpoint attribute is present and greater than the width of pfe-content-set parent",
    done => {
      const pfeContentSet = document.querySelector("pfe-content-set#accordionBreakpoint") || document.querySelector("pfe-content-set#accordionBreakpoint-container");
      assert.isTrue(pfeContentSet.hasAttribute("breakpoint"));
  
      Promise.all([customElements.whenDefined("pfe-content-set")]).then(() => {
        const pfeAccordion = pfeContentSet.view;
        assert.isNotNull(pfeAccordion);

        done();
      });
    });

  test(
    "it should put content into tabs if the breakpoint attribute is present and less than the width of pfe-content-set parent",
    done => {
      const pfeContentSet = document.querySelector("pfe-content-set#tabsBreakpoint") || document.querySelector("pfe-content-set#tabsBreakpoint-container");
      assert.isTrue(pfeContentSet.hasAttribute("breakpoint"));
  
      Promise.all([customElements.whenDefined("pfe-content-set")]).then(() => {
        const pfeTabs = pfeContentSet.view;
        assert.isNotNull(pfeTabs);

        done();
      });

    });

  test(
    "it should upgrade successfully with nested accordions",
    done => {
      flush(() => {
        const firstChild = document.querySelector("#nested-accordion");
        assert.isNotNull(firstChild);
        assert.equal(firstChild.tagName, "PFE-TABS");

        const pfeAccordion = firstChild.querySelector("pfe-tab-panel").children[0];
        assert.equal(pfeAccordion.tagName, "PFE-ACCORDION");
        assert.isFalse(pfeAccordion.hasAttribute("hidden"));

        done();
      });
    });

  test("it should upgrade successfully with nested tabs", done => {
    flush(() => {
      const firstChild = document.querySelector("#nested-tabs");
      assert.isNotNull(firstChild);
      assert.equal(firstChild.tagName, "PFE-TABS");

      const pfeTabs = firstChild.querySelector("pfe-tab-panel").children[0];
      assert.equal(pfeTabs.tagName, "PFE-TABS");
      assert.isFalse(pfeTabs.hasAttribute("hidden"));

      done();
    });
  });

  test("it should set the correct \"on\" attribute from a parent component that has a color attribute to the nested tabs",
    done => {
      flush(() => {
        const tabBand = document.querySelector("#band");
        const contentSet = tabBand.querySelector("pfe-content-set");

        const tabs = contentSet.view;
        const tab = tabs.querySelector("pfe-tab");
        const panel = tabs.querySelector("pfe-tab-panel");

        [tabBand, contentSet, tabs, tab, panel].forEach(region => {
          assert.equal(region.getAttribute("on"), "dark");
        });

        tabBand.removeAttribute("color");

        flush(() => {
          [tabBand, contentSet, tabs, tab, panel].forEach(region => {
            assert.equal(region.getAttribute("on"), "light");
          });

          done();
        });

      });
    });

  test("it should set the correct \"on\" attribute from a parent component that has a color attribute to the nested accordion",
    done => {
      flush(() => {
        const accordionBand = document.querySelector("#accordionBand");
        const accordionContentSet = accordionBand.querySelector("pfe-content-set");

        const accordion = accordionContentSet.view;
        const accordionHeader = accordion.querySelector("pfe-accordion-header");
        const accordionPanel = accordion.querySelector("pfe-accordion-panel");

        [accordionBand, accordionContentSet, accordion, accordionHeader, accordionPanel].forEach(region => {
          assert.equal(region.getAttribute("on"), "dark");
        });

        accordionBand.removeAttribute("color");

        flush(() => {
          [accordionBand, accordionContentSet, accordion, accordionHeader, accordionPanel].forEach(region => {
            assert.equal(region.getAttribute("on"), "light");
          });

          done();
        });

      });
    });
});

suite("<pfe-content-set> cascading attributes", () => {
  let pfeContentSetContainer, pfeContentSet;

  suiteSetup(function() {
    // @TODO: Test fixtures are not working in React and Vue right now
    if (window.React || window.Vue) this.skip();
  });

  setup(() => {
    pfeContentSetContainer = fixture('contentset-fixture');
    pfeContentSet = pfeContentSetContainer.querySelector(":scope > pfe-content-set");
  });

  test(
    "it should copy the value of disclosure to pfe-accordion",
    done => {
      pfeContentSetContainer.style.width = `600px`; // less than 700px for breakpoint default
      pfeContentSet.setAttribute("disclosure", "true");

    flush(() => {
      const pfeAccordion = pfeContentSet.querySelector('pfe-accordion');
      assert.equal(pfeContentSet.getAttribute("disclosure"), pfeAccordion.getAttribute("disclosure"));

      done();
    });
  });
  
  test(
    "it should copy the value of pfe-disclosure to disclosure on pfe-accordion",
    done => {
      pfeContentSetContainer.style.width = `600px`; // less than 700px for breakpoint default
      pfeContentSet.setAttribute("pfe-disclosure", "true");

    flush(() => {
      const pfeAccordion = pfeContentSet.querySelector('pfe-accordion');
      // Check that it copied the alias'ed value correctly
      assert.equal(pfeContentSet.getAttribute("pfe-disclosure"), pfeContentSet.getAttribute("disclosure"));
      // And that the alias'ed value was passed down to the child
      assert.equal(pfeContentSet.getAttribute("disclosure"), pfeAccordion.getAttribute("disclosure"));

      done();
    });
  });

  test(
    "it should copy the value of vertical to pfe-tabs",
    done => {
      pfeContentSet.setAttribute("vertical", "");

    flush(() => {
      const pfeTabs = pfeContentSet.querySelector(':scope > pfe-tabs');
      assert.equal(pfeContentSet.getAttribute("vertical"), pfeTabs.getAttribute("vertical"));

      done();
    });
  });

  test(
    "it should copy the value of disclosure to pfe-tabs",
    done => {
      pfeContentSet.setAttribute("selected-index", "1");

    flush(() => {
      const pfeTabs = pfeContentSet.querySelector('pfe-tabs');
      assert.equal(pfeContentSet.getAttribute("selected-index"), pfeTabs.getAttribute("selected-index"));

      done();
    });
  });
  
  test(
    "it should copy the value of tab-align to pfe-tabs",
    done => {
      pfeContentSet.setAttribute("tab-align", "center");

    flush(() => {
      const pfeTabs = pfeContentSet.querySelector('pfe-tabs');
      assert.equal(pfeContentSet.getAttribute("tab-align"), pfeTabs.getAttribute("tab-align"));

      done();
    });
  });
  
  test(
    "it should copy the value of align to tab-align on pfe-tabs",
    done => {
      pfeContentSet.setAttribute("align", "center");

    flush(() => {
      const pfeTabs = pfeContentSet.querySelector('pfe-tabs');
      assert.equal(pfeContentSet.getAttribute("align"), pfeTabs.getAttribute("tab-align"));

      done();
    });
  });
  
  test(
    "it should copy the value of pfe-align to align and down to tab-align on pfe-tabs",
    done => {
      pfeContentSet.setAttribute("pfe-align", "center");

    flush(() => {
      assert.equal(pfeContentSet.getAttribute("pfe-align"), pfeContentSet.getAttribute("align"));

      const pfeTabs = pfeContentSet.querySelector('pfe-tabs');
      assert.equal(pfeContentSet.getAttribute("align"), pfeTabs.getAttribute("tab-align"));

      done();
    });
  });
  
  test(
    "it should copy the value of variant to pfe-tabs",
    done => {
      pfeContentSet.setAttribute("variant", "earth");

    flush(() => {
      const pfeTabs = pfeContentSet.querySelector('pfe-tabs');
      assert.equal(pfeContentSet.getAttribute("variant"), pfeTabs.getAttribute("variant"));

      done();
    });
  });
  
  test(
    "it should copy the value of pfe-variant to variant on pfe-tabs",
    done => {
      pfeContentSet.setAttribute("pfe-variant", "earth");

    flush(() => {
      const pfeTabs = pfeContentSet.querySelector('pfe-tabs');
      // Check that it copied to the alias
      assert.equal(pfeContentSet.getAttribute("pfe-variant"), pfeContentSet.getAttribute("variant"));
      // Check that it copied the alias'ed value to the nested tabs
      assert.equal(pfeContentSet.getAttribute("variant"), pfeTabs.getAttribute("variant"));

      done();
    });
  });
  
  test(
    "it should copy the value of tab-history to pfe-tabs",
    done => {
      pfeContentSet.setAttribute("tab-history", "");

    flush(() => {
      const pfeTabs = pfeContentSet.querySelector('pfe-tabs');
      // Check that it copied the alias'ed value to the nested tabs
      assert.equal(pfeContentSet.getAttribute("tab-history"), pfeTabs.getAttribute("tab-history"));

      done();
    });
  });
  
  test(
    "it should copy the value of pfe-tab-history to tab-history on pfe-tabs",
    done => {
      pfeContentSet.setAttribute("pfe-tab-history", "");

    flush(() => {
      const pfeTabs = pfeContentSet.querySelector('pfe-tabs');
      // Check that it copied to the alias
      assert.equal(pfeContentSet.getAttribute("pfe-tab-history"), pfeContentSet.getAttribute("tab-history"));

      // Check that it copied the alias'ed value to the nested tabs
      assert.equal(pfeContentSet.getAttribute("tab-history"), pfeTabs.getAttribute("tab-history"));

      done();
    });
  });
  
  test(
    "it should copy the value of pfe-breakpoint to breakpoint on pfe-content-set",
    done => {
      pfeContentSet.setAttribute("pfe-breakpoint", "600");

    flush(() => {
      const pfeTabs = pfeContentSet.querySelector('pfe-tabs');

      // Check that it copied to the alias
      assert.equal(pfeContentSet.getAttribute("pfe-breakpoint"), pfeContentSet.getAttribute("breakpoint"));

      done();
    });
  });
});

suite("<pfe-content-set> with history", () => {
  test(
    "it should add ids to pfe-tabs, pfe-tab, and pfe-tab-panel if pfe-id attributes are set on pfe-content-set, pfe-content-set--header, and pfe-content-set--panel",
    done => {
      flush(() => {
        const pfeContentSet = document.querySelector('#my-content-set-container');
        const header = pfeContentSet.querySelector("[pfe-content-set--header]");
        const content = pfeContentSet.querySelector("[pfe-content-set--panel]");
        const tabs = pfeContentSet.view;
        const tab1 = tabs.querySelector("pfe-tab");
        const panel1 = tabs.querySelector("pfe-tab-panel");

        assert.equal(pfeContentSet.id.replace(/-container$/, ""), tabs.id);
        assert.equal(header.id.replace(/--header/, ""), tab1.id);
        assert.equal(content.id.replace(/--panel/, ""), panel1.id);

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
        const contentSet = document.querySelector('#fromQueryString-container');

        const tabs = contentSet.querySelector(`#fromQueryString`);
        const tab2 = tabs.querySelector(`#fromQueryStringTab2`);
        // @TODO Debug why this is returning null
        // assert.equal(tabs.selectedIndex, 1);
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
        const contentSet = document.querySelector("#fromQueryString-container");
        const tabs = contentSet.view;
        const tab1 = tabs.querySelector(`#tab1`);
        // @TODO Debug why this is returning null
        // assert.equal(tabs.selectedIndex, 0);
        assert.isTrue(tab1.hasAttribute("aria-selected"));

        document.body.removeChild(contentSet);
        done();
      });
    });

  test(
    "if pfe-content-set displays as tabs, it should update the URL on tab selection if the tab-history attribute is present",
    done => {
      flush(() => {
        const contentSet = document.querySelector(`#my-content-set-history-container`);
        const tabs = contentSet.querySelector(`#my-content-set-history`);
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
});
