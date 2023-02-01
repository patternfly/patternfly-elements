import '@patternfly/pfe-popover';
import '@patternfly/pfe-button';
import '@patternfly/pfe-icon';

// Positions
const section = document.querySelector('#basic');
const select = document.querySelector('#position-select');
const element = section.querySelector('pfe-popover');
select.addEventListener('change', event => element.setAttribute('position', event.target.value));

// Close popover from content
const section1 = document.querySelector('#close-from-content');
const element1 = section1.querySelector('pfe-popover');
const closeButton = element1.querySelector('#close-button');
closeButton.addEventListener('click', () => element1.hide());

// Alert variants
const section2 = document.querySelector('#alert');
const select2 = document.querySelector('#alert-select');
const element2 = section2.querySelector('pfe-popover');
select2.addEventListener('change', event => element2.setAttribute('alert-severity', event.target.value));

