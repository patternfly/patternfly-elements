import '@patternfly/pfe-switch';
import '@patternfly/pfe-progress-stepper';

for (const form of document.querySelectorAll('form')) {
  form.addEventListener('change', function() {
    form.steps.vertical = form.vertical.checked;
    form.steps.centered = form.centered.checked;
  });
}
