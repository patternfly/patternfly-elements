suite('<pfe-toast>', () => {
  test('it should be hidden by default', () => {
    const pfeToast = document.getElementById('test');

    assert.isTrue(pfeToast.hasAttribute('hidden'));
  });

  test('it should open programmatically', done => {
    const pfeToast = document.getElementById('test');

    pfeToast.open();

    flush(() => {
      setTimeout(() => {
        assert.isFalse(pfeToast.hasAttribute('hidden'));
        assert.isTrue(pfeToast.classList.contains('open'));
        done();
      }, 600);
    });
  });

  test('it should close programmatically', done => {
    const pfeToast = document.getElementById('test');
  
    pfeToast.close();
    
    flush(() => {
      setTimeout(() => {
        assert.isTrue(pfeToast.hasAttribute('hidden'));
        assert.isFalse(pfeToast.classList.contains('open'));
        done();
      }, 600);
    });
  });

  test('it should auto-dimiss after the provided time', () => { 
    const pfeToast = document.getElementById('autoDismiss');
    const autoDismissDelay = pfeToast.getAttribute('auto-dismiss');

    pfeToast.open();

    flush(() => {
      setTimeout(() => {
        assert.equal(autoDismissDelay, "500", "auto-dismiss should have provided value");
        assert.isTrue(pfeToast.hasAttribute('hidden'));
        assert.isFalse(pfeToast.classList.contains('open'));
        done();
      }, autoDismissDelay * 2);
    });

  });

  test('it should have the right attributes when auto-dismiss enabled', () => { 
    // test a11y attributes once finalized (waiting for feedback)
  });

  test('it should have the right attributes when auto-dismiss disabled', () => { 
    // test a11y attributes once finalized (waiting for feedback)
  });

});