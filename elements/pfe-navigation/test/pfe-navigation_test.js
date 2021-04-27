const slots = [ "skip", "logo", "search", "language", "mobile-language", "login", "mobile-login", "site-switcher" ];
let pfeNavigation;
let pfeNavigationMain;
let pfeNavigationItems;

suite('<pfe-navigation>', () => {
  setup(() => {
    pfeNavigation = document.querySelector('pfe-navigation');
    pfeNavigationMain = document.querySelector('pfe-navigation-main');
    pfeNavigationItems = document.querySelectorAll('pfe-navigation-item');
  });
   
  test('it should upgrade', () => {
    assert.instanceOf(document.querySelector('pfe-navigation'), customElements.get("pfe-navigation", 'pfe-navigation should be an instance of PfeNavigation'));
  });

  //-- Test attributes
  // pfe-sticky="true|false"
  // NOTE: pfe-sticky is not added as an attribute on upgrade
  // test(`it should add pfe-sticky="true" on upgrade`, () => {
  //   assert.isTrue(pfeNavigation.hasAttribute('pfe-sticky'));
  // });

  // pfe-close-on-click="external"
  // NOTE: pfe-close-on-click is not added as an attribute on upgrade
  // test(`it should add pfe-close-on-click="external" on upgrade`, () => {
  //   assert.equal(pfeNavigation.getAttribute('pfe-close-on-click'), 'external');
  // });

  // pfe-menu-label="String"
  test(`it should inject the value of pfe-menu-label to the template`, () => {
    const menuLabel = pfeNavigation.shadowRoot.querySelector(".pfe-navigation__main--menu-label").innerText;
    assert.equal(pfeNavigation.getAttribute('pfe-menu-label'), menuLabel);
  });

  //-- Test slots
  slots.forEach(slot => {
    test(`it should render the ${slot} slot`, () => {
      assert.isNotNull(pfeNavigation.shadowRoot.querySelector(`[name="${slot}"]`));
    });
  });


  //-- Test applied a11y attributes
  test('it should add the proper attributes', () => {
    // Slot = logo -- tabindex = 2
    // Slot = skip -- tabindex = 1
    assert.isTrue(pfeNavigation.hasAttribute("has_skip"));
    assert.isTrue(pfeNavigation.hasAttribute("has_logo"));
    assert.isTrue(pfeNavigation.hasAttribute("has_search"));
    assert.isTrue(pfeNavigation.hasAttribute("has_mobile-search"));
    assert.isTrue(pfeNavigation.hasAttribute("has_main"));
    assert.isTrue(pfeNavigation.hasAttribute("has_language"));
    assert.isTrue(pfeNavigation.hasAttribute("has_mobile-language"));
    assert.isTrue(pfeNavigation.hasAttribute("has_login"));
    assert.isTrue(pfeNavigation.hasAttribute("has_mobile-login"));
    assert.isTrue(pfeNavigation.hasAttribute("has_site-switcher"));
  });

  test("it should close the navigation when the overlay is clicked", () => {
    const pfeNavigationItem = pfeNavigationMain.querySelector("pfe-navigation-item");
    const trigger = pfeNavigationItem.querySelector(`[slot="trigger"] a`);
    const backdrop = pfeNavigation.shadowRoot.querySelector(".pfe-navigation__overlay");

    trigger.click();
    backdrop.click();

    assert.isTrue(backdrop.hasAttribute("hidden"));
  });

  test("it should cascade pfe-full-width if the pfe-full-width attribute is present on pfe-navigation", () => {
    const navigationFullWidth = document.querySelector("pfe-navigation[pfe-full-width]");
    const item = navigationFullWidth.querySelector("pfe-navigation-item");
    const itemInPfeNavigationMain = navigationFullWidth.querySelector("pfe-navigation-main pfe-navigation-item");
    const navigationItemTray = itemInPfeNavigationMain.shadowRoot.querySelector(".pfe-navigation-item__tray");

    assert.isTrue(navigationFullWidth.hasAttribute("pfe-full-width"));
    assert.isTrue(item.hasAttribute("pfe-full-width"));
    assert.isTrue(itemInPfeNavigationMain.hasAttribute("pfe-full-width"));
    assert.isTrue(navigationItemTray.hasAttribute("pfe-full-width"));

    navigationFullWidth.removeAttribute("pfe-full-width");

    assert.isFalse(navigationFullWidth.hasAttribute("pfe-full-width"));
    assert.isFalse(item.hasAttribute("pfe-full-width"));
    assert.isFalse(itemInPfeNavigationMain.hasAttribute("pfe-full-width"));
    assert.isFalse(navigationItemTray.hasAttribute("pfe-full-width"));
  });

  // @NOTE Removed this, possibily temporarily
  // test("the document body should have overflow hidden when the nav is open", () => {
  //   const pfeNavigationItem = pfeNavigationMain.querySelector("pfe-navigation-item");
  //   const trigger = pfeNavigationItem.querySelector(`[slot="trigger"] a`);
  //   const backdrop = pfeNavigation.shadowRoot.querySelector(".pfe-navigation__overlay");

  //   trigger.click();
  //   assert.equal(document.body.style.overflow, "hidden");

  //   backdrop.click();
  //   assert.isUndefined(document.body.style.overlay);
  // });

  test("it should report its height via a global CSS variable", () => {
    const pfeNavigation = document.querySelector('pfe-navigation');

    const reportedHeight = document.body.style.getPropertyValue("--pfe-navigation--Height--actual");

    // there are multiple pfe-navigations on this page, so don't try to
    // check the exact height (race condition over which writes its var
    // last).  Just check that the var was created.
    assert.isDefined(reportedHeight, "pfe-navigation without id reports height to default css variable");
  });
});


