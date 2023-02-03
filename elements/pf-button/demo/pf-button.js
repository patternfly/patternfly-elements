import 'element-internals-polyfill';
import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-spinner/pf-spinner.js';

const logsBtn = document.getElementById('loading-logs');
const loadBtn = document.getElementById('loading-scdr');
const iconBtn = document.getElementById('loading-icon');

logsBtn.addEventListener('click', () => {
  logsBtn.loading = !logsBtn.loading;
  logsBtn.textContent =
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

for (const button of document.querySelectorAll('pf-button')) {
  // eslint-disable-next-line no-console
  button.addEventListener('click', console.log);
}
