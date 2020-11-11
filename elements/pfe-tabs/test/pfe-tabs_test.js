/* @TODO: Add focus-state tests to validate against document.activeElement */

suite("<pfe-tabs>", () => {
  setup(() => {
    const tabs = document.querySelector("#default");
    tabs.selectIndex(0);
  });

  test("it should add the proper attributes to the tabs and panels", () => {
    const tabs = document.querySelector("#default");
    const tab = tabs.querySelector("pfe-tab");
    const panel = tabs.querySelector("pfe-tab-panel");

    assert.isTrue(tab.hasAttribute("id"));
    assert.isTrue(panel.hasAttribute("id"));
    assert.equal(tabs.getAttribute("role"), "tablist");
    assert.equal(tab.getAttribute("role"), "tab");
    assert.isTrue(tab.hasAttribute("aria-selected"));
    assert.isTrue(tab.hasAttribute("aria-controls"));
    assert.equal(panel.getAttribute("role"), "tabpanel");
    assert.isTrue(panel.hasAttribute("aria-labelledby"));
    assert.equal(tab.id, panel.getAttribute("aria-labelledby"));
    assert.equal(tab.getAttribute("aria-controls"), panel.id);
  });

  test("it should add the proper attributes to the first tab", () => {
    const tabs = document.querySelector("#default");
    const tab = tabs.querySelector("pfe-tab");

    assert.equal(tab.getAttribute("tabindex"), "0");
    assert.equal(tab.getAttribute("aria-selected"), "true");
  });

  test("it should add the proper attributes to the second tab", () => {
    const tabs = document.querySelector("#default");
    const tab2 = tabs.querySelector("pfe-tab:nth-of-type(2)");

    assert.equal(tab2.getAttribute("tabindex"), "-1");
    assert.equal(tab2.getAttribute("aria-selected"), "false");
  });

  test("it should use the ids that are provided instead of generating new ones", () => {
    const tabs = document.querySelector("#withIds");
    const firstTab = tabs.querySelector("pfe-tab");
    const firstPanel = tabs.querySelector("pfe-tab-panel");

    assert.equal(firstTab.id, "tab1");
    assert.equal(firstPanel.id, "panel1");
  });

  test("it should open the first tab and panel by default", () => {
    const tabs = document.querySelector("#default");
    const firstTab = tabs.querySelector("pfe-tab");
    const firstPanel = tabs.querySelector("pfe-tab-panel");
    const secondTab = tabs.querySelector("pfe-tabs pfe-tab:nth-of-type(2)");
    const secondPanel = tabs.querySelector("pfe-tabs pfe-tab-panel:nth-of-type(2)");

    assert.equal(firstTab.getAttribute("aria-selected"), "true");
    assert.equal(!firstPanel.hasAttribute("hidden"), true);
    assert.equal(secondTab.getAttribute("aria-selected"), "false");
    assert.equal(secondPanel.hasAttribute("hidden"), true);
  });

  test("it should select a new tab when it is clicked on", done => {
    const tabs = document.querySelector("#default");
    const secondTab = tabs.querySelector("pfe-tab:nth-of-type(2)");
    const secondPanel = tabs.querySelector("pfe-tab-panel:nth-of-type(2)");

    secondTab.click();

    flush(() => {
      assert.equal(secondTab.getAttribute("aria-selected"), "true");
      assert.isTrue(!secondPanel.hasAttribute("hidden"));

      done();
    });
  });

  test("it should select a new tab when using the select method", done => {
    const tabs = document.querySelector("#default");
    const secondTab = tabs.querySelector("pfe-tab:nth-of-type(2)");
    const secondPanel = tabs.querySelector("pfe-tab-panel:nth-of-type(2)");

    tabs.select(secondTab);

    flush(() => {
      assert.equal(secondTab.getAttribute("aria-selected"), "true");
      assert.isTrue(!secondPanel.hasAttribute("hidden"));

      done();
    });
  });

  test("it should select a new tab when using the selectIndex method", () => {
    const tabs = document.querySelector("#default");
    const secondTab = tabs.querySelector("pfe-tab:nth-of-type(2)");
    const secondPanel = tabs.querySelector("pfe-tab-panel:nth-of-type(2)");

    tabs.selectIndex(1);

    assert.equal(secondTab.getAttribute("aria-selected"), "true");
    assert.isTrue(!secondPanel.hasAttribute("hidden"));
  });

  test("it should throw an error when passing a bad index value to the selectIndex method", () => {
    const tabs = document.querySelector("#default");
    const badIndex = 5;
    const spy = sinon.spy(console, "warn");

    tabs.selectIndex(badIndex);

    sinon.assert.calledWith(spy, `[pfe-tabs#default]: tab ${badIndex} does not exist`);
  });

  test("it should fire a pfe-tabs:hidden-tab event when a tab is closed", done => {
    const tabs = document.querySelector("#default");
    const firstTab = tabs.querySelector("pfe-tab");
    const handlerSpy = sinon.spy();

    document.addEventListener("pfe-tabs:hidden-tab", handlerSpy);

    flush(() => {
      tabs.selectIndex(1);
      const eventDetail = handlerSpy.getCall(0).args[0].detail;

      sinon.assert.calledOnce(handlerSpy);
      assert.equal(firstTab.pfeId, eventDetail.tab.pfeId);

      document.removeEventListener("pfe-tabs:hidden-tab", handlerSpy);
      done();
    });
  });

  test("it should fire a pfe-tabs:shown-tab event when a tab is opened", done => {
    const tabs = document.querySelector("#default");
    const secondTab = tabs.querySelector("pfe-tab:nth-of-type(2)");
    const handlerSpy = sinon.spy();

    document.addEventListener("pfe-tabs:shown-tab", handlerSpy);

    flush(() => {
      tabs.selectIndex(1);
      const eventDetail = handlerSpy.getCall(0).args[0].detail;

      sinon.assert.calledOnce(handlerSpy);
      assert.equal(secondTab.pfeId, eventDetail.tab.pfeId);

      document.removeEventListener("pfe-tabs:shown-tab", handlerSpy);
      done();
    });
  });

  test("it should set aria-orientation to vertical when the vertical attribute is present", () => {
    const tabs = document.querySelector("#verticalTabs");
    const ariaOrientationAttribute = tabs.getAttribute("aria-orientation");

    assert.equal(ariaOrientationAttribute, "vertical");
  });

  test("it should change aria-orientation to horizontal when the vertical attribute is removed", () => {
    const tabs = document.querySelector("#verticalTabs");
    tabs.removeAttribute("vertical");

    assert.equal(tabs.getAttribute("aria-orientation"), "horizontal");

    // reset for the next test
    tabs.setAttribute("vertical", "");
  });

  test("it should add a vertical attribute to each tab and panel if the tabs have a vertical attribute", () => {
    const tabs = document.querySelector("#verticalTabs");
    const allTabs = [...tabs.querySelectorAll("pfe-tab")];
    const allPanels = [...tabs.querySelectorAll("pfe-tab-panel")];

    allTabs.forEach(tab => assert.isTrue(tab.hasAttribute("vertical")));
    allPanels.forEach(panel => assert.isTrue(panel.hasAttribute("vertical")));
  });

  test(
    "it should remove the vertical attribute on each tab and panel if the tabs have the vertical attribute removed",
    () => {
      const tabs = document.querySelector("#verticalTabs");
      const allTabs = [...tabs.querySelectorAll("pfe-tab")];
      const allPanels = [...tabs.querySelectorAll("pfe-tab-panel")];

      tabs.removeAttribute("vertical");

      allTabs.forEach(tab => assert.isFalse(tab.hasAttribute("vertical")));
      allPanels.forEach(panel => assert.isFalse(panel.hasAttribute("vertical")));
    });

  test("it should open to the correct tab specified by the selected-index attribute", () => {
    const tabs = document.querySelector("#withSelectedIndexAttribute");
    const secondTab = tabs.querySelector("pfe-tabs pfe-tab:nth-of-type(2)");
    const secondPanel = tabs.querySelector("pfe-tabs pfe-tab-panel:nth-of-type(2)");

    assert.equal(secondTab.getAttribute("aria-selected"), "true");
    assert.isTrue(!secondPanel.hasAttribute("hidden"));
  });

  test("it should move the content from the tab into the shadow DOM", () => {
    const secondTab = document.querySelector("#default pfe-tab:nth-of-type(2)");
    const shadowTab = secondTab.shadowRoot.querySelector("#tab");
    assert.equal(secondTab.innerHTML.trim(), shadowTab.innerHTML.trim());
  });

  test("it should add an h3 tag to the tab if one is not provided", () => {
    const htag = document.createElement("h3");
    const firstTab = document.querySelector("#default pfe-tab:first-child");
    const shadowTab = firstTab.shadowRoot.querySelector("#tab");
    htag.appendChild(firstTab.childNodes[0]);
    assert.equal(htag.outerHTML.trim(), shadowTab.innerHTML.trim());
  });

  test("it should reflect content changes in the tab into the shadow DOM", done => {
    // Capture the elements to compare
    const firstTab = document.querySelector("#default pfe-tab");
    const shadowTab = firstTab.shadowRoot.querySelector("#tab");

    // Update the content of the tab
    document.querySelector("#default pfe-tab").textContent = "Lorem ipsum";

    flush(() => {
      assert.equal("Lorem ipsum", shadowTab.textContent);
      done();
    });
  });

  test("it should reflect markup changes in the tab into the shadow DOM", done => {
    // Capture the elements to compare
    const pfeTabs = document.querySelector("#default");
    const firstTab = pfeTabs.querySelector("pfe-tab");

    // Update the markup of the tab
    const documentFragment = document.createDocumentFragment();
    const heading = document.createElement("h4");
    const span = document.createElement("span");
    heading.textContent = "New tab ";
    span.textContent = "1";
    heading.append(span);

    documentFragment.appendChild(heading);
    firstTab.innerHTML = "";
    firstTab.appendChild(documentFragment);

    flush(() => {
      const shadowTab = firstTab.shadowRoot.querySelector("#tab");
      assert.equal(shadowTab.innerHTML, "<h4>New tab 1</h4>");
      done();
    });
  });

  test("it should properly initialize any dynamically added tabs and panels", done => {
    const pfeTabs = document.querySelector("#dynamic");
    const documentFragment = document.createDocumentFragment();

    const newTab = document.createElement("pfe-tab");
    newTab.id = "newTab";
    newTab.setAttribute("role", "heading");
    newTab.setAttribute("slot", "tab");
    newTab.textContent = `New Tab`;

    const newPanel = document.createElement("pfe-tab-panel");
    newPanel.id = "newPanel"
    newPanel.setAttribute("role", "region");
    newPanel.setAttribute("slot", "panel");
    newPanel.textContent = `New Panel`;

    documentFragment.appendChild(newTab);
    documentFragment.appendChild(newPanel);
    pfeTabs.appendChild(documentFragment);

    const dynamicTab1 = document.querySelector("#dynamicTab1");
    dynamicTab1.innerHTML += "More text";

    flush(() => {
      const newTabElement = document.querySelector("#newTab");
      const newPanelElement = document.querySelector("#newPanel");

      assert.equal(newTabElement.getAttribute("role"), "tab");
      assert.isTrue(newTabElement.hasAttribute("id"));
      assert.isTrue(newTabElement.hasAttribute("aria-controls"));
      assert.equal(newTabElement.getAttribute("aria-controls"), newPanelElement.id);
      assert.equal(newTabElement.getAttribute("variant"), "wind");

      assert.equal(newPanelElement.getAttribute("role"), "tabpanel");
      assert.isTrue(newPanelElement.hasAttribute("id"));
      assert.isTrue(newPanelElement.hasAttribute("aria-labelledby"));
      assert.isTrue(newPanelElement.hasAttribute("hidden"));
      assert.equal(newPanelElement.getAttribute("aria-labelledby"), newTabElement.id);
      assert.equal(newPanelElement.getAttribute("variant"), "wind");
      done();
    });
  });

  test("it should honor a variant attribute value other than the default variant", () => {
    const tabs = document.querySelector("#initialVariant");
    const tab = tabs.querySelector("pfe-tab");
    const panel = tabs.querySelector("pfe-tab-panel");

    assert.equal(tab.getAttribute("variant"), "earth");
    assert.equal(panel.getAttribute("variant"), "earth");
  });

  test("it should update the tabs and panels variant attribute if the tabs variant value changes",
    () => {
      const tabs = document.querySelector("#variantChange");
      const tab = tabs.querySelector("pfe-tab");
      const panel = tabs.querySelector("pfe-tab-panel");

      assert.equal(tab.getAttribute("variant"), "wind");
      assert.equal(panel.getAttribute("variant"), "wind");

      tabs.setAttribute("variant", "earth");

      assert.equal(tab.getAttribute("variant"), "earth");
      assert.equal(panel.getAttribute("variant"), "earth");
    });

  test("it should function properly with tabs in tabs", done => {
    const tabset1 = document.querySelector("#tabs-in-tabs");
    const tabset1Tab1 = tabset1.querySelector("#tabs-in-tabs-1");
    const tabset1Tab2 = tabset1.querySelector("#tabs-in-tabs-2");
    const tabset1Tab2Panel = tabset1.querySelector("#tabs-in-tabs-panel2");
    const tabset2 = tabset1.querySelector("pfe-tabs");
    const tabset2SubTab1 = tabset2.querySelector("#subtab1");
    const tabset2SubTab2 = tabset2.querySelector("#subtab2");
    const tabset2SubTabPanel = tabset2.querySelector("#subtab2panel");

    tabset2SubTab2.click();

    flush(() => {
      assert.equal(tabset2SubTab2.getAttribute("aria-selected"), "true");
      assert.isTrue(!tabset2SubTabPanel.hasAttribute("hidden"));

      tabset1Tab2.click();

      flush(() => {
        assert.equal(tabset1Tab2.getAttribute("aria-selected"), "true");
        assert.isTrue(!tabset1Tab2Panel.hasAttribute("hidden"));

        tabset1Tab1.click();

        flush(() => {
          assert.equal(tabset2SubTab2.getAttribute("aria-selected"), "true");
          assert.isTrue(!tabset2SubTabPanel.hasAttribute("hidden"));

          done();
        });
      });
    });
  });

  test("it should not stop events from inside tabs from propagating", () => {
    const btn = document.querySelector("#btn");
    const handlerSpy = sinon.spy();

    document.addEventListener("click", handlerSpy);
    btn.click();

    const [event] = handlerSpy.getCall(0).args;
    sinon.assert.calledOnce(handlerSpy);

    document.removeEventListener("click", handlerSpy);
  });
});

