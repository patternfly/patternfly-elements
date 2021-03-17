suite('<pfe-jump-links-nav>', () => {
  let jumplinks;
  setup( function() {
    if (window.Vue || window.React) this.skip();
    jumplinks = fixture('jumplinks-fixture');
  });

  test('it should upgrade', () => {
    assert.instanceOf(jumplinks.querySelector('pfe-jump-links-nav'), customElements.get("pfe-jump-links-nav", 'pfe-jump-links-nav should be an instance of pfeJumpLinksNav'));
  });

  test("it should autobuild the navigation when the autobuild attribute is present", (done) => {
    const pfeJumpLinksNav = jumplinks.querySelector("pfe-jump-links-nav");
    const pfeJumpLinksPanel = jumplinks.querySelector("pfe-jump-links-panel");

    pfeJumpLinksNav.setAttribute("autobuild", "");

    flush(() => {
      const headingCount = pfeJumpLinksPanel.querySelectorAll(".pfe-jump-links-panel__section:not(.sub-section)");
      const links = pfeJumpLinksNav.shadowRoot.querySelector("#container ul.pfe-jump-links-nav");

      // There should be the same number of nav links as there are headings
      assert.equal(links.children.length, headingCount.length);
      done();
    });
  })

  test("it should honor the autobuild alias pfe-c-autobuild", (done) => {
    const pfeJumpLinksNav = jumplinks.querySelector("pfe-jump-links-nav");
    const pfeJumpLinksPanel = jumplinks.querySelector("pfe-jump-links-panel");

    pfeJumpLinksNav.setAttribute("pfe-c-autobuild", "");

    flush(() => {
      const headingCount = pfeJumpLinksPanel.querySelectorAll(".pfe-jump-links-panel__section:not(.sub-section)");
      const links = pfeJumpLinksNav.shadowRoot.querySelector("#container ul.pfe-jump-links-nav");

      // There should be the same number of nav links as there are headings
      assert.equal(links.children.length, headingCount.length);
      done();
    });
  })
});

suite('<pfe-jump-links-panel>', () => {
  let jumplinks;
  setup( function() {
    if (window.Vue || window.React) this.skip();
    jumplinks = fixture('jumplinks-fixture');
  });

  test('it should upgrade', () => {
    assert.instanceOf(jumplinks.querySelector('pfe-jump-links-panel'), customElements.get("pfe-jump-links-panel", 'pfe-jump-links-panel should be an instance of pfejump-linksPanel'));
  });

  test('its ._makeActive() method should add an active attribute to its target', (done) => {
    const nav = jumplinks.querySelector('pfe-jump-links-nav');
    const panel = jumplinks.querySelector('pfe-jump-links-panel');

    // Make the 3rd item active
    Promise.all([customElements.whenDefined("pfe-jump-links-nav"), customElements.whenDefined("pfe-jump-links-panel")]).then(() => {
      panel._makeActive(3);
    });

    flush(() => {
      let navItems = nav.shadowRoot.querySelectorAll('.pfe-jump-links-nav__item');
      let testNavItem = navItems.item(3);

      // Test that the nav item is active
      assert(testNavItem.hasAttribute('active'));
      done();
    });
  });

  test('its .removeAllActive() method should remove [active] attributes from all nav items', (done) => {
    const nav = jumplinks.querySelector('pfe-jump-links-nav');
    const panel = jumplinks.querySelector('pfe-jump-links-panel');

    Promise.all([customElements.whenDefined("pfe-jump-links-nav"), customElements.whenDefined("pfe-jump-links-panel")]).then(() => {
      panel._makeActive(0);
      panel._makeActive(1);
      panel._makeActive(2);
      panel._makeActive(3);
      panel._makeActive(4);
      panel._removeAllActive();
    });

    flush(() => {
      let navItems = nav.querySelectorAll('.pfe-jump-links-nav__item');
      let testNavItemsArr = [];

      // Push any active items to the test array
      [...navItems].forEach(item => testNavItemsArr.push(item.hasAttribute('active')));

      // Assert that the event sends activeNavItem
      assert(!testNavItemsArr.includes(true));

      done();
    });
  });

  test('it should fire a pfe-jump-links-panel:active-navItem when makeActive() is called', done => {
    const el = jumplinks.querySelector('pfe-jump-links-panel');
    const handlerSpy = sinon.spy();

    el.addEventListener('pfe-jump-links-panel:active-navItem', handlerSpy);

    // Make the first item active
    Promise.all([customElements.whenDefined("pfe-jump-links-nav"), customElements.whenDefined("pfe-jump-links-panel")]).then(() => {
      el._makeActive(1);
    });

    flush(() => {
      const [event] = handlerSpy.getCall(0).args;
      sinon.assert.calledOnce(handlerSpy);

      // Assert that the event sends activeNavItem
      assert(event.detail.activeNavItem);

      // reset
      el.removeEventListener('pfe-jump-links-panel:active-navItem', handlerSpy);
      done();
    });
  });

  test('it should make the appropriate nav item active when scrolled', () => {
    let bool;
    const wait = (el) => setTimeout(() => {
      bool = el.hasAttribute('active');
      throw new Error(bool);
      assert(bool);
    }, 1000);

    const nav = document.querySelector('pfe-jump-links-nav');
    const navItems = nav.shadowRoot.querySelectorAll('.pfe-jump-links-nav__item');

    let testNavItem = navItems.item(5);

    testNavItem.click();

    wait(testNavItem);
  });

  test("it should default to an offset value of 200", (done) => {
    const panel = jumplinks.querySelector('pfe-jump-links-panel');

    flush(() => {
      assert.equal(panel.offsetValue, 200);
      done();
    });
  });

  test("it should update the offset value when the offset attribute is used", (done) => {
    const panel = jumplinks.querySelector('pfe-jump-links-panel');

    panel.setAttribute("offset", "400");

    flush(() => {
      assert.equal(panel.offsetValue, 400);
      done();
    });
  });

  test("it should honor the offset alias pfe-c-offset", (done) => {
    const panel = jumplinks.querySelector('pfe-jump-links-panel');

    panel.setAttribute("pfe-c-offset", "400");

    flush(() => {
      assert.equal(panel.offsetValue, 400);
      done();
    });
  });

  test("it should update the offset value when the offset property is updated", (done) => {
    const panel = jumplinks.querySelector('pfe-jump-links-panel');

    panel.offset = "400";

    flush(() => {
      assert.equal(panel.offsetValue, 400);
      done();
    });
  });

  test("it should update the offset value when the --pfe-jump-links-panel--offset CSS property is used", (done) => {
    // @TODO
    // fix this issue in React
    if (window.React) {
      return;
    }

    const panel = jumplinks.querySelector('pfe-jump-links-panel');
    panel.style = "--pfe-jump-links-panel--offset: 100";

    flush(() => {
      assert.equal(panel.offsetValue, 100);
      done();
    });
  });

  test("it should use the offset attribute instead of --pfe-jump-links-panel--offset CSS property if they are both used", (done) => {
    const panel = jumplinks.querySelector('pfe-jump-links-panel');

    panel.style = "--pfe-jump-links-panel--offset: 100";
    panel.setAttribute("offset", "500");

    flush(() => {
      assert.equal(panel.offsetValue, 500);
      done();
    });
  });
});
