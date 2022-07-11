import '@patternfly/pfe-band';
import '@patternfly/pfe-button';
import '@patternfly/pfe-icon';
import '@patternfly/pfe-progress-indicator';
import '@patternfly/pfe-select';

const root = document.querySelector('[data-demo="pfe-button"]')?.shadowRoot ?? document;
const form = root.querySelector('#custom-button-styles-form');
const sbmt = form.querySelector('pfe-button');
const slct = form.querySelector('pfe-select');
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
  loadBtn.querySelector('button').textContent =
    loadBtn.loading ? 'Click to stop loading' : 'Click to start loading';
});

iconBtn.addEventListener('click', () => {
  iconBtn.loading = !iconBtn.loading;
});

slct.addEventListener('select', () => {
  sbmt.style.setProperty('--pf-c-button--m-primary--BackgroundColor', slct.value);
});

form.addEventListener('submit', event => event.preventDefault());

for (const button of document.querySelectorAll('pfe-button')) {
  // eslint-disable-next-line no-console
  button.addEventListener('click', console.log);
}

(async function() {
  const PfeIcon = await customElements.whenDefined('pfe-icon');
  PfeIcon.addIconSet('fa', './', function(name) {
    switch (name) {
      case 'fa-external-link-square':
      case 'external-link-square':
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='vertical-align:-0.125em' fill='currentColor' height='1em' width='1em' viewBox='0 0 448 512' aria-hidden='true' role='img'%3E%3Cpath d='M448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48zm-88 16H248.029c-21.313 0-32.08 25.861-16.971 40.971l31.984 31.987L67.515 364.485c-4.686 4.686-4.686 12.284 0 16.971l31.029 31.029c4.687 4.686 12.285 4.686 16.971 0l195.526-195.526 31.988 31.991C358.058 263.977 384 253.425 384 231.979V120c0-13.255-10.745-24-24-24z'%3E%3C/path%3E%3C/svg%3E`;
      case 'fa-plus-circle':
      case 'plus-circle':
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='vertical-align:-0.125em' fill='currentColor' height='1em' width='1em' viewBox='0 0 512 512' aria-hidden='true' role='img'%3E%3Cpath d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z'%3E%3C/path%3E%3C/svg%3E`;
    }
  });
})();
