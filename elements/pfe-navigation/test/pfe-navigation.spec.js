// Import testing helpers. For more information check out:
// https://open-wc.org/docs/testing/helpers/
import { expect, assert, aTimeout } from '@open-wc/testing/index-no-side-effects.js';

// Import our custom fixture wrapper. This allows us to run tests
// in React and Vue as well as a normal fixture.
import { createFixture } from '../../../test/utils/create-fixture.js';

// Import the element we're testing.
import '../dist/pfe-navigation';

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const testComponent =
  `
  <pfe-navigation id="pfe-navigation">
    <nav class="pfe-navigation" aria-label="Main Navigation">
      <div class="pfe-navigation__logo-wrapper" id="pfe-navigation__logo-wrapper">
        <a href="/" class="pfe-navigation__logo-link">
          <img
            class="
              pfe-navigation__logo-image
              pfe-navigation__logo-image--small
              pfe-navigation__logo-image--print
              pfe-navigation__logo-image--screen"
            src="/elements/pfe-navigation/demo/assets/redhat--reverse.svg"
            width="400"
            alt="Redhat"
          />
        </a>
      </div>
      <ul class="pfe-navigation__menu" id="pfe-navigation__menu">
        <li class="pfe-navigation__menu-item">
          <a href="#LINK-TO-CONTENT" class="pfe-navigation__menu-link">
            Menu Link 1
          </a>
          <div class="pfe-navigation__dropdown">
            <div>
              <h2 id="nav__menu-link-1__column-1">Column 1 title</h2>
              <ul aria-labelledby="nav__menu-link-1__column-1">
                <li><a href="#LINK">Link 1</a></li>
                <li><a href="#LINK">Link 2</a></li>
                <li><a href="#LINK">Link 3</a></li>
                <li><a href="#LINK">Link 4</a></li>
              </ul>
            </div>
            <div>
              <h2 id="nav__menu-link-1__column-2">Column 1 title</h2>
              <ul aria-labelledby="nav__menu-link-1__column-2">
                <li><a href="#LINK">Link 1</a></li>
                <li><a href="#LINK">Link 2</a></li>
                <li><a href="#LINK">Link 3</a></li>
                <li><a href="#LINK">Link 4</a></li>
              </ul>
            </div>
            <div>
              <h2 id="nav__menu-link-1__column-3">Column 1 title</h2>
              <ul aria-labelledby="nav__menu-link-1__column-3">
                <li><a href="#LINK">Link 1</a></li>
                <li><a href="#LINK">Link 2</a></li>
                <li><a href="#LINK">Link 3</a></li>
                <li><a href="#LINK">Link 4</a></li>
              </ul>
            </div>
            <div>
              <h2 id="nav__menu-link-1__column-4">Column 1 title</h2>
              <ul aria-labelledby="nav__menu-link-1__column-4">
                <li><a href="#LINK">Link 1</a></li>
                <li><a href="#LINK">Link 2</a></li>
                <li><a href="#LINK">Link 3</a></li>
                <li><a href="#LINK">Link 4</a></li>
              </ul>
            </div>
          </div>
        </li>

        <li class="pfe-navigation__menu-item">
          <a href="#LINK-TO-CONTENT" class="pfe-navigation__menu-link">
            Menu Link 2
          </a>
          <div class="pfe-navigation__dropdown">
            <div>
              <h2 id="nav__menu-link-2__column-1">Column 1 title</h2>
              <ul aria-labelledby="nav__menu-link-2__column-1">
                <li><a href="#LINK">Link 1</a></li>
                <li><a href="#LINK">Link 2</a></li>
                <li><a href="#LINK">Link 3</a></li>
                <li><a href="#LINK">Link 4</a></li>
              </ul>
            </div>
            <div>
              <h2 id="nav__menu-link-2__column-2">Column 1 title</h2>
              <ul aria-labelledby="nav__menu-link-2__column-2">
                <li><a href="#LINK">Link 1</a></li>
                <li><a href="#LINK">Link 2</a></li>
                <li><a href="#LINK">Link 3</a></li>
                <li><a href="#LINK">Link 4</a></li>
              </ul>
            </div>
            <div>
              <h2 id="nav__menu-link-2__column-3">Column 1 title</h2>
              <ul aria-labelledby="nav__menu-link-2__column-3">
                <li><a href="#LINK">Link 1</a></li>
                <li><a href="#LINK">Link 2</a></li>
                <li><a href="#LINK">Link 3</a></li>
                <li><a href="#LINK">Link 4</a></li>
              </ul>
            </div>
            <div>
              <h2 id="nav__menu-link-2__column-4">Column 1 title</h2>
              <ul aria-labelledby="nav__menu-link-2__column-4">
                <li><a href="#LINK">Link 1</a></li>
                <li><a href="#LINK">Link 2</a></li>
                <li><a href="#LINK">Link 3</a></li>
                <li><a href="#LINK">Link 4</a></li>
              </ul>
            </div>
          </div>
        </li>

        <li class="pfe-navigation__menu-item">
          <a href="#LINK-TO-CONTENT" class="pfe-navigation__menu-link">
            Menu Link 3
          </a>
        </li>

        <li class="pfe-navigation__menu-item">
          <a href="#LINK-TO-CONTENT" class="pfe-navigation__menu-link">
            Menu Link 4
          </a>
        </li>
      </ul>
    </nav>

    <form slot="search" class="pfe-navigation__search">
      <label for="pfe-navigation__search-label">Search</label>
      <input id="pfe-navigation__search-label" type="text" placeholder="Search" />
      <button>Search</button>
    </form>

    <div slot="secondary-links">
      <pfe-navigation-dropdown dropdown-width="single" icon="web-icon-globe" name="Custom 1">
        <h2>ADD CUSTOM DROPDOWN CONTENT HERE</h2>
        <p>More Text</p>
        <pfe-cta pfe-priority="primary">
          <a href="#">HERE'S A CALL TO ACTION</a>
        </pfe-cta>
      </pfe-navigation-dropdown>
    </div>

    <div slot="secondary-links">
      <pfe-navigation-dropdown dropdown-width="full" icon="web-icon-globe" name="Custom 2">
        <h2>ADD CUSTOM DROPDOWN CONTENT HERE</h2>
        <p>More Text</p>
      </pfe-navigation-dropdown>
    </div>
  </pfe-navigation>
  `;

