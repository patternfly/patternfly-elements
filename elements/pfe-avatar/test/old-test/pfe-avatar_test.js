suite('<pfe-avatar>', () => {
  test('it should upgrade', () => {
    assert.instanceOf(document.querySelector('pfe-avatar'), customElements.get("pfe-avatar", 'pfe-avatar should be an instance of rhAvatar'));
  });

  test('it should default to pattern: "square"', () => {
    assert.propertyVal(document.querySelector('#default-shape'), 'pattern', 'squares');
  });

  test('it should load a user-provided avatar image', done => {
    // set an onload handler for the image, then set the src of the user-provided avatar
    const rha = document.querySelector('#user-provided');
    const img = rha.shadowRoot.querySelector('img');
    img.addEventListener('load', () => {
      assert.isTrue(img.complete, "image completes loading");
          assert.isAbove(img.naturalWidth, 0, "image has a natural resolution");
      done();
    });
    rha.src="mwcz.jpg";
  }).timeout(1000); // short timeout for this one
});