import '@patternfly/elements/pfe-card/pfe-card.js';
import '@patternfly/elements/pfe-button/pfe-button.js';
import '@patternfly/elements/pfe-modal/pfe-modal.js';
import '@patternfly/elements/pfe-icon/pfe-icon.js';

for (const button of document.querySelectorAll('pfe-modal pfe-button:not([slot="trigger"]) button')) {
  button.addEventListener('click', e => {
    e.target.closest('pfe-modal').close(e.target.textContent.toLowerCase());
  });
}
