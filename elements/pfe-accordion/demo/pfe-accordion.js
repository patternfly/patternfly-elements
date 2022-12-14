import '@patternfly/pfe-accordion';
import '@patternfly/pfe-button';
import '@patternfly/pfe-card';
import '@patternfly/pfe-jump-links';
import '@patternfly/pfe-select';

const bordered = document.getElementById('#bordered-example');
const isLarge = document.getElementById('toggle-size');

isLarge.addEventListener('change', function() {
  bordered.toggleAttribute('large', isLarge.checked);
});
