import '@patternfly/elements/pf-switch/pf-switch.js';
import '@patternfly/elements/pf-tooltip/pf-tooltip.js';

document.getElementById('width-toggle').addEventListener('change', function(event) {
  document.querySelector('[data-demo]').classList.toggle('narrow', event.target.checked);
});

