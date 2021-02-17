const slots = [ "skip", "logo", "search", "language", "mobile-language", "login", "mobile-login", "site-switcher" ];
const pfeNavigation = document.querySelector('pfe-navigation');
const pfeNavigationMain = document.querySelector('pfe-navigation-main');
const pfeNavigationItems = document.querySelectorAll('pfe-navigation-item');

suite('<pfe-navigation>', () => {
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
