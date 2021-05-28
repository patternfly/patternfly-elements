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

  test('it should upgrade', () => {
    assert.instanceOf(
      document.querySelector('pfe-navigation'),
      customElements.get("pfe-navigation", 'pfe-navigation should be an instance of PfeNavigation')
    );
  });

  test('it should get the processed class', () => {
    assert.isTrue(
      pfeNavigation.classList.contains("pfe-navigation--processed"),
      "The navigation was missing the class pfe-navigation--processed, indicating the light DOM has been processed"
    );
  });

  test('a toggle and dropdown should get certain attributes when it is active', () => {
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
