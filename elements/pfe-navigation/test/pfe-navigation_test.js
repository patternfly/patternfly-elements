let pfeNavigation = null;

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

  // test('', () => {
  // });

  // test('', () => {
  // });


});
