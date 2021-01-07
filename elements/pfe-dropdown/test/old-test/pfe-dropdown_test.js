suite('<pfe-dropdown>', () => {
  test('it should set the toggle text to the value of the pfe-label attribute', () => {
    const element = document.querySelector('pfe-dropdown');
    const toggleText = element.shadowRoot.querySelector('button').textContent.trim();

    assert.equal(toggleText, "Test dropdown");
  });

  test('it should toggle the menu open and closed when clicked', () => {
    const element = document.querySelector('pfe-dropdown');
    const toggle = element.shadowRoot.querySelector('button');
    const list = element.shadowRoot.querySelector('ul');

    // open
    toggle.click();

    assert.equal(toggle.getAttribute("aria-expanded"), "true");
    assert.equal(list.classList[1], "open");

    // close
    toggle.click();

    assert.equal(toggle.getAttribute("aria-expanded"), "false");
    assert.notEqual(list.classList[1], "open");
  });

  test('it should close the menu when clicked outside the component', () => {
    const element = document.querySelector('pfe-dropdown');
    const toggle = element.shadowRoot.querySelector('button');
    const list = element.shadowRoot.querySelector('ul');

    // click anywhere outside the pfe-dropdown component
    element.click();

    assert.equal(toggle.getAttribute("aria-expanded"), "false");
    assert.notEqual(list.classList[1], "open");
  });

  test('it should set the appropriate a11y attributes when pfe-item-type is "link"', () => {
    // @TODO
    // this should be addressed here: https://github.com/patternfly/patternfly-elements/issues/1010
    if (window.Vue || window.React) {
      return;
    }

    const element = document.querySelector('pfe-dropdown');
    const listItem = element.querySelector("[pfe-item-type=link]").shadowRoot.querySelector("li");
    const listItemRole = listItem.getAttribute("role");
    const link = listItem.querySelector('slot').assignedElements()[0];
    const linkRole = link.getAttribute("role");
    assert.equal(listItemRole, "none");
    assert.equal(linkRole, "menuitem");
  });

  test('it should set the appropriate a11y attributes when pfe-item-type is "action"', () => {
    const element = document.querySelector('pfe-dropdown');
    const listItem = element.querySelector("[pfe-item-type=action]").shadowRoot.querySelector("li");
    const listItemRole = listItem.getAttribute("role");

    assert.equal(listItemRole, "menuitem");
  });

  test('it should set a11y attributes when pfe-item-type is "separator"', () => {
    const element = document.querySelector('pfe-dropdown');
    const listItem = element.querySelector("[pfe-item-type=separator]").shadowRoot.querySelector("li");
    const listItemRole = listItem.getAttribute("role");

    assert.equal(listItemRole, "separator");
  });

  test('it should set a11y attributes when the disabled attribute is present on the dropdown', () => {
    const element = document.getElementById('disabledDropdown');

    assert.equal(element.getAttribute("aria-disabled"), "true");

    element.removeAttribute("is_disabled");

    assert.equal(element.getAttribute("aria-disabled"), "false");
  });

  test('it should set a11y attributes when the disabled attribute is present on a dropdown item', () => {
    const disabledItem = document.getElementById('disabledItem');

    assert.equal(disabledItem.getAttribute("aria-disabled"), "true");

    disabledItem.removeAttribute("is_disabled");

    assert.equal(disabledItem.getAttribute("aria-disabled"), "false");
  });

  test("it should create dropdown options through addDropdownOptions API", done => {
    const customDropdown = document.getElementById('customDropdown');

    const options = [
      { href: "https://bit.ly/3b9wvWg", text: "Link 1", type: "link", is_disabled: false },
      { href: "https://bit.ly/3b9wvWg", text: "Link 2", type: "link", is_disabled: false },
      { href: "https://bit.ly/3b9wvWg", text: "Link 3", type: "link", is_disabled: true },
      { type: "separator" },
      { text: "Action 1", type: "action", is_disabled: false },
      { text: "Action 2", type: "action", is_disabled: true }
    ];

    // setting JS options using addDropdownOptions API
    customDropdown.addDropdownOptions(options);

    flush(() => {
      assert.equal(customDropdown.children.length, options.length);
      done();
    });

  });

  test("it should not have event.preventDefault called on elements outside of the dropdown", () => {
    const checkbox = document.querySelector("#checkbox");
    checkbox.click();

    assert.isTrue(checkbox.checked);
  });
});