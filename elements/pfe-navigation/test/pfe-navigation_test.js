let pfeNavigation = null;

function checkMenuLinkActiveAttributes(toggleElement) {
  const toggleName = toggleElement.dataset.machineName;
  assert.isTrue(
    toggleElement.getAttribute('aria-expanded') === 'true',
    `The ${toggleName} toggle did not have aria-expanded after it was clicked`
  );
  assert.isTrue(
    toggleElement.parentElement.classList.contains('pfe-navigation__menu-item--open'),
    `The parent element for the ${toggleName} toggle is missing the pfe-navigation__menu-item--open class`
  );
  const dropdown = pfeNavigation.shadowRoot.getElementById(
    pfeNavigation._getDropdownId(toggleElement.id)
  );
  assert.isNotNull(
    dropdown,
    `Was not able to find dropdown element that is associated to the ${toggleName} toggle`
  );
  assert.isTrue(
    dropdown.getAttribute('aria-hidden') === 'false',
    `The ${toggleName} toggle's dropdown is active and does not have aria-hidden set to false`
  );
  assert.isFalse(
    dropdown.hasAttribute('tabindex'),
    `The ${toggleName} toggle's dropdown is active and has the tabindex attribute`
  );
  assert.isFalse(
    dropdown.classList.contains('pfe-navigation__dropdown-wrapper--invisible'),
    `The ${toggleName} toggle's dropdown is active and has the class pfe-navigation__dropdown-wrapper--invisible`
  );
}

suite('<pfe-navigation>', () => {
  setup(() => {
    pfeNavigation = document.querySelector('pfe-navigation');
  });

  test('Component should upgrade', () => {
    assert.instanceOf(
      document.querySelector('pfe-navigation'),
      customElements.get("pfe-navigation", 'pfe-navigation should be an instance of PfeNavigation')
    );
  });

  test('Component should get the processed class', () => {
    assert.isTrue(
      pfeNavigation.classList.contains("pfe-navigation--processed"),
      "The navigation was missing the class pfe-navigation--processed, indicating the light DOM has been processed"
    );
  });

  test('Should have same number of main menu top level items', () => {
    assert.isTrue(
      pfeNavigation.querySelectorAll('#pfe-navigation__menu > li').length === pfeNavigation.shadowRoot.querySelectorAll('#pfe-navigation__menu > li').length,
      "The number of menu items in the light DOM does not match the shadow DOM"
    );
  });

  test('Search toggle visibility', () => {
    const searchButton = pfeNavigation._searchToggle;
    const searchSlotFilled = pfeNavigation.hasSlot('search');
    // At tablet or desktop if the search slot has content the toggle should be visible
    if (pfeNavigation.breakpoint && pfeNavigation.breakpoint !== 'mobile' && searchSlotFilled) {
      assert.isTrue(
         searchButton !== null && window.getComputedStyle(searchButton).display !== 'none',
        "Search slot is present, but search button's display is none"
      );
    } else {
      assert.isTrue(
        searchButton !== null && window.getComputedStyle(searchButton).display === 'none',
        "Search toggle should be display none, but isn't"
     );
   }
  });

  test('A toggle and dropdown should get certain attributes when it is active', () => {
    const firstMenuLink = pfeNavigation.shadowRoot.querySelector('.pfe-navigation__menu-link');
    firstMenuLink.click();
    checkMenuLinkActiveAttributes(firstMenuLink);
  });

  // test('', () => {
  // });

  // test('', () => {
  // });

  // test('', () => {
  // });

  // test('', () => {
  // });

  // test('', () => {
  // });

  // test('', () => {
  // });

  // test('', () => {
  // });

  // test('', () => {
  // });


});
