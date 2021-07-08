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
  });

  test('its active() method should add an active attribute to the target', (done) => {
    const pfeJumpLinksNav = jumplinks.querySelector('pfe-jump-links-nav');

    // Make the 3rd item active
    Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
      pfeJumpLinksNav.active(3);
    });

    flush(() => {
      let navItems = pfeJumpLinksNav.shadowRoot.querySelectorAll('.pfe-jump-links-nav__item');
      let testNavItem = navItems.item(3);

      // Test that the nav item is active
      assert.isTrue(testNavItem.hasAttribute('active'));
      done();
    });
  });

  test('its inactive() method should remove the active attribute from the target', (done) => {
    const pfeJumpLinksNav = jumplinks.querySelector('pfe-jump-links-nav');

    // Make the 3rd item active
    Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
      pfeJumpLinksNav.active(3);
    });

    flush(() => {
      let navItems = pfeJumpLinksNav.shadowRoot.querySelectorAll('.pfe-jump-links-nav__item');
      let testNavItem = navItems.item(3);

      // Test that the nav item is active
      assert.isTrue(testNavItem.hasAttribute('active'));
      
      pfeJumpLinksNav.inactive(3);

      // Test that the nav item is reset to inactive
      assert.isFalse(testNavItem.hasAttribute('active'));

      done();
    });
  });

  test('its clearActive() method should remove the active attribute from the target', (done) => {
    const pfeJumpLinksNav = jumplinks.querySelector('pfe-jump-links-nav');

    // Make the 3rd item active
    Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
      pfeJumpLinksNav.active(3);
    });

    flush(() => {
      let navItems = pfeJumpLinksNav.shadowRoot.querySelectorAll('.pfe-jump-links-nav__item');
      let testNavItem = navItems.item(3);

      // Test that the nav item is active
      assert.isTrue(testNavItem.hasAttribute('active'));
      
      pfeJumpLinksNav.clearActive();

      // Test that the nav item is reset to inactive
      assert.isFalse(testNavItem.hasAttribute('active'));

      done();
    });
  });

  test('its clearActive() method should remove the active attribute from the target', (done) => {
    const pfeJumpLinksNav = jumplinks.querySelector('pfe-jump-links-nav');

    // Make the 3rd item active
    Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
      pfeJumpLinksNav.active(3);
    });

    flush(() => {
      let navItems = pfeJumpLinksNav.shadowRoot.querySelectorAll('.pfe-jump-links-nav__item');
      let testNavItem = navItems.item(3);

      // Test that the nav item is active
      assert.isTrue(testNavItem.hasAttribute('active'));

      // Test that the nav item is reset to inactive
      assert.notEqual(pfeJumpLinksNav.getActive(), 3);

      done();
    });
  });

  test("it should default to an offset value of 0", () => {
    const nav = jumplinks.querySelector('pfe-jump-links-nav');
    assert.equal(nav.offsetValue, 0);
  });

  test('it should fire a pfe-jump-links-panel:active-navItem when makeActive() is called', done => {
    const el = jumplinks.querySelector('pfe-jump-links-nav');
    const handlerSpy = sinon.spy();

    el.addEventListener('pfe-jump-links-panel:active-navItem', handlerSpy);

    // Make the first item active
    Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
      el.active(1);
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
    const wait = (el) => setTimeout(() => {
      assert.isTrue(el.hasAttribute('active'));
    }, 1000);

    const nav = document.querySelector('pfe-jump-links-nav');
    const navItems = nav.shadowRoot.querySelectorAll('.pfe-jump-links-nav__item');

    let testNavItem = navItems.item(5);

    testNavItem.click();

    wait(testNavItem);
  });

  test("it should update the offset value when the offset attribute is used", (done) => {
    const nav = jumplinks.querySelector('pfe-jump-links-nav');

    nav.setAttribute("offset", "400");

    flush(() => {
      Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
        assert.equal(nav.offsetValue, 400);
        done();
      });
    });
  });

  test("it should update the offset value when the offset property is updated", (done) => {
    const nav = jumplinks.querySelector('pfe-jump-links-nav');

    nav.offset = "400";

    flush(() => {
      Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
        assert.equal(nav.offsetValue, 400);
        done();
      });
    });
  });

  test("it should update the offset value when the --pfe-jump-links-panel--offset CSS property is used", (done) => {
    // @TODO
    // fix this issue in React
    // if (window.React) {
    //   return;
    // }

    const nav = jumplinks.querySelector('pfe-jump-links-nav');
    nav.style = "--pfe-jump-links-panel--offset: 100";

    flush(() => {
      Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
        assert.equal(nav.offsetValue, 100);
        done();
      });
    });
  });

  test("it should use the offset attribute instead of --pfe-jump-links-panel--offset CSS property if they are both used", (done) => {
    const nav = jumplinks.querySelector('pfe-jump-links-nav');

    nav.style = "--pfe-jump-links-panel--offset: 100";
    nav.setAttribute("offset", "500");

    flush(() => {
      Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
        assert.equal(nav.offsetValue, 500);
        done();
      });
    });
  });
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

  // @TODO Validate that the offset on the panel is being used
  // test("it should honor the offset alias pfe-c-offset", (done) => {
  //   const nav = jumplinks.querySelector('pfe-jump-links-nav');

  //   nav.setAttribute("pfe-c-offset", "400");

  //   flush(() => {
  //     Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
  //       assert.equal(nav.offsetValue, 400);
  //       done();
  //     });
  //   });
  // });
});
