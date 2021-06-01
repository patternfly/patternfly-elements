let pfeNavigation = null;
let mainMenuDropdowns = null;
let secondaryLinksDropdowns = null;
// Gets populated in early tests with checkToggleAndDropdownBasics
const allToggles = {};

/**
 * Checks the required attributes on a dropdown and wrapper
 * @param {Element} toggle Reference to toggle element
 * @param {Element} dropdownWrapper Reference to corresponding .pfe-navigation__dropdown-wrapper element
 * @param {String} machineName Identifier for error messages
 */
function checkToggleAndDropdownBasics(toggle, dropdownWrapper, machineName) {
  // Check Toggle
  assert.isTrue(
    toggle && toggle.tagName === 'BUTTON',
    `${machineName} Toggle button is missing for a dropdown`
  );
  assert.isTrue(
    toggle.hasAttribute('aria-expanded'),
    `${machineName} Toggle does not have aria-expanded`
  );
  assert.isTrue(
    toggle.hasAttribute('aria-controls'),
    `${machineName} Toggle does not have aria-controls`
  );
  assert.isString(
    toggle.id,
    `${machineName} Toggle does not have an id`
  );

  if (toggle.id && !allToggles[toggle.id]) {
    allToggles[toggle.id] = toggle;
  }

  // Check Dropdown Wrapper
  assert.isTrue(
    dropdownWrapper.classList.contains('pfe-navigation__dropdown-wrapper'),
    `${machineName} Dropdown is missing it's dropdown wrapper`
  );

  assert.isString(
    dropdownWrapper.id,
    `${machineName} Dropdown is missing an id`
  );
  assert.isTrue(
    dropdownWrapper.hasAttribute('aria-hidden'),
    `${machineName} Dropdown is missing aria-hidden`
  );

  // Check connection between the two
  assert.isTrue(
    toggle.getAttribute('aria-controls') === dropdownWrapper.id,
    `${machineName} toggle doesn't have aria-controls attribute that matches dropdown`
  );
}

/**
 * Tests toggle and dropdown state attributes based on the active parameter
 * @param {Element} toggle Reference to toggle element
 * @param {Element} dropdownWrapper Reference to corresponding .pfe-navigation__dropdown-wrapper element
 * @param {String} machineName Identifier for error messages
 * @param {Boolean} active If the toggle & dropdown should be tested for active or inactive state
 */
function checkToggleAndDropdownState(toggle, dropdownWrapper, machineName, active = true) {
  const ariaExpanded = active ? 'true' : 'false';
  assert.isTrue(
    toggle.getAttribute('aria-expanded') === ariaExpanded,
    `The ${machineName} toggle should have aria-expanded set to ${ariaExpanded}`
  );

  if (toggle.id.startsWith('main-menu')) {
    if (active) {
      assert.isTrue(
        toggle.parentElement.classList.contains('pfe-navigation__menu-item--open'),
        `The parent element for the ${machineName} toggle is missing the pfe-navigation__menu-item--open class`
      );
    }
    else {
      assert.isFalse(
        toggle.parentElement.classList.contains('pfe-navigation__menu-item--open'),
        `The parent element for the ${machineName} toggle has the pfe-navigation__menu-item--open class, and should not`
      );
    }
  }

  // Get the dropdown wrapper if we don't have it
  if (!dropdownWrapper) {
    const dropdownId = pfeNavigation._getDropdownId(toggle.id);
    if (dropdownId) {
      // It could be in the lightDOM or the shadow DOM
      dropdownWrapper =
        pfeNavigation.shadowRoot.getElementById(dropdownId) ||
        document.getElementById(dropdownId);
    }
  }
  assert.isNotNull(
    dropdownWrapper,
    `Was not able to find dropdown element that is associated to the ${machineName} toggle`
  );

  const ariaHidden = active ? 'false' : 'true';
  assert.isTrue(
    dropdownWrapper.getAttribute('aria-hidden') === ariaHidden,
    `The ${machineName} toggle's dropdown should have aria-hidden set to ${ariaHidden}`
  );
  if (active) {
    assert.isFalse(
      dropdownWrapper.hasAttribute('tabindex'),
      `The ${machineName} toggle's dropdown is active and has the tabindex attribute`
    );
    assert.isFalse(
      dropdownWrapper.classList.contains('pfe-navigation__dropdown-wrapper--invisible'),
      `The ${machineName} toggle's dropdown is active and has the class pfe-navigation__dropdown-wrapper--invisible`
    );
  }
  else {
    assert.isTrue(
      dropdownWrapper.getAttribute('tabindex') === "-1",
      `The ${machineName} toggle's dropdown is inactive and tabindex should be set to -1`
    );
    assert.isTrue(
      dropdownWrapper.classList.contains('pfe-navigation__dropdown-wrapper--invisible'),
      `The ${machineName} toggle's dropdown is inactive and is missing pfe-navigation__dropdown-wrapper--invisible`
    );
  }
}

/**
 * Checks to make sure all toggles besides one give are inactive
 * @param {String} activeToggleId ID of active toggle
 */
