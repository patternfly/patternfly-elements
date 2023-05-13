import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-dropdown/pf-dropdown.js';
import '@patternfly/elements/pf-dropdown/pf-dropdown-item.js';
import '@patternfly/elements/pf-dropdown/pf-dropdown-items-group.js';

for (const form of document.querySelectorAll('form')) {
  form.addEventListener('submit', e=>e.preventDefault());
}

const dropdownDefaultTrigger = document.getElementById('dropdownDefaultTrigger');
const dropdownDefaultTriggerSelectedItem = document.getElementById('dropdownDefaultTriggerSelectedItem');
dropdownDefaultTrigger.addEventListener('select', event => {
  // eslint-disable-next-line no-console
  console.log('event on select', event?.selectedValue);
  dropdownDefaultTriggerSelectedItem.innerText = event?.selectedValue;
});

const dropdownCustomTrigger = document.getElementById('dropdownCustomTrigger');
const dropdownCustomTriggerSelectedItem = document.getElementById('dropdownCustomTriggerSelectedItem');
dropdownCustomTrigger.addEventListener('select', event => {
  // eslint-disable-next-line no-console
  console.log('event on select', event?.selectedValue);
  dropdownCustomTriggerSelectedItem.innerText = event?.selectedValue;
});