/**
 * Returns all toggles
 * @param {Element} pfeNavigation Reference to nav element
 * @returns {Object} A an object of toggle elements with the key being the ID
 */
const getAllToggles = (pfeNavigation) => {
  const allToggles = {};
  const shadowDomToggles = pfeNavigation.shadowRoot.querySelectorAll('button.pfe-navigation__menu-link, .pfe-navigation__search-toggle, .pfe-navigation__menu-toggle');
  for (let index = 0; index < shadowDomToggles.length; index++) {
    const toggle = shadowDomToggles[index];
    assert.isTrue(
      toggle.id.length > 0,
      "A toggle is missing an ID after the component as processed"
    );
    allToggles[toggle.id] = toggle;
  }
  const lightDomToggles = pfeNavigation.querySelectorAll('button.pfe-navigation__secondary-link, .pfe-navigation__account-toggle');
  for (let index = 0; index < lightDomToggles.length; index++) {
    const toggle = lightDomToggles[index];
    assert.isTrue(
      toggle.id.length > 0,
      "A toggle is missing an ID after the component as processed"
    );
    allToggles[toggle.id] = toggle;
  }

  return allToggles;
};

/**
 * Checks the required attributes on a dropdown and wrapper
 * @param {Element} toggle Reference to toggle element
 * @param {Element} dropdownWrapper Reference to corresponding .pfe-navigation__dropdown-wrapper element
 * @param {String} machineName Identifier for error messages
 */
const checkToggleAndDropdownBasics = (toggle, dropdownWrapper, machineName) => {
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
};

/**
 * Tests toggle and dropdown state attributes based on the active parameter
 * @param {Element} pfeNavigation Reference to nav element
 * @param {Element} toggle Reference to toggle element
 * @param {Element} dropdownWrapper Reference to corresponding .pfe-navigation__dropdown-wrapper element
 * @param {String} machineName Identifier for error messages
 * @param {Boolean} active If the toggle & dropdown should be tested for active or inactive state
 */
const checkToggleAndDropdownState = (pfeNavigation, toggle, dropdownWrapper, machineName, active = true) => {
  // No need to check mobile toggle if it isn't visible
  if (toggle.id === 'mobile__button' && pfeNavigation.breakpoint === 'desktop') {
    return;
  }

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
};

/**
 * Checks to make sure all toggles besides one give are inactive
 * @param {Element} pfeNavigation Reference to nav element
 * @param {String} activeToggleId ID of active toggle
 */
