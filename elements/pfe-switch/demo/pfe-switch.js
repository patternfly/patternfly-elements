import 'element-internals-polyfill';
import '@patternfly/pfe-switch';
import '@patternfly/pfe-button';

document.getElementById('form-disabled').addEventListener('change', /** @this{HTMLFieldsetElement}*/function(event) {
  const controls = document.getElementById(event.target.getAttribute('aria-controls'));
  controls.toggleAttribute('disabled', event.target.checked);
});
