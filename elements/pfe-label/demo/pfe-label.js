import '@patternfly/pfe-label';
import '@patternfly/pfe-codeblock';
import '@patternfly/pfe-band';

const root = document.querySelector('[data-demo="pfe-label"]')?.shadowRoot ?? document;

root.querySelector('pfe-label');

root.addEventListener('close', function(event) {
  event.target.remove();
});
