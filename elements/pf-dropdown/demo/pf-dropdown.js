import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-dropdown/pf-dropdown.js';
import '@patternfly/elements/pf-dropdown/pf-dropdown-item.js';
import '@patternfly/elements/pf-dropdown/pf-dropdown-items-group.js';
import '@patternfly/elements/pf-icon/pf-icon.js';

for (const form of document.querySelectorAll('form')) {
  form.addEventListener('submit', e=>e.preventDefault());
}

const dropdownDefaultTrigger = document.getElementById('dropdownDefaultTrigger');
const dropdownDefaultTriggerSelectedItem = document.getElementById('dropdownDefaultTriggerSelectedItem');
dropdownDefaultTrigger.addEventListener('select', event => {
  dropdownDefaultTriggerSelectedItem.innerText = event?.selectedValue;
});

const dropdownCustomTrigger = document.getElementById('dropdownCustomTrigger');
const dropdownCustomTriggerSelectedItem = document.getElementById('dropdownCustomTriggerSelectedItem');
dropdownCustomTrigger.addEventListener('select', event => {
  dropdownCustomTriggerSelectedItem.innerText = event?.selectedValue;
});

const dropdownWithDisabledItem = document.getElementById('dropdownWithDisabledItem');
const dropdownWithDisabledItemSelectedItem = document.getElementById('dropdownWithDisabledItemSelectedItem');
dropdownWithDisabledItem.addEventListener('select', event => {
  dropdownWithDisabledItemSelectedItem.innerText = event?.selectedValue;
});

const noHideOnOutsideClickTrigger = document.getElementById('noHideOnOutsideClickTrigger');
const noHideOnOutsideClickTriggerSelectedItem = document.getElementById('noHideOnOutsideClickTriggerSelectedItem');
noHideOnOutsideClickTrigger.addEventListener('select', event => {
  noHideOnOutsideClickTriggerSelectedItem.innerText = event?.selectedValue;
});

const iconClickTrigger = document.getElementById('iconClickTrigger');
const iconClickTriggerSelectedItem = document.getElementById('iconClickTriggerSelectedItem');
iconClickTrigger.addEventListener('select', event => {
  iconClickTriggerSelectedItem.innerText = event?.selectedValue;
});

