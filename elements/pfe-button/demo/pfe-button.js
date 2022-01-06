import '@patternfly/pfe-band';
import '@patternfly/pfe-button';
import '@patternfly/pfe-select';

const root = document.querySelector('[data-demo="pfe-button"]')?.shadowRoot ?? document;
const form = root.querySelector('form');
const sbmt = form.querySelector('pfe-button');
const slct = form.querySelector('pfe-select');

slct.addEventListener('change', () => {
  sbmt.style.setProperty('--pfe-button--BackgroundColor', slct.value);
});

form.addEventListener('submit', event => event.preventDefault());
