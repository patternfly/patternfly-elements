import '@patternfly/pfe-band';
import '@patternfly/pfe-button';
import '@patternfly/pfe-icon';
import '@patternfly/pfe-select';

const root = document.querySelector('[data-demo="pfe-button"]')?.shadowRoot ?? document;
const form = root.querySelector('#custom-button-styles-form');
const sbmt = form.querySelector('pfe-button');
const slct = form.querySelector('pfe-select');
const logs = root.querySelector('#loading-logs');
const load = root.querySelector('#loading-scdr');
const icon = root.querySelector('#loading-icon');

logs.addEventListener('click', () => {
  logs.loading = !logs.loading;
  logs.querySelector('button').textContent =
    logs.loading ? 'Pause loading logs' : 'Resume loading logs';
});

load.addEventListener('click', () => {
  load.loading = !load.loading;
  load.querySelector('button').textContent =
    load.loading ? 'Click to stop loading' : 'Click to start loading';
});

icon.addEventListener('click', () => {
  icon.loading = !icon.loading;
  icon.querySelector('pfe-icon').icon =
    icon.loading ? 'spinner' : 'upload';
});

slct.addEventListener('select', () => {
  sbmt.style.setProperty('--pf-c-button--m-primary--BackgroundColor', slct.value);
});

form.addEventListener('submit', event => event.preventDefault());
