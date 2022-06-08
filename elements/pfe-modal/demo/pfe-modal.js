import '@patternfly/pfe-band';
import '@patternfly/pfe-card';
import '@patternfly/pfe-cta';
import '@patternfly/pfe-button';
import '@patternfly/pfe-modal';
import '@patternfly/pfe-icon';
import '@patternfly/pfe-dropdown';

const root = document.querySelector('[data-demo="pfe-modal"]')?.shadowRoot ?? document;

for (const button of root.querySelectorAll('pfe-modal pfe-button:not([slot="trigger"]) button')) {
  button.addEventListener('click', e => {
    e.target.closest('pfe-modal').close(e.target.textContent.toLowerCase());
  });
}
