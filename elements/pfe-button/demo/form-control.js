import '@patternfly/elements/pfe-switch/pfe-switch.js';
import '@patternfly/elements/pfe-button/pfe-button.js';

for (const form of document.querySelectorAll('form')) {
  form.addEventListener('submit', e=>e.preventDefault());
  form.addEventListener('change', sync);
  sync.call(form);
}

/** @this{HTMLFormElement}*/
function sync() {
  this.querySelector('fieldset').disabled = this.fieldset.checked;
  this.querySelector('pfe-button').disabled = this.button.checked;
}
