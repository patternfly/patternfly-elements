// Import testing helpers. For more information check out:
// https://open-wc.org/docs/testing/helpers/
import { expect, assert, aTimeout } from '@open-wc/testing/index-no-side-effects.js';
import { setViewport, sendKeys } from '@web/test-runner-commands';

// Import our custom fixture wrapper. This allows us to run tests
// in React and Vue as well as a normal fixture.
import { createFixture } from '../../../test/utils/create-fixture.js';

// Import the element we're testing.
import '../dist/pfe-navigation';

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const testComponent =
  `
  <pfe-navigation id="pfe-navigation" automated-testing>
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

const testBreakpoints = {
  'mobile': {width: 320, height: 568}, // iPhone 5
  'tablet': {width: 768, height: 1024},
  'desktop': {width: 1400, height: 1000},
}

const debounceDelay = 50;

// - Begin Utility Functions ---------------------------------------------------------------------

/**
 * Changes breakpoint for a test
 * @param {String} breakpoint Index of testBreakpoints to use
 */
const changeBreakpointTo = async (breakpoint) => {
  await setViewport(testBreakpoints[breakpoint]);

  // Let resize debounce run
  await aTimeout(debounceDelay);
};

/**
 * Appends search form into provided nav element
 * @param {Element} nav Reference to nav component
 */
 const addSearchForm = (nav) => {
  const searchForm = document.createElement('form');
  searchForm.setAttribute('slot', 'search');
  searchForm.innerHTML =
    `<label for="pfe-navigation__search-field" class="sr-only">Search the Red Hat Customer Portal</label>
    <input id="pfe-navigation__search-field" type="text" placeholder="Search the Red Hat Customer Portal" />
    <button aria-label="Submit Search">Search</button>`;

    nav.append(searchForm);
}

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

  // Don't include the mobile toggle if it isn't visible
  if (pfeNavigation.breakpoint === 'desktop') {
    delete allToggles['mobile__button'];
  }

  // Don't include the search toggle at mobile
  if (pfeNavigation.breakpoint === 'mobile') {
    delete allToggles['secondary-links__button--search'];
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
  // if (toggle.getAttribute('aria-expanded') !== ariaExpanded) {
  //   console.log(toggle.id, toggle.getAttribute('aria-expanded'), pfeNavigation.breakpoint, pfeNavigation.openToggle);
  // }
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
  let parentToggleAndDropdown = false;

  if (activeToggleId) {
    parentToggleAndDropdown = pfeNavigation._getParentToggleAndDropdown(activeToggleId);
  }

  // Check to make sure all other toggles are inactive
  const allTogglesKeys = Object.keys(allToggles);
  for (let index = 0; index < allTogglesKeys.length; index++) {
    const toggleId = allTogglesKeys[index];
    const toggle = allToggles[toggleId];

    // Parent toggles should be active
    if (parentToggleAndDropdown && parentToggleAndDropdown[0].id === toggleId) {
      checkToggleAndDropdownState(pfeNavigation, toggle, null, toggle.id, true);
    }
    else if (activeToggleId !== toggle.id) {
      checkToggleAndDropdownState(pfeNavigation, toggle, null, toggle.id, false);
    }
  }
};

/**
 * Click`s first main menu link and tests state
 * @param {Element} nav Nav Component
 */
const clickFirstMainMenuLink = async (nav) => {
  // If we're not on desktop we need to open the mobile toggle first
  if (nav.breakpoint !== 'desktop' && !nav.isOpen('mobile__button')) {
    const mobileToggle = nav.shadowRoot.getElementById('mobile__button');
    nav.shadowRoot.getElementById('mobile__button').click();
    checkToggleAndDropdownState(nav, mobileToggle, null, mobileToggle.id, true);
    checkInactiveToggleAndDropdownState(nav, mobileToggle.id);
  }

  const firstMenuLink = nav.shadowRoot.querySelector('.pfe-navigation__menu-link');
  firstMenuLink.click();
  checkToggleAndDropdownState(nav, firstMenuLink, null, firstMenuLink.dataset.machineName, true);
  checkInactiveToggleAndDropdownState(nav, firstMenuLink.id);
};

