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

  const controlledActiveElement = document.getElementById(toggle.getAttribute('aria-controls'));
  assert.strictEqual(
    controlledActiveElement.getAttribute('aria-hidden'),
    'false',
    "Active detail wrapper doesn't have aria-hidden set to false"
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
        "Inactive toggle has aria-selected not set to false"
      );
      // Check detail wrapper for state attribute
      const controlledElement = document.getElementById(toggle.getAttribute('aria-controls'));
      assert.strictEqual(
        controlledElement.getAttribute('aria-hidden'),
        'true',
        "Inactive detail element does not have aria-hidden set to true"
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

suite("<pfe-primary-detail>", () => {
  const elements = [...document.querySelectorAll("pfe-primary-detail")];
  const defaultWrapper = document.getElementById('default');
  const primaryDetailComponents = document.querySelectorAll('pfe-primary-detail');

  test("it should upgrade", () => {
    assert.instanceOf(
      document.getElementById('default'),
      customElements.get("pfe-primary-detail"),
      "pfe-primary-detail should be an instance of pfePrimaryDetail"
    );
  });

  test("Component should get proper attributes", () => {
    for (let index = 0; index < primaryDetailComponents.length; index++) {
      assert.strictEqual(
        primaryDetailComponents[index].getAttribute('role'),
        'tablist',
        "Primary detail component should have a role of tablist"
      );

      assert.strictEqual(
        primaryDetailComponents[index].getAttribute('aria-orientation'),
        'vertical',
        "Primary detail component should have a aria-orientation set to vertical"
      );
    }
  });

  test("Aria attributes on nav and detail wrappers should point to valid ids", () => {
    const defaultWrapper = document.getElementById('default');
    const toggles = defaultWrapper.querySelectorAll('[slot="details-nav"]');
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

  test("First element should be active by default", () => {
    for (let index = 0; index < primaryDetailComponents.length; index++) {
      const activeToggle = primaryDetailComponents[index].querySelector("[aria-selected='true']");
      assert.isNotNull(activeToggle, "Could not find active toggle");
      assert.isTrue(activeToggle.dataset.index === '0', "Default active Toggle does appear to be the first");
      // Make sure the toggle and detail both have the correct attributes
      checkActiveElementAttributes(activeToggle);
    }
  });

  test("Active and inactive toggles & details should have proper attributes", () => {
    const defaultWrapper = document.getElementById('default');
    const activeToggles = defaultWrapper.querySelectorAll('[slot="details-nav"][aria-selected="true"]');
    // Only one active element at a time
    assert.isTrue(activeToggles.length === 1);

    checkActiveElementAttributes(activeToggles[0]);
    checkInactiveElementsAttributes(defaultWrapper, activeToggles[0].id);
  });

  test("When an inactive toggle is clicked, it should become active and all others inactive", () => {
    const defaultWrapper = document.getElementById('default');
    const inactiveToggles = defaultWrapper.querySelectorAll('[slot="details-nav"][aria-selected="false"]');
    const randomToggleToActivate = inactiveToggles[Math.floor(Math.random() * inactiveToggles.length)];

    randomToggleToActivate.click();
    checkActiveElementAttributes(randomToggleToActivate);
    checkInactiveElementsAttributes(defaultWrapper, randomToggleToActivate.id);
  });

  test("Specified ids should not be overridden", () => {
    const defaultWrapper = document.getElementById('default');
    const detailNavWithId = defaultWrapper.querySelector('#hasIdNav');
    const detailWithId = defaultWrapper.querySelector('#hasIdNav');

    assert.isNotNull(detailNavWithId);
    // Another test should have failed if this was an issue,
    // BUT want to make sure that the element with ID is processed and the ID was maintained
    assert.isTrue(
      detailNavWithId.hasAttribute('data-index'),
      "Detail nav appears to be in default state and wasn't processed?"
    );

    assert.isNotNull(detailWithId);
  });

  test("Dynamically added content should be processed, have correct attributes, and update when selected", done => {
    // Test prepended dynamic content
    const defaultWrapper = document.getElementById('default');
    let activeToggle = defaultWrapper.querySelector('[aria-selected="true"]');
    let prependedNavItem, prependedDetail, appendedNavItem, appendedDetail;
    [prependedNavItem, prependedDetail] = addPrimaryDetailsElementContent(defaultWrapper, 'prepend');
    [appendedNavItem, appendedDetail] = addPrimaryDetailsElementContent(defaultWrapper, 'append');

    flush(() => {
      // test dynamically prepended content
      const firstNavItem = defaultWrapper.querySelector("[role=tab]");
      const firstDetail = defaultWrapper.querySelector("div");
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

      // test dynamically appened content
      activeToggle = defaultWrapper.querySelector('[aria-selected="true"]');

      const lastNavItem = defaultWrapper.querySelector("h3:last-of-type");
      const lastDetail = defaultWrapper.querySelector("div:last-of-type");
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
        "Dynamically appended content is not set as the first item"
      );

      assert.strictEqual(
        lastNavItem.dataset.index,
        lastDetail.dataset.index,
        "Dynamically appended toggle and detail do not have the same index"
      );

      done();
    });
  });

  test("it should fire a pfe-primary:hidden-tab event when a tab is closed", () => {
    const primaryDetailElement = document.querySelector("#default");
    const toggles = primaryDetailElement.querySelectorAll('[slot="details-nav"]');
    const activeTab = primaryDetailElement.querySelector('[aria-selected="true"');
    const activeDetail = primaryDetailElement.querySelector(`#${activeTab.getAttribute("aria-controls")}`);
    const secondToggle = toggles[1];
    const handlerSpy = sinon.spy();

    document.addEventListener("pfe-primary-detail:hidden-tab", handlerSpy);
    secondToggle.click();

    sinon.assert.calledOnce(handlerSpy);

    const eventDetail = handlerSpy.getCall(0).args[0].detail;
    assert.equal(eventDetail.tab.id, activeTab.id);
    assert.equal(eventDetail.details.id, activeDetail.id);

    document.removeEventListener("pfe-primary-detail:hidden-tab", handlerSpy);

  });

  test("it should fire a pfe-primary:shown-tab event when a tab is closed", () => {
    const primaryDetailElement = document.querySelector("#default");
    const toggles = primaryDetailElement.querySelectorAll('[slot="details-nav"]')
    const thirdToggle = toggles[2];
    const thirdDetail = primaryDetailElement.querySelector(`#${thirdToggle.getAttribute("aria-controls")}`);
    const handlerSpy = sinon.spy();

    document.addEventListener("pfe-primary-detail:shown-tab", handlerSpy);
    thirdToggle.click();

    sinon.assert.calledOnce(handlerSpy);
    const eventDetail = handlerSpy.getCall(0).args[0].detail;

    assert.equal(eventDetail.tab.id, thirdToggle.id);
    assert.equal(eventDetail.details.id, thirdDetail.id);
    document.removeEventListener("pfe-primary-detail:shown-tab", handlerSpy);
  });
});
