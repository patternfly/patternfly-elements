// https://github.com/guybedford/es-module-shims#polyfill-edge-case-dynamic-import

if (!('ElementInternals' in window && 'setFormValue' in window.ElementInternals.prototype)) {
  if (window.importShim) {
    await window.importShim('element-internals-polyfill');
  } else {
    await import('element-internals-polyfill');
  }
}

if (window.importShim) {
  await window.importShim('@patternfly/pfe-switch');
} else {
  await import('@patternfly/pfe-switch');
}

document.getElementById('form-disabled').addEventListener('change', /** @this{HTMLFieldsetElement}*/function(event) {
  const controls = document.getElementById(event.target.getAttribute('aria-controls'));
  controls.toggleAttribute('disabled', event.target.checked);
});