/**
 * Clicks first secondary menu link and tests state
 * @param {Element} nav Nav Component
 */
const clickFirstSecondaryMenuLink = async (nav) => {
  // If we're mobile we need make sure the mobile toggle is open first
  if (nav.breakpoint === 'mobile' && !nav.isOpen('mobile__button')) {
    const mobileToggle = nav.shadowRoot.getElementById('mobile__button');
    mobileToggle.click();
    checkToggleAndDropdownState(nav, mobileToggle, null, mobileToggle.id, true);
    checkInactiveToggleAndDropdownState(nav, mobileToggle.id);
  }
  const firstSecondaryLinkDropdown = nav.querySelector('button.pfe-navigation__secondary-link');
  firstSecondaryLinkDropdown.click();
  checkToggleAndDropdownState(nav, firstSecondaryLinkDropdown, null, firstSecondaryLinkDropdown.id, true);
  checkInactiveToggleAndDropdownState(nav, firstSecondaryLinkDropdown.id);
};

/**
 * Clicks overlay and tests state
 * @param {Element} nav Nav Component
 */
const clickOverlay = async (nav) => {
  // Close menu with overlay
  nav._overlay.click();
  assert.isFalse(
    nav.isOpen(),
    'The overlay was clicked and it looks like it didn\'t close the dropdowns'
  );
  checkInactiveToggleAndDropdownState(nav, false);
};

/**
 * Begin tests
 */
