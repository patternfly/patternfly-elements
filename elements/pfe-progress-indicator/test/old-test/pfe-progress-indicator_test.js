suite('<pfe-progress-indicator>', () => {
  test('it should upgrade', () => {
    assert.instanceOf(document.querySelector('pfe-progress-indicator'), customElements.get("pfe-progress-indicator", 'pfe-progress-indicator should be an instance of pfeProgressIndicator'));
  });
  
  test('it should have the proper animation css', () => {
    assert(document.querySelector('pfe-progress-indicator').style.animation = 'spin 1s linear infinite');
  });

  test("it should properly initialize when the contents of the slot change", done => {
    const pfeProgressIndicator = document.querySelector("pfe-progress-indicator");

    pfeProgressIndicator.innerHTML = `<p>My loading message...</p>`;
    flush(() => {
      assert.equal(pfeProgressIndicator.innerHTML, '<p>My loading message...</p>');
      done();
    });
  });

  test("it should log a warning if there is no backup loading message", done => {
    const pfeProgressIndicator = document.querySelector("pfe-progress-indicator");
    pfeProgressIndicator.innerHTML = `<p>My loading message...</p>`;
    flush(() => {
      assert.equal(pfeProgressIndicator.innerHTML, '<p>My loading message...</p>');
      done();
    });
  });
});