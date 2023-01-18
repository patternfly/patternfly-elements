import '@patternfly/elements/pfe-switch/pfe-switch.js';
import '@patternfly/elements/pfe-tooltip/pfe-tooltip.js';

document.getElementById('width-toggle').addEventListener('change', function(event) {
  document.querySelector('[data-demo]').classList.toggle('narrow', event.target.checked);
});