suite('<pfe-navigation-item>', () => {
  test('it should upgrade', () => {
    assert.instanceOf(document.querySelector('pfe-navigation-item'), customElements.get("pfe-navigation-item", 'pfe-navigation-item should be an instance of PfeNavigationItem'));
  });

  //-- Test attributes
    // pfe-icon

  //-- Test slots
    // [ trigger, tray ]

  //-- Test applied a11y attributes

  test('it should expand the tray when the trigger is selected', () => {
    const pfeNavigationItem = pfeNavigationMain.querySelector("pfe-navigation-item");
    const trigger = pfeNavigationItem.querySelector(`[slot="trigger"] a`);
    const tray = pfeNavigationItem.querySelector(`[slot="tray"]`);
    const triggerContainer = pfeNavigationItem.shadowRoot.querySelector(".pfe-navigation-item__trigger");
    const trayContainer = pfeNavigationItem.shadowRoot.querySelector(".pfe-navigation-item__tray");

    trigger.click();
    assert.isTrue(pfeNavigationItem.classList.contains("expanded"));
    assert.isNotTrue(tray.hasAttribute("hidden"));
    assert.equal(triggerContainer.getAttribute("aria-expanded"), "true");
    assert.equal(trayContainer.getAttribute("aria-expanded"), "true");

    // reset
    trigger.click();
    assert.isNotTrue(pfeNavigationItem.classList.contains("expanded"));
    assert.isTrue(tray.hasAttribute("hidden"));
    assert.equal(triggerContainer.getAttribute("aria-expanded"), "false");
    assert.equal(trayContainer.getAttribute("aria-expanded"), "false");
  });

  test('it should dispatch a pfe-navigation-item:open event when the nav item is selected', done => {
    const pfeNavigationItem = pfeNavigationMain.querySelector("pfe-navigation-item");
    const trigger = pfeNavigationItem.querySelector(`[slot="trigger"] a`);

    function openHandler(event) {
      assert.equal(event.target, pfeNavigationItem);
      document.removeEventListener("pfe-navigation-item:open", openHandler);
      done();
    }

    document.addEventListener("pfe-navigation-item:open", openHandler);
    trigger.click();
  });

  test('it should dispatch a pfe-navigation-item:close event when the nav item is selected', done => {
    const pfeNavigationItem = pfeNavigationMain.querySelector("pfe-navigation-item");
    const trigger = pfeNavigationItem.querySelector(`[slot="trigger"] a`);

    function closeHandler(event) {
      assert.equal(event.target, pfeNavigationItem);
      document.removeEventListener("pfe-navigation-item:close", closeHandler);
      done();
    }

    document.addEventListener("pfe-navigation-item:close", closeHandler);
    trigger.click();
    trigger.click();
  });

  test("it should open the navigation item when the open API is called", () => {
    const pfeNavigationItem = pfeNavigationMain.querySelector("pfe-navigation-item");
    const trigger = pfeNavigationItem.querySelector(`[slot="trigger"] a`);
    const tray = pfeNavigationItem.querySelector(`[slot="tray"]`);
    const triggerContainer = pfeNavigationItem.shadowRoot.querySelector(".pfe-navigation-item__trigger");
    const trayContainer = pfeNavigationItem.shadowRoot.querySelector(".pfe-navigation-item__tray");

    pfeNavigationItem.open();
    assert.isTrue(pfeNavigationItem.classList.contains("expanded"));
    assert.isNotTrue(tray.hasAttribute("hidden"));
    assert.equal(triggerContainer.getAttribute("aria-expanded"), "true");
    assert.equal(trayContainer.getAttribute("aria-expanded"), "true");

    // reset
    trigger.click();
  });

  test("it should close the navigation item when the close API is called", () => {
    const pfeNavigationItem = pfeNavigationMain.querySelector("pfe-navigation-item");
    const trigger = pfeNavigationItem.querySelector(`[slot="trigger"] a`);
    const tray = pfeNavigationItem.querySelector(`[slot="tray"]`);
    const triggerContainer = pfeNavigationItem.shadowRoot.querySelector(".pfe-navigation-item__trigger");
    const trayContainer = pfeNavigationItem.shadowRoot.querySelector(".pfe-navigation-item__tray");

    trigger.click();

    pfeNavigationItem.close();

    assert.isNotTrue(pfeNavigationItem.classList.contains("expanded"));
    assert.isTrue(tray.hasAttribute("hidden"));
    assert.equal(triggerContainer.getAttribute("aria-expanded"), "false");
    assert.equal(trayContainer.getAttribute("aria-expanded"), "false");
  });

  test("it should toggle the navigation item when the toggle API is called", () => {
    const pfeNavigationItem = pfeNavigationMain.querySelector("pfe-navigation-item");
    const trigger = pfeNavigationItem.querySelector(`[slot="trigger"] a`);
    const tray = pfeNavigationItem.querySelector(`[slot="tray"]`);
    const triggerContainer = pfeNavigationItem.shadowRoot.querySelector(".pfe-navigation-item__trigger");
    const trayContainer = pfeNavigationItem.shadowRoot.querySelector(".pfe-navigation-item__tray");

    pfeNavigationItem.toggle();

    assert.isTrue(pfeNavigationItem.classList.contains("expanded"));
    assert.isNotTrue(tray.hasAttribute("hidden"));
    assert.equal(triggerContainer.getAttribute("aria-expanded"), "true");
    assert.equal(trayContainer.getAttribute("aria-expanded"), "true");

    pfeNavigationItem.toggle();

    assert.isNotTrue(pfeNavigationItem.classList.contains("expanded"));
    assert.isTrue(tray.hasAttribute("hidden"));
    assert.equal(triggerContainer.getAttribute("aria-expanded"), "false");
    assert.equal(trayContainer.getAttribute("aria-expanded"), "false");
  });

  test("it should replace the web-mobile-menu icon when expanded", () => {
    const mobileNavigationItem = pfeNavigation.shadowRoot.querySelector(`pfe-navigation-item[pfe-icon="web-mobile-menu"]`);
    const pfeIcon = mobileNavigationItem.shadowRoot.querySelector("pfe-icon");

    mobileNavigationItem.open();
    assert.equal(pfeIcon.getAttribute("icon"), "web-plus");

    mobileNavigationItem.close();
    assert.equal(pfeIcon.getAttribute("icon"), "web-mobile-menu");
  });
});

