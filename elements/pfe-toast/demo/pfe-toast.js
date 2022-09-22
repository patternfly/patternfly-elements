import '@patternfly/pfe-band';
import '@patternfly/pfe-button';
import { PfeToast } from '@patternfly/pfe-toast';

const root = document.querySelector('[data-demo="pfe-toast"]')?.shadowRoot ?? document;
const jsToastButton = root.getElementById('js-toast');
const contentInput = root.getElementById('content');

for (const button of root.querySelectorAll('[data-toast]')) {
  button.addEventListener('click', function(event) {
    root.getElementById(event.target.dataset.toast).toggle();
  });
}

jsToastButton.addEventListener('click', () => {
  PfeToast.toast(contentInput.value);
});
