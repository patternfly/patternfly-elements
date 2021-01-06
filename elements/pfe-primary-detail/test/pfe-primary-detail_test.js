const elements = [...document.querySelectorAll("pfe-primary-detail")];

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

suite("<pfe-primary-detail>", () => {
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
    const toggles = defaultWrapper.querySelectorAll('[slot="details-nav"]');
    for (let index = 0; index < toggles.length; index++) {
      const toggle = toggles[index];
      const ariaControls = toggle.getAttribute('aria-controls');

      assert.strictEqual(
        toggle.getAttribute('role'),
        'tab',
        "Toggle's role is not set to tab"
      );

      assert.strictEqual(
        toggle.tagName,
        'BUTTON',
        "Toggle's tag is not button"
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
    const activeToggles = defaultWrapper.querySelectorAll('[slot="details-nav"][aria-selected="true"]');
    // Only one active element at a time
    assert.isTrue(activeToggles.length === 1);

    checkActiveElementAttributes(activeToggles[0]);
    checkInactiveElementsAttributes(defaultWrapper, activeToggles[0].id);
  });

  test("When an inactive toggle is clicked, it should become active and all others inactive", () => {
    const inactiveToggles = defaultWrapper.querySelectorAll('[slot="details-nav"][aria-selected="false"]');
    const randomToggleToActivate = inactiveToggles[Math.floor(Math.random() * inactiveToggles.length)];

    randomToggleToActivate.click();
    checkActiveElementAttributes(randomToggleToActivate);
    checkInactiveElementsAttributes(defaultWrapper, randomToggleToActivate.id);
  });

  test("Specified ids should not be overridden", () => {
    const detailNavWithId = defaultWrapper.querySelector('#hasIdNav');
    const detailWithId = defaultWrapper.querySelector('#hasIdNav');

    assert.isNotNull(detailNavWithId);
    // Another test should have failed if this was an issue,
    // BUT want to make sure that the element with ID is processed and the ID was maintained
    assert.isTrue(
      detailNavWithId.tagName === 'BUTTON',
      "Detail nav appears to be in default state and wasn't processed?"
    );

    assert.isNotNull(detailWithId);
  });

  // Write tests for each slot

});
