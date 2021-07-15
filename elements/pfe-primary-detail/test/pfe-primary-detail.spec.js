// Import testing helpers. For more information check out:
// https://open-wc.org/docs/testing/helpers/
import { expect, assert, aTimeout, oneEvent } from '@open-wc/testing/index-no-side-effects.js';
import { setViewport, sendKeys } from '@web/test-runner-commands';

// Import our custom fixture wrapper. This allows us to run tests
// in React and Vue as well as a normal fixture.
import { createFixture } from '../../../test/utils/create-fixture.js';

// Import the element we're testing.
import '../dist/pfe-primary-detail';

const testBreakpoints = {
  'mobile':  {width: 320, height: 568}, // iPhone 5
  'tablet':  {width: 768, height: 1024},
  'desktop': {width: 1400, height: 1000},
}

const debounceDelay = 50;

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const testComponent =
  `
  <pfe-primary-detail id="default" automated-testing>
    <h3 slot="details-nav">Infrastructure and Management</h3>
    <div slot="details">
      <ul>
        <li><a href="#nowhere">Lorum ipsum dolor sit amet</a></li>
        <li><a href="#nowhere">Aliquam tincidunt mauris eu risus</a></li>
        <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
        <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
      </ul>
    </div>

    <h3 slot="details-nav">Cloud Computing</h3>
    <div slot="details">
      <ul>
        <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
        <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
        <li><a href="#nowhere">Lorum ipsum dolor sit amet</a></li>
        <li><a href="#nowhere">Aliquam tincidunt mauris eu risus</a></li>
        <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
        <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
        <li><a href="#nowhere">Lorum ipsum dolor sit amet</a></li>
        <li><a href="#nowhere">Aliquam tincidunt mauris eu risus</a></li>
        <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
        <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
      </ul>
    </div>

    <h3 slot="details-nav" id="hasIdNav">Storage</h3>
    <div slot="details" id="hasIdDetails">
      <ul>
        <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
        <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
      </ul>
    </div>

    <h3 slot="details-nav">Runtimes</h3>
    <div slot="details">
      <ul>
        <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
        <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#nowhere">Aliquam tincidunt mauris eu risus</a></li>
        <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
      </ul>
    </div>

    <div slot="details-nav--footer" style="padding: 1em 0.75em 2em;">
      <pfe-cta priority="primary"><a href="#">All Products</a></pfe-cta>
    </div>
  </pfe-primary-detail>
  `;

// - Begin Utility Functions ---------------------------------------------------------------------
/**
 * Make sure active toggle and detail have the correct attributes
 * @param {object} toggle DOM Object of a toggle element
 */
 function checkActiveElementAttributes(toggle) {
  assert.strictEqual(
    toggle.getAttribute('aria-selected'),
    'true',
    "Active toggle element doesn't have aria-selected set to true"
  );

  assert.isFalse(
    toggle.hasAttribute('tabindex'),
    "The toggle should not have a tabindex attribute when it is active"
  );

  const ariaSelected = toggle.getAttribute('aria-selected');
  assert.strictEqual(
    ariaSelected,
    "true",
    `The toggle should have aria-selected set to true, it is set to ${ariaSelected}`
  );

  const controlledActiveElement = document.getElementById(toggle.getAttribute('aria-controls'));
  assert.strictEqual(
    controlledActiveElement.hasAttribute('hidden'),
    false,
    "Active detail wrapper should not have hidden attribute"
  );

  assert.strictEqual(
    controlledActiveElement.hasAttribute('aria-hidden'),
    false,
    "Active detail wrapper should not have the aria-hidden attribute"
  );
}

/**
 * Make sure active toggle and detail have the correct attributes
 * @param {object} wrapper Component wrapper DOM object
 * @param {string} activeToggleId ID of the active toggle
 */
function checkInactiveElementsAttributes(wrapper, activeToggleId) {
  const toggles = wrapper.querySelectorAll('[slot="details-nav"]');
  for (let index = 0; index < toggles.length; index++) {
    const toggle = toggles[index];
    // Don't check active toggle
    if (toggle.id !== activeToggleId) {
      assert.strictEqual(
        toggle.getAttribute('aria-selected'),
        'false',
        "Inactive toggle should have aria-selected=false"
      );
      // Check detail wrapper for state attribute
      const controlledElement = document.getElementById(toggle.getAttribute('aria-controls'));
      assert.strictEqual(
        controlledElement.hasAttribute('hidden'),
        true,
        "Inactive detail element should have the hidden attribute"
      );

      assert.strictEqual(
        controlledElement.getAttribute('aria-hidden'),
        'true',
        "Inactive detail element should have aria-hidden set to true"
      );

    }
  }
}