function checkInactiveToggleAndDropdownState(activeToggleId) {
  // Check to make sure all other toggles are inactive
  const allTogglesKeys = Object.keys(allToggles);
  for (let index = 0; index < allTogglesKeys.length; index++) {
    const toggle = allToggles[allTogglesKeys[index]];
    if (activeToggleId !== toggle.id) {
      checkToggleAndDropdownState(toggle, null, toggle.id, false);
    }
  }
}

suite('<pfe-navigation>', () => {
  setup(() => {
    pfeNavigation = document.querySelector('pfe-navigation');
    mainMenuDropdowns = pfeNavigation.shadowRoot.querySelectorAll('#pfe-navigation__menu .pfe-navigation__dropdown');
    secondaryLinksDropdowns = pfeNavigation.querySelectorAll('[slot="secondary-links"] pfe-navigation-dropdown');
  });

  test('Component should upgrade', () => {
    assert.instanceOf(
      document.querySelector('pfe-navigation'),
      customElements.get("pfe-navigation", 'pfe-navigation should be an instance of PfeNavigation')
    );
  });

  test('role=banner Should be added to the nav', () => {
    assert.isTrue(
      pfeNavigation.getAttribute('role') === 'banner',
      "role=banner was not added to the navigation"
    );
  });

  test('Component should get the processed class', () => {
    assert.isTrue(
      pfeNavigation.classList.contains("pfe-navigation--processed"),
      "The navigation was missing the class pfe-navigation--processed, indicating the light DOM has been processed"
    );
  });

  test('Main menu items should be processed with proper HTML in the shadow DOM', () => {
    const menuListItems = pfeNavigation.shadowRoot.querySelectorAll('#pfe-navigation__menu > li');
    assert.isTrue(
      pfeNavigation.querySelectorAll('#pfe-navigation__menu > li').length === menuListItems.length,
      "The number of menu items in the light DOM does not match the shadow DOM"
    );

    assert.isTrue(
      pfeNavigation.querySelectorAll('#pfe-navigation__menu .pfe-navigation__dropdown').length === mainMenuDropdowns.length,
      "The number of dropdowns in the lightDOM doesn't match the shadow DOM"
      );

    for (let index = 0; index < mainMenuDropdowns.length; index++) {
      const dropdown = mainMenuDropdowns[index];
      const dropdownMenuItem = dropdown.closest('.pfe-navigation__menu-item');
      const toggle = dropdownMenuItem.querySelector('.pfe-navigation__menu-link');
      const dropdownWrapper = dropdown.parentElement

      // Check toggle
      assert.isString(
        toggle.dataset.machineName,
        `Toggle does not have Machine name`
      );
      const machineName = toggle.dataset.machineName;

      checkToggleAndDropdownBasics(toggle, dropdownWrapper, machineName);
      checkToggleAndDropdownState(toggle, dropdownWrapper, machineName, false);
    }

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
    }
    else {
      assert.isTrue(
        searchButton !== null && window.getComputedStyle(searchButton).display === 'none',
        "Search toggle should be display none, but isn't"
     );
   }
  });

  test('Dropdowns in secondary link areas should get upgraded', () => {
    for (let index = 0; index < secondaryLinksDropdowns.length; index++) {
      const dropdown = secondaryLinksDropdowns[index];
      const dropdownOuterWrapper = dropdown.closest('[slot="secondary-links"]');
      const toggle = dropdownOuterWrapper.querySelector('.pfe-navigation__secondary-link');
      const dropdownWrapper = dropdown.parentElement;

      assert.isString(
        dropdown.dataset.idSuffix,
        "Secondary links dropdown is missing the data-id-suffix attribute"
      );
      const machineName = dropdown.dataset.idSuffix;

      checkToggleAndDropdownBasics(toggle, dropdownWrapper, machineName);
      checkToggleAndDropdownState(toggle, dropdownWrapper, machineName, false);
    }
  });

  test('A toggle and dropdown should get certain attributes when it is active', () => {
    const firstMenuLink = pfeNavigation.shadowRoot.querySelector('.pfe-navigation__menu-link');
    firstMenuLink.click();
    checkToggleAndDropdownState(firstMenuLink, null, firstMenuLink.dataset.machineName, true);
    checkInactiveToggleAndDropdownState(firstMenuLink.id);

    const firstSecondaryLinkDropdown = pfeNavigation.querySelector('button.pfe-navigation__secondary-link');
    firstSecondaryLinkDropdown.click();
    checkToggleAndDropdownState(firstSecondaryLinkDropdown, null, firstSecondaryLinkDropdown.id, true);
    checkInactiveToggleAndDropdownState(firstSecondaryLinkDropdown.id);
  });

  test('When the overlay is clicked the menu should shut', () => {
    if (!pfeNavigation.isOpen()) {
      pfeNavigation.shadowRoot.querySelector('.pfe-navigation__menu-link').click();
    }
    pfeNavigation._overlay.click();
    assert.isFalse(
      pfeNavigation.isOpen(),
      'The overlay was clicked and it looks like it didn\'t close the dropdowns'
    );
  });

  // test('When the user tabs out of the menu, open dropdowns should shut', () => {
    // @todo how to simulate tab click
  // });

  // test('When the window resizes to a different breakpoint the same element should be open', () => {
    // @todo Figure out how to resize screen
  // });

  // test('', () => {
  // });

});