describe("<pfe-navigation>", () => {
  // Var to hold each instance of the nav
  let nav = null;

  // One time setup that runs before tests are
  before(async () => {
    const documentHead = document.querySelector('head');
    const body = document.querySelector('body');
    body.style.margin = 0;
    body.style.padding = 0;

    const lightDomCss = document.createElement('link');
    lightDomCss.setAttribute('href', '/elements/pfe-navigation/dist/pfe-navigation--lightdom.css');
    lightDomCss.setAttribute('rel', 'stylesheet');
    documentHead.append(lightDomCss);
  });

  // Makes a fresh instance of component for each test case
  beforeEach(async () => {
    nav = await createFixture(testComponent);
    // Make sure nav has run postProcessLightDom
    await aTimeout(0);
  });

  it("it should upgrade", async () => {
    expect(nav).to.be.an.instanceOf(
      customElements.get("pfe-navigation"),
      'pfe-navigation should be an instance of PfeNavigation'
    );
  });


  it("It should get appropriate attributes", async () => {
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

  it('Dropdowns in secondary link areas should get upgraded', async () => {
    const secondaryLinksDropdowns = nav.querySelectorAll('[slot="secondary-links"] pfe-navigation-dropdown');

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

  it('Navigation should close when escape key is pressed', async () => {
    await changeBreakpointTo('desktop');

    clickFirstMainMenuLink(nav);

    // Close nav
    await sendKeys({
      press: 'Escape',
    });

    assert.isFalse(
      nav.isOpen(),
      "Nav should shut after escape is pressed"
    )
  });

  it('Navigation state tests at different breakpoints', async () => {
    await changeBreakpointTo('mobile');

    // Check mobile state
    assert.isTrue(
      nav.breakpoint === 'mobile',
      `Expecting nav breakpoint to be mobile at ${testBreakpoints.mobile.width}x${testBreakpoints.mobile.height}`
    );

    await clickFirstMainMenuLink(nav);
    await clickFirstSecondaryMenuLink(nav);

    // Store state to check to make sure it doesn't change at next breakpoint
    let previousBreakpointOpenToggle = nav.openToggle;

    // Make browser tablet
    await changeBreakpointTo('tablet');

    assert.isTrue(
      nav.breakpoint === 'tablet',
      `Expecting nav breakpoint to be tablet at ${testBreakpoints.tablet.width}x${testBreakpoints.tablet.height}`
    );

    assert.isTrue(
      previousBreakpointOpenToggle === nav.openToggle,
      `Expected nav state to stay the same from mobile to tablet, at mobile it was ${previousBreakpointOpenToggle}, at tablet it is ${nav.openToggle}`
    );

    checkToggleAndDropdownState(nav, document.getElementById(nav.openToggle), null, nav.openToggle, true);
    checkInactiveToggleAndDropdownState(nav, nav.openToggle);

    await clickFirstMainMenuLink(nav);
    await clickFirstSecondaryMenuLink(nav);

    previousBreakpointOpenToggle = nav.openToggle;

    // Make browser desktop
    await changeBreakpointTo('desktop');

    assert.isTrue(
      previousBreakpointOpenToggle === nav.openToggle,
      `Expected nav state to stay the same from mobile to tablet, at mobile it was ${previousBreakpointOpenToggle}, at tablet it is ${nav.openToggle}`
    );

    await clickFirstMainMenuLink(nav);
    await clickFirstSecondaryMenuLink(nav);
  });

  it('When focus leaves the navigation it should close', async () => {
    // Open an item
    await clickFirstMainMenuLink(nav);
    const testButton = document.createElement('button');
    testButton.id = 'testButton';
    testButton.innerText = 'Test Button';
    document.querySelector('body').append(testButton);

    assert.isTrue(
      nav.isOpen(),
      "Nav should be open before the focus out test"
    );

    // Tab through the items on the page until the test button is reached
    while (document.activeElement.id !== testButton.id) {
      await sendKeys({
        press: 'Tab',
      });
    }

    await aTimeout(0);

    assert.isTrue(
      !nav.isOpen(),
      "Nav should be shut after focus leaves it"
    );

    // Clean up after ourselves
    testButton.remove();
  });

  it('Test search toggle functionality', async () => {
    await changeBreakpointTo('desktop');

    assert.isFalse(
      nav.classList.contains('pfe-navigation--has-search'),
      "The nav should not have the pfe-navigation--has-search class"
    );
    assert.isTrue(
      nav._searchToggle.offsetWidth === 0,
      "The search toggle should be hidden"
    );

    addSearchForm(nav);

    // Let mutation observer do it's thing
    await aTimeout(0);

    assert.isTrue(
      nav.classList.contains('pfe-navigation--has-search'),
      "The nav should have the pfe-navigation--has-search class"
    );
    assert.isTrue(
      nav._searchToggle.offsetWidth > 0,
      "The search toggle should not be hidden"
    );

    nav._searchToggle.click();

    assert.isTrue(
      nav.isOpen(nav._searchToggle.id),
      "Search should be open when it's clicked on"
    );
    assert.isTrue(
      document.activeElement.id === 'pfe-navigation__search-field',
      "When search is opened the first text field in the search form should get focus"
    );
  });

  it("Make sure search location is in the right spot check per breakpoint", async () => {
    addSearchForm(nav);
    await changeBreakpointTo('mobile');

    assert.isTrue(
      nav._searchToggle.offsetWidth === 0,
      "Search button should be hidden at mobile"
    );

    assert.isTrue(
      nav.querySelector('#pfe-navigation__search-field').offsetWidth === 0,
      "Search field should be hidden when the mobile toggle is shut"
    );

    nav._mobileToggle.click();

    assert.isTrue(
      nav.querySelector('#pfe-navigation__search-field').offsetWidth > 0,
      "Search button should be visible when mobile dropdown is open"
    );

    assert.isTrue(
      nav._searchSpotXs.querySelector('slot') !== null,
      'The nav slot should be in the extra small wrapper in the mobile dropdown'
    );

    // Close nav
    while (nav.isOpen()) {
      await sendKeys({
        press: 'Escape',
      });
    }

    await changeBreakpointTo('tablet');

    assert.isTrue(
      nav._searchSpotMd.querySelector('slot') !== null,
      'The nav slot should be in the medium wrapper in the mobile dropdown'
    );

  });
});
