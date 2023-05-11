import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-dropdown/pf-dropdown.js';
import '@patternfly/elements/pf-dropdown/pf-dropdown-item.js';
import '@patternfly/elements/pf-dropdown/pf-dropdown-items-group.js';

const demoDropdown1 = document.getElementById('demo1dropdown');
demoDropdown1.addEventListener('select', (event, value) => {
  // eslint-disable-next-line no-console
  console.log('event on select', event, value);
});

