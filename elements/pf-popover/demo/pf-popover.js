import '@patternfly/elements/pf-popover/pf-popover.js';
import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-icon/pf-icon.js';

// Positions
const select = document.getElementById('position-select');
select.addEventListener('change', event =>
  event.target
    .closest('fieldset')
    .querySelector('pf-popover')
    .setAttribute('position', event.target.value));

// Close popover from content
const closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', event => event.target.closest('pf-popover').hide());

// Alert variants
const alert = document.getElementById('alert');
alert.addEventListener('change', event =>
  alert
    .querySelector('pf-popover')
    .setAttribute('alert-severity', event.target.closest('form').elements.severity.value));

document.addEventListener('submit', function(event) {
  event.preventDefault();
});
