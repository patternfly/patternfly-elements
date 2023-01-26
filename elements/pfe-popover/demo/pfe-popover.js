import '@patternfly/pfe-popover';
import '@patternfly/pfe-button';
import '@patternfly/pfe-icon';

// Close popover from content
const section = document.querySelector('#close-from-content');
const element = section.querySelector('pfe-popover');
const closeButton = element.querySelector('#close-button');
closeButton.addEventListener('click', () => element.hide());
