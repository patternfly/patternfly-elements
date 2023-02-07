import 'element-internals-polyfill';
import '@patternfly/elements/pf-switch/pf-switch.js';
import '@patternfly/elements/pf-progress-stepper/pf-progress-stepper.js';

/** @this{HTMLFormElement}*/
function onChange() {
  this.elements.progress.vertical = this.elements.vertical.checked;
  this.elements.progress.center = this.elements.center.checked;
}

for (const form of document.querySelectorAll('form')) {
  form.addEventListener('change', onChange);
}
