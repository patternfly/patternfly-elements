import '@patternfly/pfe-accordion';
import '@patternfly/pfe-button';
import '@patternfly/pfe-switch';

const bordered = document.getElementById('bordered-example');
const isLarge = document.getElementById('toggle-size');

isLarge.addEventListener('change', function() {
  bordered.toggleAttribute('large', isLarge.checked);
});
