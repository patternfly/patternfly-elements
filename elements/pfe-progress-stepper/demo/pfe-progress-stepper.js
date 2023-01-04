import '@patternfly/pfe-switch';
import '@patternfly/pfe-progress-stepper';

/** @this{HTMLFormElement}*/
function onChange() {
  this.elements.progress.vertical = this.elements.vertical.checked;
  this.elements.progress.centered = this.elements.centered.checked;
}

for (const form of document.querySelectorAll('form')) {
  form.addEventListener('change', onChange);
}