/**
 * Adds a new Detail and Detail Nav item to PFE Primary Detail Component
 * @param {object} primaryDetailElement Optional, DOM Object for the component wrapper
 * @param {string} preOrAppend Optional, should be set to 'prepend' or 'append' Whether to add the new items at the end or the beginning
 * @returns {array} First index is a pointer to the Detail Nav item, the second is a pointer to the content
 */
function addPrimaryDetailsElementContent(primaryDetailElement, preOrAppend) {
  if (typeof primaryDetailElement === 'undefined') {
    primaryDetailElement = document.querySelector('pfe-primary-detail');
  }
  if (typeof preOrAppend === 'undefined') {
    preOrAppend = 'append';
  }
  var newDetailNavItem = document.createElement('h3');
  newDetailNavItem.innerText = 'Dynamically added';
  newDetailNavItem.setAttribute('slot', 'details-nav');

  var newDetailContent = document.createElement('div');
  newDetailContent.innerHTML = '<ul><li><a href="#nowhere">Dynamic Lorum ipsum dolor sit amet</a></li><li><a href="#nowhere">Aliquam tincidunt mauris eu risus</a></li><li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li><li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li><li><a href="#nowhere">Pellentesque fermentum dolor</a></li></ul>';
  newDetailContent.setAttribute('slot', 'details');

  switch (preOrAppend) {
    case 'prepend':
      primaryDetailElement.prepend(newDetailContent);
      primaryDetailElement.prepend(newDetailNavItem);
      break;
    case 'append':
      primaryDetailElement.append(newDetailNavItem);
      primaryDetailElement.append(newDetailContent);
      break;
    default:
      console.error('addPrimaryDetailsElementContent: preOrAppend not set correctly');
      break;
  }

  return [newDetailNavItem, newDetailContent];
}

