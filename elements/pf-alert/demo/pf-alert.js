import '@patternfly/elements/pf-alert/pf-alert.js';
import '@patternfly/elements/pf-button/pf-button.js';

const createTimeoutAlert = document.getElementById('create-timeout-alert');
const createInlintTimeoutAlert = document.getElementById('create-timeout-inline-alert');
const timeoutRange = document.getElementById('timeout-range');
const timeoutValue = document.getElementById('timeout-value');
const createCustomTimeoutAlert = document.getElementById('create-custom-timeout-alert');
const timeoutAlertsSection = document.getElementById('timeout-alerts');

createTimeoutAlert.addEventListener('click', () => {
  const pfeAlert = document.createElement('pf-alert');
  pfeAlert.title = 'Default Timeout Alert 8000ms';
  pfeAlert.timeout = true;
  timeoutAlertsSection.appendChild(pfeAlert);
});

createInlintTimeoutAlert.addEventListener('click', () => {
  const pfeAlert = document.createElement('pf-alert');
  pfeAlert.title = 'Inline Timeout Alert 8000ms';
  pfeAlert.timeout = true;
  timeoutAlertsSection.appendChild(pfeAlert);
});

createCustomTimeoutAlert.addEventListener('click', () => {
  const pfeAlert = document.createElement('pf-alert');
  pfeAlert.title = `Custom Timeout Alert ${timeoutRange.value}ms`;
  pfeAlert.timeout = timeoutRange.value;
  timeoutAlertsSection.appendChild(pfeAlert);
});

timeoutRange.addEventListener('change', () => {
  timeoutValue.innerText = timeoutRange.value;
});
