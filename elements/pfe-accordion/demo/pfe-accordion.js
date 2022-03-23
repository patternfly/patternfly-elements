import '@patternfly/pfe-accordion';
import '@patternfly/pfe-band';
import '@patternfly/pfe-button';
import '@patternfly/pfe-card';
import '@patternfly/pfe-cta';
import '@patternfly/pfe-jump-links';
import '@patternfly/pfe-select';

const root = document.querySelector('[data-demo="pfe-accordion"]')?.shadowRoot ?? document;

/** @type {HTMLTemplateElement} */
const template = root.getElementById('new-panel');
const btn = root.querySelector('#addTabAndPanelBtn');
const pfeAccordion = root.querySelector('pfe-accordion#dynamic-accordion');

/** Append a new panel to the accordion */
function onClick() {
  pfeAccordion.appendChild(template.content.cloneNode(true));
}

btn.addEventListener('click', onClick);
