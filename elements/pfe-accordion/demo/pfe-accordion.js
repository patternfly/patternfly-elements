const { shadowRoot } = document.querySelector('[data-demo="pfe-accordion"]');

/** @type {HTMLTemplateElement} */
const template = shadowRoot.getElementById('new-panel');
const btn = shadowRoot.querySelector('#addTabAndPanelBtn');
const pfeAccordion = shadowRoot.querySelector('pfe-accordion#dynamic-accordion');

/** Append a new panel to the accordion */
function onClick() {
  pfeAccordion.appendChild(template.content.cloneNode(true));
}

btn.addEventListener('click', onClick);
