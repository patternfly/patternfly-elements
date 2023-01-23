import '@patternfly/elements/pf-card/pf-card.js';
import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-modal/pf-modal.js';
import '@patternfly/elements/pf-icon/pf-icon.js';

for (const button of document.querySelectorAll('pf-modal pf-button:not([slot="trigger"]) button')) {
  button.addEventListener('click', e => {
    e.target.closest('pf-modal').close(e.target.textContent.toLowerCase());
  });
}