suite("<pfe-tabs> Tab History", () => {
  test("it should show the correct tab if there is a querystring parameter in the URL", done => {
    // the parameter should be equal to the id of the tabset
    // the value should be equal to the id of the tab you want opened
    const searchParams = new URLSearchParams();
    searchParams.set("fromQueryString", "fromQueryStringTab2");
    var newPath = window.location.pathname + "?" + searchParams.toString();
    history.pushState(null, "", newPath);

    const fragment = document.createRange().createContextualFragment(`
        <pfe-tabs id="fromQueryString">
          <pfe-tab role="heading" slot="tab" id="fromQueryStringTab1">Tab 1</pfe-tab>
          <pfe-tab-panel role="region" slot="panel">Content</pfe-tab-panel>
          <pfe-tab role="heading" slot="tab" id="fromQueryStringTab2">Tab 2</pfe-tab>
          <pfe-tab-panel role="region" slot="panel">Content</pfe-tab-panel>
        </pfe-tabs>
      `);

    document.body.appendChild(fragment);

    flush(() => {
      const tabs = document.querySelector("#fromQueryString");
      const tab2 = tabs.querySelector("#fromQueryStringTab2");
      assert.equal(tabs.selectedIndex, 1);
      assert.isTrue(tab2.hasAttribute("aria-selected"));

      document.body.removeChild(tabs);
      done();
    });
  });

  test(
    "it should show the correct tab if there is a querystring parameter in the URL and the tabset is using pfe-id instead of the id attribute",
    done => {
      // the parameter should be equal to the id of the tabset
      // the value should be equal to the id of the tab you want opened
      const searchParams = new URLSearchParams();
      searchParams.set("fromQueryString", "fromQueryStringTab2");
      var newPath = window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newPath);

      const fragment = document.createRange().createContextualFragment(`
        <pfe-tabs id="fromQueryString">
          <pfe-tab role="heading" slot="tab" id="fromQueryStringTab1">Tab 1</pfe-tab>
          <pfe-tab-panel role="region" slot="panel">Content</pfe-tab-panel>
          <pfe-tab role="heading" slot="tab" id="fromQueryStringTab2">Tab 2</pfe-tab>
          <pfe-tab-panel role="region" slot="panel">Content</pfe-tab-panel>
        </pfe-tabs>
      `);

      document.body.appendChild(fragment);

      flush(() => {
        const tabs = document.querySelector(`[id="fromQueryString"]`);
        const tab2 = tabs.querySelector(`[id="fromQueryStringTab2"]`);
        assert.equal(tabs.selectedIndex, 1);
        assert.isTrue(tab2.hasAttribute("aria-selected"));

        document.body.removeChild(tabs);
        done();
      });
    });

  test(
    "it should continue to support the \"pfe-\" prefix in the URL and show the correct tab if there is a querystring parameter in the URL",
    done => {
      // this supports any tabs that are currently using the "pfe-" prefix
      // in the URL to open to a specific tab. the "pfe-" prefix has been
      // deprecated and should no longer be used
      const searchParams = new URLSearchParams();
      searchParams.set("pfe-fromQueryString", "fromQueryStringTab2");
      var newPath = window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newPath);

      const fragment = document.createRange().createContextualFragment(`
        <pfe-tabs id="fromQueryString">
          <pfe-tab role="heading" slot="tab" id="fromQueryStringTab1">Tab 1</pfe-tab>
          <pfe-tab-panel role="region" slot="panel">Content</pfe-tab-panel>
          <pfe-tab role="heading" slot="tab" id="fromQueryStringTab2">Tab 2</pfe-tab>
          <pfe-tab-panel role="region" slot="panel">Content</pfe-tab-panel>
        </pfe-tabs>
      `);

      document.body.appendChild(fragment);
      flush(() => {
        const tabs = document.querySelector("#fromQueryString");
        const tab2 = tabs.querySelector("#fromQueryStringTab2");
        assert.equal(tabs.selectedIndex, 1);
        assert.isTrue(tab2.hasAttribute("aria-selected"));

        document.body.removeChild(tabs);
        done();
      });
    });

  test("it should open the first tab if the querystring in the URL doesn't match the id of any of the tabs",
    done => {
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set("pfe-fromQueryString", "iDontExist");
      var newPath = window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newPath);

      const fragment = document.createRange().createContextualFragment(`
        <pfe-tabs id="fromQueryString">
          <pfe-tab role="heading" slot="tab" id="fromQueryStringTab1">Tab 1</pfe-tab>
          <pfe-tab-panel role="region" slot="panel">Content</pfe-tab-panel>
          <pfe-tab role="heading" slot="tab" id="fromQueryStringTab2">Tab 2</pfe-tab>
          <pfe-tab-panel role="region" slot="panel">Content</pfe-tab-panel>
        </pfe-tabs>
      `);

      document.body.appendChild(fragment);

      flush(() => {
        const tabs = document.querySelector("#fromQueryString");
        const tab1 = tabs.querySelector("#fromQueryStringTab1");
        assert.equal(tabs.selectedIndex, 0);
        assert.isTrue(tab1.hasAttribute("aria-selected"));

        document.body.removeChild(tabs);
        done();
      });
    });

  test("it should update the URL on tab selection if the tab-history attribute is present", done => {
    const tabs = document.querySelector("#history");
    const tab2 = tabs.querySelector("#historyTab2");

    tab2.click();

    flush(() => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      assert.equal(urlSearchParams.get("history"), "historyTab2");
      assert.equal(tabs.selectedIndex, 1);
      assert.isTrue(tab2.hasAttribute("aria-selected"));
      done();
    });
  });

  test(
    "it should update the URL on tab selection if the tab-history attribute is present",
    done => {
      // we don't want to communicate that this is available. the only
      // reason we're doing this is to support pfe-content-set and allow
      // developers to continue using id attributes on pfe-content-set
      const tabs = document.querySelector("#pfe-id-history");
      const tab2 = tabs.querySelector("#historyTab2");

      tab2.click();

      flush(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        assert.equal(urlSearchParams.get("history"), "historyTab2");
        assert.equal(tabs.selectedIndex, 1);
        assert.isTrue(tab2.hasAttribute("aria-selected"));
        done();
      });
    });

  test("it should stop updating the URL if the tab-history attribute is removed", done => {
    // this test builds on the previous test
    const tabs = document.querySelector("#history");
    const tab1 = tabs.querySelector("#historyTab1");

    tabs.tabHistory = false;
    tab1.click();

    flush(() => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      assert.equal(urlSearchParams.get("history"), "historyTab2");
      assert.equal(tabs.selectedIndex, 0);
      assert.isTrue(tab1.hasAttribute("aria-selected"));
      done();
    });
  });
});