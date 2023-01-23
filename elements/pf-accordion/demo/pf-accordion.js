import '@patternfly/elements/pf-accordion/pf-accordion.js';
import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-switch/pf-switch.js';

const bordered = document.getElementById('bordered-example');
const isLarge = document.getElementById('toggle-size');

isLarge.addEventListener('change', function() {
  bordered.toggleAttribute('large', isLarge.checked);
});
