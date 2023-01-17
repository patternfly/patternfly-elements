import '@patternfly/pfe-switch';
import '@patternfly/pfe-progress-stepper';

/** @this{HTMLFormElement}*/
function onChange() {
  this.elements.progress.vertical = this.elements.vertical.checked;
  this.elements.progress.center = this.elements.center.checked;
}

for (const form of document.querySelectorAll('form')) {
  form.addEventListener('change', onChange);
}
