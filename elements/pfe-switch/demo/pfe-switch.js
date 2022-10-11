if (!('ElementInternals' in window && 'setFormValue' in window.ElementInternals.prototype)) {
  await import('element-internals-polyfill');
}

import('@patternfly/pfe-switch');

document.getElementById('form-disabled').addEventListener('change', /** @this{HTMLFieldsetElement}*/function(event) {
  const controls = document.getElementById(event.target.getAttribute('aria-controls'));
  controls.toggleAttribute('disabled', event.target.checked);
});
