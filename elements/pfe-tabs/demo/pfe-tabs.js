import '@patternfly/pfe-icon';
import '@patternfly/pfe-tabs';

const root = document.querySelector('[data-demo="pfe-tabs"]')?.shadowRoot ?? document;

const variantInput = root.querySelector('input[name="toggle-variant"]');
function variantToggle() {
  const boxVariant = root.querySelector('pfe-tabs[box]');
  if (variantInput.checked) {
    boxVariant.setAttribute('box', 'light');
  } else {
    boxVariant.setAttribute('box', 'dark');
  }
}
variantInput.addEventListener('change', variantToggle);

const verticalInput = root.querySelector('input[name="toggle-vertical"]');
function verticalToggle() {
  const verticalVariant = root.querySelector('pfe-tabs[vertical]');
  if (verticalInput.checked) {
    verticalVariant.setAttribute('box', 'dark');
  } else {
    verticalVariant.removeAttribute('box');
  }
}
verticalInput.addEventListener('change', verticalToggle);

const resizeInput = root.querySelector('input[name="toggle-resize"]');
function resizeToggle() {
  const resize = root.querySelector('#overflow');
  if (resizeInput.checked) {
    resize.setAttribute('box', 'dark');
  } else {
    resize.removeAttribute('box');
  }
}
resizeInput.addEventListener('change', resizeToggle);

const insetInput = root.querySelectorAll('input[name="toggle-inset"]');
function insetToggle(event) {
  const inset = root.querySelector('pfe-tabs[inset]');
  inset.setAttribute('inset', event.target.value);
}
insetInput.forEach(input => input.addEventListener('change', insetToggle));