/**
 * Begin tests
 */
 describe("<pfe-primary-detail>", () => {
  // Var to hold each instance of the nav
  let primaryDetail = null;

  // Makes a fresh instance of component for each test case
  beforeEach(async () => {
    // Sets the viewport to desktop for every test
    await setViewport(testBreakpoints['desktop']);
    primaryDetail = await createFixture(testComponent);
  });

  it("it should upgrade", async () => {
    expect(primaryDetail).to.be.an.instanceOf(
      customElements.get("pfe-primary-detail"),
      'pfe-primary-detail should be an instance of PfePrimaryDetail'
    );
  });

  it("Component should get proper attributes", () => {
    assert.strictEqual(
      primaryDetail.getAttribute('role'),
      'tablist',
      "Primary detail component should have a role of tablist"
    );

    assert.strictEqual(
      primaryDetail.getAttribute('aria-orientation'),
      'vertical',
      "Primary detail component should have a aria-orientation set to vertical"
    );
  });

  it("Aria attributes on nav and detail wrappers should point to valid ids", () => {
    const toggles = primaryDetail.querySelectorAll('[slot="details-nav"]');
    for (let index = 0; index < toggles.length; index++) {
      const toggle = toggles[index];
      const ariaControls = toggle.getAttribute('aria-controls');

      assert.strictEqual(
        toggle.getAttribute('role'),
        'tab',
        "Toggle's role is not set to tab"
      );

      // Get the details (controlled) element
      const controlledElement = document.getElementById(ariaControls);
      assert.isNotNull(
        controlledElement,
        "Toggle does not have a valid ID in aria-controls"
      );

      assert.strictEqual(
        controlledElement.getAttribute('role'),
        'tabpanel',
        "Detail element does not have role set to tabpanel"
      );

      assert.strictEqual(
        controlledElement.getAttribute('aria-labelledby'),
        toggle.id,
        "Detail element does not have it's toggle's ID in aria-labelledby"
      );

      assert.strictEqual(
        controlledElement.dataset.index,
        toggle.dataset.index,
        "A toggle and it's detail wrapper don't have the same index"
      );
    }
  });

  it("First element should be active by default", () => {
    const activeToggle = primaryDetail.querySelector("[aria-selected='true']");
    assert.isNotNull(activeToggle, "Could not find active toggle");
    assert.isTrue(activeToggle.dataset.index === '0', "Default active Toggle does appear to be the first");
    // Make sure the toggle and detail both have the correct attributes
    checkActiveElementAttributes(activeToggle);
  });

  it("Active and inactive toggles & details should have proper attributes", () => {
    const activeToggles = primaryDetail.querySelectorAll('[slot="details-nav"][aria-selected="true"]');
    // Only one active element at a time
    assert.isTrue(activeToggles.length === 1);

    checkActiveElementAttributes(activeToggles[0]);
    checkInactiveElementsAttributes(primaryDetail, activeToggles[0].id);
  });

  it("When an inactive toggle is clicked, it should become active and all others inactive", () => {
    const inactiveToggles = primaryDetail.querySelectorAll('[slot="details-nav"][aria-selected="false"]');
    const randomToggleToActivate = inactiveToggles[Math.floor(Math.random() * inactiveToggles.length)];

    randomToggleToActivate.click();
    checkActiveElementAttributes(randomToggleToActivate);
    checkInactiveElementsAttributes(primaryDetail, randomToggleToActivate.id);
  });

  it("Specified ids should not be overridden", () => {
    const detailNavWithId = primaryDetail.querySelector('#hasIdNav');
    const detailWithId = primaryDetail.querySelector('#hasIdNav');

    assert.isNotNull(detailNavWithId);
    // Another test should have failed if this was an issue,
    // BUT want to make sure that the element with ID is processed and the ID was maintained
    assert.isTrue(
      detailNavWithId.hasAttribute('data-index'),
      "Detail nav appears to be in default state and wasn't processed?"
    );

    assert.isNotNull(detailWithId);
  });

  it("Dynamically added content should be processed, have correct attributes, and update when selected", async () => {
    // Test prepended dynamic content
    let activeToggle = primaryDetail.querySelector('[aria-selected="true"]');
    let prependedNavItem, prependedDetail, appendedNavItem, appendedDetail;
    [prependedNavItem, prependedDetail] = addPrimaryDetailsElementContent(primaryDetail, 'prepend');

    // Give a little time for the component to process the new content
    await aTimeout(0);

    // Set vars to test dynamically added content
    const firstNavItem = primaryDetail.querySelector('[slot="details-nav"]');
    const firstDetail = primaryDetail.querySelector("div");
    const firstDetailMenuItem = firstDetail.querySelector("li a");
    const prependedDetailFirstMenuItem = prependedDetail.querySelector("li a");

    assert.strictEqual(
      prependedNavItem.textContent,
      firstNavItem.textContent,
      "Dynamically prepended content text is not equal to the prepended nav item"
    );

    assert.strictEqual(
      firstDetailMenuItem.textContent,
      prependedDetailFirstMenuItem.textContent,
      "Dynamically prepended detail menu does not equal the text of the first detail menu item"
    );

    assert.strictEqual(
      firstNavItem.dataset.index,
      "0",
      "Dynamically prepended content is not set as the first item"
    );

    assert.strictEqual(
      firstNavItem.dataset.index,
      firstDetail.dataset.index,
      "Dynamically prepended toggle and detail do not have the same index"
    );

    assert.strictEqual(
      activeToggle.getAttribute('aria-selected'),
      'true',
      "Active toggle should not change when new content is added to the component"
    );


    // Set the currently active element before we append anything
    activeToggle = primaryDetail.querySelector('[aria-selected="true"]');
    // Append a new nav item and detail and set them to vars for testing
    [appendedNavItem, appendedDetail] = addPrimaryDetailsElementContent(primaryDetail, 'append');

    // Give a little time for the component to process the new content
    await aTimeout(0);

    const navItems = primaryDetail.querySelectorAll('[slot="details-nav"]');
    const lastNavItem = navItems[navItems.length - 1];
    const lastDetail = primaryDetail.querySelector("div:last-of-type");
    const lastDetailMenuItem = lastDetail.querySelector("li a");
    const appendedDetailFirstMenuItem = appendedDetail.querySelector("li a");

    assert.strictEqual(
      appendedNavItem.textContent,
      lastNavItem.textContent,
      "Dynamically appended content text is not equal to the appended nav item"
    );

    assert.strictEqual(
      lastDetailMenuItem.textContent,
      appendedDetailFirstMenuItem.textContent,
      "Dynamically appended detail menu does not equal the text of the last detail menu item"
    );

    assert.strictEqual(
      lastNavItem.dataset.index,
      "5",
      "Dynamically appended content is not set as the last item"
    );

    assert.strictEqual(
      lastNavItem.dataset.index,
      lastDetail.dataset.index,
      "Dynamically appended toggle and detail do not have the same index"
    );
  });

  it("Component should go down to mobile at the size in the breakpoint attribute", async () => {
    const activeToggle = primaryDetail.querySelector('[aria-selected="true"]');

    assert.strictEqual(
      primaryDetail.getAttribute('breakpoint'),
      "desktop",
      `Component should say it's at desktop breakpoint at ${testBreakpoints.desktop.width}x ${testBreakpoints.desktop.height}`,
    );

    await setViewport(testBreakpoints.mobile);
    await aTimeout(debounceDelay);

    assert.strictEqual(
      primaryDetail.getAttribute('breakpoint'),
      "compact",
      `Component should say it's at compact breakpoint at ${testBreakpoints.mobile.width}x ${testBreakpoints.mobile.height}`,
    );

    const postResizeActiveToggle = primaryDetail.querySelector('[aria-selected="true"]');
    assert.isNotNull(
      postResizeActiveToggle,
      "After breakpoint was changed to mobile, there should still be an active toggle"
    );

    assert.strictEqual(
      activeToggle.id,
      postResizeActiveToggle.id,
      "The toggle that was active at desktop should still be active at mobile"
    );
  });

  it("it should fire a pfe-primary:hidden-tab event when a tab is closed", async () => {
    const detailNavs = primaryDetail.querySelectorAll('[slot="details-nav"]');
    const activeDetailNav = primaryDetail.querySelector('[aria-selected="true"]');
    const activeDetails = document.getElementById(activeDetailNav.getAttribute("aria-controls"));
    const secondDetailNav = detailNavs[1];
    const secondDetails = document.getElementById(secondDetailNav.getAttribute('aria-controls'));
    const desktopEventListener = oneEvent(primaryDetail, 'pfe-primary-detail:hidden-tab');

    // Click on secondDetailNav which will close the activeDetailNav
    secondDetailNav.click();

    const desktopEvent = await desktopEventListener;
    assert.strictEqual(
      desktopEvent.detail.tab.id,
      activeDetailNav.id,
      `Since "${activeDetailNav.innerText}" detailNav was closed the pfe-primary-detail:hidden-tab's event.detail.tab should point to that detailNav`
    );

    assert.strictEqual(
      desktopEvent.detail.details.id,
      activeDetails.id,
      `Since "${activeDetailNav.innerText}" detailNav was closed the pfe-primary-detail:hidden-tab's event.detail.details should point to the detail pane corresponding to the closed detailNav`
    );

    const secondActiveDetailNav = [];
    secondActiveDetailNav.push(primaryDetail.querySelector('[aria-selected="true"]'));

    await setViewport(testBreakpoints.mobile);
    await aTimeout(debounceDelay);
    const mobileEventListener = oneEvent(primaryDetail, 'pfe-primary-detail:hidden-tab');

    // Test mobile back button and event firing
    const backButton = primaryDetail.shadowRoot.getElementById('details-wrapper__back');
    backButton.click();
    const mobileEvent = await mobileEventListener;
    secondActiveDetailNav.push(primaryDetail.querySelector('[aria-selected="true"]'));

    assert.strictEqual(
      mobileEvent.detail.tab.id,
      secondDetailNav.id,
      `Since "${secondDetailNav.innerText}" detailNav was closed the pfe-primary-detail:hidden-tab's event.detail.tab should point to that detailNav`
    );

    assert.strictEqual(
      mobileEvent.detail.details.id,
      secondDetails.id,
      `Since "${secondDetailNav.innerText}" detailNav was closed the pfe-primary-detail:hidden-tab's event.detail.details should point to the detail pane corresponding to the closed detailNav`
    );
  });

  it("it should fire a pfe-primary:shown-tab event when a tab is opened", async () => {
    const detailNavs = primaryDetail.querySelectorAll('[slot="details-nav"]');
    const secondDetailNav = detailNavs[1];
    const secondDetails = document.getElementById(secondDetailNav.getAttribute('aria-controls'));
    const eventListener = oneEvent(primaryDetail, 'pfe-primary-detail:shown-tab');

    // Click on secondDetailNav which will close the activeDetailNav
    secondDetailNav.click();

    const {detail} = await eventListener;
    assert.strictEqual(
      detail.tab.id,
      secondDetailNav.id,
      `Since "${secondDetailNav.innerText}" detailNav was closed the pfe-primary-detail:shown-tab's event.detail.tab should point to that detailNav`
    );

    assert.strictEqual(
      detail.details.id,
      secondDetails.id,
      `Since "${secondDetailNav.innerText}" detailNav was closed the pfe-primary-detail:shown-tab's event.detail.details should point to the detail pane corresponding to the closed detailNav`
    );
  });
});
