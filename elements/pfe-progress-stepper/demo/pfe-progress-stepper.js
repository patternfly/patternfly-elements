import '@patternfly/elements/pfe-switch/pfe-switch.js';
import '@patternfly/elements/pfe-progress-stepper/pfe-progress-stepper.js';

/** @this{HTMLFormElement}*/
function onChange() {
  this.elements.progress.vertical = this.elements.vertical.checked;
  this.elements.progress.center = this.elements.center.checked;
}

for (const form of document.querySelectorAll('form')) {
  form.addEventListener('change', onChange);
}
