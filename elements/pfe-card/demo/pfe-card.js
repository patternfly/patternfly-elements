import '@patternfly/pfe-band';
import '@patternfly/pfe-card';
import '@patternfly/pfe-select';

const root = document.querySelector('[data-demo="pfe-card"]')?.shadowRoot ?? document;

root.querySelector('#context-selector').addEventListener('select', event => {
  event.target.closest('pfe-card').setAttribute('color', event.value);
});
