import 'element-internals-polyfill';
import '@patternfly/elements/pf-switch/pf-switch.js';
import '@patternfly/elements/pf-button/pf-button.js';

document.getElementById('form-disabled').addEventListener('change', /** @this{HTMLFieldsetElement}*/function(event) {
  const controls = document.getElementById(event.target.getAttribute('aria-controls'));
  controls.toggleAttribute('disabled', event.target.checked);
});

document.getElementById('nested-label').addEventListener('submit', /** @this {HTMLFormElement} */function(event) {
  event.preventDefault();
  this.querySelector('output').textContent = `Dark mode ${this.elements.status.checked ? 'on' : 'off'}`;
});
