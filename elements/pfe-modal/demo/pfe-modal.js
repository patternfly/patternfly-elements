import '@patternfly/pfe-band';
import '@patternfly/pfe-card';
import '@patternfly/pfe-cta';
import '@patternfly/pfe-button';
import '@patternfly/pfe-modal';

const root = document.querySelector('[data-demo="pfe-modal"]')?.shadowRoot ?? document;
const trigger = root.querySelector('#custom-trigger');
const customTriggerModal = root.querySelector('#custom-modal');

customTriggerModal.setTrigger(trigger);
