import '@patternfly/pfe-band';
import '@patternfly/pfe-button';
import '@patternfly/pfe-spinner';
import '@patternfly/pfe-select';

const root = document.querySelector('[data-demo="pfe-button"]')?.shadowRoot ?? document;
const logsBtn = root.querySelector('#loading-logs');
const loadBtn = root.querySelector('#loading-scdr');
const iconBtn = root.querySelector('#loading-icon');

logsBtn.addEventListener('click', () => {
  logsBtn.loading = !logsBtn.loading;
  logsBtn.querySelector('button').textContent =
    logsBtn.loading ? 'Pause loading logs' : 'Resume loading logs';
});

loadBtn.addEventListener('click', () => {
  loadBtn.loading = !loadBtn.loading;
  loadBtn.textContent =
    loadBtn.loading ? 'Click to stop loading' : 'Click to start loading';
});

iconBtn.addEventListener('click', () => {
  iconBtn.loading = !iconBtn.loading;
});

for (const button of document.querySelectorAll('pfe-button')) {
  // eslint-disable-next-line no-console
  button.addEventListener('click', console.log);
}
