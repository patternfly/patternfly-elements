import '@patternfly/pfe-band';
import '@patternfly/pfe-cta';
import '@patternfly/pfe-modal';

const root = document.querySelector('[data-demo="pfe-modal"]')?.shadowRoot ?? document;
const trigger = root.querySelector('#custom-trigger');
const modal = root.querySelector('#custom-modal');

trigger.addEventListener('click', event => modal.open(event));
