import '@patternfly/pfe-band';
import '@patternfly/pfe-cta';
import { PrimaryDetailChangeEvent } from '@patternfly/pfe-primary-detail';

const root = document.querySelector('[data-demo="pfe-primary-detail"]')?.shadowRoot ?? document;

await Promise.all(Array.from(root.querySelectorAll('pfe-primary-detail'), x => x.updateComplete));

root.addEventListener('change', event => {
  if (event instanceof PrimaryDetailChangeEvent) {
    // eslint-disable-next-line no-console
    console.log(`New event: ${event.tab.textContent} opened. ${event.previousTab?.textContent ?? 'nothing'} closed.`);
  }
});

root.addEventListener('pfe-primary-detail:hidden-tab', event => {
  // eslint-disable-next-line no-console
  console.log(`Deprecated event: ${event.detail.tab.textContent} tab is closing. ID: ${event.detail.tab.id}`);
});
root.addEventListener('pfe-primary-detail:shown-tab', event => {
  // eslint-disable-next-line no-console
  console.log(`Deprecated event: ${event.detail.tab.textContent} tab is opening. ID: ${event.detail.tab.id}`);
});
