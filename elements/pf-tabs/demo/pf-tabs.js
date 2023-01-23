import '@patternfly/elements/pf-icon/pf-icon.js';
import '@patternfly/elements/pf-switch/pf-switch.js';
import '@patternfly/elements/pf-tabs/pf-tabs.js';

const toggleVariant = document.getElementById('toggle-variant');
const resize = document.getElementById('overflow');
const verticalInput = document.getElementById('toggle-vertical');
const resizeInput = document.getElementById('toggle-resize');
const verticalVariant = document.querySelector('pf-tabs[vertical]');
const boxVariant = document.querySelector('pf-tabs[box]');
const inset = document.querySelector('pf-tabs[inset]');

function variantToggle() {
  boxVariant.setAttribute('box', toggleVariant.checked ? 'dark' : 'light');
}

function verticalToggle() {
  if (verticalInput.checked) {
    verticalVariant.setAttribute('box', 'dark');
  } else {
    verticalVariant.removeAttribute('box');
  }
}

function resizeToggle() {
  if (resizeInput.checked) {
    resize.setAttribute('box', 'dark');
  } else {
    resize.removeAttribute('box');
  }
}

function insetToggle(event) {
  inset.inset = event.target.value;
}

for (const input of document.querySelectorAll('input[name="toggle-inset"]')) {
  input.addEventListener('change', insetToggle);
}

toggleVariant.addEventListener('change', variantToggle);
resizeInput.addEventListener('change', resizeToggle);
verticalInput.addEventListener('change', verticalToggle);
