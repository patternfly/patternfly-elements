import 'element-internals-polyfill';
import '@patternfly/elements/pf-switch/pf-switch.js';
import '@patternfly/elements/pf-button/pf-button.js';

for (const form of document.querySelectorAll('form')) {
  form.addEventListener('submit', e=>e.preventDefault());
  form.addEventListener('change', sync);
  sync.call(form);
}

/** @this{HTMLFormElement}*/
function sync() {
  this.querySelector('fieldset').disabled = this.fieldset.checked;
  this.querySelector('pf-button').disabled = this.button.checked;
}
