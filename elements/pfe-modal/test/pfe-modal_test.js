suite('<pfe-modal>', () => {
  test('it should upgrade pfe-modal', () => {
    assert.instanceOf(document.querySelector('pfe-modal'), customElements.get("pfe-modal",
      'pfe-modal should be an instance of PfeModal'));
  });

  test('it should add the proper attributes to the modal window', () => {
    const pfeModal = document.querySelector('pfe-modal');
    const outer = pfeModal.shadowRoot.querySelector('.pfe-modal__outer');
    const modalWindow = pfeModal.shadowRoot.querySelector('.pfe-modal__window');
    const button = pfeModal.shadowRoot.querySelector('.pfe-modal__close');

    assert.isTrue(pfeModal.hasAttribute('has_trigger'));
    assert.isTrue(pfeModal.hasAttribute('has_header'));
    assert.isTrue(pfeModal.hasAttribute('has_body'));
    assert.equal(modalWindow.getAttribute('tabindex'), '0');
    assert.isTrue(modalWindow.hasAttribute('hidden'));
    assert.equal(button.getAttribute('aria-label'), 'Close dialog');
  });

  test('it should open the modal window when the trigger is clicked', () => {
    const pfeModal = document.querySelector('pfe-modal');
    const modalWindow = pfeModal.shadowRoot.querySelector('.pfe-modal__window');
    const button = pfeModal.shadowRoot.querySelector('.pfe-modal__close');
    const trigger = pfeModal.querySelector('[slot=pfe-modal--trigger');

    trigger.click();

    assert.isNotTrue(modalWindow.hasAttribute('hidden'));

    // reset
    button.click();
    assert.isTrue(modalWindow.hasAttribute('hidden'));

  });

  test('it should remove the hidden attribute from the host on upgrade', done => {
    const pfeModal = document.querySelector('pfe-modal');

    flush(() => {
      // test for the hidden attribute on the host
      assert.isNotTrue(pfeModal.hasAttribute('hidden'));
      done();
    });
  });

});