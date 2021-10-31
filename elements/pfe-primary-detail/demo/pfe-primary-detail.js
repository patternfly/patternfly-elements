import '@patternfly/pfe-band';
import { PrimaryDetailChangeEvent } from '@patternfly/pfe-primary-detail';

import { PfeToast } from '@patternfly/pfe-toast';

const root = document.querySelector('[data-demo="pfe-primary-detail"]')?.shadowRoot ?? document;

await Promise.all(Array.from(root.querySelectorAll('pfe-primary-detail'), x => x.updateComplete));

root.addEventListener('change', event => {
  if (event instanceof PrimaryDetailChangeEvent) {
    console.log(event);
    // PfeToast.toast(`${event.tab.textContent} opened. ${event.previousTab?.textContent ?? 'nothing'} closed.`);
  }
})
