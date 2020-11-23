suite('<pfe-jump-links-panel>', () => {
  test('its ._makeActive() method should add an active attribute to its target', () => {
    const nav = document.querySelector('pfe-jump-links-nav');
    let navItems = nav.shadowRoot.querySelectorAll('.pfe-jump-links-nav__item');
    const panel = document.querySelector('pfe-jump-links-panel');
    panel._makeActive(3);
    let testNavItem = [...navItems][3];
    assert(testNavItem.hasAttribute('active'));
  });

  test('its .removeAllActive() method should remove [active] attributes from all nav items', () => {
    const nav = document.querySelector('pfe-jump-links-nav');
    const panel = document.querySelector('pfe-jump-links-panel');
    panel._makeActive(0);
    panel._makeActive(1);
    panel._makeActive(2);
    panel._makeActive(3);
    panel._makeActive(4);
    panel._removeAllActive();
    let navItems = nav.querySelectorAll('.pfe-jump-links-nav__item');
    let testNavItemsArr = [];
    // Assert that the event sends activeNavItem
    [...navItems].forEach(item => testNavItemsArr.push(item.hasAttribute('active')));
    assert(!testNavItemsArr.includes(true));
  });

  test('it should fire a pfe-jump-links-panel:active-nav-item when makeActive() is called', () => {
    // const nav = document.querySelector('pfe-jump-links-nav');
    const el = document.querySelector('pfe-jump-links-panel');
    const panel = customElements.get('pfe-jump-links-panel');
    const handlerSpy = sinon.spy();

    el.addEventListener('pfe-jump-links-panel:active-navItem', handlerSpy);
    el._makeActive(1);
    const [event] = handlerSpy.getCall(0).args;
    sinon.assert.calledOnce(handlerSpy);
    // Assert that the event sends activeNavItem
    assert(event.detail.activeNavItem);
    // reset
    el.removeEventListener('pfe-jump-links-panel:active-navItem', handlerSpy);
  });

  test('it should make the appropriate nav item active when scrolled', () => {
    let bool;
    const wait = (el) => {
      return setTimeout(function(){
        bool = el.hasAttribute('active');
        throw new Error(bool);
        assert(bool);
      }, 1000)
    }
    const nav = document.querySelector('pfe-jump-links-nav');
    const navItems = nav.querySelectorAll('.pfe-jump-links-nav__item');
    let testNavItem = [...navItems][5];
    testNavItem.click();
    wait(testNavItem);
  });
});

suite('<pfe-jump-links-nav>', () => {
  test('it should upgrade', () => {
    assert.instanceOf(document.querySelector('pfe-jump-links-nav'), customElements.get("pfe-jump-links-nav", 'pfe-jump-links-nav should be an instance of pfeJumpLinksNav'));
  });
});

suite('<pfe-jump-links-panel>', () => {
  test('it should upgrade', () => {
    assert.instanceOf(document.querySelector('pfe-jump-links-panel'), customElements.get("pfe-jump-links-panel", 'pfe-jump-links-panel should be an instance of pfeJumpLinksPanel'));
  });

  test("it should default to an offset value of 200", () => {
    const pfeJumpLinksPanel = document.querySelector("pfe-jump-links-panel");
    assert.equal(pfeJumpLinksPanel.offsetValue, 200);
  });

  test("it should update the offset value when the offset attribute is used", () => {
    const pfeJumpLinksPanel = document.querySelector("pfe-jump-links-panel");
    pfeJumpLinksPanel.setAttribute("offset", "400");
    assert.equal(pfeJumpLinksPanel.offsetValue, 400);
    
    pfeJumpLinksPanel.removeAttribute("offset");
  });

  test("it should update the offset value when the --pfe-jump-links-panel--offset CSS property is used", () => {
    // @TODO
    // fix this issue in React
    if (window.React) {
      return;
    }

    const pfeJumpLinksPanel = document.querySelector("#jumplinks3Panel");
    assert.equal(pfeJumpLinksPanel.offsetValue, 100);
  });

  test("it should use the offset attribute instead of --pfe-jump-links-panel--offset CSS property if they are both used", () => {
    const pfeJumpLinksPanel = document.querySelector("#jumplinks3Panel");
    pfeJumpLinksPanel.setAttribute("offset", 500);
    assert.equal(pfeJumpLinksPanel.offsetValue, 500);
  })
});