const checkInactiveToggleAndDropdownState = (pfeNavigation, activeToggleId) => {
  const allToggles = getAllToggles(pfeNavigation);

  // Check to make sure all other toggles are inactive
  const allTogglesKeys = Object.keys(allToggles);
  for (let index = 0; index < allTogglesKeys.length; index++) {
    const toggle = allToggles[allTogglesKeys[index]];
    if (activeToggleId !== toggle.id) {
      checkToggleAndDropdownState(pfeNavigation, toggle, null, toggle.id, false);
    }
  }
};

/**
 * Begin tests
 */
describe("<pfe-navigation>", () => {
  beforeEach(() => {
    const lightDomCss = document.createElement('link');
    lightDomCss.setAttribute('href', '/elements/pfe-navigation/dist/pfe-navigation--lightdom.css');
    lightDomCss.setAttribute('rel', 'stylesheet');
    document.querySelector('head').append(lightDomCss);
  });

  it("it should upgrade", async () => {
    const nav = await createFixture(testComponent);

    expect(nav).to.be.an.instanceOf(
      customElements.get("pfe-navigation"),
      'pfe-navigation should be an instance of PfeNavigation'
    );
  });


  it("It should get appropriate attributes", async () => {
    // Use the same markup that's declared at the top of the file.
    const nav = await createFixture(testComponent);
    assert.isTrue(
      nav.getAttribute('role') === 'banner',
      "role=banner was not added to the navigation"
    );

    assert.isTrue(
      nav.classList.contains("pfe-navigation--processed"),
      "The navigation was missing the class pfe-navigation--processed, indicating the light DOM has been processed"
    );
  });


  it('Main menu items should be processed with proper HTML in the shadow DOM', async () => {
    const nav = await createFixture(testComponent);
    const mainMenuDropdowns = nav.shadowRoot.querySelectorAll('#pfe-navigation__menu .pfe-navigation__dropdown');

    const menuListItems = nav.shadowRoot.querySelectorAll('#pfe-navigation__menu > li');
    assert.isTrue(
      nav.querySelectorAll('#pfe-navigation__menu > li').length === menuListItems.length,
      "The number of menu items in the light DOM does not match the shadow DOM"
    );

    assert.isTrue(
      nav.querySelectorAll('#pfe-navigation__menu .pfe-navigation__dropdown').length === mainMenuDropdowns.length,
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
      checkToggleAndDropdownState(nav, toggle, dropdownWrapper, machineName, false);
    }
  });

  it('Search toggle visibility', async () => {
    const nav = await createFixture(testComponent);
    const searchButton = nav._searchToggle;
    const searchSlotFilled = nav.hasSlot('search');
    // At tablet or desktop if the search slot has content the toggle should be visible
    if (nav.breakpoint && nav.breakpoint !== 'mobile' && searchSlotFilled) {
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

  it('Dropdowns in secondary link areas should get upgraded', async () => {
    const nav = await createFixture(testComponent);
    const secondaryLinksDropdowns = nav.querySelectorAll('[slot="secondary-links"] pfe-navigation-dropdown');

    // Making sure test runs after nav has been completely processed
    await aTimeout(0);

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
      checkToggleAndDropdownState(nav, toggle, dropdownWrapper, machineName, false);
    }
  });

  it('A toggle and dropdown should get certain attributes when it is active and overlay click should shut', async () => {
    const nav = await createFixture(testComponent);

    const firstMenuLink = nav.shadowRoot.querySelector('.pfe-navigation__menu-link');
    firstMenuLink.click();
    checkToggleAndDropdownState(nav, firstMenuLink, null, firstMenuLink.dataset.machineName, true);
    checkInactiveToggleAndDropdownState(nav, firstMenuLink.id);
    // Making sure test runs after nav has been completely processed
    await aTimeout(0);

    const firstSecondaryLinkDropdown = nav.querySelector('button.pfe-navigation__secondary-link');
    firstSecondaryLinkDropdown.click();
    checkToggleAndDropdownState(nav, firstSecondaryLinkDropdown, null, firstSecondaryLinkDropdown.id, true);
    checkInactiveToggleAndDropdownState(nav, firstSecondaryLinkDropdown.id);

    // Close menu with overlay
    nav._overlay.click();
    assert.isFalse(
      nav.isOpen(),
      'The overlay was clicked and it looks like it didn\'t close the dropdowns'
    );
  });



  // @todo Figure out how to resize screen
  // it('', async () => {
    // const nav = await createFixture(testComponent);
  // });

  // @todo how to simulate tab click
  // it('', async () => {
    // const nav = await createFixture(testComponent);
  // });

  // it('', async () => {
    // const nav = await createFixture(testComponent);
  // });

});