suite('<pfe-navigation-main>', () => {
  test('it should upgrade', () => {
    assert.instanceOf(document.querySelector('pfe-navigation-main'), customElements.get("pfe-navigation-main", 'pfe-navigation-main should be an instance of PfeNavigationMain'));
  });

  //-- Test applied a11y attributes
  test('it should initialize with the proper aria', () => {
    assert.equal(pfeNavigationMain.getAttribute("role"), "navigation");
    assert.equal(pfeNavigationMain.getAttribute("aria-label"), "Main");
  });

  test("it should add a first attribute to the first navigation item", () => {
    const firstPfeNavigationItem = pfeNavigationMain.querySelector("pfe-navigation-item[first]");
    assert.isTrue(firstPfeNavigationItem.hasAttribute("first"));
    assert.equal(firstPfeNavigationItem.querySelector(`[slot="trigger"] a`).textContent, "Products");
  });

  test("it should add a last attribute to the last navigation item", () => {
    const lastPfeNavigationItem = pfeNavigationMain.querySelector("pfe-navigation-item[last]");
    assert.isTrue(lastPfeNavigationItem.hasAttribute("last"));
    assert.equal(lastPfeNavigationItem.querySelector(`[slot="trigger"] a`).textContent, "Red Hat & open source");
  });
});