import '@patternfly/elements/pfe-accordion/pfe-accordion.js';
import '@patternfly/elements/pfe-button/pfe-button.js';
import '@patternfly/elements/pfe-switch/pfe-switch.js';

const bordered = document.getElementById('bordered-example');
const isLarge = document.getElementById('toggle-size');

isLarge.addEventListener('change', function() {
  bordered.toggleAttribute('large', isLarge.checked);
});
