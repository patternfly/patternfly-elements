import '@patternfly/pfe-switch';
import '@patternfly/pfe-tooltip';

document.getElementById('width-toggle').addEventListener('change', function(event) {
  document.querySelector('[data-demo]').classList.toggle('narrow', event.target.checked);
});

